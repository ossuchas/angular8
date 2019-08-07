import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/format-datepicker';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class AddEmpComponent implements OnInit {

  constructor(
    public dialogbox: MatDialogRef<AddEmpComponent>,
    public service: EmployeeService,
    private snackBar: MatSnackBar
  ) { }

  public listItems: Array<string> = [];
  public datepicker: Date = null;

  ngOnInit() {
    this.resetForm();
    this.dropdownRefresh();
  }

  dropdownRefresh() {
    this.service.getDepDropDownValues().subscribe(data => {
      data.forEach(element => {
       this.listItems.push(element["DepartmentName"]);
      });
    });

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
    form.value.DOJ = this.service.dateConvert(form.value.DOJ);
    console.log(form.value);
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

