import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Error 404
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved or no longer exists.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
          >
            Go back home
          </Link>
          <Link
            href="/"
            className="inline-flex h-11 w-full items-center justify-center rounded-md border border-border bg-background px-8 text-sm font-medium text-foreground transition-colors hover:bg-accent sm:w-auto"
          >
            Contact support
          </Link>
        </div>
      </div>
    </main>
  )
}
