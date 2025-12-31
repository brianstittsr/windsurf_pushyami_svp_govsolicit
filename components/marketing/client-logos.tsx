"use client";

import Image from "next/image";

const clients = [
  {
    name: "HUD",
    logo: "https://images.squarespace-cdn.com/content/v1/66c342dff63672088c5ca666/1724542349357-WLJ16G081YWSSQIT0T4K/HUDLogo.png",
    alt: "U.S. Department of Housing and Urban Development",
  },
  {
    name: "TSA",
    logo: "https://images.squarespace-cdn.com/content/v1/66c342dff63672088c5ca666/1724542372676-IHSTZPTF2XEF2EQ20BE7/tsa+logo.png",
    alt: "Transportation Security Administration",
  },
  {
    name: "DHS",
    logo: "https://images.squarespace-cdn.com/content/v1/66c342dff63672088c5ca666/1724542400754-3BNN1846Q05KOH8VLHNC/Seal_of_the_U.S._Department_of_Homeland_Security.svg.png",
    alt: "U.S. Department of Homeland Security",
  },
];

const partners = [
  { name: "Lockheed Martin" },
  { name: "Disney" },
  { name: "Raytheon" },
  { name: "Newport News Shipbuilding" },
  { name: "LMI" },
];

export function ClientLogos() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        <div className="text-center mb-8">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Trusted by Federal Agencies for Decades
          </p>
        </div>
        
        {/* Federal Agency Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-8">
          {clients.map((client) => (
            <div
              key={client.name}
              className="relative h-16 w-24 md:h-20 md:w-32 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={client.logo}
                alt={client.alt}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* Partner Names */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Also trusted by:{" "}
            {partners.map((partner, index) => (
              <span key={partner.name}>
                <span className="font-medium">{partner.name}</span>
                {index < partners.length - 1 && " • "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
