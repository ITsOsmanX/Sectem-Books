"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getBooks,
  getBooksByGenre,
  getGenres,
  type PaginatedBooksResponse,
} from "@/services/books";
import type { Book } from "@/types/book";
import { BookCard } from "./components/BookCard";
import { Error } from "./components/Error";
import { Loading } from "./components/Loading";
import { Navbar } from "./components/Navbar";
import { Pagination } from "./components/Pagination";

const ALL_GENRES = "All";

export default function BooksPage() {
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState(ALL_GENRES);
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [selectedGenre]);

  useEffect(() => {
    let active = true;

    async function loadGenres() {
      try {
        const items = await getGenres();

        if (!active) {
          return;
        }

        setGenres(items);
      } catch {
        if (!active) {
          return;
        }

        setError("Unable to load genres right now.");
      }
    }

    loadGenres();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadBooks() {
      setLoading(true);
      setError(null);

      try {
        const result: PaginatedBooksResponse =
          selectedGenre === ALL_GENRES
            ? await getBooks(page)
            : await getBooksByGenre(selectedGenre, page);

        if (!active) {
          return;
        }

        setBooks(result.books);
        setTotalPages(result.totalPages || 1);
      } catch {
        if (!active) {
          return;
        }

        setError("Unable to load books right now.");
        setBooks([]);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadBooks();

    return () => {
      active = false;
    };
  }, [page, selectedGenre]);

  const visibleGenres = useMemo(
    () => [ALL_GENRES, ...genres.filter((genre) => genre !== ALL_GENRES)],
    [genres],
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        <Navbar
          genres={visibleGenres}
          selectedGenre={selectedGenre}
          onSelectGenre={(genre) => {
            setSelectedGenre(genre);
            setPage(1);
          }}
        />

        <main className="flex-1 border-t border-slate-200 bg-slate-50 p-5 lg:border-l lg:border-t-0 lg:p-8">
          <div className="mb-6 flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                {selectedGenre === ALL_GENRES ? "All genres" : selectedGenre}
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Featured books
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              {books.length} {books.length === 1 ? "book" : "books"} shown
            </p>
          </div>

          {error ? <Error message={error} /> : null}

          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                onPrevious={() => setPage((currentPage) => Math.max(1, currentPage - 1))}
                onNext={() =>
                  setPage((currentPage) => Math.min(totalPages, currentPage + 1))
                }
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
