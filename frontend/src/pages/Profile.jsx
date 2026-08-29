import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BrandStoryBanner from '../components/BrandStoryBanner';
import Newsletter from '../components/Newsletter';

import { AUTH_EVENT, clearAuthUser, readAuthUser } from '../utils/auth';

function EditIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M17 3a2.8 2.8 0 0 1 4 4L8 20l-5 1 1-5L17 3z" />
    </svg>
  );
}

function ProfileInput({ value, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <input
        readOnly
        value={value}
        className="h-[60px] w-full rounded-[4px] border border-[#687C69] bg-transparent px-4 pr-9 font-['Montserrat',sans-serif] text-[12px] font-normal text-[#41534D] outline-none"
      />
      <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#41534D]" aria-label="Edit">
        <EditIcon />
      </button>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 className="font-['Montserrat',sans-serif] text-[12px] font-semibold text-[#1f3330]">
      {children}
    </h2>
  );
}

function FieldLabel({ children }) {
  return (
    <p className="mb-2 mt-5 font-['Montserrat',sans-serif] text-[11px] font-normal uppercase text-[#41534D]">
      {children}
    </p>
  );
}

const profileFieldClass = "h-[60px] w-full rounded-[4px] border border-[#687C69] bg-transparent px-4 font-['Montserrat',sans-serif] text-[12px] text-[#41534D] outline-none";
const joinedProfileFieldClass = "h-[60px] w-full border border-[#687C69] bg-transparent px-4 font-['Montserrat',sans-serif] text-[12px] text-[#41534D] outline-none";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => readAuthUser());

  useEffect(() => {
    function sync() {
      const storedUser = readAuthUser();
      if (!storedUser) {
        navigate('/login?next=/profile');
        return;
      }
      setUser(storedUser);
    }
    sync();
    window.addEventListener(AUTH_EVENT, sync);
    return () => window.removeEventListener(AUTH_EVENT, sync);
  }, [navigate]);

  function handleLogout() {
    clearAuthUser();
    navigate('/login');
  }

  if (!user) return null;

  const fullName = user.fullName || '';
  const email = user.email || '';
  const mobile = user.mobile || '';

  return (
    <div className="min-h-screen bg-[#f7efe3]">
      <Header />

      <main className="px-6 py-12 sm:px-10">
        <div className="mx-auto max-w-[980px]">
          <h1 className="mb-10 w-[216px] max-w-full font-['Montserrat',sans-serif] text-[48px] font-medium uppercase leading-[162%] tracking-normal text-[#1B3638]">
            Profile
          </h1>

          <section>
            <SectionTitle>Personal Details</SectionTitle>

            <FieldLabel>Name</FieldLabel>
            <ProfileInput value={fullName} />

            <FieldLabel>Email ID</FieldLabel>
            <ProfileInput value={email} />

            <FieldLabel>Phone</FieldLabel>
            <ProfileInput value={mobile} />
          </section>

          <section className="mt-9">
            <SectionTitle>Addresses</SectionTitle>

            <div className="mt-5 flex items-center justify-between">
              <FieldLabel>Saved Addresses</FieldLabel>
              <button type="button" className="text-[#41534D]" aria-label="Edit saved address">
                <EditIcon />
              </button>
            </div>

            <div className="space-y-2">
              <ProfileInput value={fullName} />
              <input readOnly value="Xyz, Street no-21, patel nagar, new delhi" className={profileFieldClass} />
              <input readOnly value="Landmark (optional)" className={profileFieldClass} />
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <input readOnly value="Delhi" className={profileFieldClass} />
                <input readOnly value="110008" className={profileFieldClass} />
                <input readOnly value="India" className={profileFieldClass} />
              </div>
              <input readOnly value={mobile} className={profileFieldClass} />
            </div>

            <button type="button" className="mt-4 font-['Montserrat',sans-serif] text-[12px] text-[#1f3330] underline">
              + add new
            </button>
          </section>

          <section className="mt-9">
            <SectionTitle>Payment Methods</SectionTitle>

            <div className="mt-5 flex items-center justify-between">
              <FieldLabel>Saved Cards</FieldLabel>
              <button type="button" className="text-[#41534D]" aria-label="Edit saved card">
                <EditIcon />
              </button>
            </div>

            <div>
              <input readOnly value="Visa Credit Card" className={profileFieldClass} />
              <input readOnly value="6465 5621 5654 5151" className={`-mt-px ${joinedProfileFieldClass}`} />
              <div className="-mt-px grid grid-cols-2">
                <input readOnly value="12/30" className={joinedProfileFieldClass} />
                <input readOnly value="323" className={`-ml-px ${joinedProfileFieldClass}`} />
              </div>
              <input readOnly value={fullName} className={`-mt-px ${joinedProfileFieldClass}`} />
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-10 h-11 rounded-full bg-[#1a3636] px-8 font-['Montserrat',sans-serif] text-xs font-semibold uppercase tracking-wide text-white"
            >
              Log out
            </button>
          </section>
        </div>
      </main>

      <BrandStoryBanner />
      <Newsletter />
      <Footer />
    </div>
  );
}
