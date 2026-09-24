import { createPageMetadata } from "@/lib/i18n/page-metadata"
import { Link } from "@/i18n/navigation"
import { FeaturePageHero } from "@/components/feature-page-hero"
import type { LucideIcon } from "lucide-react"
import {
  Activity,
  BadgePercent,
  Layers,
  MousePointerClick,
  TrendingUp,
  Undo2,
} from "lucide-react"
import { InlineFaqSection, type InlineFaqItem } from "@/components/InlineFaqSection"
import LeverageGlanceShowcaseSection from "@/components/leverage-glance-showcase-section"
import HomepageNewsroomSection from "@/components/homepage/HomepageNewsroomSection"
import HomepageTestimonialSection from "@/components/homepage/HomepageTestimonialSection"
import { FeatureCardDescription, FeatureCardTitle, SectionIntro } from "@/components/shared"
import { MarketingLeadHeader } from "@/components/marketing-lead-header"
import { LocalizedMarketing } from "@/components/localized-marketing"
import { resolveLocaleParam, type LocaleParamsProps } from "@/lib/i18n/locale-params"

const loopingBenefits: {
  title: string
  description: string
  icon: LucideIcon
}[] = [
  {
    title: "Grow exposure faster",
    description:
      "Turn a smaller deposit into larger exposure without parking more capital up front.",
    icon: TrendingUp,
  },
  {
    title: "Account for borrowing costs",
    description:
      "Reinvestment adds interest-bearing debt. Borrowing costs reduce the net return from the larger position.",
    icon: BadgePercent,
  },
  {
    title: "Skip the busywork",
    description:
      "Avana opens the full loop so you can skip manual borrow, swap, and redeposit steps.",
    icon: MousePointerClick,
  },
  {
    title: "Set your own multiple",
    description:
      "Pick how aggressive the loop should be and stop where risk still feels right for you.",
    icon: Layers,
  },
  {
    title: "Leave room for market moves",
    description:
      "Higher leverage increases sensitivity to price changes and leaves less room before liquidation.",
    icon: Activity,
  },
  {
    title: "Exit when you want",
    description:
      "Scale down, repay, or close anytime instead of staying locked into a rigid term loan.",
    icon: Undo2,
  },
]

const leverageWorkflowSteps = [
  {
    title: "Pick a market",
    description:
      "Choose your multiply market while watching loop APY and the liquidation threshold for that setup.",
  },
  {
    title: "Set leverage",
    description:
      "Deposit a supported LP position, then set your target exposure and multiplier for that market.",
  },
  {
    title: "Open the loop",
    description: "Avana handles the borrow, swap, and redeposit sequence to establish your chosen exposure.",
  },
] as const

const leverageFaqItems: InlineFaqItem[] = [
  {
    value: "leverage-1",
    question: "What is Avana Leverage Market?",
    answer:
      "Avana Leverage Market lets users deposit supported AMM LP positions as collateral, borrow against them, and open managed leverage or perps exposure from the same position.",
  },
  {
    value: "leverage-2",
    question: "Do I still keep my LP collateral?",
    answer:
      "Yes. Your LP position remains the core collateral of the account until you repay debt and withdraw it, so you do not need to fully exit liquidity to open leverage.",
  },
  {
    value: "leverage-3",
    question: "Is this just normal token borrowing?",
    answer:
      "No. Avana supports simple borrowing, but leverage mode adds an abstracted path where borrowed capital is automatically deployed into managed leverage or perps exposure.",
  },
  {
    value: "leverage-4",
    question: "Where does the liquidity come from?",
    answer:
      "The borrowing layer is designed around Aave v4 style infrastructure. Avana focuses on LP specific underwriting, execution, monitoring, and position management on top.",
  },
  {
    value: "leverage-5",
    question: "Can I close the leverage without withdrawing my LP?",
    answer:
      "Yes. You can unwind the leverage position, reduce or repay debt, and continue holding the LP as collateral if you want to keep the base position active.",
  },
  {
    value: "leverage-6",
    question: "What happens if the position becomes unsafe?",
    answer:
      "Avana monitors the full position and can unwind leverage or liquidate collateral if needed to ensure the underlying debt remains covered.",
  },
  {
    value: "leverage-7",
    question: "Is leverage available for every LP?",
    answer:
      "No. Only supported LP types with reliable valuation logic, risk parameters, and unwind assumptions should be enabled for leverage mode.",
  },
] as const

