import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/interfaces/auth.interface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router : Router) {}
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }


  submitForm(): void {
    if (this.validateForm.valid) {
      this.http
        .post('http://localhost:3000/authUser', {
          user: this.validateForm.value.userName,
          password: this.validateForm.value.password,
        })
        .subscribe((res:any) => {
          if(res.ok == true){
            this.router.navigateByUrl('/home');
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
