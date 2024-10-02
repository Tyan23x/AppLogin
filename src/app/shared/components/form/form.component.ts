import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {

  public image!: FormControl;
  public name!: FormControl;
  public lastName!: FormControl;
  public age!: FormControl;
  public phone!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public FormGrp!: FormGroup;

  @Output() formValid = new EventEmitter<boolean>(); 
  @Output() formSubmit = new EventEmitter<any>();

  constructor() {
    this.initForm();
  }

  ngOnInit() {}

  private initForm() {
    this.image = new FormControl('');
    this.name = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.age = new FormControl('', [Validators.required]);
    this.phone = new FormControl('', [Validators.required, Validators.pattern('^\\+[0-9]{1,3}\\s?([0-9]{1,15})$')]);

    this.FormGrp = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      age: this.age,
      phone: this.phone,
      email: this.email,
      password: this.password,
      image: this.image
    });

    this.FormGrp.statusChanges.subscribe(status => {
      this.formValid.emit(this.FormGrp.valid);
    });
  }

  public onSubmit() {
    if (this.FormGrp.valid) {
      this.formSubmit.emit(this.FormGrp.value);
    }
  }
}