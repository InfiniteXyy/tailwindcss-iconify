# tailwindcss-iconify

Tailwindcss plugin for iconify

A Copy of [@unocss/preset-icon](https://github.com/unocss/unocss/blob/main/packages/preset-icons/README.md) in tailwind world, based on antfu's post [Icons in pure css](https://antfu.me/posts/icons-in-pure-css)

## Demo

https://tailwindcss-iconify.vercel.app

## Installation

```bash
# install plugin
yarn add -D tailwindcss-iconify

# install your iconset
yarn add -D @iconify-json/carbon
# [Optional] Or install them all(about 130MB)
yarn add -D @iconify/json
```

## Usage

Add this plugin to your `tailwind.config.js`:

```javascript
module.exports = {
  ...
  plugins: [require('tailwindcss-iconify').default()],
  ...
}
```

Use icon within the component class

```tsx
<div className="i-[carbon-logo-github]" />
```

If are using VSCode, and want to get a better Development Experience, you can install the `Iconify IntelliSense` VSCode Plugin.


### TODO

- [ ] Support more configurations as @unocss/preset-icon
- [ ] Support custom icon sets

### Thanks

This project is simple and nearly the same as @unocss/preset-icon.

If you want to get the fully supported iconify support in css, you can try **unocss** , it's a fast and small Atomic-CSS generator alternative.