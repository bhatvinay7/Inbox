'use client'
import { Mail, Sparkles, Repeat, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  // Motion Variants
  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const featureContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[hsl(244,21%,15%)] transition-colors duration-300">
      {/* Navbar */}
      <nav className="w-full py-4 px-8 flex justify-between items-center shadow-sm bg-white dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white/75">Inbox</h1>
        <button
          id="themeToggle"
          className="px-4 py-2 rounded-xl border dark:border-gray-700 shadow-sm text-gray-900 dark:text-white"
          onClick={() => {
            document.documentElement.classList.toggle('dark');
          }}
        >
          Toggle Theme
        </button>
      </nav>

      {/* Hero Section */}
      <motion.section
        className="px-8 py-20 flex flex-col md:flex-row items-center justify-center relative"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >

        <div className="text-center md:text-left max-w-3xl">
          <h2 className=" text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Supercharge Your <span className="text-blue-600">Cold Email Outreach</span>
          </h2>
          <p className=" mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
            Automate sending, tracking, and personalizing cold emails with AI-powered workflows, warm-up tools, and inbox rotation.
          </p>
          <motion.button
            className="w-fit  mt-3 md:mt-7 px-4 md:px-5 py-2 md:py-3 mx-auto bg-blue-900 border border-white/25 text-white rounded-2xl shadow-lg hover:opacity-90 text-lg flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="px-8 py-16 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={featureContainer}
      >
        {[
          {
            icon: <Mail className="w-8 h-8 text-blue-600" />,
            title: "Smart Sequencing",
            content: "Create multi-step automated cold email sequences with delays, conditions, and personalization."
          },
          {
            icon: <Sparkles className="w-8 h-8 text-blue-600" />,
            title: "AI Personalization",
            content: "Use AI to generate personalized lines that increase reply rates effortlessly."
          },
          {
            icon: <Repeat className="w-8 h-8 text-blue-600" />,
            title: "Inbox Rotation",
            content: "Avoid spam by distributing your email sends across multiple inboxes safely."
          }
        ].map((feature, i) => (
          <motion.div
            key={i}
            className="p-6 bg-gray-100 border border-white/15 dark:bg-gray-800 rounded-2xl shadow flex gap-4 items-start flex-col"
            variants={featureVariants}
          >
            <div className="flex gap-4 items-start">
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
            </div>
            <p className="mt-3 text-gray-600 dark:text-gray-300">{feature.content}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-600 dark:text-gray-400">
        © 2025 Inbox · All rights reserved
      </footer>
    </div>
  );
}
