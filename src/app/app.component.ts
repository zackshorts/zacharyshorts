import {Component, HostBinding, OnInit} from '@angular/core';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {MatDialog, MatToolbarModule, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';
import {MatIcon, MatIconRegistry} from '@angular/material';
import {ContactComponent} from './components/contact/contact.component';
import {OverlayContainer} from '@angular/cdk/overlay';
import {slideInAnimation} from './route-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit {
  title = 'zacharyshorts';

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, public overlayContainer: OverlayContainer) {}

  @HostBinding('class') componentCssClass;

  ngOnInit(): void {

  }

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }

  openDialog(): void {
    const dialogConfig = {
      width: '95vw',
      autoFocus: true,
    };
    const dialogRef = this.dialog.open(ContactComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Email has been sent!', "Dismiss",{
          duration: 3000,
          panelClass: 'center'
        });
      }
    });
  }


}
