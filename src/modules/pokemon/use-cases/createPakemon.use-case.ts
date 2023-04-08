import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PokemonRepository } from '../repository/pokemonRepository';
import { Pokemon } from '../schemas/pokemon.schema';

@Injectable()
export class CreatePokemonCommand {
  constructor() {}
}

@CommandHandler(CreatePokemonCommand)
export class CreatePokemonUseCase implements ICommandHandler {
  constructor(public readonly pokemonRepo: PokemonRepository) {}

  async execute(command: CreatePokemonCommand) {
    const newPokemon: Pokemon = {
      id: 700,
      name: 'Sylveon',
      imageUrl:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/700.png',
      type: 'Fairy',
      abilities: ['Cute Charm', 'Pixilate'],
      level: 2,
      evolution: [],
      userId: null,
    };
    return this.pokemonRepo.createPokemon(newPokemon);
  }
}
