import { SiTypescript } from "react-icons/si";
import { LiaGitSquare } from "react-icons/lia";
import { FaHome, FaNpm, FaReact } from "react-icons/fa";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { BsBriefcaseFill } from "react-icons/bs";
import { AiOutlineJavaScript } from "react-icons/ai";

export const menuItems = [
  { href: "/", text: "Главная", icon: FaHome },
  { href: "/react", text: "React", icon: FaReact },
  { href: "/js", text: "JavaScript", icon: AiOutlineJavaScript },
  { href: "/npm", text: "npm", icon: FaNpm },
  { href: "/git", text: "Git", icon: LiaGitSquare },
  { href: "/ts", text: "TypeScript", icon: SiTypescript },
  { href: "/polezno", text: "Полезно", icon: MdOutlineDoubleArrow },
  { href: "/portfolio", text: "Портфолио", icon: BsBriefcaseFill },
];
