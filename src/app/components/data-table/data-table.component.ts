import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
      CommonModule,
      FormsModule
    ],
})




export class DataTableComponent implements OnInit {

  apiUrl ='http://localhost:8080/ListWave-1.0/api/list';
  httpClient = inject(HttpClient);
  dataSource: any[] = [];

  newTask: any = {description: '', status:''};

  displayedColumns: string[] = ['id', 'description', 'status',];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.httpClient
      .get(this.apiUrl)
      .subscribe((data: any) => {
        console.log(data);
        this.dataSource = data;
      });
  }


  deleteRecord(id: number) {
    this.httpClient.delete(this.apiUrl+`/${id}`)
      .subscribe(() => this.fetchData());
  }


  onEditClick(item: any): void {
    console.log('Button Edit clicked!');
    alert('Button EDIt was clicked!');
  }

  onDeleteClick(item: any): void {
    console.log('Button DEL clicked!');
    this.deleteRecord(item.id);
    this.ngOnInit();
  }

}
