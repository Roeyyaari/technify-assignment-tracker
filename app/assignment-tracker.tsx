"use client";

import { useState, type FormEvent } from "react";

const STATUSES = ["Not Started", "In Progress", "Completed"] as const;
type Status = (typeof STATUSES)[number];

type Assignment = {
  id: string;
  course: string;
  name: string;
  dueDate: string;
  status: Status;
};

type Errors = Partial<Record<"course" | "name" | "dueDate", string>>;

const statusStyles: Record<Status, string> = {
  "Not Started": "bg-zinc-500/15 text-zinc-600 dark:text-zinc-300",
  "In Progress": "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  Completed: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
};

const inputClass =
  "w-full rounded-lg border border-black/10 bg-transparent px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-zinc-500 focus:border-foreground dark:border-white/15";

const MIN_YEAR = 2000;
const MAX_YEAR = 2100;

function validate(field: keyof Errors, value: string): string | undefined {
  if (field === "course") return value.trim() ? undefined : "Course is required.";
  if (field === "name")
    return value.trim() ? undefined : "Assignment name is required.";

  if (!value) return "Due date is required.";
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return `Enter a valid date with a four-digit year (${MIN_YEAR}–${MAX_YEAR}).`;
  const [y, m, d] = match.slice(1).map(Number);
  const date = new Date(y, m - 1, d);
  const isReal =
    date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
  if (!isReal) return "Enter a valid date.";
  if (y < MIN_YEAR || y > MAX_YEAR)
    return `Due date must be between ${MIN_YEAR} and ${MAX_YEAR}.`;
}

function formatDate(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AssignmentTracker() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [course, setCourse] = useState("");
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<Status>("Not Started");
  const [errors, setErrors] = useState<Errors>({});

  // Re-validate a field as it changes, but only once it has shown an error.
  function revalidate(field: keyof Errors, value: string) {
    if (!errors[field]) return;
    setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const next: Errors = {};
    const courseError = validate("course", course);
    const nameError = validate("name", name);
    const dueDateError = validate("dueDate", dueDate);
    if (courseError) next.course = courseError;
    if (nameError) next.name = nameError;
    if (dueDateError) next.dueDate = dueDateError;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setAssignments((prev) => [
      {
        id: crypto.randomUUID(),
        course: course.trim(),
        name: name.trim(),
        dueDate,
        status,
      },
      ...prev,
    ]);
    setCourse("");
    setName("");
    setDueDate("");
    setStatus("Not Started");
  }

  return (
    <div className="mt-12 space-y-10 text-left">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-2xl border border-black/10 p-5 dark:border-white/15 sm:p-6"
      >
        <h2 className="text-sm font-medium uppercase tracking-wide text-zinc-500">
          New assignment
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field id="course" label="Course" error={errors.course}>
            <input
              id="course"
              className={inputClass}
              placeholder="e.g. Biology 101"
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
                revalidate("course", e.target.value);
              }}
              aria-invalid={!!errors.course}
            />
          </Field>

          <Field id="name" label="Assignment name" error={errors.name}>
            <input
              id="name"
              className={inputClass}
              placeholder="e.g. Lab report"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                revalidate("name", e.target.value);
              }}
              aria-invalid={!!errors.name}
            />
          </Field>

          <Field id="dueDate" label="Due date" error={errors.dueDate}>
            <input
              id="dueDate"
              type="date"
              className={`${inputClass} dark:[color-scheme:dark]`}
              value={dueDate}
              min={`${MIN_YEAR}-01-01`}
              max={`${MAX_YEAR}-12-31`}
              onChange={(e) => {
                setDueDate(e.target.value);
                revalidate("dueDate", e.target.value);
              }}
              aria-invalid={!!errors.dueDate}
            />
          </Field>

          <Field id="status" label="Status">
            <select
              id="status"
              className={`${inputClass} dark:[color-scheme:dark] [&>option]:bg-background [&>option]:text-foreground`}
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:w-auto"
        >
          Add assignment
        </button>
      </form>

      <section aria-labelledby="list-heading">
        <h2
          id="list-heading"
          className="text-sm font-medium uppercase tracking-wide text-zinc-500"
        >
          Assignments ({assignments.length})
        </h2>

        {assignments.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-black/15 px-6 py-10 text-center text-sm text-zinc-500 dark:border-white/20">
            No assignments yet. Add your first one above.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {assignments.map((a) => (
              <li
                key={a.id}
                className="flex flex-col gap-3 rounded-2xl border border-black/10 p-4 dark:border-white/15 sm:flex-row sm:items-center sm:justify-between sm:px-5"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{a.name}</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    {a.course} · Due {formatDate(a.dueDate)}
                  </p>
                </div>
                <span
                  className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[a.status]}`}
                >
                  {a.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
