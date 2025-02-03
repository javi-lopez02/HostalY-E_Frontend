import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Input, useDisclosure } from "@nextui-org/react";
import { Desserts, Gastronomics, OrderItem } from "../../types";
import { deleteOrderItemRequest } from "../../services/order";
import ModalDelete from "./ModalDelete";

interface Props {
  product: Gastronomics | Desserts;
  quantity: number;
  id: string;
  handleQuantity: (value: string, id: string, price: number) => void;
  setError: (value: string[]) => void;
  setOrder: React.Dispatch<React.SetStateAction<OrderItem[] | null>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
}

const Card: React.FC<Props> = ({
  product,
  quantity,
  id,
  handleQuantity,
  setError,
  setOrder,
  setCount,
  setTotalAmount,
}) => {
  const [value, setvalue] = useState(`${quantity}`);
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
        <div className="max-w-52 shrink-0">
          <img src={product.imagen} className="w-40 h-40 object-cover rounded-full" />
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
            <div className="flex items-center max-sm:flex-col">
              <div className="flex items-center ml-8 max-sm:ml-0 max-sm:mt-2">
                <h4 className="text-sm font-bold text-gray-800">Cantidad:</h4>
                <Input
                  className="w-20 pl-2"
                  placeholder="0"
                  labelPlacement="outside"
                  color="primary"
                  value={value}
                  onValueChange={(event) => {
                    if (Number(event) > 0) {
                      setvalue(event);
                      handleQuantity(event, id, product.price);
                    }
                  }}
                  type="number"
                />
              </div>
            </div>

            <div className="flex items-center">
              <h4 className="text-lg font-bold text-gray-800 max-sm:mt-14">
                ${product.price * Number(value)}
              </h4>
              <button
                onClick={onOpen}
                className="w-8 h-8 flex items-center justify-center cursor-pointer shrink-0 fill-white rounded-lg p-1 absolute top-2 right-2"
              >
                <FaTimes className="text-red-500 hover:text-red-800" />
              </button>
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
export default Card;
