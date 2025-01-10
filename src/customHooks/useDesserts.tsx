import { useEffect, useState } from "react";
import { Desserts } from "../types";
import { getDessertsRequest } from "../services/desserts";

function useDesserts() {
  const [desserts, setDesserts] = useState<Desserts[]>([]);
  const [error, setError] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getDessertsRequest()
      .then((res) => {
        setDesserts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(["Ocurrio un error con la peticion."]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { desserts, error, loading };
}

export default useDesserts;
