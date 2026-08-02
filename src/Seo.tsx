import { useHead, useSeoMeta } from '@unhead/react'

const SITE_URL = 'https://www.joeyoke.com'
const DEFAULT_SHARE_IMAGE = '/favicon.png'

type SeoProps = {
  title: string
  description: string
  path: string
  image?: string
  noIndex?: boolean
  type?: 'website' | 'article'
}

const toAbsoluteUrl = (value: string) => {
  try {
    return new URL(value, `${SITE_URL}/`).toString()
  } catch {
    return new URL(DEFAULT_SHARE_IMAGE, `${SITE_URL}/`).toString()
  }
}

const cleanDescription = (value: string) =>
  value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 200)

export default function Seo({
  title,
  description,
  path,
  image = DEFAULT_SHARE_IMAGE,
  noIndex = false,
  type = 'website',
}: SeoProps) {
  const canonicalUrl = toAbsoluteUrl(path)
  const shareImage = image.startsWith('data:')
    ? toAbsoluteUrl(DEFAULT_SHARE_IMAGE)
    : toAbsoluteUrl(image)
  const safeDescription = cleanDescription(description)

  useSeoMeta({
    title,
    description: safeDescription,
    robots: noIndex ? 'noindex,nofollow,noarchive' : 'index,follow',
    ogType: type,
    ogSiteName: 'Joe Yoke',
    ogTitle: title,
    ogDescription: safeDescription,
    ogUrl: canonicalUrl,
    ogImage: shareImage,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: safeDescription,
    twitterImage: shareImage,
  })

  useHead({
    htmlAttrs: { lang: 'en' },
    link: noIndex ? [] : [{ rel: 'canonical', href: canonicalUrl }],
  })

  return null
}
