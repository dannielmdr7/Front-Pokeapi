import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http:HttpClient) { }
  getPokemonDetail(pokemon:any){
    const headers = new HttpHeaders()
            .set("x-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MWY2YTI0OGM2ZmNlZTg5Mjc4OWZlYTUiLCJpYXQiOjE2NDM1NTMzNjIsImV4cCI6MTY0MzYzOTc2Mn0.mba5IdcRTbellwjdEegSLJZI1CzlRtYp-K9M-7iDL4k")
            .set('name',pokemon.name)
    return this.http.get(`http://localhost:3000/pokemon`,{headers});
    // return this.hppt.get(pokemon.url);

  }
}
