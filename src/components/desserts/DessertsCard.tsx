import { FC } from "react";

interface Desserts {
  name: string | undefined;
  price: number | undefined;
  image: string | undefined;
}

const DessertsCard: FC<Desserts> = ({ name, price, image }) => {
  return (
    <div className="border border-gray-200 bg-white p-6 shadow-sm rounded-3xl ">
      <div className="h-40 w-full">
        <img className="mx-auto h-full w-full rounded-[50%]" src={image} />
      </div>
      <div className="pt-6">
        <div className="text-lg font-semibold leading-tight text-gray-900 dark:text-white">
          {name}
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-xl font-extrabold leading-tight text-gray-900 dark:text-white">
            ${price}
          </p>

          <button
            type="button"
            className="inline-flex items-center rounded-lg bg-blue-800 px-3 py-2.5 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-4  focus:ring-blue-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
      {/* <AuthUser isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}></AuthUser> */}
    </div>
  );
};

export default DessertsCard;
