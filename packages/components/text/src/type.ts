import type Text from './text.vue'

export type TextProps = {
  msg: string
}

export type TextEmits = {
  click: []
  change: []
}

export type TextInstance = InstanceType<typeof Text>
