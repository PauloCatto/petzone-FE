import { Component } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { Pet } from 'src/app/models/pet';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss'],
})
export class CatsComponent {
  cats: Pet[] = [];

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.getCats();
  }

  getCats(): void {
    this.petService.searchTerm$
      .pipe(
        switchMap((term) => {
          if (!term) {
            return this.petService.getTypes('cat');
          }

          return this.petService.searchPets(term).pipe(
            map((results: Pet[]) =>
              results
                .filter((pet) => pet.type === 'cat')
                .map((pet) => ({
                  ...pet,
                  image: `assets/images/${pet.image}`,
                }))
            )
          );
        })
      )
      .subscribe(
        (response: Pet[]) => {
          this.cats = response ?? [];
        },
        (error) => {
          console.error('Erro ao buscar gatos do backend:', error);
          this.cats = [];
        }
      );
  }
}
