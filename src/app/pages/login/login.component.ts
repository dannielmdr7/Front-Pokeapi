import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router : Router,private userService:UserService) {}
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }


  submitForm(): void {
    if (this.validateForm.valid) {
      this.userService.authUser(this.validateForm.value.userName,this.validateForm.value.password)
        .subscribe((res:any) => {
          if(res.ok == true){
            this.router.navigateByUrl('loged/home');
            localStorage.setItem('navigationToken',res.token)
          }
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
