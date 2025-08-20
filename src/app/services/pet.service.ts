import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  getPets(): Observable<{ products: Pet[] }> {
    return this.http.get<{ products: Pet[] }>(`${this.url}/home`).pipe(
      map((response) => {
        return {
          ...response,
          products: response.products.map((pet) => ({
            ...pet,
            image: pet.image,
          })),
        };
      })
    );
  }
  getTypes(type: Pet['type']): Observable<Pet[]> {
    const path = type === 'fish' ? 'fishes' : `${type}s`;
    return this.http.get<Pet[]>(`${this.url}/${path}`).pipe(
      map((pets) =>
        pets.map((pet) => ({
          ...pet,
          image: pet.image,
        }))
      )
    );
  }

  searchPets(query: string): Observable<Pet[]> {
    return this.http
      .get<Pet[]>(`${this.url}/search`, {
        params: { q: query },
      })
      .pipe(
        map((pets) =>
          pets.map((pet) => ({
            ...pet,
            image: pet.image,
          }))
        )
      );
  }
  sendReservation(reservationData: any): Observable<any> {
    return this.http.post(`${this.url}/email`, reservationData);
  }
}
