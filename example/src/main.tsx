import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Highlight, { defaultProps } from 'prism-react-renderer'
import githubTheme from 'prism-react-renderer/themes/github'

function App() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden px-4">
      <header className="flex items-center gap-2 text-2xl font-medium">
        <a
          href="https://github.com/InfiniteXyy/tailwindcss-iconify"
          target="_blank"
          className="i-[carbon-logo-github]"
        />
        <a href="https://tailwindcss.com/" className="hover:underline">
          Tailwind CSS
        </a>
        <div className="i-[mdi-heart] text-xl text-red-400" />
        <a href="https://iconify.design/" className="hover:underline">
          Iconify
        </a>
      </header>

      <div className="mt-8 flex items-end gap-2 text-2xl">
        <div>{'['}</div>
        <div className="i-[logos-react]" />
        <div className="i-[logos-vue]" />
        <div className="i-[logos-angular-icon]" />
        <div className="i-[logos-svelte-icon]" />
        <div className="i-[logos-solidjs-icon]" />
        <div>{']'}</div>
      </div>

      <main className="mt-8 flex w-full flex-col items-center">
        <Highlight
          {...defaultProps}
          theme={githubTheme as any}
          language="jsx"
          code={`// tailwind.config.js
plugins: [require('tailwindcss-iconify').default()],

// main.jsx
<div className="i-[carbon-logo-github]" />`}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} max-w-full overflow-x-auto rounded-lg p-4`}
              style={style}
            >
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => {
                    const props = getTokenProps({ token, key })
                    if (token.content.match(/i-\[/)) {
                      props.className += ' bg-gray-200 mx-2 px-1 py-0.5 rounded'
                    }
                    return <span {...props} />
                  })}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </main>

      <footer className="mt-8 font-mono text-xs text-gray-400">
        <span>
          Inspired by @unocss/preset-icon by antfu, and his post
          <a
            className="ml-2 underline"
            href="https://antfu.me/posts/icons-in-pure-css"
          >
            Icons in Pure CSS
          </a>
        </span>
      </footer>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
