import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';
import { AuthService } from 'src/app/shared/services/auths/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public isFormValid: boolean = false;

  constructor(private readonly authService: AuthService) {
    
  }

  ngOnInit() {}

}