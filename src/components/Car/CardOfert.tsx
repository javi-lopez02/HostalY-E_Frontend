import { FaTimes } from "react-icons/fa";
import { useDisclosure } from "@nextui-org/react";
import { Oferts, OrderItem } from "../../types";
import { deleteOrderItemRequest } from "../../services/order";
import ModalDelete from "./ModalDelete";

interface Props {
  product: Oferts;
  quantity: number;
  id: string;
  setError: (value: string[]) => void;
  setOrder: React.Dispatch<React.SetStateAction<OrderItem[] | null>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
}

const CardOfert: React.FC<Props> = ({
  product,
  quantity,
  id,
  setError,
  setOrder,
  setCount,
  setTotalAmount,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOrderDelte = () => {
    deleteOrderItemRequest(id)
      .then((res) => {
        setOrder((prev: OrderItem[] | null) => {
          if (!prev) {
            return null;
          }
          return prev?.filter((item) => item.id !== id);
        });
        setCount((count) => {
          return count - 1;
        });
        setTotalAmount(res.data.data.totalAmount);
      })
      .catch((error) => {
        console.log(error);
        setError(["Error al elimiar el producto del carrito"]);
      });
  };

  return (
    <div className="p-6 bg-white min-w-min shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] rounded-md relative">
      <div className="flex items-center max-sm:flex-col gap-4 max-sm:gap-6">
        <div className="shrink-0">
          <img
            src="/Logo.png"
            className="w-40 h-40 object-cover rounded-full"
          />
        </div>

        <div className="sm:border-l sm:pl-4 sm:border-gray-300 w-full">
          <h3 className="text-xl font-bold cursor-pointer text-gray-800">
            {product.price}
          </h3>
          <ul className="mt-4 text-sm text-gray-800 space-y-2">
            <li>Descripción: {product.description}</li>
          </ul>
          <hr className="border-gray-300 my-4" />

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              
              <button
                onClick={onOpen}
                className="w-8 h-8 flex items-center justify-center cursor-pointer shrink-0 fill-white rounded-lg absolute top-3.5 right-3.5"
              >
                <FaTimes className="text-red-500 hover:text-red-800" />
              </button>
              <h4 className="text-lg font-bold text-gray-800 max-sm:mt-14">
                ${product.price * quantity}
              </h4>
            </div>
          </div>
          <ModalDelete
            handleOrderDelte={handleOrderDelte}
            isOpen={isOpen}
            onClose={onClose}
          ></ModalDelete>
        </div>
      </div>
    </div>
  );
};
export default CardOfert;
