import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SkeletonScreenLoaderComponent } from './skeleton-screen-loader.component';

@Component({
  selector: 'dashboard-pages-skeleton',
  template: `
    <skeleton-screen-loader viewBox="0 0 400 110"
    width="1000"
    height="550"
    viewBox="0 0 1100 550"
    backgroundColor="#eaeced"
    foregroundColor="#ffffff">
    <svg:rect x="68" y="37" rx="3" ry="3" width="298" height="129" />
    <svg:rect x="426" y="37" rx="3" ry="3" width="298" height="129" />
    <svg:rect x="786" y="37" rx="3" ry="3" width="298" height="129" />
    <svg:rect x="104" y="217" rx="3" ry="3" width="578" height="42" />
    <svg:rect x="123" y="308" rx="3" ry="3" width="906" height="17" />
    <svg:circle cx="951" cy="386" r="11" />
    <svg:circle cx="986" cy="386" r="11" />
    <svg:rect x="176" y="378" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="377" y="377" rx="3" ry="3" width="299" height="15" />
    <svg:rect x="733" y="377" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="127" y="418" rx="3" ry="3" width="897" height="2" />
    <svg:circle cx="952" cy="447" r="11" />
    <svg:circle cx="987" cy="447" r="11" />
    <svg:rect x="177" y="439" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="378" y="438" rx="3" ry="3" width="299" height="15" />
    <svg:rect x="734" y="438" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="128" y="479" rx="3" ry="3" width="897" height="2" />
    <svg:circle cx="953" cy="505" r="11" />
    <svg:circle cx="988" cy="505" r="11" />
    <svg:rect x="178" y="497" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="379" y="496" rx="3" ry="3" width="299" height="15" />
    <svg:rect x="735" y="496" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="129" y="537" rx="3" ry="3" width="897" height="2" />
    <svg:circle cx="954" cy="566" r="11" />
    <svg:circle cx="989" cy="566" r="11" />
    <svg:rect x="179" y="558" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="380" y="557" rx="3" ry="3" width="299" height="15" />
    <svg:rect x="736" y="557" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="130" y="598" rx="3" ry="3" width="897" height="2" />
    <svg:circle cx="953" cy="626" r="11" />
    <svg:circle cx="988" cy="626" r="11" />
    <svg:rect x="178" y="618" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="379" y="617" rx="3" ry="3" width="299" height="15" />
    <svg:rect x="735" y="617" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="129" y="658" rx="3" ry="3" width="897" height="2" />
    <svg:circle cx="954" cy="687" r="11" />
    <svg:circle cx="989" cy="687" r="11" />
    <svg:rect x="179" y="679" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="380" y="678" rx="3" ry="3" width="299" height="15" />
    <svg:rect x="736" y="678" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="127" y="716" rx="3" ry="3" width="897" height="2" />
    <svg:rect x="123" y="312" rx="3" ry="3" width="2" height="465" />
    <svg:rect x="1027" y="312" rx="3" ry="3" width="2" height="465" />
    <svg:circle cx="954" cy="747" r="11" />
    <svg:circle cx="989" cy="747" r="11" />
    <svg:rect x="179" y="739" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="380" y="738" rx="3" ry="3" width="299" height="15" />
    <svg:rect x="736" y="738" rx="3" ry="3" width="141" height="15" />
    <svg:rect x="127" y="776" rx="3" ry="3" width="897" height="2" />
    <svg:rect x="124" y="343" rx="3" ry="3" width="906" height="17" />
    <svg:rect x="125" y="320" rx="3" ry="3" width="68" height="33" />
    <svg:rect x="294" y="317" rx="3" ry="3" width="149" height="33" />
    <svg:rect x="616" y="318" rx="3" ry="3" width="137" height="33" />
    <svg:rect x="854" y="319" rx="3" ry="3" width="72" height="33" />
    <svg:rect x="1005" y="317" rx="3" ry="3" width="22" height="33" />
    <svg:circle cx="743" cy="237" r="20" />
    <svg:rect x="739" y="217" rx="0" ry="0" width="67" height="40" />
    <svg:circle cx="802" cy="237" r="20" />
    <svg:circle cx="890" cy="238" r="20" />
    <svg:rect x="890" y="218" rx="0" ry="0" width="140" height="40" />
    <svg:circle cx="1032" cy="238" r="20" />
    
    </skeleton-screen-loader>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPagesSkeletonComponent extends SkeletonScreenLoaderComponent {
  random = Math.random() * (1 - 0.7) + 0.7
}