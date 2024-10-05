const Map = () => {
  // here should be the real location link
  const location =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9066.02827962107!2d-3.4763092245659104!3d55.38405811719621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487d542431d50867%3A0x538def5f34500c8e!2sEricstane%2C%20Moffat%20DG10%209LT%2C%20UK!5e0!3m2!1sen!2skg!4v1727102689864!5m2!1sen!2skg";

  return (
    <div className="pt-6 container mx-auto max-w-7xl px-6">
      <h1 className="text-[36px] lg:text-[40px] sm:text-[36px] md:text-[38px] font-bold">
        Contact
      </h1>

      <iframe
        allowFullScreen
        title="location"
        className="w-full h-[400px] rounded-xl"
        src={location}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default Map;
