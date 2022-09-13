import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

function uid() {
  return Math.random().toString(36).substring(2);
}

@Component({
  selector: 'skeleton-screen-loader',
  templateUrl: './skeleton-screen-loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ]
})
export class SkeletonScreenLoaderComponent implements OnInit {

  private fixedId = uid();

  idClip = `${this.fixedId}-diff`;
  idGradient = `${this.fixedId}-animated-diff`;
  idAria = `${this.fixedId}-aria`;

  @Input() animate = true;

  @Input() baseUrl = '';

  @Input() speed = 1.2;

  @Input() viewBox: string = '0 0 400 130';

  @Input() gradientRatio = 2;

  @Input() backgroundColor = '#f5f6f7';
  @Input() backgroundOpacity = 1;

  @Input() foregroundColor = '#eee';
  @Input() foregroundOpacity = 1;

  @Input() rtl = false;

  @Input() interval = 0.25;

  @Input() style = {};

  animationValues = [];

  clipPath: string;
  fillStyle: object;
  duration: string;
  keyTimes: string;
  rtlStyle: object | null;

  ngOnInit() {
    this.clipPath = `url(${this.baseUrl}#${this.idClip})`;
    this.fillStyle = { fill: `url(${this.baseUrl}#${this.idGradient})` };
    this.style = this.rtl ? { ...this.style, ...{ transform: 'scaleX(-1)' } } : this.style;

    this.duration = `${this.speed}s`;
    this.keyTimes = `0; ${this.interval}; 1`;
    this.animationValues = [
      `${-this.gradientRatio}; ${-this.gradientRatio}; 1`,
      `${-this.gradientRatio / 2}; ${-this.gradientRatio / 2}; ${1 + this.gradientRatio / 2}`,
      `0; 0; ${1 + this.gradientRatio}`
    ];
  }

}
