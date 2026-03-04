// Menu data used by Header Explorer dropdown and Menu page
export const menuLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Order Online", href: "/order" },
    { name: "Restaurants", href: "/restaurants" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Login", href: "/login" },
];

export const categories = ["Starters", "Mains", "Desserts", "Drinks"];

export const menuItems = [
    {
        id: 1, name: "Paneer Tikka",
        category: "Starters",
        veg: true, price: 200,
        description: "Grilled paneer with spices.",
        image: "https://tandoormorni.com/wp-content/uploads/2025/04/Smoky-Tandoori-Paneer-Tikka-Delight.png"
    },
    {
        id: 2,
        name: "Chicken Tikka",
        category: "Starters",
        veg: false, price: 250,
        description: "Spiced grilled chicken.",
        image: "https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Tikka-Masala-min.jpg"
    },

    { id: 3, 
        name: "Margherita Pizza", 
        category: "Mains", 
        veg: true, 
        price: 700,
         description: "Classic cheese & tomato.", 
         image: "https://blessedbeyondwords.com/wp-content/uploads/2025/12/Margherita-Pizza.webp"
        },

    { id: 4,
         name: "Pepperoni Pizza",
          category: "Mains", veg: false,
           price: 400,
            description: "Pepperoni and cheese.",
            image: "https://www.thespruceeats.com/thmb/xhWkNmTyQqN6F323gZv7Cx8Z8RU=/2000x1500/filters:fill(auto,1)/pepperonipizzaLauriPatterson-48ea21881421405eab46ea6044e46d2e.jpg"
            },


    { 
        id: 5, name: "Gulab Jamun", 
        category: "Desserts", veg: true, 
        price: 200, 
        description: "Sweet syrup dumplings.",
        image: "https://static.toiimg.com/thumb/63799510.cms?imgsize=1091643&width=800&height=800"
        },

    { id: 6, name: "Chocolate Brownie", 
        category: "Desserts", veg: true, 
        price: 150, 
        description: "Rich chocolate brownie.", 
        image: "https://www.recipetineats.com/wp-content/uploads/2020/03/Brownies_0-SQ.jpg?resize=85"
     },

    { 
        id: 7, 
        name: "Lemonade", 
        category: "Drinks", veg: true,
         price: 50,
          description: "Fresh squeezed lemonade.",
          image: "https://static.vecteezy.com/system/resources/previews/022/267/254/large_2x/lemonade-in-glass-with-splash-on-wooden-table-and-green-blurred-background-summer-refreshing-drink-generative-ai-free-photo.jpeg"
         },
    
          { 
            id: 8, name: "Mango Lassi",
         category: "Drinks", veg: true,
          price: 80,
         description: "Yogurt mango drink.", 
            image: "https://sixhungryfeet.com/wp-content/uploads/2022/07/Vegan-Mango-Lassi-7.jpg"
         },
];

