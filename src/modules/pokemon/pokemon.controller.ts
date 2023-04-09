import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePokemonCommand } from './use-cases/createPakemon.use-case';
import { PakemonsPaginationDto } from './dto/paginationDto';
import { PokemonRepository } from './repository/pokemonRepository';
import { AddPokemonCommand } from './use-cases/addPokemin.use-case';

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

  @Get('/my/:userId')
  async getMyPokemon(@Param('userId') userId: string) {
    return this.pokemonsRepo.findMyPokemons(userId);
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
    return this.commandBus.execute(new AddPokemonCommand(data));
  }
}
