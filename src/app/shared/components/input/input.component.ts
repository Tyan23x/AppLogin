import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

type ButtonType = 'text' | 'password' | 'number' | 'email' | 'tel';
type PropertyType = "clear" | "outline" | "solid"

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() label: string = '';
  @Input() control!: FormControl;
  @Input() type: ButtonType = 'text';
  @Input() fill: PropertyType = 'clear';
  @Input() placeholder: string= '';

  constructor() {}

  ngOnInit() {}

  setValue(event: any) {
    this.control.setValue(event.target.value);
  }
}
