import { Component } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-dogs',
  templateUrl: './dogs.component.html',
  styleUrls: ['./dogs.component.scss'],
})
export class DogsComponent {
  dogs: any[] = [];

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.getDogs();
  }

  getDogs(): void {
    this.petService.getTypes('dog').subscribe(
      (response) => {
        this.dogs = response ?? [];
        console.log(this.dogs);
      },
      (error) => {
        console.error('Erro ao buscar gatos do backend:', error);
        this.dogs = [];
      }
    );
  }
}
