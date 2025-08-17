import { Component } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss'],
})
export class AllComponent {
  data: any;

  constructor(protected petService: PetService) {}

  ngOnInit(): void {
    this.getAllPets();
  }

  getAllPets(): void {
    this.petService.getPets().subscribe(
      (response: any) => {
        this.data = response ?? [];
      },
      (error: any) => {
        this.data = [];
        console.error('Erro ao buscar dados do backend:', error);
      }
    );
  }
}
