import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user:User={uid:'',nickName:'',name:'',team:''}

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getInfoUser();
    console.log(this.user);
  }
  color(){
    switch (this.user.team) {
      case 'Azul':
        return 'blue'
      case 'Rojo':
        return 'red'
      case 'Amarillo':
        return 'yellow'

      default:
        return 'red'
    }
  }
  loggedOut(){
    this.userService.logedOut();
  }

}
