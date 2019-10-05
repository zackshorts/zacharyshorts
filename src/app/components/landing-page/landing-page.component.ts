import {Component, HostListener, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private router: Router) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.code === 'ArrowRight') {
      this.router.navigateByUrl('/about');
    }

    if (event.code === 'ArrowLeft') {
      this.router.navigateByUrl('/projects');
    }
  }

  ngOnInit() {
  }
}
