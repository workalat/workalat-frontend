import React, { useState } from "react";
import Image from "next/image";
import { IoMdSearch } from "react-icons/io";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const faqItems = [
    {
      question: "What is WorkAlat and how does it work?",
      answer: `WorkAlat is a platform that connects you with trusted service providers across various industries. Simply post a project, receive quotes from qualified professionals, and choose the expert that fits your needs. It’s fast, easy, and free to use!`,
    },
    {
      question: "Is it free to post a job on WorkAlat?",
      answer: `Yes! Posting a job and receiving quotes from service providers is completely free.`,
    },
    {
      question: "How do I find the right professional?",
      answer: `Once you post a job, you’ll receive quotes from relevant service providers. You can review their profiles, past client reviews, and portfolios before deciding on the best expert for your project.`,
    },
    {
      question: "Can I communicate with service providers before hiring them?",
      answer: `Absolutely! You can chat with providers directly through our platform to clarify details, ask questions, or request more information before making a decision. Service providers also has access to your phone number and email to discuss directly with you`,
    },
    {
      question: "What if I’m not satisfied with the work?",
      answer: `If you’re unhappy with the quality of the work, communicate with the service provider first to resolve any issues. If a resolution cannot be reached, you can contact our support team to mediate and help you find a fair solution.`,
    },
    {
      question: "How do I leave a review?",
      answer: `Once a job is completed, you’ll receive a prompt to leave a review. Share your experience by rating the provider and writing a detailed review to help other clients make informed decisions.`,
    },
    {
      question: "How do I sign up as a professional?",
      answer: `Sign up is free and easy! Create a profile, list your services, upload your portfolio, and start receiving job leads tailored to your skills and location. Simply click Join as a Service Provider on the homepage to get started.`,
    },
    {
      question: "Is it free to join WorkAlat as a service provider?",
      answer: `Yes! Signing up and creating a profile is completely free. You only pay a token on points to bid for the project clients post on our platform.`,
    },
    {
      question: "How do I receive job leads?",
      answer: `Once your profile is complete, you’ll start receiving notifications about relevant job opportunities that match your expertise and location. You can review the project details and send quotes to the clients who interest you.`,
    },
    {
      question: "How do I send a quote to a client?",
      answer: `When you see a job leads that fits your skills, simply click “Contact Client” and provide a detailed proposal outlining your pricing, timeline, and approach. You can also communicate directly with the client for further clarification.`,
    },
    {
      question: "What happens if a client disputes my work?",
      answer: `If a client is unsatisfied, try to resolve the issue directly through communication. If the problem persists, our support team is here to mediate and help find a solution that works for both sides.`,
    },
    {
      question: "How do I build my reputation on WorkAlat?",
      answer: `Providing excellent service, clear communication, and meeting deadlines will earn you great reviews from clients. Positive ratings and detailed feedback will increase your visibility and attract more job opportunities.`,
    },
  ];
  // Filter FAQ items based on search query
  const filteredFaqItems = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery) ||
      item.answer.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="faq-section">
      <h2 className="text-xl font-bold">FAQs</h2>
      {/* Horizontal line */}
      <div className="w-full h-[1px] bg-gray-400 my-4" />

      {/* Search box */}
      <div className="flex items-center w-full md:w-1/2 border border-black rounded-md p-2 shadow-md">
        <IoMdSearch className="text-xl mr-2" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="How can we help you?"
          className="w-full p-2 outline-none text-sm"
        />
      </div>

      <h4 className="text-xl font-semibold pt-5">Popular</h4>

      {/* Filtered FAQs */}
      <div className="faq-list mt-3 mb-12 grid grid-cols-1 lg:grid-cols-2 gap-2">
        {filteredFaqItems.length > 0 ? (
          filteredFaqItems.map((item, index) => (
            <div key={index} className="faq-item mb-4">
              <div className="bg-white rounded-md shadow-md border border-black/30">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer border-b"
                  onClick={() => toggleOpen(index)}
                >
                  <p className="text-sm font-semibold">
                    {item.question?.substring(0, 70)}...
                  </p>
                  <Image
                    src="/icons/arrow_down_white.svg"
                    alt="toggle"
                    width={10}
                    height={10}
                    className={`transition-transform duration-300 ${openIndex === index ? "rotate-0" : "rotate-180"}`}
                  />
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? "max-h-[500px] p-4" : "max-h-0 p-0"}`}
                >
                  <p className="text-sm">{item.answer}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">
            No FAQs match your search query.
          </p>
        )}
      </div>
    </div>
  );
};

export default FAQ;
