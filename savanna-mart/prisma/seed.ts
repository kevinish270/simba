import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const branchesData = [
  { name: "Simba Supermarket Kimironko", location: "Kimironko, Kigali" },
  { name: "Simba Supermarket Gisozi", location: "Gisozi, Kigali" },
  { name: "Simba Supermarket Kicukiro", location: "Kicukiro, Kigali" },
  { name: "Simba Supermarket Remera", location: "Remera, Kigali" },
  { name: "Simba Supermarket Nyamirambo", location: "Nyamirambo, Kigali" },
  { name: "Simba Supermarket Downtown Kigali", location: "Downtown, Kigali" },
];

const supermarketData = [
  {
    name: "Food Products",
    subcategories: [
      { name: "Baby Milk & Baby Food", items: ["Baby Formula", "Cerelac", "Nestlé Nan", "Aptamil", "Cow & Gate"] },
      { name: "Biscuits & Cookies", items: ["Marie Biscuits", "Digestive Biscuits", "Oreo", "Chocolate Chip Cookies", "Shortbread"] },
      { name: "Bread & Bakery", items: ["White Bread", "Brown Bread", "Wholemeal Bread", "Baguette", "Croissants"] },
      { name: "Breakfast Cereals", items: ["Corn Flakes", "Oatmeal", "Muesli", "Coco Pops", "Rice Krispies"] },
      { name: "Chocolate & Candy", items: ["Chocolate Bars", "Gummy Bears", "Hard Candy", "Lollipops", "Truffles"] },
      { name: "Coffee & Tea", items: ["Ground Coffee", "Black Tea", "Green Tea", "Instant Coffee", "Herbal Tea"] },
      { name: "Cooking Oil & Olive Oil", items: ["Sunflower Oil", "Olive Oil", "Vegetable Oil", "Canola Oil", "Corn Oil"] },
      { name: "Dairy Products", items: ["Cheddar Cheese", "Gouda", "Cream Cheese", "Mozzarella", "Parmesan"] },
      { name: "Flour", items: ["Wheat Flour", "Maize Flour", "All-purpose Flour", "Self-raising Flour", "Corn Flour"] },
      { name: "Frozen Foods", items: ["Frozen Pizza", "Frozen Peas", "Frozen Chips", "Frozen Mixed Veg", "Ice Cream"] },
      { name: "Honey", items: ["Natural Honey", "Wildflower Honey", "Acacia Honey", "Manuka Honey", "Clover Honey"] },
      { name: "Jam & Spreads", items: ["Strawberry Jam", "Marmalade", "Apricot Jam", "Raspberry Jam", "Hazelnut Spread"] },
      { name: "Margarine & Butter", items: ["Salted Butter", "Unsalted Butter", "Margarine", "Clarified Butter", "Spreadable Butter"] },
      { name: "Mayonnaise, Ketchup & Mustard", items: ["Mayonnaise", "Ketchup", "Yellow Mustard", "Dijon Mustard", "Salad Cream"] },
      { name: "Meat Products", items: ["Beef Burgers", "Chicken Wings", "Pork Sausages", "Salami", "Ham"] },
      { name: "Milk", items: ["Fresh Milk", "UHT Milk", "Skimmed Milk", "Semi-skimmed Milk", "Lactose-free Milk"] },
      { name: "Noodles", items: ["Instant Noodles", "Egg Noodles", "Rice Noodles", "Udon Noodles", "Ramen"] },
      { name: "Nuts", items: ["Cashew Nuts", "Peanuts", "Almonds", "Walnuts", "Pistachios"] },
      { name: "Oats", items: ["Rolled Oats", "Quick Oats", "Instant Oats", "Steel Cut Oats", "Oat Bran"] },
      { name: "Pasta", items: ["Spaghetti", "Macaroni", "Penne", "Fusilli", "Lasagna Sheets"] },
      { name: "Peanut Butter", items: ["Smooth Peanut Butter", "Crunchy Peanut Butter", "Organic Peanut Butter", "Honey Peanut Butter", "Unsalted Peanut Butter"] },
      { name: "Powdered Milk", items: ["Full Cream Powder", "Skimmed Powder", "Instant Milk Powder", "Coffee Creamer", "Dairy Whitener"] },
      { name: "Rice", items: ["Basmati Rice", "Jasmine Rice", "Long Grain Rice", "Brown Rice", "Parboiled Rice"] },
      { name: "Salt", items: ["Table Salt", "Sea Salt", "Himalayan Pink Salt", "Kosher Salt", "Iodized Salt"] },
      { name: "Spices", items: ["Black Pepper", "Turmeric", "Cumin", "Paprika", "Cinnamon"] },
      { name: "Sugar", items: ["White Sugar", "Brown Sugar", "Icing Sugar", "Caster Sugar", "Demerara Sugar"] },
      { name: "Syrups", items: ["Maple Syrup", "Chocolate Syrup", "Caramel Syrup", "Vanilla Syrup", "Honey Syrup"] },
      { name: "Tomato Sauces", items: ["Tomato Paste", "Pasta Sauce", "Pizza Sauce", "Bolognese Sauce", "Passata"] },
      { name: "Vinegar", items: ["White Vinegar", "Apple Cider Vinegar", "Balsamic Vinegar", "Red Wine Vinegar", "Rice Vinegar"] },
      { name: "Yeast & Baking Powder", items: ["Instant Yeast", "Baking Powder", "Baking Soda", "Active Dry Yeast", "Cream of Tartar"] },
      { name: "Yoghurt", items: ["Plain Yogurt", "Greek Yogurt", "Strawberry Yogurt", "Vanilla Yogurt", "Low-fat Yogurt"] },
      { name: "Canned Beef", items: ["Corned Beef", "Beef Stew", "Canned Meatballs", "Beef Chili", "Luncheon Meat"] },
      { name: "Canned Chicken", items: ["Chunk Chicken", "Chicken Breast", "Canned Chicken Spread", "Chicken Curry", "Chicken Pate"] },
      { name: "Canned Tuna", items: ["Tuna in Oil", "Tuna in Brine", "Flaked Tuna", "Tuna Chunks", "Tuna Salad"] },
      { name: "Canned Sardines", items: ["Sardines in Tomato", "Sardines in Oil", "Sardines with Chili", "Sardines in Brine", "Lemon Sardines"] },
      { name: "Canned Vegetables", items: ["Baked Beans", "Sweet Corn", "Green Peas", "Mixed Veg", "Chickpeas"] },
    ],
  },
  {
    name: "Cleaning & Sanitary",
    subcategories: [
      { name: "Detergents", items: ["Ariel", "Omo", "Persil", "Tide", "Surf"] },
      { name: "Fabric Softeners", items: ["Comfort", "Downy", "Lenor", "Snuggle", "Softlan"] },
      { name: "Liquid Soaps", items: ["Dishwashing Liquid", "All-purpose Cleaner", "Floor Cleaner", "Glass Cleaner", "Degreaser"] },
      { name: "Hand Wash", items: ["Dettol", "Lifebuoy", "Palmolive", "Dove", "Carex"] },
      { name: "Toilet Paper", items: ["Soft Tissue", "Recycled Paper", "2-Ply Roll", "3-Ply Roll", "Luxury Quilt"] },
      { name: "Tissues", items: ["Facial Tissue", "Pocket Tissue", "Boxed Tissue", "Menthol Tissue", "Aloe Vera Tissue"] },
      { name: "Napkins", items: ["Dinner Napkins", "Party Napkins", "Cocktail Napkins", "Paper Serviettes", "Fabric-feel Napkins"] },
      { name: "Air Fresheners", items: ["Lavender Spray", "Citrus Gel", "Automatic Spray", "Electric Diffuser", "Scented Candles"] },
      { name: "Cleaning Brushes", items: ["Scrubbing Brush", "Toilet Brush", "Bottle Brush", "Dish Brush", "Lint Roller"] },
      { name: "Brooms", items: ["Soft Broom", "Hard Broom", "Dustpan Set", "Outdoor Broom", "Hand Broom"] },
      { name: "Kitchen Towels", items: ["Paper Towel Roll", "Kitchen Cloth", "Microfiber Towel", "Absorbent Roll", "Dish Cloth"] },
      { name: "Wipes", items: ["Disinfectant Wipes", "Surface Wipes", "Baby Wipes", "Makeup Wipes", "Kitchen Wipes"] },
      { name: "Cotton Buds", items: ["Standard Cotton Buds", "Eco-friendly Buds", "Makeup Buds", "Safety Buds", "Large Pack Buds"] },
      { name: "Sanitary Pads", items: ["Ultra Thin", "Night Flow", "Regular with Wings", "Cotton Surface", "Daily Liners"] },
      { name: "Diapers", items: ["Newborn Pack", "Size 1", "Size 2", "Size 3", "Size 4"] },
      { name: "Shoe Polish", items: ["Black Polish", "Brown Polish", "Neutral Polish", "Shoe Cream", "Suede Protector"] },
    ],
  },
  {
    name: "Fruits & Vegetables",
    subcategories: [
      { name: "Fresh Fruits", items: ["Apples", "Bananas", "Oranges", "Mangoes", "Pineapples", "Avocados", "Grapes", "Strawberries", "Watermelon", "Pawpaw"] },
      { name: "Fresh Vegetables", items: ["Tomatoes", "Onions", "Potatoes", "Carrots", "Cabbage", "Lettuce", "Sweet Corn", "Broccoli", "Spinach", "Bell Peppers"] },
    ],
  },
  {
    name: "Cosmetics & Personal Care",
    subcategories: [
      { name: "Hair Care", items: ["Shampoo", "Conditioner", "Hair Mask", "Hair Oil", "Hair Serum"] },
      { name: "Skin Care", items: ["Body Lotion", "Face Cream", "Sunscreen", "Moisturizer", "Cleanser"] },
      { name: "Oral Care", items: ["Toothpaste", "Toothbrush", "Mouthwash", "Dental Floss", "Teeth Whitening"] },
      { name: "Shaving Products", items: ["Shaving Foam", "Razor Blades", "Aftershave", "Electric Shaver", "Shaving Gel"] },
      { name: "Makeup", items: ["Lipstick", "Mascara", "Foundation", "Eyeliner", "Nail Polish"] },
      { name: "Deodorants", items: ["Roll-on", "Body Spray", "Stick Deodorant", "Antiperspirant", "Natural Deodorant"] },
    ],
  },
  {
    name: "Non-Alcoholic Drinks",
    subcategories: [
      { name: "Soft Drinks", items: ["Coca-Cola", "Fanta", "Sprite", "Pepsi", "Mountain Dew"] },
      { name: "Juices", items: ["Mango Juice", "Orange Juice", "Apple Juice", "Pineapple Juice", "Mixed Berry"] },
      { name: "Energy Drinks", items: ["Red Bull", "Monster", "Monster Energy", "Powerade", "Burn"] },
      { name: "Mineral Water", items: ["Sparkling Water", "Still Water", "Flavored Water", "Alkaline Water", "Distilled Water"] },
    ],
  },
  {
    name: "Alcoholic Drinks",
    subcategories: [
      { name: "Beer", items: ["Heineken", "Guinness", "Budweiser", "Stella Artois", "Corona"] },
      { name: "Wine", items: ["Red Wine", "White Wine", "Rosé", "Merlot", "Chardonnay"] },
      { name: "Whisky", items: ["Jack Daniel's", "Johnnie Walker", "Jameson", "Chivas Regal", "Glenfiddich"] },
      { name: "Vodka", items: ["Smirnoff", "Absolut", "Grey Goose", "Belvedere", "Skyy"] },
      { name: "Gin", items: ["Gordon's", "Tanqueray", "Beefeater", "Bombay Sapphire", "Hendrick's"] },
      { name: "Rum", items: ["Bacardi", "Captain Morgan", "Havana Club", "Malibu", "Mount Gay"] },
      { name: "Champagne", items: ["Moët & Chandon", "Veuve Clicquot", "Dom Pérignon", "Krug", "Bollinger"] },
      { name: "Cognac", items: ["Hennessy", "Rémy Martin", "Martell", "Courvoisier", "Meukow"] },
    ],
  },
  {
    name: "Kitchenware",
    subcategories: [
      { name: "Cookware", items: ["Frying Pan", "Cooking Pot", "Saucepan", "Stock Pot", "Dutch Oven"] },
      { name: "Cutlery", items: ["Kitchen Knife", "Spoon Set", "Fork Set", "Steak Knife", "Bread Knife"] },
      { name: "Drinkware", items: ["Water Jug", "Glass Cups", "Coffee Mug", "Wine Glass", "Tumbler"] },
      { name: "Food Storage", items: ["Food Containers", "Mason Jars", "Lunch Box", "Vacuum Bag", "Tiffin Carrier"] },
    ],
  },
  {
    name: "Electronics & Appliances",
    subcategories: [
      { name: "Kitchen Appliances", items: ["Blender", "Electric Kettle", "Coffee Maker", "Microwave Oven", "Toaster"] },
      { name: "Home Appliances", items: ["Vacuum Cleaner", "Electric Iron", "Air Purifier", "Dehumidifier", "Fan"] },
      { name: "Audio Equipment", items: ["Bluetooth Speaker", "Home Theater", "Radio", "Soundbar", "Headphones"] },
      { name: "Personal Care Electronics", items: ["Hair Dryer", "Hair Trimmer", "Electric Toothbrush", "Epilator", "Beard Groomer"] },
    ],
  },
  {
    name: "Baby Products",
    subcategories: [
      { name: "Baby Food", items: ["Baby Formula", "Fruit Puree", "Baby Cereal", "Teething Biscuits", "Rice Rusks"] },
      { name: "Diapers", items: ["Pampers", "Huggies", "Pull-Ups", "Cloth Diapers", "Swim Diapers"] },
      { name: "Baby Care", items: ["Baby Wipes", "Baby Shampoo", "Baby Lotion", "Diaper Rash Cream", "Baby Powder"] },
      { name: "Baby Toys", items: ["Rattle", "Teether", "Play Mat", "Soft Toy", "Stroller Toy"] },
    ],
  },
  {
    name: "Toys",
    subcategories: [
      { name: "Educational Toys", items: ["Building Blocks", "Puzzles", "ABC Blocks", "Science Kit", "Magnet Tiles"] },
      { name: "Toy Cars", items: ["Hot Wheels", "Remote Control Car", "Die-cast Truck", "Race Track", "Construction Vehicle"] },
      { name: "Water Toys", items: ["Water Gun", "Pool Float", "Inflatable Ball", "Beach Set", "Bath Duck"] },
      { name: "Electronic Toys", items: ["Learning Tablet", "Toy Phone", "Digital Camera for Kids", "Robot Toy", "Walkie Talkie"] },
      { name: "Games", items: ["Chess Set", "Monopoly", "Ludo", "Playing Cards", "Dart Board"] },
    ],
  },
  {
    name: "Pet Care",
    subcategories: [
      { name: "Dog Food", items: ["Dry Kibble", "Wet Dog Food", "Puppy Food", "Adult Dog Food", "Senior Dog Food"] },
      { name: "Cat Food", items: ["Cat Kibble", "Canned Cat Food", "Kitten Food", "Salmon Cat Treats", "Tuna Cat Treats"] },
      { name: "Bird Food", items: ["Bird Seed", "Sunflower Seeds", "Suet Cakes", "Nectar for Birds", "Millet Sprays"] },
      { name: "Pet Accessories", items: ["Dog Leash", "Cat Collar", "Pet Bed", "Feeding Bowl", "Grooming Brush"] },
    ],
  },
];

