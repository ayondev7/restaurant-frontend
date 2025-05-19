'use client';
import React from 'react';
import DishCard from './DishCard';

interface Dish {
  _id: string;
  name: string;
  category: string;
  image: string;
}

interface Props {
  dishes: Dish[];
  loading: boolean;
}

const DishGridContainer: React.FC<Props> = ({ dishes, loading }) => {
  if (loading) return <p className="text-[#5C5C5C]">Loading dishes...</p>;
  if (dishes.length === 0) return <p className="text-[#5C5C5C]">No results found.</p>;

  return (
    <div className="grid  grid-cols-2 md:grid-cols-3  gap-x-4 gap-y-6 md:gap-x-6 md:gap-y-14">
      {dishes.map((dish) => (
        <DishCard key={dish._id} dish={dish} />
      ))}
    </div>
  );
};

export default DishGridContainer;
