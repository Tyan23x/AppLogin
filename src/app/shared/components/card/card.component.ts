import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  // @Input() tasks: { title: string, description: string, done: boolean; }[] = [];
  @Input() Title: string = '';
  @Input() Description: string = '';

  constructor() { }

  ngOnInit() {}

}
