import {Component} from '@angular/core';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {MatDialog, MatToolbarModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatIcon, MatIconRegistry} from '@angular/material';
import {ContactComponent} from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zacharyshorts';

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogConfig = {
      width: '60%',
      autoFocus: true,
    };
    const dialogRef = this.dialog.open(ContactComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

    });
  }


}
