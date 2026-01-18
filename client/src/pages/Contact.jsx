import React from "react";
import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import ThreeBackground from "../components/ThreeBackground";
import GlassCard from "../components/ui/GlassCard";

const Contact = () => {
  return (
    <section className="min-h-screen relative py-20 px-6 overflow-hidden bg-gray-950 flex items-center justify-center">
      <ThreeBackground />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.3)]"
              >
                <Mail className="h-8 w-8 text-indigo-400" />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold text-white font-space-grotesk tracking-tight mb-4">
                Let's Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-glow">Together</span>
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                Have a project in mind or just want to say hi? I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-6">
              <GlassCard className="flex items-center gap-4 !p-4 hover:bg-white/10 transition-colors group cursor-pointer">
                <div className="p-3 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email Me</p>
                  <p className="text-white font-medium">parasmanikhunte@gmail.com</p>
                </div>
              </GlassCard>

              <GlassCard className="flex items-center gap-4 !p-4 hover:bg-white/10 transition-colors group cursor-pointer">
                <div className="p-3 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Call Me</p>
                  <p className="text-white font-medium">+91 8103713757</p>
                </div>
              </GlassCard>

              <GlassCard className="flex items-center gap-4 !p-4 hover:bg-white/10 transition-colors group cursor-pointer">
                <div className="p-3 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white font-medium">Bilaspur, Chhattisgarh, India</p>
                </div>
              </GlassCard>
            </div>

            <div className="flex gap-4 pt-4">
              <a href="https://github.com/parasmani300" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-indigo-600 transition-all border border-white/10 hover:border-indigo-500">
                <Github size={24} />
              </a>
              <a href="https://www.linkedin.com/in/paras-mani-khunte-4a9a08233/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-indigo-600 transition-all border border-white/10 hover:border-indigo-500">
                <Linkedin size={24} />
              </a>
              <a href="#" className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-indigo-600 transition-all border border-white/10 hover:border-indigo-500">
                <Twitter size={24} />
              </a>
            </div>
          </motion.div>

          {/* Contact Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
