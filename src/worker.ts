import { loadNodeIcon } from '@iconify/utils/lib/loader/node-loader'

// Tailwind does not support async plugins
// So my workaround is to load icon in a worker process with spawnSync

async function loadIconFromValue(value: string) {
  const [_value, collection, name] = value.match(/^(.*?)-(.*)$/) || []
  return await loadNodeIcon(collection, name, {
    addXmlNs: true,
    warn: undefined,
    customizations: {
      trimCustomSvg: true,
    },
  })
}

const [iconName] = process.argv.slice(2)

loadIconFromValue(iconName).then((svg) => svg && process.stdout.write(svg))
