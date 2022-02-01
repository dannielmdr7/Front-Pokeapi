import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonDetail } from 'src/app/interfaces/pokemon.Interfaces';
import { PokemonService } from 'src/app/services/pokemon.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  public pokemonDetail:PokemonDetail={};
  public isLoad:boolean = true;
  public id:string='';

  constructor(private _route:ActivatedRoute, private pokemonService:PokemonService,private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    this.id= this._route.snapshot.paramMap.get('id') || '';
    this.pokemonService.getPokemonDetail(this.id).subscribe((data)=>{
      this.isLoad = false;
      this.pokemonDetail = data.data;
    },(err:HttpErrorResponse)=>{
      this.userService.logedOut();
      this.router.navigateByUrl('/login')
    })
  }

}
