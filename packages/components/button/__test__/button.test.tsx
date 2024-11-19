import { describe, expect, it, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../src/button.vue'

describe('Button.vue', () => {
  it('create', () => {
    const wrapper = mount(() => <Button msg="test" />)

    expect(wrapper.text()).toBe('test')
  })
})
