import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../services/data.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';


import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  imports:
    [
      MaterialModule,
      HttpClientModule,
      CommonModule
    ],
})




export class DataTableComponent implements OnInit {

  httpClient = inject(HttpClient);
  dataSource: any[] = [];

  displayedColumns: string[] = ['id', 'description', 'status'];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.httpClient
      .get('http://localhost:8080/ListWave-1.0/api/list')
      .subscribe((data: any) => {
        console.log(data);
        this.dataSource = data;
      });
  }


  onEditClick(item: any): void {
    console.log('Button Edit clicked!');
    alert('Button EDIt was clicked!');
  }

  onDeleteClick(item: any): void {
    console.log('Button DEL clicked!');
    alert('Button DEL was clicked!');
  }

}
