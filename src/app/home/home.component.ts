import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  games = [
    {
      text:"Spelling",
      link:"/spelling/en/0"
    },
    {
      text:"Tamil Spelling",
      link:"/spelling/tamil/1"
    }
    /*,
    {
      text:"Drag and drop",
      link:"/drag-spelling"
    },
    {
      text:"Opposite",
      link:"/opposite/1"
    }*/
  ]

  constructor() { }

  ngOnInit() {
  }

}
