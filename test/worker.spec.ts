import { loadIconFromValue } from '../src/worker'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const loaderFn = vi.fn()
vi.mock('@iconify/utils/lib/loader/node-loader', () => ({
  loadNodeIcon: vi.fn().mockImplementation((collection, name, ..._options) => {
    loaderFn(collection, name)
    if (collection === 'existed-collection') return `<svg></svg>`
  }),
}))

describe('test icon loader', () => {
  afterEach(() => {
    loaderFn.mockReset()
  })

  it('should support multiple collection name', async () => {
    await loadIconFromValue('collection-name-icon-name')
    expect(loaderFn).toHaveBeenCalledWith('collection', 'name-icon-name')
    expect(loaderFn).toHaveBeenCalledWith('collection-name', 'icon-name')
    expect(loaderFn).toHaveBeenCalledWith('collection-name-icon', 'name')
    expect(loaderFn).toBeCalledTimes(3)
  })

  it('should return svg value if found', async () => {
    await loadIconFromValue('existed-collection-icon-name')
    expect(loaderFn).toHaveBeenCalledWith('existed', 'collection-icon-name')
    expect(loaderFn).toHaveBeenCalledWith('existed-collection', 'icon-name')
    expect(loaderFn).toBeCalledTimes(2)
  })

  it('should direct invode works', async () => {
    vi.resetModules()
    process.argv = ['node', './worker.js', 'collection-name-icon']
    await import('../src/worker')
    expect(loaderFn).toHaveBeenCalled()
  })
})
