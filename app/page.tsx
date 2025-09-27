"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Shield,
  Globe,
  ChevronRight,
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  Heart
} from 'lucide-react';

export default function Home() {
  const router = useRouter();
  
  // Check for auth status but don't block rendering
  useEffect(() => {
    // Check localStorage directly for faster access
    const checkAuth = () => {
      try {
        const persistedUser = localStorage.getItem('persist:user');
        if (persistedUser) {
          const userData = JSON.parse(persistedUser);
          const user = JSON.parse(userData.user || '{}');
          if (user.token) {
            router.push('/dashboard');
          }
        }
      } catch (error) {
        // If there's an error reading localStorage, just continue
        console.log('No persisted auth found');
      }
    };

    // Small delay to allow page to render first
    const timer = setTimeout(checkAuth, 500);
    return () => clearTimeout(timer);
  }, [router]);

  const features = [
    {
      icon: Users,
      title: "User Management",
      description: "Comprehensive user management system for students, faculty, and administrators",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Shield,
      title: "Secure Access",
      description: "Role-based access control with JWT authentication and authorization",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: BookOpen,
      title: "Academic Management", 
      description: "Complete academic administration with department and course management",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Award,
      title: "Performance Tracking",
      description: "Track student progress and faculty performance with detailed analytics",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students", icon: GraduationCap },
    { number: "500+", label: "Faculty", icon: Users },
    { number: "25+", label: "Departments", icon: BookOpen },
    { number: "99.9%", label: "Uptime", icon: Clock }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Department Head",
      content: "WebWizard has revolutionized how we manage our department. The interface is intuitive and the features are exactly what we needed.",
      rating: 5
    },
    {
      name: "Alex Chen",
      role: "Student",
      content: "As a student, I love how easy it is to access my information and communicate with faculty through this platform.",
      rating: 5
    },
    {
      name: "Prof. Michael Brown",
      role: "Faculty Coordinator",
      content: "The user management system is incredibly robust. Managing hundreds of students has never been this simple.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  WebWizard
                </h1>
                <p className="text-sm text-gray-600">Student Management Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => router.push('/login')}
                className="text-gray-700 hover:text-blue-600"
              >
                Login
              </Button>
              <Button 
                onClick={() => router.push('/login')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
              Welcome to the Future of
              <span className="block">Educational Management</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Streamline your academic operations with our comprehensive student management portal. 
              Built for universities, colleges, and educational institutions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                size="lg"
                onClick={() => router.push('/login')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4 h-auto"
              >
                <Zap className="w-5 h-5 mr-2" />
                Get Started Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-4 h-auto border-2 hover:bg-blue-50"
              >
                <Globe className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 mb-3 inline-block">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full blur-xl opacity-60"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200 rounded-full blur-xl opacity-60"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-pink-200 rounded-full blur-xl opacity-60"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your educational institution effectively, 
              from student enrollment to faculty coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <div className={`p-4 rounded-2xl ${feature.color} inline-block mb-4`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">Simple, efficient, and designed for education</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">Sign Up & Setup</h3>
              <p className="text-gray-600">
                Create your account and set up your institution's structure with departments and roles.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">Add Users & Assign Roles</h3>
              <p className="text-gray-600">
                Easily add students, faculty, and staff with appropriate roles and permissions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-600 to-red-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">Manage & Monitor</h3>
              <p className="text-gray-600">
                Monitor progress, manage operations, and make data-driven decisions for your institution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Loved by Educators
            </h2>
            <p className="text-xl text-gray-600">See what our users have to say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of educational institutions already using WebWizard to streamline their operations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              onClick={() => router.push('/login')}
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 h-auto"
            >
              <Target className="w-5 h-5 mr-2" />
              Start Your Journey
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4 h-auto"
            >
              <Heart className="w-5 h-5 mr-2" />
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">WebWizard</h3>
                <p className="text-gray-400 text-sm">Student Management Portal</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">© 2025 WebWizard. All rights reserved.</p>
              <p className="text-gray-500 text-sm">Built with ❤️ for education</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
