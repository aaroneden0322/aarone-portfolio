"use client";

import { useId } from "react";

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
    <svg viewBox="0 0 100 100" fill="none" className="h-full w-full">
      <circle cx="50" cy="50" r="48" fill="#0C1E34" />
      <path d="M33 20L20.5 33.5H33V20Z" fill="#FDB813" />
      <path d="M33 20L45.5 33.5H33V20Z" fill="#E89A08" />
      <rect x="29" y="33.5" width="8" height="44" fill="#FDB813" />
      <path d="M50 38.5L37.5 52H50V38.5Z" fill="#3094F7" />
      <path d="M50 38.5L62.5 52H50V38.5Z" fill="#2076D4" />
      <rect x="46" y="52" width="8" height="25.5" fill="#3094F7" />
      <path d="M67 20L54.5 33.5H67V20Z" fill="#3AA830" />
      <path d="M67 20L79.5 33.5H67V20Z" fill="#44D62C" />
      <rect x="63" y="33.5" width="8" height="44" fill="#44D62C" />
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

/* AI models & platforms Aarone builds with */

export function StripeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect width="24" height="24" rx="6" fill="#635BFF" />
      <path
        d="M13.8 9.3C13.8 8.7 13.3 8.3 12.3 8.3C11.1 8.3 9.8 8.8 8.9 9.3V6.9C9.9 6.4 11.2 6.1 12.5 6.1C15.1 6.1 16.8 7.4 16.8 9.6C16.8 13 12.2 12.6 12.2 14.1C12.2 14.8 12.8 15.2 13.9 15.2C15.3 15.2 16.8 14.6 17.8 14V16.5C16.6 17.1 15.1 17.4 13.6 17.4C10.9 17.4 9.2 16.1 9.2 13.9C9.2 10.4 13.8 10.9 13.8 9.3Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function OpenAiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect width="24" height="24" rx="6" fill="#10A37F" />
      <path
        d="M18.5 10c0-1.7-.9-3.2-2.3-4-.4-1.5-1.7-2.6-3.2-2.8-1.5-.2-3 .4-4 1.5-1.4-.4-2.9 0-4 1-1 1-1.5 2.5-1.2 3.9C3.6 10.3 3 11.6 3 13c0 1.7.9 3.2 2.3 4 .4 1.5 1.7 2.6 3.2 2.8 1.5.2 3-.4 4-1.5 1.4.4 2.9 0 4-1 1-1 1.5-2.5 1.2-3.9 1.2-.7 1.8-2 1.8-3.4z"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 8.5v7M9 10.5l6 3M9 13.5l6-3" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ClaudeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect width="24" height="24" rx="6" fill="#D97706" />
      <path
        d="M7 17.5L12 6.5L17 17.5H14.5L13.2 14.5H10.8L9.5 17.5H7ZM11.4 12.8H12.6L12 10.8L11.4 12.8Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function GrokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect width="24" height="24" rx="6" fill="#0F1419" stroke="#333333" strokeWidth="1" />
      <path d="M6 6L11.5 13.5L6 18H8.5L12.7 14.6L15.5 18H18L12.3 10.2L17.5 6H15L11.1 9.1L8.5 6H6Z" fill="#FFFFFF" />
      <path d="M16 6L7.5 18" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function GeminiIcon() {
  const id = useId();
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect width="24" height="24" rx="6" fill="#1B1A3A" />
      <path d="M12 3C12 7.97 7.97 12 3 12C7.97 12 12 16.03 12 21C12 16.03 16.03 12 21 12C16.03 12 12 7.97 12 3Z" fill={`url(#${id}-gemini)`} />
      <defs>
        <linearGradient id={`${id}-gemini`} x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4E8CFF" />
          <stop offset="0.5" stopColor="#9B72CF" />
          <stop offset="1" stopColor="#E97777" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LovableIcon() {
  const id = useId();
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect width="24" height="24" rx="6" fill="#1C1326" />
      <path
        d="M12 20.5C12 20.5 4.5 15.5 4.5 9.5C4.5 6.5 7 4 10 4C11.3 4 12 4.7 12 4.7C12 4.7 12.7 4 14 4C17 4 19.5 6.5 19.5 9.5C19.5 15.5 12 20.5 12 20.5Z"
        fill={`url(#${id}-lovable)`}
      />
      <defs>
        <linearGradient id={`${id}-lovable`} x1="4.5" y1="4" x2="19.5" y2="20.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4F7A" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function VapiIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect width="24" height="24" rx="6" fill="#1E0B36" />
      <path d="M6 7L12 18L18 7" stroke="#A855F7" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="1.5" fill="#E9D5FF" />
      <circle cx="8" cy="9.5" r="1" fill="#C084FC" />
      <circle cx="16" cy="9.5" r="1" fill="#C084FC" />
    </svg>
  );
}

export function LangChainIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect width="24" height="24" rx="6" fill="#002B24" />
      <rect x="5.5" y="8" width="6.5" height="8" rx="3.25" stroke="#10B981" strokeWidth="2" />
      <rect x="12" y="8" width="6.5" height="8" rx="3.25" stroke="#34D399" strokeWidth="2" />
      <circle cx="12" cy="12" r="1" fill="#10B981" />
    </svg>
  );
}

export function OpenRouterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect width="24" height="24" rx="6" fill="#062222" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3" stroke="#14B8A6" strokeWidth="1.8" strokeDasharray="3 2" />
      <circle cx="12" cy="12" r="3" fill="#0D9488" />
      <circle cx="12" cy="12" r="1.2" fill="#5EEAD4" />
    </svg>
  );
}

/* Productivity, comms, and design tools */

