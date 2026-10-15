const fields = ["Course", "Assignment", "Due date", "Status"];

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Assignment Tracker
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Keep every course, deadline and status in one simple place.
        </p>

        <div className="mt-12 rounded-2xl border border-black/10 p-6 text-left dark:border-white/15">
          <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
            Coming soon
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {fields.map((field) => (
              <li
                key={field}
                className="rounded-lg bg-black/[.04] px-4 py-3 text-sm font-medium dark:bg-white/[.07]"
              >
                {field}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
