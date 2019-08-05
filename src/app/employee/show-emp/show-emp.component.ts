import { Component, OnInit, ViewChild } from '@angular/core';

import {MatTableDataSource, MatSort, MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import { AddEmpComponent } from '../add-emp/add-emp.component';
import { EditEmpComponent } from '../edit-emp/edit-emp.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee-model';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(
    private service: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
      this.service.listen().subscribe((m: any) => {
        console.log(m);
        this.refreshEmpList();
      });
  }

  listData: MatTableDataSource<any>;
  displayedColumn: string[] = ['Options', 'EmployeeID', 'EmployeeName', 'Department', 'MailID', 'DOJ'];

  @ViewChild(MatSort, null) sort: MatSort;

  ngOnInit() {
    this.refreshEmpList();
  }

  refreshEmpList() {
    this.service.getEmpList().subscribe(data => {
      this.listData = new MatTableDataSource(data);
      this.listData.sort = this.sort;
    });
  }

  applyFilter(filtervalue: string) {
    this.listData.filter = filtervalue.trim().toLocaleLowerCase();
  }

  onEdit(dep: Employee) {
    console.log(dep);
    this.service.formData = dep;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(EditEmpComponent, dialogConfig);
  }

  onDelete(id: number) {
    console.log(id);
    if (confirm('Are you sure to delete?')) {
      this.service.deleteDepartment(id).subscribe( res => {
        this.refreshEmpList();
        this.snackBar.open(res['message'].toString(), '', {
          duration: 5000,
          verticalPosition: 'top'
        });

      });
    }
  }

  onAdd() {
    console.log('onAdd()');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    this.dialog.open(AddEmpComponent, dialogConfig);
  }


}
