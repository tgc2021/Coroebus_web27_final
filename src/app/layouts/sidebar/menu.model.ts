// import { NgModule } from '@angular/core';
// import {NgbTooltipModule, NgbNavModule, NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap'
// import { SidebarComponent } from './sidebar.component';

// @NgModule({
//     // tslint:disable-next-line: max-line-length  
//     declarations: [],
//     imports: [
     
//       NgbTooltipModule,
//       NgbNavModule,
//       NgbCollapseModule,
//       NgbModule,  ],
//     providers: []
//   })


  export class LayoutsModule { }export interface MenuItem {
    id?: number;
    label?: string;
    icon?: string;
    link?: string;
    link1?: string;
    subItems?: any;
    isTitle?: boolean;
    badge?: any;
    parentId?: number;
    isLayout?: boolean;
}