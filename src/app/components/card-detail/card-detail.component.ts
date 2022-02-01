import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemon.Interfaces';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {
  @Input() pokemon:Pokemon={id:'',name:'',img:''};
  public isLoad:boolean = true;
  public pokemonDetail:Pokemon={id:'',name:'',img:''};
  public checked:boolean=false;
  public user:User={uid:'',nickName:'',name:'',team:''}

  constructor(private router:Router,private userService:UserService) {
  }
  ngOnInit(): void {
    this.user = this.userService.getInfoUser();
  }
  seeMore(){
    this.router.navigateByUrl(`loged/detail/${this.pokemon.id}`)
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

}
