import {Component} from '@angular/core';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {MatDialog, MatToolbarModule, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {MatIcon, MatIconRegistry} from '@angular/material';
import {ContactComponent} from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zacharyshorts';

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {
  }

  openDialog(): void {
    const dialogConfig = {
      width: '95vw',
      autoFocus: true,
      disableClose: true,
    };
    const dialogRef = this.dialog.open(ContactComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Email has been sent!', "Dismiss",{
          duration: 10000000,
          panelClass: 'center'
        });
      }
    });
  }


}
