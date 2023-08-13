/** @type {import("prettier").Config} */
const config = {
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 80,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '<THIRD_PARTY_MODULES>',
    '^@core/(.*)$',
    '^@server/(.*)$',
    '^@ui/(.*)$',
    '^[./]'
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
}

module.exports = config
