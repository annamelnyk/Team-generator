import { Component } from '@angular/core';

// interface Team {

// }
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Team Generator';
  newMember: string = '';
  teamMembers: string[] = [
  'Anna Melnyk',
  'Anton Melnyk',
  'Daniil Melnyk',
  'Sergey Ostanin',
  'John Doe',
  ];
  errorMessage = '';
  numberOfTeams: number | '' = '';
  teams: string[][] = [];

  addMember(): void {
    if (this.newMember) {
      this.teamMembers.push(this.newMember);
      this.newMember = '';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please enter a valid name';
    }
  }

  onInput(member: string): void {
    this.newMember = member;
  }

  onNumberOfTeam(num: string): void {
    this.numberOfTeams = Number(num);
  }

  generateTeams(): void {
    if (!this.numberOfTeams || this.numberOfTeams <= 0) {
      this.errorMessage = 'Amount of teams should be more than 0';
      return;
    }

    const allMembers = [...this.teamMembers];
    if (this.teamMembers.length < this.numberOfTeams) {
      this.errorMessage =
        'Number of teams should be less than amount of members';

        return;
    }

    while (allMembers.length) {
      for (let i = 0; i < this.numberOfTeams; i++) {
        const randomIndex = Math.floor(Math.random() * allMembers.length);
        const member = allMembers.splice(randomIndex, 1)[0];

        // to avoid undefined values in teams array
        if (!member) break;

        if (this.teams[i]) {
          this.teams[i].push(member);
        } else {
          this.teams[i] = [member];
        }
      }
    }

    console.log(this.teams);
    this.teamMembers = [];
    this.numberOfTeams = '';
    this.errorMessage = '';
  }
}
