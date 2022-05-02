export interface PluginIconifyOptions {
  /**
   * Scale related to the current font size (1em).
   *
   * @default 1
   */
  scale?: number
  /**
   * Mode of generated CSS icons.
   *
   * - `mask` - use background color and the `mask` property for monochrome icons
   * - `background-img` - use background image for the icons, colors are static
   * - `auto` - smartly decide mode between `mask` and `background-img` per icon based on its style
   *
   * @default 'auto'
   * @see https://antfu.me/posts/icons-in-pure-css
   */
  mode?: 'mask' | 'background-img' | 'auto'
  /**
   * Class prefix for matching icon rules.
   *
   * @default `i-`
   */
  prefix?: string
  /**
   * Custom icon unit.
   *
   * @default `em`
   */
  unit?: string
}
