import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Department } from '../models/department-model';
import { Observable, throwError, Subject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  formData: Department;

  // Base url
  readonly APIUrl = 'http://192.168.0.42:5000/api/v1';

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getDepList(): Observable<Department[]> {
    return this.http.get<Department[]>(this.APIUrl + '/departments');
  }

  // addDepartment(dep: Department) {
  //   return this.http.post(this.APIUrl + '/department', dep);
  // }

  // POST
  addDepartment(data): Observable<Department> {
    return this.http.post<Department>(this.APIUrl + '/adddepartment', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // PUT
  updateDepartment(data): Observable<Department> {
    return this.http.put<Department>(this.APIUrl + '/department/' + data.DepartmentID, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // Delete
  deleteDepartment(id: number) {
    return this.http.delete(this.APIUrl + '/department/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    );
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
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

 private _listeners = new Subject<any>();
 listen(): Observable<any> {
   return this._listeners.asObservable();
 }
 filter(filterBy: string) {
   this._listeners.next(filterBy);
 }
}
