import { Component, OnInit,Input,ElementRef } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
@Input() bgColor;
  
  constructor(private element:ElementRef) { }

  ngOnInit(): void {
    this.element.nativeElement.style.setProperty('--myvar', `${this.bgColor}`)
    
  }

}
