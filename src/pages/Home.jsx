// // import { ArrowRight, Clock3, Star, Utensils } from "lucide-react";
// import {
//   ArrowRight,
//   Clock3,
//   Star,
//   Utensils,
//   Leaf,
//   ChefHat,
//   Heart,
//   Sparkles,
//   MapPin,
//   Phone,
// } from "lucide-react";
// import foods from "../data/foods";

// function Home() {
//   return (
//     <main>
//       {/* Hero Section */}
//       <section className="relative min-h-screen overflow-hidden bg-[#0d0d0d]">
        
//         {/* Background Image */}
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage:
//               "url('https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=85')",
//           }}
//         />

//         {/* Dark Overlay */}
//         <div className="absolute inset-0 bg-black/65" />

//         {/* Gradient */}
//         <div className="bg-linear-to-r from-purple-500 to-pink-500"/>

//         {/* Content */}
//         <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 pt-20 sm:px-8 lg:px-10">
//           <div className="max-w-3xl">

//             {/* Small Label */}
//             <div className="mb-6 flex items-center gap-3">
//               <span className="h-px w-10 bg-[#d6ad60]" />

//               <span className="text-xs font-medium uppercase tracking-[0.35em] text-[#e8c982]">
//                 Welcome to Lumière
//               </span>
//             </div>

//             {/* Main Heading */}
//             <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
//               Taste the
//               <span className="block text-[#e8c982]">
//                 Extraordinary
//               </span>
//             </h1>

//             {/* Description */}
//             <p className="mt-7 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
//               Experience the perfect blend of exquisite flavors,
//               warm hospitality, and an unforgettable dining atmosphere.
//             </p>

//             {/* Buttons */}
//             <div className="mt-9 flex flex-wrap gap-4">
//               <a
//                 href="#menu"
//                 className="group inline-flex items-center gap-3 rounded-full bg-[#d6ad60] px-6 py-3.5 text-sm font-semibold text-[#0d0d0d] transition duration-300 hover:bg-[#e8c982]"
//               >
//                 Explore Menu

//                 <ArrowRight
//                   size={17}
//                   className="transition-transform duration-300 group-hover:translate-x-1"
//                 />
//               </a>

//               <a
//                 href="#about"
//                 className="inline-flex items-center rounded-full border border-white/25 px-6 py-3.5 text-sm font-medium text-white transition duration-300 hover:border-[#d6ad60] hover:text-[#e8c982]"
//               >
//                 Our Story
//               </a>
//             </div>

//             {/* Features */}
//             <div className="mt-14 grid max-w-2xl grid-cols-1 gap-5 border-t border-white/10 pt-7 sm:grid-cols-3">

//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10">
//                   <Utensils size={18} className="text-[#e8c982]" />
//                 </div>

//                 <div>
//                   <p className="text-sm font-medium text-white">
//                     Fresh Ingredients
//                   </p>
//                   <p className="text-xs text-white/45">
//                     Quality in every bite
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10">
//                   <Star size={18} className="text-[#e8c982]" />
//                 </div>

//                 <div>
//                   <p className="text-sm font-medium text-white">
//                     5.0 Rating
//                   </p>
//                   <p className="text-xs text-white/45">
//                     Loved by our guests
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10">
//                   <Clock3 size={18} className="text-[#e8c982]" />
//                 </div>

//                 <div>
//                   <p className="text-sm font-medium text-white">
//                     Open Daily
//                   </p>
//                   <p className="text-xs text-white/45">
//                     10 AM — 11 PM
//                   </p>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
//           <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
//             Scroll
//           </span>

//           <span className="bg-linear-to-b from-black to-transparent"/>
//         </div>
//       </section>

      
//       {/* Popular Dishes */}
// <section
//   id="menu"
//   className="bg-[#0d0d0d] px-5 py-24 sm:px-8 lg:px-10"
// >
//   <div className="mx-auto max-w-7xl">

//     {/* Section Header */}
//     <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">

//       <div>
//         <div className="mb-4 flex items-center gap-3">
//           <span className="h-px w-10 bg-[#d6ad60]" />

//           <span className="text-xs uppercase tracking-[0.3em] text-[#e8c982]">
//             Our Selection
//           </span>
//         </div>

//         <h2 className="font-serif text-4xl font-semibold text-white sm:text-5xl">
//           Popular Dishes
//         </h2>

//         <p className="mt-4 max-w-xl text-sm leading-6 text-white/50 sm:text-base">
//           Discover some of our guests' favorite dishes, prepared
//           with fresh ingredients and unforgettable flavors.
//         </p>
//       </div>

//       <a
//         href="#menu"
//         className="group inline-flex items-center gap-2 text-sm font-medium text-[#e8c982]"
//       >
//         View Full Menu

//         <ArrowRight
//           size={17}
//           className="transition-transform duration-300 group-hover:translate-x-1"
//         />
//       </a>
//     </div>

//     {/* Food Cards */}
//     <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//       {foods.map((food) => (
//         <article
//           key={food.id}
//           className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121212] transition duration-500 hover:-translate-y-1 hover:border-[#d6ad60]/40"
//         >

