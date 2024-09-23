import Link from "next/link";
import { FaArrowRight, FaFacebookF, FaTwitter } from "react-icons/fa6";
import { ImLinkedin } from "react-icons/im";
import { RiInstagramFill } from "react-icons/ri";

const GetInTouch = () => {
    return (
        <div className="container mx-auto max-w-7xl px-6 pt-6">
            <div className="flex flex-col md:flex-row gap-7 justify-center py-12">
                {/* Left Section: Contact Information */}
                <div className="md:w-1/2 w-full px-5">
                    <h1 className="text-3xl lg:text-4xl md:text-3xl font-bold leading-snug mb-4">
                        Get in touch with <br /> us today
                    </h1>
                    <p className="text-lg text-gray-700 mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquam purus sit amet luctus venenatis lectus.
                    </p>
                    <div className="w-full h-[0.5px] bg-gray-400 mb-4"></div>

                    {/* Contact Info Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                        <div>
                            <h3 className="text-md font-semibold text-gray-600">GIVE US A CALL</h3>
                            <Link href="tel:+2121235467" className="block mt-1 text-base text-gray-600 hover:text-gray-800 transition-colors duration-200">(212) 123 - 5467</Link>
                        </div>
                        <div>
                            <h3 className="text-md font-semibold text-gray-600">EMAIL US</h3>
                            <Link href="mailto:contact@fwhatworks.com" className="block mt-1 text-base underline text-gray-600 hover:text-gray-800 transition-colors duration-200">contact@fwhatworks.com</Link>
                        </div>
                    </div>

                    {/* Social Share Links */}
                    <div className="flex items-center space-x-4 mt-6">
                        <h2 className="text-md font-medium text-gray-600">Or share via</h2>
                        <div className="flex space-x-4">
                            <a href="#" className="text-3xl text-[#425994] hover:text-gray-800 transition-colors duration-200">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="text-3xl text-[#6DABE9] hover:text-gray-600 transition-colors duration-200">
                                <FaTwitter />
                            </a>
                            <a href="#" className="text-3xl text-[#FF4853] hover:text-red-500 transition-colors duration-200">
                                <RiInstagramFill />
                            </a>
                            <a href="#" className="text-3xl text-[#2D7AF1] hover:text-gray-700 transition-colors duration-200">
                                <ImLinkedin />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right Section: Contact Form */}
                <div className="w-full md:w-1/2 px-4">
                    <div className="w-full p-8 bg-main text-[#ACACAC] rounded-md shadow-lg">
                        <form className="space-y-6">
                            {/* Row with Name and Email */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="off"
                                        className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:outline-none text-[#ACACAC]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        autoComplete="off"
                                        className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:outline-none text-[#ACACAC]"
                                    />
                                </div>
                            </div>

                            {/* Row with Phone Number and Company */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="phone-number" className="block text-sm font-medium">Phone number</label>
                                    <input
                                        type="text"
                                        name="phone-number"
                                        id="phone-number"
                                        autoComplete="off"
                                        className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:outline-none text-[#ACACAC]"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium">Company</label>
                                    <input
                                        type="text"
                                        name="company"
                                        id="company"
                                        autoComplete="off"
                                        className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:outline-none text-[#ACACAC]"
                                    />
                                </div>
                            </div>

                            {/* Message Textarea */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium">Write your message here</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={4}
                                    className="mt-1 block w-full border-b border-gray-300 bg-transparent focus:outline-none text-[#ACACAC]"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="bg-[#FFBE00] text-black py-3 px-8 text-md rounded-md flex items-center justify-center space-x-2 transition-all duration-300 hover:bg-yellow-600"
                                >
                                    <span>Send message</span>
                                    <FaArrowRight />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetInTouch;
