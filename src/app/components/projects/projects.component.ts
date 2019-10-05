import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.projects = this.fetchGithubProjects();
  }

  private fetchGithubProjects() {
    return this.http.get("https://api.github.com/users/zackshorts/repos").subscribe(res => {
      this.projects = res;
    });
  }

}
