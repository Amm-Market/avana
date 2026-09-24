import Image from "next/image"
import dynamic from "next/dynamic"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { LazySection } from "@/components/ui/lazy-section"
import type { LucideIcon } from "lucide-react"
import {
  ArrowLeftRight,
  BriefcaseBusiness,
  Building2,
  Globe2,
  HandCoins,
  Landmark,
  Layers,
  PiggyBank,
  Repeat2,
  TrendingUp,
  Zap,
} from "lucide-react"
import HomepageNewsroomSection from "@/components/homepage/HomepageNewsroomSection"
import { MarketingLeadHeader } from "@/components/marketing-lead-header"
import { DeferredAskAiShowcase } from "@/components/homepage/deferred-ask-ai-showcase"
import { homepagePools, type HomepagePool } from "@/data/homepage"
import { PerformanceDiv } from "@/components/ui/performance-section"
import { TokenLogo } from "@/components/token-logo"
import type { AppLocale } from "@/i18n/locales"
import { withMarketingI18n } from "@/lib/content-i18n/with-marketing-i18n"
import { FaqToggleIcons } from "@/components/faq-toggle-icons"

const HomepageFaqSection = dynamic(() => import("@/components/homepage/HomepageFaqSection"), {
  loading: () => <div className="min-h-[24rem]" aria-hidden="true" />,
})

function repeatItems<T>(items: T[], count: number, offset: number) {
  if (items.length === 0) return []

  const output: T[] = []
  for (let i = 0; i < count; i += 1) {
    output.push(items[(offset + i) % items.length])
  }
  return output
}

/**
 * HeroSection - Homepage secondary content shell.
 */
const hubColors: Record<HomepagePool["hub"], string> = {
  "Stable LP Hub": "#10b981",
  "Correlated LP Hub": "#3b82f6",
  "Volatile LP Hub": "#f59e0b",
}

function PoolCard({ pool }: { pool: HomepagePool }) {
  return (
    <div className="flex h-[58px] flex-shrink-0 items-center gap-2.5 rounded-full border border-border bg-card px-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.03)]">
      <div className="relative flex items-center shrink-0">
        <TokenLogo symbol={pool.token0.symbol} className="z-10" />
        <TokenLogo symbol={pool.token1.symbol} className="-ml-2" />
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-1.5 whitespace-nowrap">
          <span className="text-[0.88rem] tracking-[-0.02em] text-foreground">
            {pool.token0.symbol} / {pool.token1.symbol}
          </span>
          <span className="text-[0.8rem] text-type-tertiary">{pool.dex}</span>
        </div>
        <div className="mt-0.5 flex items-center gap-1.5 whitespace-nowrap">
          <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: hubColors[pool.hub] }} />
          <span className="text-[0.76rem] text-type-secondary">{pool.hub}</span>
        </div>
      </div>
    </div>
  )
}

const lpUseCases: {
  title: string
  description: string
  icon: LucideIcon
}[] = [
  {
    title: "Treasury financing",
    description:
      "Unlock cash against LP positions to fund runway without selling liquidity or giving up fee flow.",
    icon: Building2,
  },
  {
    title: "Grow exposure",
    description:
      "Borrow against existing positions, add liquidity, and expand fee exposure from the same capital base.",
    icon: Layers,
  },
  {
    title: "Trading liquidity",
    description:
      "Use LP-backed credit to rebalance inventory, hedge risk, or move quickly when a trade needs capital.",
    icon: ArrowLeftRight,
  },
  {
    title: "Cross-ecosystem credit",
    description:
      "Keep LP collateral in one venue and borrow for use across other protocols, strategies, or chains.",
    icon: Globe2,
  },
  {
    title: "Ops runway",
    description:
      "Cover payroll, vendors, and launches with LP credit without touching core positions or reserves.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Move on short notice",
    description:
      "Borrow when timing matters, then redeploy capital as opportunities open across the broader market.",
    icon: Zap,
  },
  {
    title: "Preserve fee income",
    description:
      "Access working capital while the underlying position stays deployed and continues earning trading fees.",
    icon: PiggyBank,
  },
  {
    title: "Avoid forced LP exits",
    description:
      "Meet near-term capital needs without unwinding liquidity, realizing losses, or disrupting a market.",
    icon: Landmark,
  },
  {
    title: "Compound LP returns",
    description:
      "Borrow against an active position and redeploy into new liquidity when expected returns justify the added risk.",
    icon: TrendingUp,
  },
  {
    title: "Rotate between markets",
    description:
      "Finance a new pool before exiting an existing one, keeping capital productive through a market transition.",
    icon: Repeat2,
  },
  {
    title: "Bootstrap protocol liquidity",
    description:
      "Use protocol-owned LP positions to fund incentives, integrations, and expansion without selling treasury assets.",
    icon: HandCoins,
  },
  {
    title: "Fund market making",
    description:
      "Turn long-term LP inventory into credit for quoting, hedging, and maintaining depth across active venues.",
    icon: Layers,
  },
]

