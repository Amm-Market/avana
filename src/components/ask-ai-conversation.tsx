"use client"

import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react"
import { ArrowRight, ArrowUp, Check, Plus, Sparkles } from "lucide-react"
import { lookupPhrase, usePhraseMap } from "@/components/phrase-map-context"
import { useSectionActivity } from "@/components/ui/use-section-activity"
import { TokenLogo } from "@/components/token-logo"
import { useTranslations } from "next-intl"

interface ResultRow {
  label: string
  value: string
  tokens?: string[]
}

interface Scenario {
  thinking: string
  thinkingSteps: string[]
  answer: string
  title: string
  titleTokens?: string[]
  rows: ResultRow[]
  note?: string
}

// Scripted product previews: no market requests, wallet calls, or video assets.
const scenarios: Scenario[] = [
  {
    thinking: "Simulating your yield loop",
    thinkingSteps: [
      "Reading onchain ETH and USDC prices",
      "Checking your collateral and debt",
      "Simulating a 3x yield loop",
      "Stress-testing a 15% ETH drop",
    ],
    answer:
      "Here’s your 3x loop under a 15% ETH price drop. Review the downside before putting capital to work.",
    title: "Simulation preview",
    titleTokens: ["ETH", "USDC"],
    rows: [
      { label: "Leverage", value: "3x" },
      { label: "ETH stress test", value: "−15%" },
      { label: "Liquidation price", value: "$2,250" },
    ],
  },
  {
    thinking: "Building your execution route",
    thinkingSteps: [
      "Checking your ETH balance",
      "Comparing swap quotes",
      "Finding a bridge to Arbitrum",
      "Preparing the Curve deposit route",
    ],
    answer:
      "Your route is ready. Swap, bridge, and deposit in one flow. Review the quote before approving.",
    title: "One instruction. Three steps.",
    rows: [
      { label: "01 · Swap", value: "5 ETH → USDC", tokens: ["ETH", "USDC"] },
      { label: "02 · Bridge", value: "Arbitrum", tokens: ["ARB"] },
      { label: "03 · Deposit", value: "Curve tri-pool", tokens: ["CRV"] },
    ],
    note: "Preview prepared · Awaiting your approval",
  },
  {
    thinking: "Preparing your conditional rule",
    thinkingSteps: [
      "Reading Aave borrow rates",
      "Checking your LP collateral",
      "Verifying available borrowing capacity",
      "Preparing your rate trigger",
    ],
    answer:
      "Here’s your rule: watch the borrow rate and borrow against your LP only when your threshold is met.",
    title: "Conditional borrow",
    rows: [
      { label: "When", value: "Aave APR < 3.8%", tokens: ["AAVE"] },
      { label: "Borrow", value: "25,000 USDC", tokens: ["USDC"] },
      { label: "Against", value: "Your LP position" },
    ],
    note: "Rule preview · Review before enabling",
  },
  {
    thinking: "Configuring your position guard",
    thinkingSteps: [
      "Reading onchain collateral prices",
      "Checking your portfolio health factor",
      "Evaluating volatility and liquidation risk",
      "Preparing your deleveraging guard",
    ],
    answer:
      "Your guard is ready to review. Monitor position health and reduce leverage when volatility threatens your target.",
    title: "Your risk guard",
    rows: [
      { label: "Target health factor", value: "> 1.6" },
      { label: "On rising risk", value: "Reduce leverage" },
      { label: "Monitoring", value: "24/7" },
    ],
    note: "Guard preview · Review before enabling",
  },
  {
    thinking: "Comparing pool fees and liquidity",
    thinkingSteps: [
      "Scanning wstETH pools across DEXs",
      "Reading pool liquidity onchain",
      "Filtering for at least $5M depth",
      "Ranking pools by fee APY",
    ],
    answer:
      "Here’s your shortlist, ranked by fee APY after filtering for at least $5M in pool liquidity.",
    title: "wstETH / ETH · top pools",
    titleTokens: ["wstETH", "ETH"],
    rows: [
      { label: "Uniswap v3", value: "8.4% · $12.8M", tokens: ["UNI"] },
      { label: "Curve", value: "6.2% · $8.1M", tokens: ["CRV"] },
      { label: "Balancer", value: "4.8% · $5.6M", tokens: ["BAL"] },
    ],
  },
]

