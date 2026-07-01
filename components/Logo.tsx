type LogoProps = {
  size?: number;
  light?: boolean; // lighter colors for dark backgrounds (footer)
  withWordmark?: boolean;
};

/** Kitchi Kitchi brand mark: a smiling homemade-food pot under a green house
    roof with a heart, flanked by a spoon and fork, beside the two-tone wordmark. */
export default function Logo({ size = 40, light = false, withWordmark = true }: LogoProps) {
  const orange = "#ef5a28";
  const orangeDeep = "#d8481c";
  const green = "#5aa12f";
  const greenWord = light ? "#8fce5e" : "#4e9d2f";
  const brown = light ? "#caa57e" : "#5a3a22";

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size * 0.92} viewBox="0 0 120 110" role="img" aria-label="Kitchi Kitchi" style={{ flex: "none" }}>
        {/* Arc over the top */}
        <path d="M 12 62 A 49 49 0 0 1 108 62" fill="none" stroke={orange} strokeWidth="5" strokeLinecap="round" />

        {/* House roof */}
        <path d="M 30 60 L 60 31 L 90 60" fill="none" stroke={green} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        {/* Heart at the apex */}
        <path d="M 60 23 C 57.5 19.5 52 21 52 25 C 52 28 57 31 60 33.5 C 63 31 68 28 68 25 C 68 21 62.5 19.5 60 23 Z" fill={green} />
        {/* Little window */}
        <rect x="55" y="44" width="10" height="10" rx="1.5" fill="none" stroke={green} strokeWidth="2.4" />

        {/* Spoon (left) */}
        <g fill={brown}>
          <ellipse cx="20" cy="55" rx="6.5" ry="9" />
          <rect x="17.6" y="61" width="4.8" height="34" rx="2.4" />
        </g>
        {/* Fork (right) */}
        <g fill={brown}>
          <rect x="98" y="44" width="2.6" height="14" rx="1.3" />
          <rect x="102" y="44" width="2.6" height="14" rx="1.3" />
          <rect x="106" y="44" width="2.6" height="14" rx="1.3" />
          <path d="M 98 55 H 108.6 V 57 a 3 3 0 0 1 -3 3 h -4.6 a 3 3 0 0 1 -3 -3 Z" />
          <rect x="101.4" y="59" width="3.8" height="36" rx="1.9" />
        </g>

        {/* Pot */}
        <g>
          {/* handles */}
          <ellipse cx="38" cy="78" rx="6" ry="7.5" fill={orangeDeep} />
          <ellipse cx="82" cy="78" rx="6" ry="7.5" fill={orangeDeep} />
          {/* body */}
          <path d="M 40 70 H 80 L 77 95 a 4 4 0 0 1 -4 3.4 H 47 a 4 4 0 0 1 -4 -3.4 Z" fill={orange} />
          {/* lid */}
          <ellipse cx="60" cy="69" rx="23" ry="6" fill={orangeDeep} />
          <rect x="56.5" y="60.5" width="7" height="6" rx="2" fill={orangeDeep} />
          {/* smiley face */}
          <path d="M 50 79 q 2.4 -3 4.8 0" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 65.2 79 q 2.4 -3 4.8 0" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 52 86 q 8 7 16 0" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
        </g>

        {/* Ground line */}
        <path d="M 30 103 Q 60 110 90 103" fill="none" stroke={green} strokeWidth="5" strokeLinecap="round" />
      </svg>

      {withWordmark && (
        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: size * 0.46, letterSpacing: "-0.01em", lineHeight: 1, whiteSpace: "nowrap" }}>
          <span style={{ color: orange }}>Kitchi</span>{" "}
          <span style={{ color: greenWord }}>Kitchi</span>
        </span>
      )}
    </span>
  );
}
