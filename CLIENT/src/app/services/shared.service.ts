import { HttpBackend, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseUrl: string = environment.weatherUrl;
  weatherAPIKey: string = environment.weatherAPIKey;

  private httpClient: HttpClient;

  constructor(private handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }
  
  getCurrentWeather(city: string) {
    let params = new HttpParams();
    params = params.append('appid', this.weatherAPIKey);
    params = params.append('q', city);
    
    return this.httpClient.get<any>(this.baseUrl, { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) return response.body;
      })
    );
  }
}