// Starter prompts stand in for an empty greeting: they carry the section's
// value proposition instead of a hollow "what would you like to do?".
const suggestions = [
  "Simulate a yield loop",
  "Automate a borrow guard",
  "Find the best yields",
]

function subscribeToMotion(onChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)")
  media.addEventListener("change", onChange)
  return () => media.removeEventListener("change", onChange)
}

function TokenCluster({ symbols }: { symbols: string[] }) {
  return (
    <span className="ask-token-cluster">
      {symbols.map((symbol, index) => (
        <TokenLogo
          key={`${symbol}-${index}`}
          symbol={symbol}
          className="ask-token-icon h-[18px] w-[18px]"
        />
      ))}
    </span>
  )
}

export function AskAiConversation({
  scenario,
  prompt,
}: {
  scenario: number
  prompt: string
}) {
  const map = usePhraseMap()
  const cta = useTranslations("common.cta")
  const t = (text: string) => lookupPhrase(map, text)
  const content = scenarios[scenario]
  const { ref, isActive } = useSectionActivity<HTMLDivElement>("0px")
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  )
  const [step, setStep] = useState(0)
  const [characters, setCharacters] = useState(0)
  const [thinkingIndex, setThinkingIndex] = useState(0)
  const [draft, setDraft] = useState("")
  const [followUp, setFollowUp] = useState<string | null>(null)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const text = prompt.replace(/^[“”]|[“”]$/g, "")
  const currentStep = reducedMotion ? 3 : step
  const playing = isActive && !reducedMotion

  useEffect(() => {
    if (!playing || step === 3) return
    // Only the visible conversation ticks; stop entirely once the answer lands.
    const delay =
      step === 0
        ? 450
        : step === 1
          ? characters < text.length
            ? 26
            : 550
          : thinkingIndex === content.thinkingSteps.length
            ? 450
            : 1100
    const timer = window.setTimeout(() => {
      if (step === 1 && characters < text.length)
        setCharacters((value) => Math.min(value + 2, text.length))
      else if (step === 2 && thinkingIndex < content.thinkingSteps.length)
        setThinkingIndex((value) => value + 1)
      else setStep((value) => value + 1)
    }, delay)
    return () => window.clearTimeout(timer)
  }, [
    playing,
    step,
    characters,
    text.length,
    thinkingIndex,
    content.thinkingSteps.length,
  ])

  // Keep the newest follow-up in view once the scripted answer has landed.
  useEffect(() => {
    const node = transcriptRef.current
    if (followUp && node) node.scrollTop = node.scrollHeight
  }, [followUp])

  const submitFollowUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = draft.trim()
    if (!value) return
    setFollowUp(value)
    setDraft("")
  }

  return (
    <div
      ref={ref}
      className="ask-conversation"
      data-performance-active={playing}
      data-step={currentStep}
      role="group"
      aria-label={t("Ask AI conversation")}
    >
      <div className="ask-conversation-body">
        <div className="ask-transcript" ref={transcriptRef}>
          <div aria-hidden="true">
          {currentStep < 2 ? (
            <div className="ask-welcome">
              <span className="ask-welcome-icon">
                <Sparkles size={24} />
              </span>
              <div className="ask-suggestions">
                {suggestions.map((suggestion) => (
                  <span key={suggestion} className="ask-suggestion">
                    {t(suggestion)}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="ask-message">{text}</div>
              <div className="ask-response">
                <span className="ask-avatar" aria-hidden="true">
                  <Sparkles size={15} />
                </span>
                <div className="ask-response-body">
                  <div className="ask-response-label">
                    <span>
                      {currentStep === 2 ? t(content.thinking) : t("Ask AI")}
                    </span>
                    {currentStep === 2 ? (
                      <span className="ask-thinking">
                        <i />
                        <i />
                        <i />
                      </span>
                    ) : (
                      <Check size={13} />
                    )}
                  </div>
                  {currentStep === 2 && (
                    <ol className="ask-work-steps">
                      {content.thinkingSteps
                        .slice(0, thinkingIndex + 1)
                        .map((label, index) => (
                          <li key={label} data-complete={index < thinkingIndex}>
                            {index < thinkingIndex ? (
                              <Check size={13} />
                            ) : (
                              <span className="ask-work-spinner" />
                            )}
                            <span>{t(label)}</span>
                          </li>
                        ))}
                    </ol>
                  )}
                  {currentStep === 3 && (
                    <div className="ask-answer">
                      <p>{t(content.answer)}</p>
                      <div className="ask-result">
                        <div className="ask-result-head">
                          {content.titleTokens && (
                            <TokenCluster symbols={content.titleTokens} />
                          )}
                          <p className="ask-result-title">{t(content.title)}</p>
                        </div>
                        <dl>
                          {content.rows.map((row) => (
                            <div key={row.label}>
                              <dt>
                                {row.tokens && (
                                  <TokenCluster symbols={row.tokens} />
                                )}
                                <span>{t(row.label)}</span>
                              </dt>
                              <dd>{t(row.value)}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                      {content.note && (
                        <p className="ask-result-note">{t(content.note)}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          </div>
          {followUp && (
            <div className="ask-followup">
              <div className="ask-message">{followUp}</div>
              <div className="ask-response">
                <span className="ask-avatar" aria-hidden="true">
                  <Sparkles size={15} />
                </span>
                <div className="ask-response-body">
                  <div className="ask-response-label">
                    <span>{t("Ask AI")}</span>
                    <Check size={13} />
                  </div>
                  <div className="ask-answer">
                    <p>
                      {t(
                        "You’re not connected in this preview. Open the Avana Sandbox to run your own strategies.",
                      )}
                    </p>
                    <a
                      className="ask-cta"
                      href="https://app.avana.cc"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {cta("sandboxLong")}
                      <ArrowRight size={15} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {currentStep === 3 ? (
          <form className="ask-composer" onSubmit={submitFollowUp}>
            <Plus size={18} aria-hidden="true" />
            <input
              className="ask-composer-input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={t("Ask a follow-up")}
              aria-label={t("Ask a follow-up")}
              enterKeyHint="send"
              maxLength={140}
            />
            <button
              type="submit"
              className="ask-send"
              data-ready={draft.trim().length > 0}
              disabled={draft.trim().length === 0}
              aria-label={t("Send")}
            >
              <ArrowUp size={17} aria-hidden="true" />
            </button>
          </form>
        ) : (
          <div className="ask-composer" aria-hidden="true">
            <Plus size={18} />
            <div>
              {currentStep === 1 ? (
                <>
                  {text.slice(0, characters)}
                  <span className="ask-caret" />
                </>
              ) : (
                <span className="ask-placeholder">
                  {t(
                    currentStep >= 2
                      ? "Ask a follow-up"
                      : "Ask anything about your portfolio",
                  )}
                </span>
              )}
            </div>
            <span className="ask-send" data-ready={currentStep === 1}>
              <ArrowUp size={17} />
            </span>
          </div>
        )}
      </div>
      <div className="sr-only">
        <p>{text}</p>
        <p>{t(content.answer)}</p>
        <p>{t(content.title)}</p>
        {content.rows.map((row) => (
          <p key={row.label}>
            {t(row.label)}: {t(row.value)}
          </p>
        ))}
        {content.note && <p>{t(content.note)}</p>}
      </div>
    </div>
  )
}
