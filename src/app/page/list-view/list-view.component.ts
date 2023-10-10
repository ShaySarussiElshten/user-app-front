import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from 'src/app/components/user-details/user-details.component';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  users: User[] = [];
  totalUsers = 0;
  pageIndex = 0;
  pageSize = 5;
  pageSizeOptions = [5, 10, 20];

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.pageIndex = params['page'] ? +params['page'] - 1 : 0; 
      this.loadUsers();
    });
  
  
    // If no queryParams after navigation, set default page to 1
    if (!this.activatedRoute.snapshot.queryParams['page']) {
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { page: 1 },
        queryParamsHandling: 'merge',
      });
    }
  }
  
  loadUsers(): void {
    this.userService.getUsers(this.pageIndex, this.pageSize).pipe(
      catchError(err => {
        this.snackBar.open('Failed to load users', undefined, { duration: 5000 });
        return throwError(err);
      })
    ).subscribe(response => {
      this.users = response.data;
      this.totalUsers = response.total;
    });
  }
  
 
  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, 
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize; 
    

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page: this.pageIndex + 1 }, 
      queryParamsHandling: 'merge',
    });
  
    this.loadUsers();
  }

  openDetails(user: User): void {
    this.dialog.open(UserDetailsComponent, {
      width: '500px',
      data: user,
    });
  }

  createUser(): void {
    this.router.navigate(['form-view']);
  }

  handleUsersUpdated(updatedUsers: User[]): void {
    this.users = updatedUsers;
  }
}