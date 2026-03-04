import React, { useEffect, useState } from 'react'
import { SiFoodpanda } from 'react-icons/si'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'

const foodIcons = ['🍕', '🍔', '🍟', '🥤', '🌮', '🍩']

const FloatingIcon = ({ icon, top, left, size, delay, duration, rotate, opacity }) => (
  <div
    style={{
      position: 'absolute',
      top: `${top}%`,
      left: `${left}%`,
      fontSize: `${size}px`,
      opacity,
      transform: `rotate(${rotate}deg)`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      textShadow: '2px 2px 6px rgba(0,0,0,0.4)',
    }}
    className="animate-float-diagonal select-none pointer-events-none"
  >
    {icon}
  </div>
)

const Footer = () => {
  const [fadeIn, setFadeIn] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <footer className="relative bg-black text-gray-100 overflow-hidden pt-12">
      {/* Floating food icons in the footer */}
      {foodIcons.map((icon, i) => (
        <FloatingIcon
          key={i}
          icon={icon}
          top={Math.random() * 50}
          left={Math.random() * 100}
          size={20 + Math.random() * 30}
          delay={Math.random() * 5}
          duration={12 + Math.random() * 8}
          rotate={Math.random() * 360}
          opacity={0.3 + Math.random() * 0.4}
        />
      ))}

      {/* Footer Content */}
      <div className={`container mx-auto px-6 transition-all duration-1000 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4 animate-pulse">
              <SiFoodpanda className="text-3xl text-white" />
              <span className="text-xl font-semibold">QuickBite</span>
            </div>
            <p className="text-sm text-gray-300">
              Delicious food delivered fast. Quality ingredients, crafted recipes, and a seamless ordering experience.
            </p>
          </div>

          {/* Quick Links */}
          <div className="relative z-10">
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              {['Home', 'Menu', 'Order', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`/${link.toLowerCase().replace(/ /g, '-')}`} className="hover:text-white hover:scale-105 transition-transform duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="relative z-10">
            <h4 className="font-semibold mb-3">Contact</h4>
            <div className="text-gray-300 text-sm space-y-2">
              <div className="flex items-center gap-2">
                <AiOutlinePhone />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <AiOutlineMail />
                <span>hello@quickbite.example</span>
              </div>
              <div>123 Food Street, City</div>
            </div>
          </div>

          {/* Social & Subscribe */}
          <div className="relative z-10">
            <h4 className="font-semibold mb-3">Follow Us</h4>
            <div className="flex items-center gap-3 mb-4">
              {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded bg-gray-800 hover:bg-gray-700 transform hover:scale-110 hover:shadow-lg transition-all duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-400">Subscribe for updates and special offers.</p>
            <form className="mt-3 flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-l bg-gray-900 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gradient-orange transition duration-300"
              />
              <button className="px-4 py-2 bg-linear-to-r from-orange-400 via-yellow-400 to-green-500 text-white rounded-r hover:shadow-xl hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500 relative z-10">
          © {new Date().getFullYear()} QuickBite. All rights reserved.
        </div>
      </div>

      {/* Keyframes for floating icons */}
      <style>{`
        @keyframes float-diagonal {
          0% { transform: translate(0,0) rotate(0deg); }
          50% { transform: translate(15px, -25px) rotate(180deg); }
          100% { transform: translate(0,0) rotate(360deg); }
        }
        .animate-float-diagonal {
          animation: float-diagonal linear infinite;
        }
        .focus\\:ring-gradient-orange:focus {
          box-shadow: 0 0 10px 2px rgba(255,165,0,0.7);
        }
      `}</style>
    </footer>
  )
}

export default Footer
