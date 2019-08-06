import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  constructor(
    public dialogbox: MatDialogRef<AddEmpComponent>,
    public service: EmployeeService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
    form.resetForm();

    this.service.formData = {
      EmployeeID: 0,
      EmployeeName: '',
      Department: '',
      MailID: '',
      DOJ: null
    }
  }

  onClose() {
    this.dialogbox.close();
    this.service.filter('Register click');
  }

  onSubmit(form: NgForm) {
    this.service.addEmployee(form.value).subscribe(res => {
      this.resetForm(form);
      this.snackBar.open('Add Department Name : ' + res.EmployeeName + '[' + res.EmployeeID + '] Successful..!!' ,
      '', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });
  }

}
