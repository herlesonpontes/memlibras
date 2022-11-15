import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardData } from '../card-data.model';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none',
      })),
      state('flipped', style({
        transform: 'perspective(600px) rotateY(180deg)'
      })),
      state('matched', style({
        // visibility: 'false',
        // transform: 'scale(0.05)',
        // opacity: 0
        cursor: 'default',
        transform: 'perspective(600px) rotateY(180deg)', 
        boxShadow: '0px 0px 3px 3px #00ff00'
      })),
      transition('default => flipped', [
        animate('400ms')
      ]),
      transition('flipped => default', [
        animate('400ms')
      ]),
      transition('* => matched', [
        animate('400ms', keyframes([
            style({ transform: 'scale(1.00) perspective(600px) rotateY(180deg)', boxShadow: '0px 0px 3px 3px #00ff00' }),  
            style({ transform: 'scale(0.75) perspective(600px) rotateY(180deg)', boxShadow: '0px 0px 3px 3px #00ff00' }),
            style({ transform: 'scale(1.00) perspective(600px) rotateY(180deg)', boxShadow: '0px 0px 3px 3px #00ff00' }),
          ])
        )
      ])
    ])
  ]
})
export class GameCardComponent implements OnInit {

  @Input() data: CardData;

  @Output() cardClicked = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
