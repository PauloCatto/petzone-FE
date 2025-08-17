import { Component } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.scss'],
})
export class CatsComponent {
  cats: any[] = [];

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.getCats();
  }

  getCats(): void {
    this.petService.getTypes('cat').subscribe(
      (response) => {
        this.cats = response ?? [];
        console.log(this.cats)
      },
      (error) => {
        console.error('Erro ao buscar gatos do backend:', error);
        this.cats = [];
      }
    );
  }
}
