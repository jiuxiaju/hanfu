import { aComponent } from '@ali/mor-core'

aComponent({
  props: {
    className: '',
    info: {},
    keyMap: {},
    onClick: (info: any) => {},
  },
  didMount() {},
  methods: {
    onTapCard() {
      console.log('=====  onTapCard')
      this.props.onClick(this.props.info)
    },
  },
})


