import { Component } from '@angular/core';

import { MaterialModule } from './material.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


//______________________

import { DataSource } from '@angular/cdk/table';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Task, TaskColumns } from './model/task';
import { DataService } from './services/data.service';
import { CommonModule } from '@angular/common';



import { MatDatepickerModule } from '@angular/material/datepicker';

//_________



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    MatDatepickerModule,

],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})



export class AppComponent {
  title = 'listwave-frontend-app';  
  
  displayedColumns: string[] = TaskColumns.map((col) => col.key);
  columnsSchema: any = TaskColumns;
  dataSource = new MatTableDataSource<Task>();

  constructor(public dialog: MatDialog, private taskService: DataService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  editRow(row: any) {
    if (row.id === 0) {
      this.taskService.createTask(row).subscribe((newUser: Task) => {
        row.id = newUser.id;
        row.isEdit = false;
      });
    } else {
      this.taskService.updateTask(row).subscribe(() => (row.isEdit = false));
    }
  }

  addRow() {
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
    this.taskService.deleteTask(id).subscribe(() => {
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
          this.taskService.deleteTasks(tasks).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (u: Task) => !u.isSelected
            );
          });
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