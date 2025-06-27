"use client";
import {
  FaPinterestP,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import icon6 from "../assets/images/icon6.png";
import icon7 from "../assets/images/icon7.png";
import icon8 from "../assets/images/icon8.png";
import icon9 from "../assets/images/icon9.png";
import footer1 from "../assets/images/footer1.png";
import footer2 from "../assets/images/footer2.png";
import footer3 from "../assets/images/footer3.png";
import footer4 from "../assets/images/footer4.png";
import footer5 from "../assets/images/footer5.png";
import footer6 from "../assets/images/footer6.png";
import { Clock3, MailOpen, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const footerImages = [footer1, footer2, footer3, footer4, footer5, footer6];

  return (
    <footer className="bg-[#880808] text-white font-poppins">
      <div className="w-full px-2 md:px-48 py-12 flex flex-col gap-y-6 md:gap-y-0 md:flex-row md:justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">RESTAURANT</h2>
          <p className="mb-2 text-lg font-normal">Subscribe our newsletter and</p>
          <p className="mb-4 text-lg font-normal">get discount 25%off</p>
          <div className="flex mb-4">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="px-4 py-2 bg-white text-black rounded-l-md outline-none"
            />
            <button className="px-3 py-2 bg-[#A52A2A] rounded-r-md flex items-center justify-center">
              <Image src={icon6} alt="Send" width={20} height={20} />
            </button>
          </div>
          <div className="flex space-x-4 text-[24px]">
            <FaPinterestP className="text-[#E60023]" />
            <FaTwitter className="text-[#1DA1F2]" />
            <FaFacebook className="text-[#1877F2]" />
            <div style={{ display: "inline-block" }}>
              <svg width="0" height="0">
                <linearGradient
                  id="instagram-gradient"
                  x1="100%"
                  y1="100%"
                  x2="0%"
                  y2="0%"
                >
                  <stop stopColor="#f09433" offset="0%" />
                  <stop stopColor="#e6683c" offset="25%" />
                  <stop stopColor="#dc2743" offset="50%" />
                  <stop stopColor="#cc2366" offset="75%" />
                  <stop stopColor="#bc1888" offset="100%" />
                </linearGradient>
              </svg>
              <FaInstagram style={{ fill: "url(#instagram-gradient)" }} />
            </div>
            <FaYoutube className="text-[#FF0000]" />
          </div>
        </div>

        <div className="mb-4 md:mb-0">
          <h2 className="mb-4 text-xl font-bold">Contact us</h2>
          <div className="flex text-lg flex-col gap-y-2">
            <p className="flex items-center gap-x-2 text-sm md:text-lg mb-2">
              <MapPin className="size-5" />
              <span> 3517 W. Gray St. Utica, Pennsylvania 57867</span>
            </p>
            <p className="flex text-sm gap-x-2 md:text-base items-center mb-2">
              <Phone className="size-5" />
              <span>(480) 555-0103</span>
            </p>
            <p className="flex text-sm gap-x-2 md:text-base items-center mb-2">
              <MailOpen className="size-5" />
              <span>M.Alyaqout@4house.Co</span>
            </p>
            <p className="flex gap-x-2 text-sm md:text-base items-center">
              <Clock3 className="size-5" />
              <span> Sun - Sat / 10:00 AM - 8:00 PM</span>
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Links</h2>
          <ul className="space-y-2 grid grid-cols-4 md:grid-rows-4 md:grid-cols-1 text-sm md:text-lg">
            <li>
              <a href="#" className="hover:underline text-sm md:text-base">
                About us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-sm md:text-base">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-sm md:text-base">
                Our Menu
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-sm md:text-base">
                Team
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-sm md:text-base">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 hidden md:block">
            Instagram Gallery
          </h2>
          <div className="md:grid grid-cols-3 gap-1 hidden">
            {footerImages.map((img, idx) => (
              <div
                key={idx}
                className="w-[80px] h-[80px] relative overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`Instagram ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#A52A2A] py-4 px-2 md:px-48 text-sm text-white flex flex-col md:flex-row justify-between items-center">
        <p className="mb-2 md:mb-0">Copyright © 2025. All rights reserved</p>
        <div className="space-x-4 hidden md:flex">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Term of Use
          </a>
          <a href="#" className="hover:underline">
            Partner
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
