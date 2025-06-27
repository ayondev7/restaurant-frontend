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
  const masterTimeline = useRef<gsap.core.Timeline | null>(null);
  const ferrisWheelRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [expanded, setExpanded] = useState<boolean>(false);

  const fullText =
    "Breakfast, often referred to as the 'most important meal of the day', provides essential nutrients to kick start our day. It includes a variety of foods, like fruits, cereals, dairy products, and proteins, that contribute to a balanced diet.";

  const shortText =
    "Breakfast, often referred to as the 'most important meal of the day', provides essential nutrients to kick start our day.";

  // Calculate positions for ferris wheel arrangement (NW, NE, SW, SE)
  const getImagePosition = (index: number) => {
    const radius = 350; // Increased from 150 for larger images
    const positions = [
      { x: -radius, y: -radius }, // NW (index 0)
      { x: radius, y: -radius },  // NE (index 1)
      { x: -radius, y: radius },  // SW (index 2)
      { x: radius, y: radius },   // SE (index 3)
    ];
    
    return positions[index] || { x: 0, y: 0 };
  };

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

    const targetRotation = index * 90;
    const currentRotation = gsap.getProperty(ferrisWheelRef.current, "rotation") as number;
    const newRotation = -targetRotation;

    const bgRotationAngle = index > activeIndex ? -90 : 90;
    const currentBgRotation = gsap.getProperty(circleRef.current, "rotation") as number;
    const newBgRotation = currentBgRotation + bgRotationAngle;

    masterTimeline.current?.kill();
    masterTimeline.current = gsap.timeline({
      defaults: { duration: 2, ease: "sine.inOut" },
    });

    masterTimeline.current.to(circleRef.current, { rotate: newBgRotation }, 0).to(
      [sectionRef.current, circleRef.current, circleRef2.current],
      {
        backgroundColor: (i) =>
          i === 0 ? colorSets[index].bg : colorSets[index].circle,
        duration: 1,
        ease: "sine.inOut",
      },
      0
    );

    masterTimeline.current.to(ferrisWheelRef.current, {
      rotation: newRotation,
      duration: 1.5,
      ease: "power2.inOut",
    }, 0);

    setActiveIndex(index);
  };

  useEffect(() => {
    imageRefs.current.forEach((imageContainer, index) => {
      if (imageContainer) {
        const position = getImagePosition(index);
        gsap.set(imageContainer, {
          x: position.x,
          y: position.y,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !circleRef.current || !circleRef2.current)
      return;

    gsap.set(sectionRef.current, { backgroundColor: colorSets[0].bg });
    gsap.set([circleRef.current, circleRef2.current], {
      backgroundColor: colorSets[0].circle,
    });

    if (ferrisWheelRef.current) {
      gsap.set(ferrisWheelRef.current, { rotation: 0 });
    }
  }, []);

  return (
    <>
      <Navbar />
      <section
        ref={sectionRef}
        className="min-h-screen relative px-12 md:px-16 pt-24 md:pt-48 pb-12 overflow-hidden rounded-b-3xl"
      >
        <div
          ref={circleRef}
          className="w-[400px] md:w-[1000px] h-[400px] md:h-[1000px] rounded-full absolute top-[-80px] left-[-120px] md:top-[-340px] md:left-[-300px] z-0"
        />
        <div
          ref={circleRef2}
          className="w-[400px] md:w-[900px] h-[400px] md:h-[900px] rounded-full absolute bottom-[-150px] right-[-150px] md:bottom-[-480px] md:right-[-470px] z-0 overflow-hidden"
        />

        <div
          className="absolute md:-bottom-115 bottom-36 z-10 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 -right-135"
          style={{
            width: '1000px', 
            height: '800px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            ref={ferrisWheelRef}
            className="relative"
            style={{
              width: '5400px',
              height: '5400px',
              transformOrigin: 'center center',
            }}
          >
            {plates.map((plate, index) => (
              <div
                key={plate.id}
                ref={(el) => { imageRefs.current[index] = el; }}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  transformOrigin: 'center center',
                }}
              >
                <Image
                  className="w-[400px] md:w-[700px] object-cover" 
                  src={plate.src}
                  alt="plate"
                  width={800} 
                  height={800}
                  priority
                  style={{
                    transformOrigin: 'center center',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto bottom-20 flex font-poppins items-center justify-between flex-wrap md:flex-nowrap relative z-10 h-full">
          <div className="md:w-1/2 w-full">
            <h1 className="text-[45px] md:text-[96px] text-white md:mb-0">
              BREAKFAST
            </h1>
            <p className="text-base md:text-xl text-gray-100 max-w-xl md:max-w-[900px] font-normal md:font-semibold">
              <span className="block md:hidden">
                {expanded ? fullText : shortText}
                <button
                  className="underline"
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded ? "See less" : "See more"}
                </button>
              </span>

              <span className="hidden md:block">{fullText}</span>
            </p>

            <div className="flex mt-90 md:mt-6 gap-x-6">
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
                    className="flex flex-col items-center justify-center transition-all duration-300 cursor-pointer"
                    onClick={() => isClickable && handlePlateClick(index)}
                  >
                    <Image
                      src={plate.src}
                      alt={plate.alt}
                      width={250} 
                      height={250}
                      className="md:w-[200px] md:h-[180px] w-[90px] h-[100px] transition-transform duration-300"
                    />
                    {activeIndex === index && (
                      <div className="h-1 w-12 md:w-28 absolute bottom-[-20] bg-white rounded-full transition-all duration-300" />
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