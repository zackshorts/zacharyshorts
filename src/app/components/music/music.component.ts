import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {

  constructor(private router: Router) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if (event.code === 'ArrowRight') {
      this.router.navigateByUrl('/home');
    }

    if (event.code === 'ArrowLeft') {
      this.router.navigateByUrl('/projects');
    }
  }

  ngOnInit() {
  }

}
