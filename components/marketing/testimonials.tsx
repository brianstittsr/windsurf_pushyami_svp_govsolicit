"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "ITMC Solutions has been instrumental in helping us optimize our IT portfolio management. Their expertise in CPIC and TBM has transformed how we manage our $2B+ technology budget.",
    author: "David Thompson",
    title: "CIO",
    company: "U.S. Department of Housing and Urban Development",
    industry: "Federal Government",
    employees: "HUD",
    initials: "DT",
  },
  {
    quote:
      "The ITMC team's deep understanding of federal IT requirements and their hands-on approach to program management made our digital transformation initiative a success. They're true partners.",
    author: "Maria Rodriguez",
    title: "Deputy CIO",
    company: "U.S. Department of Homeland Security",
    industry: "Federal Government",
    employees: "DHS",
    initials: "MR",
  },
  {
    quote:
      "Working with ITMC Solutions has been exceptional. Their mother-daughter led team brings both expertise and a personal touch that's rare in government consulting. They consistently deliver results.",
    author: "James Patterson",
    title: "IT Director",
    company: "Transportation Security Administration",
    industry: "Federal Government",
    employees: "TSA",
    initials: "JP",
  },
  {
    quote:
      "ITMC's data analytics and solution architecture capabilities have helped us make better decisions faster. Their 35+ years of experience shows in every engagement.",
    author: "Sarah Chen",
    title: "Chief Data Officer",
    company: "U.S. Department of Defense",
    industry: "Federal Government",
    employees: "DOD",
    initials: "SC",
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Trusted by federal CIO organizations for decades. Here's what our clients say about working with ITMC Solutions.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <Card className="bg-card border-2">
            <CardContent className="p-8 md:p-12">
              <Quote className="h-12 w-12 text-primary/20 mb-6" />
              
              <blockquote className="text-xl md:text-2xl font-medium mb-8 leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {testimonials[currentIndex].initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonials[currentIndex].author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].title}, {testimonials[currentIndex].company}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {testimonials[currentIndex].industry} • {testimonials[currentIndex].employees}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button variant="outline" size="icon" onClick={prev}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={next}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
