import React from "react";
import Image from "next/image";
import member from "../assets/images/teammember.jpg";

const TeamMembercard = ({ name, role}) => {
  return (
    <div className="bg-[#fefefe] overflow-hidden w-[160px] md:w-[240px]">
      <Image
        src={member}
        alt={name}
        width={260}
        height={250}
        className="w-full h-[160px] md:h-[220px] object-cover"
      />
      <div className="my-1 md:my-3 flex flex-col items-center">
        <h1 className="text-[#4F4F4F] text-sm md:text-base mdtext-lg font-semibold">{name}</h1>
        <h2 className="text-[#828282] text-xs md:text-base">{role}</h2>
      </div>
    </div>
  );
};

export default TeamMembercard;