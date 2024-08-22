import dayjs from 'dayjs'
import { aComponent } from '@ali/mor-core'
import area from '/assets/area'
function calculateStatus(startTime, endTime) {
  const now = dayjs();
  const start = dayjs(startTime);
  const end = dayjs(endTime);

  if (now.isBefore(start)) {
    return '未开始'; // 活动尚未开始
  } else if (now.isAfter(end)) {
    return '已结束'; // 活动已经结束
  } else {
    return '进行中'; // 活动正在进行中
  }
}
const STATUS_KEY_MAP: any = {
  '已结束': 3,
  '未开始': 1,
  '进行中': 2,
}

const options = [
  {
    value: '淘宝',
    label: '淘宝',
    icon: 'https://gw.alicdn.com/imgextra/i3/O1CN01uRn4VL1Oy57aWZzRo_!!6000000001773-2-tps-24-24.png',
  }, {
    value: '拼多多',
    label: '拼多多',
    icon: 'https://gw.alicdn.com/imgextra/i4/O1CN01awoIdD1fq9jnbj1aV_!!6000000004057-0-tps-24-24.jpg',
  }, {
    value: '抖音',
    label: '抖音',
    icon: 'https://gw.alicdn.com/imgextra/i3/O1CN01mT75pL1yJ9tvR5weD_!!6000000006557-2-tps-24-24.png',
  }, {// 4 及以后为假数据
    value: '京东',
    label: '京东',
    icon: 'https://gw.alicdn.com/imgextra/i1/O1CN01to53GL1W8LJ2iMnkW_!!6000000002743-2-tps-24-24.png',
  }, {
    value: '微店',
    label: '微店',
    icon: 'https://gw.alicdn.com/imgextra/i2/O1CN01ZmFC5H1rKLcQlutEv_!!6000000005612-2-tps-24-24.png',
  }, {
    value: '小红书',
    label: '小红书',
    icon: 'https://gw.alicdn.com/imgextra/i4/O1CN01NzvJMm1L70NKjP0FP_!!6000000001251-2-tps-24-24.png',
  }
];

