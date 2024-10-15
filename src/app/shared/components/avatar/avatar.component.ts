import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StorageService } from '../../services/storage/storage.service';
import { LoadingService } from '../../controllers/loading/loading.service';
import { ToastService } from '../../controllers/toast/toast.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  protected image = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  protected mimeType = 'image/jpeg';

  @Input() control = new FormControl('');
  @Input() onlyView = false;
  @Input() imageUrl: string = '';

  @Output() imageUploaded = new EventEmitter<string>();

  constructor(
    private readonly storageSrv: StorageService,
    private readonly loadingSrv: LoadingService,
    private readonly toastSrv: ToastService
  ) {}

  ngOnInit() {}

  public async uploadFile(event: any) {
    const file = event.target.files[0];
    if (!file) {
      this.toastSrv.presentToast('No file selected', false);
      return;
    }

    try {
      await this.loadingSrv.show('Uploading image...');
      console.log(file);
      const url = await this.storageSrv.uploadFileAndGetUrl(file);
      console.log('🚀 ~ AvatarComponent ~ uploadFile ~ url:', url);
      this.image = url;
      this.imageUploaded.emit(url);  // Emitir la URL al componente padre
      await this.loadingSrv.dismiss();
      this.toastSrv.presentToast('Profile photo successfully set!', true);
    } catch (error) {
      await this.loadingSrv.dismiss();
      console.error(error);
      this.toastSrv.presentToast('Error setting profile picture :c', false);
    }
  }
}