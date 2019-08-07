import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Employee } from '../models/employee-model';
import { Department } from '../models/department-model';

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  formData: Employee;

  // Base url
  readonly APIUrl = "http://192.168.0.42:5000/api/v1";

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  dateConvert(date) {
    var newd = new Date(date);
    var y = newd.getFullYear();
    var m = (newd.getMonth() + 1).toString();
    if (m.length == 1) {
      m = "0" + m;
    }
    var d = newd.getDate().toString();
    if (d.length == 1) {
      d = "0" + d;
    }
    return y + "-" + m + "-" + d;
  }

  getEmpList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.APIUrl + "/employees");
  }

  // POST
  addEmployee(data): Observable<Employee> {
    return this.http
      .post<Employee>(
        this.APIUrl + "/addemployee",
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  // PUT
  updateEmployee(data): Observable<Employee> {
    return this.http
      .put<Employee>(
        this.APIUrl + "/employee/" + data.EmployeeID,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  // Delete
  deleteEmployee(id: number) {
    return this.http
      .delete(this.APIUrl + "/employee/" + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  getDepDropDownValues(): Observable<any> {
    return this.http.get<Department[]>(this.APIUrl + "/departments");
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any> {
    return this._listeners.asObservable();
  }
  filter(filterBy: string) {
    this._listeners.next(filterBy);
  }
}
