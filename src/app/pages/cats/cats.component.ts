import { Component } from '@angular/core';
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
    this.petService.getTypes('cat').subscribe(
      (response) => {
        this.cats = response ?? [];
      },
      (error) => {
        console.error('Erro ao buscar gatos do backend:', error);
        this.cats = [];
      }
    );
  }
}
