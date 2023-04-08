import { Controller, Get, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreatePokemonCommand } from './use-cases/createPakemon.use-case';

@Controller('pokemon')
export class PokemonController {
  constructor(private commandBus: CommandBus) {}

  // @Get('/blogs/comments')
  // async getCommentsForAllPosts(
  // @Query() dto: PaginationDto,
  // @User() user: UserEntity,
  // ): Promise<PaginationViewModel<CommentsForPostsViewModal[]>> {
  //   return this.commentsQueryRepo.getCommentsForPostsByUserId(dto, user.id);
  // }

  @Get('/pokemon')
  async getAllPokemon() {}

  @Post('/create')
  async createPokemon() {
    return this.commandBus.execute(new CreatePokemonCommand());
  }
}
