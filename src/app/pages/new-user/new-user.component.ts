import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  validateForm!: FormGroup;
  public textDefault:string='Selecciona un Equipo'
  public teamOptions=['Azul','Rojo','Amarillo']
  constructor(private fb: FormBuilder, private http: HttpClient) {}
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      nickName: [null, [Validators.required]],
    });
  }


  submitForm(): void {
    if (this.validateForm.valid && this.textDefault != 'Selecciona un Equipo' ) {
      try {
        this.http
          .post('http://localhost:3000/createUser', {
            user: this.validateForm.value.userName,
            password: this.validateForm.value.password,
            nickName:this.validateForm.value.nickName,
            team:this.textDefault
          })
          .subscribe((res:any) => {
            if(res.ok == true){
              console.log(res);
            }else{
              console.log('errors',res);
              
            }
          });
      } catch (error) {
        console.log('err',error);
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
  register(){
    console.log('cambio de pantalla');
    
  }
  selectTeam(team:string){
    this.textDefault =  team;

  }

}
