import { getImageProps } from "next/image"
import type { AppLocale } from "@/i18n/locales"
import { withMarketingI18n } from "@/lib/content-i18n/with-marketing-i18n"
import { brandAssetPath } from "@/lib/brand-assets"

const emptyHero = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="

export default async function WebappHero({ locale }: { locale: AppLocale }) {
  const { props: desktop } = getImageProps({
    src: brandAssetPath("/images/Avana Express Light.png"),
    alt: "Avana Express homepage hero interface",
    fill: true,
    loading: "eager",
    fetchPriority: "high",
    quality: 85,
    sizes: "(max-width: 768px) 100vw, (max-width: 1536px) 64rem, 72rem",
  })
  const { props: mobile } = getImageProps({
    src: "/images/avana-phone-hero.webp",
    alt: desktop.alt,
    fill: true,
    loading: "eager",
    fetchPriority: "high",
    quality: 75,
    sizes: "100vw",
  })

  return withMarketingI18n(locale, ['webapp-hero'], (
    <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[2/1] lg:aspect-[1672/941]">
      {/* Separate slots prevent a previous viewport's image lingering during decode.
          Media-gated sources keep the hidden slot from downloading an image. */}
      <picture className="sm:hidden">
        <source media="(width < 640px)" srcSet={mobile.srcSet} sizes={mobile.sizes} />
        <img
          {...mobile}
          src={emptyHero}
          srcSet={undefined}
          alt={mobile.alt}
          className="object-contain object-center"
        />
      </picture>
      <picture className="hidden sm:block">
        <source media="(width >= 640px)" srcSet={desktop.srcSet} sizes={desktop.sizes} />
        <img
          {...desktop}
          src={emptyHero}
          srcSet={undefined}
          alt={desktop.alt}
          className="object-cover object-center"
        />
      </picture>
    </div>
  ))
}
