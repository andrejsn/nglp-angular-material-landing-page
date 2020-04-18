import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({

  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatDividerModule, MatIconModule, 
            MatSidenavModule, MatToolbarModule, MatListModule, MatTooltipModule, MatTabsModule, 
            MatTableModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatDividerModule, MatIconModule, 
            MatSidenavModule, MatToolbarModule, MatListModule, MatTooltipModule, MatTabsModule, 
            MatTableModule, MatFormFieldModule, MatInputModule, MatDialogModule]
})
export class Material2Module { }
