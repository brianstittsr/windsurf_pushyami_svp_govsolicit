"use client";

import { Badge } from "@/components/ui/badge";
import { Shield, Award, CheckCircle, Star } from "lucide-react";

const certifications = [
  {
    title: "SBA 8(a) Certified",
    description: "Small Business Administration 8(a) Program",
    icon: Shield,
  },
  {
    title: "Veteran-Owned",
    description: "SBA Certified Veteran-Owned Small Business",
    icon: Award,
  },
  {
    title: "Woman-Owned",
    description: "SBA Certified Woman-Owned Small Business",
    icon: Star,
  },
  {
    title: "Minority-Owned",
    description: "Minority-Owned Small Business",
    icon: CheckCircle,
  },
];

const contracts = [
  { label: "GSA MAS Contract", value: "47QTCA23D004X" },
  { label: "SWAM", value: "#69476" },
  { label: "UEI", value: "XAFKL4K55F51" },
  { label: "CAGE", value: "52ES3" },
];

const naicsCodes = [
  { code: "541611", description: "Management Consulting" },
  { code: "541511", description: "Custom Computer Programming" },
  { code: "541512", description: "Computer Systems Design" },
  { code: "541519", description: "Other Computer Related Services" },
  { code: "541618", description: "Other Management Consulting" },
  { code: "611420", description: "Computer Training" },
  { code: "611430", description: "Professional Development Training" },
];

export function CertificationsBadges() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Certifications & Contract Vehicles</h2>
          <p className="text-gray-400">
            Proudly serving federal agencies with certified small business status
          </p>
        </div>

        {/* Certification Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="flex flex-col items-center text-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <cert.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm">{cert.title}</h3>
              <p className="text-xs text-gray-400 mt-1">{cert.description}</p>
            </div>
          ))}
        </div>

        {/* Contract Information */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contract Vehicles */}
          <div className="bg-white/5 rounded-lg p-6">
            <h3 className="font-semibold mb-4 text-primary">Contract Vehicles</h3>
            <div className="space-y-3">
              {contracts.map((contract) => (
                <div key={contract.label} className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">{contract.label}</span>
                  <Badge variant="outline" className="font-mono text-xs">
                    {contract.value}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* NAICS Codes */}
          <div className="bg-white/5 rounded-lg p-6">
            <h3 className="font-semibold mb-4 text-primary">NAICS Codes</h3>
            <div className="grid grid-cols-2 gap-2">
              {naicsCodes.map((naics) => (
                <div key={naics.code} className="text-sm">
                  <span className="font-mono text-primary">{naics.code}</span>
                  <span className="text-gray-400 text-xs block">{naics.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
