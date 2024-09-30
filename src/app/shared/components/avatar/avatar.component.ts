import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StorageService } from '../../services/storage/storage.service';

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

  constructor(private readonly storageSrv: StorageService) { }

  ngOnInit() {}

  public async uploadFile(event: any){
    try {
      console.log(event.target.files[0]);
      const url = await this.storageSrv.uploadFileAndGetUrl(event.target.files[0]);
      console.log("🚀 ~ AvatarComponent ~ uploadFile ~ url:", url);
      this.control.setValue(url);
    } catch (error) {
      console.error(error)
    }
    
  }
}
