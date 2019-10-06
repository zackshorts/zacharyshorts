import {Component, HostListener, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: any = [];

  constructor(private http: HttpClient, private router: Router) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);

    if (event.code === 'ArrowRight') {
      this.router.navigateByUrl('/home');
    }

    if (event.code === 'ArrowLeft') {
      this.router.navigateByUrl('/about');
    }
  }

  ngOnInit() {
    this.projects = this.fetchGithubProjects();
  }

  private fetchGithubProjects() {
    return this.http.get("https://api.github.com/users/zackshorts/repos").subscribe(res => {
      this.projects = res;
    });
  }

}
