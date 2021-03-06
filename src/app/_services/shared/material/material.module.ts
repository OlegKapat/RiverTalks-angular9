import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

const MaterialComponent=[
  MatSidenavModule,
  MatSliderModule,
  MatMenuModule,
  MatIconModule,
  MatInputModule,
  MatCardModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatButtonModule,
  MatFormFieldModule,
  MatDividerModule,
  MatCheckboxModule,
]

@NgModule({
  imports: [MaterialComponent],
  exports:[MaterialComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
 
})
export class MaterialModule { }
