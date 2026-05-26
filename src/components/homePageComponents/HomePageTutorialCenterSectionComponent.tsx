import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faFilm,
  faGraduationCap,
  faPaperPlane,
  faFlask,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: faMagnifyingGlass,
    title: "Trick Library",
    description:
      "Search and explore a growing database of named balisong tricks and combos. Find exactly what you want to learn next.",
    bullets: [
      "Search tricks by name, style, or difficulty",
      "Filter by beginner, intermediate, or advanced",
      "See community tutorials linked to each trick",
      "Build and track your personal trick list",
    ],
  },
  {
    icon: faFilm,
    title: "Community Clips",
    description:
      "Browse flip videos and posts submitted by the community. Get inspired by flows, combos, and creative trick sequences from flippers around the world.",
    bullets: [
      "Browse clips filtered by trick, style, or flipper",
      "Like, save, and comment on your favorites",
      "Discover new flippers and unique styles",
      "Curated featured clips from top contributors",
    ],
  },
  {
    icon: faGraduationCap,
    title: "Learn by Level",
    description:
      "Follow curated progressions from beginner fundamentals all the way to advanced combos. Structured paths so you always know what to learn next.",
    bullets: [
      "Beginner, intermediate, and advanced tracks",
      "Step-by-step trick breakdowns",
      "Track your personal progress",
      "Recommendations based on your skill level",
    ],
  },
  {
    icon: faPaperPlane,
    title: "Submit a Tutorial",
    description:
      "Share your own trick breakdowns and flip clips with the community. Help others learn and earn recognition for your contributions.",
    bullets: [
      "Post video or photo tutorials",
      "Tag tricks directly from the Trick Library",
      "Get feedback and likes from the community",
      "Get featured on the Tutorial Center homepage",
    ],
  },
];

const HomePageTutorialCenterSectionComponent = () => {
  const navigate = useNavigate();

  return (
    <section
      className="min-h-screen w-full text-white flex items-center relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 40%, #0d6b65 0%, #074440 50%, #021a18 100%)',
        borderRadius: '0 0 50% 50% / 0 0 80px 80px',
        boxShadow: '0 40px 80px rgba(0,0,0,0.8)',
        zIndex: 2,
        position: 'relative',
      }}
    >

      {/* Maze pattern overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M%200%2030%20L%2050%2030%20L%2050%200%20M%2030%2080%20L%2030%2050%20L%2080%2050' stroke='white' stroke-opacity='.03' stroke-width='10' fill='none' stroke-linecap='square'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 65%, black 88%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 65%, black 88%)',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-56 pb-60">

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <FontAwesomeIcon icon={faTv} className="text-teal text-sm" />
          <span className="uppercase tracking-widest text-base font-semibold text-teal">
            Tutorial Center
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center font-bold xsm:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
          Learn. Watch. <span className="text-teal">Flip.</span>
        </h2>

        {/* Subheading */}
        <p className="text-center text-white/60 xsm:text-base md:text-lg max-w-2xl mx-auto mt-5 leading-relaxed">
          The Tutorial Center is your destination for everything trick-related. Look up specific
          combos, follow a learning path, or dive into a feed of community clips and creative flipping content.
        </p>

        {/* Feature Cards */}
        <div className="grid xsm:grid-cols-1 md:grid-cols-2 gap-5 mt-14">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-shadow-teal border border-white/10 rounded-xl p-6 flex flex-col gap-3 hover:border-teal/40 transition-all duration-300 shadow-[0_4px_32px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal/10 border border-teal/20 flex items-center justify-center flex-shrink-0">
                  <FontAwesomeIcon icon={feature.icon} className="text-teal" />
                </div>
                <h3 className="font-bold text-base sm:text-lg">{feature.title}</h3>
              </div>
              <p className="text-white/55 text-sm leading-relaxed">{feature.description}</p>

              {/* Hover-reveal bullet points */}
              <ul className="max-h-0 overflow-hidden group-hover:max-h-[200px] transition-all duration-500 ease-in-out flex flex-col gap-1.5 border-t border-white/0 group-hover:border-white/10 group-hover:pt-3 group-hover:mt-1">
                {feature.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-teal mt-1 text-xs">▸</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* More coming soon strip */}
        <div className="mt-5 bg-shadow-teal-mid/70 border border-dashed border-teal/25 rounded-xl px-6 py-5 flex items-center justify-center gap-3 text-white/50">
          <FontAwesomeIcon icon={faFlask} className="text-teal/60 text-sm" />
          <span className="text-sm tracking-wide uppercase font-medium">More features coming soon</span>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-14">
          <button
            type="button"
            onClick={() => navigate("/tutorial-center")}
            className="px-8 py-3 text-white font-semibold text-base rounded hover:brightness-110 transition-[filter] duration-300"
            style={{ backgroundColor: '#0d9488', border: '1px solid #0d9488' }}
          >
            Explore Tutorial Center
          </button>
        </div>

      </div>
    </section>
  );
};

export default HomePageTutorialCenterSectionComponent;
