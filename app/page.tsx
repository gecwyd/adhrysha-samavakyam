import { SecA } from "@/components/pages/main/sec-a";
import { SecB } from "@/components/pages/main/sec-b";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col bg-[#d9d4c7]">
      <SecA />
      <SecB />
    </main>
  );
}
