'use client';
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CategoryTab from "./CategoryTab";
import DishGridContainer from "./DishGridContainer";
import Feedback from "./Feedback";

interface Dish {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
}

const fetchDishes = async (): Promise<Dish[]> => {
  const res = await fetch('/api/dishes');
  if (!res.ok) throw new Error('Failed to fetch dishes');
  return res.json();
};

const DishesSection = () => {
  const { data: dishes = [], isLoading } = useQuery({
    queryKey: ["dishes"],
    queryFn: fetchDishes,
  });

  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryFilter = (category: string) => {
    setActiveCategory(category);
  };

  const filteredDishes = activeCategory === 'All'
    ? dishes
    : dishes.filter(
        (dish) => dish.category.toLowerCase() === activeCategory.toLowerCase()
      );

  return (
    <div className="flex flex-col w-full bg-white text-[#1F1F1F] px-48 pt-24 items-center">
      <h1 className="text-4xl font-bold">Our best Seller Dishes</h1>
      <h2 className="text-2xl font-normal text-center w-[852px] mt-4 mb-8 text-[#5C5C5C]">
        Our fresh garden salad is a light and refreshing option. It features a
        mix of crisp lettuce, juicy tomatoes all tossed in your choice of
        dressing.
      </h2>
      <CategoryTab onFilter={handleCategoryFilter} />
      <DishGridContainer dishes={filteredDishes} loading={isLoading} />
      <Feedback />
    </div>
  );
};

export default DishesSection;
