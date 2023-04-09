import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddPokemonDto } from '../dto/addPokemonDto';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { PokemonRepository } from '../repository/pokemonRepository';

@Injectable()
export class AddPokemonCommand {
  constructor(readonly data: AddPokemonDto) {}
}

@CommandHandler(AddPokemonCommand)
export class AddPokemonUseCase implements ICommandHandler {
  constructor(public readonly pokemonRepo: PokemonRepository) {}

  async execute(command: AddPokemonCommand) {
    const recoveredAddress = recoverPersonalSignature({
      data: command.data.message,
      signature: command.data.signature,
    });
    if (recoveredAddress.toLowerCase() === command.data.account.toLowerCase()) {
      console.log('Подпись верна!');
      return this.pokemonRepo.updatePokemonUserId(
        command.data.account,
        command.data.pokemonName,
      );
    } else {
      console.log('Неправильный адрес!');
      return false;
    }
  }
}
