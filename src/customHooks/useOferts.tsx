import { useEffect, useState } from "react";
import { getOfertsRequest } from "../services/oferts";
import { Oferts } from "../types";

function useOferts() {
  const [oferts, setOferts] = useState<Oferts[] >([]);
  const [error, setError] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getOfertsRequest()
      .then((res) => {
        setOferts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setError(["Ocurrio un error con la peticion."]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { oferts, error, loading };
}

export default useOferts;