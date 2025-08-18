import { Component } from '@angular/core';
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
    this.petService.getTypes('fish').subscribe(
      (response) => {
        this.fishes = response ?? [];
        console.log(this.fishes)
      },
      (error) => {
        console.error('Erro ao buscar gatos do backend:', error);
        this.fishes = [];
      }
    );
  }
}
