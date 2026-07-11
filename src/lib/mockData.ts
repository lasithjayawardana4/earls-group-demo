// High-quality static mock data completely free of database/server imports
// Safe for both Client and Server Components

export const MOCK_HOTELS = [
  {
    _id: "65d3ec62b083c659d81d6431",
    slug: "earls-grand-colombo",
    name: "Earls Grand Colombo",
    location: "Colombo",
    description: "A soaring sanctuary of modern architectural marvel in the heart of Sri Lanka's vibrant capital, offering sky-high infinity pools and fine dining.",
    longDescription: "Rising high above the bustling streets of Sri Lanka's ocean capital, Earls Grand Colombo stands as a beacon of ultra-luxury. The hotel combines glass skyscrapers with interior warmth, featuring bespoke dark wood moldings, gold leaf accents, and marble bathrooms. Home to three Michelin-starred culinary venues, a premier spa, and a skybar with views of the Lotus Tower, it offers business travelers and luxury seekers an unmatched haven.",
    rating: 5,
    startingPrice: 320,
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80"
    ],
    facilities: ["Rooftop Infinity Pool", "Luxury Spa & Wellness Sanctuary", "24/7 Butler Service", "Executive Boardroom", "Helipad & Private Hangar Access", "Rooftop Sky Lounge"],
    nearbyAttractions: [
      { name: "Galle Face Green", distance: "1.2 km", description: "Vast oceanfront green park perfect for evening strolls along the coast." },
      { name: "Colombo National Museum", distance: "3.5 km", description: "Colonial-era mansion housing rich cultural relics of Sri Lankan history." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80"
    ],
    reviews: [
      { author: "Evelyn Reed", rating: 5, comment: "Bespoke service, stunning skyline views from the room, and an absolute heaven in the spa.", date: "2026-05-14" },
      { author: "Marcus Vance", rating: 5, comment: "The presidential suite is worth every penny. Flawless concierge.", date: "2026-06-22" }
    ],
    faqs: [
      { question: "Is parking complimentary for guests?", answer: "Yes, valet parking is complimentary for all in-house guests." }
    ],
    policies: ["Check-in from 2:00 PM, Check-out by 12:00 PM", "No smoking in indoor rooms", "Cancellation must be done 48 hours prior to arrival for full refund"],
    mapCoordinates: { lat: 6.9271, lng: 79.8612 },
    featured: true,
  },
  {
    _id: "65d3ec62b083c659d81d6432",
    slug: "earls-ocean-paradise",
    name: "Earls Ocean Paradise",
    location: "Bentota",
    description: "An oceanfront sanctuary framed by swaying palms, golden beaches, and the calm turquoise waters of the Indian Ocean.",
    longDescription: "Set upon a private peninsula of pristine shoreline in Bentota, Earls Ocean Paradise is a masterpiece of tropical minimalism designed by award-winning architects. Open-air pavilions connect directly with infinity pools that trace the ocean line. Guests can experience luxury spa rituals under ancient banyan trees, take private yachts for dolphin watching, or dine on fresh catch under a star-filled sky.",
    rating: 5,
    startingPrice: 380,
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80"
    ],
    facilities: ["Private Beach Access", "Beachfront Infinity Pool", "Ayurvedic Wellness Spa", "Water Sports Center", "Private Yacht Charters", "Oceanfront Seafood Grill"],
    nearbyAttractions: [
      { name: "Brief Garden", distance: "8 km", description: "Eclectic landscaped garden designed by renowned artist Bevis Bawa." },
      { name: "Madu Ganga River Safari", distance: "12 km", description: "Scenic boat cruise passing through mangrove forests and cinnamon islands." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80"
    ],
    reviews: [
      { author: "Liam Hemsworth", rating: 5, comment: "Waking up to the sound of ocean waves crashing right in front of the deck is unparalleled.", date: "2026-06-01" }
    ],
    faqs: [
      { question: "Do you offer diving gear?", answer: "Yes, our water sports center provides diving equipment and certified guides." }
    ],
    policies: ["Check-in at 2:00 PM, Check-out at 12:00 PM", "Kids stay free under 12 sharing existing bed"],
    mapCoordinates: { lat: 6.4201, lng: 79.9998 },
    featured: true,
  },
  {
    _id: "65d3ec62b083c659d81d6433",
    slug: "earls-highland-retreat",
    name: "Earls Highland Retreat",
    location: "Nuwara Eliya",
    description: "A colonial-style estate nested amidst rolling tea plantations, mist-shrouded peaks, and roaring fireplaces.",
    longDescription: "Reminiscent of a royal country estate, Earls Highland Retreat sits 1,800 meters above sea level in the cool, misty heights of Nuwara Eliya. Surrounded by manicured English gardens and sprawling tea estates, this property features wood-burning fireplaces, custom velvet upholstery, and high ceilings. Perfect for signature high tea, private single-malt tastings, and exploring botanical reserves.",
    rating: 5,
    startingPrice: 290,
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80"
    ],
    facilities: ["Colonial Fireplace Library", "Indoor Heated Pool", "Organic Garden Restaurant", "Bespoke Tea Sommelier Tastings", "Golf Course Access", "Bicycle Tours"],
    nearbyAttractions: [
      { name: "Gregory Lake", distance: "2 km", description: "Scenic alpine lake with recreational boating and scenic walking paths." },
      { name: "Horton Plains National Park", distance: "28 km", description: "UNESCO World Heritage site with dramatic drop-offs like World's End." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80"
    ],
    reviews: [
      { author: "Daphne Bridgerton", rating: 5, comment: "It felt like stepping into an English country manor. The heated pool was pure bliss.", date: "2026-04-10" }
    ],
    faqs: [
      { question: "Is the pool heated?", answer: "Yes, our pool is fully enclosed and heated to a comfortable 28°C." }
    ],
    policies: ["Warm attire recommended", "Check-in at 2:00 PM, Check-out at 12:00 PM"],
    mapCoordinates: { lat: 6.9691, lng: 80.7891 },
    featured: true,
  },
  {
    _id: "65d3ec62b083c659d81d6434",
    slug: "earls-lagoon-resort",
    name: "Earls Lagoon Resort",
    location: "Negombo",
    description: "A peaceful sanctuary nestled between the tranquil waters of the Negombo Lagoon and the Indian Ocean coast.",
    longDescription: "Designed for ultimate relaxation, Earls Lagoon Resort is an architectural tribute to the element of water. Set upon 10 acres of pristine lagoon front, the resort features floating glass villas, elevated wooden boardwalks, and a massive 100-meter swimming pool that spans the property. Close to the international airport, it's the perfect ultra-luxury beginning or end to your Sri Lankan journey.",
    rating: 5,
    startingPrice: 260,
    images: [
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"
    ],
    facilities: ["100m Lagoon Pool", "Floating Spa Villas", "Sunset Cocktail Bar", "Kayaking & Paddleboarding", "Airport Express Concierge", "Yoga & Meditation Pavilions"],
    nearbyAttractions: [
      { name: "Negombo Lagoon", distance: "0.1 km", description: "Breathtaking estuary perfect for private boat rides and watching traditional fishers." },
      { name: "Hamilton Canal", distance: "4 km", description: "Historic canal system constructed during the Dutch era." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=600&q=80"
    ],
    reviews: [
      { author: "Nils Sjöberg", rating: 5, comment: "Only 20 minutes from the airport but feels worlds away. Sunset at the pool is spectacular.", date: "2026-05-30" }
    ],
    faqs: [
      { question: "How far is the airport?", answer: "Negombo International Airport is located just 15 minutes away." }
    ],
    policies: ["Check-in at 2:00 PM, Check-out at 12:00 PM"],
    mapCoordinates: { lat: 7.2111, lng: 79.8386 },
    featured: false,
  },
  {
    _id: "65d3ec62b083c659d81d6435",
    slug: "earls-royal-kandy",
    name: "Earls Royal Kandy",
    location: "Kandy",
    description: "A mountain fortress hotel overlooking the Mahaweli River, paying tribute to Kandy's imperial heritage.",
    longDescription: "Located on a high hill overlooking the sweeping bends of the Mahaweli River, Earls Royal Kandy is a cultural masterpiece. The architecture features Kandyan style stone columns, hand-drawn murals of national history, and high timber roofs. Surrounded by rainforest, it provides an exquisite gateway to the sacred Temple of the Tooth and the cultural legacy of Sri Lanka's last royal kingdom.",
    rating: 5,
    startingPrice: 310,
    images: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80"
    ],
    facilities: ["Mahaweli View Infinity Pool", "Cultural Performing Arts Pavilion", "Imperial Ballroom", "Native Herb Spa", "Helipad Access", "Signature High Tea Terrace"],
    nearbyAttractions: [
      { name: "Temple of the Tooth Relic", distance: "4.5 km", description: "Sacred golden-roofed temple housing Sri Lanka's most venerated Buddhist relic." },
      { name: "Royal Botanical Gardens", distance: "6 km", description: "Famed botanical sanctuary with collections of rare orchids and giant palms." }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80"
    ],
    reviews: [
      { author: "Isabella Cruz", rating: 5, comment: "Unbelievable architecture. Watching traditional drummers perform at sunset was hypnotic.", date: "2026-06-15" }
    ],
    faqs: [
      { question: "Do you organize temple tours?", answer: "Yes, our cultural concierge arranges private, guided tours to the Temple of the Tooth." }
    ],
    policies: ["Check-in at 2:00 PM, Check-out at 12:00 PM", "Respectful attire required for cultural tours"],
    mapCoordinates: { lat: 7.2906, lng: 80.6337 },
    featured: true,
  },
];

