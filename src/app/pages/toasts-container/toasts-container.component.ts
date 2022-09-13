import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '@app/services/toast-service';

@Component({
  selector: 'app-toasts-container',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
      (hidden)="toastService.remove(toast)"
      
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  host: { 'class': 'toast-container position-fixed top-0 end-0 p-3', 'style': 'z-index: 1200' }
})
export class ToastsContainerComponent implements OnInit {
  // [ngStyle] = "{'background': toast?.bgColor}"
  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }
  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }

}
