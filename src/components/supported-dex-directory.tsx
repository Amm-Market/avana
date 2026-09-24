import Image from "next/image"
import { ChevronRight } from "lucide-react"
import type { ProtocolAdapter } from "@/data/protocols"
import type { AppLocale } from "@/i18n/locales"
import { SectionEyebrow, SectionTitle } from "@/components/shared"
import { withMarketingI18n } from "@/lib/content-i18n/with-marketing-i18n"

const dexLogos: Record<string, string> = {
  U2: "/Asset-Icons/uni.webp",
  U3: "/Asset-Icons/uni.webp",
  U4: "/Asset-Icons/uni.webp",
  CRV: "/Asset-Icons/crv.webp",
  AE: "/Asset-Icons/aero.webp",
  BAL: "/Asset-Icons/bal.webp",
  "1INCH": "/Asset-Icons/1inch.svg",
  // Official mark: https://github.com/cowprotocol/cowswap/blob/main/libs/assets/src/images/logo-icon-cow.svg
  COW: "/Asset-Icons/cowswap.svg",
  SUSHI: "/Asset-Icons/sushiswap.webp",
}

const dexLinks: Record<string, string> = {
  U2: "https://uniswap.org",
  U3: "https://uniswap.org",
  U4: "https://uniswap.org",
  CRV: "https://curve.fi",
  AE: "https://aerodrome.finance",
  BAL: "https://balancer.fi",
  "1INCH": "https://1inch.com/",
  COW: "https://swap.cow.fi/#/1/swap/WETH/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  SUSHI: "https://sushi.com",
}

function getDexDisplayName(name: string) {
  return name.replace(/Uniswap v([234])/g, "Uniswap V$1").replace(/ Adapter$/, "")
}

export async function SupportedDexDirectory({
  locale,
  protocols,
}: {
  locale: AppLocale
  protocols: ProtocolAdapter[]
}) {
  return withMarketingI18n(locale, ["supported-dex-directory"], (
    <section id="supported-dexes" className="site-section-gap">
      <div className="site-content-shell">
        <div className="mx-auto w-full">
          <div className="mb-8 flex max-w-[600px] flex-col gap-2">
            <SectionEyebrow tone="emerald">Supported AMMs</SectionEyebrow>
            <SectionTitle>Every supported DEX Liquidity protocols</SectionTitle>
          </div>

          <div>
            <div className="min-w-0">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {protocols.map((protocol) => (
                  <a
                    key={protocol.name}
                    href={dexLinks[protocol.shortName]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-[6rem] items-center gap-3 rounded-lg bg-[#fafafa] px-3 py-2.5 transition-colors hover:bg-[#f1f1ef] sm:gap-4 sm:px-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white p-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]" aria-hidden="true">
                      {dexLogos[protocol.shortName] ? (
                        <Image
                          src={dexLogos[protocol.shortName]}
                          alt=""
                          width={32}
                          height={32}
                          className="h-8 w-8 object-contain"
                        />
                      ) : (
                        <span className="text-[0.55rem] font-semibold tracking-[-0.02em] text-type-secondary">
                          {protocol.shortName}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-[1rem] font-medium leading-tight tracking-[-0.02em] text-[#292a26] sm:text-[1.1rem]">
                        {getDexDisplayName(protocol.name)}
                      </h3>
                      {protocol.purpose ? (
                        <p className="mt-0.5 whitespace-pre-line text-[0.72rem] leading-[1.25] text-type-secondary sm:text-[0.78rem]">
                          {protocol.purpose}
                        </p>
                      ) : null}
                    </div>
                    <ChevronRight
                      className="h-4 w-4 shrink-0 text-type-tertiary transition-transform group-hover:translate-x-0.5"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ))
}
