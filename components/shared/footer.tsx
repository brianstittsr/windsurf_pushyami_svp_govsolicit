import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  services: [
    { title: "Artificial Intelligence", href: "/services/artificial-intelligence" },
    { title: "Cloud Services", href: "/services/cloud-services" },
    { title: "Cybersecurity", href: "/services/cybersecurity" },
    { title: "Data Analytics", href: "/services/data-analytics" },
    { title: "Digital Modernization", href: "/services/digital-modernization" },
    { title: "Enterprise IT", href: "/services/enterprise-it" },
  ],
  company: [
    { title: "About Us", href: "/about" },
    { title: "Leadership Team", href: "/leadership" },
    { title: "Our Approach", href: "/about" },
    { title: "Case Studies", href: "/case-studies" },
    { title: "Careers", href: "/contact" },
    { title: "Contact", href: "/contact" },
  ],
  resources: [
    { title: "IT Calculator", href: "/calculator" },
    { title: "Resources", href: "/resources" },
    { title: "Case Studies", href: "/case-studies" },
    { title: "FAQ", href: "/faq" },
    { title: "Training", href: "/services/training" },
    { title: "ERP Solutions", href: "/services/erp" },
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
    <footer className="bg-gradient-to-r from-slate-100 to-slate-50 text-slate-800 border-t border-slate-200">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none">XProtege</span>
                <span className="text-xs text-slate-500">Unfold the Power of Excellence</span>
              </div>
            </Link>
            <p className="text-sm text-slate-600 max-w-xs">
              Where innovation meets execution. We transform your ideas into impactful, market-ready solutions.
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <p>Woman & Minority-Owned</p>
              <p>State of Maryland Contractor</p>
              <p>GovCloud IL6 Certified</p>
            </div>
            <div className="flex gap-4">
              <Link href="https://www.linkedin.com/company/xprotege-institute-of-management-and-technology/" target="_blank" className="text-slate-500 hover:text-sky-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sky-600">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-sm text-slate-600 hover:text-sky-500 transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sky-600">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-sm text-slate-600 hover:text-sky-500 transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sky-600">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-sm text-slate-600 hover:text-sky-500 transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sky-600">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-600">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Ellicott City, MD 21042 USA</span>
              </li>
              <li>
                <Link href="mailto:contact@xprotege.com" className="flex items-center gap-2 text-sm text-slate-600 hover:text-sky-500 transition-colors">
                  <Mail className="h-4 w-4" />
                  contact@xprotege.com
                </Link>
              </li>
              <li>
                <Link href="tel:+1-510-435-7930" className="flex items-center gap-2 text-sm text-slate-600 hover:text-sky-500 transition-colors">
                  <Phone className="h-4 w-4" />
                  +1-510-435-7930
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-200" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} XProtege. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-sm text-slate-500 hover:text-sky-500 transition-colors"
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