//           {/* Image */}
//           <div className="relative aspect-4/3 overflow-hidden">
//             <img
//               src={food.image}
//               alt={food.name}
//               className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
//             />

//             {/* Overlay */}
//             <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

//             {/* Category */}
//             <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-wider text-white/80 backdrop-blur-md">
//               {food.category}
//             </span>

//             {/* Rating */}
//             <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-md">
//               <Star
//                 size={13}
//                 fill="currentColor"
//                 className="text-[#e8c982]"
//               />

//               <span className="text-xs font-medium text-white">
//                 {food.rating}
//               </span>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="p-5">

//             <div className="flex items-start justify-between gap-4">
//               <h3 className="font-serif text-xl text-white">
//                 {food.name}
//               </h3>

//               <span className="shrink-0 text-base font-semibold text-[#e8c982]">
//                 {food.price}
//               </span>
//             </div>

//             <p className="mt-3 text-sm leading-6 text-white/45">
//               {food.description}
//             </p>

//             <a
//               href="#menu"
//               className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#e8c982] transition hover:text-white"
//             >
//               View Details
//               <ArrowRight size={14} />
//             </a>
//           </div>
//         </article>
//       ))}
//     </div>
//   </div>
// </section>

// {/* About Restaurant */}
// <section
//   id="about"
//   className="overflow-hidden bg-[#111111] px-5 py-24 sm:px-8 lg:px-10"
// >
//   <div className="mx-auto max-w-7xl">

//     <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

//       {/* Images */}
//       <div className="relative">

//         {/* Main Image */}
//         <div className="relative overflow-hidden rounded-2xl">
//           <img
//             src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85"
//             alt="Lumière restaurant interior"
//             className="h-130 w-full object-cover"
//           />

//           <div className="absolute inset-0 bg-black/10" />
//         </div>

//         {/* Experience Badge */}
//         <div className="absolute -bottom-6 -right-4 flex h-32 w-32 flex-col items-center justify-center rounded-full border border-[#d6ad60]/50 bg-[#0d0d0d] shadow-2xl sm:-right-6">
//           <span className="font-serif text-3xl text-[#e8c982]">
//             10+
//           </span>

//           <span className="mt-1 text-center text-[9px] uppercase tracking-[0.2em] text-white/50">
//             Years of
//             <br />
//             Excellence
//           </span>
//         </div>

//         {/* Small Image */}
//         <div className="absolute -bottom-10 left-4 hidden w-44 overflow-hidden rounded-xl border-4 border-[#111111] shadow-xl sm:block">
//           <img
//             src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=85"
//             alt="Lumière dining experience"
//             className="h-32 w-full object-cover"
//           />
//         </div>

//       </div>

//       {/* Content */}
//       <div className="lg:pl-4">

//         {/* Label */}
//         <div className="mb-5 flex items-center gap-3">
//           <span className="h-px w-10 bg-[#d6ad60]" />

//           <span className="text-xs uppercase tracking-[0.3em] text-[#e8c982]">
//             Our Story
//           </span>
//         </div>

//         {/* Heading */}
//         <h2 className="font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
//           A place where
//           <span className="block text-[#e8c982]">
//             food meets passion.
//           </span>
//         </h2>

//         {/* Description */}
//         <div className="mt-7 space-y-4 text-sm leading-7 text-white/55 sm:text-base">
//           <p>
//             Lumière was born from a simple belief — great food
//             has the power to bring people together. Every dish
//             we create is inspired by fresh ingredients, timeless
//             techniques, and a passion for unforgettable flavors.
//           </p>

//           <p>
//             From our kitchen to your table, we focus on quality,
//             warmth, and genuine hospitality. Every visit should
//             feel special, every meal should tell a story.
//           </p>
//         </div>

//         {/* Philosophy */}
//         <div className="mt-9 grid gap-5 border-y border-white/10 py-7 sm:grid-cols-3">

//           <div>
//             <div className="mb-3 text-2xl text-[#e8c982]">✦</div>

//             <h3 className="text-sm font-medium text-white">
//               Fresh Ingredients
//             </h3>

//             <p className="mt-1 text-xs leading-5 text-white/40">
//               Carefully selected every day.
//             </p>
//           </div>

//           <div>
//             <div className="mb-3 text-2xl text-[#e8c982]">♡</div>

//             <h3 className="text-sm font-medium text-white">
//               Happy Guests
//             </h3>

//             <p className="mt-1 text-xs leading-5 text-white/40">
//               Your experience matters to us.
//             </p>
//           </div>

//           <div>
//             <div className="mb-3 text-2xl text-[#e8c982]">◇</div>

//             <h3 className="text-sm font-medium text-white">
//               Crafted With Care
//             </h3>

//             <p className="mt-1 text-xs leading-5 text-white/40">
//               Every plate made with passion.
//             </p>
//           </div>

//         </div>

