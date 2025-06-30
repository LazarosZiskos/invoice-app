import { RainbowButton } from "@/components/magicui/rainbow-button";
import Link from "next/link";
import heroImage from "../../public/hero-image.png";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-12 lg:py-20">
      <div className="text-center">
        <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">
          Introducing BillWise
        </span>
        <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter">
          Your Finances, Streamlined
          <span className="block -mt-2 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text">
            Create. Send. Get Paid.
          </span>
        </h1>

        <p className="max-w-xl mx-auto mt-4 lg:text-lg text-muted-foreground">
          Invoicing made easy with BillWise! Fast, reliable, and stress-free.
        </p>

        <div className="mt-7 mb-12">
          <Link href="/login">
            <RainbowButton>Get Unlimited Acess</RainbowButton>
          </Link>
        </div>

        <div className="relative items-center w-full py-12 mx-auto mt-12">
          <svg
            className="absolute inset-0 -mt-24 blur-3xl opacity-60"
            width="100%"
            height="100%"
            viewBox="0 0 600 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ zIndex: -1 }}
          >
            <rect width="800" height="200" fill="url(#gradient-fill)" />
            <defs>
              <linearGradient
                id="gradient-fill"
                x1="0"
                y1="0"
                x2="800"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#2b7fff" />

                <stop offset="0.2" stop-color="#00a2e4" />

                <stop offset="0.4" stop-color="#00b6bb" />

                <stop offset="0.6" stop-color="#00bf9d" />

                <stop offset="0.8" stop-color="#00c680" />

                <stop offset="1" stop-color="#00c951" />
              </linearGradient>
            </defs>
          </svg>

          <Image
            src={heroImage}
            alt="hero-image"
            className="relative object-cover w-full border rounded-lg lg:rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
