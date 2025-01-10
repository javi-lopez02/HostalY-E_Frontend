import { FC } from "react";

interface Drinks {
  name: string | undefined;
  price: number | undefined;
  image: string | undefined;
}

const DrinksCard: FC<Drinks> = ({ name, price, image }) => {
  return (
    <div className="flex items-center pb-4 mb-4 border-b border-dashed border-gray-300">
      <div className="rounded-full overflow-hidden w-20 h-20">
        <img
          className="w-full h-full object-cover"
          src={image}
          alt=""
        />
      </div>
      <div className="ml-4 w-[calc(100%-95px)]">
        <div className="flex items-start">
          <div className="w-2/3">
            <h4 className="text-lg md:text-xl font-bold leading-tight text-gray-700 dark:text-white">
              {name}
            </h4>
          </div>
          <div className="w-1/3 text-right">
            <h4 className="text-gray-500 text-center text-lg md:text-xl font-bold leading-tight dark:text-white">${price}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrinksCard;
