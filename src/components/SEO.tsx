import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  url?: string
  image?: string
  structuredData?: Record<string, unknown>
}

const setMeta = (selector: string, attribute: 'content', value: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    if (selector.startsWith('meta[name="')) {
      const name = selector.match(/meta\[name="(.+)"\]/)?.[1]
      if (name) element.setAttribute('name', name)
    }
    if (selector.startsWith('meta[property="')) {
      const property = selector.match(/meta\[property="(.+)"\]/)?.[1]
      if (property) element.setAttribute('property', property)
    }
    document.head.appendChild(element)
  }
  element.setAttribute(attribute, value)
}

export const SEO = ({ title, description, url, image = '/og.png', structuredData }: SEOProps) => {
  useEffect(() => {
    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    if (url) setMeta('meta[property="og:url"]', 'content', url)
    if (image) setMeta('meta[property="og:image"]', 'content', image)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
    if (image) setMeta('meta[name="twitter:image"]', 'content', image)

    let script: HTMLScriptElement | null = null
    if (structuredData) {
      script = document.head.querySelector<HTMLScriptElement>('script[data-seo="structured"]')
      if (!script) {
        script = document.createElement('script')
        script.type = 'application/ld+json'
        script.dataset.seo = 'structured'
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(structuredData)
    }

    return () => {
      if (script) {
        script.remove()
      }
    }
  }, [title, description, url, image, structuredData])

  return null
}
