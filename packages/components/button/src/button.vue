<template>
  <button class="mt-button" @click="emit('click')">{{ props.msg }}</button>
</template>

<script setup lang="ts">
import type { ButtonProps, ButtonEmits } from './type'

const props = defineProps<ButtonProps>()

const emit = defineEmits<ButtonEmits>()
</script>
