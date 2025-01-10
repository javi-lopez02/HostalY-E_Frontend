import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { BiLock, BiUser } from "react-icons/bi";
import { useAuth } from "../../context/auth.context";

function ModalLogin({
  onClose,
  setIsRegister,
}: {
  onClose: () => void;
  setIsRegister: (value: boolean) => void;
}) {
  const [error, setError] = useState<Array<string>>([]);
  const { errors, signIn } = useAuth();

  const userRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (error.length > 0) {
      const time = setTimeout(() => {
        setError([]);
      }, 5000);
      return () => clearTimeout(time);
    }
  }, [error]);

  useEffect(() => {
    setError(errors);
  }, [errors]);

  const handleSubmit = async () => {
    if (!userRef.current?.value) {
      setError([...error, "User name is required"]);
      return;
    }

    if (!passwordRef.current?.value) {
      setError([...error, "Password is required"]);
      return;
    }

    signIn({
      username: userRef.current?.value,
      password: passwordRef.current?.value,
    });
  };

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        <div className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="./Logo.png" alt="logo" />
          Hostal Y&E
        </div>
      </ModalHeader>
      <ModalBody>
        <h1 className="text-xl font-semibold leading-tight tracking-tight mb-3 text-gray-900 md:text-2xl dark:text-white">
          Access to your account
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
          ref={userRef}
          endContent={
            <BiUser className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          label="Username"
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
        <div className="flex py-2 px-1 justify-between">
          <Checkbox
            classNames={{
              label: "text-small",
            }}
          >
            Remember me
          </Checkbox>
          <Link color="primary" href="#" size="sm">
            Forgot your password?
          </Link>
        </div>
        <div className="flex items-center  text-sm font-light text-gray-500 dark:text-gray-400">
          Don't have account?
          <div
            onClick={() => setIsRegister(true)}
            className="font-medium ml-3 text-primary-600 hover:underline dark:text-primary-500 cursor-pointer"
          >
            Sing In
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="flat" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => {
            handleSubmit();
          }}
        >
          Log In
        </Button>
      </ModalFooter>
    </>
  );
}

export default ModalLogin;
