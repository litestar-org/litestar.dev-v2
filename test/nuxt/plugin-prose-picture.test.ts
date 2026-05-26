import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import PluginProsePicture from '~/components/plugin/PluginProsePicture.vue'

// PluginProsePicture overrides the `picture` prose component in plugin README
// rendering. A GitHub-style banner switches via `prefers-color-scheme` (OS), but
// the site toggle is class-based — so this renders two <img> toggled by
// `dark:hidden` / `hidden dark:block`, which DO respond to the .dark class.

const bannerSlot = () => [
  h('source', { media: '(prefers-color-scheme: dark)', srcset: 'dark.svg' }),
  h('source', { media: '(prefers-color-scheme: light)', srcset: 'light.svg' }),
  h('img', { src: 'light.svg', alt: 'AA Logo', width: '100%' }),
]

describe('PluginProsePicture', () => {
  it('renders two class-toggled <img> for a prefers-color-scheme banner', async () => {
    const wrapper = await mountSuspended(PluginProsePicture, {
      slots: { default: bannerSlot },
    })

    const imgs = wrapper.findAll('img')
    expect(imgs).toHaveLength(2)

    const light = imgs.find((i) => i.attributes('src') === 'light.svg')!
    const dark = imgs.find((i) => i.attributes('src') === 'dark.svg')!

    expect(light.attributes('class')).toContain('dark:hidden')
    expect(dark.attributes('class')).toContain('hidden')
    expect(dark.attributes('class')).toContain('dark:block')
    // alt is carried over to both images
    expect(light.attributes('alt')).toBe('AA Logo')
    expect(dark.attributes('alt')).toBe('AA Logo')
  })

  it('falls back to the original slot when not a dual-mode picture', async () => {
    const wrapper = await mountSuspended(PluginProsePicture, {
      slots: {
        default: () => [h('img', { src: 'single.svg', alt: 'plain' })],
      },
    })

    const imgs = wrapper.findAll('img')
    expect(imgs).toHaveLength(1)
    expect(imgs[0]!.attributes('src')).toBe('single.svg')
  })
})
