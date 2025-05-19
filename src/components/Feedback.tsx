"use client";
import React, { useState } from "react";
import Image from "next/image";
import customer1 from "../assets/images/customer1.png";
import customer2 from "../assets/images/customer2.png";
import customer3 from "../assets/images/customer3.png";
import trapezium from "../assets/images/trapezium.png";
import feedback from "../assets/images/feedback.png";

interface FeedbackData {
  name: string;
  designation: string;
  review: string;
  image: any;
}

const feedbacks: FeedbackData[] = [
  {
    name: "Tayyab Sohail",
    designation: "UI/UX Designer",
    review:
      "Fresh, flavorful, and just the right amount of heat. The tuna was buttery, the rice well-seasoned, and the chili mayo added a great kick. A must-try for sushi lovers.",
    image: customer1,
  },
  {
    name: "Nafiz Salim",
    designation: "Graphic Designer",
    review:
      "Simple but delicious. The crust was perfectly crisp with a smoky edge, the tomatoes tasted fresh, and the mozzarella was melty and rich. Classic done right.",
    image: customer2,
  },
  {
    name: "Tayyab Iqbal",
    designation: "Developer",
    review:
      "Juicy and satisfying. The patties were cooked to perfection, cheese melted like a dream, and the toasted brioche bun held it all together. Great value for a casual bite.",
    image: customer3,
  },
];

const Feedback = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentFeedback = feedbacks[activeIndex];

  return (
    <div className="w-full flex justify-between mt-32 relative">
      <section className="w-1/2 pr-6 z-10">
        <h1 className="font-bold text-4xl">Customer <span className="text-[#AD1519]">Feedback</span></h1>
        <div>
          <p className="text-[#3D3D3D] text-md mt-4 mb-14">
            {currentFeedback.review}
          </p>
          <div className="flex justify-between">
            <div className="flex gap-x-3">
              <Image
                src={currentFeedback.image}
                alt={currentFeedback.name}
                className="size-14 rounded-full border border-black"
              />
              <div className="flex flex-col justify-center">
                <h2 className="font-bold text-md text-[#A52A2A]">
                  {currentFeedback.name}
                </h2>
                <p className="text-[#3D3D3D] text-sm font-medium">
                  {currentFeedback.designation}
                </p>
              </div>
            </div>
            <div className="flex gap-x-2 mt-6">
              {feedbacks.map((_, index) => (
                <span
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-full size-3 cursor-pointer ${
                    index === activeIndex
                      ? "bg-[#A52A2A]"
                      : "border border-[#A52A2A]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-1/2 flex justify-end relative">
        <Image
          src={trapezium}
          alt="vector"
          className="h-[280px] w-[380px]"
        />
        <Image
          src={feedback}
          alt="vector"
          className="h-[400px] w-[400px] absolute bottom-0 right-0"
        />
      </section>
    </div>
  );
};

export default Feedback;
