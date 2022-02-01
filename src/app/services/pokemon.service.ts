import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import {  DataToFront, Pokemon, PokemonDetail, PokemonDetailToFront, PokemonsResponse } from '../interfaces/pokemon.Interfaces';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
;

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http:HttpClient) { }
  getPokemonDetail(id:string){

    return this.http.get<PokemonDetailToFront>(`http://localhost:3000/pokemon/${id}`);
  }
  getPokemonsPaginated(pageToCharge:string | null){
    const pageToChargeArguments = pageToCharge?.split('?')
    if(pageToChargeArguments){
    return this.http.get<PokemonsResponse>(`http://localhost:3000/pokemonsPage/${pageToChargeArguments[1]}`).pipe(
      map(this.transformToPokemon)
    )
    }
    return

  }
  getAllPokemons():Observable<DataToFront>{
    const headers = new HttpHeaders()
    return this.http.get<PokemonsResponse>(`http://localhost:3000/pokemons`,{headers})
                    .pipe(
                      map(this.transformToPokemon)
                    )
  }
  private transformToPokemon(resp : PokemonsResponse):DataToFront{
    const pokemonList : Pokemon[]= resp.data.results.map(poke => {

      const dataUrl = poke.url.split('/');
      const id = dataUrl[6];
      const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

      return {
        id,
        img,
        name:poke.name,
      }
    })
    return {
      next:resp.data.next,
      prev:resp.data.previous,
      pokemons:pokemonList
    }

  }
  getDecodedAccessToken() {
    const data = JSON.stringify(localStorage.getItem('navigationToken'))
    try {
      return jwt_decode(data);
    } catch(Error) {
      return null;
    }
  }
}
