import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  validateForm!: FormGroup;
  public textDefault: string = 'Selecciona un Equipo';
  public teamOptions = ['Azul', 'Rojo', 'Amarillo'];
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userService: UserService
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
      try {
        this.userService.createUser(
          this.validateForm.value.userName,
          this.validateForm.value.password,
          this.validateForm.value.nickName,
          this.textDefault
        ).subscribe((res: any) => {
            if (res.ok == true) {
              console.log(res);
            } else {
              console.log('errors', res);
            }
          });
      } catch (error) {
        console.log('err', error);
      }
    } else {
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
    this.textDefault = team;
  }
}
