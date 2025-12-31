import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  services: [
    { title: "Strategic Planning", href: "/company" },
    { title: "CPIC/Portfolio Management", href: "/company" },
    { title: "Technology Business Management", href: "/company" },
    { title: "Data Analytics", href: "/company" },
    { title: "Solution Architecture", href: "/company" },
    { title: "Program Management", href: "/company" },
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Leadership Team", href: "/company" },
    { title: "Our Approach", href: "/about" },
    { title: "Certifications", href: "/about" },
    { title: "Careers", href: "/careers" },
    { title: "Contact", href: "/contact" },
  ],
  resources: [
    { title: "Blog", href: "/resources/blog" },
    { title: "Guides & Playbooks", href: "/resources/guides" },
    { title: "Webinars", href: "/resources/webinars" },
    { title: "Events", href: "/events" },
    { title: "FAQ", href: "/faq" },
    { title: "News", href: "/news" },
  ],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
    { title: "Cookie Policy", href: "/cookies" },
    { title: "Accessibility", href: "/accessibility" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-950 to-purple-900 text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none">ITMC Solutions</span>
                <span className="text-xs text-gray-400">IT & Management Consulting</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Trusted by Federal CIO organizations for decades. We're your partners from strategy to execution.
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>SBA 8(a) Certified</p>
              <p>Veteran, Woman & Minority-Owned</p>
              <p>GSA MAS: 47QTCA23D004X</p>
              <p>SWAM: #69476</p>
            </div>
            <div className="flex gap-4">
              <Link href="https://www.linkedin.com/company/itmc-solutions" target="_blank" className="text-gray-400 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-accent">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-accent">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-accent">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-accent">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>100 7th St., Suite 104<br/>Portsmouth, VA 23704</span>
              </li>
              <li>
                <Link href="mailto:contact@itmcsolutions.com" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                  <Mail className="h-4 w-4" />
                  contact@itmcsolutions.com
                </Link>
              </li>
              <li>
                <Link href="tel:+1-757-284-3986" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                  <Phone className="h-4 w-4" />
                  (757) 284-3986
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © 2010-{new Date().getFullYear()} ITMC Solutions, LLC. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
