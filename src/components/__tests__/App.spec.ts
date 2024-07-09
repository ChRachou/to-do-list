import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App', () => {
  it('renders header with text task dashboard', () => {
    const wrapper = mount(App)
    const header = wrapper.find('header')
    expect(header.exists()).toBe(true)
    expect(header.text()).toContain('task dashboard')
  })

  it('renders the icon in the header', () => {
    const wrapper = mount(App)
    const icon = wrapper.find('header i')
    expect(icon.exists()).toBe(true)
  })

  //   it('renders RouterView component', () => {
  //     const wrapper = mount(App)
  //     const routerView = wrapper.findComponent({ name: 'RouterView' })
  //     expect(routerView.exists()).toBe(true)
  //   })
})
