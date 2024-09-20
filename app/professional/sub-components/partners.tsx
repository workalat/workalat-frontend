import partner1Logo from "@/public/icons/partner1.svg";
import partner2Logo from "@/public/icons/partner2.svg";
import partner3Logo from "@/public/icons/partner3.svg";
import partner4Logo from "@/public/icons/partner4.svg";

const Partners = () => {
  return (
    <>
    
    <div className="flex gap-20 flex-wrap items-center justify-center">
      <img src={partner1Logo.src} alt="partner1" />
      <img src={partner2Logo.src} alt="partner2" />
      <img src={partner3Logo.src} alt="partner3" />
      <img src={partner4Logo.src} alt="partner4" />
    </div>
    </>
    
  );
};

export default Partners;
