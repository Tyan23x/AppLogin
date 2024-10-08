import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { AuthService } from 'src/app/shared/services/auths/auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore/firestore.service';

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
    private readonly cdr: ChangeDetectorRef // Para forzar la detección de cambios
  ) {}

  async ngOnInit() {
    // Obtener el ID del usuario autenticado
    const user = await this.authSrv.getUserData();
    console.log(user);
    if (user) {
      this.userId = user.uid;

      // Recuperar los datos del usuario desde Firestore
      this.firestoreSrv.getUserProfile(this.userId).subscribe((userData: any) => {
        console.log('Datos del usuario desde Firestore:', userData);  // Verificar qué datos trae Firestore
        if (userData && this.formComponent) {
          this.cdr.detectChanges();
        }
      });
    }
  }
}