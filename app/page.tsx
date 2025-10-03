"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Sparkles,
  Car,
  Shield,
  Droplets,
  Star,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import Image from "next/image"

export default function CrystalClearDetailing() {
  const [activeSection, setActiveSection] = useState("home")
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])

  const services = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Premium Detailing",
      description: "Complete interior and exterior detailing for a showroom finish",
    },
    {
      icon: <Car className="w-8 h-8" />,
      title: "Mobile Service",
      description: "We come to you - convenient detailing at your location",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Paint Protection",
      description: "Ceramic coating and paint protection film services",
    },
    {
      icon: <Droplets className="w-8 h-8" />,
      title: "Deep Cleaning",
      description: "Professional deep cleaning for every surface of your vehicle",
    },
  ]

  const testimonials = [
    {
      name: "John Smith",
      text: "Crystal Clear did an amazing job on my car! It looks brand new. Highly recommend their mobile service.",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      text: "Professional, thorough, and convenient. Tallyn and his team exceeded my expectations!",
      rating: 5,
    },
    {
      name: "Mike Davis",
      text: "Best detailing service in the area. The attention to detail is incredible. Worth every penny!",
      rating: 5,
    },
  ]

  const galleryImages = [
    "/luxury-car-exterior-detailing-shine.jpg",
    "/car-interior-leather-seats-cleaning.jpg",
    "/car-paint-correction.png",
    "/car-wheel-rim-detailing.jpg",
    "/car-ceramic-coating.png",
    "/car-dashboard-interior-detailing.jpg",
  ]

  const pricingPlans = [
    {
      name: "Basic Detail",
      price: "$99",
      features: ["Exterior wash & wax", "Interior vacuum", "Window cleaning", "Tire shine"],
    },
    {
      name: "Premium Detail",
      price: "$199",
      features: [
        "Everything in Basic",
        "Clay bar treatment",
        "Interior deep clean",
        "Engine bay cleaning",
        "Paint sealant",
      ],
      popular: true,
    },
    {
      name: "Ultimate Detail",
      price: "$349",
      features: [
        "Everything in Premium",
        "Paint correction",
        "Ceramic coating",
        "Leather conditioning",
        "Headlight restoration",
      ],
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "about", "testimonials", "gallery", "pricing", "contact"]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      message: "",
    }

    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required"
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone must be 10 digits"
    }
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error !== "")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      alert("Form submitted successfully!")
      setFormData({ name: "", email: "", phone: "", message: "" })
    }
  }

  return (
    <div className="min-h-screen bg-[#1a0723] text-white">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-[#1a0723]/95 backdrop-blur-sm border-b border-[#421272]"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.05 }}>
              <Image src="/logo.png" alt="Crystal Clear Logo" width={50} height={50} className="rounded-lg" />
              <span className="text-xl font-bold bg-gradient-to-r from-[#9630b7] to-[#cd507e] bg-clip-text text-transparent">
                Crystal Clear
              </span>
            </motion.div>

            <div className="hidden md:flex gap-6">
              {["home", "services", "about", "testimonials", "gallery", "pricing", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors hover:text-[#ac73e2] ${
                    activeSection === section ? "text-[#ac73e2]" : "text-white"
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#421272] via-[#1a0723] to-[#634277]" />

        {/* Animated stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#ac73e2] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <motion.div className="container mx-auto px-4 text-center relative z-10" style={{ opacity, scale }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Image
              src="/logo.png"
              alt="Crystal Clear Auto Detailing"
              width={400}
              height={400}
              className="mx-auto mb-8 rounded-2xl shadow-2xl"
            />
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#9630b7] via-[#b13f9e] to-[#cd507e] bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Pursuing More Leads
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-[#e6c0dc]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Premium Mobile Auto Detailing Services
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("services")}
              className="bg-gradient-to-r from-[#9630b7] to-[#b13f9e] hover:from-[#8021d7] hover:to-[#cd507e] text-white border-0"
            >
              Our Services
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="border-[#ac73e2] text-[#ac73e2] hover:bg-[#ac73e2] hover:text-white"
            >
              Get a Quote
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-6 h-10 border-2 border-[#ac73e2] rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-[#ac73e2] rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-[#1a0723] to-[#421272]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#9630b7] to-[#cd507e] bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-[#e6c0dc] text-lg">Professional mobile detailing at your convenience</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-[#421272]/50 border-[#634277] hover:border-[#ac73e2] transition-all duration-300 h-full group">
                  <CardHeader>
                    <motion.div
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-[#9630b7] to-[#cd507e] flex items-center justify-center mb-4 text-white"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {service.icon}
                    </motion.div>
                    <CardTitle className="text-white group-hover:text-[#ac73e2] transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#e6c0dc]">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-[#421272] to-[#1a0723]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#9630b7] to-[#cd507e] bg-clip-text text-transparent">
              About Crystal Clear
            </h2>
            <p className="text-[#e6c0dc] text-lg mb-6 leading-relaxed">
              Founded by Tallyn Adams, Crystal Clear Auto Detailing is dedicated to providing premium mobile detailing
              services that bring showroom quality to your doorstep. With years of experience and a passion for
              perfection, we treat every vehicle as if it were our own.
            </p>
            <p className="text-[#e6c0dc] text-lg leading-relaxed">
              Our commitment to excellence and customer satisfaction has made us the trusted choice for auto detailing
              in the area. We use only the finest products and techniques to ensure your vehicle looks its absolute
              best.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-[#1a0723] to-[#421272]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#9630b7] to-[#cd507e] bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-[#421272]/50 border-[#634277]">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-[#cd507e] text-[#cd507e]" />
                      ))}
                    </div>
                    <p className="text-[#e6c0dc] text-lg mb-6 text-center italic">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    <p className="text-[#ac73e2] font-semibold text-center">
                      - {testimonials[currentTestimonial].name}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? "bg-[#ac73e2] w-8" : "bg-[#634277]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-[#421272] hover:bg-[#634277] p-2 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-[#421272] hover:bg-[#634277] p-2 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gradient-to-b from-[#421272] to-[#1a0723]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#9630b7] to-[#cd507e] bg-clip-text text-transparent">
              Our Work
            </h2>
            <p className="text-[#e6c0dc] text-lg">See the Crystal Clear difference</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0723]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-4 right-4 text-white hover:text-[#ac73e2] transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X className="w-8 h-8" />
              </button>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-5xl w-full aspect-video"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={galleryImages[selectedImage] || "/placeholder.svg"}
                  alt={`Gallery image ${selectedImage + 1}`}
                  fill
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-[#1a0723] to-[#421272]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#9630b7] to-[#cd507e] bg-clip-text text-transparent">
              Pricing Plans
            </h2>
            <p className="text-[#e6c0dc] text-lg">Choose the perfect package for your vehicle</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card
                  className={`bg-[#421272]/50 border-[#634277] h-full relative ${
                    plan.popular ? "border-[#ac73e2] shadow-lg shadow-[#ac73e2]/20" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#9630b7] to-[#cd507e] text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#9630b7] to-[#cd507e] bg-clip-text text-transparent">
                      {plan.price}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#e6c0dc]">
                          <Star className="w-5 h-5 fill-[#cd507e] text-[#cd507e] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full mt-6 bg-gradient-to-r from-[#9630b7] to-[#b13f9e] hover:from-[#8021d7] hover:to-[#cd507e] text-white border-0"
                      onClick={() => scrollToSection("contact")}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-[#421272] to-[#1a0723]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#9630b7] to-[#cd507e] bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-[#e6c0dc] text-lg">Ready to make your car shine? Contact us today!</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-[#421272]/50 border-[#634277]">
                <CardHeader>
                  <CardTitle className="text-white">Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-[#1a0723] border-[#634277] text-white placeholder:text-[#634277]"
                      />
                      {errors.name && <p className="text-[#cd507e] text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-[#1a0723] border-[#634277] text-white placeholder:text-[#634277]"
                      />
                      {errors.email && <p className="text-[#cd507e] text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <Input
                        type="tel"
                        placeholder="Your Phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-[#1a0723] border-[#634277] text-white placeholder:text-[#634277]"
                      />
                      {errors.phone && <p className="text-[#cd507e] text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="bg-[#1a0723] border-[#634277] text-white placeholder:text-[#634277] min-h-32"
                      />
                      {errors.message && <p className="text-[#cd507e] text-sm mt-1">{errors.message}</p>}
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#9630b7] to-[#b13f9e] hover:from-[#8021d7] hover:to-[#cd507e] text-white border-0"
                    >
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="bg-[#421272]/50 border-[#634277]">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9630b7] to-[#cd507e] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Phone</h3>
                      <a href="tel:7206412574" className="text-[#ac73e2] hover:text-[#cd507e] transition-colors">
                        (720) 641-2574
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#421272]/50 border-[#634277]">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9630b7] to-[#cd507e] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Email</h3>
                      <a
                        href="mailto:Tallyn.adams@gmail.com"
                        className="text-[#ac73e2] hover:text-[#cd507e] transition-colors break-all"
                      >
                        Tallyn.adams@gmail.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#421272]/50 border-[#634277]">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9630b7] to-[#cd507e] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Service Areas</h3>
                      <p className="text-[#e6c0dc]">Mobile service available throughout the Denver metro area</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#9630b7] to-[#b13f9e] hover:from-[#8021d7] hover:to-[#cd507e] text-white border-0"
                  onClick={() => (window.location.href = "tel:7206412574")}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#9630b7] to-[#b13f9e] hover:from-[#8021d7] hover:to-[#cd507e] text-white border-0"
                  onClick={() => (window.location.href = "mailto:Tallyn.adams@gmail.com")}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Email Us
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a0723] border-t border-[#421272] py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/logo.png" alt="Crystal Clear Logo" width={40} height={40} className="rounded-lg" />
                <span className="text-xl font-bold bg-gradient-to-r from-[#9630b7] to-[#cd507e] bg-clip-text text-transparent">
                  Crystal Clear
                </span>
              </div>
              <p className="text-[#e6c0dc]">
                Premium mobile auto detailing services that bring showroom quality to your doorstep.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-[#e6c0dc]">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  (720) 641-2574
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Tallyn.adams@gmail.com
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Denver Metro Area
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9630b7] to-[#cd507e] flex items-center justify-center text-white hover:shadow-lg hover:shadow-[#ac73e2]/50 transition-shadow"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9630b7] to-[#cd507e] flex items-center justify-center text-white hover:shadow-lg hover:shadow-[#ac73e2]/50 transition-shadow"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#9630b7] to-[#cd507e] flex items-center justify-center text-white hover:shadow-lg hover:shadow-[#ac73e2]/50 transition-shadow"
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </div>

          <div className="border-t border-[#421272] pt-8 text-center text-[#e6c0dc]">
            <p>&copy; {new Date().getFullYear()} Crystal Clear Auto Detailing. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
