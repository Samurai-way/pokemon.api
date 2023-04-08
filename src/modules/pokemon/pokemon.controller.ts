import { Controller, Get, Post, Query } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePokemonCommand } from './use-cases/createPakemon.use-case';
import { PakemonsPaginationDto } from './dto/paginationDto';
import { PokemonRepository } from './repository/pokemonRepository';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private commandBus: CommandBus,
    private pakemonsRepo: PokemonRepository,
  ) {}

  // @Get('/blogs/comments')
  // async getCommentsForAllPosts(
  // @Query() dto: PaginationDto,
  // @User() user: UserEntity,
  // ): Promise<PaginationViewModel<CommentsForPostsViewModal[]>> {
  //   return this.commentsQueryRepo.getCommentsForPostsByUserId(dto, user.id);
  // }

  @Get('')
  async getAllPokemon(@Query() dto: PakemonsPaginationDto) {
    return this.pakemonsRepo.findAllPokemons(dto);
  }

  @Post('/create')
  async createPokemon() {
    return this.commandBus.execute(new CreatePokemonCommand());
  }
}
