# tailwindcss-iconify

<a href="https://github.com/infinitexyy/tailwindcss-iconify/actions"><img src="https://img.shields.io/github/workflow/status/infinitexyy/tailwindcss-iconify/test.svg" alt="Build Status"></a>
<a href="https://codecov.io/gh/infinitexyy/tailwindcss-iconify"><img src="https://img.shields.io/codecov/c/github/infinitexyy/tailwindcss-iconify.svg" alt="Code Coverage"></a>
<a href="https://npmjs.com/package/tailwindcss-iconify"><img src="https://img.shields.io/npm/v/tailwindcss-iconify.svg" alt="npm-v"></a>
<a href="https://npmjs.com/package/tailwindcss-iconify"><img src="https://img.shields.io/npm/dt/tailwindcss-iconify.svg" alt="npm-d"></a>

Tailwind CSS plugin for Iconify.

Bring [@unocss/preset-icon](https://github.com/unocss/unocss/blob/main/packages/preset-icons/README.md) to Tailwind CSS, based on antfu's post [Icons in pure css](https://antfu.me/posts/icons-in-pure-css)

## Why

- No need to install additional Icon libraries
- Only used icons are included, thanks to Tailwind Purge
- Easy to switch icons with CSS: `i-[carbon-star] hover:i-[carbon-star-filled]`

## Demo

https://tailwindcss-iconify.vercel.app

## Installation

1. Install this plugin

```bash
# 1. install plugin
yarn add -D tailwindcss-iconify
# 2. install your needed iconset
yarn add -D @iconify-json/carbon
#    [Optional] install all the icons (about 130MB)
yarn add -D @iconify/json
```

2. Add this plugin to your `tailwind.config.js`:

```javascript
module.exports = {
  ...
  plugins: [require('tailwindcss-iconify').default()],
  ...
}
```

## Usage

```tsx
<div className="i-[carbon-star] hover:i-[carbon-star-filled]" />
```

If are using VSCode, and want to get a better Development Experience, you can install the `Iconify IntelliSense` VSCode Plugin.

### TODO

- [ ] Support more configurations, like custom properties
- [ ] Support custom icon sets

### Thanks

This project is greatly inspired by @unocss/preset-icon. If you want to get the fully supported iconify support in css, you can try **unocss** , it's a fast and small Atomic-CSS generator alternative.
