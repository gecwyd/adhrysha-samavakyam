import Image from "next/image";
import { resolveAsset } from "@/lib/asset-registry";

export function SayNoToDrugs() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0c0c0c] px-6 text-center">
      <Image
        src={resolveAsset("say-no-to-drugs-icon.webp")}
        alt="A capsule and cannabis leaf crossed out by a red prohibition mark"
        width={716}
        height={716}
        priority
        className="h-40 w-40 object-contain sm:h-52 sm:w-52"
      />

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
