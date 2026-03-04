import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { SiFoodpanda } from "react-icons/si";
import { menuLinks, menuItems, categories, restaurants } from "../Data/menuData";
import { logoutUser } from "../States/AUTH/Action";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [itemResults, setItemResults] = useState([]);
  const [categoryResults, setCategoryResults] = useState([]);
  const [restaurantResults, setRestaurantResults] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const explorerRef = useRef(null);
  const userMenuRef = useRef(null);

  const navLinks = menuLinks;

  // Search filtering
  useEffect(() => {
    if (!query) {
      setItemResults([]);
      setCategoryResults([]);
      setRestaurantResults([]);
      return;
    }
    const q = query.toLowerCase();
    setItemResults(menuItems.filter((i) => i.name.toLowerCase().includes(q)));
    setCategoryResults(categories.filter((c) => c.toLowerCase().includes(q)));
    setRestaurantResults(restaurants.filter((r) => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q)));
  }, [query]);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Click outside to close menus
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (explorerRef.current && !explorerRef.current.contains(e.target)) setExplorerOpen(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    // also clear local utilities in case any other component uses them
    import('../utils/auth').then(mod => mod.clearAuth());
    navigate('/auth');
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/70 backdrop-blur-md" : "bg-white shadow-md"}`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 cursor-pointer">
          <SiFoodpanda className="text-3xl text-black" />
          <span className={`text-lg font-bold ${isScrolled ? "text-white" : "text-gray-800"}`}>QuickBite</span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <div className="relative w-full max-w-md">
            <AiOutlineSearch className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg ${isScrolled ? "text-white" : "text-gray-500"}`} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search menu items or categories..."
              className={`w-full pl-10 py-2 rounded-full border focus:outline-none ${isScrolled ? "bg-white/20 text-white placeholder-white border-transparent" : "bg-white text-gray-800 border-gray-200"}`}
            />

            {(itemResults.length || categoryResults.length || restaurantResults.length) > 0 && (
              <div className="absolute left-0 right-0 mt-2 bg-white text-gray-800 rounded shadow-lg z-50">
                {restaurantResults.length > 0 && (
                  <div className="px-3 py-2 border-b">
                    <div className="text-sm font-semibold">Restaurants</div>
                    {restaurantResults.map((r) => (
                      <Link key={r.id} to={`/restaurants#${r.id}`} className="block px-1 py-1 hover:bg-gray-100 rounded">
                        {r.name} <span className="text-xs text-gray-500">· {r.cuisine}</span>
                      </Link>
                    ))}
                  </div>
                )}
                {categoryResults.length > 0 && (
                  <div className="px-3 py-2 border-b">
                    <div className="text-sm font-semibold">Categories</div>
                    {categoryResults.map((c) => (
                      <a key={c} href={`/menu#${c.toLowerCase()}`} className="block px-1 py-1 hover:bg-gray-100 rounded">{c}</a>
                    ))}
                  </div>
                )}
                {itemResults.length > 0 && (
                  <div className="px-3 py-2">
                    <div className="text-sm font-semibold">Items</div>
                    {itemResults.map((r) => (
                      <a key={r.id} href={r.href || `/menu#${r.category.toLowerCase()}`} className="flex justify-between px-1 py-1 hover:bg-gray-100 rounded">
                        <span>{r.name}</span>
                        <span className="text-sm text-gray-500">${r.price.toFixed(2)}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className={isScrolled ? "text-white" : "text-gray-800"}><AiOutlineShoppingCart size={24} /></Link>
          <Link to="/order" className={`hidden md:inline-block px-4 py-2 rounded-lg transition ${isScrolled ? "bg-white text-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}>Order Now</Link>
          {user && (user.role === 'ADMIN' || user.user?.role === 'ADMIN' || user.data?.role === 'ADMIN') && (
            <Link to="/admin/dashboard" className={`hidden md:inline-block ml-2 px-4 py-2 rounded-lg transition ${isScrolled ? "bg-white text-red-600" : "bg-red-600 text-white hover:bg-red-700"}`}>Admin</Link>
          )}

          {/* User menu */}
          {user ? (
            <div ref={userMenuRef} className="relative hidden md:block">
              <button className={`flex items-center gap-2 px-3 py-2 font-medium ${isScrolled ? 'text-white' : 'text-gray-800'}`} onClick={() => setUserMenuOpen(!userMenuOpen)}>
                {user.name || user.email}
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded shadow-lg p-2 z-50">
                  <Link to="/profile" className="block px-3 py-2 hover:bg-gray-100 rounded">Profile</Link>
                  <button onClick={handleLogout} className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
  to="/login"
  className={`hidden md:inline text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
    isScrolled
      ? 'bg-white text-black-600 hover:bg-green-50'
      : 'bg-blue-500 text-black hover:bg-green-700'
  }`}
>
  Log in
</Link>

<Link
  to="/signup"
  className={`hidden md:inline ml-3 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 ${
    isScrolled
      ? 'bg-white text-black-600 hover:bg-green-50'
      : 'bg-blue-400 text-black-600 hover:bg-green-50'
  }`}
>
  Sign up
</Link>

            </>
          )}

          {/* Explorer */}
          
          <div ref={explorerRef} className="relative hidden md:block">
            <button onClick={() => setExplorerOpen(!explorerOpen)} className={`flex items-center gap-2 px-3 py-2 font-medium transition ${isScrolled ? "text-white" : "text-gray-800 hover:text-green-600"}`}>
              Explorer
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${explorerOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            {explorerOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded shadow-lg p-2 z-50">
                {navLinks.map((link) => (
                  <Link key={link.name} to={link.href} className="block px-3 py-2 hover:bg-gray-100 rounded">{link.name}</Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button className={`${isScrolled ? "text-white" : "text-gray-800"} md:hidden`} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <ul className="flex flex-col py-4 px-6 space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.href} className="block text-gray-800 text-lg font-medium" onClick={() => setMobileOpen(false)}>{link.name}</Link>
              </li>
            ))}
            <li>
              <Link to="/order" className="block bg-green-600 text-white text-center py-2 rounded-lg" onClick={() => setMobileOpen(false)}>Order Now</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;







// import { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
// import { SiFoodpanda } from "react-icons/si";
// import { menuLinks, menuItems, categories, restaurants } from "../Data/menuData";
// import { getUser, clearAuth } from "../utils/auth";

// const Header = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [explorerOpen, setExplorerOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const [itemResults, setItemResults] = useState([]);
//   const [categoryResults, setCategoryResults] = useState([]);
//   const [restaurantResults, setRestaurantResults] = useState([]);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const explorerRef = useRef(null);
//   const [user, setUser] = useState(getUser());

//   useEffect(() => {
//     if (!query) {
//       setItemResults([]);
//       setCategoryResults([]);
//       setRestaurantResults([]);
//       return;
//     }
//     const q = query.toLowerCase();
//     setItemResults(menuItems.filter((i) => i.name.toLowerCase().includes(q)));
//     setCategoryResults(categories.filter((c) => c.toLowerCase().includes(q)));
//     setRestaurantResults(restaurants.filter((r) => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q)));
//   }, [query]);

//   useEffect(() => {
//     const onScroll = () => setIsScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", onScroll);
//     onScroll();
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (explorerRef.current && !explorerRef.current.contains(e.target)) setExplorerOpen(false);
//     };
//     if (explorerOpen) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [explorerOpen]);

//   useEffect(() => {
//     const onAuth = () => setUser(getUser());
//     window.addEventListener("authChanged", onAuth);
//     return () => window.removeEventListener("authChanged", onAuth);
//   }, []);

//   const handleLogout = () => {
//     clearAuth();
//     window.dispatchEvent(new Event("authChanged"));
//     setUser(null);
//   };

//   return (
//     <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/70 backdrop-blur-md" : "bg-white shadow-md"}`}>
//       <div className="container mx-auto flex items-center justify-between h-16 px-6">
//         <Link to="/" className="flex items-center gap-1 cursor-pointer">
//           <SiFoodpanda className="text-3xl text-black-600" />
//           <span className={`text-lg font-bold ${isScrolled ? "text-white" : "text-gray-800"}`}>QuickBite</span>
//         </Link>

//         <div className="hidden md:flex flex-1 justify-center px-4">
//           <div className="relative w-full max-w-md">
//             <AiOutlineSearch className={`absolute left-4 top-1/2 -translate-y-1/2 text-lg ${isScrolled ? "text-white" : "text-gray-500"}`} />
//             <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="       Search menu items or categories..." className={`w-full px-4 py-2 rounded-full border focus:outline-none ${isScrolled ? "bg-white/20 text-white placeholder-white border-transparent" : "bg-white text-gray-800 border-gray-200"}`} />

//             {(itemResults.length > 0 || categoryResults.length > 0 || restaurantResults.length > 0) && (
//               <div className="absolute left-0 right-0 mt-2 bg-white text-gray-800 rounded shadow-lg z-50">
//                 {restaurantResults.length > 0 && (
//                   <div className="px-3 py-2 border-b">
//                     <div className="text-sm font-semibold">Restaurants</div>
//                     {restaurantResults.map((r) => (
//                       <Link key={r.id} to={`/restaurants#${r.id}`} className="block px-1 py-1 hover:bg-gray-100 rounded">{r.name} <span className="text-xs text-gray-500">· {r.cuisine}</span></Link>
//                     ))}
//                   </div>
//                 )}
//                 {categoryResults.length > 0 && (
//                   <div className="px-3 py-2 border-b">
//                     <div className="text-sm font-semibold">Categories</div>
//                     {categoryResults.map((c) => (
//                       <a key={c} href={`/menu#${c.toLowerCase()}`} className="block px-1 py-1 hover:bg-gray-100 rounded">{c}</a>
//                     ))}
//                   </div>
//                 )}
//                 {itemResults.length > 0 && (
//                   <div className="px-3 py-2">
//                     <div className="text-sm font-semibold">Items</div>
//                     {itemResults.map((r) => (
//                       <a key={r.id} href={r.href || `/menu#${r.category.toLowerCase()}`} className="flex justify-between px-1 py-1 hover:bg-gray-100 rounded"><span>{r.name}</span><span className="text-sm text-gray-500">${r.price.toFixed(2)}</span></a>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="flex items-center gap-4">
//           <Link to="/cart" className={isScrolled ? "text-white" : "text-gray-800"}><AiOutlineShoppingCart size={24} /></Link>

//           <Link to="/order" className={`hidden md:inline-block px-4 py-2 rounded-lg transition ${isScrolled ? "bg-white text-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}>Order Now</Link>

//           {user ? (
//             <div className="relative hidden md:block">
//               <button className={`flex items-center gap-2 px-3 py-2 font-medium ${isScrolled ? 'text-white' : 'text-gray-800'}`} onClick={() => setExplorerOpen(!explorerOpen)}>
//                 <span>{user.name || user.email}</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${explorerOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
//               </button>

//               {explorerOpen && (
//                 <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded shadow-lg p-2 z-50">
//                   <Link to="/profile" className="block px-3 py-2 hover:bg-gray-100 rounded">Profile</Link>
//                   <button onClick={handleLogout} className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">Logout</button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <>
//               <Link to="/login" className={`hidden md:inline text-sm font-medium ${isScrolled ? 'text-white' : 'text-gray-800 hover:text-green-600'}`}>Log in</Link>
//               <Link to="/signup" className={`hidden md:inline ml-2 text-sm font-medium ${isScrolled ? 'text-white' : 'text-gray-800 hover:text-green-600'}`}>Sign up</Link>
//             </>
//           )}

//           <div ref={explorerRef} className="relative hidden md:block">
//             <button onClick={() => setExplorerOpen(!explorerOpen)} className={`flex items-center gap-2 px-3 py-2 font-medium transition ${isScrolled ? "text-white" : "text-gray-800 hover:text-green-600"}`}>
//               Explorer
//               <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${explorerOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
//             </button>

//             {explorerOpen && (
//               <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded shadow-lg p-2 z-50">
//                 {menuLinks.map((link) => (
//                   <Link key={link.name} to={link.href} className="block px-3 py-2 hover:bg-gray-100 rounded">{link.name}</Link>
//                 ))}
//               </div>
//             )}
//           </div>

//           <button className={`${isScrolled ? "text-white" : "text-gray-800"} md:hidden`} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}</button>
//         </div>
//       </div>

//       {mobileOpen && (
//         <nav className="md:hidden bg-white border-t border-gray-200">
//           <ul className="flex flex-col py-4 px-6 space-y-4">
//             {menuLinks.map((link) => (
//               <li key={link.name}><Link to={link.href} className="block text-gray-800 text-lg font-medium" onClick={() => setMobileOpen(false)}>{link.name}</Link></li>
//             ))}
//             <li><Link to="/order" className="block bg-green-600 text-white text-center py-2 rounded-lg" onClick={() => setMobileOpen(false)}>Order Now</Link></li>
//           </ul>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;

//                 {itemResults.length > 0 && (
//                   <div className="px-3 py-2">
//                     <div className="text-sm font-semibold">Items</div>
//                     {itemResults.map((r) => (
//                       <a
//                         key={r.id}
//                         href={
//                           r.href || `/menu#${r.category.toLowerCase()}`
//                         }
//                         className="flex justify-between px-1 py-1 hover:bg-gray-100 rounded"
//                       >
//                         <span>{r.name}</span>
//                         <span className="text-sm text-gray-500">
//                           ${r.price.toFixed(2)}
//                         </span>
//                       </a>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ================= RIGHT SIDE ================= */}
//         <div className="flex items-center gap-4">
//           {/* Cart */}
//           <Link
//             to="/cart"
//             className={isScrolled ? "text-white" : "text-gray-800"}
//           >
//             <AiOutlineShoppingCart size={24} />
//           </Link>

//           {/* Order Button */}
//           <Link
//             to="/order"
//             className={`hidden md:inline-block px-4 py-2 rounded-lg transition ${
//               isScrolled
//                 ? "bg-white text-green-600"
//                 : "bg-green-600 text-white hover:bg-green-700"
//             }`}
//           >
//             Order Now
//           </Link>

//           {/* Auth controls */}
//           {user ? (
//             <div className="relative hidden md:block">
//               <button className={`flex items-center gap-2 px-3 py-2 font-medium ${isScrolled ? 'text-white' : 'text-gray-800'}`} onClick={()=>setExplorerOpen(!explorerOpen)}>
//                 {user.name || user.email}
//                 <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${explorerOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
//               </button>

//               {explorerOpen && (
//                 <div className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded shadow-lg p-2 z-50">
//                   <Link to="/profile" className="block px-3 py-2 hover:bg-gray-100 rounded">Profile</Link>
//                   <button onClick={handleLogout} className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded">Logout</button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <>
//               <Link to="/login" className={`hidden md:inline text-sm font-medium ${isScrolled ? 'text-white' : 'text-gray-800 hover:text-green-600'}`}>Log in</Link>
//               <Link to="/signup" className={`hidden md:inline ml-2 text-sm font-medium ${isScrolled ? 'text-white' : 'text-gray-800 hover:text-green-600'}`}>Sign up</Link>
//             </>
//           )}

//           {/* Explorer */}
//           <div ref={explorerRef} className="relative hidden md:block">
//             <button
//               onClick={() => setExplorerOpen(!explorerOpen)}
//               className={`flex items-center gap-2 px-3 py-2 font-medium transition ${
//                 isScrolled
//                   ? "text-white"
//                   : "text-gray-800 hover:text-green-600"
//               }`}
//             >
//               Explorer
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className={`h-4 w-4 transition-transform ${
//                   explorerOpen ? "rotate-180" : ""
//                 }`}
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>

//             {explorerOpen && (
//               <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded shadow-lg p-2 z-50">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.name}
//                     to={link.href}
//                     className="block px-3 py-2 hover:bg-gray-100 rounded"
//                   >
//                     {link.name}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             className={`${isScrolled ? "text-white" : "text-gray-800"} md:hidden`}
//             onClick={toggleMobileMenu}
//           >
//             {mobileOpen ? (
//               <AiOutlineClose size={24} />
//             ) : (
//               <AiOutlineMenu size={24} />
//             )}
//           </button>
//         </div>
//       </div>

//       {/* ================= MOBILE MENU ================= */}
//       {mobileOpen && (
//         <nav className="md:hidden bg-white border-t border-gray-200">
//           <ul className="flex flex-col py-4 px-6 space-y-4">
//             {navLinks.map((link) => (
//               <li key={link.name}>
//                 <Link
//                   to={link.href}
//                   className="block text-gray-800 text-lg font-medium"
//                   onClick={() => setMobileOpen(false)}
//                 >
//                   {link.name}
//                 </Link>
//               </li>
//             ))}

//             <li>
//               <Link
//                 to="/order"
//                 className="block bg-green-600 text-white text-center py-2 rounded-lg"
//                 onClick={() => setMobileOpen(false)}
//               >
//                 Order Now
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;













// import { useState, useEffect, useRef } from "react";
// import { AiOutlineMenu, AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
// import { SiFoodpanda } from "react-icons/si";
// import { menuLinks, menuItems, categories } from "../Data/menuData";


// const Header = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [explorerOpen, setExplorerOpen] = useState(false);
//   const [mobileExplorerOpen, setMobileExplorerOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const [itemResults, setItemResults] = useState([]);
//   const [categoryResults, setCategoryResults] = useState([]);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const explorerRef = useRef(null);

//   const toggleMobileMenu = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const navLinks = menuLinks;

//   useEffect(() => {
//     if (!query) {
//       setItemResults([]);
//       setCategoryResults([]);
//       return;
//     }
//     const q = query.toLowerCase();
//     setItemResults(menuItems.filter((i) => i.name.toLowerCase().includes(q)));
//     setCategoryResults(categories.filter((c) => c.toLowerCase().includes(q)));
//   }, [query]);

//   useEffect(() => {
//     const onScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", onScroll);
//     onScroll();
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // close explorer on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (explorerRef.current && !explorerRef.current.contains(e.target)) {
//         setExplorerOpen(false);
//       }
//     };
//     if (explorerOpen) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [explorerOpen]);

//   return (
//     <header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isScrolled ? "bg-transparent" : "bg-white-300 shadow-md"}`}>
//       <div className="container mx-auto flex items-center justify-between py-4 px-6">
//         {/* Logo */}
//         <div className="flex items-center sticky top-0 bg-transparent">
//           <SiFoodpanda className="h-10 w-20 text-2xl" />
//           <p className={`${isScrolled ? "text-white ml-2 font-semibold" : "text-gray-800 ml-2 font-semibold"}`}>QuickBite</p>
//         </div>

//         {/* Center: Search (desktop only) */}
//         <div className="hidden md:flex flex-1 justify-center px-4">
//           <div className="relative w-full max-w-md">
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search menu items or categories..."
//               className={`w-full px-4 py-2 rounded-full border focus:outline-none ${isScrolled ? "bg-black/30 text-white border-transparent" : "bg-white text-gray-800 border-gray-200"}`}
//             />

//             {(itemResults.length > 0 || categoryResults.length > 0) && (
//               <div className="absolute left-0 right-0 mt-2 bg-white text-gray-800 rounded shadow-lg z-50">
//                 {categoryResults.length > 0 && (
//                   <div className="px-3 py-2 border-b">
//                     <div className="text-sm font-semibold">Categories</div>
//                     {categoryResults.map((c) => (
//                       <a key={c} href={`/menu#${c.toLowerCase()}`} className="block px-1 py-1 hover:bg-gray-100 rounded">
//                         {c}
//                       </a>
//                     ))}
//                   </div>
//                 )}

//                 {itemResults.length > 0 && (
//                   <div className="px-3 py-2">
//                     <div className="text-sm font-semibold">Items</div>
//                     {itemResults.map((r) => (
//                       <a key={r.id} href={r.href || `/menu#${r.category.toLowerCase()}`} className="flex justify-between px-1 py-1 hover:bg-gray-100 rounded">
//                         <span>{r.name}</span>
//                         <span className="text-sm text-gray-500">${r.price.toFixed(2)}</span>
//                       </a>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Side Icons */}
//         <div className="flex items-center gap-4">
//           {/* Cart */}
//           <a href="/cart" className={`${isScrolled ? "text-white" : "text-gray-800 hover:text-green-600"}`}>
//             <AiOutlineShoppingCart size={24} />
//           </a>

//            {/* Order Button */}
//           <a
//             href="/order"
//             className={`hidden md:inline-block px-4 py-2 rounded-lg transition ${isScrolled ? "bg-white text-green-600" : "bg-green-600 text-white hover:bg-green-700"}`}
//           >
//             Order Now
//           </a>

//           {/* Explorer (moved here so it's left of Order Now) */}
//           <div ref={explorerRef} className="relative hidden md:block">
//             <button
//               onClick={() => setExplorerOpen(!explorerOpen)}
//               className={`flex items-center gap-2 px-3 py-2 rounded font-medium transition ${isScrolled ? "text-white" : "text-gray-800 hover:text-green-600"}`}
//             >
//               Explorer
//               <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${explorerOpen ? "transform rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>

//             {explorerOpen && (
//               <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded shadow-lg p-2 z-50">
//                 {navLinks.map((link) => (
//                   <a key={link.name} href={link.href} className="block px-3 py-2 hover:bg-gray-100 rounded">
//                     {link.name}
//                   </a>
//                 ))}
//               </div>
//             )}
//           </div>

         

//           {/* Mobile Menu Button */}
//           <button
//             className={`${isScrolled ? "text-white" : "text-gray-800"} md:hidden`}
//             onClick={toggleMobileMenu}
//           >
//             {mobileOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {mobileOpen && (
//         <nav className="md:hidden bg-white border-t border-gray-200">
//           <ul className="flex flex-col py-4 px-6 space-y-4">
//             {/* Mobile search */}
//             <li>
//               <div className="w-full">
//                 <input
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Search menu..."
//                   className="w-full px-3 py-2 rounded border bg-gray-50 text-gray-800"
//                 />
//                 {query && (
//                   <div className="mt-2 bg-white rounded shadow-inner">
//                     {results.length ? results.map((r) => (
//                       <a key={r.name} href={r.href} className="block px-3 py-2 hover:bg-gray-100">
//                         {r.name}
//                       </a>
//                     )) : <div className="px-3 py-2 text-gray-500">No results</div>}
//                   </div>
//                 )}
//               </div>
//             </li>
//             <li>
//               <button
//                 onClick={() => setMobileExplorerOpen(!mobileExplorerOpen)}
//                 className="w-full flex items-center justify-between px-3 py-2 text-gray-800 font-medium"
//               >
//                 Explorer
//                 <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${mobileExplorerOpen ? "transform rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//               </button>

//               {mobileExplorerOpen && (
//                 <div className="mt-2 pl-3">
//                   {navLinks.map((link) => (
//                     <a key={link.name} href={link.href} className="block px-3 py-2 text-gray-800 rounded hover:bg-gray-100">
//                       {link.name}
//                     </a>
//                   ))}
//                 </div>
//               )}
//             </li>

//             {navLinks.map((link) => (
//               <li key={link.name}>
//                 <a href={link.href} className="block text-gray-800 text-lg font-medium">
//                   {link.name}
//                 </a>
//               </li>
//             ))}

//             <li>
//               <a
//                 href="/order"
//                 className="block bg-green-600 text-white text-center py-2 rounded-lg"
//               >
//                 Order Now
//               </a>
//             </li>
//           </ul>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;