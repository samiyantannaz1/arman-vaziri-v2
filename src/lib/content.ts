export const services = [
  {
    slug: "equipment",
    title: "EQUIPMENT",
    description:
      "Our experienced procurement team will select, negotiate, purchase and install all your furniture, appliances and decor according to the implementation and project schedules. You will not need to worry whether the curtains should be this color, where to find them, or whether the sofa will arrive on time. Significant savings in your money and time.",
  },
  {
    slug: "interior-design",
    title: "INTERIOR DESIGN",
    description:
      "We will create a space in which it will be comfortable and cozy for you. After all, the interior is dictated by the habits, preferences and characters of its owners, and not by fleeting trends. We will create a space that will live in your rhythm. At the center of every project is you.",
  },
  {
    slug: "architectural-design",
    title: "ARCHITECTURAL DESIGN",
    description:
      "Beautiful architecture is a living, thoughtful and functional space in which to live, not just sleep. We will create it for you, taking into account all your wishes. A house for a large family, a villa on the coast, a house in the forest: you can trust us with any of your dreams.",
  },
  {
    slug: "renovation",
    title: "RENOVATION",
    description:
      "With minimal investment, we will update your favorite old house, restaurant or hotel. The charm of the past will remain, but the fatigue of years will disappear, so the space can serve for many years to come.",
  },
  {
    slug: "authors-supervision",
    title: "AUTHOR’S SUPERVISION",
    description:
      "We will take care of all the pains of repair and make sure that beautiful pictures of interiors become your new reality. Our specialists will control all stages of implementation, contractors and timings. You will only have to enjoy the result.",
  },
  {
    slug: "implementation",
    title: "IMPLEMENTATION",
    description:
      "Combines equipment and author’s supervision services. We, as conductors of the choir, manage all the processes. Significant savings in your money and time.",
  },
] as const;

export const stages = [
  {
    title: "Start",
    description:
      "We start by studying your project, taking all needed measurements and choosing a style for it.",
  },
  {
    title: "Plan",
    description:
      "Then we process a point-by-point plan and present several examples for you.",
  },
  {
    title: "Visualization",
    description:
      "At this stage we create detailed visualization for each room to provide you with an overall picture.",
  },
  {
    title: "Album",
    description:
      "The design project album with all plans and visualizations is ready.",
  },

] as const;

export const projectTypes = [
  "Interior Design",
  "Architecture",
  "Commercial Project",
  "Other",
] as const;

export const about = {
  title: "About our company",
  subtitle: "Full cycle studio of design and architecture",
  // متن موقت: بعداً با متن واقعی جایگزین کن
  paragraphs: [
    "Arman Vaziri Studio brings together more than ten years of experience in architecture and interior design. Every project begins with listening: to the client, to the site and to the way a space will be lived in.",
    "From concept development and detailed drawings to high-quality 3D visualizations and author’s supervision on site, we guide each project from the first sketch to the final detail.",
  ],
} as const;

// image = اسم فایل تو public/images/site (بدون پسوند)
export const team = [
  { name: "Arman Vaziri", role: "Founder", image: "arman" },
  // { name: "Name Surname", role: "Co-owner", image: "team-2" },
] as const;