import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePokemonCommand } from './use-cases/createPakemon.use-case';
import { PakemonsPaginationDto } from './dto/paginationDto';
import { PokemonRepository } from './repository/pokemonRepository';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';
@Controller('pokemon')
export class PokemonController {
  constructor(
    private commandBus: CommandBus,
    private pokemonsRepo: PokemonRepository,
  ) {}

  @Get('')
  async getAllPokemon(@Query() dto: PakemonsPaginationDto) {
    return this.pokemonsRepo.findAllPokemons(dto);
  }

  @Post('/create')
  async createPokemon() {
    return this.commandBus.execute(new CreatePokemonCommand());
  }

  @Post('/add')
  async addPokemon(
    @Body()
    data: {
      account: string;
      message: string;
      signature: string;
      pokemonName: string;
    },
  ) {
    const { account, message, signature, pokemonName } = data;
    console.log('pokemonName', pokemonName);
    const recoveredAddress = recoverPersonalSignature({
      data: message,
      signature: signature,
    });
    console.log('recoveredAddress', recoveredAddress);
    if (recoveredAddress.toLowerCase() === account.toLowerCase()) {
      console.log('Подпись верна!');
      // Делайте здесь, что вам нужно, если подпись верна, например, сохраните pokemonName в базе данных.
    } else {
      console.log('Неправильный адрес!');
    }
  }
}
