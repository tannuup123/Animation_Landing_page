"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroSection() {

  // 1. SETTING UP OUR REFERENCES (Like finding elements in HTML)

  // We need to 'grab' these elements so we can animate them later
  const mainWrapperRef = useRef(null); // The big invisible box holding everything
  const darkBackgroundTrackRef = useRef(null); // The dark blue road where the car drives
  const expandingGreenBoxRef = useRef(null); // The green box that grows as you scroll
  const theCarPictureRef = useRef(null); // The image of the car itself

  // References for the 4 statistics cards that show up in the corners
  const firstTopLeftCardRef = useRef(null);
  const secondBottomLeftCardRef = useRef(null);
  const thirdTopRightCardRef = useRef(null);
  const fourthBottomRightCardRef = useRef(null);


  // 2. THE ANIMATION MAGIC (Runs when the page loads)

  useEffect(() => {
    // We tell GSAP (our animation library) that we want to use the Scroll trigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Using gsap.context makes sure all animations are cleaned up if we leave the page
    let animationContext = gsap.context(() => {

      // --- INTRO ANIMATION ON PAGE LOAD ---
      // This makes the giant background text fade in nicely when you first open the site
      gsap.from(".headline-base", {
        opacity: 0, // Start invisible
        duration: 1.5, // Take 1.5 seconds to fade in
        ease: "power2.inOut" // Make it smooth at the start and end
      });

      // --- MAIN SCROLL ANIMATION TIMELINE ---
      // Think of a timeline like a movie sequence where things happen in order or together
      const myScrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: mainWrapperRef.current, // Watch the main wrapper container
          start: "top top", // Start animating when the top of the container hits the top of the screen
          end: "+=2500", // Keep the screen pinned for 2500 pixels of scrolling (more = slower animation)
          scrub: 1, // "Scrubbing" means the animation plays forwards/backwards exactly as you scroll up/down
          pin: true, // This locks the screen in place until the animation finishes
          invalidateOnRefresh: true // If the user resizes their browser, recalculate everything!
        }
      });

      // ACTION A: Make the green background box expand to full width
      myScrollTimeline.to(expandingGreenBoxRef.current, {
        width: "100%", // Grow from 0 width to 100% width
        duration: 3, // Abstract duration (acts like a ratio in scroll-scrub timelines)
        ease: "none" // We don't want it to speed up or slow down, just steady linear growth
      }, "start"); // We label this "start" so other animations can happen at the exact same time!

      // ACTION B: Drive the car image to the right!
      // We use a javaScript function to calculate exactly how far it can go without falling off the edge
      // window.innerWidth (width of screen) minus the car's own width.
      myScrollTimeline.to(theCarPictureRef.current, {
        x: () => window.innerWidth - theCarPictureRef.current.offsetWidth,
        duration: 3, // Same duration as the green box! So they move perfectly together
        ease: "none"
      }, "start"); // Also labeled "start"

      // ACTION C: Make the corner cards pop up one by one while scrolling!
      // Note: They already start invisible (opacity-0) and pushed down (translate-y-12) because of Tailwind CSS in the HTML below.

      // Card 1 appears pretty early magically
      myScrollTimeline.to(firstTopLeftCardRef.current, {
        opacity: 1, // Make it fully visible
        y: 0, // Move it up to its natural position
        scale: 1, // Make sure it's normal size
        duration: 0.8,
        ease: "power2.out"
      }, "start+=0.5"); // Wait 0.5 "seconds" after the scroll animation starts

      // Card 2 appears a little later
      myScrollTimeline.to(secondBottomLeftCardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "start+=1.0");

      // Card 3 appears even later
      myScrollTimeline.to(thirdTopRightCardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "start+=1.5");

      // Card 4 appears right near the end of the scroll
      myScrollTimeline.to(fourthBottomRightCardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      }, "start+=2.0");

    });

    // Cleanup function when component unmounts (React best practice!)
    return () => animationContext.revert();
  }, []); // The empty array [] means this useEffect only runs once when the component first loads

  // 3. TEXT SETTINGS

  // The big string we want to display behind the car (25 characters long)
  const headlineText = "W E L C O M E I T Z F I Z Z";

  // These "vw" CSS classes scale the font size perfectly relative to the user's screen width so it never overflows!
  const headlineClasses = "text-[3.8vw] md:text-[3.5vw] lg:text-[3vw] xl:text-[2.8vw] font-black tracking-[0.2em] whitespace-nowrap uppercase pl-[0.2em]";


  // 4. THE HTML LAYOUT (JSX)

  return (
    <section
      ref={mainWrapperRef} // Connect our wrapper reference here
      className="relative h-screen w-full bg-[#D1D5DB] overflow-hidden flex flex-col justify-center font-sans"
    >

      {/* ---------- CORNER STAT CARDS ---------- */}

      {/* 1. Top Left Card */}
      <div
        ref={firstTopLeftCardRef}
        // Initial state is hidden: opacity-0 translate-y-12 scale-90
        className="absolute top-[8%] left-[5%] md:top-12 md:left-12 bg-[#4ADE80] text-black w-[80vw] md:w-64 p-5 md:p-6 rounded-2xl shadow-xl z-20 opacity-0 translate-y-12 scale-90"
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-1 md:mb-2">120+</h3>
        <p className="text-xs md:text-sm font-semibold leading-tight uppercase">Projects</p>
      </div>

      {/* 2. Bottom Left Card */}
      <div
        ref={secondBottomLeftCardRef}
        className="absolute bottom-[8%] left-[5%] md:bottom-12 md:left-12 bg-[#38BDF8] text-black w-[80vw] md:w-64 p-5 md:p-6 rounded-2xl shadow-xl z-20 opacity-0 translate-y-12 scale-90"
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-1 md:mb-2">95%</h3>
        <p className="text-xs md:text-sm font-semibold leading-tight uppercase">Client Satisfaction</p>
      </div>

      {/* 3. Top Right Card */}
      <div
        ref={thirdTopRightCardRef}
        className="absolute top-[25%] md:top-12 right-[5%] md:right-12 bg-gray-800 text-white w-[80vw] md:w-64 p-5 md:p-6 rounded-2xl shadow-xl z-20 opacity-0 translate-y-12 scale-90"
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-1 md:mb-2">50+</h3>
        <p className="text-xs md:text-sm font-semibold leading-tight uppercase">Brands</p>
      </div>

      {/* 4. Bottom Right Card */}
      <div
        ref={fourthBottomRightCardRef}
        className="absolute bottom-[25%] md:bottom-12 right-[5%] md:right-12 bg-[#FB923C] text-black w-[80vw] md:w-64 p-5 md:p-6 rounded-2xl shadow-xl z-20 opacity-0 translate-y-12 scale-90"
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-1 md:mb-2">200+</h3>
        <p className="text-xs md:text-sm font-semibold leading-tight uppercase">Highly Experienced Professional Team </p>
      </div>


      {/* ---------- THE CENTER ROAD/TRACK AREA ---------- */}
      <div
        ref={darkBackgroundTrackRef}
        className="relative h-[25vh] md:h-[35vh] w-full bg-[#1F2937] flex items-center shadow-2xl"
      >

        {/* BASE TEXT (Visible initially on the dark road track) */}
        {/* pointer-events-none makes sure the text isn't selectable so it acts like a background graphic */}
        <div className="absolute inset-0 flex items-center justify-center w-full pointer-events-none">
          <h1 className={`headline-base text-[#374151] ${headlineClasses}`}>
            {headlineText}
          </h1>
        </div>

        {/* THE GREEN MASK BOX (Revealed magically as you scroll down) */}
        <div
          ref={expandingGreenBoxRef}
          className="absolute left-0 top-0 h-full bg-[#4ADE80] overflow-hidden z-10"
          style={{ width: "0%" }} // Important: Starts at 0% width!
        >
          {/* IDENTICAL TEXT inside the green box. 
              The clever trick here is this inner div is always 100vw (full window width) 
              so the text itself doesn't shrink when the green box's width changes! */}
          <div className="w-screen h-full flex items-center justify-center pointer-events-none">
            <h1 className={`text-black ${headlineClasses}`}>
              {headlineText}
            </h1>
          </div>
        </div>

        {/* THE CAR IMAGE */}
        <div
          ref={theCarPictureRef}
          className="absolute left-0 z-30 flex items-center"
        >
          <img
            src="/car.png"
            alt="Sports Car"
            // Ensure width is predictable so our JavaScript math doesn't mess up
            className="w-[200px] md:w-[300px] object-contain drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}