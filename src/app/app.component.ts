import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'petzone';
  selectedIndex = 0;
  routes = ['/all', '/dogs', '/cats', '/fish'];

   constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const idx = this.routes.indexOf(event.urlAfterRedirects);
        if (idx !== -1) this.selectedIndex = idx;
      }
    });
  }

   onTabChange(index: number) {
    this.router.navigate([this.routes[index]]);
  }
}
