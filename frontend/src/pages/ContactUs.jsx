import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BrandStoryBanner from '../components/BrandStoryBanner';
import Newsletter from '../components/Newsletter';

function ContactUs() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7efe3]">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-20">
        <div className="w-full max-w-[980px] mx-auto text-center">
          <h1 className="mx-auto mb-8 max-w-full w-[316px] font-['Montserrat',sans-serif] text-[48px] font-medium leading-[162%] tracking-normal text-[#1a3636]">
            CONTACT US
          </h1>
          
          <div className="mx-auto mb-16 max-w-[980px] font-['Montserrat',sans-serif] text-[16px] font-normal leading-[162%] tracking-normal text-[#41534D]">
            <p>
              If you have any questions or feedback
              <br />
              or would just like to get in touch
              <br />
              please email us <span className="font-semibold">hello@selfsoul.com</span>
              <br />
              We&apos;d love to connect with you on
              <br />
              social media! fb.me/selfsoul
              <br />
              @selfsoul_healwithnature
            </p>
          </div>

          <form className="max-w-2xl mx-auto text-left space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <input 
                  type="text" 
                  id="name"
                  placeholder="Name"
                  className="w-full bg-transparent border-b border-[#d4d4d4] py-2 font-['Montserrat',sans-serif] text-[16px] font-normal leading-[162%] tracking-normal text-[#41534D] placeholder:text-[#41534D] focus:outline-none focus:border-[#1a3636] transition-colors"
                />
              </div>
              <div className="relative">
                <input 
                  type="email" 
                  id="email"
                  placeholder="Email*"
                  required
                  className="w-full bg-transparent border-b border-[#d4d4d4] py-2 font-['Montserrat',sans-serif] text-[16px] font-normal leading-[162%] tracking-normal text-[#41534D] placeholder:text-[#41534D] focus:outline-none focus:border-[#1a3636] transition-colors"
                />
              </div>
            </div>

            <div className="relative">
              <input 
                type="tel" 
                id="phone"
                placeholder="Phone Number"
                className="w-full bg-transparent border-b border-[#d4d4d4] py-2 font-['Montserrat',sans-serif] text-[16px] font-normal leading-[162%] tracking-normal text-[#41534D] placeholder:text-[#41534D] focus:outline-none focus:border-[#1a3636] transition-colors"
              />
            </div>

            <div className="relative">
              <input
                type="text"
                id="comment"
                placeholder="Comment"
                className="w-full bg-transparent border-b border-[#d4d4d4] py-2 font-['Montserrat',sans-serif] text-[16px] font-normal leading-[162%] tracking-normal text-[#41534D] placeholder:text-[#41534D] focus:outline-none focus:border-[#1a3636] transition-colors resize-none"
              />
            </div>

            <div className="pt-6 text-center">
              <button 
                type="submit"
                className="w-full md:w-full bg-[#1a3636] text-white py-3.5 px-8 rounded-full text-sm font-semibold tracking-wider hover:bg-[#122626] transition-colors uppercase"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </main>

      <BrandStoryBanner />
      <Newsletter />

      <Footer />
    </div>
  );
}

export default ContactUs;
