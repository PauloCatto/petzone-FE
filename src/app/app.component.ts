import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { PetService } from './services/pet.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'petzone';
  selectedIndex = 0;
  routes = ['/all', '/dogs', '/cats', '/fish'];
  searchTerm: string = '';

  constructor(private router: Router, private petService: PetService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const idx = this.routes.indexOf(event.urlAfterRedirects);
        if (idx !== -1) this.selectedIndex = idx;
      }
    });
  }

  onSearch(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.petService.setSearchTerm(this.searchTerm);
  }
  onTabChange(index: number) {
    this.router.navigate([this.routes[index]]);
  }
}