//         {/* Button */}
//         <a
//           href="#contact"
//           className="group mt-8 inline-flex items-center gap-3 rounded-full border border-[#d6ad60] px-6 py-3.5 text-sm font-medium text-[#e8c982] transition duration-300 hover:bg-[#d6ad60] hover:text-[#0d0d0d]"
//         >
//           Discover Our Story

//           <ArrowRight
//             size={17}
//             className="transition-transform duration-300 group-hover:translate-x-1"
//           />
//         </a>

//       </div>
//     </div>

//   </div>
// </section>

// {/* Chef's Special */}
// <section className="bg-[#0d0d0d] px-5 py-24 sm:px-8 lg:px-10">
//   <div className="mx-auto max-w-7xl">

//     <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-[#121212] lg:grid-cols-2">

//       {/* Food Image */}
//       <div className="relative min-h-105 overflow-hidden lg:min-h-150">
//         <img
//           src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1400&q=85"
//           alt="Chef's special beef steak"
//           className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
//         />

//         <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

//         {/* Special Badge */}
//         <div className="absolute left-6 top-6 rounded-full border border-[#e8c982]/40 bg-black/50 px-4 py-2 backdrop-blur-md">
//           <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#e8c982]">
//             Chef's Signature
//           </span>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">

//         {/* Label */}
//         <div className="mb-5 flex items-center gap-3">
//           <span className="h-px w-10 bg-[#d6ad60]" />

//           <span className="text-xs uppercase tracking-[0.3em] text-[#e8c982]">
//             From Our Kitchen
//           </span>
//         </div>

//         {/* Heading */}
//         <h2 className="font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
//           The Chef's
//           <span className="block text-[#e8c982]">
//             Special
//           </span>
//         </h2>

//         {/* Dish */}
//         <div className="mt-8 flex items-start justify-between gap-5 border-b border-white/10 pb-6">
//           <div>
//             <h3 className="font-serif text-2xl text-white sm:text-3xl">
//               Signature Grilled Steak
//             </h3>

//             <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/35">
//               Premium Beef · Seasonal Vegetables
//             </p>
//           </div>

//           <span className="shrink-0 text-xl font-semibold text-[#e8c982]">
//             $22
//           </span>
//         </div>

//         {/* Description */}
//         <p className="mt-7 text-sm leading-7 text-white/55 sm:text-base">
//           A carefully selected cut of premium beef, grilled to
//           perfection and served with seasonal vegetables and our
//           signature house sauce. Simple ingredients, elevated by
//           the art of our kitchen.
//         </p>

//         {/* Rating */}
//         <div className="mt-7 flex items-center gap-4">

//           <div className="flex items-center gap-1">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <Star
//                 key={star}
//                 size={15}
//                 fill="currentColor"
//                 className="text-[#e8c982]"
//               />
//             ))}
//           </div>

//           <span className="text-sm text-white/50">
//             4.9 · Guest Favorite
//           </span>
//         </div>

//         {/* Chef */}
//         <div className="mt-9 flex items-center gap-4 border-t border-white/10 pt-7">

//           <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d6ad60]/40 bg-[#d6ad60]/10">
//             <span className="font-serif text-lg text-[#e8c982]">
//               L
//             </span>
//           </div>

//           <div>
//             <p className="text-sm font-medium text-white">
//               Chef Lumière
//             </p>

//             <p className="mt-1 text-xs text-white/40">
//               Executive Chef
//             </p>
//           </div>

//         </div>

//         {/* Button */}
//         <a
//           href="#menu"
//           className="group mt-9 inline-flex w-fit items-center gap-3 rounded-full bg-[#d6ad60] px-6 py-3.5 text-sm font-semibold text-[#0d0d0d] transition duration-300 hover:bg-[#e8c982]"
//         >
//           Explore Our Menu

//           <ArrowRight
//             size={17}
//             className="transition-transform duration-300 group-hover:translate-x-1"
//           />
//         </a>

//       </div>
//     </div>

//   </div>
// </section>

// {/* Why Choose Us */}
// <section className="relative overflow-hidden bg-[#101010] px-5 py-24 sm:px-8 lg:px-10">
//   {/* Decorative glow */}
//   <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#d6ad60]/5 blur-3xl" />
//   <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-[#d6ad60]/5 blur-3xl" />

//   <div className="relative mx-auto max-w-7xl">
//     {/* Section Header */}
//     <div className="mx-auto max-w-2xl text-center">
//       <div className="mb-5 flex items-center justify-center gap-3">
//         <span className="h-px w-10 bg-[#d6ad60]" />

//         <span className="text-xs uppercase tracking-[0.3em] text-[#e8c982]">
//           The Lumière Difference
//         </span>

//         <span className="h-px w-10 bg-[#d6ad60]" />
//       </div>

//       <h2 className="font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
//         Why Choose
//         <span className="text-[#e8c982]"> Us?</span>
//       </h2>

//       <p className="mt-5 text-sm leading-7 text-white/50 sm:text-base">
//         Every detail at Lumière is thoughtfully crafted to create
//         an unforgettable dining experience.
//       </p>
//     </div>

