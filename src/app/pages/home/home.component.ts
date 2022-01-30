import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private http:HttpClient) { }
  public pokemons:any;

  ngOnInit(): void {
    const headers = new HttpHeaders()
            .set("x-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MWY2YTI0OGM2ZmNlZTg5Mjc4OWZlYTUiLCJpYXQiOjE2NDM1NTMzNjIsImV4cCI6MTY0MzYzOTc2Mn0.mba5IdcRTbellwjdEegSLJZI1CzlRtYp-K9M-7iDL4k");
    this.http.get(`http://localhost:3000/usuarios`,{headers}).subscribe((response:any)=>{
      this.pokemons=response.data.results;
    })
  }

}
