import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema({ collection: 'books' })
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop()
  genre: string;

  @Prop()
  price_gbp: string;

  @Prop()
  stock: string;

  @Prop()
  image: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);