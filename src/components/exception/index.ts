import { aComponent } from '@ali/mor-core'

export const ERROR_TYPE = {
  NO_DATA: 1,
  NETWORK: 2,
}

const ERROR_MSG = {
  [ERROR_TYPE.NO_DATA]: '出错啦，发个小呆，请重试',
  [ERROR_TYPE.NETWORK]: '网络异常，请重试',
}

aComponent({
  props: {
    errImg: '',
    errType: ERROR_TYPE.NO_DATA,
    message: ERROR_MSG[ERROR_TYPE.NO_DATA],
    onRefresh: () => {},
    btnText: '点击刷新',
  },

  methods: {
    onRefresh() {
      this.props.onRefresh()
    },
  },
})
