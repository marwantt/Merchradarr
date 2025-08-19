export default function AmazonSearchPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <main className="w-full max-w-xl flex flex-col items-stretch gap-6">
        <h1 className="text-2xl font-semibold text-center">Search Amazon</h1>
        <form
          action="https://www.amazon.com/s"
          method="GET"
          className="flex gap-2"
        >
          <input
            type="text"
            name="k"
            placeholder="What are you looking for?"
            className="flex-1 h-12 px-4 rounded-md border border-black/10 dark:border-white/20 bg-white dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
            required
          />
          <button
            type="submit"
            className="h-12 px-5 rounded-md bg-foreground text-background font-medium hover:opacity-90"
          >
            Search
          </button>
        </form>
        <p className="text-center text-sm text-black/60 dark:text-white/60">
          This form forwards to Amazon search results.
        </p>
      </main>
    </div>
  );
}


