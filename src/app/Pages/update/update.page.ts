import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { AuthService } from 'src/app/shared/services/auths/auth.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {}
}