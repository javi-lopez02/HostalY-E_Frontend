import React, { useEffect, useState } from "react";
import { OrderItem } from "../types";
import {
  getOrderRequest,
  updateDessertItemRequest,
  updateGastronomicItemRequest,
} from "../services/order";
import axios, { AxiosError } from "axios";
import { Spinner } from "@heroui/spinner";
import { toast } from "sonner";
import { Button, DatePicker, DateValue, Form, Input, useDisclosure } from "@heroui/react";
import ModalMessage from "../components/Car/ModalMessage";
import CardOfert from "../components/Car/CardOfert";
import Card from "../components/Car/Card";
import { useNavigate } from "react-router-dom";

const CarShop: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const [name, setName] = useState<string>();
  const [date, setDate] = useState<DateValue | null>();
  const [phone, setPhone] = useState<string>();

  const [order, setOrder] = useState<OrderItem[] | null>(null);
  const [orderId, setOrderId] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<Array<string> | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getOrderRequest()
      .then((res) => {
        if (res.data.data === null) {
          setOrder([]);
          setOrderId("");
          setTotalAmount(0);
          setCount(0);
          toast.success("No hay ofertas en su orden")
        } else {
          setOrder(res.data.data.orderItems);
          setOrderId(res.data.data.id);
          setTotalAmount(res.data.data.totalAmount);
          setCount(res.data.data._count.orderItems);
        }
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;

          if (axiosError.response) {
            setError(axiosError.response.data as Array<string>);
          } else if (axiosError.request) {
            console.error("No se recibió respuesta:", axiosError.request);
          }
        } else {
          console.error("Error desconocido:", error);
          setError(["Error con la peticion al servidor"]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [totalAmount]);

  const handleGastronomicQuantity = (
    value: string,
    id: string,
    price: number
  ) => {
    try {
      updateGastronomicItemRequest(id, Number(value), price).then((res) => {
        setTotalAmount(res.data.data.totalAmount);
        console.log("Cantidad actualizada");
      });
    } catch (error) {
      console.log(error);
      setError(["Error al incrementar el producto"]);
    }
  };

  const handleDessertQuantity = (value: string, id: string, price: number) => {
    try {
      updateDessertItemRequest(id, Number(value), price).then((res) => {
        setTotalAmount(res.data.data.totalAmount);
        console.log("Cantidad actualizada postre");
      });
    } catch (error) {
      console.log(error);
      setError(["Error al incrementar el producto"]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));

    const inputName = data["name"] as string;
    const inputPhone = data["phone"] as string;

    if (!inputName) {
      toast.error("El nombre es requerido");
      setLoading(false);
      return;
    }
    if (!inputPhone) {
      toast.error("El telefono es requerido");
      setLoading(false);
      return;
    }

    setName(inputName);
    setPhone(inputPhone);
    setLoading(false);
    onOpen();
  };

  return (
    <div className="font-[sans-serif] min-h-screen bg-gradient-to-tr from-gray-200 via-gray-100 to-gray-50 pt-16">
      <div className="max-w-7xl max-lg:max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-3">
          Tu carrito de compras
        </h2>

        <div className="grid grid-cols-[auto_auto] gap-5 max-lg:grid-cols-1">
          <div className="bg-gray-100 rounded-md p-4 h-max lg:sticky top-20">
            <h3 className="text-lg max-sm:text-base font-bold text-gray-800 border-b border-gray-300 pb-2">
              Order Summary
            </h3>

            <Form className="mt-6" onSubmit={handleSubmit}>
              <div className="w-full">
                <h3 className="text-base text-gray-800  font-semibold mb-4">
                  Enter Details
                </h3>
                <div className="space-y-3">
                  <Input
                    name="name"
                    variant="bordered"
                    color="primary"
                    label="Full Name"
                    placeholder="Escribe tu nombre...."
                    labelPlacement="inside"
                    className="w-full"
                    endContent={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#bbb"
                        className="w-5 h-5 text-gray-950 tex"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="10"
                          cy="7"
                          r="6"
                          data-original="#000000"
                        ></circle>
                        <path
                          d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    }
                  />

                  <DatePicker
                    name="date"
                    variant="bordered"
                    color="primary"
                    onChange={(value) => setDate(value)}
                    label="Fecha"
                    labelPlacement="inside"
                    className="w-full"
                    endContent={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#000"
                        className="w-5 h-5 text-gray-950 tex"
                        viewBox="0 0 682.667 682.667"
                      >
                        <defs>
                          <clipPath id="a" clipPathUnits="userSpaceOnUse">
                            <path
                              d="M0 512h512V0H0Z"
                              data-original="#000000"
                            ></path>
                          </clipPath>
                        </defs>
                        <g
                          clipPath="url(#a)"
                          transform="matrix(1.33 0 0 -1.33 0 682.667)"
                        >
                          <path
                            fill="none"
                            strokeMiterlimit="10"
                            strokeWidth="40"
                            d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                            data-original="#000000"
                          ></path>
                          <path
                            d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                            data-original="#000000"
                          ></path>
                        </g>
                      </svg>
                    }
                  />

                  <Input
                    name="phone"
                    variant="bordered"
                    color="primary"
                    label="Phone No."
                    labelPlacement="inside"
                    className="w-full"
                    startContent={<div className="text-sm">+53</div>}
                    endContent={
                      <svg
                        className="w-5 h-5 text-gray-950"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="m52.148 42.678-6.479-4.527a5 5 0 0 0-6.963 1.238l-1.504 2.156c-2.52-1.69-5.333-4.05-8.014-6.732-2.68-2.68-5.04-5.493-6.73-8.013l2.154-1.504a4.96 4.96 0 0 0 2.064-3.225 4.98 4.98 0 0 0-.826-3.739l-4.525-6.478C20.378 10.5 18.85 9.69 17.24 9.69a4.69 4.69 0 0 0-1.628.291 8.97 8.97 0 0 0-1.685.828l-.895.63a6.782 6.782 0 0 0-.63.563c-1.092 1.09-1.866 2.472-2.303 4.104-1.865 6.99 2.754 17.561 11.495 26.301 7.34 7.34 16.157 11.9 23.011 11.9 1.175 0 2.281-.136 3.29-.406 1.633-.436 3.014-1.21 4.105-2.302.199-.199.388-.407.591-.67l.63-.899a9.007 9.007 0 0 0 .798-1.64c.763-2.06-.007-4.41-1.871-5.713z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    }
                  />
                </div>
              </div>
              <ul className="text-gray-800 flex gap-4 text-sm divide-x m-3">
                <li className="flex flex-wrap gap-4 px-3">
                  Subtotal:{" "}
                  <span className="ml-auto font-bold">${totalAmount}</span>
                </li>
                <li className="flex flex-wrap gap-4 px-3">
                  Cantidad de Ofertas:
                  <span className="ml-auto font-bold">{count}</span>
                </li>
                <li className="flex flex-wrap gap-4 px-3 font-bold">
                  Total: <span className="ml-auto">${totalAmount}</span>
                </li>
              </ul>

              <div className="w-full mt-6 space-y-3">
                <Button
                  type="submit"
                  className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-gray-800 hover:bg-gray-900 text-white rounded-md"
                >
                  Checkout
                </Button>
                <div className="flex">
                  <Button
                    onPress={() => {
                      navigate("/oferts");
                    }}
                    type="button"
                    className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
                  >
                    Oferts{" "}
                  </Button>
                  <Button
                    onPress={() => {
                      navigate("/gastronomics");
                    }}
                    type="button"
                    className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
                  >
                    Gastronomics{" "}
                  </Button>
                  <Button
                    onPress={() => {
                      navigate("/desserts");
                    }}
                    type="button"
                    className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent text-gray-800 border border-gray-300 rounded-md"
                  >
                    Desserts{" "}
                  </Button>
                </div>
              </div>
            </Form>
          </div>
          <div className="grid  gap-4 relative max-lg:pt-5">
            <div className="lg:col-span-2 space-y-4">
              {order !== null &&
                order.map((orderItem) => {
                  if (orderItem.ofert) {
                    return (
                      <CardOfert
                        key={orderItem.ofert.id}
                        id={orderItem.id}
                        product={orderItem.ofert}
                        quantity={orderItem.quantity}
                        setCount={setCount}
                        setError={setError}
                        setOrder={setOrder}
                        setTotalAmount={setTotalAmount}
                      />
                    );
                  }
                  if (orderItem.gastronomic) {
                    return (
                      <Card
                        key={orderItem.gastronomic.id}
                        id={orderItem.id}
                        product={orderItem.gastronomic}
                        quantity={orderItem.quantity}
                        handleQuantity={handleGastronomicQuantity}
                        setCount={setCount}
                        setError={setError}
                        setOrder={setOrder}
                        setTotalAmount={setTotalAmount}
                      />
                    );
                  }
                  if (orderItem.dessert) {
                    return (
                      <Card
                        key={orderItem.dessert.id}
                        id={orderItem.id}
                        product={orderItem.dessert}
                        quantity={orderItem.quantity}
                        handleQuantity={handleDessertQuantity}
                        setCount={setCount}
                        setError={setError}
                        setOrder={setOrder}
                        setTotalAmount={setTotalAmount}
                      />
                    );
                  }
                })}
              {loading && (
                <div className="w-full flex justify-center pt-4">
                  <Spinner color="primary" />
                </div>
              )}
              <ModalMessage
                id={orderId}
                count={count}
                totalAmount={totalAmount}
                isOpen={isOpen}
                onClose={onClose}
                order={order}
                name={name}
                date={date}
                phone={phone}
              />
              {error && error.map((err) => toast.error(err))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CarShop;
