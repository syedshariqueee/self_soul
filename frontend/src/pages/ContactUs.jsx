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
        <div className="w-full max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-medium text-[#1a3636] mb-8 uppercase tracking-wide">
            Contact Us
          </h1>
          
          <div className="space-y-2 text-[#5a5a5a] text-[15px] mb-16">
            <p>If you have any questions or feedback or would just like to get in touch please email us</p>
            <p className="font-semibold text-[#1a3636]">hello@selfsoul.com</p>
            <p className="pt-2">We'd love to connect with you on social media!</p>
            <p className="font-semibold text-[#1a3636]">fb.me/selfsoul @selfsoul_healwithnature</p>
          </div>

          <form className="max-w-2xl mx-auto text-left space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <input 
                  type="text" 
                  id="name"
                  placeholder="Name"
                  className="w-full bg-transparent border-b border-[#d4d4d4] py-2 text-[#1a3636] placeholder-[#8a8a8a] focus:outline-none focus:border-[#1a3636] transition-colors"
                />
              </div>
              <div className="relative">
                <input 
                  type="email" 
                  id="email"
                  placeholder="Email*"
                  required
                  className="w-full bg-transparent border-b border-[#d4d4d4] py-2 text-[#1a3636] placeholder-[#8a8a8a] focus:outline-none focus:border-[#1a3636] transition-colors"
                />
              </div>
            </div>

            <div className="relative">
              <input 
                type="tel" 
                id="phone"
                placeholder="Phone Number"
                className="w-full bg-transparent border-b border-[#d4d4d4] py-2 text-[#1a3636] placeholder-[#8a8a8a] focus:outline-none focus:border-[#1a3636] transition-colors"
              />
            </div>

            <div className="relative">
              <input
                type="text"
                id="comment"
                placeholder="Comment"
                className="w-full bg-transparent border-b border-[#d4d4d4] py-2 text-[#1a3636] placeholder-[#8a8a8a] focus:outline-none focus:border-[#1a3636] transition-colors resize-none"
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
