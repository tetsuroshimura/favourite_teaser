'use client';

import Image from "next/image";
import CurvedText from "./components/CurvedText";
import CurvedTextMobile from "./components/CurvedTextMobile";
import ColorPicker from "./components/ColorPicker";
import SVGColorPicker from "./components/SVGColorPicker";
import MarqueeText from "./components/MarqueeText";
import AnimatedArtwork from "./components/AnimatedArtwork";
import AnimatedArtworkMobile from "./components/AnimatedArtworkMobile";
import { useState, useEffect } from "react";

export default function Home() {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [svgColor, setSvgColor] = useState('#0039CB');
  const [isCopied, setIsCopied] = useState(false);
  const [animateKey, setAnimateKey] = useState(0);


  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
  };

  const handleSvgColorChange = (color: string) => {
    console.log('SVG color changed to:', color);
    setSvgColor(color);
    // Trigger animation restart
    setAnimateKey(prev => prev + 1);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Email copied to clipboard');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    copyToClipboard('tetsuro@favourite.design');
  };


  // Update SVG stroke colors when svgColor changes
  useEffect(() => {
    const updateSvgColors = () => {
      console.log('Updating SVG colors to:', svgColor);
      
      // Wait for images to load and then query for embedded SVGs
      const images = document.querySelectorAll('img[src$=".svg"]');
      console.log(`Found ${images.length} SVG images`);
      
      // Also query for direct SVG elements in the DOM
      const directSvgPaths = document.querySelectorAll('svg path');
      console.log(`Found ${directSvgPaths.length} direct SVG paths`);
      
      let foundPaths = 0;
      
      // Update direct SVG paths
      directSvgPaths.forEach((path, index) => {
        console.log(`Direct SVG path ${index}:`, path);
        const currentStroke = path.getAttribute('stroke');
        console.log(`Current stroke: ${currentStroke}`);
        
        if (currentStroke && currentStroke !== 'none' && currentStroke !== 'transparent') {
          (path as SVGPathElement).setAttribute('stroke', svgColor);
          foundPaths++;
          console.log(`Updated direct SVG path ${index} stroke to ${svgColor}`);
        }
      });
      
      // For SVG images, we need to replace them with inline SVGs to modify stroke
      images.forEach((img, index) => {
        const imgElement = img as HTMLImageElement;
        console.log(`Processing SVG image ${index}:`, imgElement.src);
        
        if (imgElement.src.includes('human01')) {
          fetch(imgElement.src)
            .then(response => response.text())
            .then(svgText => {
              console.log(`Fetched SVG content for image ${index}`);
              
              // Create a new SVG element
              const parser = new DOMParser();
              const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
              const svgElement = svgDoc.querySelector('svg');
              
              if (svgElement) {
                // Copy attributes from img to svg
                svgElement.style.width = '100%';
                svgElement.style.height = '100%';
                svgElement.style.position = 'absolute';
                svgElement.style.top = '0';
                svgElement.style.left = '0';
                
                // Update all path strokes
                const paths = svgElement.querySelectorAll('path[stroke]');
                paths.forEach(path => {
                  (path as SVGPathElement).setAttribute('stroke', svgColor);
                  foundPaths++;
                });
                
                console.log(`Updated ${paths.length} paths in SVG image ${index}`);
                
                // Replace the image with the inline SVG
                if (imgElement.parentNode) {
                  imgElement.parentNode.insertBefore(svgElement, imgElement);
                  imgElement.style.display = 'none';
                }
              }
            })
            .catch(error => {
              console.error(`Failed to fetch SVG ${index}:`, error);
            });
        }
      });
      
      console.log(`Total direct paths updated: ${foundPaths}`);
    };

    // Add a small delay to ensure DOM is ready
    setTimeout(updateSvgColors, 200);
  }, [svgColor]);

  return (
    <div 
      className="min-h-screen transition-colors duration-300" 
      style={{ backgroundColor }}
    >
      {/* Color Pickers - Desktop: top-left, Mobile: top-right */}
      <div className="fixed top-4 right-4 lg:top-5 lg:left-7.5 lg:right-auto z-50 flex items-center gap-2.5">
        <ColorPicker onColorChange={handleBackgroundColorChange} />
        <SVGColorPicker onColorChange={handleSvgColorChange} />
      </div>
      
      {/* Animated Marquee Text */}
      <MarqueeText />
      
      {/* Mobile Layout */}
      <div className="lg:hidden flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header>
          <h1 className="font-normal text-black leading-none" style={{ fontFamily: 'Monument Grotesk, sans-serif', marginLeft: '20px', marginTop: '20px', fontSize: '36px' }}>
            Favourite
          </h1>
        </header>

        {/* Mobile Artwork Area */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden" style={{ paddingTop: '30px' }}>
          <div 
            className="relative"
            style={{ 
              width: '440px',
              height: '572px',
              maxWidth: '95vw'
            }}
          >
            <div 
              className="absolute inset-0"
              style={{ 
                width: '100%',
                height: '100%'
              }}
            >
              <AnimatedArtworkMobile
                key={`mobile-${animateKey}`}
              />
              {/* Mobile Curved Text overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <CurvedTextMobile />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Contact Section */}
        <div className="p-4">
          <div className="text-left mb-4">
            <p 
              className="text-black mb-2 font-normal"
              style={{ 
                fontFamily: 'Monument Grotesk, Arial, sans-serif',
                fontSize: '24px',
                lineHeight: 'normal'
              }}
            >
              Contact
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleEmailClick}
                className="text-black font-normal break-all text-left cursor-pointer hover:underline"
                style={{ 
                  fontFamily: 'Monument Grotesk, Arial, sans-serif',
                  fontSize: '20px',
                  lineHeight: 'normal'
                }}
              >
                tetsuro@favourite.design
              </button>
              <div className="flex-shrink-0 p-1">
                <Image
                  src={isCopied ? "/check.svg" : "/content_copy.svg"}
                  alt={isCopied ? "Copied" : "Copy"}
                  width={16}
                  height={16}
                  className={`transition-opacity duration-200 ${isCopied ? 'opacity-100' : 'opacity-100'}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Tags Section */}
        <div className="px-4 py-4 pb-6">
          <p 
            className="text-black font-normal mb-3 text-left" 
            style={{ 
              fontSize: '18px',
              fontFamily: 'Monument Grotesk, Arial, sans-serif'
            }}
          >
            Favourite for a long time
          </p>
          <div className="text-left" style={{ lineHeight: '1.8', display: 'flex', flexWrap: 'wrap' }}>
            <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '15px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Web Design</span>
            <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '15px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Graphic Design</span>
            <span className="text-black font-medium" style={{ fontFamily: '"MFW-PIshiiGothicStdN-M", "Monument Grotesk", sans-serif', fontSize: '15px', marginRight: '10px', whiteSpace: 'nowrap' }}>#宮崎駿</span>
            <span className="text-black font-medium" style={{ fontFamily: '"MFW-PIshiiGothicStdN-M", "Monument Grotesk", sans-serif', fontSize: '15px', marginRight: '10px', whiteSpace: 'nowrap' }}>#富士日記</span>
            <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '15px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Typeface</span>
            <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '15px', marginRight: '10px', whiteSpace: 'nowrap' }}>#SF</span>
            <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '15px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Surly</span>
            <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '15px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Deltro</span>
            <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '15px', marginRight: '10px', whiteSpace: 'nowrap' }}>#DarkSouls</span>
            <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '15px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Rivendell</span>
            <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '15px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Semitransparent Design</span>
            <span className="text-black font-medium" style={{ fontFamily: '"MFW-PIshiiGothicStdN-M", "Monument Grotesk", sans-serif', fontSize: '15px', marginRight: '10px', whiteSpace: 'nowrap' }}>#深沢七郎</span>
            <span className="text-black font-medium" style={{ fontFamily: '"MFW-PIshiiGothicStdN-M", "Monument Grotesk", sans-serif', fontSize: '15px', marginRight: '10px', whiteSpace: 'nowrap' }}>#服部一成</span>
            <span className="text-black font-medium" style={{ fontFamily: '"MFW-PIshiiGothicStdN-M", "Monument Grotesk", sans-serif', fontSize: '15px', marginRight: '10px', whiteSpace: 'nowrap' }}>#セザンヌ</span>
            <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '15px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Crust Bikes</span>
            <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '15px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Fontaines DC</span>
            <span className="text-black font-medium" style={{ fontFamily: '"MFW-PIshiiGothicStdN-M", "Monument Grotesk", sans-serif', fontSize: '15px', marginRight: '10px', whiteSpace: 'nowrap' }}>#タナカカツキ</span>
            <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '15px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Kasper Florio</span>
          </div>
        </div>

        {/* Mobile Works Section */}
        <div className="p-4">
          <div className="text-left mb-6">
            <p 
              className="text-black mb-2 font-normal"
              style={{ 
                fontFamily: 'Monument Grotesk, Arial, sans-serif',
                fontSize: '18px',
                lineHeight: 'normal'
              }}
            >
              Works
            </p>
            <a 
              href="https://badbadnotgood.design/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-black font-normal break-all"
              style={{ 
                fontFamily: 'Monument Grotesk, Arial, sans-serif',
                fontSize: '18px',
                lineHeight: 'normal'
              }}
            >
              https://badbadnotgood.design/
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid min-h-screen grid-cols-12 grid-rows-12">
        {/* Top Right Header */}
        <header className="col-span-12 row-span-2 flex justify-end items-start relative z-10">
          <h1 className="font-normal text-black leading-none" style={{ fontFamily: 'Monument Grotesk, sans-serif', marginTop: '30px', marginRight: '50px', fontSize: 'clamp(60px, 5vw, 120px)' }}>
            Favourite
          </h1>
        </header>

        {/* Left Side - Artwork Area */}
        <div className="col-span-6 row-span-8 p-12 flex items-center justify-center relative">
          <div className="w-screen h-screen fixed top-0 left-0 flex items-center justify-center pointer-events-none z-0" style={{ transform: 'translateY(-2vh)' }}>
            <div className="relative" style={{ width: '88%', height: '88%' }}>
              <AnimatedArtwork
                key={`desktop-${animateKey}`}
              />
              {/* Curved Text overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <CurvedText />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Spacer */}
        <div className="col-span-6 row-span-8"></div>

        {/* Bottom Left - Contact */}
        <div className="fixed bottom-0 left-0 z-20" style={{ marginLeft: '30px', marginBottom: '50px' }}>
          <div className="text-left">
            <p 
              className="text-black mb-2 font-normal"
              style={{ 
                fontFamily: 'Monument Grotesk, Arial, sans-serif',
                fontSize: 'clamp(40px, 3.47vw, 83px)',
                lineHeight: 'normal'
              }}
            >
              Contact
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleEmailClick}
                className="text-black font-normal text-left cursor-pointer hover:underline"
                style={{ 
                  fontFamily: 'Monument Grotesk, Arial, sans-serif',
                  fontSize: 'clamp(40px, 3.47vw, 83px)',
                  lineHeight: 'normal'
                }}
              >
                tetsuro@favourite.design
              </button>
              <div className="flex-shrink-0 p-2">
                <Image
                  src={isCopied ? "/check.svg" : "/content_copy.svg"}
                  alt={isCopied ? "Copied" : "Copy"}
                  width={24}
                  height={24}
                  className={`transition-opacity duration-200 ${isCopied ? 'opacity-100' : 'opacity-100'}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Right - Spacer */}
        <div className="col-span-6 row-span-2"></div>

        {/* Fixed Bottom Right - Site Info Group (Desktop Only) */}
        <div className="fixed bottom-0 right-0 z-20" style={{ marginRight: '50px', marginBottom: '50px', width: '33.33%' }}>
          <div style={{ backgroundColor }}>
            <p 
              className="text-black font-normal mb-4 text-left" 
              style={{ 
                fontSize: 'clamp(20px, 1.67vw, 40px)',
                fontFamily: 'Monument Grotesk, Arial, sans-serif'
              }}
            >
              Favourite for a long time
            </p>
            <div className="text-left mb-4" style={{ lineHeight: '1.8', display: 'flex', flexWrap: 'wrap' }}>
              <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '18px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Web Design</span>
              <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '18px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Graphic Design</span>
              <span className="text-black font-medium" style={{ fontFamily: '"MFW-PIshiiGothicStdN-M", "Monument Grotesk", sans-serif', fontSize: '18px', marginRight: '10px', whiteSpace: 'nowrap' }}>#宮崎駿</span>
              <span className="text-black font-medium" style={{ fontFamily: '"MFW-PIshiiGothicStdN-M", "Monument Grotesk", sans-serif', fontSize: '18px', marginRight: '10px', whiteSpace: 'nowrap' }}>#富士日記</span>
              <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '18px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Typeface</span>
              <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '18px', marginRight: '10px', whiteSpace: 'nowrap' }}>#SF</span>
              <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '18px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Surly</span>
              <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '18px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Deltro</span>
              <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '18px', marginRight: '10px', whiteSpace: 'nowrap' }}>#DarkSouls</span>
              <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '18px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Rivendell</span>
              <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '18px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Semitransparent Design</span>
              <span className="text-black font-medium" style={{ fontFamily: '"MFW-PIshiiGothicStdN-M", "Monument Grotesk", sans-serif', fontSize: '18px', marginRight: '10px', whiteSpace: 'nowrap' }}>#深沢七郎</span>
              <span className="text-black font-medium" style={{ fontFamily: '"MFW-PIshiiGothicStdN-M", "Monument Grotesk", sans-serif', fontSize: '18px', marginRight: '10px', whiteSpace: 'nowrap' }}>#服部一成</span>
              <span className="text-black font-medium" style={{ fontFamily: '"MFW-PIshiiGothicStdN-M", "Monument Grotesk", sans-serif', fontSize: '18px', marginRight: '10px', whiteSpace: 'nowrap' }}>#セザンヌ</span>
              <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '18px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Crust Bikes</span>
              <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '18px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Fontaines DC</span>
              <span className="text-black font-medium" style={{ fontFamily: '"MFW-PIshiiGothicStdN-M", "Monument Grotesk", sans-serif', fontSize: '18px', marginRight: '10px', whiteSpace: 'nowrap' }}>#タナカカツキ</span>
              <span className="text-black font-medium" style={{ fontFamily: 'Monument Grotesk, "MFW-PIshiiGothicStdN-M", sans-serif', fontWeight: 400, fontSize: '18px', marginRight: '10px', whiteSpace: 'nowrap' }}>#Kasper Florio</span>
            </div>
            <div className="text-left flex items-center gap-2">
              <p 
                className="text-black font-normal"
                style={{ 
                  fontSize: 'clamp(16px, 1.25vw, 30px)',
                  fontFamily: 'Monument Grotesk, Arial, sans-serif'
                }}
              >
                Works
              </p>
              <a 
                href="https://badbadnotgood.design/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-black font-normal underline"
                style={{ 
                  fontSize: 'clamp(16px, 1.25vw, 30px)',
                  fontFamily: 'Monument Grotesk, Arial, sans-serif'
                }}
              >
                https://badbadnotgood.design/
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}