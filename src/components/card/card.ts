import { aComponent } from '@ali/mor-core'

aComponent({
  props: {
    className: '',
    info: {},
    onClick: (info: any) => {},
  },
  didMount() {
    console.log(this.props.info)
  },
  methods: {
    onTapCard() {
      console.log('=====  onTapCard')
      this.props.onClick(this.props.info)
    },
  },
})
