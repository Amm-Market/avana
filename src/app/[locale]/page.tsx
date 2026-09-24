import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { ArrowRight } from "lucide-react"
import HeroSection from "@/components/hero-section"
import WebappHero from "@/components/webapp-hero"
import { TrustedBySection } from "@/components/trusted-by-section"
import { AvanaProductsSection } from "@/components/avana-products-section"
import { TryAvanaCtaSection } from "@/components/try-avana-cta-section"
import { LocalizedMarketing } from "@/components/localized-marketing"
import { Link } from "@/i18n/navigation"
import { resolveLocaleParam, type LocaleParamsProps } from "@/lib/i18n/locale-params"
import { absoluteLocaleUrl, languageAlternates } from "@/lib/i18n/path"
import { buildOgImagePath, SITE_NAME, siteRoutes } from "@/lib/site"

export const dynamic = "force-static"

export async function generateMetadata({ params }: LocaleParamsProps): Promise<Metadata> {
  const locale = await resolveLocaleParam(params)
  const t = await getTranslations({ locale, namespace: "meta" })

  return {
    title: t("home.title"),
    description: t("home.description"),
    keywords: [
      "LP collateral",
      "borrow against LP positions",
      "Aave v4",
      "DeFi lending",
      "liquidity provider loans",
      "AMM collateral",
    ],
    alternates: {
      canonical: absoluteLocaleUrl(locale, siteRoutes.home),
      languages: languageAlternates(siteRoutes.home),
    },
    openGraph: {
      type: "website",
      title: `${SITE_NAME} - ${t("home.title")}`,
      description: t("ogDescription"),
      url: absoluteLocaleUrl(locale, siteRoutes.home),
      images: [
        {
          url: buildOgImagePath({
            title: SITE_NAME,
            subtitle: t("ogSubtitle"),
          }),
          alt: t("ogAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
      images: [
        buildOgImagePath({
          title: SITE_NAME,
          subtitle: t("ogSubtitle"),
        }),
      ],
    },
  }
}

export default async function Home({ params }: LocaleParamsProps) {
  const locale = await resolveLocaleParam(params)
  const t = await getTranslations({ locale, namespace: "home" })

  return (
    <LocalizedMarketing locale={locale} keys={["page","avana-products-section","hero-section","homepage/HomepageFaqSection","homepage/HomepageNewsroomSection","webapp-hero"]}>
      <section className="bg-background">
        <div className="site-content-shell pt-14 md:pt-24 lg:pt-28">
          <div className="max-w-[40rem]">
            <h1 className="text-[1.875rem] leading-[1.25] tracking-[-0.0125em] text-foreground">
              {t("hero.titleLine1")}
              <br />
              <span className="text-type-secondary">{t("hero.titleLine2")}</span>
            </h1>

            <div className="mt-[1.4rem] flex flex-wrap items-center gap-x-2.5 gap-y-2">
              <Link
                href="https://governance.aave.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-[43px] items-center gap-1.5 rounded-full bg-[#01AACF] px-[1.35rem] text-base leading-none text-white transition-colors hover:bg-[#00a0c2]"
              >
                {t("hero.primaryCta")}
                <ArrowRight className="h-4 w-4 stroke-[1.75] rtl:rotate-180" aria-hidden />
              </Link>
              <Link
                href="https://app.avana.cc"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-[43px] items-center gap-1.5 rounded-full bg-black/[0.06] px-[1.35rem] text-base leading-none text-foreground transition-colors hover:bg-black/[0.1]"
              >
                {t("hero.secondaryCta")}
                <ArrowRight className="h-4 w-4 stroke-[1.75] rtl:rotate-180" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <div className="site-content-shell mt-6 md:mt-7 lg:mt-8">
          <WebappHero locale={locale} />
        </div>
      </section>

      <TrustedBySection caption={t("trustedBy.caption")} />

      <section className="bg-background pb-0">
        <div className="site-content-shell site-section-gap">
          <p className="max-w-[48rem] text-[1.25rem] leading-[1.5] tracking-[-0.015em] text-type-secondary md:text-[1.375rem] lg:max-w-[60rem] lg:text-[1.75rem] lg:leading-[1.45] lg:tracking-[-0.0125em]">
            {t.rich("intro.text", {
              ink: (chunks) => <span className="text-foreground">{chunks}</span>,
              strong: (chunks) => <strong className="font-semibold text-foreground">{chunks}</strong>,
            })}
          </p>
        </div>
      </section>

      <AvanaProductsSection locale={locale} />

      <HeroSection locale={locale} />

      <TryAvanaCtaSection
        title={t.has("cta.title") ? t("cta.title") : "Try Avana now."}
        primaryCta={t("hero.primaryCta")}
        secondaryCta={t("hero.secondaryCta")}
      />
    </LocalizedMarketing>
  )
}