aComponent({
  data: {
    typeList: [
      {
        value: '',
        label: '所有类型',
      },
      {
        value: '1',
        label: '文化体验类',
      },
      {
        value: '2',
        label: '教育研习类',
      },
      {
        value: '3',
        label: '社交联谊类',
      },
    ],
    statusList: [
      {
        value: '',
        label: '所有状态',
      },
      {
        value: '未开始',
        label: '未开始',
      },
      {
        value: '进行中',
        label: '进行中',
      },
      {
        value: '已结束',
        label: '已结束',
      },
    ],
    provinceList: [],
    filter: {
      type: '',
      status: '',
      area: ['', ''],
      source:'',
      size:[],
      deliveryTime:[]

    },
    value: ['0', '0-0'],
    infoList: [],
    area: ['', ''],
    source: [],
    options,
    styleOptions: [
      {
        value: '衣裳',
        label: '衣裳'
      },
      {
        value: '襦裙',
        label: '襦裙'
      }
    ],
    sizeOptions: [
      {
        value: 'xs',
        label: 'xs'
      },
      {
        value: 's',
        label: 's'
      },
      {
        value: 'm',
        label: 'm'
      },
      {
        value: 'l',
        label: 'l'
      },
      {
        value: 'xl',
        label: 'xl'
      }
    ],
    deliveryTimeOptions: [
      {
        value: '1天',
        label: '1天'
      },
      {
        value: '3天',
        label: '3天'
      },
      {
        value: '7天',
        label: '5天'
      },
      {
        value: '15天',
        label: '15天'
      },
      {
        value: '30天',
        label: '30天'
      }
    ],
    dynastyOptions: [
      {
        value: '战国',
        label: '战国'
      },
      {
        value: '汉',
        label: '汉'
      },
      {
        value: '晋',
        label: '晋'
      },
      {
        value: '南白朝',
        label: '南白朝'
      },
      {
        value: '唐',
        label: '唐'
      },
      {
        value: '武周',
        label: '武周'
      },
      {
        value: '五代',
        label: '五代'
      },
      {
        value: '宋',
        label: '宋'
      },
      {
        value: '明',
        label: '明'
      }
    ],
    tagsOptions: [
      {
        value: '妆造',
        label: '妆造'
      },
      {
        value: '摄影',
        label: '摄影'
      }
    ],
    style: [],
    size:[],
    dynasty:[],
    deliveryTime:[],
    tags:[],
    sourceLabel: '店铺来源',
    styleLabel: '形制',
    sizeLabel:'尺码',
    deliveryTimeLabel:'发货时间',
    dynastyLabel:'朝代',
    tagsLabel:'标签',
    tabPanelstyle: 'display:flex;justify-content:center;align-items:center;',

  },
  attached() {
    this.getArea()
  },
  methods: {
    onClick() {
    },
    // 生成地区列表
    getArea() {
      const provinceList: any = area.provinceList.map((province: any) => ({
        label: province.fullName,
        value: province.fullName,
        children: province.directCityList.map((city: any) => ({
          label: city.fullName,
          value: city.fullName,
        })),
      }))
      this.setData({ provinceList });
    },
    
    // 活动类型菜单
    onChangeTypeFilter(e: any) {
      const filter = {
        ...this.data.filter,
        type: e.detail.value,
      }
      this.setData({ filter })
      this.createQueryParams(filter)
    },
    //活动状态菜单
    onChangeStatusFilter(e: any) {
      const filter = {
        ...this.data.filter,
        status: e.detail.value,
      }
      this.setData({ filter })
      this.createQueryParams(filter)
    },
    //地区选择菜单
    onChangeAreaFilter(e: any) {
      const { value } = e.detail
      this.setData({ area: value })
    },
    //重置
    defaultTap(event) {
      const dropdownId = event.currentTarget.dataset.id;
      const filter = {
        ...this.data.filter,
        area: ['', ''],
      }
      this.setData({ filter, area: ['', ''] })
      this.createQueryParams(filter)
      this.mockCloseDropDownMenu(dropdownId);
    },//确认
    primaryTap(event) {
      const dropdownId = event.currentTarget.dataset.id;
      const filter = {
        ...this.data.filter,
        area: this.data.area,
      }
      this.setData({ filter })
      this.mockCloseDropDownMenu(dropdownId);
      this.createQueryParams(filter)
    },
    createQueryParams(filter?: any) {
      const requestParam = filter || this.data.filter
      console.log(filter,'filter1')
      // 调整area的入参格式
      if (requestParam.area) {
        requestParam.region = requestParam.area.join(',')
      }
      if (requestParam.region === ',') {
        delete requestParam.region
      }
      delete requestParam.area
      console.log(requestParam)
      //改用云函数
    },
    //更改地区列表的树
    mockCloseDropDownMenu(dropdownId) {
      console.log('准备关闭')
      const drowItemRef = this.selectComponent(`#${dropdownId}`);
      drowItemRef.$parent?.setData({
        activeIdx: -1,
      });
      drowItemRef.setData({
        show: false,
      });
      drowItemRef.triggerEvent('close');
    },
    //点击店铺来源
    handleSourceChange(event) {
      const { value } = event.detail;
      this.setData({
        source: value,
      });
    },
//确认店铺来源
    handleSourceConfirm() {
      console.log(this.data.filter,'确认店铺来源之前')
      const filter = {
        ...this.data.filter,
        source: this.data.source,
      }
      this.createQueryParams(filter)
      //动态修改sourceLabel
      const newsource = this.data.source;
      this.setData({
        filter:filter,
        sourceLabel: (function () {
          const sourceCount = newsource.length;
          if (sourceCount === 0) {
            return '店铺来源';
          } else if (sourceCount === 1) {
            return newsource[0];
          } else {
            return `店铺来源${sourceCount}）`;
          }
        })()
      });
    },
//重置店铺来源
    handleSourceReset() {
      const filter = {
        ...this.data.filter,
        source: this.data.source,
      }
      this.createQueryParams(filter)
      //动态修改sourceLabel
      const newsource = this.data.source;
      this.setData({
        filter:filter,
        sourceLabel: (function () {
          const sourceCount = newsource.length;
          if (sourceCount === 0) {
            return '店铺来源';
          } else if (sourceCount === 1) {
            return newsource[0];
          } else {
            return `店铺来源${sourceCount}）`;
          }
        })()
      });
    },

    //点击汉服款式属性
    handleStyleChange(event) {
      const { value } = event.detail;
      this.setData({
        style: value,
      });
    },
    //确认汉服款式属性
    handleStyleConfirm() {
      const filter = {
        ...this.data.filter,
        style: this.data.style,
      }
      this.createQueryParams(filter)
      //动态修改styleLabel
      const newStyles = this.data.style;
      this.setData({
        filter:filter,
        styleLabel: (function () {
          const styleCount = newStyles.length;
          if (styleCount === 0) {
            return '形制';
          } else if (styleCount === 1) {
            return newStyles[0];
          } else {
            return `形制（${styleCount}）`;
          }
        })()
      });

    },
    
    //重置汉服款式
    handleStyleReset() {
      const filter = {
        ...this.data.filter,
        style: this.data.style,
      }
      this.createQueryParams(filter)
      //动态修改styleLabel
      const newStyles = this.data.style;
      this.setData({
        filter:filter,
        styleLabel: (function () {
          const styleCount = newStyles.length;
          if (styleCount === 0) {
            return '形制';
          } else if (styleCount === 1) {
            return newStyles[0];
          } else {
            return `形制（${styleCount}）`;
          }
        })()
      });
    },
        //点击标签属性
        handleTagsChange(event) {
          const { value } = event.detail;
          this.setData({
            tags: value,
          });
        },
        //确认标签属性
        handleTagsConfirm() {
          const filter = {
            ...this.data.filter,
            tags: this.data.tags,
          }
          this.createQueryParams(filter)
          //动态修改styleLabel
          const newTags = this.data.tags;
          this.setData({
            filter:filter,
            tagsLabel: (function () {
              const tagsCount = newTags.length;
              if (tagsCount === 0) {
                return '形制';
              } else if (tagsCount === 1) {
                return newTags[0];
              } else {
                return `形制（${tagsCount}）`;
              }
            })()
          });
    
        },
        
        //重置标签款式
        handleTagsReset() {
          const filter = {
            ...this.data.filter,
            tags: this.data.tags,
          }
          this.createQueryParams(filter)
          //动态修改styleLabel
          const newTags = this.data.tags;
          this.setData({
            filter:filter,
            tagsLabel: (function () {
              const tagsCount = newTags.length;
              if (tagsCount === 0) {
                return '标签';
              } else if (tagsCount === 1) {
                return newTags[0];
              } else {
                return `标签（${tagsCount}）`;
              }
            })()
          });
        },
        //点击朝代属性
        handleDynastyChange(event) {
          const { value } = event.detail;
          this.setData({
            dynasty: value,
          });
        },
        //确认朝代属性
        handleDynastyConfirm() {
          const filter = {
            ...this.data.filter,
            dynasty: this.data.dynasty,
          }
          this.createQueryParams(filter)
          //动态修改styleLabel
          const newDynasty = this.data.dynasty;
          this.setData({
            filter:filter,
            dynastyLabel: (function () {
              const dynastyCount = newDynasty.length;
              if (dynastyCount === 0) {
                return '朝代';
              } else if (dynastyCount === 1) {
                return newDynasty[0];
              } else {
                return `朝代${dynastyCount}）`;
              }
            })()
          });
    
        },
        
        //重置朝代
        handleDynastyReset() {
          const filter = {
            ...this.data.filter,
            dynasty: this.data.dynasty,
          }
          this.createQueryParams(filter)
          //动态修改styleLabel
          const newDynasty = this.data.dynasty;
          this.setData({
            filter:filter,
            dynastyLabel: (function () {
              const dynastyCount = newDynasty.length;
              if (dynastyCount === 0) {
                return '朝代';
              } else if (dynastyCount === 1) {
                return newDynasty[0];
              } else {
                return `朝代${dynastyCount}）`;
              }
            })()
          });
        },
       //点击尺码属性
       handleSizeChange(event) {
        const { value } = event.detail;
        this.setData({
          size: value,
        });
      },
      //确认尺码
      handleSizeConfirm() {
        const filter = {
          ...this.data.filter,
          size: this.data.size,
        }
        this.createQueryParams(filter)
        //动态修改styleLabel
        const newSize = this.data.size;
        this.setData({
          filter:filter,
          sizeLabel: (function () {
            const sizeCount = newSize.length;
            if (sizeCount === 0) {
              return '尺码';
            } else if (sizeCount === 1) {
              return newSize[0];
            } else {
              return `尺码${sizeCount}）`;
            }
          })()
        });
  
      },
      //重置尺码
      handleSizeReset() {
        const filter = {
          ...this.data.filter,
          size: this.data.size,
        }
        this.createQueryParams(filter)
        //动态修改styleLabel
        const newSize = this.data.size;
        this.setData({
          filter:filter,
          sizeLabel: (function () {
            const sizeCount = newSize.length;
            if (sizeCount === 0) {
              return '尺码';
            } else if (sizeCount === 1) {
              return newSize[0];
            } else {
              return `尺码${sizeCount}）`;
            }
          })()
        });
      },

       //点击发货时间
       handleDeliveryTimeChange(event) {
        const { value } = event.detail;
        this.setData({
          deliveryTime: value,
        });
      },
      //确认发货时间
      handleDeliveryTimeConfirm() {
        console.log(this.data.filter,'确认发货时间')
        const filter = {
          ...this.data.filter,
          deliveryTime: this.data.deliveryTime,
        }
        this.createQueryParams(filter)
        //动态修改styleLabel
        const newDeliveryTime = this.data.deliveryTime;
        this.setData({
          filter:filter,
          deliveryTimeLabel: (function () {
            const deliveryTimeCount = newDeliveryTime.length;
            if (deliveryTimeCount === 0) {
              return '尺码';
            } else if (deliveryTimeCount === 1) {
              return newDeliveryTime[0];
            } else {
              return `尺码${deliveryTimeCount}）`;
            }
          })()
        });
      },
      //重置发货时间
      handleDeliveryTimeReset() {
        const filter = {
          ...this.data.filter,
          deliveryTime: this.data.deliveryTime,
        }
        this.createQueryParams(filter)
        //动态修改deliveryTimeLabel
        const newDeliveryTime = this.data.deliveryTime;
        this.setData({
          filter:filter,
          deliveryTimeLabel: (function () {
            const deliveryTimeCount = newDeliveryTime.length;
            if (deliveryTimeCount === 0) {
              return '发货时间';
            } else if (deliveryTimeCount === 1) {
              return newDeliveryTime[0];
            } else {
              return `发货时间${deliveryTimeCount}）`;
            }
          })()
        });
      },
  },
})



