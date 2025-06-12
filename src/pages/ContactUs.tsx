import { Button, Form, Input, Spinner, Textarea } from "@heroui/react";
import { FaAudioDescription, FaPhone, FaUser } from "react-icons/fa";
import "../index.css";
import { useState } from "react";
import { useAuth } from "../context/auth.context";
import { toast } from "sonner";

export default function ContactUs() {
  const user = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));

    const name = data["name"] as string;
    const user = data["user"] as string;
    const phone = data["phone"] as string;
    const message = data["message"] as string;

    // Validaciones
    if (!name) {
      toast.error("El nombre es requerido");
      setLoading(false);
      return;
    }
    if (!phone) {
      toast.error("El telefono es requerido");
      setLoading(false);
      return;
    }

    if (!message) {
      toast.error("El mensaje es requerido");
      setLoading(false);
      return;
    }

    const messageWhatsApp = `Nombre: ${name} \n Usuario: ${user} \n Telefeno: ${phone} \n Mensaje: ${message}`;
  
    const url = `https://wa.me/${5363939196}?text=${messageWhatsApp}`
    window.open(url)
  };

  return (
    <div className="pt-20">
      <div className="font-[sans-serif] max-w-6xl mx-auto relative bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-3xl overflow-hidden mt-4">
        <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-blue-400"></div>
        <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-blue-400"></div>

        <div className="grid md:grid-cols-2 gap-8 py-8 px-6">
          <div className="text-center flex flex-col items-center justify-center">
            <img src="Contactus.png" className="shrink-0 shadowimg w-5/6" />
          </div>

          <div className="flex flex-col items-center w-full rounded-tl-3xl rounded-bl-3xl">
            <h2 className="text-2xl text-blue-600 font-bold text-center mb-6">
              Contact us
            </h2>
            <Form
              onSubmit={handleSubmit}
              className="w-full mx-auto space-y-3 relative"
            >
              <Input
                name="name"
                variant="faded"
                color="primary"
                placeholder="Name"
                endContent={<FaUser className="text-primary" />}
              />
              <Input
                name="user"
                variant="faded"
                color="primary"
                placeholder="User"
                defaultValue={user.user?.username}
                endContent={<FaUser className="text-primary" />}
              />
              <Input
                name="phone"
                variant="faded"
                color="primary"
                placeholder="5XXXXXXX"
                startContent={<div className="text-sm">+53</div>}
                endContent={<FaPhone className="text-primary" />}
              />
              <Textarea
                name="message"
                variant="faded"
                color="primary"
                placeholder="Message"
                endContent={<FaAudioDescription className="text-primary" />}
              />

              <div className="flex w-full justify-end">
                <Button color="success" type="submit">
                  {loading && <Spinner />}
                  {!loading && (
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        height="16px"
                        fill="#fff"
                        className="mr-2 inline"
                        viewBox="0 0 548.244 548.244"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                          clip-rule="evenodd"
                          data-original="#000000"
                        />
                      </svg>
                      Send Message
                    </div>
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
