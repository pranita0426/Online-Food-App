import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      
      {/* Hero Section */}
      <section className="bg-linear-to-r from-orange-300 to-red-500 text-white py-20 px-6 text-center mt-30">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About QuickBite
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl opacity-90">
          Fast. Fresh. Delivered.
        </p>
      </section>

      {/* About Content */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          
          {/* Left Text */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-orange-500">
              Who We Are
            </h2>
            <p className="mb-4 text-lg leading-relaxed">
              <strong>QuickBite</strong> is a modern online food delivery platform
              designed to bring your favorite meals straight to your doorstep.
              We partner with trusted local restaurants to ensure fast,
              hygienic, and reliable delivery services.
            </p>
            <p className="mb-4 text-lg leading-relaxed">
              Our goal is simple — make food ordering quick, easy,
              and enjoyable. Whether you're craving street food,
              traditional dishes, or international cuisine,
              QuickBite delivers it fresh and on time.
            </p>
          </div>

          {/* Right Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
              alt="Food Delivery"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          
          <div className="p-6 shadow-lg rounded-2xl hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-orange-500 mb-4">
              Our Mission
            </h3>
            <p>
              To deliver quality food quickly and affordably while
              supporting local restaurants and communities.
            </p>
          </div>

          <div className="p-6 shadow-lg rounded-2xl hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-orange-500 mb-4">
              Our Vision
            </h3>
            <p>
              To become the most trusted and loved food delivery
              platform by ensuring customer satisfaction every time.
            </p>
          </div>

          <div className="p-6 shadow-lg rounded-2xl hover:shadow-xl transition">
            <h3 className="text-2xl font-semibold text-orange-500 mb-4">
              Why Choose Us
            </h3>
            <p>
              ✔ Fast Delivery <br />
              ✔ Secure Payments <br />
              ✔ Wide Restaurant Network <br />
              ✔ 24/7 Customer Support
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-300 text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">
          Experience QuickBite Today!
        </h2>
        <p className="mb-6 text-lg">
          Order your favorite meals in just a few clicks.
        </p>
        <button className="bg-white text-orange-300 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
          Order Now
        </button>
      </section>

    </div>
  );
};

export default About;
