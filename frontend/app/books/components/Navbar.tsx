"use client";

type NavbarProps = {
  genres: string[];
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
};

export function Navbar({ genres, selectedGenre, onSelectGenre }: NavbarProps) {
  return (
    <aside className="flex w-full flex-col border-b border-slate-200 bg-white p-4 lg:w-72 lg:flex-shrink-0 lg:border-b-0 lg:border-r">
      <div className="space-y-3 border-b border-slate-200 pb-4">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500">
          Books.com
        </p>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">
          Browse books
        </h1>
        <p className="text-sm leading-6 text-slate-600">
          Pick a genre to filter the collection, then explore the covers in a tiled layout.
        </p>
      </div>

      <nav className="mt-4 flex flex-col gap-2">
        {genres.map((genre) => {
          const active = genre === selectedGenre;

          return (
            <button
              key={genre}
              type="button"
              onClick={() => onSelectGenre(genre)}
              className={`rounded-full px-3 py-2 text-left text-sm font-semibold transition ${
                active
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/15"
                  : "bg-slate-50 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100 hover:text-slate-900"
              }`}
              aria-pressed={active}
            >
              {genre}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}