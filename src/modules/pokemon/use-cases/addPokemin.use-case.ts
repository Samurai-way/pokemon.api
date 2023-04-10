import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddPokemonDto } from '../dto/addPokemonDto';
import { PokemonRepository } from '../repository/pokemonRepository';
import { PokemonService } from '../service/pokemonService';

@Injectable()
export class AddPokemonCommand {
  constructor(readonly data: AddPokemonDto) {}
}

@CommandHandler(AddPokemonCommand)
export class AddPokemonUseCase implements ICommandHandler {
  constructor(
    public readonly pokemonRepo: PokemonRepository,
    public readonly pokemonService: PokemonService,
  ) {}

  async execute(command: AddPokemonCommand) {
    const user = await this.pokemonService.validateUser(
      command.data.account,
      command.data.message,
      command.data.signature,
    );
    if (!user) throw new NotFoundException([]);
    return this.pokemonRepo.updatePokemonUserId(
      command.data.account,
      command.data.pokemonName,
    );
  }
}
