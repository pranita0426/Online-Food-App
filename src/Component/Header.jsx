import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { SiFoodpanda } from "react-icons/si";


const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    {name: "Login", href: "/login"},
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-amber-300 shadow-md z-50 ">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="flex items-center sticky top-0 bg-transparent">
          <SiFoodpanda  className="h-10 w-20" />
          <p>QuickBite</p>

          {/* <a href="/">
            <img
              src="/logo.png"
              alt="Poke Restaurant"
              className="h-10 w-auto object-contain"
            />
          </a> */}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-800 hover:text-green-600 font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <a href="/cart" className="text-gray-800 hover:text-green-600">
            <AiOutlineShoppingCart size={24} />
          </a>

          {/* Order Button */}
          <a
            href="/order"
            className="hidden md:inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Order Now
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-800"
            onClick={toggleMobileMenu}
          >
            {mobileOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col py-4 px-6 space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block text-gray-800 text-lg font-medium"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/order"
                className="block bg-green-600 text-white text-center py-2 rounded-lg"
              >
                Order Now
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;