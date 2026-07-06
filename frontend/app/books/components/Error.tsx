type ErrorProps = {
  message: string;
};

export function Error({ message }: ErrorProps) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
      {message}
    </div>
  );
}