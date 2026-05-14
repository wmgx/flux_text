import { defineAction } from 'fluxtext'
// @deps bignumber https://esm.sh/bignumber.js@9?bundle

export default defineAction({
  name: 'sum',
  title: 'Sum Lines',
  titleI18n: { zh: '逐行求和' },
  icon: 'Calculator',
  aliases: ['add', 'total'],
  description: 'Sum numbers on each line (BigNumber precision)',
  descriptionI18n: { zh: '对每行数字求和（BigNumber 高精度）' },
  tags: ['math', 'number'],
  params: [],

  async run(ctx) {
    const BigNumber = ctx.deps.bignumber.default || ctx.deps.bignumber
    const re = /[\s,]+/
    const lines = ctx.input.text.split('\n')
    const results = lines.map(line => {
      const tokens = line.trim().split(re).filter(Boolean)
      const nums = tokens.filter(t => !new BigNumber(t).isNaN())
      if (nums.length === 0) return line
      return nums.reduce((acc, n) => acc.plus(n), new BigNumber(0)).toFixed()
    })
    return { text: results.join('\n') }
  },
})
