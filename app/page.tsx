import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Welcome to Cranes
      </h1>
      <p className="mt-4 text-muted-foreground">
        Your business management solution
      </p>
      <Link
        href="/test-404"
        className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Test 404 Page
      </Link>
    </main>
  )
}
