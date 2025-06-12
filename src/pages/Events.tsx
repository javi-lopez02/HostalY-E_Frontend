import { Spinner } from "@heroui/react";
import useEvents from "../customHooks/useEvents";
import { toast } from "sonner";
import EventsCard from "../components/events/EventsCard";

export default function Events() {
  const { events, error, loading } = useEvents();

  return (
    <div className="p-10 md:p-36 pt-20 md:pt-20 flex flex-col gap-10">
      <h1 className="text-center text-2xl md:text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
        Galería de Imágenes
      </h1>
      <div>
        {loading && (
          <div className="w-full flex justify-center pt-4">
            <Spinner color="primary" size="md" />
          </div>
        )}

        {events.length === 0 && !loading && (
          <div className="w-full flex justify-center pt-4">
            <span className="text-gray-700 font-bold text-md md:text-lg">
              No se encontraron Imágenes
            </span>
          </div>
        )}
        {!loading && (
          <div className="p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {events &&
              events.map((event) => (
                <EventsCard
                  key={event.id}
                  imagen={event.imagen}
                  description={event.description}
                />
              ))}
          </div>
        )}
      </div>
      {error && error.map((err) => toast.error(err))}
    </div>
  );
}
