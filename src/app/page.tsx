"use client";

import { Parallax, ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ParallaxProvider>
      <div className="min-h-screen">
        {/* Hero Section with Enhanced Parallax */}
        <ParallaxBanner
          layers={[
            { 
              children: (
                <div className="absolute inset-0 bg-gradient-to-b from-green-800 via-green-700 to-green-600" />
              ),
              speed: -20,
              opacity: [0.8, 1],
              scale: [1.05, 1, 'easeOutCubic'],
              shouldAlwaysCompleteAnimation: true
            },
            {
              children: (
                <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 to-green-800/90" />
              ),
              speed: -5
            },
            {
              children: (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative z-10 text-center p-6 md:p-8 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg max-w-4xl mx-auto shadow-xl">
                    <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 text-green-800 drop-shadow-md">
                      Nepal Community Fund
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-green-700 font-medium">
                      Supporting sustainable development and empowering communities across Nepal.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/donate" className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                        Donate Now
                      </Link>
                      <Link href="/about" className="bg-white hover:bg-green-50 text-green-700 hover:text-green-800 font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border-2 border-green-700">
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              ),
              speed: -10,
            }
          ]}
          className="h-screen"
        />

        {/* Fundraising Progress Section with Parallax */}
        <section className="relative py-20 px-4 bg-green-50 text-gray-800 overflow-hidden">
          <Parallax translateY={[20, -20]} className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <div className="h-96 w-96 rounded-full bg-green-300" />
          </Parallax>
          <Parallax translateY={[-20, 20]} className="absolute bottom-0 left-0 opacity-10 pointer-events-none">
            <div className="h-64 w-64 rounded-full bg-green-400" />
          </Parallax>
          
          <div className="container mx-auto relative z-10">
            <Parallax translateY={[10, -10]} opacity={[0.8, 1]} scale={[0.9, 1]}>
              <h2 className="text-4xl font-bold mb-6 text-center text-green-800 drop-shadow-sm">Our Fundraising Progress</h2>
            </Parallax>
            
            <Parallax translateY={[15, -15]} scale={[0.95, 1]}>
              <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                  <div className="text-center md:text-left mb-4 md:mb-0">
                    <p className="text-green-700 font-medium">Fundraising Goal</p>
                    <p className="text-3xl font-bold text-green-800">Nrs 100,000</p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="text-green-700 font-medium">Raised So Far</p>
                    <p className="text-3xl font-bold text-green-800">Nrs 0</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-4 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <div className="mt-8 text-center">
                  <Link href="/donate" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
                    Make a Donation
                  </Link>
                </div>
              </div>
            </Parallax>
          </div>
        </section>

        {/* Our Focus Areas Section with Parallax */}
        <section className="relative py-24 px-4 bg-white text-gray-800 overflow-hidden">
          <ParallaxBanner
            layers={[
              {
                children: (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-white opacity-70" />
                ),
                speed: -10,
              }
            ]}
            className="absolute inset-0"
          />
          
          <div className="container mx-auto text-center relative z-10">
            <Parallax translateY={[10, -10]} opacity={[0.8, 1]}>
              <h2 className="text-4xl font-bold mb-6 text-green-800 drop-shadow-sm">Our Focus Areas</h2>
              <p className="text-lg text-green-700 max-w-3xl mx-auto mb-10 font-medium">
                The Nepal Community Fund is dedicated to supporting sustainable development projects 
                that create lasting positive change in communities across Nepal.
              </p>
            </Parallax>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Parallax translateY={[20, -20]} scale={[0.9, 1]} className="flex">
                <div className="p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300 h-full border border-green-100">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-green-100 rounded-full shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-green-800">Education</h3>
                  <p className="text-green-700">Supporting schools, providing scholarships, and developing educational resources for children in rural areas.</p>
                </div>
              </Parallax>
              
              <Parallax translateY={[15, -15]} scale={[0.9, 1]} className="flex">
                <div className="p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300 h-full border border-green-100">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-green-100 rounded-full shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-green-800">Healthcare</h3>
                  <p className="text-green-700">Improving access to quality healthcare services, medical supplies, and health education in underserved communities.</p>
                </div>
              </Parallax>
              
              <Parallax translateY={[10, -10]} scale={[0.9, 1]} className="flex">
                <div className="p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transition duration-300 h-full border border-green-100">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-green-100 rounded-full shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-green-800">Infrastructure</h3>
                  <p className="text-green-700">Building sustainable infrastructure including clean water systems, renewable energy, and community facilities.</p>
                </div>
              </Parallax>
            </div>
          </div>
        </section>

        {/* Impact Stories Section with Parallax */}
        <section className="relative py-20 px-4 bg-gray-100 text-gray-800 overflow-hidden">
          <Parallax translateY={[30, -30]} className="absolute -top-20 -right-20 opacity-10 pointer-events-none">
            <div className="h-80 w-80 rounded-full bg-green-200" />
          </Parallax>
          
          <div className="container mx-auto relative z-10">
            <Parallax translateY={[10, -10]} opacity={[0.8, 1]}>
              <h2 className="text-4xl font-bold mb-10 text-center">Our Impact</h2>
            </Parallax>
            
            <Parallax translateY={[20, -20]} scale={[0.95, 1]}>
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">Bringing Clean Water to Gorkha District</h3>
                <p className="text-gray-800 mb-6">
                  In 2023, we completed a clean water project in three villages in Gorkha District, 
                  providing over 500 families with access to clean, safe drinking water for the first time. 
                  This has significantly reduced waterborne diseases and improved overall health in the community.
                </p>
                <div className="flex justify-center">
                  <Link href="/mission" className="text-green-600 hover:text-green-800 font-semibold">
                    Read More Success Stories →
                  </Link>
                </div>
              </div>
            </Parallax>
          </div>
        </section>

        {/* Call to Action Section with Parallax */}
        <ParallaxBanner
          layers={[
            { 
              children: (
                <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-green-800 to-green-700" />
              ),
              speed: -15,
              opacity: [0.6, 0.8],
              scale: [1.05, 1, 'easeOutCubic'],
            },
            {
              children: (
                <div className="absolute inset-0 bg-gradient-to-b from-green-800/90 to-green-900/95" />
              ),
              speed: -5,
            },
            {
              children: (
                <section className="relative py-20 px-4 text-white text-center h-full flex flex-col justify-center">
                  <Parallax translateY={[10, -10]} opacity={[0.9, 1]} scale={[0.95, 1]}>
                    <h2 className="text-4xl font-bold mb-6">Make a Difference Today</h2>
                    <p className="text-xl max-w-2xl mx-auto mb-10">
                      Your donation can help transform lives and communities across Nepal. 
                      Every contribution, no matter the size, brings us closer to our goals.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <Link href="/donate" className="bg-white text-green-700 hover:bg-gray-200 font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
                        Donate Now
                      </Link>
                      <Link href="/contact" className="border-2 border-white text-white hover:bg-white hover:text-green-700 font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 shadow-lg">
                        Contact Us
                      </Link>
                    </div>
                  </Parallax>
                </section>
              ),
              speed: -10,
            }
          ]}
          className="h-[500px]"
        />
      </div>
    </ParallaxProvider>
  );
}