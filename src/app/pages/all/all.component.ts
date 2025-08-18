import { Component } from '@angular/core';
import { switchMap, of } from 'rxjs';
import { HomeResponse, Pet } from 'src/app/models/pet';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
})
export class AllComponent {
  data: HomeResponse = { products: [], backgroundAsset: '' };

  constructor(protected petService: PetService) {}

  ngOnInit(): void {
    this.getAllPets();
  }

  getAllPets(): void {
    this.petService.searchTerm$
      .pipe(
        switchMap((term) => {
          if (!term) {
            return this.petService.getPets();
          } else {
            return this.petService.searchPets(term).pipe(
              switchMap((results: Pet[]) => {
                return of({
                  products: results,
                  backgroundAsset: 'allanimals.jpg',
                });
              })
            );
          }
        })
      )
      .subscribe(
        (response: any) => {
          this.data = response ?? { products: [], backgroundAsset: '' };
        },
        (error) => {
          console.error('Erro ao buscar dados do backend:', error);
          this.data = { products: [], backgroundAsset: '' };
        }
      );
  }
}
