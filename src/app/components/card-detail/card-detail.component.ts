import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemon.Interfaces';
import { PokemonService } from 'src/app/services/pokemon.service';

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

  constructor(private pokemonService:PokemonService, private router:Router) {
  }
  ngOnInit(): void {
  }
  clickado(){
    this.router.navigateByUrl(`/detail/${this.pokemon.name}`)
    
  }
  getPicture(image:string){
    if(image){
      return image
    }else{
      return ''
    }

  }

}
