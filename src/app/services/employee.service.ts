import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../models/employee';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private sharedService: SharedService) { }

  public postEmployee(emp: Employee) {
    return this.sharedService.post(environment.baseUrl + '/posts', emp).pipe(catchError(this.errorHandler));
  }

  public getEmployees() {
    return this.sharedService.get(environment.baseUrl + '/posts').pipe(catchError(this.errorHandler));
  } 

  public getEmployeeById(id: number) {
    return this.sharedService.get(environment.baseUrl + '/posts/' + id).pipe(catchError(this.errorHandler));
  }

  public updateEmployee(id: number, emp: Employee) {
    return this.sharedService.put(environment.baseUrl + '/posts/' +id, emp).pipe(catchError(this.errorHandler));
  }

  public deleteEmployee(id: number){
    return this.sharedService.delete(environment.baseUrl + '/posts/', id).pipe(catchError(this.errorHandler));
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
