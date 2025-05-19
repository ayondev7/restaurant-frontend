import React from "react";
import Image from "next/image";
import member from "../assets/images/teammember.jpg";

const TeamMembercard = ({ name, role}) => {
  return (
    <div className="bg-[#fefefe] overflow-hidden w-[240px]">
      <Image
        src={member}
        alt={name}
        width={260}
        height={250}
        className="w-full h-[220px] object-cover"
      />
      <div className="my-3 flex flex-col items-center">
        <h1 className="text-[#4F4F4F] text-lg font-semibold">{name}</h1>
        <h2 className="text-[#828282] text-base">{role}</h2>
      </div>
    </div>
  );
};

export default TeamMembercard;