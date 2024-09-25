import Hero from "@/components/Category/Hero";
import AuthNavbar from "@/components/navbar/auth_navbar";

export default function CategoriesPage() {
  return (
    <div className="bg-white relative pb-12">
      {/* Left Image */}
      <img className="absolute z-0 left-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
      {/* Right Image */}
      <img className="absolute z-0 rotate-180 right-0 top-[40px] w-[600px]" src="/CIRCLES.png" alt="workalat" />
      <AuthNavbar />
      <Hero />
    </div>
  );
}
