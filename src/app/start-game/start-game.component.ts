import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent {

  // Inputs and outputing variables
  @Input() alphabet = [];
  @Output() modeName = new EventEmitter<string>();
  @Output() chosenLetters = new EventEmitter<Array<string>>();

  // Select the mode
  switchMode(id: string) {

    this.modeName.emit(id)
    this.showLetters(true)

  }

  // Show the letters menu
  showLetters(close: boolean) {

    if (close == true) {

      document.getElementById('letras').hidden = true;

    } else {

      document.getElementById('letras').hidden = false;

    }

  };

  // Select the checked letters and send it to app-component
  selectedLetters() {

  const letters = [];

    for (var i = 0; i != this.alphabet.length; i++) {

      const letter = document.getElementById(`${this.alphabet[i]}`) as HTMLInputElement

      if (letter.checked) {

        letters.push(this.alphabet[i])

      }

    };

    if (letters.length > 0) {

      this.chosenLetters.emit(letters)

        this.switchMode('letra')
        this.showLetters(true)

    } else {

      alert('Não é possível iniciar um jogo sem nenhuma letra.');

    }

  }

}
