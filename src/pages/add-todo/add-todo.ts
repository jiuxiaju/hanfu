import { aPage } from '@ali/mor-core'

// 获取全局 app 实例
const app = getApp()

aPage({
  data: {
    inputValue: '',
  },

  onBlur(e: any) {
    this.setData({
      inputValue: e.detail.value,
    })
  },

  add() {
    app.todos = app.todos.concat([
      {
        text: this.data.inputValue,
        compeleted: false,
      },
    ])

    my.navigateBack()
  },
})
