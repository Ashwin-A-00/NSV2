import { ZoomParallax } from "./ui/zoom-parallax";

const trendingJobs = [
  {
    id: "01",
    title: "AI/ML Engineer",
    category: "Artificial Intelligence",
    salary: "₹1,15,00,000 - ₹1,80,00,000",
    src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop",
    alt: "AI/ML Engineer"
  },
  {
    id: "02",
    title: "Full Stack Developer",
    category: "Web Engineering",
    salary: "₹90,00,000 - ₹1,50,00,000",
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    alt: "Full Stack Developer"
  },
  {
    id: "03",
    title: "Cloud Architect",
    category: "Infrastructure",
    salary: "₹1,25,00,000 - ₹2,00,00,000",
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    alt: "Cloud Architect"
  },
  {
    id: "04",
    title: "Cybersecurity Analyst",
    category: "Security",
    salary: "₹1,00,00,000 - ₹1,60,00,000",
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
    alt: "Cybersecurity Analyst"
  },
  {
    id: "05",
    title: "UI/UX Designer",
    category: "Design",
    salary: "₹70,00,000 - ₹1,20,00,000",
    src: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=2070&auto=format&fit=crop",
    alt: "UI/UX Designer"
  },
  {
    id: "06",
    title: "Data Scientist",
    category: "Analytics",
    salary: "₹95,00,000 - ₹1,55,00,000",
    src: "https://images.unsplash.com/photo-1551288049-bbda38a88ad8?q=80&w=2070&auto=format&fit=crop",
    alt: "Data Scientist"
  },
  {
    id: "07",
    title: "Blockchain Developer",
    category: "Web3",
    salary: "₹1,20,00,000 - ₹1,90,00,000",
    src: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2232&auto=format&fit=crop",
    alt: "Blockchain Developer"
  }
];

export const TrendingPaths = () => {
  return (
    <section id="trending" className="bg-black">
      <ZoomParallax images={trendingJobs} />
    </section>
  );
};
