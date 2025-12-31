"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface HeroSlide {
  id: string;
  badge: string;
  headline: string;
  highlightedText: string;
  subheadline: string;
  benefits: string[];
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
  isPublished: boolean;
  order: number;
}

// Default slides - in production these would come from a database
const defaultSlides: HeroSlide[] = [
  {
    id: "1",
    badge: "Woman & Minority-Owned | GovCloud IL6 Certified",
    headline: "Unfold the Power of",
    highlightedText: "Excellence",
    subheadline: "Where innovation meets execution. XProtege transforms your ideas into impactful, market-ready solutions with AI, Cloud, and Cybersecurity expertise.",
    benefits: ["Artificial Intelligence", "Cloud Services", "Cybersecurity"],
    primaryCta: { text: "Contact Us", href: "/contact" },
    secondaryCta: { text: "Learn More", href: "/about" },
    isPublished: true,
    order: 1,
  },
  {
    id: "2",
    badge: "State of Maryland Prime Contractor",
    headline: "Transform Your",
    highlightedText: "Digital Journey",
    subheadline: "We enable customers to accelerate cloud benefits, reduce maintenance costs, and achieve high availability with our proven agile methodology.",
    benefits: ["Digital Modernization", "Enterprise IT", "ERP Implementations"],
    primaryCta: { text: "View Our Services", href: "/company" },
    secondaryCta: { text: "Meet Our Team", href: "/about" },
    isPublished: true,
    order: 2,
  },
  {
    id: "3",
    badge: "Innovation | Excellence | Results",
    headline: "Where Ideas Transform Into",
    highlightedText: "Market Leaders",
    subheadline: "Our team combines creativity, technical expertise, and market insight to help you navigate the complex journey of bringing your technology vision to life.",
    benefits: ["Data Analytics", "SAP & Dynamics 365", "Training Services"],
    primaryCta: { text: "Schedule a Call", href: "/contact" },
    secondaryCta: { text: "Our Approach", href: "/company" },
    isPublished: true,
    order: 3,
  },
];

interface HeroCarouselProps {
  slides?: HeroSlide[];
  autoPlayInterval?: number;
}

export function HeroCarousel({ slides = defaultSlides, autoPlayInterval = 6000 }: HeroCarouselProps) {
  const publishedSlides = slides.filter(s => s.isPublished).sort((a, b) => a.order - b.order);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % publishedSlides.length);
  }, [publishedSlides.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + publishedSlides.length) % publishedSlides.length);
  }, [publishedSlides.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || publishedSlides.length <= 1) return;
    
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, goToNext, publishedSlides.length]);

  if (publishedSlides.length === 0) {
    return null;
  }

  const currentSlide = publishedSlides[currentIndex];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50 text-slate-900">
      {/* Background Pattern - AI/Cloud grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      {/* Floating gradient orbs for AI/cloud feel */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />
      <div className="absolute top-40 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
      
      <div className="relative py-20 md:py-32 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Slide Content with Fade Animation */}
          <div key={currentSlide.id} className="animate-in fade-in duration-500">
            {/* Badge */}
            <Badge variant="outline" className="mb-6 border-sky-500/50 text-sky-600 bg-sky-500/10">
              {currentSlide.badge}
            </Badge>

            {/* Headline */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {currentSlide.headline}{" "}
              <span className="text-sky-500">{currentSlide.highlightedText}</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-6 text-lg text-slate-600 md:text-xl max-w-2xl mx-auto">
              {currentSlide.subheadline}
            </p>

            {/* Key Benefits */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              {currentSlide.benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-sky-500" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href={currentSlide.primaryCta.href}>
                  {currentSlide.primaryCta.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Carousel Navigation */}
          {publishedSlides.length > 1 && (
            <div className="mt-12 flex items-center justify-center gap-4">
              {/* Prev Button */}
              <button
                onClick={() => { goToPrev(); setIsAutoPlaying(false); }}
                className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {publishedSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-all duration-300",
                      index === currentIndex
                        ? "bg-sky-500 w-8"
                        : "bg-slate-300 hover:bg-slate-400"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => { goToNext(); setIsAutoPlaying(false); }}
                className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}

          {/* Trust Indicators */}
          <div className="mt-16 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-6">Trusted by Government Agencies and Commercial Clients</p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
              <div className="flex flex-col items-center text-center">
                <span className="text-lg font-bold text-slate-800">Woman</span>
                <span className="text-xs text-slate-500">Owned</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-lg font-bold text-slate-800">Minority</span>
                <span className="text-xs text-slate-500">Owned</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-lg font-bold text-slate-800">GovCloud</span>
                <span className="text-xs text-slate-500">IL6 Certified</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-lg font-bold text-slate-800">Maryland</span>
                <span className="text-xs text-slate-500">Contractor</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-lg font-bold text-slate-800">Agile</span>
                <span className="text-xs text-slate-500">Methodology</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
