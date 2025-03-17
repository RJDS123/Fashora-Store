
import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, ShieldCheck, Clock, Send, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            EazyShop was born from a simple idea: create an online shopping experience that's truly enjoyable, 
            transparent, and focused on what matters – connecting people with products they'll love.
          </p>
        </motion.div>
        
        {/* About Image */}
        <motion.div 
          className="relative h-[400px] md:h-[500px] mb-20 rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Our Team" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Founded in 2023</h2>
              <p className="max-w-lg text-white/80">
                Our diverse team brings decades of combined experience in retail, 
                technology, and customer service.
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Mission and Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-muted-foreground mb-6">
              At EazyShop, we believe shopping should be simple, enjoyable, and tailored to your 
              needs. We're committed to bringing you high-quality products from around the world, 
              curated with care, and delivered with exceptional service.
            </p>
            <p className="text-muted-foreground">
              Our platform is designed to make discovery easy, transactions secure, and the entire 
              experience delightful from browsing to unboxing.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Values</h2>
            <ul className="space-y-4">
              {values.map((value, index) => (
                <li key={index} className="flex items-start">
                  <div className="mt-1 mr-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <value.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 px-8 bg-muted/30 rounded-2xl mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
        
        {/* Team Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The diverse group of people behind EazyShop who make the magic happen
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className="aspect-square">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Contact Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Get In Touch</h2>
            <p className="text-muted-foreground mb-8">
              Have questions, feedback, or need assistance? We're here to help!
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-primary mt-1 mr-4" />
                <div>
                  <h3 className="font-medium">Our Location</h3>
                  <p className="text-muted-foreground">
                    123 Commerce Street, New York, NY 10001
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Send className="w-5 h-5 text-primary mt-1 mr-4" />
                <div>
                  <h3 className="font-medium">Email Us</h3>
                  <p className="text-muted-foreground">
                    hello@eazyshop.com
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-primary mt-1 mr-4" />
                <div>
                  <h3 className="font-medium">Business Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Friday: 9am - 6pm<br />
                    Saturday - Sunday: 10am - 4pm
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-muted p-8 md:p-12">
            <h3 className="text-xl font-bold mb-6">Send us a message</h3>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-primary outline-none transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-primary outline-none transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-primary outline-none transition-colors"
                ></textarea>
              </div>
              
              <button type="submit" className="btn-primary w-full py-2.5">
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Mock data
const values = [
  {
    title: 'Customer First',
    description: 'Every decision we make is guided by what\'s best for our customers.',
    icon: Users,
  },
  {
    title: 'Quality Assurance',
    description: 'We carefully vet all products to ensure they meet our high standards.',
    icon: Award,
  },
  {
    title: 'Transparency',
    description: 'Clear communication and honest business practices are our foundation.',
    icon: ShieldCheck,
  },
];

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '5K+', label: 'Products' },
  { value: '15+', label: 'Countries Served' },
  { value: '99%', label: 'Satisfaction Rate' },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: 'Former retail executive with a passion for creating exceptional shopping experiences.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'David Chen',
    role: 'CTO',
    bio: 'Tech innovator focused on building intuitive and robust digital platforms.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Maria Rodriguez',
    role: 'Head of Design',
    bio: 'Award-winning designer creating beautiful and functional user experiences.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'James Wilson',
    role: 'Marketing Director',
    bio: 'Digital marketing strategist with a track record of building strong brands.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
];
