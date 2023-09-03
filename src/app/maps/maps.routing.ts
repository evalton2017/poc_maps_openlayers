import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnderecoComponent } from './endereco/endereco.component';

const routes: Routes = [
  {path:'maps', component: EnderecoComponent},
  {
    path: '',
    redirectTo: 'maps',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutinModule { }
