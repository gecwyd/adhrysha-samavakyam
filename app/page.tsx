import { SecA } from "@/components/pages/main/sec-a";
import { SecB } from "@/components/pages/main/sec-b";
import { SecC } from "@/components/pages/main/sec-c";
import { SecD } from "@/components/pages/main/sec-d";
import { SecE } from "@/components/pages/main/sec-e";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col bg-[#d9d4c7]">
      <SecA />
      <SecB />
      <SecC />
      <SecD />
      <SecE />
    </main>
  );
}
