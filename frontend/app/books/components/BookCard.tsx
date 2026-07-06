import type { Book } from "@/types/book";
import Link from "next/link";

type BookCardProps = {
  book: Book;
};

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, index) => {
    const filled = index < Math.round(rating);

    return (
      <span
        key={index}
        className={filled ? "text-amber-400" : "text-white/20"}
        aria-hidden="true"
      >
        ★
      </span>
    );
  });
}

function getRatingLabel(rating: number) {
  return rating.toFixed(1);
}

export function BookCard({ book }: BookCardProps) {
  console.log(book);
  return (
    <Link href={`/books/${book.id}`} className="block h-full">
      <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)]">
        <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
          <img
            src={book.image}
            alt={book.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/55 to-transparent" />

          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
            Featured
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-slate-900 transition group-hover:text-slate-700">
            {book.title}
          </h3>

          <div className="mt-auto space-y-3 pt-4">
            <div className="grid gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-600 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Price
                </p>
                <p className="font-semibold text-slate-900">
                  {book.price}
                </p>
              </div>

              <div className="space-y-1 sm:text-right">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Availability
                </p>
                <p className="font-semibold text-slate-900">
                  {book.availability}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-2">
              <div className="flex items-center gap-1 text-lg leading-none">
                {renderStars(book.rating)}
              </div>

              <span className="text-sm font-semibold text-slate-600">
                {getRatingLabel(book.rating)} / 5
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
    
  );
  
}