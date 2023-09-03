import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatStepperModule } from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from  '@angular/material/radio';
import {MatGridListModule} from  '@angular/material/grid-list';
import {MatListModule} from  '@angular/material/list';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EnderecoComponent } from './endereco/endereco.component';
import { MapsComponent } from './maps.component';
import { MapsRoutinModule } from './maps.routing';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  declarations: [
      EnderecoComponent,
      MapsComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    //ANGULAR MATERIAL
    MatStepperModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatButtonModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatIconModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    NgxLoadingModule.forRoot({}),
    MapsRoutinModule

  ],
  exports:[

  ]
})
export class MapsModule { }
