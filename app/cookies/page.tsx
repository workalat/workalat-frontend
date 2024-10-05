import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

import arrowRightSm from "@/public/icons/arrow_right_sm.svg";
import AuthNavbar from "@/components/navbar/auth_navbar";

export default function CookiesPage() {
    return (
        <div>
            <AuthNavbar />
            <div className="relative z-10 pt-6 container mx-auto max-w-7xl px-6">
                <Box className="sticky top-[65px] pt-2 z-10 bg-white flex justify-center items-center w-full border-b border-dark border-opacity-30">
                    <Link
                        href="/client/dashboard"
                        className="flex gap-2 absolute left-0 font-bold"
                    >
                        <Image
                            src={arrowRightSm}
                            alt="Back to dashboard"
                            className="rotate-180"
                        />
                        <span>
                            Back <span className="hidden md:inline-flex">to dashboard</span>
                        </span>
                    </Link>
                    <Typography gutterBottom className="text-3xl invisible text-transparent font-bold text-center">
                        Terms of service
                    </Typography>
                </Box>
            </div>
            <div className="mt-2 bg-[url('/images/terms-img.jpg')] object-cover h-[500px] bg-[#07242B80] bg-blend-multiply">
                <div className="flex items-center justify-center h-full w-full">
                    <div className="flex flex-col justify-center items-center text-white">
                        <h1 className="text-3xl font-bold mb-4">
                            Cookies Policy
                        </h1>
                        <p className="text-md font-normal  ">
                            Effective July 4th 2024
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative z-10 pt-6 container mx-auto max-w-7xl px-6">

                <div className="mb-4">
                    <h1 className="text-4xl font-semibold pb-3">
                        Application of Terms
                    </h1>
                    <p className=" text-[14px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-normal  text-justify ">
                        These Website Terms & Conditions (“T&Cs”) apply to your access and use of www.whatworks.com (the “Site”),
                        including all software, data, reports, text, images, sounds, video, and content made available through
                        any portion of the Site (collectively, the “Content”). Content includes all such elements as a whole,
                        as well as individual elements and portions thereof.
                    </p>
                    <hr className="border-t border-gray-300 mt-[1%]" />
                </div>

                <div className=" mb-4">
                    <h1 className="text-4xl font-semibold pb-3">
                        Acceptance of Terms.
                    </h1>
                    <p className=" text-[14px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-normal  text-justify ">
                        Whatworks C and any of its affiliates (collectively, “Whatworks”) permit you (“User” or “you” or “your”) to access and use the Site and Content, subject to these T&Cs. By accessing or using any portion of the Site, you acknowledge that you have read, understood, and agree to be bound by these T&Cs. If you are entering into these T&Cs on behalf of a company or other legal entity (“User Entity”), you must have the legal authority to contractually bind such User Entity to these T&Cs, in which case the terms “you” or “your” or “User” will refer to such User Entity. If you lack such legal authority to contractually bind or you do not agree with these T&Cs, you must not accept these T&Cs or access or use the site or content.
                    </p>
                    <hr className="border-t border-gray-300 mt-[1%]" />
                </div>
                <div className="  mb-4">
                    <h1 className="text-4xl font-semibold pb-3">
                        T&Cs Updates.
                    </h1>
                    <p className=" text-[14px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-normal  text-justify">
                        Whatworks reserves the right, at its sole discretion, to change or modify portions of these T&Cs at any time. Whatworks will post the changes to these T&Cs on the Site and will indicate at the top of this page the date these terms were last revised. It is your responsibility to check the T&Cs periodically for changes. Your continued use of the Site and Content after the date any such changes become effective constitutes your acceptance of the new or revised T&Cs.
                    </p>
                    <hr className="border-t border-gray-300 mt-[1%]" />
                </div>
                <div className="  mb-4">
                    <h1 className="text-4xl font-semibold pb-3">
                        General Conditions/Access and Use.
                    </h1>
                    <p className=" text-[14px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-normal  text-justify ">
                        Authorization to Access and Use Site and Content. Subject to your compliance with these T&Cs and the provisions hereof, you may access or use the Site and Content solely for the purpose of your evaluation of Whatworks and Whatworks products and services. You may only link to the Site or Content, or any portion thereof, as expressly permitted by Whatworks. <br />

                        Ownership and Restrictions. All rights, title, and interest in and to the Site and Content will remain with and belong exclusively to Whatworks. You will not (a) sublicense, resell, rent, lease, transfer, assign, time share, or otherwise commercially exploit or make the Site and any Content available to any third party, (b) use the Site and Content in any unlawful manner (including without limitation in violation of any data privacy or export control laws) or in any manner that interferes with or disrupts the integrity or performance of the Site and Content or their related components, or (c) modify, adapt, or hack the Site and Content to, or try to, gain unauthorized access to the restricted portions of the Site and Content or related systems or networks (i.e., circumvent any encryption or other security measures, gain access to any source code or any other underlying form of technology or information, and gain access to any part of the Site and Content, or any other products or services of Whatworks that are not readily made available to the general public). <br />

                        You are not permitted to copy, modify, frame, repost, publicly perform or display, sell, reproduce, distribute, or create derivative works of the Site and Content, except that you may download, display, and print one copy of the publicly available materials (i.e., the Content that does not require an Account name or password to access) on any single computer solely for your personal, non-commercial use, provided that you do not modify the material in any way and you keep intact all copyright, trademark, and other proprietary notices. You agree not to access the Site or Content by any means other than through the interface that is provided by Whatworks to access the same. You may not use any “page-scraper,” “deep-link,” “spider,” or “robot or other automatic program, device, algorithm or methodology, or any similar manual process, to access, copy, acquire, or monitor any portion of the Site or any Content, or in any way reproduce or circumvent the presentation or navigational structure of the Site or any Content, to obtain or attempt to obtain any Content or other information through any means not made generally available through the Site by Whatworks. Whatworks reserves the right to take any lawful measures to prevent any such activity. You may not forge headers or otherwise manipulate identifiers in order to disguise the origin of any message or transmittal you send to Whatworks on or through the Site or any service offered on or through the Site. You may not pretend that you are, or that you represent, someone else, or impersonate any other individual or entity. <br />

                        Responsibility for Your Data. You are solely responsible for all data, information and other content, that you upload, post, or otherwise provide or store (hereafter “post(ing)”) in connection with or relating to the Site.
                        Reservation of Rights. Whatworks and its licensors each own and retain their respective rights in and to all logos, company names, marks, trademarks, copyrights, trade secrets, know-how, patents and patent applications that are used or embodied in or otherwise related to the Site and Content. Whatworks grants no rights or licenses (implied, by estoppel, or otherwise) whatsoever to you under these T&Cs.
                    </p>
                    <hr className="border-t border-gray-300 mt-[1%]" />
                </div>
                <div className="  mb-4">
                    <h1 className="text-4xl font-semibold pb-3">
                        Use of Intellectual Property.
                    </h1>
                    <p className="text-[14px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-normal  text-justify ">
                        Rights in User Content. By posting your information and other content (“User Content”) on or through the Site and Content, you grant Whatworks a worldwide, non-exclusive, perpetual, irrevocable, royalty-free, fully paid, sublicensable and transferable license to use, modify, reproduce, distribute, display, publish and perform User Content in connection with the Site and Content. Whatworks has the right, but not the obligation, to monitor the Site and Content and User Content. Whatworks may remove or disable any User Content at any time for any reason, or for no reason at all. <br />

                        Unsecured Transmission of User Content. You understand that the operation of the Site and Platform, including User Content, may be unencrypted and involve transmission to Whatworks third party vendors and hosting partners to operate and maintain the Site and Content. Accordingly, you acknowledge that you bear sole responsibility for adequate security, protection, and backup of User Content. Whatworks will have no liability to you for any unauthorized access or use of any of User Content or any corruption, deletion, destruction or loss of any of User Content. <br />

                        Feedback. You may submit ideas, suggestions, or comments (“Feedback”) regarding the Site and Content or Whatworks business, products or services. By submitting any Feedback, you acknowledge and agree that (a) your Feedback is provided by you voluntarily and Whatworks may, without any obligations or limitation, use and exploit such Feedback in any manner and for any purpose, (b) you will not seek and are not entitled to any money or other form of compensation, consideration, or attribution with respect to your Feedback regardless of whether Whatworks considered or used your Feedback in any manner, and (c) your Feedback is not the confidential or proprietary information of you or any third party. <br />

                        Your Representations and Warranties. You represent and warrant to Whatworks that your activity on the Site and Whatworks possession and use of User Content as contemplated in these T&Cs do not and will not violate, infringe, or misappropriate any third party’s copyright, trademark, right of privacy or publicity, or other personal or proprietary right, nor does User Content contain any matter that is defamatory, obscene, unlawful, threatening, abusive, tortious, offensive or harassing. <br />

                        Termination of Access Due to Violations. Whatworks may, in its sole discretion and without prior notice, terminate your access to the Site and/or block your future access to the Site if we determine that you have violated these T&Cs or other agreements or guidelines which may be associated with your use of the Site. You also agree that any violation by you of these T&Cs will cause irreparable harm to Whatworks, for which monetary damages would be inadequate, and you consent to Whatworks obtaining any injunctive or equitable relief that Whatworks deems necessary or appropriate in such circumstances, without limiting Whatworks other available remedies. Further, Whatworks may, in its sole discretion and without prior notice, terminate your access to the Site, for cause, which includes (but is not limited to) (1) requests by law enforcement or other government agencies, (2) discontinuance or material modification of the Site or any service offered on or through the Site, or (3) unexpected technical issues or problems.

                    </p>
                    <hr className="border-t border-gray-300 mt-[1%]" />
                </div>
                <div className="  mb-4">
                    <h1 className="text-4xl font-semibold pb-3">
                        NO WARRANTIES AND DISCLAIMER BY TOPTAL.
                    </h1>
                    <p className="text-[14px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-normal  text-justify ">
                        THE SITE AND CONTENT AND ALL SERVER AND NETWORK COMPONENTS, ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS WITH ALL ERRORS AND DEFECTS AND WITHOUT ANY WARRANTIES OF ANY KIND, AND WHATWORKS EXPRESSLY DISCLAIMS ALL REPRESENTATIONS AND WARRANTIES, INCLUDING ANY IMPLIED WARRANTIES OF ACCURACY, COMPLETENESS, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT, AND ANY REPRESENTATIONS OR WARRANTIES ARISING FROM COURSE OF DEALING, COURSE OF PERFORMANCE OR USAGE OF TRADE. YOU ACKNOWLEDGE THAT WHATWORKS DOES NOT WARRANT THAT YOUR ACCESS OR USE OR BOTH OF THE SITE AND CONTENT WILL BE UNINTERRUPTED, TIMELY, SECURE, ERROR-FREE, OR VIRUS-FREE, AND WHATWORKS DOES NOT MAKE ANY WARRANTY AS TO THE RESULTS THAT MAY BE OBTAINED FROM USE OF THE SITE AND CONTENT. NO INFORMATION, ADVICE OR SERVICES OBTAINED BY YOU FROM WHATWORKS OR THROUGH THE SITE WILL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THESE T&Cs AND YOU SHOULD NOT RELY ON THE SITE AND THE GENERAL CONTENT ALONE AS THE BASIS FOR YOUR BUSINESS DECISIONS. <br />

                        Whatworks reserves the right to do any of the following, at any time, without notice: (1) to modify, suspend or terminate operation of or access to the Site, or any portion of the Site, for any reason; (2) to modify or change the Site, or any portion of the Site, for any reason; and (3) to interrupt the operation of the Site, or any portion of the Site, as necessary to perform routine or non-routine maintenance, error correction, or other changes. <br />
                    </p>
                    <hr className="border-t border-gray-300 mt-[1%]" />
                </div>
                <div className="  mb-4">
                    <h1 className="text-4xl font-semibold pb-3">
                        LIMITED LIABILITY.
                    </h1>
                    <p className="text-[14px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-normal  text-justify ">
                        Exclusion of Damages and Limitation of Liability. Whatworks does not charge fees for you to access and use the Site and Content pursuant to these T&Cs. The Site does not conduct commercial transactions; the Content is comprised of general information and describes some of the basic elements of the Whatworks service. As consideration for your free access and use of the Site and Content pursuant to these T&Cs, you further agree that WHATWORKS WILL NOT BE LIABLE TO YOU FOR ANY INCIDENTAL, CONSEQUENTIAL, INDIRECT, SPECIAL, PUNITIVE OR EXEMPLARY DAMAGES (INCLUDING DAMAGES FOR LOSS OF BUSINESS, LOSS OF PROFITS, OR THE LIKE) ARISING OUT OF OR RELATING TO THIS T&Cs, INCLUDING WITHOUT LIMITATION, YOUR USE OR INABILITY TO USE THE SITE, PLATFORM, MATCHING SERVICES, CONTENT, PROPRIETARY INFORMATION, OR ANY INTERRUPTION OR DISRUPTION OF SUCH USE, EVEN IF TOPTAL HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND REGARDLESS OF THE CAUSE OF ACTION (WHETHER IN CONTRACT, TORT, BREACH OF WARRANTY OR OTHERWISE). THE AGGREGATE LIABILITY OF TOPTAL WITH REGARD TO THIS T&Cs WILL IN NO EVENT EXCEED USD$1.00. <br />

                        Jurisdictional Limitations. Some states and other jurisdictions do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply to you. IN THESE JURISDICTIONS, TOPTAL’S LIABILITY WILL BE LIMITED TO THE GREATEST EXTENT PERMITTED BY LAW. <br />

                        Dispute Resolution; Jury Waiver. THESE T&Cs ARE MADE UNDER, AND WILL BE CONSTRUED AND ENFORCED IN ACCORDANCE WITH, THE LAWS OF NEW YORK APPLICABLE TO AGREEMENTS MADE AND TO BE PERFORMED SOLELY THEREIN, WITHOUT GIVING EFFECT TO PRINCIPLES OF CONFLICTS OF LAW. In any action between or among any of the parties, whether arising out of these T&Cs or otherwise, each of the parties irrevocably and unconditionally (a) consents and submits to the exclusive jurisdiction and venue of the state and federal courts located in New York, New York; and (b) WAIVES ANY AND ALL RIGHT TO TRIAL BY JURY IN ANY LEGAL PROCEEDING ARISING OUT OF OR RELATED TO THIS AGREEMENT OR ANY TRANSACTIONS CONTEMPLATED HEREBY. <br />

                        No Reliance; Due Inquiry. You affirm and agree that, given the general and “as-is” nature of the Site and the Content you are not specifically relying on any statements, or materials contained on the Site or in the Content to make any business decisions. Resource allocation and staffing matters are inherently complex and unique. Should you choose to continue your inquiry into whether Whatworks service is right for you, you will have an opportunity to make additional inquiries of Whatworks and you should make an independent investigation of the suitability of using Whatworks for your particular business needs. Only after such appropriate due diligence, thorough review of Whatworks service offering including the terms and conditions of Whatworks service agreements, and, as applicable, a through screening of any freelancer Whatworks proposes to you should you come to any conclusions or make any decisions about whether Whatworks or any freelancer proposed by Whatworks is right for you and your specific project needs or requirements.  <br />

                        Miscellaneous. These T&Cs, and any additions, changes, edits and/or modifications made thereto by Whatworks, together with Whatworks Privacy Policy, constitute the entire agreement between the parties with respect to the portions of the Site available without an account ID or password. Access to certain password-restricted portions of the Site, and any subsequent procurement and use of Whatworks services may be subject to different, additional agreement(s). <br />

                        Whatworks does not conduct business with or seek any commercial transactions with: (x) any entity, citizen or resident of a geographic area in which access to or use of the Whatworks services is prohibited by applicable law, decree, regulation, treaty, or administrative act; (y) an entity, citizen or resident of, or located in, a geographic area that is subject to U.S. or other sovereign country sanctions or embargoes; or (z) an individual, or an individual employed by or associated with an entity, identified on the U.S. Department of Commerce’s Denied Persons or Entity List, the U.S. Department of Treasury’s Specially Designated Nationals or Blocked Persons Lists, or the U.S. Department of State’s Debarred Parties List or otherwise ineligible to receive items subject to U.S. export control laws and regulations or other economic sanction rules of any sovereign nation (collectively, a “Prohibited Counterparty”). By accessing the Site and the Content you represent and warrant that you are not a Prohibited Counterparty and you will not seek or (attempt to) obtain services from or a commercial relationship with Whatworks.  <br />

                        These T&Cs and any additions, changes, edits and/or modifications made thereto by Whatworks cannot be amended except by Whatworks as set forth above. The failure of Whatworks to exercise or enforce any right or provision of these T&Cs will not be a waiver of that right. Any notices to Whatworks in connection with this agreement will be made by email transmitted to legal@toptal.com provided that you also send a copy of such notice via nationally recognized carrier to Whatworks, LLC, 2810 N. Church St #36879 Wilmington, DE 19802-4447, Attn: Legal Department. In the event that any provision of these T&Cs will be determined to be illegal or unenforceable, that provision will be first revised to give the maximum permissible effect to its original intent or, if such revision is not permitted, that specific provision will be eliminated so that these T&Cs will otherwise remain in full force and effect and enforceable. <br />
                    </p>
                </div>
            </div>

            <div className='flex text-center items-center justify-center bg-[#07242B] text-white px-[5%] py-[5%] '>
                <h1 className='text-[20px] sm:text-[20px] md:text-[28px] lg:text-[32px] font-bold'>
                    Whatworks Connects the <span className='underline cursor-pointer'>Top 3%</span> of Freelance <br /> Talent All Over The World.
                </h1>
            </div>
        </div >
    )
}
