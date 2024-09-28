import { Component, Input, OnInit } from '@angular/core';

type ColorButtonType = "success" | "danger" | "warning" | "secondary" | "primary"
type ButtonType = "button" | "submit"
type PropertyType = "clear" | "outline" | "solid"

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent  implements OnInit {

  @Input({ required: true }) value = '';
  @Input() type: ButtonType = 'button';
  @Input() fill: PropertyType = 'clear';
  @Input() color: ColorButtonType = "success";

  constructor() { }

  ngOnInit() {}

}
