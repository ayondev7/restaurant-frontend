'use client';
import Image from 'next/image';
import icon1 from '../assets/images/icon1.png';
import icon2 from '../assets/images/icon2.png';
import icon3 from '../assets/images/icon3.png';
import icon4 from '../assets/images/icon4.png';
import icon5 from '../assets/images/icon5.png';
import icon6 from '../assets/images/icon6.png';
import icon7 from '../assets/images/icon7.png';
import icon8 from '../assets/images/icon8.png';
import icon9 from '../assets/images/icon9.png';
import icon10 from '../assets/images/icon10.png';
import footer1 from '../assets/images/footer1.png';
import footer2 from '../assets/images/footer2.png';
import footer3 from '../assets/images/footer3.png';
import footer4 from '../assets/images/footer4.png';
import footer5 from '../assets/images/footer5.png';
import footer6 from '../assets/images/footer6.png';

const Footer = () => {
  const footerImages = [footer1, footer2, footer3, footer4, footer5, footer6];

  return (
    <footer className="bg-[#880808] text-white">
      <div className="w-full px-48 py-12 flex justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-4">RESTAURANT</h2>
          <p className="mb-2">Subscribe our newsletter and</p>
          <p className="mb-4">get discount 25%off</p>
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
          <div className="flex space-x-4">
            <Image src={icon5} alt="Pinterest" className="size-[24px]" />
            <Image src={icon4} alt="Twitter" className="size-[32px]" />
            <Image src={icon3} alt="Facebook" className="size-[24px]" />
            <Image src={icon2} alt="Instagram" className="size-[24px]" />
            <Image src={icon1} alt="Youtube"  className="size-[24px]" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Contact us</h2>
          <p className="flex items-center mb-2">
            <Image src={icon10} alt="Map" width={16} height={16} className="mr-2" />
            3517 W. Gray St. Utica, Pennsylvania 57867
          </p>
          <p className="flex items-center mb-2">
            <Image src={icon9} alt="Phone" width={16} height={16} className="mr-2" />
            (480) 555-0103
          </p>
          <p className="flex items-center mb-2">
            <Image src={icon8} alt="Email" width={16} height={16} className="mr-2" />
            M.Alyaqout@4house.Co
          </p>
          <p className="flex items-center">
            <Image src={icon7} alt="Clock" width={16} height={16} className="mr-2" />
            Sun - Sat / 10:00 AM - 8:00 PM
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">About us</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">Our Menu</a></li>
            <li><a href="#" className="hover:underline">Team</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Instagram Gallery</h2>
          <div className="grid grid-cols-3 gap-1">
            {footerImages.map((img, idx) => (
              <div key={idx} className="w-[80px] h-[80px] relative overflow-hidden">
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

      <div className="bg-[#A52A2A] py-4 px-48 text-sm text-white flex flex-col md:flex-row justify-between items-center">
        <p className="mb-2 md:mb-0">Copyright © 2025. All rights reserved</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Term of Use</a>
          <a href="#" className="hover:underline">Partner</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
