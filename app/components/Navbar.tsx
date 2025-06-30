import Image from "next/image";
import Link from "next/link";
import BillWiseLogo from "../../public/billwise-logo3.png";
import { RainbowButton } from "@/components/magicui/rainbow-button";

export function Navbar() {
  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image className="size-11 rounded-xl" src={BillWiseLogo} alt="logo" />
        <h3 className="font-semibold text-3xl">
          Bill<span className="text-blue-500">Wise</span>
        </h3>
      </Link>

      <Link href="/login">
        <RainbowButton>Get Started</RainbowButton>
      </Link>
    </div>
  );
}
