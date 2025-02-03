import { FC } from "react";
import { toast } from "sonner";
import { addItemOfertRequest } from "../../services/order";
import { useAuth } from "../../context/auth.context";
import { useDisclosure } from "@nextui-org/react";
import AuthUser from "../../pages/auth/AuthUser";

interface Oferts {
  id: string;
  description: string | undefined;
  price: number | undefined;
}

const OfertsCard: FC<Oferts> = ({ id, description, price }) => {
  const { isAuth } = useAuth();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const handleClikAddProduct = () => {
    if (!isAuth) {
      onOpen();
      return;
    }
    toast.promise(addItemOfertRequest(id, 1), {
      loading: "Loading...",
      success: (res) => {
        if (res.status !== 200) {
          toast.warning(
            `Aviso: ${res.data.message || "Hubo un problema con la solicitud."}`
          );
          return "La operación no fue completamente exitosa.";
        }
        return `${res.data.message}`;
      },
      error: "Error al añadir un producto al carrito.",
    });
  };
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm ">
      <div className="">
        <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
          Precio ${price}
        </p>

        <div className="p-2 flex flex-col gap-2">
          <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
            Incluye:
          </h1>
          <div className="text-lg font-light leading-tight overflow-y-scroll scrollbar-hide line-clamp-2 text-gray-900 dark:text-white">
            {description}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <button
            onClick={handleClikAddProduct}
            type="button"
            className="inline-flex items-center rounded-lg bg-blue-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4  focus:ring-blue-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            <>
              <svg
                className="-ms-2 me-2 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 3a1 1 0 0 0 0 2h.687L7.82 15.24A3 3 0 1 0 11.83 17h2.34A3 3 0 1 0 17 15H9.813l-.208-1h8.145a1 1 0 0 0 .979-.796l1.25-6A1 1 0 0 0 19 6h-2.268A2 2 0 0 1 15 9a2 2 0 1 1-4 0 2 2 0 0 1-1.732-3h-1.33L7.48 3.796A1 1 0 0 0 6.5 3H5Z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M14 5a1 1 0 1 0-2 0v1h-1a1 1 0 1 0 0 2h1v1a1 1 0 1 0 2 0V8h1a1 1 0 1 0 0-2h-1V5Z"
                  clip-rule="evenodd"
                />
              </svg>
              Comprar
            </>
          </button>
        </div>
      </div>
      <AuthUser
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      ></AuthUser>
    </div>
  );
};

export default OfertsCard;
