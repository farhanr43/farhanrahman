import { Outfit, DM_Sans, Inter, Poppins, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { getTheme } from "@/lib/data";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const fontMap: Record<string, string> = {
  "Outfit": "var(--font-outfit)",
  "DM Sans": "var(--font-dm-sans)",
  "Inter": "var(--font-inter)",
  "Poppins": "var(--font-poppins)",
  "Plus Jakarta Sans": "var(--font-plus-jakarta-sans)",
  "Space Grotesk": "var(--font-space-grotesk)",
};

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let theme;
  try {
    theme = await getTheme();
  } catch {
    theme = null;
  }

  const cssVars = theme ? {
    "--background": theme.colors.background,
    "--surface": theme.colors.surface,
    "--surface-hover": theme.colors.surfaceHover,
    "--border": theme.colors.border,
    "--border-hover": theme.colors.borderHover,
    "--primary": theme.colors.primary,
    "--secondary": theme.colors.secondary,
    "--muted": theme.colors.muted,
    "--accent": theme.colors.accent,
    "--accent-hover": theme.colors.accentHover,
    "--accent-muted": theme.colors.accentMuted,
    "--accent-subtle": theme.colors.accentSubtle,
    "--success": theme.colors.success,
    "--success-bg": theme.colors.successBg,
    "--warning": theme.colors.warning,
    "--warning-bg": theme.colors.warningBg,
    "--danger": theme.colors.danger,
    "--danger-bg": theme.colors.dangerBg,
    "--font-heading": fontMap[theme.fonts.heading] || "var(--font-outfit)",
    "--font-body": fontMap[theme.fonts.body] || "var(--font-dm-sans)",
    "--container-width": `${theme.layout.containerWidth}px`,
    "--section-padding": `${theme.layout.sectionPadding}px`,
    "--radius-base": `${theme.layout.borderRadius}px`,
  } as React.CSSProperties : undefined;

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${dmSans.variable} ${inter.variable} ${poppins.variable} ${plusJakartaSans.variable} ${spaceGrotesk.variable}`}
      style={cssVars}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
