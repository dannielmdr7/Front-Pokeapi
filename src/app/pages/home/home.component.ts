import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { DataToFront, Pokemon } from 'src/app/interfaces/pokemon.Interfaces';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private pokemonService:PokemonService) { }
  public pokemons:DataToFront={next:'',prev:'',pokemons:[]};
  public isLoad:boolean = false;

  ngOnInit(): void {
    this.pokemonService.getAllPokemons().subscribe((res)=>{
      this.pokemons = res
    })
  }
  prevPage(){
    this.isLoad = true;
    this.pokemonService.getPokemonsPaginated(this.pokemons.prev)?.subscribe(data=>{
    this.isLoad = false;
      this.pokemons = data;
    })

  }
  nextPage(){
    this.isLoad = true;
    this.pokemonService.getPokemonsPaginated(this.pokemons.next)?.subscribe(data=>{
    this.isLoad = false;
      this.pokemons = data;
    })
  }
  click(){
    console.log('click');
    
  }

}
