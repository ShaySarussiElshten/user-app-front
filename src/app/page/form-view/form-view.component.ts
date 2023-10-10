import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, finalize, of } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {
  userForm!: FormGroup;
  userId: string | null = null;
  isLoading!: boolean;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router, 
    private snackBar: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });

    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((user) => {
        this.userForm.patchValue(user);
      }, error => {
        console.error("Failed to fetch user data:", error);
      });
    }
  }
  
  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      const formValue = this.userForm.value;
  
      let userObservable: Observable<User>;
  
      if (this.userId) {
        userObservable = this.userService.updateUser(this.userId, formValue);
      } else {
        userObservable = this.userService.createUser(formValue);
      }
  
      userObservable.pipe(
        catchError((error) => {
          this.snackBar.open(`Error: ${error.error.message}`, 'Close', { duration: 5000 });
          return of();  
        }),
        finalize(() => {
          this.isLoading = false;  
        })
      ).subscribe(
        () => {
          this.router.navigate(['list-view']);  
        }
      );
    }
  }
}
