import { Typography, Button, Input } from "@material-tailwind/react";

const LINKS = ["About Us", "Careers", "Press", "Blog", "Pricing"];
const SUB_LINKS = ["Claim", "Privacy", "Terms"];
const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="px-8 ">
      <div className="container mx-auto">
        <div className="flex w-full  py-10 justify-center gap-8 ">
          <a href="https://www.gowedding.online/" target="_blank">
            <img className="w-12" src="./image/logo-white.svg" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
