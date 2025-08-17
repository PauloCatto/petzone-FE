import { Component } from '@angular/core';
import { HomeResponse } from 'src/app/models/pet';
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
    this.petService.getPets().subscribe(
      (response: HomeResponse) => {
        this.data = response ?? { products: [], backgroundAsset: '' };
      },
      (error: any) => {
        this.data = { products: [], backgroundAsset: '' };
        console.error('Erro ao buscar dados do backend:', error);
      }
    );
  }
}
