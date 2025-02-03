import {
  Button,
  DateValue,
  Form,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { FC, useMemo, useState } from "react";
import { OrderItem } from "../../types";
import { useAuth } from "../../context/auth.context";
import { MESSAGE_URL } from "../../conf";
import { updateOrderRequest } from "../../services/order";
import { toast } from "sonner";

interface Props {
  id: string;
  count: number;
  totalAmount: number;
  isOpen: boolean;
  onClose: () => void;
  name?: string;
  date?: DateValue | null;
  phone?: string;
  order: OrderItem[] | null;
}

const columns = [
  { name: "IMAGEN", uid: "image" },
  { name: "DESCRIPCION", uid: "description" },
  { name: "CANTIDAD", uid: "quantity" },
  { name: "PRECIO TOTAL", uid: "totalPrice" },
];

const ModalMessage: FC<Props> = ({
  id,
  count,
  totalAmount,
  isOpen,
  onClose,
  name,
  date,
  phone,
  order,
}) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async () => {
    setLoading(true);
    updateOrderRequest(id)
      .then(() => {
        setLoading(false);
        onClose()
        toast.success("Se completo el pedido correctamente");

        const message = `Nombre: ${name},\n Fecha: ${date?.day}/${date?.month}/${date?.year},\n Teléfono: ${phone},\n Usuario: ${user?.username}, \n Pedido añadido al panel de administración`;

        const url = MESSAGE_URL + `${ message }`;
        window.open(url, "_blank");
      })
      .catch(() => {
        toast.error("Hubo un error al completar el pedido");
      })
  };

  const itemsFilter = useMemo((): OrderItem[] => {
    if (!order) {
      return [];
    }

    return order;
  }, [order]);

  const renderCell = React.useCallback(
    (order: OrderItem, columnKey: React.Key) => {
      const cellValue = order[columnKey as keyof OrderItem];

      switch (columnKey) {
        case "image":
          if (order.ofert) {
            return (
              <img className="w-8 h-8 rounded-full" src="/Logo.png" alt="" />
            );
          } else if (order.dessert) {
            return (
              <img
                className="w-8 h-8 rounded-full"
                src={order.dessert.imagen}
                alt=""
              />
            );
          } else {
            return (
              <img
                className="w-8 h-8 rounded-full"
                src={order.gastronomic.imagen}
                alt=""
              />
            );
          }
        case "description":
          if (order.ofert) {
            return <div>{order.ofert.description}</div>;
          } else if (order.dessert) {
            return <div>{order.dessert.description}</div>;
          } else {
            return <div>{order.gastronomic.description}</div>;
          }
        case "quantity":
          return (
            <div className="flex  justify-center">
              <p className="text-bold text-sm capitalize">{order.quantity}</p>
            </div>
          );
        case "totalPrice":
          return (
            <div className="flex justify-center ">
              <p className="text-bold text-sm capitalize">{order.price}</p>
            </div>
          );
        default:
          return String(cellValue);
      }
    },
    []
  );

  return (
    <>
      <Modal backdrop={"blur"} isOpen={isOpen} onClose={onClose} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-end  space-x-2 gap-1 font-[sans-serif] ">
                <img src="./Logo.png" alt="Logo Hostal" className="w-10 h-8" />
                <h1 className="text-2xl font-bold">Confirme su Compra</h1>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <div className="w-full">
                    <ul className="flex flex-col lg:flex-row lg:divide-x ">
                      <li className="flex space-x-2 px-2">
                        <strong className="text-neutral-700/80">
                          Cantidad de Productos:{" "}
                        </strong>
                        <h1 className="font-semibold">{count}</h1>
                      </li>
                      <li className="flex space-x-2 px-2">
                        <strong className="text-neutral-700/80">
                          Precio:{" "}
                        </strong>
                        <h1 className="font-semibold">{totalAmount}$</h1>
                      </li>
                      <li className="flex space-x-2 px-2">
                        <strong className="text-neutral-700/80">
                          Nombre:{" "}
                        </strong>
                        <h1 className="font-semibold">{name}</h1>
                      </li>
                      <li className="flex space-x-2 px-2">
                        <strong className="text-neutral-700/80">Fecha: </strong>
                        <h1 className="font-semibold">{`${date?.day}/${date?.month}/${date?.year}`}</h1>
                      </li>
                      <li className="flex space-x-2 px-2">
                        <strong className="text-neutral-700/80">Phone: </strong>
                        <h1 className="font-semibold">{phone}</h1>
                      </li>
                    </ul>
                    <Table
                      aria-label="Example table with custom cells"
                      shadow="none"
                      isHeaderSticky
                      classNames={{ wrapper: "max-h-[500px] max-w-full" }}
                    >
                      <TableHeader columns={columns}>
                        {(column) => (
                          <TableColumn
                            key={column.uid}
                            align={
                              column.uid === "quantity" ||
                              column.uid === "totalPrice"
                                ? "center"
                                : "start"
                            }
                          >
                            {column.name}
                          </TableColumn>
                        )}
                      </TableHeader>
                      <TableBody
                        items={itemsFilter}
                        isLoading={loading}
                        loadingContent={<Spinner color="warning" />}
                      >
                        {(item) => (
                          <TableRow key={item.id}>
                            {(columnKey) => (
                              <TableCell>
                                {renderCell(item, columnKey)}
                              </TableCell>
                            )}
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                    <div className="flex justify-end gap-3 py-3">
                      <Button color="danger" variant="light" onPress={onClose}>
                        Cancelar
                      </Button>
                      <Button
                        onPress={handleSubmit}
                        color="primary"
                        type="submit"
                      >
                        {loading && <Spinner color="default" />}
                        {!loading && "Confirmar"}
                      </Button>
                    </div>
                  </div>
                </Form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalMessage;
