import { motion, AnimatePresence } from "framer-motion";

export default function ScheduleCallModal({ open, onClose }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative bg-[#050B14] border border-white/10 rounded-2xl
                     shadow-2xl shadow-cyan-500/20 w-full max-w-xl p-8 z-10"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            ✕
          </button>

          {/* Content */}
          <h2 className="text-white text-2xl font-semibold">
            Schedule a Call
          </h2>
          <p className="text-gray-400 mt-2">
            Talk to our quality engineering experts and explore how Qualizeal
            can help your digital transformation.
          </p>

          {/* Placeholder (Calendly / Form later) */}
          <div className="mt-6 rounded-xl bg-white/5 border border-white/10
                          h-[220px] flex items-center justify-center text-gray-400">
            Calendly / Booking Widget Goes Here
          </div>

          {/* Action */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-md bg-[#00AEEF] text-black font-semibold
                         hover:scale-105 transition"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
