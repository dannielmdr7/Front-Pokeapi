import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataToFront, Pokemon } from 'src/app/interfaces/pokemon.Interfaces';
import { PokemonService } from 'src/app/services/pokemon.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private pokemonService:PokemonService,private userService:UserService,private router:Router) { }
  public pokemons:DataToFront={next:'',prev:'',pokemons:[]};
  public isLoad:boolean = false;

  ngOnInit(): void {
    this.pokemonService.getAllPokemons().subscribe((res)=>{
      this.pokemons = res
    },(err:HttpErrorResponse)=>{
      this.userService.logedOut();
      this.router.navigateByUrl('/login')
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

}
