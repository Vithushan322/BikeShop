import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  setMainPhoto(photoId: number) {
    return this.http.put<any>(this.baseUrl + 'bike/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete<any>(this.baseUrl + 'bike/delete-photo/' + photoId);
  }
}