const positionSafetyItems = [
  {
    number: "01",
    title: "Enterprise-grade security and vaults",
    description:
      "Collateral is protected in non-custodial smart-contract vaults, with access controls and protocol-enforced rules governing deposits, withdrawals, borrowing, and liquidation.",
  },
  {
    number: "02",
    title: "Contain risk at the market level",
    description:
      "Each market runs through an isolated Aave v4 Spoke with its own collateral rules, exposure limits, and emergency controls, preventing risk in one market from spreading across the system.",
  },
  {
    number: "03",
    title: "Verify every price twice",
    description:
      "Chainlink feeds and AMM TWAP pricing must agree within tolerance before a loan action can execute, blocking manipulated, distorted, or unreliable price data from entering the system.",
  },
  {
    number: "04",
    title: "Enforce collateral at execution",
    description:
      "Borrow limits and health checks are enforced before every action, keeping debt below verified collateral value and stopping positions from increasing risk after their safety margin is breached.",
  },
  {
    number: "05",
    title: "Liquidate only what is necessary",
    description:
      "When a position becomes unsafe, Avana targets the amount required to cover debt and restore health, then returns any remaining collateral value to the borrower.",
  },
] as const

export default async function HeroSection({ locale }: { locale: AppLocale }) {
  return withMarketingI18n(
    locale,
    [
      "hero-section",
      "ask-ai-showcase",
      "homepage/HomepageFaqSection",
      "homepage/HomepageNewsroomSection",
    ],
    HeroSectionBody(locale),
  )
}

