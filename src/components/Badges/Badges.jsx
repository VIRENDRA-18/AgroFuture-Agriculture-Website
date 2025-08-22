// src/components/Badges.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaWater, FaRecycle } from "react-icons/fa";

const BADGES = [
  { id: 1, icon: <FaLeaf />, label: "Soil Saver", desc: "Maintained optimal pH for 3 months" },
  { id: 2, icon: <FaWater />, label: "Water Warrior", desc: "Reduced water use by 20%" },
  { id: 3, icon: <FaRecycle />, label: "Eco Guardian", desc: "Implemented crop rotation plan" },
];

export default function Badges() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100" id="badges">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-800">Your Achievements</h2>
          <p className="text-gray-600">Earn badges by adopting eco-friendly practices.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BADGES.map((b, i) => (
            <motion.div
              key={b.id}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.1 * i }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl bg-white shadow-xl border text-center"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-green-100 text-green-700 grid place-items-center text-2xl">
                {b.icon}
              </div>
              <div className="mt-4 text-lg font-bold text-green-800">{b.label}</div>
              <div className="text-sm text-gray-600">{b.desc}</div>
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="mt-4 text-xs text-green-700"
              >
                Keep it up! ⭐
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
