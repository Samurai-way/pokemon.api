import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { findPokemonDto } from '../dto/addPokemonDto';
import { PokemonRepository } from '../repository/pokemonRepository';
import { PokemonService } from '../service/pokemonService';
import { Items } from '../../../helpers/pagination-view-model';
import { Pokemon } from '../schemas/pokemon.schema';

@Injectable()
export class FindMyPokemonsCommand {
  constructor(readonly data: findPokemonDto) {}
}

@CommandHandler(FindMyPokemonsCommand)
export class FindMyPokemonsUseCase implements ICommandHandler {
  constructor(
    public readonly pokemonRepo: PokemonRepository,
    public readonly pokemonService: PokemonService,
  ) {}

  async execute(command: FindMyPokemonsCommand): Promise<Items<Pokemon[]>> {
    const user = await this.pokemonService.validateUser(
      command.data.account,
      command.data.message,
      command.data.signature,
    );
    if (!user) throw new NotFoundException([]);
    return this.pokemonRepo.findMyPokemons(command.data.account);
  }
}
