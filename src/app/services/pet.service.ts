import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private url: string = environment.url;

  constructor(private http: HttpClient) {}

  getPets(): Observable<{ products: Pet[]; backgroundAsset: string }> {
    return this.http.get<{ products: Pet[]; backgroundAsset: string }>(
      `${this.url}/home`
    );
  }

  getTypes(type: Pet['type']): Observable<Pet[]> {
    const path = type === 'fish' ? 'fishes' : `${type}s`;
    return this.http.get<Pet[]>(`${this.url}/${path}`);
  }
}
