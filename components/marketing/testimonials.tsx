"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "XProtege has been instrumental in helping us modernize our cloud infrastructure. Their expertise in GovCloud and IL6 environments transformed how we deliver secure applications.",
    author: "Michael Chen",
    title: "IT Director",
    company: "State of Maryland",
    industry: "State Government",
    employees: "MD",
    initials: "MC",
  },
  {
    quote:
      "The XProtege team's deep understanding of AI and machine learning helped us automate critical processes. Their agile methodology delivered results faster than expected.",
    author: "Jennifer Williams",
    title: "Deputy CIO",
    company: "Federal Agency",
    industry: "Federal Government",
    employees: "FED",
    initials: "JW",
  },
  {
    quote:
      "Working with XProtege has been exceptional. Their cybersecurity expertise and DISA STIG compliance knowledge gave us confidence in our security posture. They consistently deliver results.",
    author: "Robert Martinez",
    title: "CISO",
    company: "Department of Defense Contractor",
    industry: "Defense",
    employees: "DOD",
    initials: "RM",
  },
  {
    quote:
      "XProtege's ERP implementation team helped us deploy Microsoft Dynamics 365 seamlessly. Their technical expertise and customer-focused approach made the transition smooth.",
    author: "Amanda Foster",
    title: "Operations Director",
    company: "Commercial Enterprise",
    industry: "Commercial",
    employees: "ENT",
    initials: "AF",
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
            Trusted by government agencies and commercial clients. Here's what our clients say about working with XProtege.
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
