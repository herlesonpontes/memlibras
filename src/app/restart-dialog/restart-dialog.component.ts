import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-restart-dialog',
  templateUrl: './restart-dialog.component.html',
  styleUrls: ['./restart-dialog.component.scss']
})
export class RestartDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public tempo: {segundo: number, minuto: number}) {}

  ngOnInit(): void {
    this.format()
  }

  format(): void {

    let segundo: any;
    let minuto: any;

    if (this.tempo.segundo < 10) {

      segundo = `0${this.tempo.segundo}`
      this.tempo.segundo = segundo;

    }

    if (this.tempo.minuto < 10) {

      minuto = `0${this.tempo.minuto}`
      this.tempo.minuto = minuto;

    }
  }
}
