import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
//import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../services/data.service';

import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../../material.module';
import { Task, TaskColumns } from '../../model/task';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  standalone: true,
  imports:
    [
      MaterialModule,
      HttpClientModule,
      CommonModule,
      FormsModule,
    ],
})




export class DataTableComponent implements OnInit {

  apiUrl = 'http://localhost:8080/ListWave-1.0/api/list';
  httpClient = inject(HttpClient);
  dataSource2: any[] = [];


  displayedColumns: string[] = TaskColumns.map((col) => col.key);
  columnsSchema: any = TaskColumns;

  dataSource = new MatTableDataSource<Task>();

  constructor(public dialog: MatDialog, private taskService: DataService) { }

  ngOnInit(): void { //ok

    this.fetchData();
    this.taskService.getTasks().subscribe((res: any) => {
      this.dataSource.data = res;
    });

  }

  fetchData(): void {
    this.httpClient
      .get(this.apiUrl)
      .subscribe((data: any) => {
        console.log(data);
        this.dataSource2 = data;
      });
  }


  deleteRecord(id: number) {
    this.httpClient.delete(this.apiUrl + `/${id}`)
      .subscribe((res: any) => {
        this.dataSource.data = res;
      });

      this.ngOnInit();
  }


  deleteSelectedRecords(tasks: Task[]) {

    for (let task of tasks) {
      this.deleteRecord(task.id)
    }

  }

  updateRecord(item: any) {

    this.httpClient.put(this.apiUrl + `/${item.id}`, item).subscribe(() => this.fetchData());
  }


  refresh(): void {
    console.log('Button Refresh Table clicked!');
    this.ngOnInit();
    window.location.reload();
  }

  onDeleteClick(item: any): void {
    console.log('Button DEL clicked!');
    this.deleteRecord(item.id);
  }


  editRow(row: any) {
    if (row.id === 0) {
      this.taskService.createTask(row).subscribe((newTask: Task) => {
        row.id = newTask.id;
        row.isEdit = false;
      });
    } else {
      console.log(row, 'editRow');
      this.updateRecord(row);
      this.taskService.updateTask(row).subscribe(() => (row.isEdit = false));
    }

  }

  addRow() { //ok
    const newRow: Task = {
      id: 0,
      description: '',
      status: '',
      isEdit: true,
      isSelected: false,
    };
    this.dataSource.data = [newRow, ...this.dataSource.data];
  }

  removeRow(id: any) {
    this.httpClient.delete(this.apiUrl + `/${id}`)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(
          (u: Task) => u.id !== id
        );
      });

  }

  removeSelectedRows() {
    const tasks = this.dataSource.data.filter((u: Task) => u.isSelected);
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.deleteSelectedRecords(tasks);
        }
      });
  }

  isAllSelected() {
    return this.dataSource.data.every((item) => item.isSelected);
  }

  isAnySelected() {
    return this.dataSource.data.some((item) => item.isSelected);
  }

  selectAll(event: any) {
    this.dataSource.data = this.dataSource.data.map((item) => ({
      ...item,
      isSelected: event.checked,
    }));
  }

}
