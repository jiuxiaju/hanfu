import { aPage } from '@ali/mor-core'

aPage({
  data: {
    image: 'https://tdesign.gtimg.com/mobile/demos/empty1.png',
    query: '',// 用来存储用户输入的查询词
    queryHistoryArr: [] as string[], // 搜索历史
    suggestions: [], // 联想词列表
    suggestionText: '', // 字段B
    showSuggestion: false, // 是否显示字段B
    suggestionLink: '',//链接
    suggestionMapping: [
    ],
    placeholders: ['汉服', '汉服运动', '北京'], // 定义多个底纹词
    // currentPlaceholder: '汉服运动', // 当前显示的底纹词
    currentPlaceholder: '',
    mockData: null, // 初始时mockData为空
    destRecs: {},//目的地的联想词
    generalRecs: [],//其他联想词的推荐
    currentTab: '',
    text: '',
    currentQuery: '', // 当前选中的 query
    currentText: '', // 当前选中的 text
    // currentTab: '' // 当前选中的 currentTab
    SuggestedSearches: [],
    placeholderWords: [
      {
        query: "搜索推荐词...",  // 初始值
        updated: false,
        text: "",
        currentTab: ""
      }
    ]
  },
  onLoad() {
    //热搜词
    this.startPlaceholderUpdateTimer(); // 启动定期更新定时器
    this.setDataFromGlobalData();
    this.setPlaceholderWord();
    const { data: queryHistoryArr } = my.getStorageSync({ key: 'queryHistory' }) as any
    this.setData({ queryHistoryArr: queryHistoryArr || [] })
    let that = this;
    // 调用云函数 
    wx.cloud.callFunction({
      name: 'suggestion', // 云函数名称
      success: function (res) {
        // 把获取到的数组赋值给页面数据中的mockData
        const result = res.result;
        console.log(result, 'result')
        that.setData({
          recommendations: result.recommendations,
          combinedArray: result.combinedArray,
          suggestionMapping: result.simpleArray
        });
      },
      fail: function (error) {
        console.error('Cloud function call failed: ', error);
      }
    });
    wx.cloud.callFunction({
      name: 'SuggestedSearches', // 云函数名称
      data: {
        queryHistoryArr
      },
      success: function (res) {
        // 把获取到的数组赋值给页面数据中的mockData
        const result = res.result;
        console.log(result, 'result111')
        that.setData({
          SuggestedSearches: result
        }, () => {
          that.refreshDiscoveries();
        });
      },
      fail: function (error) {
        console.error('Cloud function call failed: ', error);
      }
    });

  },
  setDataFromGlobalData() {
    const app = getApp<IAppOption>();
    this.setData({
      // queryHistoryArr: app.globalData.queryHistoryArr,
      placeholderWords: app.globalData.placeholderWords
    });
    // 打印完整的 placeholderWords
    console.log('页面加载时获得的 placeholderWords:', this.data.placeholderWords);
  },

  startPlaceholderUpdateTimer() {
    // 设置一个定时器，每隔 5 秒随机选择一个新的 placeholderWord
    setInterval(() => {
      this.setPlaceholderWord();
    }, 7000); // 每 5 秒更新一次
  }
,
  setPlaceholderWord() {
    const { placeholderWords } = this.data;
    if (Array.isArray(placeholderWords) && placeholderWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * placeholderWords.length);
      // this.setData({ placeholder: placeholderWords[randomIndex].text });
      // // 打印选中的 placeholder
      const selectedPlaceholder = placeholderWords[randomIndex];
      this.setData({
        placeholder: selectedPlaceholder.text,
        currentQuery: selectedPlaceholder.query, // 更新 currentQuery
        currentText: selectedPlaceholder.text, // 更新 currentText
        currentTab: selectedPlaceholder.currentTab, // 更新 currentTab
        currentPlaceholder: selectedPlaceholder.text
      });
    }
  },
  filterRecommendations(query) {
    const cityRecs = this.data.recommendations || [];
    const generalRecs = this.data.combinedArray || [];
    let filteredRecs = [];

    // 精准匹配城市名的推荐项
    const cityMatch = cityRecs.filter(rec => rec.query === query);
    // 其他联想推荐项
    const generalMatch = generalRecs.filter(rec => rec.text.includes(query));

    // 合并两个结果集
    filteredRecs = [...cityMatch, ...generalMatch];

    return filteredRecs;
  },
  // 转发好友
  onShareAppMessage() {
    const app = getApp(); // 获取全局应用实例

    const promise = new Promise(resolve => {
      app.generateShareInfo().then(shareInfo => {
        // 在这里处理生成的分享信息
        resolve(shareInfo);
      });
    });

    return {
      title: '九霞裾',
      path: '/pages/home', // 这个值会被 promise 里面的 pathWithArgs 覆盖
      promise
    };
  },
  //转发到朋友圈
  onShareTimeline: function () {
    return {
      title: '快来看看'
    }
  },
  onUnload() {
    // 清理定时器
    if (this.placeholderTimer) {
      clearInterval(this.placeholderTimer);
    }
  },
  // 当输入框值发生变化时，更新查询词，并获取联想词
  onInputChange: function (e) {
    const query = e.detail.value;
    this.setData({ query: query });
    if (query.trim()) {
      // this.getSuggestions(query);
      // 处理联想词的部分
      const suggestions = this.filterRecommendations(query);
      console.log(suggestions, 'suggestions')
      suggestions = suggestions.slice(0, 35);

      this.setData({ suggestions: suggestions });
    } else {
      // this.setData({ offlineSuggestions: [], onlineSuggestions: [] });
      this.setData({ suggestions: [] });
    }
    // 调用封装好的方法，设置字段B的显示逻辑
    this.checkAndShowSuggestion(query);
  },
  //清除query
  onClearSearch: function () {
    this.setData({
      query: '',
      showSuggestion: false,// 清除后设置建议不显示
      suggestions: ''
    }, () => {
      // 由于setData是异步操作，如果立刻获取可能还是旧值，所以在这个回调函数中打印确保是更新后的值
      console.log(this.data.showSuggestion); // 应该打印出 false
    });
  }
  ,
  // 处理点击推荐项
  onClickRecommendation: function (event) {
    const query = event.currentTarget.dataset.item.query;
    const currentTab = event.currentTarget.dataset.item.currentTab;
    const text = event.currentTarget.dataset.item.text;
    this.queryInfos(query, currentTab, text);
    // 这里可以处理点击事件，比如导航到相应的页面
  },
  //处理搜索发现
  refreshDiscoveries() {
    this.setData({
      displayDiscoveries: this.getRandomDiscoveries(this.data.SuggestedSearches)
    });
  },
  onClickDiscover(event) {
    const query = event.currentTarget.dataset.item.query;
    const currentTab = event.currentTarget.dataset.item.currentTab;
    const text = event.currentTarget.dataset.item.text;
    this.queryInfos(query, currentTab, text);
  },
  // 一个封装好的方法，用以设置建议的可见性和内容
  checkAndShowSuggestion: function (query) {
    const matchingItem = this.data.suggestionMapping.find(item => item.fieldA === query);
    if (matchingItem) {

      //在setData之前打印
      this.setData({
        suggestionText: matchingItem.fieldB,
        suggestionLink: matchingItem.link,
        showSuggestion: true
      });
    } else {
      //清除suggestion相关状态
      this.setData({
        showSuggestion: false,
        suggestionText: '',
        suggestionLink: ''
      });
    }
  },
  //跳转逻辑
  onSuggestionTap: function () {
    // 使用数据中保存的链接进行跳转
    const { suggestionLink } = this.data;
    if (suggestionLink) {
      my.navigateTo({ url: suggestionLink });
    }
  },
  //搜索逻辑，跳转页面并且传参
  queryInfos(query, currentTab = '0', text = '') {
    console.log('query:', query, 'currentTab:', currentTab, text);
    if (!text) {
      text = query;
    }
    my.navigateTo({
      url: `/pages/result/result?query=${encodeURIComponent(query)}&currentTab=${currentTab}&text=${encodeURIComponent(text)}`
    });
    // 通常搜索后分清联想词列表
    this.setData({ suggestions: [] });
    // 调用更新搜索历史的方法
    this.updateQueryHistory(query, currentTab, text)
  },
  handleSearch: function (query, currentTab, text) {
    // 检查输入(query)是否为空
    // if (!query) {
    //   // 如果query为空，则显示一个提示信息告知用户输入不能空
    //   my.alert({
    //     title: '提示',
    //     content: '请输入搜索关键词',
    //   });
    //   return;
    // }
    console.log(query,'query-配置的')
    // 在suggestionMapping数组中查找匹配项
    const matchingItem = this.data.suggestionMapping.find(item => item.fieldA === query);
    console.log(matchingItem,'matchingItem')
    if (matchingItem) {
      // 如果找到匹配项，导航到matchingItem指定的URL
      my.navigateTo({
        url: matchingItem.link
      });
    } else {
      // 如果没有找到匹配项，执行查询Infos逻辑显示搜索结果
      this.queryInfos(query, currentTab, text);
    }
    // 更新查询历史记录，可能会将query加入到某个存储搜索历史的数组
  },
  getRandomDiscoveries(discoveries) {
    // 假设我们获取5个随机的搜索发现
    const randomDiscoveries = [];
    const copyDiscoveries = [...discoveries];
    const count = Math.min(6, copyDiscoveries.length);

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * copyDiscoveries.length);
      randomDiscoveries.push(copyDiscoveries[randomIndex]);
      copyDiscoveries.splice(randomIndex, 1);  // 删除已经选中的元素，防止重复
    }
    return randomDiscoveries;
  },
  //提交按钮
  onSubmitSearch: function (e) {
    const query = e.detail.value.trim();
    const searchQuery = query || this.data.currentPlaceholder; // 如果 query 为空，使用默认占位符
    console.log('query',query)
    const currentTab=this.data.currentTab;
    const text=this.data.currentPlaceholder;
    // this.handleSearch(searchQuery,currentTab,text);
    if (query) {
      // 用户输入了 query，使用用户输入的值进行搜索
      this.handleSearch(searchQuery);
    } else {
      // 用户没有输入 query，使用 currentPlaceholder 并传递当前的 currentTab 和 currentText
      const query=this.data.currentQuery;
      this.handleSearch(query, currentTab, text);
      console.log(query,currentTab,text,'currentTab-onSubmitSearch')
    }

  },
  // 更新历史搜索记录
  updateQueryHistory(query, currentTab = 0, text = '') {
    console.log('updateQueryHistory:', query, currentTab, text); // 调试打印，确保参数接收
    if (!query) {
      return;
    }
    const queryHistoryArr = [...this.data.queryHistoryArr];
    const existingIndex = queryHistoryArr.findIndex(item => item.query === query);
    if (existingIndex !== -1) {
      queryHistoryArr.splice(existingIndex, 1);
    }
    // 当 currentTab 为默认值（没有值时），用 query 填充 text
    if (currentTab === '0') {
      text = query;
    }
    const app = getApp();
    const newItem = { query, currentTab, text };
    console.log('New History Item:', newItem); // 调试打印新增项
    const newLen = queryHistoryArr.unshift(newItem);
    if (newLen > 50) {
      queryHistoryArr.pop();
    }
    this.setData({ queryHistoryArr })
    app.globalData.queryHistoryArr = queryHistoryArr;
    my.setStorage({
      key: 'queryHistory',
      data: queryHistoryArr,
    })
  },
  //从历史记录里搜索
  onSearchHistory: function (e) {
    const item = e.currentTarget.dataset.item;
    // const tab = e.currentTarget.dataset.item.tab;
    console.log(item, 'item')
    const query = item.query;
    const currentTab = item.currentTab;
    const text = item.text;
    this.queryInfos(query, currentTab, text);
  },
  clearQueryHistory: function () {
    // 清除本地存储中的搜索历史记录
    my.removeStorageSync({ key: 'queryHistory' });
    // 更新 data 中的搜索历史状态，如果需要在页面上响应显示
    this.setData({
      queryHistoryArr: [] // 假设这是页面 data 中用来存储搜索历史的数组
    });

  },
})