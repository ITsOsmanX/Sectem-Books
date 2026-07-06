import Link from "next/link";
import { getBookById } from "@/services/books";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={
        index < Math.round(rating)
          ? "text-amber-400"
          : "text-slate-300"
      }
    >
      ★
    </span>
  ));
}

export default async function BookPage({ params }: Props) {
  const { id } = await params;

  const book = await getBookById(id);

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <Link
          href="/books"
          className="mb-8 inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"
        >
          ← Back to Books
        </Link>

        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div className="self-start overflow-hidden rounded-3xl border bg-white shadow-lg">
            <img
              src={book.image}
              alt={book.title}
              className="aspect-[3/4] w-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <span className="mb-3 w-fit rounded-full bg-slate-900 px-4 py-1 text-sm font-medium text-white">
              {book.genre}
            </span>

            <h1 className="text-5xl font-bold text-slate-900">
              {book.title}
            </h1>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex text-2xl">
                {renderStars(book.rating)}
              </div>

              <span className="font-semibold text-slate-600">
                {book.rating.toFixed(1)} / 5
              </span>
            </div>

            <p className="mt-8 text-lg leading-8 text-slate-600">
              {book.description}
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-widest text-slate-400">
                  Price
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {book.price}
                </p>
              </div>

              <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-widest text-slate-400">
                  Availability
                </p>

                <p className="mt-2 text-3xl font-bold text-green-600">
                  {book.availability}
                </p>
              </div>
            </div>

            <button className="mt-10 rounded-2xl bg-slate-900 px-8 py-4 text-lg font-semibold text-white transition hover:bg-slate-800">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}