import { Component } from '@angular/core';
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
    this.petService.getTypes('dog').subscribe(
      (response) => {
        this.dogs = response ?? [];
      },
      (error) => {
        console.error('Erro ao buscar gatos do backend:', error);
        this.dogs = [];
      }
    );
  }
}
