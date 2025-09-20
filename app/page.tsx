"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Play,
  Users,
  Clock,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WakalniLanding() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const trustedClients = [
    "McDonald's",
    "KFC",
    "Pizza Hut",
    "Burger King",
    "Subway",
    "Domino's",
  ];

  const testimonials = [
    {
      name: "Ahmed Ben Ali",
      role: "Restaurant Owner",
      content:
        "Wakalni transformed our restaurant management. Our efficiency increased by 300%!",
      rating: 5,
    },
    {
      name: "Fatima Zahra",
      role: "Chain Manager",
      content:
        "The most intuitive platform for managing multiple restaurant locations.",
      rating: 5,
    },
    {
      name: "Mohamed Tounsi",
      role: "Head Chef",
      content:
        "Streamlined operations and exceptional customer support. Highly recommended!",
      rating: 5,
    },
  ];

  const offices = [
    {
      city: "Tunis",
      address: "Avenue Habib Bourguiba, Downtown",
      phone: "+216 71 123 456",
    },
    {
      city: "Sfax",
      address: "Route de Tunis, Sfax Center",
      phone: "+216 74 987 654",
    },
    {
      city: "Sousse",
      address: "Boulevard 14 Janvier, Sousse Medina",
      phone: "+216 73 456 789",
    },
  ];

  // --- Parallax helpers ---
  const parallax = scrollY < 600 ? scrollY : 600;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">Wakalni</div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#services"
                className="hover:text-primary transition-colors"
              >
                Services
              </a>
              <a
                href="#clients"
                className="hover:text-primary transition-colors"
              >
                Clients
              </a>
              <a
                href="#testimonials"
                className="hover:text-primary transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#offices"
                className="hover:text-primary transition-colors"
              >
                Offices
              </a>
              <a
                href="#contact"
                className="hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>
            <Button asChild className="animate-glow">
              <Link href={"/recipes"}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Texte Hero Parallax */}
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            y: -parallax * 0.15,
          }}
        >
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <Badge>Next-Generation Restaurant Platform</Badge>
          </motion.div>

          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 text-balance"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            THE FUTURE OF
            <span className="text-primary block">RESTAURANT</span>
            <span className="text-primary block">MANAGEMENT</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
          >
            Transform your restaurant operations with our comprehensive
            management platform. Streamline orders, optimize workflows, and grow
            your business with Wakalni.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <Button size="lg" className="text-lg px-8 py-4 animate-glow">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 bg-transparent"
            >
              Explore Features
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10"
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <div className="w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10"
          animate={{ y: [0, 20, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <div className="w-32 h-32 bg-secondary/20 rounded-full blur-xl"></div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted-foreground">Restaurant Partners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Orders Processed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.9★</div>
              <div className="text-muted-foreground">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Why Choose Wakalni?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              A comprehensive platform to revolutionize your restaurant
              operations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 glass-effect hover:scale-105 transition-transform duration-300">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Simplified Management</h3>
              <p className="text-muted-foreground">
                Intuitive interface to manage your menus, orders, and staff in
                real-time.
              </p>
            </Card>

            <Card className="p-8 glass-effect hover:scale-105 transition-transform duration-300">
              <Clock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Efficient Operations</h3>
              <p className="text-muted-foreground">
                Smart algorithms to optimize workflows and reduce operational
                costs.
              </p>
            </Card>

            <Card className="p-8 glass-effect hover:scale-105 transition-transform duration-300">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Secure & Reliable</h3>
              <p className="text-muted-foreground">
                Enterprise-grade security and data protection with 99.9% uptime
                guarantee.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Trusted Clients */}
      <section id="clients" className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-muted-foreground">
              Over 200 restaurant partners across Tunisia
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
            {trustedClients.map((client, index) => (
              <div
                key={index}
                className="text-center opacity-60 hover:opacity-100 transition-opacity"
              >
                <div className="text-2xl font-bold">{client}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">What Our Partners Say</h2>
            <p className="text-xl text-muted-foreground">
              Authentic testimonials from our restaurant partners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 glass-effect">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offices */}
      <section id="offices" className="py-20 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Offices</h2>
            <p className="text-xl text-muted-foreground">
              Present in major cities across Tunisia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className="p-6 glass-effect">
                <MapPin className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{office.city}</h3>
                <p className="text-muted-foreground mb-4">{office.address}</p>
                <div className="flex items-center text-primary">
                  <Phone className="h-4 w-4 mr-2" />
                  {office.phone}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Restaurant?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join Wakalni today and revolutionize your restaurant operations
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8 py-4 animate-glow">
                Start Free Trial
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 bg-transparent"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </div>

            <div className="text-muted-foreground">
              <p>Email: contact@wakalni.tn | Phone: +216 71 123 456</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold text-primary mb-4 md:mb-0">
              Wakalni
            </div>
            <div className="text-muted-foreground">
              © 2024 Wakalni. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
