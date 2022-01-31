import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetail } from 'src/app/interfaces/pokemon.Interfaces';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  public pokemonDetail:PokemonDetail={};
  public isLoad:boolean = true;
  public id:string='';

  constructor(private _route:ActivatedRoute, private pokemonService:PokemonService) { }

  ngOnInit(): void {
    this.id= this._route.snapshot.paramMap.get('id') || '';
    this.pokemonService.getPokemonDetail(this.id).subscribe((data)=>{
      console.log(data);
      
      this.isLoad = false;
      this.pokemonDetail = data.data;
    })
  }

}
