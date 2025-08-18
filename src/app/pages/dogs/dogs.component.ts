import { Component } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { Pet } from 'src/app/models/pet';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss'],
})
export class DogsComponent {
  dogs: Pet[] = [];

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.getDogs();
  }

  getDogs(): void {
    this.petService.searchTerm$
      .pipe(
        switchMap((term) => {
          if (!term) {
            return this.petService.getTypes('dog');
          }

          return this.petService.searchPets(term).pipe(
            map((results: Pet[]) =>
              results
                .filter((pet) => pet.type === 'dog')
                .map((pet) => ({
                  ...pet,
                  image: `assets/images/${pet.image}`,
                }))
            )
          );
        })
      )
      .subscribe(
        (response: any) => {
          this.dogs = response ?? [];
        },
        (error) => {
          console.error('Erro ao buscar gatos do backend:', error);
          this.dogs = [];
        }
      );
  }
}
