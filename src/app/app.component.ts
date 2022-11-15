import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardData } from './card-data.model';
import { RestartDialogComponent } from './restart-dialog/restart-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'MemLibras'

  // Card library
  cardImagesAlphabet = [
    'A', 'B', 'C', 'D', 'E',
    'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y',
    'Z'
  ];

  cardImagesVogals = [
    'A',
    'E',
    'I',
    'O',
    'U',
  ];

  cardImagesConsonants = [
    'B', 'C', 'D', 'F',
    'G', 'H', 'J', 'K',
    'L', 'M', 'N', 'P',
    'Q', 'R', 'S', 'T',
    'V', 'W', 'X', 'Y',
    'Z'
  ];

  cardImagesSelected = [];

  // Timer variables
  timerstate = true;
  second = 0;
  minute = 0;

  // Cards selected
  cardImages = [];

  // Cards data
  cards: CardData[] = [];

  flippedCards: CardData[] = [];

  matchedCount = 0;
  otherMatchedCount = 0;

  // Randomizing the cards
  shuffleArray(anArray: any[]): any[] {

    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);

  }

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  // Setting the cards
  setupCards(): void {

    this.cards = [];
    this.cardImages.forEach((image) => {

      const cardData: CardData = {

        imageId: image,
        code: 1,
        state: 'default'

      };

      const cardDataSinal: CardData = {

        imageId: image,
        code: 2,
        state: 'default'

      };

      this.cards.push({ ...cardData });
      this.cards.push({ ...cardDataSinal });


    });

    this.timerstate = true;
    document.getElementById('start-game').hidden = true;
    document.getElementById('game').hidden = false;

    this.cards = this.shuffleArray(this.cards);
    this.gridCalc();

  };

  // When the card is clicked
  cardClicked(index: number): void {

    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2) {

      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length > 1) {

        this.checkForCardMatch();

      }

    } else if (cardInfo.state === 'flipped') {

      cardInfo.state = 'default';
      this.flippedCards.pop();

    }

  };

  // Check if the card is matched or not
  checkForCardMatch(): void {

    const otherCardOne = this.flippedCards[0];
    const otherCardTwo = this.flippedCards[1];
    const otherState = otherCardOne.imageId === otherCardTwo.imageId ? 'matched' : 'default';

    if (otherState === 'matched') {

      this.otherMatchedCount++;

    }

    setTimeout(() => {

      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {

        this.matchedCount++;

        if (this.matchedCount === this.cardImages.length) {

          const dialogRef = this.dialog.open(RestartDialogComponent, { disableClose: true, data: { 'segundo': this.second, 'minuto': this.minute },

          });

          dialogRef.afterClosed().subscribe( result => {

            if (result) {

              this.restart();

            } else {

              this.changeMode();

            }

          }
          );
        };
      };

    }, 1500);
  };



  // Select the mode
  switchMode(mode: string): void {

    if (mode == 'vogal') {

      this.cardImages = this.cardImagesVogals;

    } else if (mode == 'consoante') {

      this.cardImages = this.cardImagesConsonants;

    } else if (mode == 'alfabeto') {

      this.cardImages = this.cardImagesAlphabet;

    } else {

      this.cardImages = this.cardImagesSelected;

    }

    this.setupCards();

  };

  // Restart game
  restart(): void {

    this.second = 0;
    this.minute = 0;
    this.matchedCount = 0;
    this.otherMatchedCount = 0;
    this.flippedCards = [];
    document.getElementById('segundo').innerText = '00';
    document.getElementById('minuto').innerText = '00';
    this.setupCards();

  }

  // Back to start menu
  changeMode(): void {

      window.location.reload();

  };

  // Timer
  timerGame(): void {

    var stopper = setInterval(() => {

      if (this.otherMatchedCount === this.cardImages.length) {

        clearInterval(timer);
        clearInterval(stopper);

      }

    });

    if (this.timerstate) {

     var timer = setInterval(() => {

        this.second++;

        if (this.second > 59) {

          this.second = 0;
          this.minute++;

        }

        document.getElementById('segundo').innerText = format(this.second);
        document.getElementById('minuto').innerText = format(this.minute);

      }, 1000);

      this.timerstate = false;

    }

    function format(number: any) {

        return number < 10 ? `0${ number }` : number;

    };


  };

  // Calculation of grid's cards
  gridCalc(): void {

    var fim: number;
    var numbers = [8, 7, 6, 5, 4];
    var restos = [];
    var maior_numero = 0;

    for (var i = 0; i != numbers.length; i++) {

      var resto = (this.cardImages.length * 2) % numbers[i];
      restos.push(resto);

    }

    if ((this.cardImages.length * 2) == 2) {

      fim = 2;

    } else {

      for (var i = 0; i != numbers.length; i++) {

        if (restos[i] == 0) {

          fim = numbers[i];
          break;

        } else {

          if (restos[i] > maior_numero) {

            maior_numero = restos[i];
            fim = numbers[i];

          }

        };

      };

    };

    document.getElementById('grid').style.gridTemplateColumns = `repeat(${ fim }, 150px)`;

  };

}
