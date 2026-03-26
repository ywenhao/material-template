import { describe, expect, it } from 'vite-plus/test'
import { mount } from '@vue/test-utils'
import Button from '../src/button.vue'

describe('Button.vue', () => {
  it('create', () => {
    const wrapper = mount(() => <Button msg="test" />)

    expect(wrapper.text()).toBe('test')
  })
})
