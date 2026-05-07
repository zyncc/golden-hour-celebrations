import _ from "lodash";
import l1 from "../../public/l1.webp";
import l2 from "../../public/l2.webp";
import l3 from "../../public/l3.webp";
import l4 from "../../public/l4.webp";
import l5 from "../../public/l5.webp";
import l6 from "../../public/l6.webp";

import v1 from "../../public/v1.webp";
import v10 from "../../public/v10.webp";
import v11 from "../../public/v11.webp";
import v12 from "../../public/v12.webp";
import v2 from "../../public/v2.webp";
import v3 from "../../public/v3.webp";
import v4 from "../../public/v4.webp";
import v5 from "../../public/v5.webp";
import v6 from "../../public/v6.webp";
import v7 from "../../public/v7.webp";
import v8 from "../../public/v8.webp";
import v9 from "../../public/v9.webp";

export const advanceAmount = 1000;
export const cakePrice = 550;
export const candleLightRosePath = 349;
export const ledLetterLightAge = 49;
export const ledLetterLightName = 149;

export const TIME_ZONE = "Asia/Kolkata";

export const dreamscapeTimeSlots = [
  "9:30AM - 11:30AM",
  "12PM - 2PM",
  "2:30PM - 4:30PM",
  "5PM - 7PM",
  "7:30PM - 9:30PM",
  "10PM - 12AM",
];

export const EliteTimeSlots = [
  "10AM - 12PM",
  "12:30PM - 2:30PM",
  "3PM - 5PM",
  "5:30PM - 7:30PM",
  "8PM - 10PM",
  "10:30PM - 12:30AM",
];

export const items = [
  {
    id: 2,
    room: "Elite Theatre",
    description: [
      "Premium Decoration Setup",
      "Private Movie Time Experience",
      "LED Letter Name",
      "Access to OTT Platforms",
      "Upto 4 people (Max 10 people, additional ₹200 per person)",
    ],
    popular: true,
    price: 1899,
    photo: _.shuffle(["/l6.webp", "/l5.webp", "/l3.webp", "/l4.webp"]),
  },
  {
    id: 1,
    room: "Dreamscape Theatre",
    description: [
      "Private Movie Time Experience",
      "Cozy Romantic Date Decor",
      "LED Letter Name",
      "Access to OTT Platforms",
      "2 people (Max 4 people, additional ₹200 per person)",
    ],
    noPeople: 4,
    price: 1499,
    photo: _.shuffle(["/l1.webp", "/l4.webp", "/l5.webp", "/l6.webp"]),
  },
];

export const reviews = [
  {
    name: "Sameer Sam",
    description: "Beautiful ambiance ❤️ very sweet and supportive staff 🥂🩷",
    stars: 5,
  },
  {
    name: "Youtuberyash",
    description:
      "Such a beautiful place, decoration was amazing, u guys made our dayy, thank you so much, top class hospitality 👍",
    stars: 5,
  },
  {
    name: "Sri Vidya",
    description:
      "We all really loved it so much!! The decoration was really so good  thank you! And  the way you co operated with us!",
    stars: 5,
  },
  {
    name: "Puneetha gj",
    description:
      "Hi Golden hour team, Thank you and your team for organizing such a fantastic birthday party for us! Everything was so well-planned and executed, from the decorations to the activities.",
    stars: 5,
  },
  {
    name: "Bhaskar Totam",
    description:
      "We had a wonderful experience and created lasting memories on my special day. As a positive suggestion, using a digital DSLR camera could elevate the overall event from good to truly great by enhancing its richness👍",
    stars: 5,
  },
  {
    name: "Chaya Chandana",
    description:
      "The decoration was absolutely stunning and exceeded all my expectations!! Every detail was thoughtfully done from the color scheme to the arrangement and it created such a warm atmosphere, i couldn’t be more thankful. Highly recommended for anyone looking to add a magical touch to their event!!!",
    stars: 5,
  },
  {
    name: "shwetha nistalavar",
    description:
      "Had an amazing experience celebrating a birthday here! The ambiance was perfect, the staff was super helpful, and everything was beautifully organized. The decor , props and overall vibe made it a memorable celebration. Highly recommend this place for special occasions.",
    stars: 5,
  },
  {
    name: "Girish Prabhakar",
    description:
      "Nice hall for small family celebrations!! We watched RCB finals, and was a great experience!!! Food was amazing!!!!",
    stars: 5,
  },
  {
    name: "Lalitha S",
    description:
      "We just celebrated our 25th anniversary with my husband and our kids and it was so amazing. The whole thing was set up so well — the setup was lovely, with a warm and festive ambience that made the day so special.",
    stars: 5,
  },
];

export const faqData = [
  {
    question: "What types of events do you organize?",
    answer:
      "We plan a variety of special occasions, including birthdays, anniversaries, bridal showers, baby showers, Valentine's Day celebrations, and personal achievements.",
  },
  {
    question: "Where are your private theatres located?",
    answer:
      "Our private theatre venue is located in Jayanagar 4th Block, Bangalore, India 560041.",
  },
  {
    question: "How can I book an event with Golden Hour Celebrations?",
    answer: "You can book an event through our website at goldenhourcelebrations.in.",
  },
  {
    question: "What customization options are available for event decorations?",
    answer:
      "We offer personalized decorations tailored to your preferences to make your special day unique and memorable.",
  },
  {
    question: "Do you provide catering services for events?",
    answer:
      "Specific details about catering services are not provided on our website. Please contact us directly to discuss your requirements.",
  },
  {
    question: "What is the capacity of your private theatre?",
    answer:
      "For information regarding the seating capacity of our private theatre, please reach out to us directly.",
  },
  {
    question: "How far in advance should I book an event?",
    answer:
      "We recommend booking as early as possible to ensure availability, especially during peak seasons.",
  },
  {
    question: "What are your pricing packages?",
    answer:
      "For detailed information on pricing and packages, please visit our website or contact us directly.",
  },
  {
    question: "Do you offer event planning services outside of Bengaluru?",
    answer:
      "Currently, our services are focused on Bengaluru. For events outside this area, please contact us to discuss potential arrangements.",
  },
  {
    question: "How can I contact Golden Hour Celebrations for more information?",
    answer:
      "You can reach us through our website's contact page at goldenhourcelebrations.in.",
  },
];

export const cakes = [
  "Vancho Cake",
  "Blueberry Cheese Cake",
  "Choco Truffle Cake",
  "Rasmalai Cake",
  "Butter Scotch Crunch",
  "Black Forest Cake",
];

export const galleryImages = [
  { src: "/l1.webp", optimisedSource: l1 },
  { src: "/l2.webp", optimisedSource: l2 },
  { src: "/l3.webp", optimisedSource: l3 },
  { src: "/l4.webp", optimisedSource: l4 },
  { src: "/l5.webp", optimisedSource: l5 },
  { src: "/l6.webp", optimisedSource: l6 },

  { src: "/v1.webp", optimisedSource: v1 },
  { src: "/v2.webp", optimisedSource: v2 },
  { src: "/v3.webp", optimisedSource: v3 },
  { src: "/v4.webp", optimisedSource: v4 },
  { src: "/v5.webp", optimisedSource: v5 },
  { src: "/v6.webp", optimisedSource: v6 },
  { src: "/v7.webp", optimisedSource: v7 },
  { src: "/v8.webp", optimisedSource: v8 },
  { src: "/v9.webp", optimisedSource: v9 },
  { src: "/v10.webp", optimisedSource: v10 },
  { src: "/v11.webp", optimisedSource: v11 },
  { src: "/v12.webp", optimisedSource: v12 },
];
