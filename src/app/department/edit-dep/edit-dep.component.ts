import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { DepartmentService } from 'src/app/services/department.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-dep',
  templateUrl: './edit-dep.component.html',
  styleUrls: ['./edit-dep.component.css']
})
export class EditDepComponent implements OnInit {

  constructor(
    public dialogbox: MatDialogRef<EditDepComponent>,
    private service: DepartmentService,
    private snackBar: MatSnackBar ) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogbox.close();
    this.service.filter('Update click');
  }

  onSubmit(form: NgForm) {
    console.log('DepartmentID = ' + form.value.DepartmentID);
    this.service.updateDepartment(form.value).subscribe(res => {
      this.snackBar.open('Department Name : ' + res.DepartmentName + ' updated...!!!' ,
      '', {
        duration: 3000,
        verticalPosition: 'top'
      });
    });
  }

}
