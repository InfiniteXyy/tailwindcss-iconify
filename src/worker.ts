import { loadNodeIcon } from '@iconify/utils/lib/loader/node-loader'

// Tailwind does not support async plugins
// So my workaround is to load icon in a worker process with spawnSync

const COLLECTION_NAME_PARTS_MAX = 3

async function loadIconFromValue(value: string) {
  const parts = value.split('-')
  for (let i = 0; i < COLLECTION_NAME_PARTS_MAX; i++) {
    const [collection, name] = [parts.slice(0, i).join('-'), parts.slice(i).join('-')]
    const svg = await loadNodeIcon(collection, name, {
      addXmlNs: true,
      warn: undefined,
      customizations: {
        trimCustomSvg: true,
      },
    })
    if (svg) return svg
  }
}

const [iconName] = process.argv.slice(2)

loadIconFromValue(iconName).then((svg) => svg && process.stdout.write(svg))
