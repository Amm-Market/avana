import { createPageMetadata } from "@/lib/i18n/page-metadata"
import dynamic from "next/dynamic"
import { Link } from "@/i18n/navigation"
import { FeaturePageHero } from "@/components/feature-page-hero"
import type { LucideIcon } from "lucide-react"
import { Gauge, Layers, LockKeyhole, MoveRight, TrendingUp, WalletCards } from "lucide-react"
import { InlineFaqSection, type InlineFaqItem } from "@/components/InlineFaqSection"
import { FeatureCardDescription, FeatureCardTitle, SectionIntro } from "@/components/shared"
import { LocalizedMarketing } from "@/components/localized-marketing"
import HomepageNewsroomSection from "@/components/homepage/HomepageNewsroomSection"
import { resolveLocaleParam, type LocaleParamsProps } from "@/lib/i18n/locale-params"

const PlatformToolsShowcaseSection = dynamic(() => import("@/components/platform-tools-showcase-section"))
const InvestApySection = dynamic(() => import("@/components/invest-apy-section"))
const InvestGrowthCalculatorSection = dynamic(() => import("@/components/invest-growth-calculator-section"))
const DeferredTradeMarketShowcase = dynamic(() => import("@/components/deferred-trade-market-showcase"))

const stableSpokeFaqItems: InlineFaqItem[] = [
  {
    value: "stable-1",
    question: "Is my capital safe?",
    answer:
      "All loans are overcollateralized, and borrowers must remain above the required health threshold. If a position becomes unsafe, liquidation begins automatically through a controlled process designed to protect lender capital and contain losses within that market.",
  },
  {
    value: "stable-2",
    question: "Where does my yield come from?",
    answer:
      "Your yield comes from interest paid by LP backed borrowers. Rates are driven by base utilization at the Aave v4 Hub, with additional Spoke premiums reflecting the risk profile of the LP collateral being funded.",
  },
  {
    value: "stable-3",
    question: "How is this different from supplying to Aave directly?",
    answer:
      "Avana is built on Aave v4 and uses its Hub for liquidity, but it serves a different borrower class. Instead of standard token collateral, Avana enables LP positions as collateral, which creates new borrowing demand and expands yield opportunities for suppliers.",
  },
  {
    value: "stable-4",
    question: "Can I withdraw at any time?",
    answer:
      "Yes, as long as there is sufficient available liquidity in the market. There are no lockups. If utilization is very high, withdrawals may depend on repayments or new liquidity entering the system.",
  },
  {
    value: "stable-5",
    question: "What assets can I supply?",
    answer:
      "At launch, supported assets include GHO, USDC, USDT, ETH, and WBTC, with additional assets added through governance over time. New listings prioritize liquidity depth, reliable oracle support, and strong market demand.",
  },
  {
    value: "stable-6",
    question: "Why can yields be higher than standard lending markets?",
    answer:
      "Avana adds LP specific borrower demand on top of the shared Hub liquidity layer. That demand can increase utilization and support an additional risk premium, which gives suppliers access to yield that standard lending markets may not capture.",
  },
]

const keyFeatureCards = [
  {
    icon: Gauge,
    title: "See your supply rates",
    description:
      "Track APY, utilization, and demand across lending markets from one clear supplier view.",
  },
  {
    icon: WalletCards,
    title: "Manage your deposits",
    description:
      "Keep balances, accrued yield, and available liquidity together in one consolidated surface.",
  },
  {
    icon: LockKeyhole,
    title: "No fixed lock-up",
    description:
      "Your deposit has no fixed term, so you choose how long to keep capital supplied.",
  },
  {
    icon: MoveRight,
    title: "Plan around available liquidity",
    description:
      "At high utilization, withdrawals may need to wait for borrower repayments or new supply.",
  },
  {
    icon: TrendingUp,
    title: "Navigate rate shifts",
    description:
      "Stay ahead when utilization and borrower demand move rates across stablecoin, ETH, and BTC markets.",
  },
  {
    icon: Layers,
    title: "Allocate with clarity",
    description:
      "Decide where capital should sit across lending markets without losing sight of overall yield.",
  },
] as const

function KeyFeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <article className="flex flex-col feature-card rounded-[1.5rem] p-5 md:p-6">
      <Icon className="h-8 w-8 text-type-accent" strokeWidth={1.85} />
      <FeatureCardTitle className="mt-5">{title}</FeatureCardTitle>
      <FeatureCardDescription className="mt-3 max-w-[22rem]">{description}</FeatureCardDescription>
    </article>
  )
}

export async function generateMetadata({ params }: LocaleParamsProps) {
  const locale = await resolveLocaleParam(params)
  return createPageMetadata(locale, "lend", "/lend", {
    keywords: [
      "LP-backed credit","DeFi lending","stablecoin yield","Aave v4","onchain yield","supply markets",
    ],
  })
}

export default async function LendPage({ params }: LocaleParamsProps) {
  const locale = await resolveLocaleParam(params)
  return (
    <LocalizedMarketing locale={locale} keys={["lend/page", "invest-apy-section", "invest-growth-calculator-section", "platform-tools-showcase-section", "trade-market-showcase", "InlineFaqSection", "homepage/HomepageNewsroomSection"]}>
    <div className="bg-white">
      <FeaturePageHero
        title="Earn interest on your assets"
        description="Supply single assets and earn yields where LP collateral creates real borrow utilization."
        imageSrc="/images/Avana Lend Hero.png"
        imageAlt="Avana Lend product interface"
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
          href="/developers/architecture/lend-spoke"
          className="inline-flex items-center justify-center rounded-full border border-border bg-white px-4 py-2 text-xs text-foreground transition-colors hover:bg-muted"
        >
          View Docs
        </Link>
      </FeaturePageHero>

      <section className="border-t border-border/80 bg-white site-section-gap">
        <div className="site-content-shell">
          <div className="flex flex-col gap-3">
            <SectionIntro eyebrow="Start earning in three steps" eyebrowTone="emerald" title="Choose a market, supply an asset, and collect interest." />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
            <div className="feature-card rounded-2xl p-6 md:p-8">
              <span className="type-step-index">1</span>
              <FeatureCardTitle className="mt-6">Pick a market</FeatureCardTitle>
              <FeatureCardDescription className="mt-3">
                Browse lending markets like GHO, USDC, USDT, ETH, and WBTC while tracking APY, utilization, and borrower demand.
              </FeatureCardDescription>
            </div>

            <div className="feature-card rounded-2xl p-6 md:p-8">
              <span className="type-step-index">2</span>
              <FeatureCardTitle className="mt-6">Supply assets</FeatureCardTitle>
              <FeatureCardDescription className="mt-3">
                Connect your wallet, approve the asset, and supply so your funds enter the pool and start earning right away.
              </FeatureCardDescription>
            </div>

            <div className="feature-card rounded-2xl p-6 md:p-8">
              <span className="type-step-index">3</span>
              <FeatureCardTitle className="mt-6">Earn and withdraw</FeatureCardTitle>
              <FeatureCardDescription className="mt-3">
                Interest accrues continuously. Withdraw principal and interest when the market has sufficient liquidity.
              </FeatureCardDescription>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <DeferredTradeMarketShowcase />
      </section>

      <section className="relative z-10 site-section-gap">
        <div className="site-content-shell">
          <div className="mb-8 max-w-[600px] space-y-3 md:mb-10">
            <SectionIntro
              eyebrow="Keep control of your capital"
              eyebrowTone="emerald"
              title="Add to your deposits or withdraw when market liquidity allows."
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {keyFeatureCards.map((card) => (
              <KeyFeatureCard
                key={card.title}
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </section>

      <InvestApySection />

      <div className="site-content-shell flex flex-col">
        <div className="flex-1 flex flex-col relative z-0">
        {/* Rest of page content */}
        <div className="site-content-width flex flex-col site-section-stack site-section-gap pb-16 md:pb-20 2xl:pb-18">
          <InvestGrowthCalculatorSection />

          <PlatformToolsShowcaseSection locale={locale} />

          <HomepageNewsroomSection locale={locale} collection="invest" eyebrowTone="emerald" />

          <div className="pb-16 md:pb-24 2xl:pb-22">
            <InlineFaqSection title="Frequently asked questions" items={stableSpokeFaqItems} eyebrowTone="emerald" withTopBorder={false} />
          </div>
        </div>
      </div>
      </div>
    </div>
  </LocalizedMarketing>
)
}
