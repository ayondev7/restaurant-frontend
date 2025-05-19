'use client';
import React, { useState, useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";

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

      {/* Search Container */}
      <div className="relative" ref={searchContainerRef} style={{ width: "500px" }}>
        {/* Search Input and Dropdown Container */}
        <div 
          className={`bg-opacity-30 bg-white backdrop-blur-sm text-[#2D2D2D] transition-all duration-300 ease-in-out overflow-hidden ${
            searchFocused ? 'rounded-xl' : 'rounded-2xl'
          }`}
          style={{ 
            height: searchFocused ? (filteredDishes.length > 0 ? '350px' : '100px') : '56px'
          }}
        >
          {/* Input Box - Always visible */}
          <div className="flex items-center px-4 py-2">
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

          {/* Dropdown Results - Only visible when focused */}
          {searchFocused && (
            <div className="overflow-y-auto max-h-[280px]">
              {filteredDishes.length > 0 ? (
                filteredDishes.map((dish) => (
                  <div
                    key={dish.id}
                    className="flex items-center p-3 cursor-pointer"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setSearchValue(dish.name);
                      setSearchFocused(false);
                    }}
                  >
                    <div className="h-12 w-12 rounded overflow-hidden mr-4">
                      <img
                        src={dish.imageUrl}
                        alt={dish.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="font-medium">{dish.name}</div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-gray-500">
                  No results found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;