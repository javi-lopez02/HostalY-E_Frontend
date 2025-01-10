import { useEffect, useState } from "react";
import { Gastronomics } from "../types";
import { getGastronomicsRequest } from "../services/gastronomics";

function useGastronomics() {
  const [gastronomics, setGastronomics] = useState<Gastronomics[] >([]);
  const [error, setError] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getGastronomicsRequest()
      .then((res) => {
        setGastronomics(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(["Ocurrio un error con la peticion."]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { gastronomics, error, loading };
}

export default useGastronomics;