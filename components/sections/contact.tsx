"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { profileData } from "@/lib/data/profile";
import { motion } from "framer-motion";
import { HeroImage } from "@/components/hero-image";

const contactFormSchema = z.object({
  fullname: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  services: z.array(z.string()).optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const services = [
  "Audio engineering & mixing",
  "Sound design",
  "Music production",
  "Podcast production",
  "Video & multimedia",
  "Interactive media & game audio",
];

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
  });

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const emailData = {
        ...data,
        services: selectedServices,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setIsSubmitted(true);
      reset();
      setSelectedServices([]);
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again or email directly at hellobcane@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-[35px]">
      {/* Hero Image */}
      <HeroImage
        src="/images/Banners/Brendan_Banner_3.png"
        alt="Contact"
        title="Got Ideas?"
        subtitle="I've got the skills. Let's team up."
        size="small"
        objectPosition="bottom"
      />

      <div>
        <div className="w-full max-w-3xl">
          {/* Success Message */}
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-primary/10 border border-primary rounded-lg text-center"
            >
              <p className="text-primary font-medium">
                Thank you for your message! I'll get back to you soon.
              </p>
            </motion.div>
          )}

          {/* Contact Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="fullname" className="text-sm font-normal">
                Your name
              </Label>
              <Input
                id="fullname"
                placeholder=""
                {...register("fullname")}
                className={`border-0 border-b-2 rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors ${
                  errors.fullname ? "border-red-500" : "border-border"
                }`}
              />
              {errors.fullname && (
                <p className="text-sm text-red-500">{errors.fullname.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-normal">
                your@company.com
              </Label>
              <Input
                id="email"
                type="email"
                placeholder=""
                {...register("email")}
                className={`border-0 border-b-2 rounded-none px-0 focus-visible:ring-0 focus-visible:border-foreground transition-colors ${
                  errors.email ? "border-red-500" : "border-border"
                }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-normal">
                Tell us a little about the project...
              </Label>
              <Textarea
                id="message"
                placeholder=""
                rows={4}
                {...register("message")}
                className={`border-0 border-b-2 rounded-none px-0 resize-none focus-visible:ring-0 focus-visible:border-foreground transition-colors ${
                  errors.message ? "border-red-500" : "border-border"
                }`}
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            {/* Services Selection */}
            <div className="space-y-3 pt-2">
              <Label className="text-sm font-normal">How can we help?</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((service) => (
                  <label
                    key={service}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 border-2 rounded transition-all ${
                        selectedServices.includes(service)
                          ? "bg-foreground border-foreground"
                          : "border-border group-hover:border-foreground/50"
                      }`}
                      onClick={() => toggleService(service)}
                    >
                      {selectedServices.includes(service) && (
                        <svg
                          className="w-full h-full text-background p-0.5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Contact Information - Minimal Display */}
            <div className="pt-4 pb-2 text-sm text-muted-foreground space-y-1">
              <p>
                Email:{" "}
                <a
                  href={`mailto:${profileData.email}`}
                  className="hover:text-foreground transition-colors underline"
                >
                  {profileData.email}
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href={`tel:${profileData.phone}`}
                  className="hover:text-foreground transition-colors"
                >
                  {profileData.phone}
                </a>
              </p>
              <p>Location: {profileData.location}</p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={!isValid || isSubmitting}
              className="w-full py-7 text-base font-semibold rounded-md bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? "Sending..." : "Let's get started!"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
