import dbConnect from "./dbConnect";
import Hotel from "@/models/Hotel";
import Room from "@/models/Room";
import Restaurant from "@/models/Restaurant";
import Spa from "@/models/Spa";
import Wedding from "@/models/Wedding";
import Testimonial from "@/models/Testimonial";
import FAQ from "@/models/FAQ";
import Gallery from "@/models/Gallery";
import Offer from "@/models/Offer";
import { MOCK_HOTELS, MOCK_ROOMS } from "./mockData";

// Re-export mock data for server use
export { MOCK_HOTELS, MOCK_ROOMS };

export const MOCK_RESTAURANTS = MOCK_HOTELS.map((hotel) => ({
  _id: `restaurant-${hotel.slug}`,
  hotel: hotel._id,
  name: `${hotel.name.replace("Earls ", "")} Signature Grill`,
  description: "A fine dining culinary journey pairing fresh, locally sourced spices and catch with fine international wines.",
  cuisine: "Fusion Fine Dining",
  openingHours: "6:30 PM - 11:00 PM",
  chefName: "Chef Ranjith Perera",
  chefBio: "Winner of multiple culinary awards, bringing over 20 years of experience in Michelin-starred venues across Europe and Asia.",
  chefImage: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&h=400&q=80",
  images: ["https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"],
  menu: [
    {
      category: "Appetizers",
      items: [
        { name: "Jaffna Crab Arancini", price: "24", description: "Local lagoon crab meat tossed in rich spices, crusted and fried, served with a lime oil emulsion." },
        { name: "Lemongrass Smoked Duck", price: "28", description: "Tender breast smoked with organic sugarcane and lemongrass, accompanied by wild berry chutney." },
      ],
    },
    {
      category: "Mains",
      items: [
        { name: "Ceylon Cinnamon Lamb Loin", price: "48", description: "Grass-fed lamb loin crusted with Ceylon cinnamon, glazed with port wine, served over sweet potato mash." },
        { name: "Seared Bentota Seabass", price: "42", description: "Pan-seared ocean bass fillet served with coconut saffron reduction and butter-poached baby bok choy." },
      ],
    },
  ],
}));

export const MOCK_TESTIMONIALS = [
  {
    name: "Sophia Martinez",
    role: "Luxury Travel Journalist",
    hotelName: "Earls Ocean Paradise, Bentota",
    content: "A magnificent blend of coastal serenity and timeless elegance. The infinity pool fading into the Indian Ocean was a daily highlight.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Arthur Pendelton",
    role: "CEO, Pendelton Ventures",
    hotelName: "Earls Grand Colombo",
    content: "The Executive Suite provided a flawless workspace with panoramic views of the Colombo skyline. Exemplary, attentive service throughout my stay.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    name: "Chloe & Daniel",
    role: "Newlyweds",
    hotelName: "Earls Highland Retreat",
    content: "Our wedding photoshoot in Nuwara Eliya was a fairy tale. The mist rolling over the manicured tea gardens is something we will never forget.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&h=150&q=80",
  },
];

export const MOCK_SPA = [
  {
    name: "Ceylon Ayurveda Rejuvenation",
    description: "A signature full-body treatment using warm medicinal oils infused with native Sri Lankan herbs to restore systemic balance and inner peace.",
    duration: "90 min",
    price: 180,
    category: "Massages",
    images: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"],
  },
  {
    name: "Royal Sandalwood Facial",
    description: "An ultra-nourishing facial utilizing pure red sandalwood paste and organic jasmine extracts to restore skin brightness and hydration.",
    duration: "60 min",
    price: 120,
    category: "Facials",
    images: ["https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80"],
  },
  {
    name: "Himalayan Pink Salt Scrub",
    description: "A mineral-rich body exfoliation designed to remove toxins and boost circulation, followed by a warm coconut milk wrap.",
    duration: "75 min",
    price: 140,
    category: "Body Treatments",
    images: ["https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=600&q=80"],
  },
];

export const MOCK_WEDDINGS = [
  {
    venueName: "The Grand Empress Ballroom",
    capacity: "Up to 450 guests",
    price: 3500,
    description: "A majestic indoor venue featuring crystal chandeliers, hand-carved golden archways, and a private pre-function lounge in Colombo.",
    images: ["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"],
    inclusions: ["Five-course gourmet banquet", "Champagne toast for all guests", "Master of ceremonies", "Luxury floral arches", "Overnight stay in the Royal Suite"],
  },
  {
    venueName: "Azure Ocean Pavilion",
    capacity: "Up to 250 guests",
    price: 4500,
    description: "An oceanfront outdoor pavilion overlooking the white sands of Bentota, designed for romantic beach vows and cocktail receptions.",
    images: ["https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=800&q=80"],
    inclusions: ["Custom seafood buffet menu", "Acoustic beach band", "Stylized floral decoration", "Bridal changing suite", "Couple spa ritual"],
  },
];

export const MOCK_GALLERY = [
  { title: "Ocean Infinity Pool", type: "image", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80", category: "Facilities" },
  { title: "Highland Retreat Facade", type: "image", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80", category: "Exterior" },
  { title: "Presidential Villa Dining", type: "image", url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80", category: "Suites" },
  { title: "Signature Dining", type: "image", url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80", category: "Dining" },
];

export const MOCK_OFFERS = [
  {
    title: "Exclusive Escape",
    description: "Save 20% on booking luxury suites with warm spa inclusions.",
    code: "ESCAPE20",
    discountPercentage: 20,
    validityDate: "2026-12-31",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Honeymoon Sanctuary",
    description: "Complimentary private dining and couple massage at Earls Ocean Paradise.",
    code: "HONEYMOON",
    discountPercentage: 15,
    validityDate: "2026-10-30",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
  },
];

// Helper functions that attempt MongoDB query and fall back to Mock data
export async function getHotels(query: any = {}) {
  try {
    await dbConnect();
    const hotels = await Hotel.find(query).lean();
    if (hotels && hotels.length > 0) return JSON.parse(JSON.stringify(hotels));
  } catch (err) {
    console.warn("MongoDB connection failed or empty database, falling back to mock hotels.");
  }
  
  if (query.slug) {
    return MOCK_HOTELS.filter((h) => h.slug === query.slug);
  }
  if (query.featured !== undefined) {
    return MOCK_HOTELS.filter((h) => h.featured === query.featured);
  }
  return MOCK_HOTELS;
}

export async function getHotelBySlug(slug: string) {
  try {
    await dbConnect();
    const hotel = await Hotel.findOne({ slug }).lean();
    if (hotel) return JSON.parse(JSON.stringify(hotel));
  } catch (err) {
    console.warn(`MongoDB query failed for hotel ${slug}, using mock.`);
  }
  return MOCK_HOTELS.find((h) => h.slug === slug) || null;
}

export async function getRoomsForHotel(hotelId: string) {
  try {
    await dbConnect();
    const rooms = await Room.find({ hotel: hotelId }).lean();
    if (rooms && rooms.length > 0) return JSON.parse(JSON.stringify(rooms));
  } catch (err) {
    console.warn(`MongoDB query failed for rooms under hotelId ${hotelId}, using mock.`);
  }
  
  // Find which hotel this matches in mock
  const matchingHotel = MOCK_HOTELS.find((h) => h._id === hotelId || h.slug === hotelId);
  const targetId = matchingHotel ? matchingHotel._id : hotelId;
  return MOCK_ROOMS.filter((r) => r.hotel === targetId);
}

export async function getRestaurants(hotelId?: string) {
  try {
    await dbConnect();
    const query = hotelId ? { hotel: hotelId } : {};
    const rests = await Restaurant.find(query).populate("hotel").lean();
    if (rests && rests.length > 0) return JSON.parse(JSON.stringify(rests));
  } catch (err) {
    console.warn("MongoDB query failed for restaurants, using mock.");
  }
  return MOCK_RESTAURANTS;
}

export async function getSpaTreatments() {
  try {
    await dbConnect();
    const spa = await Spa.find({}).lean();
    if (spa && spa.length > 0) return JSON.parse(JSON.stringify(spa));
  } catch (err) {
    console.warn("MongoDB query failed for spa treatments, using mock.");
  }
  return MOCK_SPA;
}

export async function getWeddings() {
  try {
    await dbConnect();
    const weddings = await Wedding.find({}).lean();
    if (weddings && weddings.length > 0) return JSON.parse(JSON.stringify(weddings));
  } catch (err) {
    console.warn("MongoDB query failed for weddings, using mock.");
  }
  return MOCK_WEDDINGS;
}

export async function getTestimonials() {
  try {
    await dbConnect();
    const tests = await Testimonial.find({}).lean();
    if (tests && tests.length > 0) return JSON.parse(JSON.stringify(tests));
  } catch (err) {
    console.warn("MongoDB query failed for testimonials, using mock.");
  }
  return MOCK_TESTIMONIALS;
}

export async function getOffers() {
  try {
    await dbConnect();
    const offers = await Offer.find({}).lean();
    if (offers && offers.length > 0) return JSON.parse(JSON.stringify(offers));
  } catch (err) {
    console.warn("MongoDB query failed for offers, using mock.");
  }
  return MOCK_OFFERS;
}

export async function getGallery() {
  try {
    await dbConnect();
    const items = await Gallery.find({}).lean();
    if (items && items.length > 0) return JSON.parse(JSON.stringify(items));
  } catch (err) {
    console.warn("MongoDB query failed for gallery, using mock.");
  }
  return MOCK_GALLERY;
}

export async function getRoomBySlug(hotelSlug: string, roomSlug: string) {
  try {
    await dbConnect();
    const hotel = await Hotel.findOne({ slug: hotelSlug }).lean();
    if (hotel) {
      const room = await Room.findOne({ hotel: hotel._id, slug: roomSlug }).lean();
      if (room) {
        return JSON.parse(JSON.stringify({ ...room, hotel }));
      }
    }
  } catch (err) {
    console.warn(`MongoDB query failed for room ${roomSlug} under hotel ${hotelSlug}, using mock.`);
  }

  // Fallback to mock
  const matchingHotel = MOCK_HOTELS.find((h) => h.slug === hotelSlug);
  if (matchingHotel) {
    const room = MOCK_ROOMS.find((r) => r.hotel === matchingHotel._id && r.slug === roomSlug);
    if (room) {
      return { ...room, hotel: matchingHotel };
    }
  }
  return null;
}
