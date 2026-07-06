import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
  ) {}

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [books, total] = await Promise.all([
      this.bookModel.find().skip(skip).limit(limit).exec(),
      this.bookModel.countDocuments().exec(),
    ]);

    return {
      data: books,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  async findGenres(): Promise<string[]> {
    return this.bookModel.distinct('genre').exec();
  }


  async findBooksByGenre(genre: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const books = await this.bookModel.find({ genre }).skip(skip).limit(limit).exec();
    const total = await this.bookModel.countDocuments({ genre }).exec();

    return {
      data: books,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }


}