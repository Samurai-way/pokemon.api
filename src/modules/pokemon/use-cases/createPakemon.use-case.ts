import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@Injectable()
export class CreatePokemonCommand {
  constructor() {}
}

@CommandHandler(CreatePokemonCommand)
export class CreatePokemonUseCase implements ICommandHandler {
  constructor() {}

  async execute(command: CreatePokemonCommand) {}
}
