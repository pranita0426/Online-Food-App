import React from "react";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

const foodItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    price: "$12.99",
    calories: "680 kcal",
    description:
      "Classic Italian pizza with fresh tomatoes, mozzarella, basil, and a drizzle of olive oil.",
    img: " https://img.freepik.com/premium-photo/margherita-pizza-hd-8k-wallpaper-stock-photographic-image_853645-43054.jpg",
  },
  {
    id: 2,
    name: "Spicy Ramen",
    price: "$10.50",
    calories: "560 kcal",
    description:
      "Rich pork broth, springy noodles, soft-boiled egg, scallions and chili oil for a spicy kick.",
    img: " https://img.freepik.com/premium-photo/photo-japanese-ramen-spicy-sauce-ancient-food_1268098-314.jpg",
  },
  {
    id: 3,
    name: "Caesar Salad",
    price: "$8.25",
    calories: "320 kcal",
    description:
      "Crisp romaine, shaved parmesan, crunchy croutons, and house-made Caesar dressing.",
    img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Grilled Salmon",
    price: "$15.00",
    calories: "450 kcal",
    description:
      "Lightly seasoned grilled salmon served with lemon butter and seasonal vegetables.",
    img: "https://recipeslily.com/wp-content/uploads/2025/05/grilled-salmon-2-new.webp",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pt-24 container mx-auto px-6 pb-20">
        {/* Hero */}
        <section className="bg-white rounded-lg shadow p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
                Welcome to QuickBite
              </h1>
              <p className="mt-3 text-gray-600">
                Delicious meals delivered fast — explore our chef favorites
                below. Tap any item for full details and place your order.
              </p>
              <div className="mt-4">
                <a
                  href="/menu"
                  className="inline-block bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  View Full Menu
                </a>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
                alt="Delicious spread"
                className="w-full rounded-lg object-cover shadow"
              />
            </div>
          </div>
        </section>

        {/* Food Grid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Chef's Picks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-5 ">
            {foodItems.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-lg shadow overflow-hidden flex flex-col"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <span className="text-green-600 font-bold">{item.price}</span>
                  </div>

                  <p className="mt-2 text-sm text-gray-600 flex-1">
                    {item.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-500">{item.calories}</span>
                    <div className="flex items-center gap-2">
                      <button className="bg-amber-400 text-white px-3 py-1 rounded hover:opacity-90">
                        Add
                      </button>
                      <a
                        href={`/menu#${item.id}`}
                        className="text-sm text-green-600 hover:underline"
                      >
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;