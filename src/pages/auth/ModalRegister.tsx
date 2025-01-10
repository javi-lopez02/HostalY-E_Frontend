import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/auth.context";
import { Button, Checkbox, Input, Link, ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import { BiLock, BiUser } from "react-icons/bi";

function ModalRegister({ onClose, setIsRegister }: { onClose: () => void, setIsRegister: (value: boolean) => void }) {
  const [error, setError] = useState<Array<string>>([]);
  const { errors, signUp } = useAuth()

  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmRef = useRef<HTMLInputElement | null>(null);
  const userNameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (error.length > 0) {
      const time = setTimeout(() => {
        setError([]);
      }, 5000);
      return () => clearTimeout(time);
    }
  }, [error]);

  useEffect(() => {
    setError(errors)
  }, [errors])

  const handleSubmit = async () => {

    if (!passwordRef.current?.value) {
      setError([...error, "Password is required"]);
      return
    }
    if (!confirmRef.current?.value) {
      setError([...error, "Confirm-Password is required"]);
      return
    }
    if (!userNameRef.current?.value) {
      setError([...error, "User name is required"]);
      return;
    }
    if (confirmRef.current?.value !== passwordRef.current?.value)  {
      setError([...error, "Passwords diferentes"]);
      return
    }

    signUp({ password: passwordRef.current?.value, username: userNameRef.current.value })
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        <div

          className="flex items-center text-2xl font-bold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="./Logo.png"
            alt="logo"
          />
          Hostal Y&E
        </div>
      </ModalHeader>
      <ModalBody>
        <h1 className="text-xl font-semibold leading-tight tracking-tight mb-3 text-gray-900 md:text-2xl dark:text-white">
          Create Account
        </h1>
        {error.length > 0 &&
          error.map((err) => {
            return (
              <div
                className="bg-red-400 p-2 rounded-lg mx-auto w-4/5 flex items-center justify-center"
                key={err}
              >
                <h1 className="text-white font-bold">{err}</h1>
              </div>
            );
          })}
        <Input
          autoFocus
          ref={userNameRef}
          label="Username"
          endContent={
            <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          placeholder="Enter your username"
          variant="bordered"
        />
        <Input
          ref={passwordRef}
          endContent={
            <BiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Password"
          placeholder="Enter your password"
          type="password"
          variant="bordered"
        />
         <Input
          ref={confirmRef}
          endContent={
            <BiLock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Confirmar Password"
          placeholder="Enter your password"
          type="password"
          variant="bordered"
        />
        <div className="flex py-2 px-1 justify-between">
          <Checkbox
            classNames={{
              label: "text-small",
            }}
          >
            Remember me
          </Checkbox>
          <Link color="primary" href="#" size="sm">
            Forgot Account?
          </Link>
        </div>
        <div className="flex items-center  text-sm font-light text-gray-500 dark:text-gray-400">
          Do you have account?
          <div onClick={()=>setIsRegister(false)} className="font-medium ml-3 text-primary-600 hover:underline dark:text-primary-500 cursor-pointer">
            Log in
          </div>
        </div>
      </ModalBody>
      <ModalFooter>

        <Button color="danger" variant="flat" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={() => {
          handleSubmit()
        }} >
          Sing In
        </Button>
      </ModalFooter>
    </>
  );
}

export default ModalRegister