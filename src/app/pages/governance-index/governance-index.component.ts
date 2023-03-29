import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-governance-index',
  templateUrl: './governance-index.component.html',
  styleUrls: ['./governance-index.component.scss']
})
export class GovernanceIndexComponent implements OnInit {
  dark_color: string;
  fontcolor: string;
  medium_color: string;

  constructor(public element: ElementRef) { }
  panelOpenState = false;

  ngOnInit(): void {

    this.dark_color=localStorage.getItem('topbar_color')
    this.element.nativeElement.style.setProperty('--myvar', `${this.dark_color}`)
    this.fontcolor='#FFFFFF'
   this.medium_color=localStorage.getItem('medium_color')
   this.element.nativeElement.style.setProperty('--mediumColor', `${this.medium_color}`)


  }

}
