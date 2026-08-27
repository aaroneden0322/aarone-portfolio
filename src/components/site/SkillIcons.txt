/**
 * Small brand-colored glyphs for the Skills marquee. Kept as simplified,
 * geometric reinterpretations (not pixel-exact trademarked logo files) —
 * same spirit as an icon pack like simple-icons/devicon. Each icon is a
 * plain 24x24 SVG so it drops cleanly into a fixed-size badge box.
 */

export function N8nIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <circle cx="5.5" cy="12" r="3" fill="#EA4B71" />
      <circle cx="18.5" cy="7" r="3" fill="#FF6D5A" />
      <circle cx="18.5" cy="17" r="3" fill="#FF4F7A" />
      <path d="M8.5 10.5L15.5 8" stroke="#EA4B71" strokeWidth="2" strokeLinecap="round" />
      <path d="M8.5 13.5L15.5 16" stroke="#EA4B71" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MakeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect x="3" y="5" width="4.5" height="14" rx="2.2" transform="skewX(-15)" fill="#6D28D9" />
      <rect x="9.5" y="5" width="4.5" height="14" rx="2.2" transform="skewX(-15)" fill="#9333EA" />
      <rect x="16" y="5" width="4.5" height="14" rx="2.2" transform="skewX(-15)" fill="#C084FC" />
    </svg>
  );
}

export function ZapierIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect width="24" height="24" rx="6" fill="#FF4F00" />
      <path
        d="M12 4.5V19.5M4.5 12H19.5M6.7 6.7L17.3 17.3M6.7 17.3L17.3 6.7"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GoHighLevelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect width="24" height="24" rx="6" fill="#FF6A4D" />
      <text
        x="12"
        y="16"
        fill="#080A0F"
        fontSize="9"
        fontFamily="Arial, sans-serif"
        fontWeight="800"
        textAnchor="middle"
      >
        GO
      </text>
    </svg>
  );
}

export function HubSpotIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect width="24" height="24" rx="6" fill="#FF7A59" />
      <circle cx="9" cy="16" r="2.6" stroke="#FFFFFF" strokeWidth="1.6" />
      <circle cx="16" cy="8.5" r="2.1" fill="#FFFFFF" />
      <path d="M9 13.6V9.5M9 9.5C9 8 10 6.8 11.4 6.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M11.4 13.5L15 10" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function PostgresIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect width="24" height="24" rx="6" fill="#336791" />
      <ellipse cx="12" cy="7.5" rx="6" ry="2.5" fill="#FFFFFF" fillOpacity="0.9" />
      <path d="M6 7.5V16.5C6 17.9 8.7 19 12 19C15.3 19 18 17.9 18 16.5V7.5" stroke="#FFFFFF" strokeWidth="1.6" />
      <path d="M6 12C6 13.4 8.7 14.5 12 14.5C15.3 14.5 18 13.4 18 12" stroke="#FFFFFF" strokeWidth="1.6" />
    </svg>
  );
}

export function AirtableIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <path d="M11.5 3.5L20.5 8L12 12.5L3 8L11.5 3.5Z" fill="#FCB400" />
      <path d="M11 13.5V20.5L3 16.5V9.5L11 13.5Z" fill="#18BFFF" />
      <path d="M13 13.5L21 9.5V16.5L13 20.5V13.5Z" fill="#F82B60" />
    </svg>
  );
}

export function SlackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect width="24" height="24" rx="6" fill="#1A1D21" />
      <path d="M6.5 13.5C5.7 13.5 5 14.2 5 15C5 15.8 5.7 16.5 6.5 16.5C7.3 16.5 8 15.8 8 15V13.5H6.5Z" fill="#E01E5A" />
      <path d="M9 13.5C9 12.7 9.7 12 10.5 12C11.3 12 12 12.7 12 13.5V18C12 18.8 11.3 19.5 10.5 19.5C9.7 19.5 9 18.8 9 18V13.5Z" fill="#E01E5A" />
      <path d="M10.5 6.5C10.5 5.7 9.8 5 9 5C8.2 5 7.5 5.7 7.5 6.5C7.5 7.3 8.2 8 9 8H10.5V6.5Z" fill="#36C5F0" />
      <path d="M10.5 9C11.3 9 12 9.7 12 10.5C12 11.3 11.3 12 10.5 12H6C5.2 12 4.5 11.3 4.5 10.5C4.5 9.7 5.2 9 6 9H10.5Z" fill="#36C5F0" />
      <path d="M17.5 10.5C18.3 10.5 19 9.8 19 9C19 8.2 18.3 7.5 17.5 7.5C16.7 7.5 16 8.2 16 9V10.5H17.5Z" fill="#2EB67D" />
      <path d="M15 10.5C15 11.3 14.3 12 13.5 12C12.7 12 12 11.3 12 10.5V6C12 5.2 12.7 4.5 13.5 4.5C14.3 4.5 15 5.2 15 6V10.5Z" fill="#2EB67D" />
      <path d="M13.5 17.5C13.5 18.3 14.2 19 15 19C15.8 19 16.5 18.3 16.5 17.5C16.5 16.7 15.8 16 15 16H13.5V17.5Z" fill="#ECB22E" />
      <path d="M13.5 15C12.7 15 12 14.3 12 13.5C12 12.7 12.7 12 13.5 12H18C18.8 12 19.5 12.7 19.5 13.5C19.5 14.3 18.8 15 18 15H13.5Z" fill="#ECB22E" />
    </svg>
  );
}

/* Concept icons for the "AI & Agents" row — these aren't brand tools, so
   they use the site's own circuit/flow/volt palette rather than
   borrowed brand colors, keeping the row visually distinct from the
   real-tool rows above and below it. */

export function AiAgentsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect x="6" y="7" width="12" height="10" rx="2.5" stroke="#3FE0C5" strokeWidth="1.7" />
      <circle cx="9.5" cy="12" r="1.1" fill="#3FE0C5" />
      <circle cx="14.5" cy="12" r="1.1" fill="#3FE0C5" />
      <path d="M12 7V4.5M9.5 4.5H14.5" stroke="#3FE0C5" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function HumanLoopIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <circle cx="9" cy="8" r="2.4" stroke="#FF6A4D" strokeWidth="1.6" />
      <path d="M5 18C5 15 6.8 13.2 9 13.2C11.2 13.2 13 15 13 18" stroke="#FF6A4D" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14.5 11.5L16.5 13.5L20 9.5" stroke="#FF8A6B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ToolCallingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <path
        d="M14.5 6.5L9 12L6.5 14.5C5.7 15.3 5.7 16.6 6.5 17.4C7.3 18.2 8.6 18.2 9.4 17.4L11.9 14.9M14.5 6.5C15.3 5.7 16.6 5.7 17.4 6.5C18.2 7.3 18.2 8.6 17.4 9.4L15 11.8M14.5 6.5L17.4 9.4"
        stroke="#8B7CFF"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ProbeTestingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <path
        d="M12 4L18.5 6.5V11C18.5 15 15.7 18 12 19.5C8.3 18 5.5 15 5.5 11V6.5L12 4Z"
        stroke="#3FE0C5"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9.3 11.5L11 13.3L14.7 9.5" stroke="#3FE0C5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
