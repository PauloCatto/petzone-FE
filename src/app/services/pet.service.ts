import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getPets(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/home`);
  }

  getTypes(type: 'dog' | 'cat' | 'fish'): Observable<any[]> {
    const path = type === 'fish' ? 'fishes' : `${type}s`;
    return this.http.get<any[]>(`${this.baseUrl}/${path}`);
  }
}
