import { defineAction } from 'fluxtext'
// @deps bignumber https://esm.sh/bignumber.js@9?bundle

export default defineAction({
  name: 'sum',
  title: 'Sum',
  titleI18n: { zh: '求和' },
  icon: 'Calculator',
  aliases: ['add', 'total'],
  description: 'Sum all numbers across all lines (BigNumber precision)',
  descriptionI18n: { zh: '对所有数字求和（BigNumber 高精度）' },
  tags: ['math', 'number'],
  params: [],

  async run(ctx) {
    const BigNumber = ctx.deps.bignumber.default || ctx.deps.bignumber
    const re = /[\s,]+/
    const nums = ctx.input.text.split('\n')
      .flatMap(line => line.trim().split(re).filter(Boolean))
      .filter(t => !new BigNumber(t).isNaN())
    if (nums.length === 0) return { text: '0' }
    const total = nums.reduce((acc, n) => acc.plus(n), new BigNumber(0))
    return { text: total.toFixed() }
  },
})
