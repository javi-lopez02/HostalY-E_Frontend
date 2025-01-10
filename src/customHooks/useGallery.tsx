import { useEffect, useState } from "react";
import { Gallery } from "../types";
import { getGalleryRequest } from "../services/gallery";


function useGallery() {
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [error, setError] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getGalleryRequest()
      .then((res) => {
        setGallery(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(["Ocurrio un error con la peticion."]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { gallery, error, loading };
}

export default useGallery;
