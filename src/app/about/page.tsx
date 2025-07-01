'use client';

"use client";

import React, { useState, useEffect } from 'react';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';


const AboutPage = () => {
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1668000866140-204e995de614?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Nepal mountains
    'https://images.unsplash.com/photo-1696576834819-37a40bfd21c6?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Nepal village
    'https://images.unsplash.com/photo-1511166698451-3e4e3438d1ee?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Nepalese children
    'https://images.unsplash.com/photo-1561915259-40dcbf86de02?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Nepal temple
    'https://images.unsplash.com/photo-1567347397177-7f0083398378?q=80&w=1467&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Nepal community
    'https://images.unsplash.com/photo-1574072538640-65ce052abc09?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Nepal landscape
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setImages(prevImages => prevImages.map(image => `${image.split('?')[0]}?${Date.now()}`));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ParallaxProvider>
      <div className="relative">
        <Parallax className="custom-class" translateY={[-20, 20]} tagOuter="figure">
          <div className="bg-fixed bg-center bg-cover h-screen flex items-center justify-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1503730511494-199705be18d1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
            <h1 className="text-5xl font-bold text-white text-center drop-shadow-lg">Welcome to Our Creative Space</h1>
          </div>
        </Parallax>
        <div className="container mx-auto px-4 py-16 bg-white shadow-lg rounded-lg -mt-20 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Stunning Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <Parallax key={index} translateY={[index % 2 === 0 ? -10 : 10, index % 2 === 0 ? 10 : -10]}>
                <div className="overflow-hidden rounded-lg shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                  <img src={image} alt="Gallery Image" className="w-full h-64 object-cover" />
                </div>
              </Parallax>
            ))}
          </div>
        </div>
        <div className="py-16 bg-gray-100 text-center">
          <h2 className="text-3xl font-bold mb-4">Explore More</h2>
          <p className="text-lg text-gray-700">Discover the beauty and creativity in every corner.</p>
        </div>
      </div>
    </ParallaxProvider>
  );
};

export default AboutPage;