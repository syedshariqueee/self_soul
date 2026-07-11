import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BrandStoryBanner from '../components/BrandStoryBanner';
import Newsletter from '../components/Newsletter';

const AUTH_USER_STORAGE_KEY = 'selfSoulUser';
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'https://self-soul-backend.onrender.com'
).replace(/\/$/, '');

function saveAuthUser(user) {
  localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
}

export default function Login() {
  const [step, setStep] = useState('login'); // 'login' | 'otp' | 'details'
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState(false);
  const otpRefs = useRef([]);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [detailsErrors, setDetailsErrors] = useState({ name: false, mobile: false });

  const callApi = async (url, options) => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });

    const contentType = response.headers.get('content-type') || '';
    const raw = await response.text();

    let data;
    try {
      data = contentType.includes('application/json') || raw.trim().startsWith('{')
        ? JSON.parse(raw)
        : null;
    } catch {
      data = null;
    }

    if (!data) {
      throw new Error(
        response.ok
          ? 'Invalid response from server'
          : `Server error (${response.status}). Please try again.`
      );
    }

    if (!response.ok || !data.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      setMessage('');
      setDevOtp('');
      try {
        const data = await callApi('/api/auth/request-otp', {
          method: 'POST',
          body: JSON.stringify({ email }),
        });

        setDevOtp(data.devOtp || '');
        setMessage('OTP created successfully.');
        setStep('otp');
        setOtpError(false);
        setOtp(['', '', '', '', '', '']); // Reset OTP
        
        // Auto focus first OTP input after short delay for render
        setTimeout(() => {
          otpRefs.current[0]?.focus();
        }, 50);
      } catch (error) {
        setMessage(error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const resendOtp = async () => {
    if (email) {
      setIsSubmitting(true);
      setMessage('');
      setDevOtp('');
      try {
        const data = await callApi('/api/auth/request-otp', {
          method: 'POST',
          body: JSON.stringify({ email }),
        });

        setDevOtp(data.devOtp || '');
        setMessage('New OTP created successfully.');
        setOtpError(false);
        setOtp(['', '', '', '', '', '']);
      } catch (error) {
        setMessage(error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    if (value.length > 1) {
      // Handle paste
      const pastedOtp = value.slice(0, 6).split('');
      const newOtp = [...otp];
      pastedOtp.forEach((char, i) => {
        if (index + i < 6 && /^\d+$/.test(char)) {
          newOtp[index + i] = char;
        }
      });
      setOtp(newOtp);
      // Focus last filled input
      const lastIndex = Math.min(index + pastedOtp.length, 5);
      otpRefs.current[lastIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError(false);
    setMessage('');

    // Move to next input if filled
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp.length < 6) {
      setOtpError(true);
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    try {
      const data = await callApi('/api/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ email, otp: enteredOtp }),
      });

      if (data.user?.fullName) setName(data.user.fullName);
      if (data.user?.mobile) setMobile(data.user.mobile);

      if (data.requiresProfile) {
        setStep('details');
      } else {
        saveAuthUser(data.user);
        alert('Login successful!');
        window.location.href = '/';
      }
    } catch (error) {
      setOtpError(true);
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const errors = { name: false, mobile: false };
    
    if (!name || name.trim() === '') {
      errors.name = true;
      hasError = true;
    }
    if (!mobile || mobile.trim() === '' || mobile.length < 10) {
      errors.mobile = true;
      hasError = true;
    }

    setDetailsErrors(errors);

    if (!hasError) {
      setIsSubmitting(true);
      setMessage('');
      try {
        const data = await callApi('/api/auth/profile', {
          method: 'PUT',
          body: JSON.stringify({ email, fullName: name, mobile }),
        });

        saveAuthUser(data.user);
        alert('Account details updated successfully!');
        window.location.href = '/';
      } catch (error) {
        setMessage(error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7efe3]">
      <Header />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-20">
        <div className="w-full max-w-md text-center">
          {message && (
            <p className={`mb-6 text-sm ${otpError ? 'text-[#d93025]' : 'text-[#1a3636]'}`}>
              {message}
            </p>
          )}
          {devOtp && (
            <p className="mb-6 rounded bg-[#f2eadc] px-4 py-2 text-sm font-medium text-[#1a3636]">
              Development OTP: {devOtp}
            </p>
          )}
          
          {step === 'login' && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <h1 className="text-2xl sm:text-[28px] font-medium text-[#1a3636] mb-3 uppercase tracking-wide">
                LOGIN
              </h1>
              
              <p className="text-[#5a5a5a] text-sm mb-10">
                Enter your log in details
              </p>

              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div>
                  <input 
                    type="email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email ID"
                    required
                    className="w-full bg-transparent border border-[#d4d4d4] py-3 px-4 text-[#1a3636] placeholder-[#8a8a8a] focus:outline-none focus:border-[#1a3636] transition-colors rounded-[2px]"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1a3636] text-white py-3.5 px-8 rounded-full text-sm font-semibold tracking-wider hover:bg-[#122626] disabled:opacity-60 transition-colors uppercase"
                >
                  {isSubmitting ? 'REQUESTING...' : 'REQUEST OTP'}
                </button>
              </form>

              <div className="mt-8 mb-8 flex items-center justify-center">
                <div className="h-px bg-[#d4d4d4] flex-1"></div>
                <span className="px-4 text-[13px] text-[#8a8a8a]">or you can</span>
                <div className="h-px bg-[#d4d4d4] flex-1"></div>
              </div>

              <button 
                type="button"
                className="w-full bg-transparent border border-[#d4d4d4] text-[#1a3636] py-3.5 px-8 rounded-[2px] text-sm font-medium flex items-center justify-center gap-3 hover:bg-[#f2eadc] transition-colors"
              >
                <span className="font-bold text-[15px]">G</span>
                Continue with Google
              </button>
            </div>
          )}

          {step === 'otp' && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <h1 className="text-2xl sm:text-[28px] font-medium text-[#1a3636] mb-3 uppercase tracking-wide">
                ENTER OTP
              </h1>
              
              <div className="text-[#5a5a5a] text-[13px] mb-8 space-y-2">
                <p>The OTP is sent on Email ID</p>
                <p className="flex items-center justify-center gap-2 text-[#1a3636] font-medium">
                  {email}
                  <button onClick={() => setStep('login')} type="button" className="text-[#5a5a5a] hover:text-[#1a3636] transition-colors" aria-label="Edit Email">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                  </button>
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="flex justify-center gap-2 sm:gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpRefs.current[idx] = el)}
                      type="text"
                      maxLength={6}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className={`w-10 h-12 sm:w-12 sm:h-14 text-center text-lg bg-transparent border ${otpError ? 'border-[#d93025]' : 'border-[#d4d4d4]'} text-[#1a3636] focus:outline-none focus:border-[#1a3636] rounded-[2px] transition-colors`}
                    />
                  ))}
                </div>
                
                {otpError && (
                  <p className="text-[#d93025] text-[11px] mt-2">
                    Incorrect OTP, Please Enter Correct OTP
                  </p>
                )}

                <div className="pt-2">
                  <button 
                    type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1a3636] text-white py-3.5 px-8 rounded-full text-sm font-semibold tracking-wider hover:bg-[#122626] disabled:opacity-60 transition-colors uppercase"
                  >
                  {isSubmitting ? 'VERIFYING...' : 'VERIFY OTP'}
                  </button>
                </div>
              </form>

              <div className="mt-6 text-[11px] text-[#8a8a8a]">
                <p>Didn't Receive the OTP?</p>
                <button type="button" onClick={resendOtp} disabled={isSubmitting} className="text-[#8a8a8a] underline hover:text-[#1a3636] disabled:opacity-60 mt-1 transition-colors">
                  {isSubmitting ? 'Sending...' : 'Resend OTP'}
                </button>
              </div>
            </div>
          )}

          {step === 'details' && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <h1 className="text-2xl sm:text-[28px] font-medium text-[#1a3636] mb-8 uppercase tracking-wide">
                ENTER ACCOUNT DETAILS
              </h1>
              
              <form onSubmit={handleDetailsSubmit} className="space-y-5 text-left">
                <div>
                  <input 
                    type="text" 
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (detailsErrors.name) setDetailsErrors({...detailsErrors, name: false});
                    }}
                    className={`w-full bg-transparent border ${detailsErrors.name ? 'border-[#d93025]' : 'border-[#d4d4d4]'} py-3 px-4 text-[#1a3636] placeholder-[#8a8a8a] focus:outline-none focus:border-[#1a3636] transition-colors rounded-[2px]`}
                  />
                  {detailsErrors.name && (
                    <p className="text-[#d93025] text-[11px] mt-1.5 ml-1">Please Enter Correct Name</p>
                  )}
                </div>
                
                <div>
                  <input 
                    type="tel" 
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value);
                      if (detailsErrors.mobile) setDetailsErrors({...detailsErrors, mobile: false});
                    }}
                    className={`w-full bg-transparent border ${detailsErrors.mobile ? 'border-[#d93025]' : 'border-[#d4d4d4]'} py-3 px-4 text-[#1a3636] placeholder-[#8a8a8a] focus:outline-none focus:border-[#1a3636] transition-colors rounded-[2px]`}
                  />
                  {detailsErrors.mobile && (
                    <p className="text-[#d93025] text-[11px] mt-1.5 ml-1">Please Enter Valid Mobile Number</p>
                  )}
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1a3636] text-white py-3.5 px-8 rounded-full text-sm font-semibold tracking-wider hover:bg-[#122626] disabled:opacity-60 transition-colors uppercase"
                  >
                    {isSubmitting ? 'UPDATING...' : 'UPDATE AND CONTINUE'}
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </main>

      <BrandStoryBanner />
      <Newsletter />
      <Footer />
    </div>
  );
}
