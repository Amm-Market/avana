import { ArrowRight } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { CtaVideo } from "@/components/cta-video"

interface TryAvanaCtaSectionProps {
  title?: string
  primaryCta?: string
  secondaryCta?: string
}

export function TryAvanaCtaSection({
  title = "Try Avana now.",
  primaryCta = "Read the ARFC",
  secondaryCta = "Launch Testnet",
}: TryAvanaCtaSectionProps) {
  return (
    <section className="section bg-theme-bg text-theme-text section--headline">
      <div className="container site-content-shell">
        <div className="text-center mx-auto max-w-prose-medium-wide">
          <CtaVideo />
          <h2 className="type-xl sm:type-2xl text-balance mx-auto mb-v1">
            {title}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2">
            <Link
              href="https://governance.aave.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[43px] items-center gap-1.5 rounded-full bg-[#01AACF] px-[1.35rem] text-base leading-none text-white transition-colors hover:bg-[#00a0c2]"
            >
              {primaryCta}
              <ArrowRight className="h-4 w-4 stroke-[1.75] rtl:rotate-180" aria-hidden />
            </Link>
            <Link
              href="https://app.avana.cc"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-[43px] items-center gap-1.5 rounded-full bg-black/[0.06] px-[1.35rem] text-base leading-none text-foreground transition-colors hover:bg-black/[0.1]"
            >
              {secondaryCta}
              <ArrowRight className="h-4 w-4 stroke-[1.75] rtl:rotate-180" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
