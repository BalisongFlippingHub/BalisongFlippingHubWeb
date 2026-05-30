import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faEarthAmericas, faTv, faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const pillars = [
  {
    icon: faGlobe,
    title: "Community",
    description:
      "A social platform for balisong enthusiasts. Share posts, build your profile, showcase your collection, and connect with flippers from around the world.",
  },
  {
    icon: faEarthAmericas,
    title: "Product World",
    description:
      "A reference hub for knives and makers. Browse dedicated pages for balisong models and the makers behind them — specs, photos, history, and more.",
  },
  {
    icon: faTv,
    title: "Tutorial Center",
    description:
      "Your destination for tricks and learning. Search a growing trick library, follow structured skill paths, and explore community-submitted clips and tutorials.",
  },
];

const CONTACT_EMAIL = "contact@balisongflippingcenter.com";
const MAX_LENGTH = 1000;

const AboutPage = () => {
  const [message, setMessage] = useState("");

  const charsLeft = MAX_LENGTH - message.length;

  const handleSend = () => {
    const body = encodeURIComponent(message.trim());
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=Message from Balisong Flipping Center&body=${body}`;
  };

  return (
    <section className="w-full min-h-screen bg-[#080a0e] text-white flex justify-center px-4 pt-20 pb-28">
      <div className="w-full max-w-3xl flex flex-col gap-10">

        {/* About */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">About</p>
            <h1 className="font-black text-4xl sm:text-5xl leading-tight">
              <span className="text-blue-primary">Balisong</span> Flipping Center
            </h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl">
              The Balisong Flipping Center is a dedicated platform for the balisong community — a single place to connect, learn, and catalog everything related to the craft of balisong flipping.
            </p>
            <p className="text-white/50 text-base leading-relaxed max-w-2xl">
              Whether you're a seasoned flipper with a wall of knives or someone who just picked up their first trainer, this is your hub. Built by enthusiasts, for enthusiasts.
            </p>
          </div>

          {/* Pillars */}
          <div className="flex flex-col gap-4">
            <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">What's here</p>
            <div className="grid xsm:grid-cols-1 sm:grid-cols-3 gap-4">
              {pillars.map(({ icon, title, description }) => (
                <div
                  key={title}
                  className="bg-[#13161d] border border-white/10 rounded-2xl p-5 flex flex-col gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-primary/10 border border-blue-primary/20 flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={icon} className="text-blue-primary text-sm" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-1">{title}</p>
                    <p className="text-white/50 text-xs leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06]" />

        {/* Contact */}
        <div className="bg-[#13161d] border border-white/10 rounded-2xl px-8 py-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-blue-primary uppercase tracking-widest font-semibold">Contact</p>
            <h2 className="font-bold text-3xl">Get in touch</h2>
            <p className="text-white/50 text-base leading-relaxed max-w-xl">
              Have a question, suggestion, or just want to say hello? We'd love to hear from you. Reach out directly and we'll get back to you as soon as we can.
            </p>
          </div>

          {/* Email display */}
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faEnvelope} className="text-blue-primary text-sm" />
            <span className="text-white/50 text-sm">{CONTACT_EMAIL}</span>
          </div>

          {/* Message input */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs text-white/40 uppercase tracking-wider font-medium">Message</label>
              <span className={`text-xs font-medium ${charsLeft < 100 ? "text-gold" : "text-white/30"}`}>
                {charsLeft} left
              </span>
            </div>
            <textarea
              value={message}
              onChange={(e) => { if (e.target.value.length <= MAX_LENGTH) setMessage(e.target.value); }}
              placeholder="Write your message here..."
              rows={5}
              className="w-full bg-[#0d0f14] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-blue-primary/50 transition-colors duration-200 resize-none placeholder:text-white/20"
            />
          </div>

          {/* Send button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!message.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-blue-primary text-white text-sm font-semibold rounded-xl hover:bg-blue-primary/80 transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed w-fit"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="text-xs" />
            Send Message
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboutPage;
