import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  public pokemonDetail:any;
  public isLoad:boolean = true;

  constructor(private _route:ActivatedRoute, private pokemonService:PokemonService) { }

  ngOnInit(): void {
    let name = this._route.snapshot.paramMap.get('name');
    this.pokemonService.getPokemonDetail(name).subscribe((data:any)=>{
      this.isLoad = false;
      this.pokemonDetail = data.data;
    })
  }

}
