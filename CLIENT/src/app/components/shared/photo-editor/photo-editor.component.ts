import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { first, take } from 'rxjs';
import { Bike } from 'src/app/models/bike';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { PhotoService } from 'src/app/services/photo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
  @Input() bike: Bike | undefined;

  uploader: FileUploader | undefined;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  user: User | undefined;

  constructor(
    private accountService: AccountService,
    private photoService: PhotoService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => { if (user) this.user = user; }
    });
  }

  ngOnInit(): void {
    this.initializeUploader()
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + `bike/add-photo/ ${this.bike?.id}`,
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.bike?.photos?.push(photo);
      }
    }
  }

  makePhotoPrimary(photoId: number) {
    this.photoService.setMainPhoto(photoId).subscribe({
      next: (response) => {
        if (!!this.bike?.photos) {
          this.bike.photos.forEach(photo => {
            photo.isMain = false;
            if (photo.id === photoId) photo.isMain = true;
          });
        }
      },
      error: error => console.error(error.error)
    });
  }

  deletePhoto(photoId: number) {
    this.photoService.deletePhoto(photoId).subscribe({
      next: () => {
        if (!!this.bike?.photos)
          this.bike.photos = this.bike.photos.filter(x => x.id !== photoId);
      },
      error: error => console.error(error.error)
    });
  }
}
