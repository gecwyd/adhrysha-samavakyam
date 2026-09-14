import { SecA } from "@/components/pages/main/sec-a";
import { ComingSoon } from "@/components/pages/main/coming-soon";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col bg-[#d9d4c7]">
      <SecA />
      <ComingSoon />
    </main>
  );
}
