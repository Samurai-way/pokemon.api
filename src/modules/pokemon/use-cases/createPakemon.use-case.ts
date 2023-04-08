import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PokemonRepository } from '../repository/pokemonRepository';
import { Model } from 'mongoose';
import { Pokemon } from '../schemas/pokemon.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CreatePokemonCommand {
  constructor() {}
}

@CommandHandler(CreatePokemonCommand)
export class CreatePokemonUseCase implements ICommandHandler {
  constructor(public readonly pokemonRepo: PokemonRepository) {}

  async execute(command: CreatePokemonCommand) {
    const newPokemon: Pokemon = {
      id: 1,
      name: 'Bulbasaur',
      imageUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      type: 'Grass/Poison',
      abilities: ['Overgrow', 'Chlorophyll'],
      level: 1,
      evolution: ['2'],
      userId: null,
    };
    return this.pokemonRepo.createPokemon(newPokemon);
  }
}
