import React from "react";

interface Dish {
  name: string;
  category: string;
  image: string;
}

interface DishCardProps {
  dish: Dish;
}

const DishCard: React.FC<DishCardProps> = ({ dish }) => {
  const { name, category, image } = dish;
  return (
    <div className="shadow-sm rounded-2xl">
      <img
        src={image}
        alt={`${name} image`}
        className="w-[370px] h-[250px] object-cover"
      />
      <div className="px-4 pt-6 pb-8 space-y-4">
        <section className="flex justify-between">
          <h1 className="font-medium text-2xl">{name}</h1>
          <h2 className="text-md text-white py-1 px-4 rounded-full bg-[#F03328]">
            {category}
          </h2>
        </section>
        <section className="flex justify-between items-center">
          <div className="flex space-x-1 text-orange-400">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-4 h-4"
              >
                <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.783 1.4 8.168L12 18.896l-7.334 3.866 1.4-8.168L.132 9.211l8.2-1.193z" />
              </svg>
            ))}
          </div>
          <h1 className="font-bold text-2xl">$230</h1>
        </section>
      </div>
    </div>
  );
};

export default DishCard;
