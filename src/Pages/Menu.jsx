import React, { useMemo, useState } from 'react'
import { menuItems, categories } from '../Data/menuData'
import { addToCart } from '../utils/cart'

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [vegFilter, setVegFilter] = useState('all')
  const [maxPrice, setMaxPrice] = useState(100)
  const [sortOrder, setSortOrder] = useState('default')
  const [categoryQuery, setCategoryQuery] = useState('')
  const [toast, setToast] = useState('')

  const filtered = useMemo(() => {
    let arr = menuItems.filter((it) => {
      if (selectedCategory && it.category !== selectedCategory) return false
      if (vegFilter === 'veg' && !it.veg) return false
      if (vegFilter === 'nonveg' && it.veg) return false
      if (it.price > maxPrice) return false
      return true
    })

    if (sortOrder === 'low-high') {
      arr = arr.slice().sort((a, b) => a.price - b.price)
    } else if (sortOrder === 'high-low') {
      arr = arr.slice().sort((a, b) => b.price - a.price)
    }

    return arr
  }, [selectedCategory, vegFilter, maxPrice, sortOrder])

  const visibleCategories = categories.filter((c) =>
    c.toLowerCase().includes(categoryQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto px-6 py-8">

      {/*  HERO VIDEO SECTION */}
      <div className="relative w-full h-[300px] md:h-[380px] mb-8 rounded-xl overflow-hidden shadow-lg mt-10">

        {/*  FIXED VIDEO PATH */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/video/food-video.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-center px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
            Delicious Food, Delivered Fast 
          </h2>
          <p className="text-gray-200 text-sm md:text-lg mb-4 ">
            Fresh & tasty meals at your doorstep
          </p>

          <a
            href="#menu-items"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full"
          >
            Explore Menu
          </a>
        </div>
      </div>

      <h1 className="text-2xl font-semibold mb-6">Menu</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* LEFT FILTER */}
        <aside className="md:col-span-3 bg-white p-4 rounded shadow-sm">
          <h3 className="font-semibold mb-3">Filters</h3>

          <div className="mb-4">
            <div className="font-medium mb-2">Veg / Non-veg</div>
            <div className="flex gap-2">
              <button className={`px-3 py-1 rounded ${vegFilter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100'}`} onClick={() => setVegFilter('all')}>All</button>
              <button className={`px-3 py-1 rounded ${vegFilter === 'veg' ? 'bg-green-600 text-white' : 'bg-gray-100'}`} onClick={() => setVegFilter('veg')}>Veg</button>
              <button className={`px-3 py-1 rounded ${vegFilter === 'nonveg' ? 'bg-green-600 text-white' : 'bg-gray-100'}`} onClick={() => setVegFilter('nonveg')}>Non-Veg</button>
            </div>
          </div>

          <div className="mb-4">
            <div className="font-medium mb-2">Max Price (₹{maxPrice})</div>
            <input
              type="range"
              min="0"
              max="5000"
              value={maxPrice}
              onChange={(e)=>setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <div className="font-medium mb-2">Sort by price</div>
            <select
              value={sortOrder}
              onChange={(e)=>setSortOrder(e.target.value)}
              className="w-full px-3 py-2 rounded border"
            >
              <option value="default">Default</option>
              <option value="low-high">Price: Low → High</option>
              <option value="high-low">Price: High → Low</option>
            </select>
          </div>
        </aside>

        {/* CENTER ITEMS */}
        <main id="menu-items" className="md:col-span-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((it) => (
              <div key={it.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg">

                <div className="relative">
                  <img src={it.image} alt={it.name} className="w-full h-48 object-cover" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs px-2 py-1 rounded ${it.veg ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                      {it.veg ? 'VEG' : 'NON-VEG'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded font-semibold">
                    ₹{it.price.toFixed(2)}
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="text-lg font-semibold">{it.name}</h4>
                  <p className="text-sm text-gray-500">{it.description}</p>

                  <div className="flex justify-between mt-3">
                    <a href={`/product/${it.id}`} className="text-green-600 text-sm">Details</a>

                    <button
                      onClick={() => {
                        addToCart(it)
                        setToast(`${it.name} added to cart`)
                        setTimeout(()=>setToast(''),1500)
                      }}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Add
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </main>

        {/* RIGHT CATEGORY */}
        <aside className="md:col-span-3 bg-white p-4 rounded shadow-sm">
          <h3 className="font-semibold mb-3">Categories</h3>

          <input
            value={categoryQuery}
            onChange={(e)=>setCategoryQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full px-3 py-2 border rounded mb-3"
          />

          {visibleCategories.map((c) => (
            <button
              key={c}
              onClick={()=>setSelectedCategory(c)}
              className={`w-full text-left px-3 py-2 rounded mb-2 ${selectedCategory===c? 'bg-green-600 text-white' : 'bg-gray-100'}`}
            >
              {c}
            </button>
          ))}

          <button
            onClick={()=>setSelectedCategory('')}
            className="w-full text-left px-3 py-2 rounded bg-gray-50 mt-2"
          >
            Show all
          </button>
        </aside>

      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow">
          {toast}
        </div>
      )}
    </div>
  )
}

export default Menu







// import React, { useMemo, useState } from 'react'
// import { menuItems, categories } from '../Data/menuData'
// import { addToCart } from '../utils/cart'

// const Menu = () => {
//   const [selectedCategory, setSelectedCategory] = useState('')
//   const [vegFilter, setVegFilter] = useState('all') // all | veg | nonveg
//   const [maxPrice, setMaxPrice] = useState(100)
//   const [sortOrder, setSortOrder] = useState('default') // default | low-high | high-low
//   const [categoryQuery, setCategoryQuery] = useState('')

//   const filtered = useMemo(() => {
//     let arr = menuItems.filter((it) => {
//       if (selectedCategory && it.category !== selectedCategory) return false
//       if (vegFilter === 'veg' && !it.veg) return false
//       if (vegFilter === 'nonveg' && it.veg) return false
//       if (it.price > maxPrice) return false
//       return true
//     })

//     if (sortOrder === 'low-high') {
//       arr = arr.slice().sort((a, b) => a.price - b.price)
//     } else if (sortOrder === 'high-low') {
//       arr = arr.slice().sort((a, b) => b.price - a.price)
//     }

//     return arr
//   }, [selectedCategory, vegFilter, maxPrice, sortOrder])

//   const [toast, setToast] = useState('')

//   const visibleCategories = categories.filter((c) => c.toLowerCase().includes(categoryQuery.toLowerCase()))

//   return (
//     <div className="container mx-auto px-6 py-8">
//       <h1 className="text-2xl font-semibold mb-6">Menu</h1>
//       <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
//         {/* Left: Filters */}
//         <aside className="md:col-span-3 bg-white p-4 rounded shadow-sm">
//           <h3 className="font-semibold mb-3">Filters</h3>
//           <div className="mb-4">
//             <div className="font-medium mb-2">Veg / Non-veg</div>
//             <div className="flex gap-2">
//               <button className={`px-3 py-1 rounded ${vegFilter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100'}`} onClick={() => setVegFilter('all')}>All</button>
//               <button className={`px-3 py-1 rounded ${vegFilter === 'veg' ? 'bg-green-600 text-white' : 'bg-gray-100'}`} onClick={() => setVegFilter('veg')}>Veg</button>
//               <button className={`px-3 py-1 rounded ${vegFilter === 'nonveg' ? 'bg-green-600 text-white' : 'bg-gray-100'}`} onClick={() => setVegFilter('nonveg')}>Non-Veg</button>
//             </div>
//           </div>

//           <div className="mb-4">
//             <div className="font-medium mb-2">Max Price (${maxPrice})</div>
//             <input type="range" min="0" max="50" value={maxPrice} onChange={(e)=>setMaxPrice(Number(e.target.value))} className="w-full" />
//           </div>

//           <div>
//             <div className="font-medium mb-2">Sort by price</div>
//             <select value={sortOrder} onChange={(e)=>setSortOrder(e.target.value)} className="w-full px-3 py-2 rounded border">
//               <option value="default">Default</option>
//               <option value="low-high">Price: Low → High</option>
//               <option value="high-low">Price: High → Low</option>
//             </select>
//           </div>
//         </aside>

//         {/* Center: Items */}
//         <main className="md:col-span-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             {filtered.map((it) => (
//               <div key={it.id} className="bg-white rounded-lg shadow overflow-hidden transition hover:shadow-lg">
//                 <div className="relative">
//                   <img src={it.image} alt={it.name} className="w-full h-48 object-cover" />
//                   <div className="absolute top-3 left-3">
//                     <span className={`text-xs px-2 py-1 rounded ${it.veg ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
//                       {it.veg ? 'VEG' : 'NON-VEG'}
//                     </span>
//                   </div>
//                   <div className="absolute top-3 right-3 bg-white bg-opacity-90 text-sm px-2 py-1 rounded font-semibold">${it.price.toFixed(2)}</div>
//                 </div>

//                 <div className="p-4 flex flex-col gap-3">
//                   <div>
//                     <h4 className="text-lg font-semibold text-gray-800">{it.name}</h4>
//                     <p className="text-sm text-gray-500 mt-1">{it.description}</p>
//                   </div>

//                   <div className="flex items-center justify-between">
//                     <a href={`/product/${it.id}`} className="text-sm text-green-600 hover:underline">Details</a>
//                     <button onClick={() => { addToCart(it); setToast(`${it.name} added to cart`); setTimeout(()=>setToast(''),1500) }} className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Add to cart</button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             {filtered.length === 0 && (
//               <div className="col-span-full text-center text-gray-500">No items match your filters.</div>
//             )}
//           </div>
//         </main>

//         {/* Right: Category search */}
//         <aside className="md:col-span-3 bg-white p-4 rounded shadow-sm">
//           <h3 className="font-semibold mb-3">Categories</h3>
//           <input value={categoryQuery} onChange={(e)=>setCategoryQuery(e.target.value)} placeholder="Search categories..." className="w-full px-3 py-2 rounded border mb-3" />
//           <div className="space-y-2">
//             {visibleCategories.map((c) => (
//               <button key={c} onClick={()=>setSelectedCategory(c)} className={`w-full text-left px-3 py-2 rounded ${selectedCategory===c? 'bg-green-600 text-white' : 'bg-gray-100'}`}>
//                 {c}
//               </button>
//             ))}
//             <button onClick={()=>setSelectedCategory('')} className="w-full text-left px-3 py-2 rounded bg-gray-50 mt-3">Show all</button>
//           </div>
//         </aside>
//       </div>
//       {toast && <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow">{toast}</div>}
//     </div>
//   )
// }

// export default Menu