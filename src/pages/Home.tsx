/** @format */

import Hero from "../components/Hero";
import ImpactStats from "../components/ImpactStats";
import LiveMonitoring from "../components/LiveMonitoring";
import HowItWorks from "../components/HowItWorks";
import SuccessStories from "../components/SuccessStories";
import CarbonCalculator from "../components/CarbonCalculator";
import Partners from "../components/Partners";
import TeamShowcase from "../components/TeamShowcase";
import CallToAction from "../components/CallToAction";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <ImpactStats />
      <LiveMonitoring />
      <HowItWorks />
      <TeamShowcase />
      <SuccessStories />
      <CarbonCalculator />
      <Partners />
      <CallToAction />
    </motion.div>
  );
}
