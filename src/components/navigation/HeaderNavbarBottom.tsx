import { faCircleUser, faCubes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";

const NOTCH_HW = 30;   // notch half-width
const NOTCH_D  = 20;   // notch depth
const NOTCH_S  = 10;   // shoulder smoothing
const CORNER_R = 28;   // pill corner radius

// Always includes the notch section so the path structure stays constant —
// this is required for smooth Framer Motion path morphing.
const buildPillPath = (W: number, H: number, cx: number, depth: number): string => {
  if (!W || !H) return '';
  const r = CORNER_R;

  const notchSection = [
    `L ${cx - NOTCH_HW - NOTCH_S} 0`,
    `C ${cx - NOTCH_HW} 0 ${cx - NOTCH_HW / 3} ${depth} ${cx} ${depth}`,
    `C ${cx + NOTCH_HW / 3} ${depth} ${cx + NOTCH_HW} 0 ${cx + NOTCH_HW + NOTCH_S} 0`,
  ].join(' ');

  return [
    `M ${r} 0`,
    notchSection,
    `L ${W - r} 0`,
    `Q ${W} 0 ${W} ${r}`,
    `L ${W} ${H - r}`,
    `Q ${W} ${H} ${W - r} ${H}`,
    `L ${r} ${H}`,
    `Q 0 ${H} 0 ${H - r}`,
    `L 0 ${r}`,
    `Q 0 0 ${r} 0`,
    `Z`,
  ].join(' ');
};

const MIN_STIFF = 70;   // slowest (adjacent icons)
const MAX_STIFF = 160;  // fastest (farthest icons)
const MIN_DIST  = 50;   // px — anything closer uses MIN_STIFF
const MAX_DIST  = 220;  // px — anything farther uses MAX_STIFF

const getSpringConfig = (distance: number) => {
  const t = Math.min(1, Math.max(0, (distance - MIN_DIST) / (MAX_DIST - MIN_DIST)));
  const stiffness = MIN_STIFF + t * (MAX_STIFF - MIN_STIFF);
  return { type: 'spring' as const, stiffness, damping: 18 };
};

const HeaderNavbarBottom = () => {
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();

  const containerRef  = useRef<HTMLDivElement>(null);
  const profileRef    = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);
  const createRef     = useRef<HTMLDivElement>(null);

  const [notchX, setNotchX]         = useState(0);
  const [notchDepth, setNotchDepth] = useState(0);
  const [dims, setDims]             = useState({ w: 0, h: 0 });

  const prevNotchXRef = useRef(0);
  // Distance from previous notch position — computed during render, ref updated after
  const notchDistance = Math.abs(notchX - prevNotchXRef.current);
  const springConfig  = getSpringConfig(notchDistance);

  const profilePath    = `/${user?.displayName}/${user?.identifierCode}`;
  const collectionPath = `/${user?.displayName}/${user?.identifierCode}/collection`;
  const createPath     = '/create-post';

  const isProfile    = location.pathname === profilePath;
  const isCollection = location.pathname === collectionPath;
  const isCreate     = location.pathname === createPath;

  const measure = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    setDims({ w: containerRect.width, h: containerRect.height });

    const activeRef = isProfile ? profileRef
      : isCollection ? collectionRef
      : isCreate ? createRef
      : null;

    if (activeRef?.current) {
      const iconRect = activeRef.current.getBoundingClientRect();
      setNotchX(iconRect.left + iconRect.width / 2 - containerRect.left);
      setNotchDepth(NOTCH_D);
    } else {
      // Keep last notchX so the collapse animates in-place
      setNotchDepth(0);
    }
  }, [isProfile, isCollection, isCreate]);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  // Update previous notch position after each change
  useEffect(() => {
    prevNotchXRef.current = notchX;
  }, [notchX]);

  // Always provide a valid cx so the path structure never changes
  const effectiveCx = notchX > 0 ? notchX : dims.w / 2;
  const svgPath = buildPillPath(dims.w, dims.h, effectiveCx, notchDepth);

  return (
    <div ref={containerRef} className="relative">

      {/* SVG pill with animated notch */}
      {svgPath && (
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <filter id="pillGlow" x="-20%" y="-100%" width="140%" height="300%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <motion.path
            fill="#111318"
            initial={{ d: svgPath }}
            animate={{ d: svgPath }}
            transition={springConfig}
          />
          <motion.path
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            filter="url(#pillGlow)"
            initial={{ d: svgPath }}
            animate={{ d: svgPath }}
            transition={springConfig}
          />
        </svg>
      )}

      {/* Icons */}
      <div className="relative z-10 flex items-center gap-8 px-8 text-white">

        {/* Profile */}
        <div ref={profileRef}>
          <NavLink to={profilePath}>
            {({ isActive }) => (
              <motion.div
                className="flex justify-center items-center py-4 px-2"
                animate={{ y: isActive ? -16 : 0 }}
                transition={springConfig}
              >
                <motion.div
                  className={`rounded-full flex items-center justify-center w-12 h-12 transition-colors duration-200 ${
                    isActive
                      ? "bg-[#111318] text-blue-primary border border-white/15"
                      : "text-white/50 hover:text-white"
                  }`}
                  animate={{ scale: isActive ? 1.6 : 1 }}
                  whileHover={!isActive ? { scale: 1.15 } : undefined}
                  transition={springConfig}
                >
                  <FontAwesomeIcon icon={faCircleUser} className="text-2xl" />
                </motion.div>
              </motion.div>
            )}
          </NavLink>
        </div>

        {/* Collection */}
        <div ref={collectionRef}>
          <NavLink to={collectionPath}>
            {({ isActive }) => (
              <motion.div
                className="flex justify-center items-center py-4 px-2"
                animate={{ y: isActive ? -16 : 0 }}
                transition={springConfig}
              >
                <motion.div
                  className={`rounded-full flex items-center justify-center w-12 h-12 transition-colors duration-200 ${
                    isActive
                      ? "bg-[#111318] text-blue-primary border border-white/15"
                      : "text-white/50 hover:text-white"
                  }`}
                  animate={{ scale: isActive ? 1.6 : 1 }}
                  whileHover={!isActive ? { scale: 1.15 } : undefined}
                  transition={springConfig}
                >
                  <FontAwesomeIcon icon={faCubes} className="text-2xl" />
                </motion.div>
              </motion.div>
            )}
          </NavLink>
        </div>

        {/* Divider */}
        <div className="w-px self-stretch bg-white/15 my-3" />

        {/* Create Post */}
        <div ref={createRef}>
          <NavLink to={createPath}>
            {({ isActive }) => (
              <motion.div
                className="flex justify-center items-center py-4 px-2"
                animate={{ y: isActive ? -16 : 0 }}
                transition={springConfig}
              >
                <motion.div
                  className="rounded-full flex items-center justify-center w-12 h-12 bg-blue-primary"
                  animate={{ scale: isActive ? 1.6 : 1 }}
                  whileHover={!isActive ? { scale: 1.15 } : undefined}
                  transition={springConfig}
                >
                  <FontAwesomeIcon icon={faPlus} className="text-white text-xl" />
                </motion.div>
              </motion.div>
            )}
          </NavLink>
        </div>

      </div>
    </div>
  );
};

export default HeaderNavbarBottom;
