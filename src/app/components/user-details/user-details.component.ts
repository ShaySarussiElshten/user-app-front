import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';


@Component({
  selector: 'app-pokemon-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    public dialogRef: MatDialogRef<UserDetailsComponent>,
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