//     {/* Feature Cards */}
//     <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//       {/* Card 1 */}
//       <div className="group rounded-2xl border border-white/10 bg-[#141414] p-7 text-center transition duration-500 hover:-translate-y-2 hover:border-[#d6ad60]/40 hover:bg-[#171717]">
//         <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10 transition duration-500 group-hover:scale-110 group-hover:bg-[#d6ad60]/15">
//           <Leaf
//             size={27}
//             strokeWidth={1.5}
//             className="text-[#e8c982]"
//           />
//         </div>

//         <h3 className="mt-6 font-serif text-xl text-white">
//           Fresh Ingredients
//         </h3>

//         <p className="mt-3 text-sm leading-6 text-white/45">
//           We carefully select fresh, premium ingredients to bring
//           natural flavor to every dish.
//         </p>
//       </div>

//       {/* Card 2 */}
//       <div className="group rounded-2xl border border-white/10 bg-[#141414] p-7 text-center transition duration-500 hover:-translate-y-2 hover:border-[#d6ad60]/40 hover:bg-[#171717]">
//         <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10 transition duration-500 group-hover:scale-110 group-hover:bg-[#d6ad60]/15">
//           <ChefHat
//             size={27}
//             strokeWidth={1.5}
//             className="text-[#e8c982]"
//           />
//         </div>

//         <h3 className="mt-6 font-serif text-xl text-white">
//           Expert Chefs
//         </h3>

//         <p className="mt-3 text-sm leading-6 text-white/45">
//           Our experienced chefs combine creativity, technique and
//           passion in every plate.
//         </p>
//       </div>

//       {/* Card 3 */}
//       <div className="group rounded-2xl border border-white/10 bg-[#141414] p-7 text-center transition duration-500 hover:-translate-y-2 hover:border-[#d6ad60]/40 hover:bg-[#171717]">
//         <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10 transition duration-500 group-hover:scale-110 group-hover:bg-[#d6ad60]/15">
//           <Heart
//             size={27}
//             strokeWidth={1.5}
//             className="text-[#e8c982]"
//           />
//         </div>

//         <h3 className="mt-6 font-serif text-xl text-white">
//           Made With Passion
//         </h3>

//         <p className="mt-3 text-sm leading-6 text-white/45">
//           From preparation to presentation, every dish is made
//           with genuine care and passion.
//         </p>
//       </div>

//       {/* Card 4 */}
//       <div className="group rounded-2xl border border-white/10 bg-[#141414] p-7 text-center transition duration-500 hover:-translate-y-2 hover:border-[#d6ad60]/40 hover:bg-[#171717]">
//         <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10 transition duration-500 group-hover:scale-110 group-hover:bg-[#d6ad60]/15">
//           <Sparkles
//             size={27}
//             strokeWidth={1.5}
//             className="text-[#e8c982]"
//           />
//         </div>

//         <h3 className="mt-6 font-serif text-xl text-white">
//           Exceptional Experience
//         </h3>

//         <p className="mt-3 text-sm leading-6 text-white/45">
//           A warm atmosphere, beautiful presentation and thoughtful
//           service come together for every guest.
//         </p>
//       </div>
//     </div>

//     {/* Bottom Highlight */}
//     <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
//       <div className="flex items-center gap-4">
//         <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10">
//           <Utensils
//             size={20}
//             strokeWidth={1.5}
//             className="text-[#e8c982]"
//           />
//         </div>

//         <div>
//           <p className="text-sm font-medium text-white">
//             Crafted for unforgettable moments
//           </p>

//           <p className="mt-1 text-xs text-white/40">
//             Quality · Passion · Excellence
//           </p>
//         </div>
//       </div>

//       <a
//         href="#menu"
//         className="group inline-flex items-center gap-3 text-sm font-medium text-[#e8c982] transition hover:text-white"
//       >
//         Explore Our Menu
//         <ArrowRight
//           size={17}
//           className="transition-transform duration-300 group-hover:translate-x-1"
//         />
//       </a>
//     </div>
//   </div>
// </section>


// {/* Reviews */}
// <section
//   id="reviews"
//   className="relative overflow-hidden bg-[#0d0d0d] px-5 py-24 sm:px-8 lg:px-10"
// >
//   <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#d6ad60]/5 blur-3xl" />

//   <div className="relative mx-auto max-w-7xl">
//     {/* Header */}
//     <div className="mx-auto max-w-2xl text-center">
//       <div className="mb-5 flex items-center justify-center gap-3">
//         <span className="h-px w-10 bg-[#d6ad60]" />

//         <span className="text-xs uppercase tracking-[0.3em] text-[#e8c982]">
//           Guest Experiences
//         </span>

//         <span className="h-px w-10 bg-[#d6ad60]" />
//       </div>

//       <h2 className="font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
//         What Our Guests
//         <span className="text-[#e8c982]"> Say</span>
//       </h2>

//       <p className="mt-5 text-sm leading-7 text-white/50 sm:text-base">
//         Great food becomes even more special when shared with
//         unforgettable experiences.
//       </p>
//     </div>

