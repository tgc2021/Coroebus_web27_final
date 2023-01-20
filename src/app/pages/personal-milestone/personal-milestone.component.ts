import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-milestone',
  templateUrl: './personal-milestone.component.html',
  styleUrls: ['./personal-milestone.component.scss']
})
export class PersonalMilestoneComponent implements OnInit {
  cards = [
    { title: 'Card 1', content: 'Content for card 1' },
    { title: 'Card 2', content: 'Content for card 2' },
    { title: 'Card 3', content: 'Content for card 3' },
    { title: 'Card 4', content: 'Content for card 4' }
  ];

  currentCardIndex = 0;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.currentCardIndex++;
      if (this.currentCardIndex >= this.cards.length) {
        this.currentCardIndex = 0;
      }
    }, 2000);
  
  }

}