export const spicehousemenu = [
    {
        id: 1, name: "Paneer Tikka",
        category: "Starters",
        veg: true, price: 200,
        description: "Grilled paneer with spices.",
        image: "https://tandoormorni.com/wp-content/uploads/2025/04/Smoky-Tandoori-Paneer-Tikka-Delight.png"
    },
    {
        id: 2,
        name: "Chicken Tikka",
        category: "Starters",
        veg: false, price: 250,
        description: "Spiced grilled chicken.",
        image: "https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Tikka-Masala-min.jpg"
    },

    { id: 3, 
        name: "Margherita Pizza", 
        category: "Mains", 
        veg: true, 
        price: 700,
         description: "Classic cheese & tomato.", 
         image: "https://blessedbeyondwords.com/wp-content/uploads/2025/12/Margherita-Pizza.webp"
        },

    { id: 4,
         name: "Pepperoni Pizza",
          category: "Mains", veg: false,
           price: 400,
            description: "Pepperoni and cheese.",
            image: "https://www.thespruceeats.com/thmb/xhWkNmTyQqN6F323gZv7Cx8Z8RU=/2000x1500/filters:fill(auto,1)/pepperonipizzaLauriPatterson-48ea21881421405eab46ea6044e46d2e.jpg"
            },


    { 
        id: 5, name: "Gulab Jamun", 
        category: "Desserts", veg: true, 
        price: 200, 
        description: "Sweet syrup dumplings.",
        image: "https://static.toiimg.com/thumb/63799510.cms?imgsize=1091643&width=800&height=800"
        },

    { id: 6, name: "Chocolate Brownie", 
        category: "Desserts", veg: true, 
        price: 150, 
        description: "Rich chocolate brownie.", 
        image: "https://www.recipetineats.com/wp-content/uploads/2020/03/Brownies_0-SQ.jpg?resize=85"
     },

    { 
        id: 7, 
        name: "Lemonade", 
        category: "Drinks", veg: true,
         price: 50,
          description: "Fresh squeezed lemonade.",
          image: "https://static.vecteezy.com/system/resources/previews/022/267/254/large_2x/lemonade-in-glass-with-splash-on-wooden-table-and-green-blurred-background-summer-refreshing-drink-generative-ai-free-photo.jpeg"
         },
    
          { 
            id: 8, name: "Mango Lassi",
         category: "Drinks", veg: true,
          price: 80,
         description: "Yogurt mango drink.", 
            image: "https://sixhungryfeet.com/wp-content/uploads/2022/07/Vegan-Mango-Lassi-7.jpg"
         },
];



export const restaurants = [
    { id: 1, 
        name: 'The Spice House',
         cuisine: 'Indian', 
         location: 'Downtown',
          rating: 4.5, 
          image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80' 
        },

    { id: 2, 
        name: 'La Pasta', 
        cuisine: 'Italian', 
        location: 'Riverside', 
        rating: 4.6, 
        image: 'https://jawnsicooked.com/wp-content/uploads/2022/11/Spicy-italian-sausage-pasta-24-scaled.jpg' 
    },

    { id: 3, 
        name: 'Sushi World', 
        cuisine: 'Japanese', 
        location: 'Midtown', 
        rating: 4.7, 
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' 
    },

    { id: 4, 
        name: 'Green Bowl', 
        cuisine: 'Healthy', 
        location: 'Uptown',
         rating: 4.3,
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'
         },

             { id: 5, 
        name: 'Swaraj', 
        cuisine: 'North Indian', 
        location: 'Uptown',
         rating: 4.3,
          image: 'https://media.weddingz.in/images/3e3047e6d57a51766af40fe3c8e945ac/hotel-swaraj-hotel-swaraj-others-12.jpg'
         },

             { id: 6, 
        name: 'Urban Bites', 
        cuisine: 'Street Food', 
        location: 'Uptown',
         rating: 4,
          image: 'https://www.holidify.com/images/cmsuploads/compressed/DSC06868_20190101160258.JPG'
         },

             { id: 7, 
        name: 'Foodie Hub', 
        cuisine: 'South Indian', 
        location: 'Uptown',
         rating: 4.8,
          image: 'https://wallpapercave.com/wp/wp1874169.jpg'
         },


             { id: 8, 
        name: 'Flavor Fusion', 
        cuisine: 'Thai', 
        location: 'Uptown',
         rating: 4.1,
          image: 'https://www.mychiangmaitravel.com/wp-content/uploads/2017/12/Rak-Tha-Nam01.jpg'
         },

             { id: 9, 
        name: 'The Food Factory', 
        cuisine: 'Hyderabadi', 
        location: 'Uptown',
         rating: 4.9,
          image: 'https://img.freepik.com/premium-photo/chicken-biryani-photo-image-pic-chicken-biryani-picture-full-hd-4k-download-11_1085145-1511.jpg?w=2000'
         },

             { id: 10, 
        name: 'Zesty Kitchen', 
        cuisine: 'Asian Fusion', 
        location: 'Uptown',
         rating: 4.3,
          image: 'https://wallpapers.com/images/hd/chinese-food-pictures-283a542wre04dt2j.jpg'
         },
];


