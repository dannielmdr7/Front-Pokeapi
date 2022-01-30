import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {
  @Input() pokemon:any;
  public isLoad:boolean = true;
  public pokemonDetail:any;
  public checked:boolean=false;

  constructor(private pokemonService:PokemonService, private router:Router) {
  }
  ngOnInit(): void {
    this.pokemonService.getPokemonDetail(this.pokemon.name).subscribe((data:any)=>{
      this.isLoad =  false;
      this.pokemonDetail = data.data;
    })
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
