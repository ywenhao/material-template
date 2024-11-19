import type Button from './button.vue'

export type ButtonProps = {
  msg: string
}

export type ButtonEmits = {
  click: []
  change: []
}

export type ButtonInstance = InstanceType<typeof Button>
