export const companyInfo = {
  name: "SHUBHAM FABRICS",
  legalName: "SHUBHAM FABRICS INDIA PRIVATE LIMITED",
  tagline: "Fabrics. Fashion. Tradition.",
  subTagline: "Where timeless fabrics meet contemporary expression.",
  gstin: "09ABDCS2090K1Z2",
  
  // Principal Address (Primary for contact, navigation, visits)
  principalAddress: {
    line1: "C-22/27, Sector-57",
    city: "Noida",
    district: "Gautam Buddha Nagar",
    state: "Uttar Pradesh",
    pincode: "201301",
    country: "India",
    full: "C-22/27, Sector-57, Noida, Gautam Buddha Nagar, Uttar Pradesh - 201301",
    lat: 28.5994,
    lng: 77.3625,
    mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=28.5994,77.3625&destination_place_id=ChIJN1t_tDeuEmsRUsoyG83frY4",
    googleMapsSearchUrl: "https://www.google.com/maps/search/?api=1&query=C-22%2F27%2C+Sector-57%2C+Noida%2C+Uttar+Pradesh+201301"
  },
  
  // Additional Business Address (Strictly maintained separately as per PRD)
  additionalAddress: {
    line1: "C 22/30, Sector-57",
    city: "Noida",
    district: "Gautam Buddha Nagar",
    state: "Uttar Pradesh",
    pincode: "201301",
    country: "India",
    full: "C 22/30, Sector-57, Noida, Gautam Buddha Nagar, Uttar Pradesh - 201301"
  },

  email: "shubhamfabricsindia1@gmail.com",
  phone: "+91 120 400 0000", // placeholder configurable contact line
  businessHours: "Monday to Saturday: 10:00 AM – 7:00 PM (IST)",
  
  brandStatement: "SHUBHAM FABRICS INDIA PRIVATE LIMITED is a distinguished Indian textile house and traditional women's fashion showroom based in Noida. We curate exquisite fabrics, intricately crafted suit sets, timeless kurtis, dupattas, and ethnic silhouettes that honor centuries of Indian weaving traditions while embracing contemporary silhouettes.",
  
  values: [
    {
      title: "Premium Quality Fabrics",
      description: "Carefully sourced natural yarns, masterfully woven cottons, lustrous silks, and airy georgettes.",
      icon: "ShieldCheck"
    },
    {
      title: "Authentic Craftsmanship",
      description: "Honoring traditional Indian embroidery, hand-block artistry, and bespoke tailoring nuances.",
      icon: "Sparkles"
    },
    {
      title: "Timeless Designs",
      description: "Silhouettes designed to transcend fleeting trends with enduring grace and understated luxury.",
      icon: "Compass"
    },
    {
      title: "Thoughtful Details",
      description: "From fabric drape to finishing stitches, every nuance is executed with uncompromising precision.",
      icon: "Feather"
    }
  ],
  
  navLinks: [
    { name: "Home", path: "/" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Clothing", path: "/clothing" },
    { name: "Fabrics", path: "/fabrics" },
    { name: "Best Sellers", path: "/best-sellers" },
    { name: "Fall in Love", path: "/fall-in-love" },
    { name: "About Us", path: "/about-us" },
    { name: "Contact", path: "/contact" }
  ]
};
