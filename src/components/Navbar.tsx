"use client";
import React, { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

interface Dish {
  id: string;
  name: string;
  category: string;
  image: string;
}

const fetchDishes = async (): Promise<Dish[]> => {
  const res = await fetch("/api/dishes");
  if (!res.ok) throw new Error("Failed to fetch dishes");
  return res.json();
};

const Navbar = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const { data: dishes = [] } = useQuery({
    queryKey: ["dishes"],
    queryFn: fetchDishes,
  });

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between w-full h-20 px-6 absolute top-4 left-0 z-20">
      <div className="h-full flex items-center px-6">
        <h1 className="text-white font-bold text-3xl">RESTAURANT</h1>
      </div>

      
      <div
        className="relative"
        ref={searchContainerRef}
        style={{ width: "500px" }}
      >
      
        <div
          className={`flex items-center px-4 py-2 min-h-[56px] bg-opacity-30 bg-white backdrop-blur-sm ${
            searchFocused ? "rounded-t-2xl" : "rounded-2xl"
          }`}
        >
          <CiSearch className="text-[#2D2D2D] text-3xl font-semibold" />
          <input
            type="text"
            placeholder="Search...."
            className="outline-none w-full ml-6 text-lg font-semibold bg-transparent text-[#2D2D2D] placeholder-[#2D2D2D]"
            onFocus={() => setSearchFocused(true)}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </div>

       
        <AnimatePresence>
          {searchFocused && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full rounded-b-2xl bg-white shadow-lg max-h-[344px] overflow-y-auto z-50"
            >
              {filteredDishes.length > 0 ? (
                filteredDishes.map((dish, index) => (
                  <div
                    key={dish._id}
                    className={`flex items-center p-3 ${
                      index === 0 ? "border-t" : ""
                    } border-gray-200 hover:bg-gray-100 cursor-pointer`}
                    onClick={() => {
                      setSearchValue(dish.name);
                      setSearchFocused(false);
                    }}
                  >
                    <div className="h-16 w-24 overflow-hidden mr-6">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="text-[#2D2D2D] font-medium">
                      {dish.name}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-gray-500 border-t border-gray-200">
                  No results found.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Navbar;
