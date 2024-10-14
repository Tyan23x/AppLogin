import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { AuthService } from 'src/app/shared/services/auths/auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore/firestore.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})

export class UpdatePage implements OnInit {
  userId: string | null = null;

  @ViewChild(FormComponent) formComponent!: FormComponent;

  constructor(
    private readonly authSrv: AuthService,
    private readonly firestoreSrv: FirestoreService,
    private readonly cdr: ChangeDetectorRef,
    private readonly route: ActivatedRoute, 
    private readonly loadingSrv: LoadingService
  ) {}

  async ngOnInit() {
  
    this.loadingSrv.show('Loading user data...');  
    this.userId = this.route.snapshot.paramMap.get('uid'); 
    console.log('User ID from URL:', this.userId);
    if (this.userId) {
    
      this.firestoreSrv.getUserProfile(this.userId).subscribe((userData: any) => {
        this.loadingSrv.dismiss();
        console.log('Datos del usuario desde Firestore:', userData); 
        if (userData && this.formComponent) {
          this.formComponent.setFormData(userData);
          if (userData.image) {
            this.formComponent.setAvatar(userData.image); 
          } 
          this.cdr.detectChanges(); 
        }
      });
    }
  }
}