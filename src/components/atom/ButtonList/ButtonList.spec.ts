import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ButtonList from './ButtonList.vue'

describe('ButtonList', () => {
  it('renders button with icon when showIcon is true', () => {
    const wrapper = mount(ButtonList, {
      props: { showIcon: true, classIcon: 'fa-test-icon', classes: 'test-class' }
    })
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('i').exists()).toBe(true)
    expect(wrapper.find('i').classes()).toContain('fa-test-icon')
  })
})
