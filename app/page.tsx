import AssignmentTracker from "./assignment-tracker";

export default function Home() {
  return (
    <main className="flex flex-1 justify-center px-4 py-16 sm:px-6 sm:py-24">
      <div className="w-full max-w-2xl">
        <header className="text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Assignment Tracker
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Keep every course, deadline and status in one simple place.
          </p>
        </header>

        <AssignmentTracker />
      </div>
    </main>
  );
}
