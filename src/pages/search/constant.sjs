const articleKeyMap = {
  title: 'headline',
  src: 'image',
}

const knowledgeKeyMap = {
  title: 'style_name',
  src: 'pic_1',
}

const activityKeyMap = {
  title: 'name',
  src: 'cover',
}

const tabList = [
  {
    label: '综合',
    value: 'all',
    infoList: [],
  },
  {
    label: '实体店',
    value: '1',
    infoList: [],
  },
  {
    label: '网店',
    value: '2',
    infoList: [],
  },
  {
    label: '科普',
    value: '3',
    infoList: [],
  },
  {
    label: '活动',
    value: '4',
    infoList: [],
  },
  {
    label: '文章',
    value: '5',
    infoList: [],
  },
]

export default {
  activityKeyMap,
  knowledgeKeyMap,
  articleKeyMap,
  tabList,
}
