import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  employeeForm: FormGroup;
  objEmployee: Employee = new Employee();
  employees: Employee[] = [];
  empId: number = 0;
  @ViewChild('closeButton') closeButton: ElementRef<any>;
  public errorMessage: string = '';
  public lblModalHeader: string = 'Create Employee';
  public lblBtn: string = 'Submit';
  constructor(private fb: FormBuilder, private empService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      doj: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    });
    this.getEmployees();
  }

  //Get all employees
  public getEmployees(){
    this.empService.getEmployees().subscribe((respData: any) => {
      if(respData.length>0){
        this.employees = respData;
      }
    });
  }

  //Insert/Update Employee
  onSubmit():void{
    this.objEmployee.firstName = this.employeeForm.value.firstName;
    this.objEmployee.lastName = this.employeeForm.value.lastName;
    this.objEmployee.doj = this.employeeForm.value.doj;
    this.objEmployee.email = this.employeeForm.value.email;
    this.objEmployee.mobile = this.employeeForm.value.mobile;
    this.objEmployee.salary = this.employeeForm.value.salary;
    if(this.empId>0){
      this.empService.updateEmployee(this.empId, this.objEmployee).subscribe((respData: any) => {
        if(respData!=null){
          this.clearCategory();
          this.getEmployees();
          this.closeButton.nativeElement.click();
        } else {
          this.errorMessage = 'Something went wrong!';
        }
      });
    } else {
      this.empService.postEmployee(this.objEmployee).subscribe((respData: any) => {
        if(respData!=null){
          this.clearCategory();
          this.getEmployees();
          this.closeButton.nativeElement.click();
        } else {
          this.errorMessage = 'Something went wrong!';
        }
      });
    }
  }

  //Get Employee by Id
  public getEmpById(empId: number){
    this.empService.getEmployeeById(empId).subscribe((respData: any) => {
      if(respData){
        this.objEmployee = respData;
      }
    });
  }

  //Edit Employee
  public edit(empId: number){
    this.lblModalHeader = 'Update Employee';
    this.lblBtn = 'Update';
    this.empService.getEmployeeById(empId).subscribe((respData: any) => {
      if(respData){
        this.empId = respData.id;
        this.employeeForm.setValue({ 
          firstName : respData.firstName,
          lastName : respData.lastName,
          doj: respData.doj,
          email : respData.email,
          mobile : respData.mobile,
          salary : respData.salary
        });
      }
    });
  }

  //Delete Employee
  public deleteEmployee(empId: number){
    this.empService.deleteEmployee(empId).subscribe((respData: any) => {
      if(respData){
        alert('Employee has been deleted successfully!');
        this.getEmployees();
      }
    });
  }

  //Clear controls after action
  clearCategory() {
    this.employeeForm.reset();
  }

  btnNew(){
    this.lblBtn = 'Submit';
    this.lblModalHeader = 'Create Employee';
    this.empId = 0;
  }
}
