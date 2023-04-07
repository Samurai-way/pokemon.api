import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Controller('pokemon')
export class BloggerController {
  constructor(private commandBus: CommandBus) {}

  // @Get('/blogs/comments')
  // async getCommentsForAllPosts(
  // @Query() dto: PaginationDto,
  // @User() user: UserEntity,
  // ): Promise<PaginationViewModel<CommentsForPostsViewModal[]>> {
  //   return this.commentsQueryRepo.getCommentsForPostsByUserId(dto, user.id);
  // }
}
