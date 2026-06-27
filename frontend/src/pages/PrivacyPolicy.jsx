import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BrandStoryBanner from '../components/BrandStoryBanner';
import Newsletter from '../components/Newsletter';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7efe3]">
      <Header />
      <main className="flex-grow flex flex-col px-4 py-20 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-medium text-[#1a3636] mb-10 uppercase tracking-wide">
          PRIVACY POLICY
        </h1>
        <div className="space-y-6 text-[#5a5a5a] text-sm leading-relaxed">
          <p><strong>Privacy Policy</strong></p>
          <p><strong>What do we do with your information?</strong><br/>
          When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.<br/>
          When you browse our store, we also automatically receive your computer’s internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.<br/>
          Email marketing (if applicable): With your permission, we may send you emails about our store, new products and other updates.</p>
          
          <p><strong>How do you get my consent?</strong><br/>
          When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.<br/>
          If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.</p>
          
          <p><strong>How do I withdraw my consent?</strong><br/>
          If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at anytime, by contacting us at hello@selfsoul.com.</p>
          
          <p><strong>Shopify</strong><br/>
          Our store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and services to you.<br/>
          Your data is stored through Shopify’s data storage, databases and the general Shopify application. They store your data on a secure server behind a firewall.</p>
        </div>
      </main>
      <BrandStoryBanner />
      <Newsletter />
      <Footer />
    </div>
  );
}
export default PrivacyPolicy;
