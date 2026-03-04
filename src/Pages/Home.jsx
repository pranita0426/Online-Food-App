import React from 'react';
import { menuItems } from '../Data/menuData';

const categories = [
  { id: 1, name: 'Pizza', image: 'https://img.icons8.com/color/96/pizza.png' },
  { id: 2, name: 'Burger', image: 'https://img.icons8.com/color/96/hamburger.png' },
  { id: 3, name: 'Sushi', image: 'https://img.icons8.com/color/96/sushi.png' },
  { id: 4, name: 'Desserts', image: 'https://img.icons8.com/color/96/cake.png' },
  { id: 5, name: 'Drinks', image: 'https://img.icons8.com/color/96/cocktail.png' },
  { id: 6, name: 'Salads', image: 'https://img.icons8.com/color/96/salad.png' },
];

const testimonials = [
  { id: 1, name: 'Sarah K.', photo: 'https://randomuser.me/api/portraits/women/65.jpg', rating: 5, message: 'Amazing food and super quick delivery!' },
  { id: 2, name: 'John D.', photo: 'https://randomuser.me/api/portraits/men/32.jpg', rating: 4.5, message: 'Loved the variety and quality of the dishes!' },
  { id: 3, name: 'Emily R.', photo: 'https://randomuser.me/api/portraits/women/44.jpg', rating: 5, message: 'Best online food experience I have had!' },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔥 HERO VIDEO SECTION */}
      <section className="relative h-[650px] md:h-[750px] overflow-hidden mt-10">

        {/* 🎥 Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/video/burger-video.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center h-full">
          <div className="container mx-auto px-6 text-white">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
              Fresh & Hot Deliveries 
            </h1>
            <p className="text-sm md:text-lg mb-6">
              Delicious meals delivered to your doorstep in minutes
            </p>

            <div className="space-x-3">
              <a
                href="/menu"
                className="inline-block bg-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Order Now
              </a>

              <a
                href="#featured"
                className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                View Menu
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* ⭐ Popular Categories */}
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold mb-6">Popular Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map(cat => (
            <div key={cat.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:scale-105 transition">
              <img src={cat.image} alt={cat.name} className="w-16 h-16 mb-2" />
              <span className="text-sm font-medium">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>


      {/* white backgroun section */}

          
    <section className="relative w-full min-h-[500px] bg-white overflow-hidden flex items-center justify-center py-16 px-6">

      {/* ── Decorative curved SVG lines ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Top-left oval */}
        <ellipse cx="18%" cy="18%" rx="160" ry="90"
          fill="none" stroke="#f9c0cc" strokeWidth="1.2" />
        {/* Big right-side curve */}
        <path
          d="M 900 0 C 1100 200, 1000 400, 1200 500"
          fill="none" stroke="#f9c0cc" strokeWidth="1.2"
        />
        {/* Bottom-left curve */}
        <path
          d="M 0 400 C 150 350, 250 450, 350 380"
          fill="none" stroke="#f9c0cc" strokeWidth="1.2"
        />
      </svg>

      {/* ── Floating leaf top-center ── */}
      <span
        className="absolute text-2xl select-none"
        style={{ top: "7%", left: "32%" }}
      >
        🌿
      </span>

      {/* ── Tomato slices ── */}
      <span
        className="absolute text-3xl select-none rotate-12"
        style={{ bottom: "12%", left: "9%" }}
      >
        🍅
      </span>
      <span
        className="absolute text-2xl select-none -rotate-6"
        style={{ top: "32%", right: "22%" }}
      >
        🍅
      </span>

      {/* ── Burger — left ── */}
      <div
        className="absolute select-none"
        style={{ left: "10%", top: "50%", transform: "translateY(-50%)" }}
      >
        <span style={{ fontSize: "140px", lineHeight: 1 }}>🍔</span>
      </div>

      {/* ── Dim sum / momos — top right ── */}
      <div
        className="absolute select-none"
        style={{ right: "8%", top: "5%" }}
      >
        <span style={{ fontSize: "120px", lineHeight: 1 }}>🥟</span>
      </div>

      {/* ── Pizza slice — bottom right ── */}
      <div
        className="absolute select-none rotate-12"
        style={{ right: "6%", bottom: "6%" }}
      >
        <span style={{ fontSize: "120px", lineHeight: 1 }}>🍕</span>
      </div>

      {/* ── Centre text ── */}
      <div className="relative z-10 text-center max-w-xl mx-auto">
        <h1
          className="text-5xl md:text-6xl font-extrabold leading-tight mb-6"
          style={{ color: "#e8334a" }}
        >
          Better food for<br />more people
        </h1>
        <p className="text-gray-500 text-lg md:text-xl leading-relaxed">
          For over a decade, we've enabled our<br />
          customers to discover new tastes,<br />
          delivered right to their doorstep
        </p>
      </div>
    </section>



      {/* ⭐ Featured Items */}
      <section id="featured" className="container mx-auto px-6 py-12">
        <div className="flex justify-between mb-6">
          <h3 className="text-2xl font-semibold">Featured</h3>
          <a href="/menu" className="text-green-600">View full menu</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {menuItems.slice(0,4).map(it => (
            <div key={it.id} className="bg-white rounded-lg shadow hover:shadow-xl transition">
              <img src={it.image} alt={it.name} className="w-full h-44 object-cover" />
              <div className="p-4">
                <div className="flex justify-between">
                  <h4 className="font-semibold">{it.name}</h4>
                  <span className="text-green-600 font-bold">₹{it.price.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">{it.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ⭐ Testimonials */}
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold text-center mb-8">What Our Customers Say</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(c => (
            <div key={c.id} className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center mb-4">
                <img src={c.photo} alt={c.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h5 className="font-semibold">{c.name}</h5>
                </div>
              </div>
              <p className="text-gray-600 italic">"{c.message}"</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;








// import React, { useEffect, useState } from 'react';
// import { menuItems } from '../Data/menuData';

// const slides = [
//   {
//     id: 1,
//     title: 'Fresh & Hot Deliveries',
//     subtitle: 'Delivered to your door in minutes',
//     image: 'https://img.freepik.com/free-psd/food-menu-restaurant-facebook-cover-banner-template_120329-4875.jpg?semt=ais_hybrid&w=740&q=80'
//   },
//   {
//     id: 2,
//     title: 'Chef Specials',
//     subtitle: 'Handcrafted by our chefs',
//     image: 'https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?auto=format&fit=crop&w=1400&q=80'
//   },
//   {
//     id: 3,
//     title: 'Feel Good Food',
//     subtitle: 'Healthy and delicious options',
//     image: 'https://images.unsplash.com/photo-1543785734-4a6b9a2b9b4a?auto=format&fit=crop&w=1400&q=80'
//   }
// ];

// // Popular Categories Data
// const categories = [
//   { id: 1, name: 'Pizza', image: 'https://img.icons8.com/color/96/pizza.png' },
//   { id: 2, name: 'Burger', image: 'https://img.icons8.com/color/96/hamburger.png' },
//   { id: 3, name: 'Sushi', image: 'https://img.icons8.com/color/96/sushi.png' },
//   { id: 4, name: 'Desserts', image: 'https://img.icons8.com/color/96/cake.png' },
//   { id: 5, name: 'Drinks', image: 'https://img.icons8.com/color/96/cocktail.png' },
//   { id: 6, name: 'Salads', image: 'https://img.icons8.com/color/96/salad.png' },
// ];

// // Testimonials Data
// const testimonials = [
//   { id: 1, name: 'Sarah K.', photo: 'https://randomuser.me/api/portraits/women/65.jpg', rating: 5, message: 'Amazing food and super quick delivery!' },
//   { id: 2, name: 'John D.', photo: 'https://randomuser.me/api/portraits/men/32.jpg', rating: 4.5, message: 'Loved the variety and quality of the dishes!' },
//   { id: 3, name: 'Emily R.', photo: 'https://randomuser.me/api/portraits/women/44.jpg', rating: 5, message: 'Best online food experience I have had!' },
// ];

// const Home = () => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const t = setInterval(() => setIndex(i => (i + 1) % slides.length), 4000);
//     return () => clearInterval(t);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">

//       {/* Hero / Carousel */}
//       <section className="relative h-96 md:h-150 overflow-hidden">
//         {slides.map((s, i) => (
//           <div key={s.id} className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
//             <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
//             <div className="absolute inset-0 bg-linear-to-b from-black/50 to-black/25 flex items-center">
//               <div className="container mx-auto px-6 text-white">
//                 <h2 className="text-3xl md:text-5xl font-extrabold animate-fadeIn">{s.title}</h2>
//                 <p className="mt-2 md:text-lg animate-fadeIn delay-200">{s.subtitle}</p>
//                 <div className="mt-4 space-x-3">
//                   <a href="/menu" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">Order Now</a>
//                   <a href="#featured" className="inline-block bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">View Menu</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* Popular Categories */}
//       <section className="container mx-auto px-6 py-12">
//         <h3 className="text-2xl font-semibold mb-6">Popular Categories</h3>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
//           {categories.map(cat => (
//             <div key={cat.id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center cursor-pointer hover:scale-105 transform transition">
//               <img src={cat.image} alt={cat.name} className="w-16 h-16 mb-2" />
//               <span className="text-sm font-medium">{cat.name}</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Featured Items */}
//       <section id="featured" className="container mx-auto px-6 py-12">
//         <div className="flex items-center justify-between mb-6">
//           <h3 className="text-2xl font-semibold">Featured</h3>
//           <a href="/menu" className="text-green-600">View full menu</a>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           {menuItems.slice(0,4).map(it => (
//             <div key={it.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-xl transition relative group">
//               <img src={it.image} alt={it.name} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
//               <div className="p-4">
//                 <div className="flex items-center justify-between">
//                   <h4 className="font-semibold">{it.name}</h4>
//                   <div className="text-green-600 font-bold">${it.price.toFixed(2)}</div>
//                 </div>
//                 <p className="text-sm text-gray-500 mt-2">{it.description}</p>
//               </div>
//               <button className="absolute bottom-3 right-3 bg-green-600 text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition">Add to Cart</button>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* How it works */}
//       <section className="container mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded shadow flex flex-col items-center text-center hover:shadow-xl transition transform hover:-translate-y-1">
//           <div className="text-green-600 text-3xl mb-3">🛒</div>
//           <h4 className="font-semibold mb-2">Browse Menu</h4>
//           <p className="text-gray-600 text-sm">Select your favorite items easily</p>
//         </div>
//         <div className="bg-white p-6 rounded shadow flex flex-col items-center text-center hover:shadow-xl transition transform hover:-translate-y-1">
//           <div className="text-green-600 text-3xl mb-3">💳</div>
//           <h4 className="font-semibold mb-2">Secure Payment</h4>
//           <p className="text-gray-600 text-sm">Safe & fast checkout options</p>
//         </div>
//         <div className="bg-white p-6 rounded shadow flex flex-col items-center text-center hover:shadow-xl transition transform hover:-translate-y-1">
//           <div className="text-green-600 text-3xl mb-3">🚀</div>
//           <h4 className="font-semibold mb-2">Fast Delivery</h4>
//           <p className="text-gray-600 text-sm">Hot food delivered to your door</p>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="container mx-auto px-6 py-12">
//         <h3 className="text-2xl font-semibold mb-8 text-center">What Our Customers Say</h3>
//         <div className="grid md:grid-cols-3 gap-6">
//           {testimonials.map(cust => (
//             <div key={cust.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
//               <div className="flex items-center mb-4">
//                 <img src={cust.photo} alt={cust.name} className="w-12 h-12 rounded-full mr-4" />
//                 <div>
//                   <h5 className="font-semibold">{cust.name}</h5>
//                   <div className="flex text-yellow-400">
//                     {Array.from({ length: 5 }, (_, i) => (
//                       <svg
//                         key={i}
//                         className={`w-4 h-4 ${i < Math.floor(cust.rating) ? 'fill-current' : 'fill-gray-300'}`}
//                         xmlns="http://www.w3.org/2000/svg"
//                         viewBox="0 0 20 20"
//                       >
//                         <path d="M10 15l-5.878 3.09 1.123-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.757 4.635 1.123 6.545z" />
//                       </svg>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//               <p className="text-gray-600 italic">"{cust.message}"</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Newsletter */}
//       <section className="bg-green-600 py-12 mt-12">
//         <div className="container mx-auto px-6 text-center text-white">
//           <h3 className="text-2xl md:text-4xl font-bold mb-4">Subscribe for Offers</h3>
//           <p className="mb-6">Get latest discounts and updates directly in your inbox</p>
//           <div className="flex justify-center gap-2 max-w-md mx-auto">
//             <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-l-lg w-full text-black focus:outline-none" />
//             <button className="bg-white text-green-600 px-4 py-2 rounded-r-lg font-semibold hover:bg-gray-100 transition">Subscribe</button>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default Home;









