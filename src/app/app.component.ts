import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DataTableComponent } from './components/data-table/data-table.component';

import { MaterialModule } from './material.module';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EditDialogComponent } from "./components/edit-dialog/edit-dialog.component";



@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    DataTableComponent,
    EditDialogComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'listwave-frontend-app';
}
