import dynamic from "next/dynamic";
import { BootLoader } from "@/components/ui/BootLoader";

const BirthdayExperience = dynamic(
  () =>
    import("@/components/experience/BirthdayExperience").then(
      (mod) => mod.BirthdayExperience
    ),
  { loading: () => <BootLoader />, ssr: true }
);

export default function Home() {
  return <BirthdayExperience />;
}
