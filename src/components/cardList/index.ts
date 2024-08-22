import { aComponent } from '@ali/mor-core'
aComponent({
    properties: {
        // 定义组件的属性
        config: {
            type: Object,
            value: {}
        },

        cardData: {
            type: Object,
            value: {},
            observer: function (newVal) {
                // 每次 `items` 变化时执行，这里可以处理逻辑
                if (!newVal.hasOwnProperty('processed')) {
                    this.setCardData(newVal);
                }
            }
        },
    },
    data: {
        formattedItem: {},
        displayedItems: {},
        infoValueStyle: '',
        swiperMaxHeight: '',
        imageClass: '',
    },
    observer: function () {

    },
    lifetimes: {
        attached() {
            // 组件实例进入页面节点树时触发
            // this.setCardData();
            this.printProps(); // 在组件布局完成后（含外层节点）打印 properties
        },

        detached() {
            // 当组件实例被从页面节点中移除时执行
            this.printProps(); // 在组件布局完成后（含外层节点）打印 properties
        }, ready() {
            // 假设这个生命周期表示渲染完成
            this.triggerEvent('renderComplete', { id: this.data.cardData._id });
        }
    },
    methods: {
        onCardTap: function (event) {
            // console.log(event, 'evu222en')
            const item = this.properties.cardData;
            this.triggerEvent('itemClick', item);
        },

        printProps() {
            // const { config, cardData, mappingRules } = this.properties;
            // console.log('Config:', config);
            // console.log('Card Data:', cardData);
            // console.log('Card mappingRules:', mappingRules);
        },
        // 定义组件的方法
        /**
 * 设置卡片数据，根据当前时间调整每个卡片的状态。
 * 此函数处理cardData数组，根据每个项的source属性和当前时间，
 * 更新其状态，并根据配置信息格式化卡片的其他属性。
 */
        setCardData() {
            // 解构获取cardData和config数据
            const { cardData, config } = this.properties;
            // 获取当前时间戳
            console.log(cardData,'cardData-cardData',config)
            const currentTime = Date.now();
            let processedData = { ...cardData };
            // 处理 activity_set 类型的 activityStatus 
            if (cardData.source === 'activity_set') {
                if (cardData.startTime && cardData.endTime) {
                    if (cardData.startTime > currentTime) {
                        processedData.activityStatus = "未开始";
                    } else if (cardData.endTime < currentTime) {
                        processedData.activityStatus = "已结束";
                    } else {
                        processedData.activityStatus = "进行中";
                    }
                } else {
                    console.warn("Missing startTime or endTime for activity_set item");
                }
            }
            const selectedConfig = config[cardData.source];
            // 格式化卡片项，包括标题、标志和信息
            const formattedItem = {
                title: cardData.title,
                images: cardData.images,
                info: config[cardData.source] ? this.processInfo(cardData, config[cardData.source]) : [],
                activityStatus: processedData.activityStatus,
                source: cardData.source,
                style: cardData.style,
                processed: true,
                imageClass: this.generateImageClass(selectedConfig.imageStyles.width || '100%'),
                _id: cardData._id,
                shouldNavigate: cardData.shouldNavigate
            };
            this.setData({
                infoValueStyle: this.generateInfoValueStyle(selectedConfig.infoValueStyles),
                swiperMaxHeight: selectedConfig.logoSwiper.maxHeight,// 使用默认高度，必要时可进行条件判断切换
            });
            // 如果是 activity_set 类型且有开始和结束时间，添加日期范围信息
            if (cardData.source === 'activity_set' && cardData.startTime && cardData.endTime) {
                const dateInfo = this.formatDateRange(cardData.startTime, cardData.endTime);
                formattedItem.info.push(dateInfo);
            }

            // 更新组件数据
            this.setData({
                processedInfo: formattedItem.info,
                cardData: formattedItem,
                formattedItem: formattedItem
            })
        },
        /**
         * 处理信息项，根据配置提取和格式化信息。
         * @param item 待处理的信息对象。
         * @param config 配置对象，包括需要提取的字段、显示策略、字段标签和样式。
         * @returns 返回一个格式化后的信息数组，每个元素包含字段的标签、值、是否显示标签、样式和值是否为数组等信息。
         */
        //对info区域进行处理
        processInfo(item, config = {}) {
            // 解构配置对象，默认值包括空数组和空对象。
            const { fields = [], displayValuesOnly = [], fieldLabels = {}, styles = {} } = config;
            const infoArray = [];

            fields.forEach(field => {
                // 检查字段在item中是否存在且不为空
                if (item.hasOwnProperty(field) && item[field] !== undefined && item[field] !== null) {
                    let fieldValue = item[field];
                    let label = fieldLabels[field] || "";
                    const displayLabel = !displayValuesOnly.includes(field);
                    // 根据字段和来源类型，处理富文本字段
                    if ((field === 'detail' && (item.source === 'activity_set' || item.source === 'knowledge_set')) ||
                        (field === 'article' && item.source === 'article')) {
                        fieldValue = this.getRitch(fieldValue); // 特殊处理富文本字段并截取前100个字符
                    }
                    // 合并默认样式和自定义样式
                    const defaultStyles = {
                        color: "#000", // 默认颜色
                        // backgroundColor: '#fff' // 默认背景颜色
                    };
                    const customStyles = styles[field] || {};
                    const combinedStyles = {
                        ...defaultStyles,
                        ...customStyles
                    };
                    // 特殊处理store字段
                    if (field === 'store') {
                        infoArray.push({
                            label: '店铺来源', // 设置特定的label
                            value: item.store.label, // 将原来的label值赋给value
                            displayLabel,
                            styles: this.convertStylesToString(combinedStyles),
                            isArray: false, // 假设店铺来源不是数组
                            icon: item.store.icon || '' // 添加icon字段，值为item.icon
                        });
                    } else {
                        // 添加处理后的字段信息到结果数组
                        infoArray.push({
                            label,
                            value: fieldValue,
                            displayLabel,
                            styles: this.convertStylesToString(combinedStyles),
                            isArray: Array.isArray(fieldValue) // 标记是否为数组
                        });
                    }
                }
            });
            return infoArray;
        },
        // 辅助函数: 将时间戳转换为格式化的日期字符串
        formatDateRange(startTime, endTime) {
            const startDate = new Date(startTime);
            const endDate = new Date(endTime);
            const formatDate = date =>
                `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            return {
                label: "日期",
                value: `${formatDate(startDate)}~${formatDate(endDate)}`,
                displayLabel: true,
                styles: {}
            };
        },
        // 辅助函数: 去除富文本的 HTML 标签并截取前100个字符
        getRitch(rich) {
            if (!rich) return '';
            const richClone = rich.replace(/<[^>]*>/g, '');
            return richClone.slice(0, 100); // 截取前100个字符
        }
        ,
        // 转换样式对象为字符串
        convertStylesToString(styles) {
            return Object.entries(styles).map(([key, value]) => {
                return `${key}: ${value}`;
            }).join(";");
        },
        generateInfoValueStyle(styleConfig) {
            return `
              -webkit-line-clamp: ${styleConfig.lineClamp || 3};
              line-height: ${styleConfig.lineHeight || '1.5em'};
              max-height: ${styleConfig.lineClamp ? parseFloat(styleConfig.lineHeight) * styleConfig.lineClamp + 'em' : '4.5em'};
            `;
        },
        generateImageClass: function (width) {

            switch (width) {
                case '100%':
                    return 'logo-image-100';
                case '70%':
                    return 'logo-image-70';
                default:
                    console.warn(`Unexpected image width: ${width}, falling back to 70%.`);
                    return 'logo-image-100';
            }
        },
        // 合并样式
        mergeStyles(baseStyle, additionalStyle) {
            return `${baseStyle} ${additionalStyle}`;
        }
    },
});
