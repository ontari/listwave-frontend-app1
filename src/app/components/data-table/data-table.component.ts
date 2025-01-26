import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../../services/data.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';

import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
  imports:
    [
      MaterialModule,
    ],
})




export class DataTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'description', 'status'];
  dataSource: any[] = [];

  constructor(
    private dataService: DataService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getData().subscribe((data) => {
      console.log(data); // Debugging-Ausgabe
      this.dataSource = data;
    }, error => {
      console.error('Error loading data:', error); // Fehlerbehandlung
    });
  }
  
  
  

  addRecord(): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: { mode: 'add' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.createData(result).subscribe(() => {
          this.snackBar.open('Record added successfully!', 'Close', {
            duration: 2000,
          });
          this.loadData();
        });
      }
    });
  }

  editRecord(record: any): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: { mode: 'edit', record },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.updateData(record.id, result).subscribe(() => {
          this.snackBar.open('Record updated successfully!', 'Close', {
            duration: 2000,
          });
          this.loadData();
        });
      }
    });
  }

  deleteRecord(id: number): void {
    this.dataService.deleteData(id).subscribe(() => {
      this.snackBar.open('Record deleted successfully!', 'Close', {
        duration: 2000,
      });
      this.loadData();
    });
  }
}
