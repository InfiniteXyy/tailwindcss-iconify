import plugin from 'tailwindcss/plugin'
import { spawnSync } from 'child_process'
import { resolve } from 'path'
import { encodeSvgForCss } from '@iconify/utils/lib/svg/encode-svg-for-css'
import { PluginIconifyOptions } from './types'

export default function PluginIconify(props: PluginIconifyOptions) {
  const { scale = 1, mode = 'auto', prefix = 'i-', unit = 'em' } = props || {}

  const sharedProps = {
    width: `${scale}${unit}`,
    height: `${scale}${unit}`,
  }

  return plugin(function ({ matchComponents }) {
    const iconsCache: Record<string, string> = {}
    matchComponents({
      [prefix.replace(/-$/, '')]: (value: string) => {
        value = value.replace(/ /g, '')
        // load icon data-url and cache it in iconsCache
        if (!iconsCache[value]) {
          const { stderr, stdout } = spawnSync('node', [resolve(__dirname, './worker'), value])
          const svg = String(stdout)
          const err = String(stderr)
          if (err) {
            console.error(`[tailwindcss-iconify]: ${err}`)
            return []
          }
          if (!svg) {
            console.error("[tailwindcss-iconify]: couldn't load icon '" + value + "'")
            return []
          }
          iconsCache[value] = `url("data:image/svg+xml;utf8,${encodeSvgForCss(svg)}")`
        }

        const url = iconsCache[value]
        const _mode = mode === 'auto' ? (url.includes('currentColor') ? 'mask' : 'bg') : mode

        if (_mode === 'mask') {
          return [
            {
              '--iconify-icon': iconsCache[value],
              mask: 'var(--iconify-icon) no-repeat',
              'mask-size': '100% 100%',
              '-webkit-mask': 'var(--iconify-icon) no-repeat',
              '-webkit-mask-size': '100% 100%',
              'background-color': 'currentColor',
              ...sharedProps,
            },
          ]
        } else {
          return {
            background: `${url} no-repeat`,
            'background-size': '100% 100%',
            'background-color': 'transparent',
            ...sharedProps,
          }
        }
      },
    })
  })
}
