"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import { plates } from "../assets/images";
import Navbar from "./Navbar";

const colorSets = [
  { bg: "#880808", circle: "#A52A2A" },
  { bg: "#0A4669", circle: "#0A3659" },
  { bg: "#953553", circle: "#A95C68" },
  { bg: "#006666", circle: "#003333" },
];

const HeroSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const circleRef = useRef<HTMLDivElement>(null);
  const circleRef2 = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const masterTimeline = useRef<gsap.core.Timeline>();

  const handlePlateClick = (index: number) => {
    if (index === activeIndex) return;

    const validTransitions = [
      [0, 1],
      [1, 0],
      [1, 2],
      [2, 1],
      [2, 3],
      [3, 2],
    ];

    if (
      !validTransitions.some(
        ([from, to]) => from === activeIndex && to === index
      )
    )
      return;

    const rotationAngle = index > activeIndex ? -90 : 90;
    const currentRotation = gsap.getProperty(
      circleRef.current,
      "rotation"
    ) as number;
    const newRotation = currentRotation + rotationAngle;

    masterTimeline.current?.kill();
    masterTimeline.current = gsap.timeline({
      defaults: { duration: 2, ease: "sine.inOut" },
    });

    masterTimeline.current.to(circleRef.current, { rotate: newRotation }, 0).to(
      [sectionRef.current, circleRef.current, circleRef2.current],
      {
        backgroundColor: (i) =>
          i === 0 ? colorSets[index].bg : colorSets[index].circle,
        duration: 1,
        ease: "sine.inOut",
      },
      0
    );

    setActiveIndex(index);
  };

  useEffect(() => {
    if (!sectionRef.current || !circleRef.current || !circleRef2.current)
      return;

    gsap.set(sectionRef.current, { backgroundColor: colorSets[0].bg });
    gsap.set([circleRef.current, circleRef2.current], {
      backgroundColor: colorSets[0].circle,
    });
  }, []);

  return (
    <>
      <Navbar />
      <section
        ref={sectionRef}
        className="min-h-screen relative px-16 pt-48 pb-12 overflow-hidden"
      >
        <div
          ref={circleRef}
          className="w-[1000px] h-[1000px] rounded-full absolute top-[-340px] left-[-300px] z-0"
        />
        <div
          ref={circleRef2}
          className="w-[900px] h-[900px] rounded-full absolute bottom-[-400px] right-[-400px] z-0 overflow-hidden"
        />

        <div className="container mx-auto flex items-center justify-between flex-wrap md:flex-nowrap relative z-10 h-full">
          <div className="md:w-1/2 w-full">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              BREAKFAST
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-xl">
              Breakfast, often referred to as the ‘most important meal of the
              day’, provides essential nutrients to kick start our day. It
              includes a variety of foods, like fruits, cereals, dairy products,
              and proteins, that contribute to a balanced diet.
            </p>

            <div className="flex mt-2 gap-x-4">
              {plates.map((plate, index) => {
                const isClickable = [
                  [0, 1],
                  [1, 0],
                  [1, 2],
                  [2, 1],
                  [2, 3],
                  [3, 2],
                ].some(([from, to]) => from === activeIndex && to === index);

                return (
                  <div
                    key={plate.id}
                    className="flex flex-col items-center justify-center transition-all duration-300"
                    onClick={() => isClickable && handlePlateClick(index)}
                  >
                    <Image
                      src={plate.src}
                      alt={plate.alt}
                      width={200}
                      height={200}
                      className="w-[200px] h-[200px] transition-transform duration-300"
                    />
                    {activeIndex === index && (
                      <div className="h-1 w-10 bg-white rounded-full mt-2 transition-all duration-300" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
