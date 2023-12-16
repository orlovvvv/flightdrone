import {
    animate,
    keyframes,
    style,
    transition,
    trigger,
} from '@angular/animations';

export const Animations = [
    trigger('pageTransition', [
        transition('* <=> *', [
            animate(
                '0.7s ease',
                keyframes([
                    style({ transform: 'translateY(20px)', opacity: 0 }),
                    style({ transform: 'translateY(2px)', opacity: 0.2 }),
                    style({ transform: 'translateY(0px)', opacity: 1 }),
                ])
            ),
        ]),
    ]),
    trigger('inOut', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('0.3s ease-out', style({ opacity: 1 })),
        ]),
        transition(':leave', [
            style({ opacity: 1 }),
            animate('0.2s ease-in', style({ opacity: 0 })),
        ]),
    ]),
];