const categoryImages: Record<string, string> = {
  "food-products": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
  "cleaning-sanitary": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
  "fruits-vegetables": "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800",
  "cosmetics-personal-care": "https://images.unsplash.com/photo-1596462502278-27bfac4023c6?auto=format&fit=crop&q=80&w=800",
  "non-alcoholic-drinks": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800",
  "alcoholic-drinks": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800",
  "kitchenware": "https://images.unsplash.com/photo-1584346133934-a3afd2a33c4c?auto=format&fit=crop&q=80&w=800",
  "electronics-appliances": "https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&q=80&w=800",
  "baby-products": "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80&w=800",
  "toys": "https://images.unsplash.com/photo-1532330393533-443990a51d10?auto=format&fit=crop&q=80&w=800",
  "pet-care": "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
};

function slugify(text: string) {
  return text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}

async function main() {
  console.log("Cleaning database...");
  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.branch.deleteMany();

  console.log("Creating Simba branches...");
  for (const branch of branchesData) {
    await prisma.branch.create({
      data: branch,
    });
  }

  console.log("Creating default users...");
  await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@simba.com",
      password: "password123",
      role: "ADMIN"
    }
  });

  await prisma.user.create({
    data: {
      name: "Test User",
      email: "user@example.com",
      password: "password123",
      role: "USER"
    }
  });

  console.log("Start seeding localized supermarket inventory (RWF)...");

  for (const cat of supermarketData) {
    const mainCategory = await prisma.category.create({
      data: {
        name: cat.name,
        slug: slugify(cat.name),
      },
    });

    for (const sub of cat.subcategories) {
      const subCategory = await prisma.category.create({
        data: {
          name: sub.name,
          slug: slugify(sub.name + "-" + mainCategory.slug),
          parentId: mainCategory.id,
        },
      });

      console.log(`Seeding products for ${cat.name} > ${sub.name}...`);

      for (const item of sub.items) {
        const variations: number = 4;
        for (let i = 1; i <= variations; i++) {
          const name = variations === 1 ? item : `${item} ${["Premium", "Classic", "Value", "Select"][i-1]} Pack`;
          const slug = slugify(`${name}-${subCategory.id}-${i}`);
          
          // Localized prices in RWF (Approx 1400 RWF = 1 USD)
          const basePriceUSD = Math.floor(Math.random() * 20) + 2; 
          const price = basePriceUSD * 1400;
          const discountPrice = Math.random() > 0.7 ? price * 0.85 : null;
          
          await prisma.product.create({
            data: {
              name: name,
              slug: slug,
              description: `High quality ${item} from our ${cat.name} collection. Trusted by Rwandan families for quality and value. Sourced from the best local and international suppliers.`,
              sku: `SM-${cat.name.substring(0,2).toUpperCase()}-${sub.name.substring(0,2).toUpperCase()}-${slugify(item).substring(0,3).toUpperCase()}-${i}-${Math.floor(Math.random() * 100000)}`,
              brand: ["Simba Choice", "Global Select", "Local Harvest", "Pure Quality"][Math.floor(Math.random() * 4)],
              price: price,
              discountPrice: discountPrice,
              stock: Math.floor(Math.random() * 200) + 20,
              images: categoryImages[mainCategory.slug] || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
              categoryId: subCategory.id,
              featured: Math.random() > 0.9,
            },
          });
        }
      }
    }
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
