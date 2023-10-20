import { mount } from '@vue/test-utils'
import Index from '@/pages/index.vue'

describe('Index Page', () => {
  test('renders properly', () => {
    const wrapper = mount(Index)
    expect(wrapper.exists()).toBe(true)
  })

  // Add more test cases as needed
})