//     {/* Rating Summary */}
//     <div className="mx-auto mt-12 flex w-fit items-center gap-5 rounded-full border border-white/10 bg-[#141414] px-6 py-3">
//       <div className="flex items-center gap-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             size={17}
//             fill="currentColor"
//             className="text-[#e8c982]"
//           />
//         ))}
//       </div>

//       <div className="h-5 w-px bg-white/15" />

//       <p className="text-sm text-white/70">
//         <span className="font-semibold text-white">5.0</span>{" "}
//         · 500+ Happy Guests
//       </p>
//     </div>

//     {/* Review Cards */}
//     <div className="mt-14 grid gap-5 md:grid-cols-3">
//       {/* Review 1 */}
//       <div className="group rounded-2xl border border-white/10 bg-[#121212] p-7 transition duration-500 hover:-translate-y-2 hover:border-[#d6ad60]/40">
//         <div className="flex items-center justify-between">
//           <div className="flex gap-1">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <Star
//                 key={star}
//                 size={14}
//                 fill="currentColor"
//                 className="text-[#e8c982]"
//               />
//             ))}
//           </div>

//           <span className="text-xs text-white/25">
//             Verified Guest
//           </span>
//         </div>

//         <p className="mt-7 text-sm leading-7 text-white/60">
//           “Absolutely beautiful atmosphere and incredible food.
//           Everything was presented perfectly and tasted amazing.”
//         </p>

//         <div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-6">
//           <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d6ad60]/10 font-serif text-lg text-[#e8c982]">
//             A
//           </div>

//           <div>
//             <h3 className="text-sm font-medium text-white">
//               Alex Morgan
//             </h3>

//             <p className="mt-1 text-xs text-white/35">
//               Food Enthusiast
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Review 2 */}
//       <div className="group rounded-2xl border border-[#d6ad60]/25 bg-[#151515] p-7 transition duration-500 hover:-translate-y-2 hover:border-[#d6ad60]/50">
//         <div className="flex items-center justify-between">
//           <div className="flex gap-1">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <Star
//                 key={star}
//                 size={14}
//                 fill="currentColor"
//                 className="text-[#e8c982]"
//               />
//             ))}
//           </div>

//           <span className="text-xs text-[#e8c982]/60">
//             Featured Review
//           </span>
//         </div>

//         <p className="mt-7 text-sm leading-7 text-white/60">
//           “One of the best dining experiences I’ve had. The steak
//           was perfectly cooked, the service was wonderful, and the
//           atmosphere felt truly special.”
//         </p>

//         <div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-6">
//           <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d6ad60]/10 font-serif text-lg text-[#e8c982]">
//             S
//           </div>

//           <div>
//             <h3 className="text-sm font-medium text-white">
//               Sophia Bennett
//             </h3>

//             <p className="mt-1 text-xs text-white/35">
//               Regular Guest
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Review 3 */}
//       <div className="group rounded-2xl border border-white/10 bg-[#121212] p-7 transition duration-500 hover:-translate-y-2 hover:border-[#d6ad60]/40">
//         <div className="flex items-center justify-between">
//           <div className="flex gap-1">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <Star
//                 key={star}
//                 size={14}
//                 fill="currentColor"
//                 className="text-[#e8c982]"
//               />
//             ))}
//           </div>

//           <span className="text-xs text-white/25">
//             Verified Guest
//           </span>
//         </div>

//         <p className="mt-7 text-sm leading-7 text-white/60">
//           “A perfect place for a special evening. Delicious dishes,
//           elegant surroundings and genuinely friendly service.”
//         </p>

//         <div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-6">
//           <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d6ad60]/10 font-serif text-lg text-[#e8c982]">
//             D
//           </div>

//           <div>
//             <h3 className="text-sm font-medium text-white">
//               Daniel Carter
//             </h3>

//             <p className="mt-1 text-xs text-white/35">
//               Happy Guest
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Bottom CTA */}
//     <div className="mt-12 text-center">
//       <p className="text-xs uppercase tracking-[0.25em] text-white/30">
//         Your experience matters to us
//       </p>

//       <a
//         href="#contact"
//         className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#e8c982] transition hover:text-white"
//       >
//         Visit Lumière
//         <ArrowRight
//           size={16}
//           className="transition-transform duration-300 hover:translate-x-1"
//         />
//       </a>
//     </div>
//   </div>
// </section>


// {/* Gallery */}
// <section
//   id="gallery"
//   className="bg-[#101010] px-5 py-24 sm:px-8 lg:px-10"
// >
//   <div className="mx-auto max-w-7xl">

//     {/* Header */}
//     <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
//       <div>
//         <div className="mb-5 flex items-center gap-3">
//           <span className="h-px w-10 bg-[#d6ad60]" />

//           <span className="text-xs uppercase tracking-[0.3em] text-[#e8c982]">
//             Inside Lumière
//           </span>
//         </div>

//         <h2 className="font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl">
//           A Glimpse of
//           <span className="text-[#e8c982]"> Lumière</span>
//         </h2>

