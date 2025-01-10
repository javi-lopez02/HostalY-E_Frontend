import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import {useAuth} from '../../context/auth.context'


export default function Login() {
  const [error, setError] = useState<Array<string>>([]);
  const {errors ,signIn, isAuth} = useAuth()

  const navigate = useNavigate();

  useEffect(() => {
    if (error.length > 0) {
      const time = setTimeout(() => {
        setError([]);
      }, 5000);
      return () => clearTimeout(time);
    }
  }, [error]);

  useEffect(()=>{
    setError(errors)
  },[errors])

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { elements } = event.currentTarget;
    const inputUser = elements.namedItem("user") as RadioNodeList;
    const inputPassword = elements.namedItem("password") as RadioNodeList;

    if (!inputUser.value) {
      setError([...error, "User name is required"]);
      return;
    }

    if (!inputPassword.value) {
      setError([...error, "Password is required"]);
      return
    }

    await signIn({username: inputUser.value, password:inputPassword.value})

    inputUser.value = ""
    inputPassword.value = ""
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-screen">
        <Link
          to="/"
          className="flex flex-col justify-center items-center mb-6 text-2xl text-sky-950 font-bold dark:text-white"
        >
          <img className="w-16 h-16 mr-2" src="/public/Logo.png" alt="logo" />
          HOSTAL Y&E
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Accede a tu cuenta
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
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Usuario
                </label>

                <input
                  type="text"
                  name="user"
                  id="user"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Usuario ..."
                required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-500 dark:text-gray-300">
                      Recuerdame
                    </label>
                  </div>
                </div>
                <Link
                  to={"/login"}
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Entrar
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                ¿No tienes cuentas?
                <Link
                  to={"/register"}
                  className="font-medium ml-3 text-primary-600 hover:underline dark:text-primary-500"
                >
                  Regístrate
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}