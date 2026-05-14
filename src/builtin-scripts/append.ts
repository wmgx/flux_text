import { defineAction } from 'fluxtext'

export default defineAction({
  name: 'append',
  title: 'Append to Lines',
  titleI18n: { zh: '追加到每行' },
  icon: 'ArrowRightToLine',
  aliases: ['append-lines', 'suffix'],
  description: 'Append a suffix to the end of each line',
  descriptionI18n: { zh: '在每行末尾追加指定文本' },
  tags: ['text', 'lines'],

  params: [
    {
      key: 'suffix',
      label: 'Suffix',
      labelI18n: { zh: '后缀' },
      type: 'text',
      default: ',',
    },
  ],

  run(ctx) {
    const suffix = ctx.params.suffix ?? ','
    const lines = ctx.input.text.split('\n').map(l => l + suffix)
    return { text: lines.join('\n') }
  },
})
