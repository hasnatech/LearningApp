import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-spelling',
  templateUrl: './spelling.component.html',
  styleUrls: ['./spelling.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'scale(0)' })),
      transition(':enter', [
        style({ transform: 'scale(2)' }),
        animate('0.5s ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style(
          {
            transform: 'translateX(100%)'
          }

        ))
      ])
    ]),
    trigger('Appear', [
      state('flyIn', style({ transform: 'translateY(0)', opacity: 1 })),
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('1s {{delay}}ms ease')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class SpellingComponent implements OnInit {

  constructor(public router:Router) { 
    
  }
  
  data =
    [
      {
        image: 'assets/apple.png',
        text: "Apple",
        audio: "apple.mp3",
        choices: [
          { text: "Apple", value: true },
          { text: "Orange", value: false },
          { text: "Banana", value: false },
          { text: "Grapes", value: false }
        ]
      },
      {
        image: 'assets/orange.png',
        text: "Orange",
        audio: "orange.mp3",
        choices: [
          { text: "Apple", value: false },
          { text: "Orange", value: true },
          { text: "Banana", value: false },
          { text: "Grapes", value: false }
        ]
      }
    ]
    ;
  hideOption = false;
  currentState = 'enter';
  selectQuiz;
  charCount = 0;
  currentQuizNo = 0
  correctLetter = [];
  ngOnInit() {
    this.selectQuiz = this.data[this.currentQuizNo]
    this.playAudio(this.selectQuiz.audio);
  }
  playAudio(file, bool = false, wordSound = "") {
    console.log(file)
    let audio = new Audio();
    audio.src = "../../../assets/audio/" + file;
    audio.load();
    audio.play();

    if (bool == true) {
      audio.onended = () => {
        let arr = wordSound.split("");
        arr.push(wordSound);
        this.playArray(arr)
      }
    }
    return audio;
  }

  playArray(arr) {
    var audio = this.playAudio(arr[this.charCount].toLowerCase() + ".mp3");
    if (this.charCount < arr.length - 1) {
      this.correctLetter.push(arr[this.charCount].toUpperCase())
    }
    audio.onended = () => {
      this.charCount++
      if (this.charCount < arr.length) {
        this.playArray(arr);
      } else {
        //this.playAudio(word.toLowerCase()+".mp3");
        setTimeout(() => { this.nextQuestion() }, 2000);
      }
    }
  }
  nextQuestion() {
    if (this.currentQuizNo < this.data.length - 1) {
      this.correctLetter = [];
      this.hideOption = false;
      this.charCount = 0;
      this.currentQuizNo++;
      this.selectQuiz = this.data[this.currentQuizNo]
      this.playAudio(this.selectQuiz.audio);
    } else{
      this.router.navigateByUrl('result');
    }
  }
  evaluate(choice) {
    if (choice.value == true) {
      this.playAudio("correct.mp3", true, choice.text);
      this.hideOption = true;
    } else {
      this.playAudio("incorrect.mp3")
    }
  }
}
