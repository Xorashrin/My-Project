import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="glass rounded-xl p-8 text-center">
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        The page you requested does not exist.
      </p>
      <Link href="/" className="mt-4 inline-flex rounded-lg bg-brand-600 px-4 py-2 text-white">
        Go Home
      </Link>
    </div>
  );
}
