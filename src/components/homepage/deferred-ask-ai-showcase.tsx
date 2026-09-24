"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import { lookupPhrase, usePhraseMap } from "@/components/phrase-map-context"

const AskAiShowcase = dynamic(
  () =>
    import("@/components/ask-ai-showcase").then(
      (module) => module.AskAiShowcase,
    ),
  {
    ssr: false,
    loading: () => <AskAiShowcasePreview />,
  },
)

function AskAiShowcasePreview() {
  const map = usePhraseMap()
  const t = (phrase: string) => lookupPhrase(map, phrase)

  return (
    <section
      className="site-content-shell site-section-gap min-h-[42rem]"
      data-testid="ask-ai-showcase-preview"
    >
      <div className="mb-8 flex max-w-[48rem] flex-col gap-3 md:mb-10">
        <h2 className="type-md-lg text-foreground">{t("Command your portfolio with Ask AI")}</h2>
        <p className="type-md-lg text-theme-text-sec mt-0.5">
          {t("Simulate yield loops, automate borrow guards, and execute in plain English.")}
        </p>
      </div>

      <div className="grid min-h-[28rem] items-center rounded-2xl border border-border bg-card p-6 md:grid-cols-2 md:gap-10 md:p-10">
        <div className="hidden md:block">
          <p className="mb-4 text-sm text-muted-foreground">{t("Simulation preview")}</p>
          <p className="text-lg leading-7 text-foreground">
            {t(
              "Here’s your 3x loop under a 15% ETH price drop. Review the downside before putting capital to work.",
            )}
          </p>
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-x-5 gap-y-4 text-sm">
          <span className="col-span-2 text-muted-foreground">
            {t(
              "“Simulate a 3x ETH-USDC yield loop and show my liquidation price if ETH drops 15%”",
            )}
          </span>
          <span>{t("Leverage")}</span>
          <strong>3x</strong>
          <span>{t("ETH stress test")}</span>
          <strong>−15%</strong>
          <span>{t("Liquidation price")}</span>
          <strong>$2,250</strong>
        </div>
      </div>
    </section>
  )
}

export function DeferredAskAiShowcase() {
  const root = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const element = root.current
    if (!element) return
    const scheduleFrame = window.requestAnimationFrame
    const cancelFrame = window.cancelAnimationFrame

    if (!("IntersectionObserver" in window)) {
      const frame = scheduleFrame(() => setShouldLoad(true))
      return () => cancelFrame(frame)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: "900px 0px", threshold: 0 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={root} data-testid="ask-ai-showcase-lazy-root">
      {shouldLoad ? <AskAiShowcase /> : <AskAiShowcasePreview />}
    </div>
  )
}
