import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon, PokemonDocument } from '../schemas/pokemon.schema';

@Injectable()
export class PokemonRepository {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<PokemonDocument>,
  ) {}

  async createPokemon(newPokemon: Pokemon) {
    return this.pokemonModel.create({ ...newPokemon });
  }
  async findAllPokemons() {
    return this.pokemonModel.find();
  }
}
