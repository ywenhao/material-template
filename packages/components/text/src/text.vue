<template>
  <text class="mt-text" @click="emit('click')">{{ props.msg }}</text>
</template>

<script setup lang="ts">
import type { TextProps, TextEmits } from './type'

const props = defineProps<TextProps>()

const emit = defineEmits<TextEmits>()
</script>
