import { Link } from "react-router";

export interface EventCard {
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  location?: string;
  eventUrl?: string;
}

export default function EventCard({ title, start, end, location, eventUrl }: EventCard) {
  const dateLabel = end ? `${start} – ${end}` : start;

  return (
    <article
      key={`${title}-${start}`}
      className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center"
    >
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-slate-500">{dateLabel}</p>
        <h3 className="text-lg font-semibold text-slate-900">
          {title}
        </h3>
        {location && (
          <p className="text-sm text-slate-600">{location}</p>
        )}
      </div>
      {eventUrl && (
        <div className="md:ml-4">
          <Link
            to={eventUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            View Details
          </Link>
        </div>
      )}
    </article>
  )
}