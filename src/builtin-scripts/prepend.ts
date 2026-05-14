import { defineAction } from 'fluxtext'

export default defineAction({
  name: 'prepend',
  title: 'Prepend to Lines',
  titleI18n: { zh: '前缀插入每行' },
  icon: 'ArrowLeftToLine',
  aliases: ['prepend-lines', 'prefix'],
  description: 'Prepend a prefix to the beginning of each line',
  descriptionI18n: { zh: '在每行开头插入指定文本' },
  tags: ['text', 'lines'],

  params: [
    {
      key: 'prefix',
      label: 'Prefix',
      labelI18n: { zh: '前缀' },
      type: 'text',
      default: '- ',
    },
  ],

  run(ctx) {
    const prefix = ctx.params.prefix ?? '- '
    const lines = ctx.input.text.split('\n').map(l => prefix + l)
    return { text: lines.join('\n') }
  },
})
