import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent {
  @Input() options: { label: string, value: string, icon: string }[] = [];
  @Output() selectOption = new EventEmitter<string>();

  // Método que se ejecuta al seleccionar una opción
  public onOptionClick(value: string) {
    this.selectOption.emit(value); // Emitir el valor seleccionado
  }
}