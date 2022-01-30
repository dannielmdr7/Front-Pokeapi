import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private pokemonService:PokemonService) {
  }
  ngOnInit(): void {
    this.pokemonService.getPokemonDetail(this.pokemon).subscribe((data:any)=>{
      this.isLoad =  false;
      console.log(data.data);
      this.pokemonDetail = data.data;
    })
  }
  clickado(){
    console.log('clickado');
    
  }
  getPicture(image:string){
    if(image){
      return image
    }else{
      return ''
    }

  }

}
