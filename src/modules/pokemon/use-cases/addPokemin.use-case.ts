import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
export class AddPokemonCommand {
  constructor() {}
}

@CommandHandler(AddPokemonCommand)
export class AddPokemonUseCase implements ICommandHandler {
  constructor() {}

  async execute(command: AddPokemonCommand) {}
}
