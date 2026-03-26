import { describe, expect, it } from 'vite-plus/test'
import { mount } from '@vue/test-utils'
import Text from '../src/text.vue'

describe('Text.vue', () => {
  it('create', () => {
    const wrapper = mount(() => <Text msg="test" />)

    expect(wrapper.text()).toBe('test')
  })
})
