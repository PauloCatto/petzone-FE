import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pet } from '../models/pet';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private url: string = environment.url;
  private searchTermSource = new BehaviorSubject<string>('');
  searchTerm$ = this.searchTermSource.asObservable();

  constructor(private http: HttpClient) {}

  setSearchTerm(term: string) {
    this.searchTermSource.next(term);
  }
  getPets(): Observable<{ products: Pet[]; backgroundAsset: string }> {
    return this.http.get<{ products: Pet[]; backgroundAsset: string }>(
      `${this.url}/home`
    );
  }
  getTypes(type: Pet['type']): Observable<Pet[]> {
    const path = type === 'fish' ? 'fishes' : `${type}s`;
    return this.http.get<Pet[]>(`${this.url}/${path}`);
  }

  searchPets(query: string): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.url}/search`, {
      params: { q: query },
    });
  }
}
