import { Controller, Get, Param, Query } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Query() query: { page?: number; limit?: number }) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    return this.booksService.findAll(page, limit);
  }

  @Get('genres')
  findGenres() {
    return this.booksService.findGenres();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Get('genre/:genre')
  findBooksByGenre(
    @Param('genre') genre: string,
    @Query() query: { page?: number; limit?: number },
  ) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;

    return this.booksService.findBooksByGenre(genre, page, limit);
  }
}