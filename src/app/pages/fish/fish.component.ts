import { Component } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { Pet } from 'src/app/models/pet';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-fish',
  templateUrl: './fish.component.html',
  styleUrls: ['./fish.component.scss'],
})
export class FishComponent {
  fishes: Pet[] = [];

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.getFishes();
  }

  getFishes(): void {
    this.petService.searchTerm$
      .pipe(
        switchMap((term) => {
          if (!term) {
            return this.petService.getTypes('fish');
          }

          return this.petService.searchPets(term).pipe(
            map((results: Pet[]) =>
              results
                .filter((pet) => pet.type === 'fish')
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
          this.fishes = response ?? [];
        },
        (error) => {
          console.error('Erro ao buscar gatos do backend:', error);
          this.fishes = [];
        }
      );
  }
}
