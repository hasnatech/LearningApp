import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-drag-spelling',
  templateUrl: './drag-spelling.component.html',
  styleUrls: ['./drag-spelling.component.scss']
})
export class DragSpellingComponent implements OnInit {

  constructor() { }
  data =
    [
      {
        image: 'assets/apple.png',
        text: "Apple"
      },
      {
        image: 'assets/orange.png',
        text: "Orange"
      }
    ]
    ;
  selectQuiz;
  letters = [];
  options = [];
  ngOnInit() {
    this.selectQuiz = this.data[1]
    this.letters = this.selectQuiz.text.toUpperCase().split("");
    this.options = this.getRandom(this.selectQuiz.text.toUpperCase())
  }
  getRandom(txt) {
    let result = txt.split("");
    result.sort(() => Math.random() - 0.5);
    return result;
  }

 
}
