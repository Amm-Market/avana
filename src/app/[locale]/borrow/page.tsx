import { createPageMetadata } from "@/lib/i18n/page-metadata"
import dynamic from "next/dynamic"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { LocalizedMarketing } from "@/components/localized-marketing"
import { InlineFaqSection, type InlineFaqItem } from "@/components/InlineFaqSection"
import { FeatureCardDescription, FeatureCardTitle, SandboxNotice, SectionEyebrow, SectionTitle } from "@/components/shared"
import { PerformanceSection } from "@/components/ui/performance-section"
import { brandAssetPath } from "@/lib/brand-assets"
import { protocols } from "@/data/protocols"
import { FeaturePageHero } from "@/components/feature-page-hero"
import { AvanaHubWave } from "@/components/avana-hub-wave"
import HomepageNewsroomSection from "@/components/homepage/HomepageNewsroomSection"
import { resolveLocaleParam, type LocaleParamsProps } from "@/lib/i18n/locale-params"
import { SupportedDexDirectory } from "@/components/supported-dex-directory"

const BorrowPowerSection = dynamic(() => import("@/components/borrow-power-section"))
const BorrowValuationSection = dynamic(() => import("@/components/borrow-valuation-section"))
const PositionSafetyCardsSection = dynamic(() => import("@/components/position-safety-cards-section"))

const openSpokeFaqItems: InlineFaqItem[] = [
  {
    value: "open-1",
    question: "What happens to my LP fees while I borrow?",
    answer:
      "Your LP position stays active in the underlying AMM, so fees continue accruing while the loan is open. If liquidation occurs, any uncollected fees are applied first to reduce your debt before principal is unwound.",
  },
  {
    value: "open-2",
    question: "How is my borrowing limit calculated?",
    answer:
      "Your borrowing power is based on the USD value of the LP position, adjusted by the weaker asset in the pair and a pool specific risk factor. That risk factor reflects volatility, liquidity depth, and asset correlation.",
  },
  {
    value: "open-3",
    question: "What is a Spoke?",
    answer:
      "A Spoke is an isolated lending market designed for a specific AMM and pool type. Each Spoke has its own risk parameters, oracle logic, and liquidation flow, which keeps risk contained within that market.",
  },
  {
    value: "open-4",
    question: "What happens if I get liquidated?",
    answer:
      "Liquidation begins when your health factor falls below the allowed threshold. The protocol follows a borrower protective sequence by applying accrued fees first, then unwinding only the amount of LP principal needed to restore or repay the position. Any remaining value is returned to you.",
  },
  {
    value: "open-5",
    question: "Can I repay at any time?",
    answer:
      "Yes. There are no fixed loan terms. You can repay partially or in full whenever you want, as long as the position remains healthy while the loan is open.",
  },
  {
    value: "open-6",
    question: "Can I borrow against multiple LP positions at once?",
    answer:
      "Yes. Multiple LP positions can be used within the same market, with borrowing power derived from the combined collateral value. The interface shows both individual position health and your overall account exposure.",
  },
]

const lpHubMarkets = [
  {
    title: "Stable LP Hub",
    description:
      "Stablecoin LP markets built for tight pricing, low slippage, and minimal impermanent loss.",
    variant: "stable",
  },
  {
    title: "Correlated LP Hub",
    description:
      "LP markets for assets that move together, built for tighter risk bands and cleaner borrowing power.",
    variant: "correlated",
  },
  {
    title: "Volatile LP Hub",
    description:
      "Major DeFi asset LP markets for wider price ranges and higher risk-reward strategies.",
    variant: "volatile",
  },
] as const

const supportedDexes = protocols.filter(
  (protocol) => protocol.category === "DEX" && protocol.shortName !== "GMX-P",
)

function BorrowMarketCard({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="flex h-full flex-col feature-card rounded-2xl p-6 md:p-8">
      <span className="text-4xl text-type-accent md:text-5xl">{number}</span>
      <FeatureCardTitle className="mt-6">{title}</FeatureCardTitle>
      <FeatureCardDescription className="mt-3">{description}</FeatureCardDescription>
    </div>
  )
}

export async function generateMetadata({ params }: LocaleParamsProps) {
  const locale = await resolveLocaleParam(params)
  return createPageMetadata(locale, "borrow", "/borrow")
}

