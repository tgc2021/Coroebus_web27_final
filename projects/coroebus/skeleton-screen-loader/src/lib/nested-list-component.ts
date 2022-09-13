import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SkeletonScreenLoaderComponent } from './skeleton-screen-loader.component';

@Component({
    selector: 'nested-list-skeleton',
    template: `
    <skeleton-screen-loader viewBox="0 0 400 110"
    width="1000"
    height="550"
    viewBox="0 0 1000 550"
    backgroundColor="#eaeced"
    foregroundColor="#ffffff">
   <svg:rect x="0" y="0" rx="3" ry="3" width="906" height="10" />
    <svg:rect x="20" y="20" rx="3" ry="3" width="806" height="10" />
    <svg:rect x="20" y="40" rx="3" ry="3" width="806" height="10" />
    <svg:rect x="0" y="60" rx="3" ry="3" width="906" height="10" />
    <svg:rect x="20" y="80" rx="3" ry="3" width="806" height="10" />
    <svg:rect x="20" y="100" rx="3" ry="3" width="806" height="10" />
    </skeleton-screen-loader>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestedListSkeletonComponent extends SkeletonScreenLoaderComponent {
    random = Math.random() * (1 - 0.7) + 0.7
}