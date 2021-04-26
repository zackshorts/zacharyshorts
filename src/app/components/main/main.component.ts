import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as jspdf from 'jspdf'; 
import * as $ from 'jquery';

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  participants = [];
  shuffledParticipants = [];
  pairedParticipants = [];
  inputName = null
  inputEmail = null;
  spouseName = null;
  spouseEmail = null
  nameForm = new FormGroup({
    name: new FormControl(this.inputName, Validators.required),
    spouseName: new FormControl(this.spouseName),
    email: new FormControl(this.inputEmail, [
      Validators.required,
      Validators.email
    ]),
    spouseEmail: new FormControl(this.spouseEmail, Validators.email)
  });
  isRed: true;
  year: any;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngOnInit() {
    this.year = new Date().getFullYear();
  }

  addParticipant(
    name: string,
    email: string,
    spouseName?: string,
    spouseEmail?: string
  ) {
    if (spouseName !== null && spouseEmail !== null) {
      this.participants.push({
        name,
        email,
        spouseName
      });
      this.participants.push({
        name: spouseName,
        email: spouseEmail,
        spouseName: name
      });
    } else {
      this.participants.push({
        name,
        email,
      });
    }
    this.nameForm.reset();
  }

  makePairs() {
    for (let i = 0; i < this.participants.length; i++) {
      if (i !== this.participants.length - 1) {
        this.pairedParticipants.push({
          giver: this.shuffledParticipants[i],
          receiver: this.shuffledParticipants[i + 1]
        });
      } else {
        this.pairedParticipants.push({
          giver: this.shuffledParticipants[i],
          receiver: this.shuffledParticipants[0]
        });
      }
    }
  }


  shuffle(participantArray: string[]) {
    let currentIndex = participantArray.length;
    let temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = participantArray[currentIndex];
      participantArray[currentIndex] = participantArray[randomIndex];
      participantArray[randomIndex] = temporaryValue;
    }
    return participantArray;
  }

  savePdf() {
    let doc = new jspdf();
        let specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            }
        };

        doc.fromHTML($('#content').html(), 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });

        doc.save(`secret-santa-${this.year}.pdf`);
  }

  submitAllNames() {
    let scope = this;
    this.shuffledParticipants = this.shuffle(this.participants);
    this.verifyPairs();
    this.makePairs();
    this.pairedParticipants.forEach(participant => {
      this.sendEmail(participant);
    });
    setTimeout(function () {
      scope.savePdf();
    }, 500);

    scope.nameForm.reset();
    scope.participants = [];

    this.snackBar.open('Emails sent and pdf downloaded.', "Dismiss",{
      duration: 6000,
      panelClass: 'center'
    });
  }

  verifyPairs() {
    let pairedCorrectly = false;
    for (let i = 0; i < this.shuffledParticipants.length; i++) {
      if (i !== this.shuffledParticipants.length - 1) {
        if (
          this.shuffledParticipants[i].spouseName ===
            this.shuffledParticipants[i + 1].name ||
          this.shuffledParticipants[i].name ===
            this.shuffledParticipants[i + 1].spouseName
        ) {
          i = -1;
          this.shuffle(this.shuffledParticipants);
          continue;
        }
      } else {
        if (
          this.shuffledParticipants[i].spouseName ===
            this.shuffledParticipants[0].name ||
          this.shuffledParticipants[i].name ===
            this.shuffledParticipants[0].spouseName
        ) {
          i = -1;
          this.shuffle(this.shuffledParticipants);
          continue;
        }
      }
    }
  }

  sendEmail(emailObject: any) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Accept: "*/*"
    });
    const options = { headers };
    const body = {
      to: emailObject.giver.email,
      message: `${emailObject.giver.name},\n\nThank you for participating in Secret Santa this year! You will have the chance to give a gift to ${emailObject.receiver.name}. Please spend around $10-20 and make the gift meaningful. \n\nMerry Christmas!`
    };
    return this.http
      .post(
        "https://zacharyshorts-emailserver.herokuapp.com/sendsantaemail",
        body,
        options
      )
      .subscribe();
  }
}