export default async function BorrowPage({ params }: LocaleParamsProps) {
  const locale = await resolveLocaleParam(params)
  return (
    <LocalizedMarketing locale={locale} keys={["borrow/page", "borrow-power-section", "position-safety-cards-section", "homepage/HomepageNewsroomSection", "InlineFaqSection"]}>
    <div className="bg-white">
      <FeaturePageHero
        title={
          <>
            Borrow against
            <br />
            AMM positions
          </>
        }
        description="Turn your liquidity pool positions into collateral and borrow against them here without leaving the pool."
        imageSrc="/images/Avana Borrow Hero.png"
        imageAlt="Avana Borrow product interface"
        imageWidth={1254}
        imageHeight={1254}
      >
        <Link
          href="https://app.avana.cc"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-[#01AACF] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#00a0c2]"
        >
          Try Testnet
        </Link>
        <Link
          href="/developers/architecture"
          className="inline-flex items-center justify-center rounded-full border border-border bg-white px-4 py-2 text-xs text-foreground transition-colors hover:bg-muted"
        >
          View Docs
        </Link>
      </FeaturePageHero>

      <section className="bg-white site-section-gap">
        <div className="site-content-shell">
          <div className="mx-auto w-full">
            <div className="flex flex-col gap-6">
              <div className="flex max-w-[600px] flex-col gap-2">
                <SectionEyebrow tone="violet">How borrowing works</SectionEyebrow>
                <SectionTitle>Turn active liquidity into borrowing power</SectionTitle>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <BorrowMarketCard
                  number="1"
                  title="Deposit your LP as collateral"
                  description="Choose a supported LP position and deposit it as collateral while your liquidity stays active."
                />

                <BorrowMarketCard
                  number="2"
                  title="Borrow against its risk-adjusted value"
                  description="Borrow against the risk-adjusted value of the position and receive funds straight in your wallet."
                />

                <BorrowMarketCard
                  number="3"
                  title="Manage debt before risk rises"
                  description="Repay, add collateral, or reduce debt before the position drifts toward the liquidation threshold."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="avana-hubs" className="bg-white site-section-gap">
        <div className="site-content-shell">
          <div className="mx-auto w-full">
            <div className="flex flex-col gap-6">
              <div className="max-w-none">
                <SectionEyebrow tone="blue">Find the Hub for your collateral</SectionEyebrow>
                <SectionTitle className="mt-2 max-w-none">
                  Stable, correlated, and volatile LPs belong to different markets.
                </SectionTitle>
              </div>
            </div>

            <div className="mt-10 grid items-start gap-5 lg:mt-16 lg:grid-cols-3">
              {lpHubMarkets.map((hub) => (
                <article
                  key={hub.title}
                  className="flex flex-col feature-card rounded-[4px] p-5"
                >
                  <FeatureCardTitle>{hub.title}</FeatureCardTitle>
                  <FeatureCardDescription className="mt-1.5 max-w-[22rem]">
                    {hub.description}
                  </FeatureCardDescription>

                  <div className="mt-5 rounded-[4px] bg-white p-2">
                    <AvanaHubWave variant={hub.variant} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BorrowValuationSection locale={locale} />

      <SupportedDexDirectory locale={locale} protocols={supportedDexes} />

      <PerformanceSection className="site-section-gap">
        <div className="site-content-shell">
          <div className="mx-auto w-full max-w-[76rem] flex flex-col site-section-stack">
            <div id="liquidity-pools" className="flex flex-col gap-6">
              <div className="flex max-w-none flex-col gap-2">
                <SectionEyebrow tone="blue">Everything in one interface</SectionEyebrow>
                <SectionTitle className={locale === "en" ? "lg:whitespace-nowrap" : "lg:break-words"}>
                  Discover markets and manage risk across your portfolio.
                </SectionTitle>
              </div>
              <div className="relative aspect-[1672/941] w-full overflow-hidden rounded-[1.35rem] sm:aspect-[2/1] md:rounded-[1.6rem]">
                <Image
                  src={brandAssetPath("/images/Avana Borrow Light.png")}
                  alt="Document-style preview of supported borrowing markets"
                  fill
                  sizes="(max-width: 1200px) 100vw, 1120px"
                  className="object-cover object-center"
                />
              </div>
              <SandboxNotice className="mt-4 sm:mt-5" />
            </div>

            <div className="flex flex-col gap-12 md:gap-14">
              <BorrowPowerSection locale={locale} />
              <PositionSafetyCardsSection locale={locale} />
            </div>

          </div>
        </div>
      </PerformanceSection>

      <div className="site-content-shell flex flex-col">
        <div className="flex-1 flex flex-col relative z-0">
        {/* Rest of page content */}
        <div className="site-content-width flex flex-col site-section-stack site-section-gap pb-16 md:pb-20 2xl:pb-18">
          <HomepageNewsroomSection locale={locale} collection="borrow" eyebrowTone="blue" />

          <div className="pb-16 md:pb-24 2xl:pb-22">
            <InlineFaqSection title="Frequently asked questions" items={openSpokeFaqItems} eyebrowTone="blue" withTopBorder={false} />
          </div>
        </div>
      </div>
      </div>
    </div>
  </LocalizedMarketing>
)
}
