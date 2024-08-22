import dayjs from 'dayjs'
import { aComponent } from '@ali/mor-core'
import area from '/assets/area'
aComponent({
  properties: {
    currentTab: {
      type: Number, // 或者 String 看你的具体情况
      value: 0,
    },
    menuData: {
      type: Array,
      value: []
    }
  },
  data: {
    actypeList: [

    ],
    sourceOptions: [

      {
        value: '淘宝',
        label: '淘宝',
      },
      {
        value: '拼多多',
        label: '拼多多',
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

    },
    value: ['0', '0-0'],
    infoList: [],
    area: ['', ''],
    source: [],
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
    size: [],
    dynasty: [],
    actype: [],
    deliveryTime: [],
    tags: [],
    sourceLabel: '店铺来源',
    styleLabel: '形制',
    sizeLabel: '尺码',
    deliveryTimeLabel: '发货时间',
    dynastyLabel: '朝代',
    tagsLabel: '标签',
    areaLabel: '地区选择',
    actypeLabel: '活动类型',
    tabPanelstyle: 'display:flex;justify-content:center;align-items:center;',
    previousTab: '',
    previousMenuData: []
  },
  attached() {
    this.getArea()
  },
  observers: {
    // 关注 currentTab 的变化
    'currentTab': function (newVal) {
      if (newVal !== this.data.previousTab) {
        this.setData({ previousTab: newVal }); // 更新 previousTab 为当前 newVal
        this.clearFilter(); // 清空筛选条件
      }
    },
    'menuData': function (newData) {
      if (newData !== this.data.previousMenuData) {
        this.setData({ previousMenuData: newData }); // 更新 previousTab 为当前 newVal
        this.processFilterData(newData);
      }
    }
  },
  methods: {
    onClick() {
    },
    processFilterData(menuData) {
      const deliveryTime = menuData.find(item => item.label === 'deliveryTime');
      const dynasty = menuData.find(item => item.label === 'dynasty');
      const actype = menuData.find(item => item.label === 'actype');
      const tags = menuData.find(item => item.label === 'tags');
      const style = menuData.find(item => item.label === 'style');
      const size = menuData.find(item => item.label === 'size');
      const source = menuData.find(item => item.label === 'source');
      this.setData({
        deliveryTimeOptions: deliveryTime ? deliveryTime.values : [],
        dynastyOptions: dynasty ? dynasty.values : [],
        actypeList: actype ? actype.values : [],
        tagsOptions: tags ? tags.values : [],
        sizeOptions: size ? size.values : [],
        styleOptions: style ? style.values : [],
        sourceOptions: source ? source.values : [],
      });
    },
    clearFilter() {
      // 清空 filter
      this.setData({
        filter: {},
        style: [],
        styleLabel: '形制',
        size: [],
        sizeLabel: '尺码',
        dynasty: [],
        dynastyLabel: '朝代',
        deliveryTime: [],
        deliveryTimeLabel: '发货时间',
        tags: [],
        tagsLabel: '标签',
        source: [],
        sourceLabel: '店铺来源',
        area: ['', ''],
      });
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
    // 确认活动类型菜单
    onChangeTypeFilter(event: any) {
      const { value } = event.detail;
      this.setData({
        actype: value,
      });
    },
    //确认活动类型
    handleTypeFilterConfirm() {
      const filter = {
        ...this.data.filter,
        actype: this.data.actype,
      }
      this.createQueryParams(filter)
      //动态修改sactypeLabel
      const newactype = this.data.actype;
      this.setData({
        filter: filter,
        actypeLabel: (function () {
          const actypeCount = newactype.length;
          if (actypeCount === 0) {
            return '活动类型';
          } else if (actypeCount === 1) {
            return newactype[0];
          } else {
            return `活动类型${actypeCount}）`;
          }
        })()
      });
    },
    //重置活动类型
    handleTypeFilterReset() {
      const filter = {
        ...this.data.filter,
        actype: this.data.actype,
      }
      this.createQueryParams(filter)
      this.setData({
        filter: filter,
        actypeLabel: '活动类型'
      });
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
      const newArea = this.data.area;
      this.setData({
        filter,
        area: ['', ''],
        areaLabel: '地区选择'
      })
      this.createQueryParams(filter)
      this.mockCloseDropDownMenu(dropdownId);
    },//确认
    primaryTap(event) {
      const dropdownId = event.currentTarget.dataset.id;
      const filter = {
        ...this.data.filter,
        area: this.data.area,
      }
      const newArea = this.data.area;
      console.log(newArea,'newArea',newArea.length)
      this.setData({
        filter,
        areaLabel :(function () {
          const areaCount = newArea.length;
          if (areaCount === 0) {
            return '地区选择';
          } else if (areaCount === 2) {
            const province = newArea[0];
            const city = newArea[1];
            // 如果城市为空字符串或未定义，只显示省份
            if (!city) {
              return province;
            }
            return `${province}-${city}`;
          } else if (areaCount === 1) {
            return newArea[0];
          } else {
            return `地区选择${areaCount}）`;
          }
        })()
      })
      this.mockCloseDropDownMenu(dropdownId);
      this.createQueryParams(filter)
    },
    createQueryParams(filter?: any) {
      const requestParam = filter || this.data.filter
      if (requestParam.area) {
        // 从 area 数组中解构出 province 和 city
        const [province, city] = requestParam.area;
      
        // 将 province 和 city 添加到 requestParam 对象中作为字符串
        requestParam.province = province || '';
        requestParam.city = city || '';
      
        // 删除临时的 area 键
        delete requestParam.area;
      }
      this.triggerEvent('menuData', requestParam); // 确认传递的格式正确
      //改用云函数
    },
    //更改地区列表的树
    mockCloseDropDownMenu(dropdownId) {
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
      const filter = {
        ...this.data.filter,
        source: this.data.source,
      }
      this.createQueryParams(filter)
      //动态修改sourceLabel
      const newsource = this.data.source;
      this.setData({
        filter: filter,
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
        filter: filter,
        sourceLabel: '店铺来源'
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
        filter: filter,
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
        filter: filter,
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
        filter: filter,
        tagsLabel: (function () {
          const tagsCount = newTags.length;
          if (tagsCount === 0) {
            return '标签（';
          } else if (tagsCount === 1) {
            return newTags[0];
          } else {
            return `标签（${tagsCount}）`;
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
        filter: filter,
        tagsLabel: '标签'
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
        filter: filter,
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
        filter: filter,
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
        filter: filter,
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
        filter: filter,
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
      const filter = {
        ...this.data.filter,
        deliveryTime: this.data.deliveryTime,
      }
      this.createQueryParams(filter)
      //动态修改styleLabel
      const newDeliveryTime = this.data.deliveryTime;
      this.setData({
        filter: filter,
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
        filter: filter,
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



