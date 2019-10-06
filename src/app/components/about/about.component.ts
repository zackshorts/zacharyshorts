import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  constructor(private router: Router) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.code === 'ArrowRight') {
      this.router.navigateByUrl('/projects');
    }

    if (event.code === 'ArrowLeft') {
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {
  }

}
