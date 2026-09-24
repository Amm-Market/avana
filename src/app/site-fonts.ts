import localFont from "next/font/local"

/**
 * Diatype is the app-wide typeface used across the marketing site.
 * Only the normal variable face is preloaded globally so text-first routes do
 * not pay for every italic face up front.
 */
export const diatypeFont = localFont({
  variable: "--font-diatype",
  // Keep text invisible until Diatype is ready so a system face never flashes.
  display: "block",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
  src: [
    {
      path: "../../public/fonts/diatype/ABCDiatypeVariable-Site-Trial.woff2",
      weight: "400 600",
      style: "normal",
    },
  ],
})
