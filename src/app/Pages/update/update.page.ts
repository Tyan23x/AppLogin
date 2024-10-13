import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from 'src/app/shared/components/form/form.component';
import { AuthService } from 'src/app/shared/services/auths/auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore/firestore.service';
import { ActivatedRoute } from '@angular/router';
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
    private readonly cdr: ChangeDetectorRef, // Para forzar la detección de cambios
    private readonly route: ActivatedRoute,  // Inyectar ActivatedRoute
  ) {}

  async ngOnInit() {
    // Obtener el UID del usuario desde la URL
    this.userId = this.route.snapshot.paramMap.get('uid'); // Obtener el UID desde la URL
    console.log('User ID from URL:', this.userId);
    if (this.userId) {
      // Recuperar los datos del usuario desde Firestore
      this.firestoreSrv.getUserProfile(this.userId).subscribe((userData: any) => {
        console.log('Datos del usuario desde Firestore:', userData);  // Verificar qué datos trae Firestore
        if (userData && this.formComponent) {
          this.formComponent.setFormData(userData);  // Llenar el formulario con los datos del usuario
          this.cdr.detectChanges();  // Forzar la detección de cambios para asegurarse de que los datos se muestren
        }
      });
    }
  }
}