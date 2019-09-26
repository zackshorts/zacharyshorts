import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  inputSubject: string = "";
  inputName: string = "";
  inputEmail: string = "";
  inputMessage: string = "";

  emailForm = new FormGroup({
    subject: new FormControl(this.inputSubject, Validators.required),
    name: new FormControl(this.inputName, Validators.required),
    email: new FormControl(this.inputEmail, [Validators.required, Validators.email]),
    message: new FormControl(this.inputMessage),
  });

  constructor(public dialogRef: MatDialogRef<ContactComponent>, @Inject(MAT_DIALOG_DATA) data, private http: HttpClient) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  ngOnInit() {
  }

  sendEmail() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*',
    });
    let options = {headers: headers};
    let body = {
      'subject': this.inputSubject,
      'name': this.inputName,
      'from': this.inputEmail,
      'message': this.inputMessage
    };
    this.dialogRef.close(true);
    return this.http.post('https://zacharyshorts-emailserver.herokuapp.com/sendemail', body, options).subscribe();
  }


}
