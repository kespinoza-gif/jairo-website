import Hero from "@/components/Hero";
import FreeClass from "@/components/FreeClass";
import WhyUs from "@/components/WhyUs";
import VideoSection from "@/components/VideoSection";
import Plans from "@/components/Plans";
import Faq from "@/components/Faq";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <VideoSection />
      <Plans />
      <FreeClass />
      <WhyUs />
      <Faq />
      <CallToAction />
    </>
  );
}