export function CanvaIcon() {
  const id = useId();
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <circle cx="12" cy="12" r="11" fill={`url(#${id}-canva)`} />
      <path
        d="M15.5 8.5C14.2 7.2 11.5 7 9.8 8.8C7.8 11 8.2 14.5 10.5 16.2C12.5 17.8 15.2 16.8 16 15.5"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id={`${id}-canva`} x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00C4CC" />
          <stop offset="1" stopColor="#7D2AE8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function GmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect width="24" height="24" rx="6" fill="#1F2937" />
      <path d="M5 7L12 12.5L19 7" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M5 7V17H8V11.5L12 14.5L16 11.5V17H19V7"
        fill="#4285F4"
        fillOpacity="0.2"
        stroke="#4285F4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5 8V17H7.5V11L5 8Z" fill="#4285F4" />
      <path d="M19 8V17H16.5V11L19 8Z" fill="#34A853" />
      <path d="M5 7L12 12.5L19 7H5Z" fill="#EA4335" />
      <path d="M16.5 11L19 8V7L16.5 9V11Z" fill="#FBBC05" />
    </svg>
  );
}

export function GoogleWorkspaceIcon() {
  const id = useId();
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect width="24" height="24" rx="6" fill="#1F2937" />
      <path
        d="M6 16.5L9.5 8L12 13L14.5 8L18 16.5"
        stroke={`url(#${id}-workspace)`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id={`${id}-workspace`} x1="6" y1="8" x2="18" y2="16.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4285F4" />
          <stop offset="0.33" stopColor="#EA4335" />
          <stop offset="0.66" stopColor="#FBBC05" />
          <stop offset="1" stopColor="#34A853" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function GoogleDocsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <path d="M6 3H14L19 8V20C19 20.6 18.6 21 18 21H6C5.4 21 5 20.6 5 20V4C5 3.4 5.4 3 6 3Z" fill="#4285F4" />
      <path d="M14 3V8H19" fill="#A1C2FA" />
      <path d="M8 12H16M8 15H16M8 18H13" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function GoogleSheetsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <path d="M6 3H14L19 8V20C19 20.6 18.6 21 18 21H6C5.4 21 5 20.6 5 20V4C5 3.4 5.4 3 6 3Z" fill="#0F9D58" />
      <path d="M14 3V8H19" fill="#87CEAB" />
      <rect x="8" y="11" width="8" height="7" rx="0.5" fill="#FFFFFF" fillOpacity="0.2" stroke="#FFFFFF" strokeWidth="1.2" />
      <path d="M8 14.5H16M12 11V18" stroke="#FFFFFF" strokeWidth="1.2" />
    </svg>
  );
}

export function GoogleCalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect x="4" y="4" width="16" height="16" rx="3.5" fill="#4285F4" />
      <path d="M4 8.5H20" stroke="#FFFFFF" strokeWidth="1.2" />
      <text x="12" y="16" fill="#FFFFFF" fontSize="7.5" fontFamily="Arial, sans-serif" fontWeight="bold" textAnchor="middle">
        31
      </text>
    </svg>
  );
}

export function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <circle cx="12" cy="12" r="11" fill="#229ED9" />
      <path d="M6 11.8L17.5 7.5L15 17.5L11 14L9 16V13.5L14.5 9.5L8.5 12.8L6 11.8Z" fill="#FFFFFF" />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <circle cx="12" cy="12" r="11" fill="#25D366" />
      <path
        d="M12 6C8.7 6 6 8.7 6 12C6 13.2 6.4 14.3 7 15.2L6 18L9 17C9.9 17.6 10.9 18 12 18C15.3 18 18 15.3 18 12C18 8.7 15.3 6 12 6ZM14.8 14.2C14.6 14.6 14.1 14.9 13.6 15C13.2 15.1 12.7 15.1 11.7 14.7C10.4 14.2 9.5 13.1 9 12.4C8.9 12.2 8.3 11.4 8.3 10.6C8.3 9.8 8.7 9.4 8.9 9.2C9.1 9 9.3 9 9.5 9C9.6 9 9.8 9 9.9 9.2C10.1 9.6 10.5 10.5 10.5 10.6C10.6 10.7 10.6 10.8 10.5 10.9C10.4 11.1 10.3 11.2 10.2 11.3C10.1 11.4 10 11.5 10.1 11.7C10.3 12 10.8 12.7 11.5 13.2C12.2 13.7 12.8 13.9 13.1 14C13.3 14.1 13.4 14 13.6 13.9C13.8 13.7 14.1 13.3 14.3 13C14.5 12.7 14.6 12.8 14.8 12.8C15 12.9 16 13.4 16.2 13.5C16.4 13.6 16.5 13.7 16.5 13.8C16.5 14 16.3 14.5 14.8 14.2Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function NotionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect x="3" y="3" width="18" height="18" rx="4" fill="#000000" stroke="#444444" strokeWidth="1" />
      <path d="M7.5 7.5L14.5 8.8V16.5L7.5 15.2V7.5Z" fill="#FFFFFF" fillOpacity="0.15" />
      <path d="M8 7V17L11.5 16V8L16 17V7L12.5 8V16L8 7Z" fill="#FFFFFF" />
    </svg>
  );
}

export function AsanaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect width="24" height="24" rx="6" fill="#1F151B" />
      <circle cx="12" cy="7.5" r="3.2" fill="#F06A6A" />
      <circle cx="6.5" cy="15.5" r="3.2" fill="#F06A6A" />
      <circle cx="17.5" cy="15.5" r="3.2" fill="#F06A6A" />
    </svg>
  );
}

export function ApolloIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
      <rect width="24" height="24" rx="6" fill="#16082F" />
      <circle cx="12" cy="12" r="7.5" stroke="#7C3AED" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.5" stroke="#A855F7" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="2" fill="#C084FC" />
    </svg>
  );
}
