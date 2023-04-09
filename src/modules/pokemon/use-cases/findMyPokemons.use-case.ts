import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { findPokemonDto } from '../dto/addPokemonDto';
import { PokemonRepository } from '../repository/pokemonRepository';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';

@Injectable()
export class FindMyPokemonsCommand {
  constructor(readonly data: findPokemonDto) {}
}

@CommandHandler(FindMyPokemonsCommand)
export class FindMyPokemonsUseCase implements ICommandHandler {
  constructor(public readonly pokemonRepo: PokemonRepository) {}

  async execute(command: FindMyPokemonsCommand) {
    const recoveredAddress = recoverPersonalSignature({
      data: command.data.message,
      signature: command.data.signature,
    });
    if (recoveredAddress.toLowerCase() === command.data.account.toLowerCase()) {
      console.log('Подпись верна!');
      return this.pokemonRepo.findMyPokemons(command.data.account);
    } else {
      console.log('Неправильный адрес!');
      return false;
    }
  }
}
