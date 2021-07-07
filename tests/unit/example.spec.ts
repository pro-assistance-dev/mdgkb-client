import { shallowMount } from '@vue/test-utils'
import ParentComponent from '@/components/ParentComponent.vue'

describe('ParentComponent.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(ParentComponent, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
