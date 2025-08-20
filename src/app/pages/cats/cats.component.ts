import { Component } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { Pet } from 'src/app/models/pet';
import { PetService } from 'src/app/services/pet.service';
import { ReserveDialogComponent } from '../reserve-dialog/reserve-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss'],
})
export class CatsComponent {
  cats: Pet[] = [];

  constructor(private petService: PetService, public dialog: MatDialog) {}

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

   openReserveDialog(pet: Pet): void {
    const dialogRef = this.dialog.open(ReserveDialogComponent, {
      data: pet,
    });
  
    dialogRef.afterClosed().subscribe(result => {});
  }
}
