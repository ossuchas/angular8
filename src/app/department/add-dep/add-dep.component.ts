import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { DepartmentService } from 'src/app/services/department.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-dep',
  templateUrl: './add-dep.component.html',
  styleUrls: ['./add-dep.component.css']
})
export class AddDepComponent implements OnInit {

  constructor(
    public dialogbox: MatDialogRef<AddDepComponent>,
    public service: DepartmentService,
    private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.resetForm();

  }

  resetForm(form?: NgForm) {
    if (form != null)
    form.resetForm();

    this.service.formData = {
      DepartmentID: 0,
      DepartmentName: ''
    }
  }

  onClose() {
    this.dialogbox.close();
    this.service.filter('Register click');
  }

  onSubmit(form: NgForm) {
    this.service.addDepartment(form.value).subscribe(res => {
      this.resetForm(form);
      this.snackBar.open('Add Department Name : ' + res.DepartmentName + '[' + res.DepartmentID + '] Successful..!!' ,
      '', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });
  }

}