function HeroSectionBody(locale: AppLocale) {
  return (
    <section className="pb-0">
      <div className="site-content-shell site-section-gap">
        <PerformanceDiv className="flex flex-col gap-8 md:gap-12">
            <div className="flex flex-col gap-6">
          <div className="flex max-w-[600px] flex-col gap-2">
            <MarketingLeadHeader
              title="Access loans across hundreds of pools"
              subtitle="Keep earning trading fees while drawing credit against your LP."
            />
          </div>
            </div>

            <LazySection defer minHeight="296px" rootMargin="600px" className="w-full space-y-2 overflow-hidden py-5 [mask-image:linear-gradient(to_right,transparent_0%,black_11%,black_89%,transparent_100%)]">
              {[
                // Frozen mid-scroll: no animation, just staggered offsets so each
                // row sits differently — some cards fully in, some half-out.
                { items: repeatItems(homepagePools, 8, 0), offset: "-1.5rem" },
                { items: repeatItems(homepagePools, 8, 6), offset: "-9rem" },
                { items: repeatItems(homepagePools, 8, 12), offset: "-5rem" },
                { items: repeatItems(homepagePools, 8, 18), offset: "-13rem" },
              ].map((row, rowIndex) => (
                <div key={rowIndex} className="overflow-hidden">
                  <div
                    className="flex w-max items-center gap-3"
                    style={{ transform: `translateX(${row.offset})` }}
                  >
                    {row.items.map((pool, index) => (
                      <PoolCard key={`row-${rowIndex}-${index}-a`} pool={pool} />
                    ))}
                    {row.items.map((pool, index) => (
                      <PoolCard key={`row-${rowIndex}-${index}-b`} pool={pool} />
                    ))}
                  </div>
                </div>
              ))}
            </LazySection>

        </PerformanceDiv>
      </div>

      <div className="site-content-shell site-section-gap flex flex-col site-section-stack">
        <div id="multiply-markets" className="w-full">
          <PerformanceDiv>
            <MarketingLeadHeader
              className="mb-6 sm:mb-8"
              title="Supply capital to LP-backed borrowers"
              subtitle="Earn interest as demand grows across active pools."
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 items-stretch">
              {/* Card 01 — Supply into active markets */}
              <div className="h-full">
                <div className="card flex h-full grow-1 flex-col">
                  <div className="type-base max-w-prose flex grow flex-col">
                    <div>
                      <h2>Supply into active markets</h2>
                      <div className="text-pretty">
                        Place capital where LP-backed borrowers are drawing credit and earning yield.
                      </div>
                    </div>
                  </div>
                  <figure className="pt-g1.75 mt-auto">
                    <div
                      className="media-border-container relative grid grid-cols-1 grid-rows-1"
                      style={
                        {
                          "--layered-media-bg-light": "#FFFFFF",
                          "--layered-media-bg-dark": "#383026",
                          height: "320px",
                        } as React.CSSProperties
                      }
                    >
                      <div
                        className="media-light absolute inset-0 z-0"
                        style={{ backgroundColor: "#fff" }}
                      />
                      <div className="z-20 col-span-full row-span-full h-full min-h-0">
                        <div className="flex h-full w-full items-center justify-center p-4 sm:p-5">
                          <div className="relative mx-auto w-full max-w-[240px] aspect-[240/200]" aria-hidden="true">
                            {/* Connector */}
                            <svg
                              viewBox="0 0 240 200"
                              className="pointer-events-none absolute inset-0 h-full w-full"
                              fill="none"
                            >
                              <path
                                d="M46 82 V147 H67"
                                stroke="#01AACF"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <circle cx="46" cy="82" r="3.5" fill="#01AACF" />
                              <circle cx="67" cy="147" r="3.5" fill="#01AACF" />
                            </svg>

                            {/* Net APY chip (top-right) */}
                            <div
                              className="absolute rounded-lg border border-border/70 bg-card/95 px-2 py-1"
                              style={{ left: "73%", top: "9%", width: "25%" }}
                            >
                              <span className="block text-[7px] font-medium uppercase text-muted-foreground">Net APY</span>
                              <div className="h-3.5 overflow-hidden">
                                <div className="ce-amt">
                                  <span className="flex h-3.5 items-center text-[11px] font-semibold text-type-accent">9.2%</span>
                                  <span className="flex h-3.5 items-center text-[11px] font-semibold text-type-accent">13.5%</span>
                                  <span className="flex h-3.5 items-center text-[11px] font-semibold text-type-accent">18.1%</span>
                                  <span className="flex h-3.5 items-center text-[11px] font-semibold text-type-accent">9.2%</span>
                                </div>
                              </div>
                            </div>

                            {/* Utilization chip (bottom-left) */}
                            <div
                              className="absolute rounded-lg border border-border/70 bg-card/95 px-2 py-1"
                              style={{ left: "0%", top: "76%", width: "27%" }}
                            >
                              <span className="block text-[7px] font-medium uppercase text-muted-foreground">Utilization</span>
                              <div className="h-3.5 overflow-hidden">
                                <div className="ce-amt">
                                  <span className="flex h-3.5 items-center text-[11px] font-semibold text-foreground">42%</span>
                                  <span className="flex h-3.5 items-center text-[11px] font-semibold text-foreground">58%</span>
                                  <span className="flex h-3.5 items-center text-[11px] font-semibold text-foreground">71%</span>
                                  <span className="flex h-3.5 items-center text-[11px] font-semibold text-foreground">42%</span>
                                </div>
                              </div>
                            </div>

                            {/* Supply card */}
                            <div
                              className="absolute rounded-2xl bg-card px-3 py-2.5 ring-1 ring-[#01AACF]/30"
                              style={{ left: "2%", top: "8%", width: "70%", height: "33%" }}
                            >
                              <span className="block text-[10px] font-medium text-muted-foreground">Supply</span>
                              <div className="mt-1 flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <TokenLogo symbol="wstETH" className="h-5 w-5" />
                                  <span className="text-[13px] font-semibold text-foreground">wstETH</span>
                                </div>
                                <div className="h-5 overflow-hidden">
                                  <div className="ce-amt">
                                    <span className="flex h-5 items-center justify-end text-[14px] font-semibold tabular-nums text-foreground">$8,000</span>
                                    <span className="flex h-5 items-center justify-end text-[14px] font-semibold tabular-nums text-foreground">$10,000</span>
                                    <span className="flex h-5 items-center justify-end text-[14px] font-semibold tabular-nums text-foreground">$12,000</span>
                                    <span className="flex h-5 items-center justify-end text-[14px] font-semibold tabular-nums text-foreground">$8,000</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Borrower demand card */}
                            <div
                              className="absolute rounded-2xl bg-card px-3 py-2.5 ring-1 ring-[#01AACF]/30"
                              style={{ left: "28%", top: "57%", width: "70%", height: "33%" }}
                            >
                              <span className="block text-[10px] font-medium text-muted-foreground">Borrowed</span>
                              <div className="mt-1 flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <TokenLogo symbol="USDC" className="h-5 w-5" />
                                  <span className="text-[13px] font-semibold text-foreground">USDC</span>
                                </div>
                                <div className="h-5 overflow-hidden">
                                  <div className="ce-amt">
                                    <span className="flex h-5 items-center justify-end text-[14px] font-semibold tabular-nums text-foreground">$6,000</span>
                                    <span className="flex h-5 items-center justify-end text-[14px] font-semibold tabular-nums text-foreground">$7,500</span>
                                    <span className="flex h-5 items-center justify-end text-[14px] font-semibold tabular-nums text-foreground">$9,000</span>
                                    <span className="flex h-5 items-center justify-end text-[14px] font-semibold tabular-nums text-foreground">$6,000</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </figure>
                </div>
              </div>

              {/* Card 02 — Compare utilization by pool */}
              <div className="h-full">
                <div className="card flex h-full grow-1 flex-col">
                  <div className="type-base max-w-prose flex grow flex-col">
                    <div>
                      <h2>Compare utilization by pool</h2>
                      <div className="text-pretty">
                        Review depth, volatility, and oracle quality before choosing where to supply.
                      </div>
                    </div>
                  </div>
                  <figure className="pt-g1.75 mt-auto">
                    <div
                      className="media-border-container relative grid grid-cols-1 grid-rows-1"
                      style={
                        {
                          "--layered-media-bg-light": "#FFFFFF",
                          "--layered-media-bg-dark": "#25342D",
                          height: "320px",
                        } as React.CSSProperties
                      }
                    >
                      <div
                        className="media-light absolute inset-0 z-0"
                        style={{ backgroundColor: "#fff" }}
                      />
                      <div className="z-20 col-span-full row-span-full h-full min-h-0">
                        <div className="flex h-full w-full items-center justify-center p-4 sm:p-5">
                          <div className="w-full max-w-[240px] sm:max-w-[260px]">
                            <div className="h-[216px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)]">
                              <div className="ce-ticker-risk">
                                {[
                                  {
                                    pair: "ETH / USDC",
                                    badge: "Low risk",
                                    badgeBg: "bg-emerald-50",
                                    badgeText: "text-emerald-700",
                                    badgeBorder: "border-emerald-200",
                                    metrics: [
                                      { label: "Pool depth", value: "Deep", level: 90, color: "#10b981" },
                                      { label: "Volatility", value: "Low", level: 25, color: "#6ee7b7" },
                                      { label: "Oracle quality", value: "98 / 100", level: 98, color: "#6366f1" },
                                    ],
                                  },
                                  {
                                    pair: "WBTC / ETH",
                                    badge: "Watch",
                                    badgeBg: "bg-amber-50",
                                    badgeText: "text-amber-700",
                                    badgeBorder: "border-amber-200",
                                    metrics: [
                                      { label: "Pool depth", value: "Medium", level: 60, color: "#f59e0b" },
                                      { label: "Volatility", value: "Med", level: 50, color: "#fb923c" },
                                      { label: "Oracle quality", value: "95 / 100", level: 95, color: "#6366f1" },
                                    ],
                                  },
                                  {
                                    pair: "ARB / USDC",
                                    badge: "Elevated",
                                    badgeBg: "bg-rose-50",
                                    badgeText: "text-rose-700",
                                    badgeBorder: "border-rose-200",
                                    metrics: [
                                      { label: "Pool depth", value: "Shallow", level: 35, color: "#f43f5e" },
                                      { label: "Volatility", value: "High", level: 78, color: "#ef4444" },
                                      { label: "Oracle quality", value: "88 / 100", level: 88, color: "#6366f1" },
                                    ],
                                  },
                                  {
                                    pair: "ETH / USDC",
                                    badge: "Low risk",
                                    badgeBg: "bg-emerald-50",
                                    badgeText: "text-emerald-700",
                                    badgeBorder: "border-emerald-200",
                                    metrics: [
                                      { label: "Pool depth", value: "Deep", level: 90, color: "#10b981" },
                                      { label: "Volatility", value: "Low", level: 25, color: "#6ee7b7" },
                                      { label: "Oracle quality", value: "98 / 100", level: 98, color: "#6366f1" },
                                    ],
                                  },
                                ].map((item, i) => (
                                  <div key={i} className="flex h-[216px] items-center">
                                    <div className="w-full">
                                      <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                          <div className="relative flex shrink-0 items-center">
                                            <TokenLogo symbol={item.pair.split(" / ")[0]} className="h-6 w-6 ring-2 ring-[#fff]" />
                                            <TokenLogo symbol={item.pair.split(" / ")[1]} className="-ml-2 h-6 w-6 ring-2 ring-[#fff]" />
                                          </div>
                                          <span className="text-[15px] font-semibold text-foreground">{item.pair}</span>
                                        </div>
                                        <span className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${item.badgeBg} ${item.badgeText} ${item.badgeBorder}`}>
                                          {item.badge}
                                        </span>
                                      </div>
                                      <div className="mt-4 space-y-2.5">
                                        {item.metrics.map((metric) => (
                                          <div key={metric.label}>
                                            <div className="flex items-center justify-between">
                                              <span className="text-[12px] font-medium text-muted-foreground">{metric.label}</span>
                                              <span className="text-[13px] font-semibold text-foreground">{metric.value}</span>
                                            </div>
                                            <div className="mt-1.5 h-[6px] w-full overflow-hidden rounded-full bg-muted">
                                              <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${metric.level}%`, backgroundColor: metric.color }} />
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="mt-4 flex items-center gap-2 text-[11px] font-medium text-success">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                        Supply available
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </figure>
                </div>
              </div>

              {/* Card 03 — Set a risk-aware range */}
              <div className="h-full">
                <div className="card flex h-full grow-1 flex-col">
                  <div className="type-base max-w-prose flex grow flex-col">
                    <div>
                      <h2>Set a risk-aware range</h2>
                      <div className="text-pretty">
                        Use pool volatility and liquidity buffers to decide how much capital to allocate.
                      </div>
                    </div>
                  </div>
                  <figure className="pt-g1.75 mt-auto">
                    <div
                      className="media-border-container relative grid grid-cols-1 grid-rows-1"
                      style={
                        {
                          "--layered-media-bg-light": "#FFFFFF",
                          "--layered-media-bg-dark": "#28303B",
                          height: "320px",
                        } as React.CSSProperties
                      }
                    >
                      <div
                        className="media-light absolute inset-0 z-0"
                        style={{ backgroundColor: "#fff" }}
                      />
                      <div className="z-20 col-span-full row-span-full h-full min-h-0">
                        <div className="flex h-full w-full items-center justify-center p-3 sm:p-4">
                          <div className="w-full max-w-[240px] sm:max-w-[260px]">
                            <div className="px-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[9px] font-medium uppercase tracking-[0.1em] text-muted-foreground">Range</span>
                                <span className="shrink-0 rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[9px] font-semibold text-foreground">
                                  Peg
                                </span>
                              </div>
                              <div className="relative mt-3 h-[4.75rem] overflow-hidden rounded-lg border border-border/50 bg-muted/40">
                                <div className="absolute left-2.5 right-2.5 top-2.5 border-t border-dashed border-muted-foreground/40" />
                                <div className="absolute bottom-2.5 left-2.5 right-2.5 border-b border-dashed border-muted-foreground/40" />
                                <p className="absolute left-2 top-1 text-[8px] font-bold text-rose-500">↑</p>
                                <p className="absolute bottom-1 left-2 text-[8px] font-bold text-rose-500">↓</p>
                                <div className="absolute inset-x-8 inset-y-5 z-0 rounded-md border border-border bg-background shadow-xs" />
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="ce-range-dot h-4 w-4 rounded-full border-2 border-primary bg-background shadow-xs" />
                              </div>
                              </div>
                              <div className="mt-3 grid grid-cols-2 gap-2">
                                <div className="rounded-lg border border-border/80 bg-muted/40 px-2.5 py-1.5 text-center">
                                  <span className="block text-[8px] font-medium text-muted-foreground">30d vol</span>
                                  <span className="text-[11px] font-semibold text-foreground">3.2%</span>
                                </div>
                                <div className="rounded-lg border border-border/80 bg-muted/40 px-2.5 py-1.5 text-center">
                                  <span className="block text-[8px] font-medium text-muted-foreground">Buffer</span>
                                  <span className="text-[11px] font-semibold text-foreground">18%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </figure>
                </div>
              </div>

              {/* Card 04 — Monitor supplied liquidity */}
              <div className="h-full">
                <div className="card flex h-full grow-1 flex-col">
                  <div className="type-base max-w-prose flex grow flex-col">
                    <div>
                      <h2>Monitor supplied liquidity</h2>
                      <div className="text-pretty">
                        Track utilization, available liquidity, and pool limits as your position earns interest.
                      </div>
                    </div>
                  </div>
                  <figure className="pt-g1.75 mt-auto">
                    <div
                      className="media-border-container relative grid grid-cols-1 grid-rows-1"
                      style={
                        {
                          "--layered-media-bg-light": "#FFFFFF",
                          "--layered-media-bg-dark": "#34302C",
                          height: "320px",
                        } as React.CSSProperties
                      }
                    >
                      <div
                        className="media-light absolute inset-0 z-0"
                        style={{ backgroundColor: "#fff" }}
                      />
                      <div className="z-20 col-span-full row-span-full h-full min-h-0">
                        <div className="flex h-full w-full items-center justify-center p-3 sm:p-4">
                          <div className="w-full max-w-[240px] sm:max-w-[260px]">
                            <div className="px-1">
                              <div className="flex items-center justify-end">
                                <div className="flex items-center gap-1.5">
                                  <div className="ce-state h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                  <div className="ce-state h-1.5 w-1.5 rounded-full bg-emerald-500/60" />
                                  <div className="ce-state h-1.5 w-1.5 rounded-full bg-emerald-500/30" />
                                </div>
                              </div>
                              <div className="mt-3 flex items-end justify-between gap-2">
                                <div>
                                  <span className="block text-[9px] font-medium uppercase tracking-[0.08em] text-muted-foreground">Utilization</span>
                                  <div className="mt-1 h-[2.2rem] overflow-hidden">
                                    <div className="ce-amt">
                                      <p className="flex h-[2.2rem] items-center text-[2.2rem] font-semibold leading-none tracking-[-0.05em] text-success">1.82</p>
                                      <p className="flex h-[2.2rem] items-center text-[2.2rem] font-semibold leading-none tracking-[-0.05em] text-amber-500">1.34</p>
                                      <p className="flex h-[2.2rem] items-center text-[2.2rem] font-semibold leading-none tracking-[-0.05em] text-red-500">1.06</p>
                                      <p className="flex h-[2.2rem] items-center text-[2.2rem] font-semibold leading-none tracking-[-0.05em] text-success">1.82</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex h-[48px] items-end gap-1.5 rounded-lg border border-border bg-muted/40 px-2.5 py-1.5">
                                  <div className="ce-eq ce-eq-1 h-5 w-1.5 rounded-full bg-emerald-500/40" />
                                  <div className="ce-eq ce-eq-2 h-7 w-1.5 rounded-full bg-emerald-500/70" />
                                  <div className="ce-eq ce-eq-3 h-9 w-1.5 rounded-full bg-emerald-500" />
                                </div>
                              </div>
                              <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <div className="relative flex shrink-0 items-center">
                                    <TokenLogo symbol="ETH" className="h-4 w-4 ring-2 ring-card" />
                                    <TokenLogo symbol="USDC" className="-ml-1.5 h-4 w-4 ring-2 ring-card" />
                                  </div>
                                  <span className="text-[10px] font-semibold text-foreground">ETH / USDC</span>
                                </div>
                                <div className="h-3.5 overflow-hidden">
                                  <div className="ce-amt">
                                    <span className="flex h-3.5 items-center justify-end text-[10px] font-medium tabular-nums text-muted-foreground">45%</span>
                                    <span className="flex h-3.5 items-center justify-end text-[10px] font-medium tabular-nums text-muted-foreground">68%</span>
                                    <span className="flex h-3.5 items-center justify-end text-[10px] font-medium tabular-nums text-muted-foreground">88%</span>
                                    <span className="flex h-3.5 items-center justify-end text-[10px] font-medium tabular-nums text-muted-foreground">45%</span>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                                <div className="ce-health-bar h-full w-[45%] rounded-full bg-emerald-500" />
                              </div>
                              <div className="mt-2.5 flex items-center justify-between">
                                <span className="text-[9px] text-muted-foreground">Available liquidity</span>
                                <span className="text-[10px] font-semibold text-foreground">$2.4M</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </figure>
                </div>
              </div>
            </div>

            <style>{`
              .ce-ticker-risk {
                animation: ce-tr 16s cubic-bezier(0.76, 0, 0.24, 1) infinite;
              }
              @keyframes ce-tr {
                0%, 22% { transform: translateY(0); }
                28%, 50% { transform: translateY(-25%); }
                56%, 78% { transform: translateY(-50%); }
                84%, 100% { transform: translateY(-75%); }
              }
              .ce-range-dot {
                animation: ce-dot 4.5s ease-in-out infinite;
              }
              @keyframes ce-dot {
                0%, 100% { transform: translateY(-13px); }
                50% { transform: translateY(13px); }
              }
              .ce-eq {
                transform-origin: bottom;
                animation: ce-eq 1.6s ease-in-out infinite, ce-state 10.4s cubic-bezier(0.76, 0, 0.24, 1) infinite;
              }
              .ce-eq-2 { animation-delay: 0.2s; }
              .ce-eq-3 { animation-delay: 0.4s; }
              @keyframes ce-eq {
                0%, 100% { transform: scaleY(0.55); }
                50% { transform: scaleY(1); }
              }
              .ce-state {
                animation: ce-state 10.4s cubic-bezier(0.76, 0, 0.24, 1) infinite;
              }
              @keyframes ce-state {
                0%, 20% { background-color: #10b981; }
                25%, 45% { background-color: #f59e0b; }
                50%, 70% { background-color: #ef4444; }
                75%, 100% { background-color: #10b981; }
              }
              .ce-health-bar {
                animation: ce-health-bar 10.4s cubic-bezier(0.76, 0, 0.24, 1) infinite;
              }
              @keyframes ce-health-bar {
                0%, 20% { width: 45%; background-color: #10b981; }
                25%, 45% { width: 68%; background-color: #f59e0b; }
                50%, 70% { width: 88%; background-color: #ef4444; }
                75%, 100% { width: 45%; background-color: #10b981; }
              }
              .ce-amt {
                animation: ce-amt 10.4s cubic-bezier(0.76, 0, 0.24, 1) infinite;
              }
              @keyframes ce-amt {
                0%, 20% { transform: translateY(0%); }
                25%, 45% { transform: translateY(-25%); }
                50%, 70% { transform: translateY(-50%); }
                75%, 100% { transform: translateY(-75%); }
              }
              @media (prefers-reduced-motion: reduce) {
                .ce-ticker-risk,
                .ce-range-dot,
                .ce-eq,
                .ce-amt,
                .ce-state,
                .ce-health-bar {
                  animation: none !important;
                }
              }
            `}</style>
          </PerformanceDiv>
        </div>
      </div>

      <DeferredAskAiShowcase />

      <div className="site-content-shell site-section-gap flex flex-col site-section-stack">
        <section>
          <MarketingLeadHeader
            title="Put your LP positions to work"
            subtitle="Ways teams use LP collateral without giving up liquidity or fee income."
          />

          <div className="mt-10 grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {lpUseCases.map((item) => {
              const Icon = item.icon

              return (
                <article key={item.title} className="flex items-start gap-3">
                  <Icon
                    className="mt-0.5 size-[18px] shrink-0 text-type-tertiary"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <h3 className="type-supporting text-foreground">{item.title}</h3>
                    <p className="mt-1 type-meta-label">{item.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <div>
          <MarketingLeadHeader
            title="Powered by Aave v4."
            subtitle="Engineered for resilience by Avana."
          />

          <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-12 lg:gap-16 xl:gap-20">
            <div className="flex items-center justify-center">
              <Image
                src="/images/Avana Coin Ring.png"
                alt="Avana coin illustration"
                width={1714}
                height={1601}
                className="h-auto w-full max-w-[20rem] sm:max-w-[24rem] lg:max-w-[28rem]"
                sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 20rem"
              />
            </div>

            <div className="min-w-0">
              <Accordion
                type="single"
                collapsible
                defaultValue="enterprise-grade-security-and-vaults"
                orientation="vertical"
                className="w-full"
              >
                {positionSafetyItems.map((item) => (
                  <AccordionItem
                    key={item.title}
                    value={item.title.toLowerCase().replaceAll(" ", "-")}
                    className="border-b border-border py-6 first:border-t last:border-b"
                  >
                    <AccordionTrigger className="type-card-title group p-0 text-left text-foreground hover:no-underline [&>svg.size-4]:hidden">
                      <span className="flex flex-1 items-center justify-between gap-4">
                        <span>{item.title}</span>
                        <span className="type-meta-label text-type-tertiary">{item.number}</span>
                      </span>
                      <FaqToggleIcons />
                    </AccordionTrigger>
                    <AccordionContent className="type-body-copy max-w-[34rem] pb-0 pt-4">
                      {item.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        <div className="-mt-8 md:-mt-12">
          <HomepageNewsroomSection locale={locale} eyebrowTone="rose" />
        </div>

        <div className="pb-2 md:pb-4">
          <HomepageFaqSection />
        </div>
      </div>
    </section>
  )
}
