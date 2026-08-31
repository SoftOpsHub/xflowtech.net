'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div role="alert" className="p-8">
      <p>Something went wrong.</p>
      <button className="mt-2 underline" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
