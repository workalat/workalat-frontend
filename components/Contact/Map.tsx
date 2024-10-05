const Map = () => {
  // here should be the real location link
  const location =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.727748929699!2d0.21920871267619835!3d51.44479357168149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8b190914467a7%3A0x6126d49b33bd5b6a!2sTexcel%20Developments%20Ltd%20-%20Concord%20House%20-%20Dartford!5e0!3m2!1sen!2s!4v1728128975955!5m2!1sen!2s";

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