//         <p className="mt-5 max-w-xl text-sm leading-7 text-white/50 sm:text-base">
//           Discover the atmosphere, flavors and beautiful moments
//           that make every visit to Lumière special.
//         </p>
//       </div>

//       <a
//         href="#contact"
//         className="group inline-flex w-fit items-center gap-3 rounded-full border border-[#d6ad60]/60 px-5 py-3 text-xs font-medium uppercase tracking-wider text-[#e8c982] transition duration-300 hover:bg-[#d6ad60] hover:text-[#0d0d0d]"
//       >
//         Visit Us
//         <ArrowRight
//           size={16}
//           className="transition-transform duration-300 group-hover:translate-x-1"
//         />
//       </a>
//     </div>

//     {/* Gallery Grid */}
//     <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

//       {/* Large Image */}
//       <div className="group relative overflow-hidden rounded-2xl sm:col-span-2 lg:col-span-2 lg:row-span-2">
//         <img
//           src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=85"
//           alt="Elegant restaurant interior"
//           className="h-105 w-full object-cover transition duration-700 group-hover:scale-105 lg:h-155"
//         />

//         <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

//         <div className="absolute bottom-0 left-0 p-7">
//           <p className="text-[10px] uppercase tracking-[0.3em] text-[#e8c982]">
//             The Atmosphere
//           </p>

//           <h3 className="mt-2 font-serif text-2xl text-white">
//             Where Every Moment Matters
//           </h3>
//         </div>
//       </div>

//       {/* Image 2 */}
//       <div className="group relative overflow-hidden rounded-2xl">
//         <img
//           src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85"
//           alt="Fresh restaurant dish"
//           className="h-75 w-full object-cover transition duration-700 group-hover:scale-110"
//         />

//         <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />

//         <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md">
//           <span className="text-[10px] uppercase tracking-[0.2em] text-white">
//             Fresh Flavors
//           </span>
//         </div>
//       </div>

//       {/* Image 3 */}
//       <div className="group relative overflow-hidden rounded-2xl">
//         <img
//           src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85"
//           alt="Fine dining table"
//           className="h-75 w-full object-cover transition duration-700 group-hover:scale-110"
//         />

//         <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />

//         <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md">
//           <span className="text-[10px] uppercase tracking-[0.2em] text-white">
//             Fine Dining
//           </span>
//         </div>
//       </div>

//       {/* Image 4 */}
//       <div className="group relative overflow-hidden rounded-2xl">
//         <img
//           src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=85"
//           alt="Premium grilled steak"
//           className="h-75 w-full object-cover transition duration-700 group-hover:scale-110"
//         />

//         <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />

//         <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md">
//           <span className="text-[10px] uppercase tracking-[0.2em] text-white">
//             Signature Dish
//           </span>
//         </div>
//       </div>

//       {/* Image 5 */}
//       <div className="group relative overflow-hidden rounded-2xl">
//         <img
//           src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85"
//           alt="Lumière restaurant dining area"
//           className="h-75 w-full object-cover transition duration-700 group-hover:scale-110"
//         />

//         <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />

//         <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md">
//           <span className="text-[10px] uppercase tracking-[0.2em] text-white">
//             Our Space
//           </span>
//         </div>
//       </div>

//     </div>

//     {/* Bottom Stats */}
//     <div className="mt-12 grid grid-cols-2 border-y border-white/10 py-8 sm:grid-cols-4">
//       <div className="border-r border-white/10 text-center">
//         <p className="font-serif text-2xl text-[#e8c982]">10+</p>
//         <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/35">
//           Years
//         </p>
//       </div>

//       <div className="border-r border-white/10 text-center">
//         <p className="font-serif text-2xl text-[#e8c982]">50+</p>
//         <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/35">
//           Dishes
//         </p>
//       </div>

//       <div className="border-r-0 text-center sm:border-r sm:border-white/10">
//         <p className="font-serif text-2xl text-[#e8c982]">5.0</p>
//         <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/35">
//           Rating
//         </p>
//       </div>

//       <div className="text-center">
//         <p className="font-serif text-2xl text-[#e8c982]">500+</p>
//         <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/35">
//           Guests
//         </p>
//       </div>
//     </div>

//   </div>
// </section>


// {/* Location & Opening Hours */}
// <section
//   id="contact"
//   className="relative overflow-hidden bg-[#0d0d0d] px-5 py-24 sm:px-8 lg:px-10"
// >
//   <div className="mx-auto max-w-7xl">
//     {/* Header */}
//     <div className="mx-auto max-w-2xl text-center">
//       <div className="mb-5 flex items-center justify-center gap-3">
//         <span className="h-px w-10 bg-[#d6ad60]" />

//         <span className="text-xs uppercase tracking-[0.3em] text-[#e8c982]">
//           Come & Visit
//         </span>

//         <span className="h-px w-10 bg-[#d6ad60]" />
//       </div>

//       <h2 className="font-serif text-4xl font-semibold text-white sm:text-5xl">
//         Find Your Way to
//         <span className="text-[#e8c982]"> Lumière</span>
//       </h2>

