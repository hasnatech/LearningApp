import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router, ActivatedRoute } from '@angular/router';
import  *  as  jsonData  from  './data.json'; 

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

  quest;
  hideOption = false;
  currentState = 'enter';
  selectQuiz;
  charCount = 0;
  currentQuizNo = 0
  correctLetter = [];
  value;
  data;
  lang;

  constructor(public router: Router, public route: ActivatedRoute) {

  }

  ngOnInit() {
    this.quest = (jsonData  as  any).default;;
    console.log(this.quest)
    this.route.params.subscribe(params => {
      this.value = params.id; // --> Name must match wanted parameter
      this.lang = params.lang; // --> Name must match wanted parameter
      this.data = this.getRandom(this.quest[this.value]);
      this.selectQuiz = this.data[this.currentQuizNo]
      this.playQuestion(["spell", this.selectQuiz.text])
    });

  }
  playAudio(file, bool = false, wordSound = []) {
    console.log(file)
    let audio = new Audio();
    audio.src = "assets/audio/" + file;
    audio.load();
    audio.play();

    if (bool == true) {
      audio.onended = () => {
        let arr = wordSound;
        arr.push(this.selectQuiz.text.toLowerCase());
        this.playArray(arr)
      }
    }
    return audio;
  }

  playArray(arr) {
    //console.log(arr)
    if (arr[this.charCount].toLowerCase() == " ") {
      this.correctLetter.push(arr[this.charCount])
      this.charCount++;
      if (this.charCount < arr.length) {
        this.playArray(arr);
      }

    } else {
      var audio = this.playAudio(arr[this.charCount].toLowerCase().split(" ").join("") + ".mp3");
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
  }

  questCount = 0;
  playQuestion(arr) {
    var audio = this.playAudio(arr[this.questCount].toLowerCase().split(" ").join("") + ".mp3");
    //console.log(arr[this.questCount].toLowerCase().split(" ").join(""))
    audio.onended = () => {
      this.questCount++
      if (this.questCount < arr.length) {
        this.playQuestion(arr);
      }
    }
  }
  nextQuestion() {
    if (this.currentQuizNo < this.data.length - 1) {
      this.correctLetter = [];
      this.hideOption = false;
      this.charCount = 0;
      this.questCount = 0;
      this.currentQuizNo++;
      this.selectQuiz = this.data[this.currentQuizNo];
      this.playQuestion(["spell", this.selectQuiz.text])
      //this.playAudio(this.selectQuiz.audio);
    } else {
      this.router.navigateByUrl('result');
    }
  }
  getRandom(arr) {
    //arr.sort(() => Math.random() - 0.5);
    return arr;
  }
  evaluate(choice) {
    if (choice.value == true) {
      if (this.selectQuiz.answer != undefined) {
        this.playAudio("correct.mp3", true, this.selectQuiz.answer);
      }else{
        this.playAudio("correct.mp3", true, choice.text.split(""));
      }
      this.hideOption = true;
    } else {
      this.playAudio("incorrect.mp3")
    }
  }
}
