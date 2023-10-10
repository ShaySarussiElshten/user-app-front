import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AllUserInfo, User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  
  @Input() user!: User;
  @Input() pageIndex!: number;
  @Input() pageSize!: number;
  @Output() usersUpdated: EventEmitter<User[]> = new EventEmitter();

  
  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    ) {}

  
  editUser(userId: number): void {
    this.router.navigate(['form-view', userId]);
  }

  
  deleteUser(userId: number, event: Event): void {
      event.stopPropagation();

      const dialogRef = this.dialog.open(DialogComponent);

      dialogRef.afterClosed().pipe(
          switchMap(result => result ? this.userService.deleteUser(userId) : of(null)),
          switchMap(deletionResult => deletionResult !== null ? this.userService.getUsers(this.pageIndex, this.pageSize) : of(null))
      ).subscribe(
          this.handleSuccessfulDeletion
      );
  }

  private handleSuccessfulDeletion = (userInfo: AllUserInfo | null): void => {
    if (userInfo) {
        this.usersUpdated.emit(userInfo.data); 
    }
  }



}
