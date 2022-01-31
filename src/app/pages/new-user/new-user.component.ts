import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  validateForm!: FormGroup;
  public textDefault: string = 'Selecciona un Equipo';
  public teamOptions = ['Azul', 'Rojo', 'Amarillo'];
  public hasNoTeam:boolean = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      nickName: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.validateForm.valid && this.textDefault != 'Selecciona un Equipo') {
      Swal.fire({
        didOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => {});
      try {
        this.userService.createUser(
          this.validateForm.value.userName,
          this.validateForm.value.password,
          this.validateForm.value.nickName,
          this.textDefault
        ).subscribe((res: any) => {
            if (res.ok == true) {
              Swal.close();
            Swal.fire({
              icon: 'success',
              text: 'Usuario creado ',
            })
              this.router.navigateByUrl('/login')
            } else {
              console.log('errors', res);
            }
          },(error:HttpErrorResponse)=>{
            let msg = error.error.msg;
            Swal.close();
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: msg,
            })
          });
      } catch (error) {
        console.log('err', error);
      }
    }else if(this.validateForm.valid && this.textDefault == 'Selecciona un Equipo'){
      this.hasNoTeam = true;

    } else {
      this.hasNoTeam = true;
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  register() {
    console.log('cambio de pantalla');
  }
  selectTeam(team: string) {
    this.hasNoTeam = false;
    this.textDefault = team;
  }
}
