import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Text from '../src/button.vue'

describe('Text.vue', () => {
  it('create', () => {
    const wrapper = mount(() => <Text msg="test" />)

    expect(wrapper.text()).toBe('test')
  })
})
