"use client";
import React, { useState } from "react";
import CreateDishForm from "./CreateDishForm";
import CreateCategoryForm from "./CreateCategoryForm";
import { useQuery } from "@tanstack/react-query";
import { Category, getAllCategories } from "../app/api/categories/route";

interface Props {
  onFilter: (category: string) => void;
}

const CategoryTab: React.FC<Props> = ({ onFilter }) => {
  const [showDishForm, setShowDishForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const { data: categoriesData = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const categories = ["All", ...categoriesData.map((cat) => cat.name)];

  const handleFilterClick = (cat: string) => {
    setActiveCategory(cat);
    onFilter(cat);
  };

  return (
    <>
      <div className="flex justify-between w-full mt-4 mb-12">
        <section>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <li
                key={cat}
                className={`border border-[#BABABA] py-2 px-6 rounded-full cursor-pointer text-center transition ${
                  activeCategory === cat
                    ? "bg-[#2C2C2C] text-white"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => handleFilterClick(cat)}
              >
                {cat}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <ul className="flex gap-x-4">
            <li>
              <button
                className="bg-[#2C2C2C] text-white py-2 px-6 rounded-full cursor-pointer"
                onClick={() => setShowDishForm(true)}
              >
                Add Food
              </button>
            </li>
            <li>
              <button
                className="bg-[#2C2C2C] text-white py-2 px-6 rounded-full cursor-pointer"
                onClick={() => setShowCategoryForm(true)}
              >
                Add Category
              </button>
            </li>
          </ul>
        </section>
      </div>

      {showDishForm && (
        <CreateDishForm
          onClose={() => setShowDishForm(false)}
          onSubmit={(formData) => {
            console.log("Dish submitted", formData);
            setShowDishForm(false);
          }}
        />
      )}

      {showCategoryForm && (
        <CreateCategoryForm
          onClose={() => setShowCategoryForm(false)}
        />
      )}
    </>
  );
};

export default CategoryTab;
