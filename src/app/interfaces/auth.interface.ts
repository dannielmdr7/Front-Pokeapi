export interface AuthResponse{
  ok:boolean,
  token:string,
  error:{}
}
export interface SinglePokemon{
  name:string;
  url:string
}
export interface PokeResponse{
  data:{
    results:SinglePokemon
  }
}