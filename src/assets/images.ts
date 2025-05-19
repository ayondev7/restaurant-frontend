import plate1 from "./images/img1.png";
import plate2 from "./images/img2.png";
import plate3 from "./images/img3.png";
import plate4 from "./images/img4.png";

import { StaticImageData } from "next/image";

export interface Plate {
  id: number;
  src: string | StaticImageData; 
  alt: string;
}

export const plates: Plate[] = [
  { id: 1, src: plate1, alt: "Plate 1" },
  { id: 2, src: plate2, alt: "Plate 2" },
  { id: 3, src: plate3, alt: "Plate 3" },
  { id: 4, src: plate4, alt: "Plate 4" },
];