export const MOCK_ROOMS = MOCK_HOTELS.flatMap((hotel) => [
  {
    _id: `room-deluxe-${hotel.slug}`,
    hotel: hotel._id,
    slug: "deluxe-room",
    name: "Deluxe Room",
    description: "An elegant, light-filled space featuring custom teak furnishings, state-of-the-art tech, and a private terrace overlooking beautiful landscapes.",
    size: "55 sqm",
    bedType: "King Size Bed",
    occupancy: { adults: 2, children: 1 },
    price: hotel.startingPrice,
    amenities: ["Private Balcony", "Pre-stocked Minibar", "Nespresso Machine", "High-speed Wi-Fi", "Walk-in Rain Shower", "Luxury Bathrobes"],
    images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"],
  },
  {
    _id: `room-premier-${hotel.slug}`,
    hotel: hotel._id,
    slug: "premier-room",
    name: "Premier Room",
    description: "Elevated luxury with expansive view ports, an open layout parlor, and a free-standing stone soaking bathtub.",
    size: "70 sqm",
    bedType: "King Size Bed",
    occupancy: { adults: 2, children: 2 },
    price: Math.round(hotel.startingPrice * 1.3),
    amenities: ["Stone Soaking Bathtub", "Premium Sound System", "Spacious Daybed", "Twice-daily Housekeeping", "Bespoke Toiletries"],
    images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80"],
  },
  {
    _id: `room-executive-${hotel.slug}`,
    hotel: hotel._id,
    slug: "executive-suite",
    name: "Executive Suite",
    description: "A prestigious residence featuring a separate dining salon, a master bedroom, and dedicated 24-hour butler assistance.",
    size: "110 sqm",
    bedType: "California King",
    occupancy: { adults: 3, children: 2 },
    price: Math.round(hotel.startingPrice * 1.8),
    amenities: ["24-Hour Butler Service", "Separate Dining Salon", "Integrated Kitchenette", "Walk-in Dressing Room", "Complimentary Lounge Access"],
    images: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"],
  },
  {
    _id: `room-royal-${hotel.slug}`,
    hotel: hotel._id,
    slug: "royal-suite",
    name: "Royal Suite",
    description: "The peak of regal living. A sprawling palace footprint offering custom museum-grade tapestries, an outdoor private plunge pool, and library lounge.",
    size: "180 sqm",
    bedType: "California King",
    occupancy: { adults: 4, children: 2 },
    price: Math.round(hotel.startingPrice * 2.5),
    amenities: ["Private Plunge Pool", "Library Lounge & Study", "Private Chef Kitchen", "Complimentary Airport VIP Transfer", "Unlimited Spa Treatments"],
    images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"],
  },
  {
    _id: `room-presidential-${hotel.slug}`,
    hotel: hotel._id,
    slug: "presidential-villa",
    name: "Presidential Villa",
    description: "A secure, secluded compound of unmatched proportions. Multiple standalone pavilions, private gym, infinity pool, and wellness deck.",
    size: "350 sqm",
    bedType: "2 California Kings",
    occupancy: { adults: 6, children: 4 },
    price: Math.round(hotel.startingPrice * 4.0),
    amenities: ["Private 15m Infinity Pool", "Secluded Rainforest Compound", "In-villa Wellness Deck", "Dedicated Butler & Maid Team", "Private Bar & Lounge"],
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"],
  },
]);
