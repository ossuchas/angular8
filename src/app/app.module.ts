import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import {MatTableModule, MatIconModule, MatButtonModule, MatSortModule, MatDialogModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatInputModule} from '@angular/material/input';
import { EmployeeComponent } from './employee/employee.component';
import { ShowEmpComponent } from './employee/show-emp/show-emp.component';
import { EditEmpComponent } from './employee/edit-emp/edit-emp.component';
import { AddEmpComponent } from './employee/add-emp/add-emp.component';
import { DepartmentComponent } from './department/department.component';
import { ShowDepComponent } from './department/show-dep/show-dep.component';
import { EditDepComponent } from './department/edit-dep/edit-dep.component';
import { AddDepComponent } from './department/add-dep/add-dep.component';

import { DepartmentService } from './services/department.service';
import { EmployeeService } from './services/employee.service';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { FileSelectDirective } from 'ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    ShowEmpComponent,
    EditEmpComponent,
    AddEmpComponent,
    DepartmentComponent,
    ShowDepComponent,
    EditDepComponent,
    AddDepComponent,
    UploadfileComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [DepartmentService, EmployeeService, { provide: LOCALE_ID, useValue: "en-US" }],
  bootstrap: [AppComponent],
  entryComponents: [AddDepComponent, EditDepComponent, AddEmpComponent, EditEmpComponent]
})
export class AppModule { }
