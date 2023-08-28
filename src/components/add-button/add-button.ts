import { aComponent } from '@ali/mor-core'

aComponent({
  props: {
    text: 'Button',
    onClickMe: () => {},
  },

  methods: {
    onClickMe() {
      this.props.onClickMe()
    },
  },
})