//       <p className="mt-5 text-sm leading-7 text-white/50 sm:text-base">
//         We would love to welcome you for an unforgettable dining
//         experience.
//       </p>
//     </div>

//     {/* Main Grid */}
//     <div className="mt-14 grid overflow-hidden rounded-3xl border border-white/10 bg-[#121212] lg:grid-cols-2">

//       {/* Map / Location Visual */}
//       <div className="relative min-h-107.5 overflow-hidden lg:min-h-140">
//         <img
//           src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1400&q=85"
//           alt="Lumière restaurant location"
//           className="absolute inset-0 h-full w-full object-cover"
//         />

//         <div className="absolute inset-0 bg-black/45" />

//         {/* Location Card */}
//         <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/15 bg-black/55 p-5 backdrop-blur-xl sm:left-8 sm:right-auto sm:max-w-sm">
//           <div className="flex items-start gap-4">
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d6ad60]">
//               <MapPin
//                 size={20}
//                 className="text-[#0d0d0d]"
//                 strokeWidth={1.8}
//               />
//             </div>

//             <div>
//               <p className="text-xs uppercase tracking-[0.2em] text-[#e8c982]">
//                 Our Location
//               </p>

//               <p className="mt-2 text-sm leading-6 text-white/80">
//                 123 Grand Avenue,
//                 <br />
//                 Downtown, Your City
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Information */}
//       <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
//         {/* Address */}
//         <div className="flex gap-5 border-b border-white/10 pb-7">
//           <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10">
//             <MapPin
//               size={20}
//               strokeWidth={1.5}
//               className="text-[#e8c982]"
//             />
//           </div>

//           <div>
//             <p className="text-xs uppercase tracking-[0.2em] text-[#e8c982]">
//               Address
//             </p>

//             <h3 className="mt-2 font-serif text-xl text-white">
//               123 Grand Avenue
//             </h3>

//             <p className="mt-1 text-sm text-white/40">
//               BD
//             </p>
//           </div>
//         </div>

//         {/* Opening Hours */}
//         <div className="border-b border-white/10 py-7">
//           <div className="flex items-center gap-5">
//             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10">
//               <Clock3
//                 size={20}
//                 strokeWidth={1.5}
//                 className="text-[#e8c982]"
//               />
//             </div>

//             <div>
//               <p className="text-xs uppercase tracking-[0.2em] text-[#e8c982]">
//                 Opening Hours
//               </p>

//               <h3 className="mt-2 font-serif text-xl text-white">
//                 We're Open Daily
//               </h3>
//             </div>
//           </div>

//           <div className="mt-5 space-y-3 text-sm">
//             <div className="flex justify-between">
//               <span className="text-white/45">
//                 Monday – Thursday
//               </span>

//               <span className="text-white/75">
//                 11:00 AM – 10:00 PM
//               </span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-white/45">
//                 Friday – Saturday
//               </span>

//               <span className="text-white/75">
//                 11:00 AM – 11:00 PM
//               </span>
//             </div>

//             <div className="flex justify-between">
//               <span className="text-white/45">
//                 Sunday
//               </span>

//               <span className="text-white/75">
//                 12:00 PM – 10:00 PM
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Contact */}
//         <div className="pt-7">
//           <div className="flex items-center gap-5">
//             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#d6ad60]/30 bg-[#d6ad60]/10">
//               <Phone
//                 size={20}
//                 strokeWidth={1.5}
//                 className="text-[#e8c982]"
//               />
//             </div>

//             <div>
//               <p className="text-xs uppercase tracking-[0.2em] text-[#e8c982]">
//                 Contact Us
//               </p>

//               <a
//                 href="tel:+8801409658800"
//                 className="mt-2 block font-serif text-xl text-white transition hover:text-[#e8c982]"
//               >
//                 +8801409658800"
//               </a>

//               <a
//                 href="akshisher@gmail.com"
//                 className="mt-1 block text-sm text-white/40 transition hover:text-[#e8c982]"
//               >
//                 akshisher@gmail.com
//               </a>
//             </div>
//           </div>

//           {/* Directions */}
//           <a
//             href="https://www.google.com/maps"
//             target="_blank"
//             rel="noreferrer"
//             className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#d6ad60] px-6 py-3.5 text-sm font-semibold text-[#0d0d0d] transition duration-300 hover:bg-[#e8c982]"
//           >
//             Get Directions

//             <ArrowRight
//               size={17}
//               className="transition-transform duration-300 group-hover:translate-x-1"
//             />
//           </a>
//         </div>
//       </div>
//     </div>
//   </div>
// </section>


// {/* Footer */}
// <footer className="border-t border-white/10 bg-[#090909] px-5 pt-16 sm:px-8 lg:px-10">
//   <div className="mx-auto max-w-7xl">

//     {/* Footer Top */}
//     <div className="grid gap-12 pb-14 md:grid-cols-2 lg:grid-cols-4">

