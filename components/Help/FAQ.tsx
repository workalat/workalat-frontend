import React, { useState } from 'react';
import Image from 'next/image';
import { IoMdSearch } from 'react-icons/io';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleOpen = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const faqItems = [
        {
            question: "What is WorkAlat and how does it work?",
            answer: `Once you have clicked ‘Contact’ on the lead you have chosen, your details and WorkAlat profile will be sent to the potential customer. However, we would always recommend calling them directly to introduce yourself, let them know you’re interested, and make a great first impression.
            
            If they don’t answer your first call, that’s O.K. Try ringing them again at a more convenient time, such as lunchtime or when a typical working day would end (e.g., 6pm).
            
            We would then recommend heading over to My Responses and sending them an email or an estimate. You will very clearly see the options to do this in your My Responses section, under the lead's contact details.`,
        },
        {
            question: "Do you have any tips for getting hired on WorkAlat?",
            answer: `To enhance your chances on WorkAlat, focus on creating a compelling profile, actively engaging with clients, and ensuring your service offerings are detailed and accurate. Networking and having a polished portfolio can also help attract more opportunities.`,
        },
        {
            question: "What are Credit Pack Subscriptions?",
            answer: `Credit Pack Subscriptions offer a way to buy credits in bulk that can be used for accessing premium features or services. This system allows users to enhance their experience and maximize the value they get from the platform.`,
        },
        {
            question: "I am receiving leads from the wrong location, how can I change this?",
            answer: `You can update your location preferences in your account settings to ensure you receive leads that match your desired locations. Make sure your profile accurately reflects the areas you want to serve.`,
        },
        {
            question: "I am receiving leads for the wrong services, how can I change this?",
            answer: `Adjust your service preferences in your profile settings to better match the leads you want. Verify that all the service categories listed are correctly aligned with your actual offerings.`,
        },
        {
            question: "I am receiving leads for the right services but they are still not specific enough, can I fix this?",
            answer: `Review and refine your lead filters and preferences to ensure the leads you receive are more precise. Adding specific criteria can help in getting more targeted and relevant leads.`,
        },
        {
            question: "What is the Get Hired Guarantee and how does this work?",
            answer: `The Get Hired Guarantee provides assurances regarding lead quality and job placements. It usually includes a commitment to delivering high-quality leads or specific support to improve your hiring success.`,
        },
        {
            question: "How does WorkAlat screen and qualify the leads I receive?",
            answer: `WorkAlat utilizes both automated systems and manual reviews to screen and qualify leads, ensuring they meet quality standards before being sent to users. This helps in filtering out less relevant leads.`,
        },
        {
            question: "What’s Elite Pro and what’s included?",
            answer: `Elite Pro is a premium subscription tier that offers additional features such as enhanced visibility, priority customer support, and advanced performance analytics to boost your results on the platform.`,
        },
        {
            question: "What makes a great WorkAlat profile?",
            answer: `A standout WorkAlat profile features a professional profile image, comprehensive descriptions of your services, positive reviews from clients, and a strong portfolio that showcases your best work.`,
        },
        {
            question: "What is an Unsold Lead Subscription?",
            answer: `An Unsold Lead Subscription gives you access to leads that were not previously acted upon or sold. This can broaden your opportunities by tapping into leads that were missed or not picked up initially.`,
        },
        {
            question: "Should I keep my Elite Pro subscription?",
            answer: `Evaluate the benefits of your Elite Pro subscription by comparing the features and support you receive against your needs. If the subscription significantly enhances your performance and offers valuable perks, it might be worth maintaining.`,
        },
        {
            question: "Refer a friend!",
            answer: `Referral programs usually offer incentives for bringing new users to the platform. Check the details of the program to understand the rewards available for both you and your referral.`,
        },
        {
            question: "More on Whatworks.",
            answer: `Whatworks offers additional resources and support to maximize your use of the platform. Explore guides, tutorials, and updates to stay informed and leverage the platform’s full potential.`,
        },
    ];
    // Filter FAQ items based on search query
    const filteredFaqItems = faqItems.filter((item) =>
        item.question.toLowerCase().includes(searchQuery) || item.answer.toLowerCase().includes(searchQuery)
    );

    return (
        <div className="faq-section">
            <h2 className="text-xl font-bold">FAQs</h2>
            {/* Horizontal line */}
            <div className="w-full h-[1px] bg-gray-400 my-4"></div>

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

            <h4 className='text-xl font-semibold pt-5'>Popular</h4>

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
                                    <p className="text-sm font-semibold">{item.question?.substring(0, 70)}...</p>
                                    <Image
                                        src='/icons/arrow_down_white.svg'
                                        alt='toggle'
                                        width={10}
                                        height={10}
                                        className={`transition-transform duration-300 ${openIndex === index ? 'rotate-0' : 'rotate-180'}`}
                                    />
                                </div>
                                <div
                                    className={`transition-all duration-300 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-[500px] p-4' : 'max-h-0 p-0'}`}
                                >
                                    <p className="text-sm">{item.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500">No FAQs match your search query.</p>
                )}
            </div>
        </div>
    );
};

export default FAQ;