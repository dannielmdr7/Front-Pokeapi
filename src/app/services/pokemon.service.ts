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
  getPokemonDetail(name:string){
    const headers = new HttpHeaders()
            .set("x-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MWY3MzI0OGZmYTA5NDQ3YzBkYWNjMzUiLCJuaWNrTmFtZSI6IkRhbmllbCIsInRlYW0iOiJBenVsIiwiaWF0IjoxNjQzNjQwMzQ2LCJleHAiOjE2NDM3MjY3NDZ9.uDR5mGKSIWHIbMAvuzuxDWGoaKwk4nFgCSiv5XbAhyQ")
            .set('name',name)
    return this.http.get<PokemonDetailToFront>(`http://localhost:3000/pokemon`,{headers});
  }
  getPokemonsPaginated(pageToCharge:string | null){
    const pageToChargeArguments = pageToCharge?.split('?')
    if(pageToChargeArguments){
      const pageOffset=pageToChargeArguments[1].split('&')[0];
      const pageLimit=pageToChargeArguments[1].split('&')[1];
      console.log(pageToChargeArguments[1]);
      const headers = new HttpHeaders()
            .set("x-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MWY3MzI0OGZmYTA5NDQ3YzBkYWNjMzUiLCJuaWNrTmFtZSI6IkRhbmllbCIsInRlYW0iOiJBenVsIiwiaWF0IjoxNjQzNjQwMzQ2LCJleHAiOjE2NDM3MjY3NDZ9.uDR5mGKSIWHIbMAvuzuxDWGoaKwk4nFgCSiv5XbAhyQ")
            .set('limit',pageToChargeArguments[1])
    return this.http.get<PokemonsResponse>(`http://localhost:3000/pokemonsPage`,{headers}).pipe(
      map(this.transformToPokemon)
    )
    }
    return

  }
  getAllPokemons():Observable<DataToFront>{
    // const data = this.getDecodedAccessToken(JSON.stringify(localStorage.getItem('navigationToken')))
    // console.log(data);
    const headers = new HttpHeaders()
            .set("x-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MWY3MzI0OGZmYTA5NDQ3YzBkYWNjMzUiLCJuaWNrTmFtZSI6IkRhbmllbCIsInRlYW0iOiJBenVsIiwiaWF0IjoxNjQzNjQwMzQ2LCJleHAiOjE2NDM3MjY3NDZ9.uDR5mGKSIWHIbMAvuzuxDWGoaKwk4nFgCSiv5XbAhyQ");
    return this.http.get<PokemonsResponse>(`http://localhost:3000/pokemons`,{headers})
                    .pipe(
                      map(this.transformToPokemon)
                    )
  }
  private transformToPokemon(resp : PokemonsResponse):DataToFront{
    console.log(resp.data.results);
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
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
