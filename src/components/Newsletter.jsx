export default function Newsletter() {
  return (
    <section className="bg-[#415147] px-4 py-10 text-center text-white sm:px-6 md:px-8 md:py-16 lg:px-10">
      <h3 className="text-xl font-semibold tracking-wide sm:text-2xl md:text-3xl">STAY UP TO DATE!!</h3>
      <div className="mt-8 mx-auto max-w-sm flex flex-col items-center">
        <input 
          type="email" 
          placeholder="Enter Email" 
          className="w-full border-b border-[#707f76] bg-transparent pb-2 text-sm text-white placeholder-white/70 outline-none focus:border-white" 
        />
        <button className="mt-6 w-full rounded-full bg-[#fdf5f0] px-6 py-3 text-sm font-medium text-[#2e4338] transition-colors hover:bg-white">
          Subscribe & Get 15%off
        </button>
      </div>
      <p className="mt-6 text-[10px] text-white/70 max-w-md mx-auto">
        *By joining, you agree to receive email marketing. Unsubscribe at any time. View Privacy Policy & Terms of Service.
      </p>
    </section>
  );
}
