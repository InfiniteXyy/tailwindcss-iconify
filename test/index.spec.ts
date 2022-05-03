import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import pluginIconify from '../src/index'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { resolve } from 'path'

function run(code: string, config?: Parameters<typeof pluginIconify>[0]) {
  const html = String.raw
  return postcss(
    tailwindcss({
      content: [{ raw: html`<div class="${code}"></div>` } as any],
      plugins: [pluginIconify(config)],
      theme: { extend: {} },
    })
  ).process(`@tailwind components;`, { from: undefined })
}

const workerFn = vi.fn().mockImplementation(() => ({
  stderr: '',
  stdout: '<svg id="mock" viewBox="0 0 32 32" width="1em" height="1em"></svg>',
}))

vi.mock('child_process', () => ({
  spawnSync: vi.fn().mockImplementation((...args) => workerFn(...args)),
}))

describe('test basic usage', () => {
  const logSpy = vi.spyOn(console, 'error')

  afterEach(() => {
    logSpy.mockReset()
  })

  it('should basic transform works', async () => {
    const result = await run('i-[basic-usage]')

    expect(workerFn).toHaveBeenCalledWith('node', [resolve(__dirname, '../src', './worker'), 'basic-usage'])
    expect(result.css).includes(`.i-\\[basic-usage\\]`)
    expect(result.css).includes(`mock`)
    expect(result.css).includes(`background:`)
  })

  it('should mode auto works', async () => {
    workerFn.mockImplementation(() => ({
      stderr: '',
      stdout: '<svg id="mock" viewBox="0 0 32 32" currentColor="red" width="1em" height="1em"></svg>',
    }))
    const result = await run('i-[mode-auto]')
    expect(workerFn).toHaveBeenCalledWith('node', [resolve(__dirname, '../src', './worker'), 'mode-auto'])

    expect(result.css).includes(`.i-\\[mode-auto\\]`)
    expect(result.css).includes(`mask`)
    expect(result.css).not.includes(`background:`)
  })

  it('should options works', async () => {
    workerFn.mockImplementation(() => ({
      stderr: '',
      stdout: '<svg id="mock" viewBox="0 0 32 32" currentColor="red" width="1em" height="1em"></svg>',
    }))

    const result = await run('icon-[test-option]', {
      prefix: 'icon',
      scale: 2,
      unit: 'rem',
      mode: 'background-img',
    })

    expect(result.css).includes(`background:`)
    expect(result.css).includes(`2rem`)
  })

  it('should log error if not found', async () => {
    workerFn.mockImplementation(() => ({
      stderr: '',
      stdout: '',
    }))
    const result = await run('i-[not-found]')
    expect(result.css).toBe('')
    expect(logSpy).toBeCalledWith(`[tailwindcss-iconify]: couldn't load icon 'not-found'`)
  })

  it('should log error if worker has error', async () => {
    workerFn.mockImplementation(() => ({
      stderr: 'has error',
      stdout: '',
    }))
    const result = await run('i-[log-error]')
    expect(result.css).toBe('')
    expect(logSpy).toBeCalledWith(`[tailwindcss-iconify]: has error`)
  })
})
