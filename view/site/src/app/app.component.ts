import { Component, OnInit } from '@angular/core';
import { ServerService } from "app/server.service";
import { Card } from "app/model/card";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(private serverService: ServerService){}

  name: string;
  favious: string;
  cards: Card[];

  ngOnInit() {
    this.serverService.get()
    .then(cards => {
      this.cards = cards;
    })
  }

  submit() {
    this.serverService.save(this.name, this.favious)
    .then(cards => {
      this.cards = cards;
      this.name = "";
      this.favious = "";
    })
  }
}
