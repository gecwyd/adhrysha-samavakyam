export function SayNoToDrugs() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0c0c0c] px-6 text-center">
      <svg
        viewBox="0 0 200 200"
        className="h-40 w-40 sm:h-52 sm:w-52"
        fill="none"
        stroke="#e8483a"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="70" y="30" width="26" height="70" rx="13" transform="rotate(-20 83 65)" />
        <line x1="60" y1="90" x2="106" y2="46" transform="rotate(-20 83 65)" />
        <line x1="96" y1="58" x2="150" y2="58" />
        <circle cx="100" cy="100" r="78" />
        <line x1="46" y1="46" x2="154" y2="154" />
      </svg>

      <h2 className="mt-10 font-display text-[15vw] leading-[0.85] tracking-tight text-[#f4f0e8] sm:text-[9vw]">
        SAY NO
        <br />
        TO DRUGS
      </h2>

      <p className="mt-6 max-w-md text-sm tracking-wide text-[#a8a29a] sm:text-base">
        ജീവിതം തിരഞ്ഞെടുക്കൂ, ലഹരിയല്ല.
      </p>
    </section>
  );
}
