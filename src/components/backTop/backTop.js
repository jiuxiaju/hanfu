Component({
  properties: {
    scrollTop: {
      type: Number,
      value: 0,
      observer(newVal) {
        console.log('back-top 组件收到新的 scrollTop 值：', newVal);
      }
    },
    // 新增属性示例
    customProperty: {
      type: String,
      value: '默认值'
    },
    visibilityHeight: {
      type: Number,
      value: 0, // 默认值，也可以通过父组件传递
    }, 
   },
  data: {
    backTopTheme: 'round/',
    backTopText: '返回顶部',
    someScrollTopValue: 0, // 这里是一个示例值
    visibilityHeight:0,
  },
  methods: {
    onToTop() {
      // 触发父组件的 handleToTop 方法，可以选择传递数据
      
      this.triggerEvent('to-top', { scrollTop: this.properties.scrollTop });
      console.log(this.properties.scrollTop,'sss')
      console.log('wozai')
    },

  },

  lifetimes: {
    attached: function () {
      console.log('组件加载成功');
      // 打印自定义属性值
      console.log('back-top 组件 attach 阶段 scrollTop 值：', this.properties.scrollTop);
    }
  },
});