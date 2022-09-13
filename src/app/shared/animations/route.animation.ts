import {
    trigger,
    style,
    animate,
    transition,
    query,
    group,
} from '@angular/animations';

const resetRoute = [
    style({ position: 'relative' }),
    query(
        ':enter, :leave',
        [
            style({
                position: 'fixed', // using absolute makes the scroll get stuck in the previous page's scroll position on the new page
                top: '64px', // take into account header height
                left: 0,
                width: '100%',
                opacity: 0,
            }),
        ],
        { optional: true }
    ),
];
export const RouteFadeAnimation = [
    trigger('routeFadeAnimation', [
        transition('* => *', [
            ...resetRoute,
            query(':enter', [style({ transform: 'translateY(100px)', opacity: 0 })], {
                optional: true,
            }),
            group([
                query(
                    ':leave',
                    [
                        style({ opacity: 1 }),
                        animate(
                            '0.5s',
                            style({ transform: 'translateY(100px)', opacity: 0 })
                        ),
                    ],
                    { optional: true }
                ),
                query(
                    ':enter',
                    [
                        style({ opacity: 0 }),
                        animate('0.5s', style({ transform: 'translateY(0)', opacity: 1 })),
                    ],
                    { optional: true }
                ),
            ]),
        ]),
        transition('theme-selection => login', [
            ...resetRoute,
            query(':enter', [style({ opacity: 0 })], {
                optional: true,
            }),
            group([
                query(
                    ':leave',
                    [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
                    { optional: true }
                ),
                query(
                    ':enter',
                    [style({ opacity: 0 }), animate('0.5s', style({ opacity: 1 }))],
                    { optional: true }
                ),
            ]),
        ]),
    ]),
    trigger('fadeSlideInOut', [
        transition(':enter', [
            // style({ opacity: 0, transform: 'translateY(10px)' }),
            // animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
        ]),
        transition(':leave', [
            // animate('500ms', style({ opacity: 0, transform: 'translateY(10px)' })),
        ]),
    ]),
];