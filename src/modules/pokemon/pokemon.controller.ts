import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePokemonCommand } from './use-cases/createPakemon.use-case';
import { PakemonsPaginationDto } from './dto/paginationDto';
import { PokemonRepository } from './repository/pokemonRepository';
import { AddPokemonCommand } from './use-cases/addPokemin.use-case';
import { FindMyPokemonsCommand } from './use-cases/findMyPokemons.use-case';
import { Pokemon } from './schemas/pokemon.schema';
import { Items } from '../../helpers/pagination-view-model';

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

  @Post('/my')
  async getMyPokemon(
    @Body()
    data: {
      account: string;
      message: string;
      signature: string;
    },
  ): Promise<Items<Pokemon[]>> {
    return this.commandBus.execute(new FindMyPokemonsCommand(data));
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
  ): Promise<Pokemon> {
    return this.commandBus.execute(new AddPokemonCommand(data));
  }
}
