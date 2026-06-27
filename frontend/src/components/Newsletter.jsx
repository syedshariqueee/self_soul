export default function Newsletter() {
  return (
    <section className="bg-[#41534D] px-6 py-14 md:px-10 md:py-16 lg:py-20">
      <div className="mx-auto flex max-w-[520px] flex-col items-center">
        <h3 className="text-center font-['Montserrat',sans-serif] text-[28px] font-semibold uppercase leading-[1.62] tracking-normal text-[#FDF3EC]">
          STAY UP TO DATE!!
        </h3>

        <form className="mt-10 w-full" onSubmit={(e) => e.preventDefault()} noValidate>
          <div className="text-left">
            <label
              htmlFor="newsletter-email"
              className="block font-['Montserrat',sans-serif] text-[11px] font-normal text-[#FDF3EC]"
            >
              Enter Email
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder=""
              className="mt-1 w-full border-0 border-b border-[#FDF3EC] bg-transparent px-0 py-2 font-['Montserrat',sans-serif] text-sm text-[#FDF3EC] outline-none ring-0 focus:border-[#FDF3EC] focus:ring-0"
            />
          </div>
          <button
            type="submit"
            className="mx-auto mt-10 flex min-h-[42px] w-full max-w-[375px] items-center justify-center rounded-[28px] bg-[#FDF3EC] px-8 py-2 font-['Montserrat',sans-serif] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#41534D] transition-colors hover:bg-[#fffefb] sm:px-16 md:px-24 sm:text-xs"
          >
            Subscribe & Get 15%off
          </button>
        </form>

        <p className="mt-10 max-w-[480px] text-center font-['Montserrat',sans-serif] text-[12px] font-normal leading-[1.62] tracking-normal text-[#FDF3EC]">
          *By joining, you agree to receive email marketing. Unsubscribe at any time. View Privacy Policy & Terms of
          Service.
        </p>
      </div>
    </section>
  );
}
