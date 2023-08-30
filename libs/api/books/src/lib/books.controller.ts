import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Query
} from '@nestjs/common';
import { BooksService } from './books.service';
import { ReadingListService } from './reading-list.service';

@Controller()
export class BooksController {
  constructor(private readonly books: BooksService, private readonly readingList: ReadingListService) {}

  @Get('/books/search')
  async searchBooks(@Query('q') term) {
    try {
      return await this.books.search(term);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Put('/reading-list/:id/finished')
  async finishFromReadingList(@Param() params) {
    return await this.readingList.finishBook(params.id)
  }
}
