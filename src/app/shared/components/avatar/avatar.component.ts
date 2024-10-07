import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StorageService } from '../../services/storage/storage.service';
import { LoadingService } from '../../controllers/loading/loading.service';
import { ToastService } from '../../controllers/toast/toast.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent  implements OnInit {
  protected image = "https://ionicframework.com/docs/img/demos/avatar.svg"
  protected mimeType = "image/jpeg"

  @Input() control = new FormControl("");
  @Input() onlyView = false;

  constructor(private readonly storageSrv: StorageService, private readonly loadingSrv: LoadingService, private readonly toastSrv: ToastService) { }

  ngOnInit() {}

  public async uploadFile(event: any){
    try {
      await this.loadingSrv.show();
      console.log(event.target.files[0]);
      const url = await this.storageSrv.uploadFileAndGetUrl(event.target.files[0]);
      console.log("🚀 ~ AvatarComponent ~ uploadFile ~ url:", url);
      this.image = url;
      await this.loadingSrv.dismiss();
      this.toastSrv.presentToast('Profile photo successfully set!', true);
    } catch (error) {
      await this.loadingSrv.dismiss();
      console.error(error)
      this.toastSrv.presentToast('Error setting profile picture :c', false);
    }
  }
}