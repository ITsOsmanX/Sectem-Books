import { api } from "@/lib/api";
import { Book } from "@/types/book";

type ApiBook = {
  _id: string;
  title: string;
  genre: string;
  price_gbp: string;
  stock: string;
  description: string;
  rating: number;
  image: string;
};

type BooksResponse = {
  data: ApiBook[];
  total: number;
  page: number;
  totalPages: number;
};

export type PaginatedBooksResponse = {
  books: Book[];
  total: number;
  page: number;
  totalPages: number;
};

const BOOKS_TOSCRAPE_BASE_URL = "https://books.toscrape.com/";

function normalizeBookImage(image: string) {
  return new URL(image, BOOKS_TOSCRAPE_BASE_URL).toString();
}

function normalizeBook(book: ApiBook): Book {
  return {
    id: book._id,
    title: book.title,
    genre: book.genre,
    price: `£${book.price_gbp}`,
    availability: `${book.stock} in stock`,
    description: book.description,
    rating: book.rating,
    image: normalizeBookImage(book.image),
  };
}

export async function getBooks(page = 1, limit = 20) {
  const response = await api.get<BooksResponse>("/books", {
    params: {
      page,
      limit,
    },
  });

  return {
    books: response.data.data.map(normalizeBook),
    total: response.data.total,
    page: response.data.page,
    totalPages: response.data.totalPages,
  } satisfies PaginatedBooksResponse;
}


export async function getBookById(id: string) {
  const response = await api.get<ApiBook>(`/books/${id}`);
  return normalizeBook(response.data);
}

export async function searchBooks(query: string) {
  const response = await api.get<ApiBook[]>("/books/search", {
    params: {
      q: query,
    },
  });
  return response.data.map(normalizeBook);
}

export async function getBooksByGenre(genre: string, page = 1, limit = 20) {
  const response = await api.get<BooksResponse>(`/books/genre/${genre}`, {
    params: {
      page,
      limit,
    },
  });

  return {
    books: response.data.data.map(normalizeBook),
    total: response.data.total,
    page: response.data.page,
    totalPages: response.data.totalPages,
  } satisfies PaginatedBooksResponse;
}

export async function getGenres() {
  const response = await api.get<string[]>("/books/genres");
  return response.data;
}
