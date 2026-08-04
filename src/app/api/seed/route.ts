import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Hotel from "@/models/Hotel";
import Room from "@/models/Room";
import Restaurant from "@/models/Restaurant";
import Spa from "@/models/Spa";
import Wedding from "@/models/Wedding";
import Testimonial from "@/models/Testimonial";
import FAQ from "@/models/FAQ";
import Gallery from "@/models/Gallery";
import Admin from "@/models/Admin";
import Offer from "@/models/Offer";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await dbConnect();

    // 1. Clear existing collections
    await Hotel.deleteMany({});
    await Room.deleteMany({});
    await Restaurant.deleteMany({});
    await Spa.deleteMany({});
    await Wedding.deleteMany({});
    await Testimonial.deleteMany({});
    await FAQ.deleteMany({});
    await Gallery.deleteMany({});
    await Admin.deleteMany({});
    await Offer.deleteMany({});

    // 2. Hash admin password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("luxuryRedefined2026", salt);

    // 3. Create Admin
    await Admin.create({
      email: "admin@earlsgroup.lk",
      passwordHash,
      name: "Earls Admin",
      role: "admin",
    });

    // 4. Create Offers
    const offers = await Offer.create([
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
    ]);

    // 5. Create FAQs
    await FAQ.create([
      { question: "What is the check-in and check-out time?", answer: "Check-in time is from 2:00 PM onwards, and check-out is before 12:00 PM.", category: "Policies" },
      { question: "Do you offer complimentary airport transfers?", answer: "We offer complimentary transfers for all guests staying in our Royal Suite and Presidential Villa. For other room categories, transfers can be arranged for a fee.", category: "Services" },
      { question: "Can I book a private beach dinner?", answer: "Yes, our culinary team can design a bespoke private beach dinner experience. Please contact concierge 24 hours in advance.", category: "Dining" },
    ]);

    // 6. Create Testimonials
    await Testimonial.create([
      {
        name: "Sophia Martinez",
        role: "Luxury Travel Journalist",
        hotelName: "Earl's Regent Beruwala",
        content: "A magnificent blend of coastal serenity and timeless elegance. The beach views and hospitality were a daily highlight.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      },
      {
        name: "Arthur Pendelton",
        role: "CEO, Pendelton Ventures",
        hotelName: "Earl's Red Colombo",
        content: "The rooms provided a flawless workspace and proximity to city life. Exemplary, attentive service throughout my stay.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
      },
      {
        name: "Chloe & Daniel",
        role: "Newlyweds",
        hotelName: "Earl's Regency Kandy",
        content: "Our wedding photoshoot in Kandy was a fairy tale. The views of the Mahaweli River are something we will never forget.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&h=150&q=80",
      },
    ]);

    // 7. Create Spa Treatments
    await Spa.create([
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
    ]);

    // 8. Create Wedding Venues / Packages
    await Wedding.create([
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
    ]);

    // 9. Create Gallery Elements
    await Gallery.create([
      { title: "Ocean Infinity Pool", type: "image", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80", category: "Facilities" },
      { title: "Highland Retreat Facade", type: "image", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80", category: "Exterior" },
      { title: "Presidential Villa Dining", type: "image", url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80", category: "Suites" },
      { title: "Signature Dining", type: "image", url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80", category: "Dining" },
    ]);

    // 10. Seed Hotels and Rooms
    const hotelsData = [
      {
        slug: "earls-regency-kandy",
        name: "Earl's Regency Kandy",
        location: "Kandy",
        description: "A premier 5-star luxury hotel in the cultural capital of Kandy, offering stunning river and mountain views.",
        longDescription: "Perched on a ridge overlooking the majestic Mahaweli River and surrounded by the lush green hills of the Knuckles Mountain Range, Earl's Regency Kandy offers the ultimate royal treatment. Experience high-end luxury, a world-class wellness spa, fine dining options, and classic architecture that captures the historic spirit of Kandy.",
        rating: 5,
        startingPrice: 160,
        images: [
          "https://images.trvl-media.com/lodging/2000000/1530000/1523200/1523191/037f3b98.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80"
        ],
        facilities: ["Mahaweli River View Pool", "Premium Ayurvedic Spa", "Fine Dining Restaurants", "Helipad Access", "24/7 Concierge", "Tennis Courts"],
        nearbyAttractions: [
          { name: "Temple of the Tooth Relic", distance: "4.8 km", description: "The sacred golden-roofed temple housing Sri Lanka's most venerated Buddhist relic." },
          { name: "Udawatta Kele Sanctuary", distance: "4.2 km", description: "A historic forest reserve on a hill ridge in the city of Kandy." }
        ],
        gallery: [
          "https://images.trvl-media.com/lodging/2000000/1530000/1523200/1523191/037f3b98.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80"
        ],
        reviews: [
          { author: "Sarah Jenkins", rating: 5, comment: "Absolutely breathtaking views and wonderful Kandyan hospitality. The spa was amazing.", date: "2026-07-12" }
        ],
        faqs: [
          { question: "Is there a spa at the resort?", answer: "Yes, our luxury Ayurvedic spa offers custom wellness packages." }
        ],
        policies: ["Check-in from 2:00 PM, Check-out by 12:00 PM", "Respectful attire is recommended for nearby cultural visits"],
        mapCoordinates: { lat: 7.2941, lng: 80.6698 },
        featured: true,
        heroVideo: "https://res.cloudinary.com/dnj5bft7g/video/upload/v1785858638/13263196_2160_3840_50fps_1_ijqdhg.mp4",
      },
      {
        slug: "earls-regent-kandy",
        name: "Earl's Regent Kandy",
        location: "Kandy",
        description: "A serene escape in the green hills of Kandy, combining modern comfort with rich Kandyan tradition.",
        longDescription: "Nestled in the tranquil valleys of the hill capital, Earl's Regent Kandy is a boutique oasis designed for peaceful relaxation. Boasting beautifully landscaped gardens, a refreshing outdoor pool, an elegant dining restaurant, and contemporary rooms, it provides a perfect base to explore the historical sights of Kandy.",
        rating: 4,
        startingPrice: 110,
        images: [
          "https://q-xx.bstatic.com/xdata/images/hotel/max500/241267184.jpg?k=feeea5cee7b111ed165cd8aa3669558505e96598551fe97d7fa588cca314ab7f&o=",
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80"
        ],
        facilities: ["Outdoor Swimming Pool", "Lush Garden Paths", "Ayurvedic Treatment Center", "Bar & Lounge", "Fitness Center", "High-speed Wi-Fi"],
        nearbyAttractions: [
          { name: "Royal Botanical Gardens", distance: "3.5 km", description: "Renowned botanical garden famous for its orchid collection and palm avenues." }
        ],
        gallery: [
          "https://q-xx.bstatic.com/xdata/images/hotel/max500/241267184.jpg?k=feeea5cee7b111ed165cd8aa3669558505e96598551fe97d7fa588cca314ab7f&o="
        ],
        reviews: [
          { author: "David Miller", rating: 4, comment: "Lovely green surroundings and peaceful environment. Ideal for relaxing after sightseeing.", date: "2026-06-28" }
        ],
        faqs: [
          { question: "How far is the hotel from Kandy city center?", answer: "The hotel is roughly 3.5 km away from the main Kandy city center." }
        ],
        policies: ["Check-in from 2:00 PM, Check-out by 12:00 PM"],
        mapCoordinates: { lat: 7.2798, lng: 80.6285 },
        featured: true,
        heroVideo: "https://res.cloudinary.com/dnj5bft7g/video/upload/v1785855719/12132929_2160_3840_60fps_1_kkiwsr.mp4",
      },
      {
        slug: "earls-regent-negombo",
        name: "Earl's Regent Negombo",
        location: "Negombo",
        description: "A contemporary lagoon-side sanctuary close to the airport, ideal for transit and beachside relaxation.",
        longDescription: "Superbly located near the tranquil Negombo Lagoon and just 20 minutes from the international airport, Earl's Regent Negombo is an upscale haven of comfort. Combining modern aesthetics with tropical warmth, the hotel features spacious accommodations, a stunning swimming pool, and fine dining that highlights local seafood and global dishes.",
        rating: 4,
        startingPrice: 95,
        images: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyKt_1GyiiK7TFeOXu0PkTKmFG8URhCWXB53vWtY6Rtlo6E5dIAJvpYQI3&s=10",
          "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80"
        ],
        facilities: ["Lagoon-side Pool", "Sea Food Restaurant", "Airport Shuttle Service", "Cocktail Bar", "Spa & Massage Room", "Meeting Venue"],
        nearbyAttractions: [
          { name: "Negombo Lagoon", distance: "0.5 km", description: "A vast lagoon perfect for boat tours and exploring local mangrove forests." },
          { name: "Hamilton Canal", distance: "3.2 km", description: "Historic canal system constructed during the Dutch era." }
        ],
        gallery: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyKt_1GyiiK7TFeOXu0PkTKmFG8URhCWXB53vWtY6Rtlo6E5dIAJvpYQI3&s=10"
        ],
        reviews: [
          { author: "Jessica Fletcher", rating: 5, comment: "Perfect place to rest after a long flight. Very clean and excellent pool.", date: "2026-05-18" }
        ],
        faqs: [
          { question: "Does the hotel provide airport transfers?", answer: "Yes, airport transfers can be arranged on request for a small surcharge." }
        ],
        policies: ["Check-in from 2:00 PM, Check-out by 12:00 PM"],
        mapCoordinates: { lat: 7.2185, lng: 79.8402 },
        featured: true,
        heroVideo: "https://res.cloudinary.com/dnj5bft7g/video/upload/v1785858638/13263196_2160_3840_50fps_1_ijqdhg.mp4",
      },
      {
        slug: "earls-regent-beruwala",
        name: "Earl's Regent Beruwala",
        location: "Beruwala",
        description: "A coastal retreat along Beruwala's golden sandy beaches, offering sun, sand, and modern luxury.",
        longDescription: "Located on Sri Lanka's beautiful southwest coast, Earl's Regent Beruwala presents an idyllic escape. Listen to the ocean waves crash, take a dip in our expansive pool, or walk along the golden shoreline. The hotel brings together modern room amenities, fresh seafood dining, and traditional ayurvedic treatments for a complete beach holiday.",
        rating: 4,
        startingPrice: 120,
        images: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/247298373.jpg?k=8459a68518c8759411086de0a44d2ba2ce349b779e1c4281896d157dc83436f0&o=",
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80"
        ],
        facilities: ["Beachfront Access", "Main Pool & Sunbeds", "Seafood Beach Restaurant", "Ayurvedic Treatment Spa", "Diving & Water Sports Center", "Sunset Bar"],
        nearbyAttractions: [
          { name: "Beruwala Light House", distance: "3.0 km", description: "Located on a small island, offering panoramic views of the coastal line." },
          { name: "Brief Garden", distance: "9.5 km", description: "Beautiful landscaped garden by the legendary Bevis Bawa." }
        ],
        gallery: [
          "https://cf.bstatic.com/xdata/images/hotel/max1024x768/247298373.jpg?k=8459a68518c8759411086de0a44d2ba2ce349b779e1c4281896d157dc83436f0&o="
        ],
        reviews: [
          { author: "Nils Anderson", rating: 4, comment: "Beautiful beach views and comfortable bed. We loved the sea breeze and fresh fish.", date: "2026-07-29" }
        ],
        faqs: [
          { question: "Is the beach safe for swimming?", answer: "Yes, Beruwala beach is generally suitable for swimming during the season, and lifeguards are stationed." }
        ],
        policies: ["Check-in from 2:00 PM, Check-out by 12:00 PM"],
        mapCoordinates: { lat: 6.4782, lng: 79.9829 },
        featured: true,
        heroVideo: "https://res.cloudinary.com/dnj5bft7g/video/upload/v1785814218/6242776-hd_1080_1920_30fps_c7dhhd.mp4",
      },
      {
        slug: "earls-red-colombo",
        name: "Earl's Red Colombo",
        location: "Colombo",
        description: "A trendy and vibrant boutique hotel in Colombo, offering stylish urban rooms and modern convenience.",
        longDescription: "Step into Earl's Red Colombo, where style meets city life. Designed for smart travelers, this boutique hotel features bold red decor, modern abstract art, comfy beds, and premium city-center amenities. Situated close to shopping malls, parks, and dining options, it is the perfect base for your business or city exploration.",
        rating: 3,
        startingPrice: 80,
        images: [
          "https://earlsred.hotels-colombo.com/data/Images/OriginalPhoto/17273/1727384/1727384653/colombo-earl-s-red-colombo-image-11.JPEG",
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
        ],
        facilities: ["Boutique Cafe", "Rooftop City Terrace", "Business Station", "Modern Gym", "Free Fast Wi-Fi", "Tour Desk"],
        nearbyAttractions: [
          { name: "Galle Face Green", distance: "2.8 km", description: "Famous urban park overlooking the ocean, great for street food and sunset walks." },
          { name: "Colombo Town Hall", distance: "1.2 km", description: "Neo-classical colonial building in front of Viharamahadevi Park." }
        ],
        gallery: [
          "https://earlsred.hotels-colombo.com/data/Images/OriginalPhoto/17273/1727384/1727384653/colombo-earl-s-red-colombo-image-11.JPEG"
        ],
        reviews: [
          { author: "Chloe Bennet", rating: 4, comment: "Super clean rooms, friendly staff, and very close to the center. Great value for money.", date: "2026-06-19" }
        ],
        faqs: [
          { question: "Is there high-speed Wi-Fi?", answer: "Yes, free high-speed Wi-Fi is available throughout all rooms and public spaces." }
        ],
        policies: ["Check-in from 2:00 PM, Check-out by 12:00 PM", "No pets allowed"],
        mapCoordinates: { lat: 6.9032, lng: 79.8550 },
        featured: true,
        heroVideo: "https://res.cloudinary.com/dnj5bft7g/video/upload/v1785858638/13263196_2160_3840_50fps_1_ijqdhg.mp4",
      },
      {
        slug: "kandy-city-hotel",
        name: "Kandy City Hotel",
        location: "Kandy",
        description: "Located in the absolute heart of Kandy, offering super convenience, clean rooms, and city views.",
        longDescription: "Kandy City Hotel by Earl's is the most convenient choice for visitors wishing to stay in the middle of all the action. Located just steps away from the sacred Temple of the Tooth Relic, Kandy Lake, and local markets, it provides cozy, air-conditioned rooms, a lively cafe, and warm service.",
        rating: 3,
        startingPrice: 70,
        images: [
          "https://www.earlshotels.com/Kandy-City-Hotel/public/media/26032026185704-Untitled-1.jpg",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
        ],
        facilities: ["City Cafe & Bakery", "24-Hour Front Desk", "Luggage Storage", "Travel and Car Rentals", "Room Service", "High-speed Wi-Fi"],
        nearbyAttractions: [
          { name: "Temple of the Tooth Relic", distance: "0.5 km", description: "One of the most sacred Buddhist shrines in the world, containing the relic of the tooth of Buddha." },
          { name: "Kandy Lake", distance: "0.4 km", description: "A picturesque artificial lake built in 1807 by King Sri Wickrama Rajasinghe." }
        ],
        gallery: [
          "https://www.earlshotels.com/Kandy-City-Hotel/public/media/26032026185704-Untitled-1.jpg"
        ],
        reviews: [
          { author: "Alan Walker", rating: 4, comment: "Ideal location for tourist spots. Super clean rooms and friendly staff.", date: "2026-05-24" }
        ],
        faqs: [
          { question: "Is the Temple of the Tooth within walking distance?", answer: "Yes, it is only a 5-minute walk from the hotel." }
        ],
        policies: ["Check-in from 2:00 PM, Check-out by 12:00 PM"],
        mapCoordinates: { lat: 7.2925, lng: 80.6358 },
        featured: true,
        heroVideo: "https://res.cloudinary.com/dnj5bft7g/video/upload/v1785855719/12132929_2160_3840_60fps_1_kkiwsr.mp4",
      },
      {
        slug: "earls-red-kandy",
        name: "Earl's Red Kandy",
        location: "Kandy",
        description: "A charming and affordable bed-and-breakfast hotel nestled in Kandy's scenic hills.",
        longDescription: "Located slightly away from the city noise in Pujapitiya, Kandy, Earl's Red Kandy is a cozy 7-room bed and breakfast. It offers clean, budget-friendly accommodation, helpful staff, and a peaceful garden terrace for enjoying morning tea in the cooler hills.",
        rating: 3,
        startingPrice: 60,
        images: [
          "https://earls-red-20112.kandy-hotels.com/data/Pics/OriginalPhoto/10090/1009040/1009040239/earl-s-red-kandy-kandy-pic-1.JPEG",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
        ],
        facilities: ["Quiet Garden Terrace", "Cozy Dining Area", "24/7 Hot Water", "On-site Parking", "Tour Planning", "Free Wi-Fi"],
        nearbyAttractions: [
          { name: "Bahirawakanda Vihara Buddha Statue", distance: "4.5 km", description: "Giant seated Buddha statue offering panoramic views over Kandy." }
        ],
        gallery: [
          "https://earls-red-20112.kandy-hotels.com/data/Pics/OriginalPhoto/10090/1009040/1009040239/earl-s-red-kandy-kandy-pic-1.JPEG"
        ],
        reviews: [
          { author: "Tanya Roberts", rating: 4, comment: "Sweet little bed and breakfast. Super quiet and very cheap.", date: "2026-07-03" }
        ],
        faqs: [
          { question: "Is breakfast included?", answer: "Yes, a delicious local breakfast is included in the room rate." }
        ],
        policies: ["Check-in from 2:00 PM, Check-out by 12:00 PM"],
        mapCoordinates: { lat: 7.3761, lng: 80.5836 },
        featured: false,
        heroVideo: "https://res.cloudinary.com/dnj5bft7g/video/upload/v1785814218/6242776-hd_1080_1920_30fps_c7dhhd.mp4",
      },
      {
        slug: "earls-red-pasikuda",
        name: "Earl's Red Pasikuda",
        location: "Pasikuda",
        description: "A tropical getaway near Passikudah Beach, offering beautiful beaches, a swimming pool, and ocean air.",
        longDescription: "Located just 200 meters from the pristine, warm, shallow waters of Passikudah Beach, Earl's Red Pasikuda (formerly Earl's Passi Bay Hotel) is your perfect tropical escape. Relax by the outdoor pool, rent cycles to explore the coastal village, or take boat rides in the shallow bay. The resort offers air-conditioned comfort, a multi-cuisine restaurant, and top-tier Sri Lankan hospitality.",
        rating: 3,
        startingPrice: 90,
        images: [
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80"
        ],
        facilities: ["Outdoor Swimming Pool", "Bicycle & Golf Cart Rental", "Multi-cuisine Restaurant", "Billiards & Games", "Boat Tour Organizing", "Fast Wi-Fi"],
        nearbyAttractions: [
          { name: "Passikudah Beach", distance: "0.2 km", description: "World-famous flat beach with shallow crystal clear water extending far into the ocean." },
          { name: "Batticaloa Lagoon", distance: "28.0 km", description: "Scenic coastal lagoon famous for its 'singing fish' during dry season." }
        ],
        gallery: [
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80"
        ],
        reviews: [
          { author: "Nils Sjöberg", rating: 4, comment: "Loved the quiet beach and clean pool. Very relaxed vibe.", date: "2026-07-21" }
        ],
        faqs: [
          { question: "How far is the beach?", answer: "The hotel is just a 3-minute walk (200m) from Passikudah beach." }
        ],
        policies: ["Check-in from 2:00 PM, Check-out by 12:00 PM", "Cash payment only at property"],
        mapCoordinates: { lat: 7.9304, lng: 81.5645 },
        featured: false,
        heroVideo: "https://res.cloudinary.com/dnj5bft7g/video/upload/v1785858638/13263196_2160_3840_50fps_1_ijqdhg.mp4",
      },
    ];

    const seededHotels = [];

    for (const hData of hotelsData) {
      const hotel = await Hotel.create(hData);
      seededHotels.push(hotel);

      // Create rooms for this hotel
      const roomsData = [
        {
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
          video: "https://res.cloudinary.com/dnj5bft7g/video/upload/v1785762358/13394638_1080_1920_30fps_zqt2zl.mp4",
        },
        {
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
          video: "https://res.cloudinary.com/dnj5bft7g/video/upload/v1785762404/16396054_2160_3840_50fps_y9zq0w.mp4",
        },
        {
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
          video: "https://res.cloudinary.com/dnj5bft7g/video/upload/v1785762419/15781369_2160_3840_60fps_amcjsf.mp4",
        },
        {
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
          video: "https://res.cloudinary.com/dnj5bft7g/video/upload/v1785762477/6466566-uhd_2160_4096_25fps_r7scmz.mp4",
        },
        {
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
          video: "https://res.cloudinary.com/dnj5bft7g/video/upload/v1785762531/6466568-uhd_2160_4096_25fps_a3woqv.mp4",
        },
      ];

      await Room.create(roomsData);

      // Create Restaurant for this hotel
      await Restaurant.create({
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
      });
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      summary: {
        admins: 1,
        offers: 2,
        faqs: 3,
        testimonials: 3,
        spa: 3,
        weddings: 2,
        hotels: seededHotels.length,
        rooms: seededHotels.length * 5,
        restaurants: seededHotels.length,
      },
    });
  } catch (error: any) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "An error occurred during seeding" },
      { status: 500 }
    );
  }
}
