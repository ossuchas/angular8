import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})
export class EditEmpComponent implements OnInit {

  constructor(
    public dialogbox: MatDialogRef<EditEmpComponent>,
    public service: EmployeeService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogbox.close();
    this.service.filter('Update click');
  }

  onSubmit(form: NgForm) {
    console.log('EmployeeID = ' + form.value.EmployeeID);
    this.service.updateEmployee(form.value).subscribe(res => {
      this.snackBar.open('Employee Name : ' + res.EmployeeName + ' updated...!!!' ,
      '', {
        duration: 3000,
        verticalPosition: 'top'
      });
    });
  }


}
