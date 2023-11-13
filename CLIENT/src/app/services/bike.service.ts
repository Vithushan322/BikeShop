import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bike } from '../models/bike';
import { Page, PaginatedResult } from '../models/pagination';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  baseUrl: string = environment.apiUrl;

  paginatedResult: PaginatedResult<Bike[]> = new PaginatedResult<Bike[]>

  constructor(private http: HttpClient) { }

  getBikes(page?: Page) {
    let params = new HttpParams();

    if (page) {
      params = params.append('pageNumber', page.pageNumber);
      params = params.append('pageSize', page.pageSize);
    }

    return this.http.get<Bike[]>(this.baseUrl + 'bike', { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) this.paginatedResult.results = response.body;

        const pagination = response.headers.get('Pagination');

        if (pagination) this.paginatedResult.pagination = JSON.parse(pagination);

        return this.paginatedResult;
      })
    );
  }

  getBike(bikeId: number) {
    return this.http.get<Bike>(this.baseUrl + 'bike/' + bikeId);
  }

  createBike(bike: Bike) {
    return this.http.post<Bike>(this.baseUrl + 'bike', bike);
  }

  updateBike(bikeId: number, bike: Bike) {
    return this.http.put<Bike>(this.baseUrl + `bike/${bikeId}`, bike);
  }

  deleteBike(bikeId: number) {
    return this.http.delete<Bike>(this.baseUrl + 'bike/' + bikeId);
  }
}
