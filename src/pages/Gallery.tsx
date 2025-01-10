import { Spinner } from "@nextui-org/react";
import GalleryCard from "../components/gallery/GalleryCard";
import useGallery from "../customHooks/useGallery";
import { toast } from "sonner";

export default function Gallery() {
  const { gallery, error, loading } = useGallery();

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

        {gallery.length === 0 && !loading && (
          <div className="w-full flex justify-center pt-4">
            <span className="text-gray-700 font-bold text-md md:text-lg">
              No se encontraron Imágenes
            </span>
          </div>
        )}
        {!loading && (
          <div className="p-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {gallery &&
              gallery.map((galler) => (
                <GalleryCard
                  key={galler.id}
                  imagen={galler.imagen}
                  description={galler.description}
                />
              ))}
          </div>
        )}
      </div>
      {error && error.map((err) => toast.error(err))}
    </div>
  );
}
