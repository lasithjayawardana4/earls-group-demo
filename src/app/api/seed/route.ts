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
        slug: "earls-royal-kandy",
        name: "Earls Royal Kandy",
        location: "Kandy",
        description: "A mountain fortress hotel overlooking the Mahaweli River, paying tribute to Kandy's imperial heritage.",
        longDescription: "Located on a high hill overlooking the sweeping bends of the Mahaweli River, Earls Royal Kandy is a cultural masterpiece. The architecture features Kandyan style stone columns, hand-drawn murals of national history, and high timber roofs. Surrounded by lush tropical rainforest, it provides an exquisite gateway to the sacred Temple of the Tooth and the cultural legacy of Sri Lanka's last royal kingdom.",
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
