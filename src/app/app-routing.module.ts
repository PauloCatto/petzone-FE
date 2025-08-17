import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './pages/all/all.component';
import { FishComponent } from './pages/fish/fish.component';
import { DogsComponent } from './pages/dogs/dogs.component';
import { CatsComponent } from './pages/cats/cats.component';

const routes: Routes = [
  { path: 'all', component: AllComponent },
  { path: 'dogs', component: DogsComponent },
  { path: 'cats', component: CatsComponent },
  { path: 'fish', component: FishComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
