"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"
import HeaderDesktopNavigation from "@/components/header-desktop-navigation"
import HeaderLanguageDropdown from "@/components/header-language-dropdown"
import HeaderMobileNavigation from "@/components/header-mobile-navigation"
import { Link } from "@/i18n/navigation"
import { HEADER_WORDMARK_PATH, SITE_NAME, siteRoutes } from "@/lib/site"

function BrandLogo({ alt }: { alt: string }) {
  return (
    <span className="inline-flex items-center">
      <Image
        src={HEADER_WORDMARK_PATH}
        alt={alt}
        width={480}
        height={240}
        quality={85}
        sizes="121px"
        className="h-[56px] w-auto origin-left -translate-x-[10%] scale-[1.08] md:h-[52px]"
      />
    </span>
  )
}

export default function Header(): React.JSX.Element {
  const t = useTranslations("common")

  return (
    <header className="sticky top-0 z-50 bg-[var(--header-surface)] backdrop-blur-[10px]">
      <div className="site-content-shell flex h-16 items-center justify-between gap-4 md:h-[54px] md:gap-3 lg:grid lg:grid-cols-[minmax(min-content,1fr)_auto_minmax(min-content,1fr)]">
        <div className="inline-flex shrink-0 items-center lg:justify-self-start">
          <Link href={siteRoutes.home} aria-label={SITE_NAME} data-framer-name="Logo" className="inline-flex items-center">
            <BrandLogo alt={t("a11y.logo", { site: SITE_NAME })} />
          </Link>
        </div>

        <HeaderDesktopNavigation />

        <div className="hidden items-center gap-1.5 lg:flex lg:justify-self-end xl:gap-2">
          <HeaderLanguageDropdown />
          <Link
            href="https://app.avana.cc"
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#01AACF] px-3 py-1.5 text-xs leading-none text-white transition-colors hover:bg-[#00a0c2]"
          >
            {t("cta.sandboxLong")}
            <ArrowRight className="size-3 shrink-0 rtl:rotate-180" aria-hidden />
          </Link>
        </div>

        <HeaderMobileNavigation />
      </div>
    </header>
  )
}
