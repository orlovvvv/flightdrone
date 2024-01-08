import {
    animate,
    keyframes,
    style,
    transition,
    trigger
} from '@angular/animations';

export const Animations = [
    trigger('pageTransition', [
        transition('* <=> *', [
            animate(
                '500ms cubic-bezier(0.2, 0.0, 0, 1.0)'
                , keyframes([
                    style({ opacity: 0 }),
                    style({ opacity: 1 }),
                ])
            ),
        ]),
    ]),
    trigger('inOut', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('0.35s cubic-bezier(0.2, 0.0, 0, 1.0)', style({ opacity: 1 })),
        ]),
        transition(':leave', [
            style({ opacity: 1 }),
            animate('0.2s cubic-bezier(0.2, 0.0, 0, 1.0)', style({ opacity: 0 })),
        ]),
    ]),
];