//       {/* Brand */}
//       <div className="lg:col-span-2">
//         <a href="#" className="inline-flex items-center gap-3">
//           <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6ad60]/50 bg-[#d6ad60]/10">
//             <span className="text-xl text-[#e8c982]">✦</span>
//           </div>

//           <div>
//             <h2 className="font-serif text-2xl tracking-[0.25em] text-[#f5dfaa]">
//               LUMIÈRE
//             </h2>

//             <p className="mt-1 text-[8px] tracking-[0.35em] text-white/40">
//               PREMIUM RESTAURANT
//             </p>
//           </div>
//         </a>

//         <p className="mt-6 max-w-md text-sm leading-7 text-white/45">
//           Where exceptional flavors, thoughtful hospitality and
//           beautiful moments come together. Welcome to Lumière.
//         </p>

//         {/* Socials */}
//         <div className="mt-7 flex items-center gap-3">
//           <a
//             href="#"
//             aria-label="Instagram"
//             className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs text-white/50 transition duration-300 hover:border-[#d6ad60]/50 hover:text-[#e8c982]"
//           >
//             IG
//           </a>

//           <a
//             href="#"
//             aria-label="Facebook"
//             className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs text-white/50 transition duration-300 hover:border-[#d6ad60]/50 hover:text-[#e8c982]"
//           >
//             FB
//           </a>

//           <a
//             href="#"
//             aria-label="TikTok"
//             className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs text-white/50 transition duration-300 hover:border-[#d6ad60]/50 hover:text-[#e8c982]"
//           >
//             TK
//           </a>
//         </div>
//       </div>

//       {/* Quick Links */}
//       <div>
//         <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-[#e8c982]">
//           Explore
//         </h3>

//         <div className="mt-6 flex flex-col gap-4">
//           <a
//             href="#"
//             className="text-sm text-white/45 transition hover:text-[#e8c982]"
//           >
//             Home
//           </a>

//           <a
//             href="#menu"
//             className="text-sm text-white/45 transition hover:text-[#e8c982]"
//           >
//             Our Menu
//           </a>

//           <a
//             href="#about"
//             className="text-sm text-white/45 transition hover:text-[#e8c982]"
//           >
//             Our Story
//           </a>

//           <a
//             href="#gallery"
//             className="text-sm text-white/45 transition hover:text-[#e8c982]"
//           >
//             Gallery
//           </a>

//           <a
//             href="#reviews"
//             className="text-sm text-white/45 transition hover:text-[#e8c982]"
//           >
//             Reviews
//           </a>
//         </div>
//       </div>

//       {/* Contact */}
//       <div>
//         <h3 className="text-xs font-medium uppercase tracking-[0.25em] text-[#e8c982]">
//           Contact
//         </h3>

//         <div className="mt-6 space-y-5">
//           <div>
//             <p className="text-xs uppercase tracking-wider text-white/25">
//               Address
//             </p>

//             <p className="mt-2 text-sm leading-6 text-white/50">
//               123 Grand Avenue,
//               <br />
//               Downtown, Your City
//             </p>
//           </div>

//           <div>
//             <p className="text-xs uppercase tracking-wider text-white/25">
//               Phone
//             </p>

//             <a
//               href="tel:+1234567890"
//               className="mt-2 block text-sm text-white/50 transition hover:text-[#e8c982]"
//             >
//               +1 (234) 567-890
//             </a>
//           </div>

//           <div>
//             <p className="text-xs uppercase tracking-wider text-white/25">
//               Email
//             </p>

//             <a
//               href="mailto:hello@lumiere.com"
//               className="mt-2 block text-sm text-white/50 transition hover:text-[#e8c982]"
//             >
//               hello@lumiere.com
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Bottom */}
//     <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
//       <p className="text-xs text-white/30">
//         © 2026 Lumière Restaurant. All rights reserved.
//       </p>

//       <div className="flex items-center justify-center gap-5 sm:justify-end">
//         <a
//           href="#"
//           className="text-xs text-white/30 transition hover:text-[#e8c982]"
//         >
//           Privacy Policy
//         </a>

//         <span className="h-3 w-px bg-white/10" />

//         <a
//           href="#"
//           className="text-xs text-white/30 transition hover:text-[#e8c982]"
//         >
//           Terms
//         </a>
//       </div>
//     </div>

//   </div>
// </footer>
//     </main>
//   );
// }

// export default Home;

import HeroSection from "../components/HeroSection";
import PopularDishes from "../components/PopularDishes";
import AboutSection from "../components/AboutSection";
import ChefSpecial from "../components/ChefSpecial";
import WhyChooseUs from "../components/WhyChooseUs";
import ReviewsSection from "../components/ReviewsSection";
import GallerySection from "../components/GallerySection";
import LocationSection from "../components/LocationSection";
// import Footer from "../components/Footer";

function Home() {
  return (
    <main>
      <HeroSection />
      <PopularDishes />
      <AboutSection />
      <ChefSpecial />
      <WhyChooseUs />
      <ReviewsSection />
      <GallerySection />
      <LocationSection />
      {/* <Footer /> */}
    </main>
  );
}

export default Home;