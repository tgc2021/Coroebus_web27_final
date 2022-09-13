import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SkeletonScreenLoaderComponent } from './skeleton-screen-loader.component';

@Component({
    selector: 'table-skeleton',
    template: `
    <skeleton-screen-loader viewBox="0 0 400 110"
    width="1000"
    height="550"
    viewBox="0 0 1000 550"
    backgroundColor="#eaeced"
    foregroundColor="#ffffff">
    <svg:rect x="54" y="13" rx="6" ry="6" width="200" height="12" />
      <svg:rect x="870" y="13" rx="6" ry="6" width="23" height="12" />
      <svg:rect x="870" y="13" rx="6" ry="6" width="78" height="12" />
      <svg:rect x="51" y="45" rx="3" ry="3" width="906" height="17" />
    <svg:circle cx="879" cy="123" r="11" />
    <svg:circle cx="914" cy="123" r="11" />
    <svg:rect x="104" y="115" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="305" y="114" rx="3" ry="3" width="299" height="15" />
    <svg:rect x="661" y="114" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="55" y="155" rx="3" ry="3" width="897" height="2" />
    <svg:circle cx="880" cy="184" r="11" />
    <svg:circle cx="915" cy="184" r="11" />
    <svg:rect x="105" y="176" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="306" y="175" rx="3" ry="3" width="299" height="15" />
    <svg:rect x="662" y="175" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="56" y="216" rx="3" ry="3" width="897" height="2" />
    <svg:circle cx="881" cy="242" r="11" />
    <svg:circle cx="916" cy="242" r="11" />
    <svg:rect x="106" y="234" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="307" y="233" rx="3" ry="3" width="299" height="15" />
    <svg:rect x="663" y="233" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="57" y="274" rx="3" ry="3" width="897" height="2" />
    <svg:circle cx="882" cy="303" r="11" />
    <svg:circle cx="917" cy="303" r="11" />
    <svg:rect x="107" y="295" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="308" y="294" rx="3" ry="3" width="299" height="15" />
    <svg:rect x="664" y="294" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="58" y="335" rx="3" ry="3" width="897" height="2" />
    <svg:circle cx="881" cy="363" r="11" />
    <svg:circle cx="916" cy="363" r="11" />
    <svg:rect x="106" y="355" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="307" y="354" rx="3" ry="3" width="299" height="15" />
    <svg:rect x="663" y="354" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="57" y="395" rx="3" ry="3" width="897" height="2" />
    <svg:circle cx="882" cy="424" r="11" />
    <svg:circle cx="917" cy="424" r="11" />
    <svg:rect x="107" y="416" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="308" y="415" rx="3" ry="3" width="299" height="15" />
    <svg:rect x="664" y="415" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="55" y="453" rx="3" ry="3" width="897" height="2" />
    <svg:rect x="51" y="49" rx="3" ry="3" width="2" height="465" />
    <svg:rect x="955" y="49" rx="3" ry="3" width="2" height="465" />
    <svg:circle cx="882" cy="484" r="11" />
    <svg:circle cx="917" cy="484" r="11" />
    <svg:rect x="107" y="476" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="308" y="475" rx="3" ry="3" width="299" height="15" />
    <svg:rect x="664" y="475" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="55" y="513" rx="3" ry="3" width="897" height="2" />
    <svg:rect x="52" y="80" rx="3" ry="3" width="906" height="17" />
    <svg:rect x="53" y="57" rx="3" ry="3" width="68" height="33" />
    <svg:rect x="222" y="54" rx="3" ry="3" width="149" height="33" />
    <svg:rect x="544" y="55" rx="3" ry="3" width="137" height="33" />
    <svg:rect x="782" y="56" rx="3" ry="3" width="72" height="33" />
    <svg:rect x="933" y="54" rx="3" ry="3" width="24" height="33" />
    </skeleton-screen-loader>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableSkeletonComponent extends SkeletonScreenLoaderComponent {
    random = Math.random() * (1 - 0.7) + 0.7
}