export async function generateMetadata({ params }: LocaleParamsProps) {
  const locale = await resolveLocaleParam(params)
  return createPageMetadata(locale, "multiply", "/multiply", {
    keywords: ["LP leverage","AMM leverage","DeFi leverage","DeFi perps","LP perps","LP collateral","Aave v4"],
  })
}

export default async function MultiplyPage({ params }: LocaleParamsProps) {
  const locale = await resolveLocaleParam(params)
  return (
    <LocalizedMarketing locale={locale} keys={["multiply/multiply-content", "leverage-glance-showcase-section", "homepage/HomepageTestimonialSection", "InlineFaqSection"]}>
    <div className="bg-white">
      <FeaturePageHero
        title={
          <>
            <span>Amplify yield</span>
            <br />
            <span>under control</span>
          </>
        }
        description="Borrow, reinvest, and repeat through managed strategies designed to increase your market exposure."
        imageSrc="/images/Avana Multiply Hero.png"
        imageAlt="Avana leverage market interface"
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
          href="/developers/introduction"
          className="inline-flex items-center justify-center rounded-full border border-border bg-white px-4 py-2 text-xs text-foreground transition-colors hover:bg-muted"
        >
          View Docs
        </Link>
      </FeaturePageHero>

      <section className="border-t border-border/80 bg-white site-section-gap">
        <div className="site-content-shell">
          <div className="flex flex-col gap-6">
            <div className="flex max-w-[600px] flex-col gap-2">
              <SectionIntro
                eyebrow="Build your first loop in three steps"
                eyebrowTone="rose"
                title="Choose a market, set your leverage, and let Avana handle the borrow-and-reinvest sequence."
              />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
            {leverageWorkflowSteps.map((step, index) => (
              <article key={step.title} className="feature-card rounded-2xl p-6 md:p-8">
                <span className="type-step-index">
                  {index + 1}
                </span>
                <FeatureCardTitle className="mt-6">{step.title}</FeatureCardTitle>
                <FeatureCardDescription className="mt-3">
                  {step.description}
                </FeatureCardDescription>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white site-section-gap">
        <div className="site-content-shell">
          <LeverageGlanceShowcaseSection locale={locale} />
        </div>
      </section>

      <section className="bg-white site-section-gap">
        <div className="site-content-shell">
          <div className="mx-auto w-full max-w-[76rem]">
            <MarketingLeadHeader
              className="max-w-none [&_.type-md-lg]:text-wrap!"
              title="See what each reinvestment adds"
              subtitle="Borrowed funds build a larger position, increasing both potential returns and losses."
            />

            <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-12 md:mt-16 md:gap-x-16 md:gap-y-14 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-20">
              {loopingBenefits.map((feature) => (
                <article
                  key={feature.title}
                  className="flex flex-col bg-transparent"
                >
                  <feature.icon className="h-11 w-11 text-type-accent" strokeWidth={1.5} aria-hidden="true" />
                  <FeatureCardTitle className="mt-5">{feature.title}</FeatureCardTitle>
                  <FeatureCardDescription className="mt-2 max-w-[22rem]">
                    {feature.description}
                  </FeatureCardDescription>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white site-section-gap">
        <div className="site-content-shell">
          <div className="mx-auto w-full max-w-[76rem]">
            <HomepageTestimonialSection />
          </div>
        </div>
      </section>

      <div className="site-content-shell flex flex-col">
        <div className="relative z-0 flex flex-1 flex-col">
          <div className="site-content-width flex flex-col site-section-stack site-section-gap pb-16 md:pb-20 2xl:pb-18">
            <HomepageNewsroomSection
              locale={locale}
              collection="leverage"
              eyebrowTone="rose"
            />

            <div className="pb-16 md:pb-24 2xl:pb-22">
              <InlineFaqSection
                title="Frequently asked questions"
                items={leverageFaqItems}
                eyebrowTone="rose"
                withTopBorder={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </LocalizedMarketing>
)
}
