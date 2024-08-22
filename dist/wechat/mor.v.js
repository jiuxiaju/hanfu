var regeneratorRuntime;(wx["mor_modules"] = wx["mor_modules"] || []).push([["mor.v"],{

/***/ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js":
/*!************************************************************************!*\
  !*** ../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.utils = exports.aPlugin = void 0;
var core_1 = __webpack_require__(/*! @morjs/core */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/index.js");
__exportStar(__webpack_require__(/*! @morjs/core */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/index.js"), exports);
/**
 * 提供对 mor 1.x aPlugin 类调用的模拟
 * 允许覆盖 morInit 方法
 */
function aPluginClassLike(options) {
    var plugin = (0, core_1.createPlugin)(options);
    if (this instanceof exports.aPlugin) {
        // 保存继承 aPlugin 时对 morInit 的覆盖实现
        var customMorInit_1 = this.morInit;
        Object.assign(this, plugin);
        this.morInit = function (extend) {
            plugin.morInit.call(this, extend);
            if (customMorInit_1)
                customMorInit_1.call(this, extend);
        };
    }
    else {
        return plugin;
    }
}
// 用于支持继承后的 super.morInit 调用, 避免报错
aPluginClassLike.prototype.morInit = function () {
    /* noop */
};
/**
 * Mor 1.x 旧版兼容
 * aPlugin 插件类或方法
 */
exports.aPlugin = aPluginClassLike;
/**
 * Mor 1.x 旧版兼容
 * 用于支持不使用 createApp 时的初始化
 * @deprecated `utils.init` 将于 `@ali/mor-core@3.0` 版本中废弃, 请直接使用 `init`
 */
exports.utils = { init: core_1.init };
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js":
/*!******************************************************************!*\
  !*** ../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var tslib_1 = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
var api_1 = __webpack_require__(/*! ./api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/api.js");
tslib_1.__exportStar(__webpack_require__(/*! @morjs/runtime-base */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/index.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/api.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./moduleManager */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/moduleManager.js"), exports);
exports["default"] = api_1.mor;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/moduleManager.js":
/*!**************************************************************************!*\
  !*** ../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/moduleManager.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModuleManager = exports.ModuleTypes = void 0;
var runtime_base_1 = __webpack_require__(/*! @morjs/runtime-base */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/index.js");
var api_1 = __webpack_require__(/*! ./api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/api.js");
/**
 * 模块类型
 */
var ModuleTypes;
(function (ModuleTypes) {
    /**
     * 分包模块
     */
    ModuleTypes["SUBPACKAGE"] = "SUBPACKAGE";
    /**
     * 动态插件模块, 仅支付宝支持
     */
    ModuleTypes["DYNAMIC_PLUGIN"] = "DYNAMIC_PLUGIN";
    /**
     * 静态插件模块
     */
    ModuleTypes["STATIC_PLUGIN"] = "STATIC_PLUGIN";
})(ModuleTypes = exports.ModuleTypes || (exports.ModuleTypes = {}));
/**
 * 模块
 * 分包或插件
 */
var ModuleItem = /** @class */ (function () {
    function ModuleItem(module) {
        /**
         * 是否已载入
         * 载入代表已初始化
         */
        this.isLoaded = false;
        this.setOrUpdate(module);
    }
    ModuleItem.prototype.setOrUpdate = function (_a) {
        var name = _a.name, id = _a.id, type = _a.type, version = _a.version, routes = _a.routes, extend = _a.extend, instance = _a.instance, success = _a.success, fail = _a.fail;
        this.name = name;
        this.id = id;
        this.type = type;
        this.version = version;
        this.routes = routes;
        this.extend = extend;
        this.instance = instance;
        this.success = success;
        this.fail = fail;
    };
    return ModuleItem;
}());
/**
 * 模块管理
 * 用于 获取当前小程序中的插件、分包和模块等
 */
var ModuleManager = /** @class */ (function () {
    /**
     *
     * @param modules 模块信息
     */
    function ModuleManager(host, modules) {
        var _this = this;
        /**
         * Mor 插件初始化及能力注入
         */
        this.mountPlugin = function (module, identity) {
            var plugin = api_1.mor.requirePlugin(identity) || {};
            // es6 export default 兜底支持
            if (plugin && plugin.__esModule && plugin.default) {
                Object.assign(plugin, plugin.default);
            }
            // 检查是否为 mor 插件工程
            if (!(plugin === null || plugin === void 0 ? void 0 : plugin.$isMorPlugin)) {
                runtime_base_1.logger.error('mor.moduleManager.init', '目前只支持配置 mor 的插件');
                return;
            }
            module.instance = plugin;
            _this.mountModule(module);
        };
        this.host = host;
        if (modules === null || modules === void 0 ? void 0 : modules.length) {
            for (var _i = 0, modules_1 = modules; _i < modules_1.length; _i++) {
                var m = modules_1[_i];
                this.register(m);
            }
        }
    }
    /**
     * 获取 模块
     * @param name
     */
    ModuleManager.prototype.getModule = function (name) {
        return this.modules[name];
    };
    /**
     * 获取所有模块
     */
    ModuleManager.prototype.getAllModules = function () {
        var modules = [];
        for (var _i = 0, _a = Object.keys(this.modules); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            modules.push(this.modules[name_1]);
        }
        return modules;
    };
    /**
     * 注册模块
     * @param module 模块信息
     */
    ModuleManager.prototype.register = function (module) {
        if (!(module === null || module === void 0 ? void 0 : module.name)) {
            return runtime_base_1.logger.warn('模块注册失败, 原因: 缺少名称');
        }
        var moduleItem = this.modules[module.name];
        // 不重复初始化
        if (moduleItem == null) {
            moduleItem = new ModuleItem(module);
        }
        else {
            // 更新模块信息
            moduleItem.setOrUpdate(module);
        }
        return moduleItem;
    };
    /**
     * 检查模块是否已载入
     * @param moduleNameOrModule 模块名称 或 模块实例
     * @returns 是否已载入
     */
    ModuleManager.prototype.isLoaded = function (moduleNameOrModule) {
        var _a;
        if (moduleNameOrModule instanceof ModuleItem) {
            return moduleNameOrModule.isLoaded;
        }
        else {
            return ((_a = this.modules[moduleNameOrModule]) === null || _a === void 0 ? void 0 : _a.isLoaded) === true;
        }
    };
    /**
     * 初始化模块, 并注入宿主能力
     * @param modules - 模块信息
     */
    ModuleManager.prototype.init = function (modules) {
        var _this = this;
        modules = Array.isArray(modules)
            ? modules
            : modules == null
                ? []
                : [modules];
        if (modules === null || modules === void 0 ? void 0 : modules.length)
            return runtime_base_1.logger.warn('请传入需要初始化的分包或插件');
        modules.forEach(function (moduleInfo) {
            var module = _this.register(moduleInfo);
            // 未注册成功, 通常是缺少
            if (!module)
                return;
            // 前置检查, 仅 支付宝小程序 支持动态插件
            if (module.type === ModuleTypes.DYNAMIC_PLUGIN &&
                (0, runtime_base_1.getEnv)() !== runtime_base_1.ENV_TYPE.ALIPAY) {
                return runtime_base_1.logger.error("\u76EE\u524D\u4EC5\u652F\u4ED8\u5B9D\u652F\u6301\u52A8\u6001\u63D2\u4EF6, \u63D2\u4EF6\u540D\u79F0: ".concat(module.name));
            }
            var isDynamicPlugin = module.type === ModuleTypes.DYNAMIC_PLUGIN;
            // 支持插件调用方感知调用成功, 仅针对动态插件调用
            // isInit 用于标记是否是第一次初始化
            var onPluginLoaded = function (isInit) {
                if (!isDynamicPlugin)
                    return;
                if (typeof module.success === 'function')
                    module.success(isInit);
            };
            // 支持插件调用方感知调用失败, 仅针对动态插件调用
            var onPluginFailed = function (error) {
                if (!isDynamicPlugin)
                    return;
                if (typeof module.fail === 'function')
                    module.fail(error);
            };
            // 如果插件已成功载入, 则不需要跳过后续步骤, 避免多次初始化
            // 动态插件直接触发 success 回调
            if (_this.isLoaded(module.name))
                return onPluginLoaded(false);
            var global = (0, runtime_base_1.getGlobalObject)();
            // 动态插件初始化
            // 仅适用于 支付宝且非 IDE 的情况下
            if (isDynamicPlugin &&
                (global === null || global === void 0 ? void 0 : global.canIuse) &&
                global.canIuse('plugin.dynamic') &&
                !global.isIDE) {
                try {
                    global.loadPlugin({
                        plugin: "".concat(module.id, "@").concat(module.version),
                        success: function () {
                            _this.mountPlugin(module, "dynamic-plugin://".concat(module.id));
                            onPluginLoaded(true);
                        },
                        fail: function (err) {
                            onPluginFailed(err);
                        }
                    });
                }
                catch (error) {
                    onPluginFailed(error);
                }
            }
            else {
                if (module.type === ModuleTypes.STATIC_PLUGIN) {
                    // 静态插件初始化
                    _this.mountPlugin(module, module.name);
                }
                else {
                    _this.mountModule(module);
                }
            }
        });
    };
    /**
     * 标记模块为已加载
     */
    ModuleManager.prototype.markModuleAsLoaded = function (module) {
        if (module)
            module.isLoaded = true;
    };
    /**
     * 模块
     * @param module 模块
     * @param extend 拓展能力信息
     */
    ModuleManager.prototype.mountModule = function (module) {
        var _a, _b, _c;
        this.markModuleAsLoaded(module);
        // mor 旧版兼容
        if (((_a = module === null || module === void 0 ? void 0 : module.instance) === null || _a === void 0 ? void 0 : _a.internalInit) && ((_b = this.host) === null || _b === void 0 ? void 0 : _b.$event)) {
            module.instance.internalInit({ $event: this.host.$event });
        }
        // 宿主能力注入
        if (((_c = module === null || module === void 0 ? void 0 : module.instance) === null || _c === void 0 ? void 0 : _c.morInit) && (module === null || module === void 0 ? void 0 : module.extend)) {
            module.instance.morInit(module.extend);
        }
    };
    return ModuleManager;
}());
exports.ModuleManager = ModuleManager;
//# sourceMappingURL=moduleManager.js.map

/***/ }),

/***/ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/index.js":
/*!********************************************************************!*\
  !*** ../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/index.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init = exports.wPageToComponent = exports.aPageToComponent = exports.PageToComponent = exports.wPlugin = exports.aPlugin = exports.createPlugin = exports.enhancePage = exports.createPage = exports.registerComponentAdapters = exports.wComponent = exports.aComponent = exports.enhanceComponent = exports.createComponent = exports.registerPageAdapters = exports.wPage = exports.aPage = exports.registerAppAdapters = exports.wApp = exports.aApp = exports.createApp = void 0;
var app_1 = __webpack_require__(/*! ./app */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/app.js");
Object.defineProperty(exports, "aApp", ({ enumerable: true, get: function () { return app_1.aApp; } }));
Object.defineProperty(exports, "createApp", ({ enumerable: true, get: function () { return app_1.createApp; } }));
Object.defineProperty(exports, "registerAppAdapters", ({ enumerable: true, get: function () { return app_1.registerAppAdapters; } }));
Object.defineProperty(exports, "wApp", ({ enumerable: true, get: function () { return app_1.wApp; } }));
var component_1 = __webpack_require__(/*! ./component */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/component.js");
Object.defineProperty(exports, "aComponent", ({ enumerable: true, get: function () { return component_1.aComponent; } }));
Object.defineProperty(exports, "createComponent", ({ enumerable: true, get: function () { return component_1.createComponent; } }));
Object.defineProperty(exports, "enhanceComponent", ({ enumerable: true, get: function () { return component_1.enhanceComponent; } }));
Object.defineProperty(exports, "registerComponentAdapters", ({ enumerable: true, get: function () { return component_1.registerComponentAdapters; } }));
Object.defineProperty(exports, "wComponent", ({ enumerable: true, get: function () { return component_1.wComponent; } }));
var page_1 = __webpack_require__(/*! ./page */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/page.js");
Object.defineProperty(exports, "aPage", ({ enumerable: true, get: function () { return page_1.aPage; } }));
Object.defineProperty(exports, "createPage", ({ enumerable: true, get: function () { return page_1.createPage; } }));
Object.defineProperty(exports, "enhancePage", ({ enumerable: true, get: function () { return page_1.enhancePage; } }));
Object.defineProperty(exports, "registerPageAdapters", ({ enumerable: true, get: function () { return page_1.registerPageAdapters; } }));
Object.defineProperty(exports, "wPage", ({ enumerable: true, get: function () { return page_1.wPage; } }));
var pageToComponent_1 = __webpack_require__(/*! ./pageToComponent */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/pageToComponent.js");
Object.defineProperty(exports, "aPageToComponent", ({ enumerable: true, get: function () { return pageToComponent_1.aPageToComponent; } }));
Object.defineProperty(exports, "PageToComponent", ({ enumerable: true, get: function () { return pageToComponent_1.PageToComponent; } }));
Object.defineProperty(exports, "wPageToComponent", ({ enumerable: true, get: function () { return pageToComponent_1.wPageToComponent; } }));
var plugin_1 = __webpack_require__(/*! ./plugin */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/plugin.js");
Object.defineProperty(exports, "aPlugin", ({ enumerable: true, get: function () { return plugin_1.aPlugin; } }));
Object.defineProperty(exports, "createPlugin", ({ enumerable: true, get: function () { return plugin_1.createPlugin; } }));
Object.defineProperty(exports, "wPlugin", ({ enumerable: true, get: function () { return plugin_1.wPlugin; } }));
var init_1 = __webpack_require__(/*! ./utils/init */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/init.js");
Object.defineProperty(exports, "init", ({ enumerable: true, get: function () { return init_1.init; } }));
__webpack_require__(/*! ./utils/polyfill */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/polyfill.js");
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/pageToComponent.js":
/*!******************************************************************************!*\
  !*** ../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/pageToComponent.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.wPageToComponent = exports.aPageToComponent = exports.PageToComponent = void 0;
var api_1 = __webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js");
var component_1 = __webpack_require__(/*! ./component */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/component.js");
var page_1 = __webpack_require__(/*! ./page */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/page.js");
var invokeOriginalFunction_1 = __webpack_require__(/*! ./utils/invokeOriginalFunction */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/invokeOriginalFunction.js");
var COMPONENT_LIFETIME_MAPPINGS = {
    onLoad: (_a = {},
        _a[api_1.SOURCE_TYPE.ALIPAY] = 'onInit',
        _a[api_1.SOURCE_TYPE.WECHAT] = 'attached',
        _a),
    onReady: (_b = {},
        _b[api_1.SOURCE_TYPE.ALIPAY] = 'didMount',
        _b[api_1.SOURCE_TYPE.WECHAT] = 'ready',
        _b),
    onUnload: (_c = {},
        _c[api_1.SOURCE_TYPE.ALIPAY] = 'didUnmount',
        _c[api_1.SOURCE_TYPE.WECHAT] = 'detached',
        _c)
};
var COMPONENT_PAGE_LIFETIME_MAPPINGS = {
    onShow: 'show',
    onHide: 'hide',
    onResize: 'resize'
};
/**
 * 将页面作为组件使用, 仅供特殊场景下的使用
 * 不保证完全的兼容性
 *
 * 转换页面配置为组件配置
 *
 * @param pageOptions - 页面配置
 * @param sourceType - 源码类型
 * @param features - 功能配置
 * @returns 组件配置
 */
function PageToComponent(pageOptions, sourceType, features) {
    var _a;
    if (features === void 0) { features = {}; }
    // 页面增强（含转端逻辑）
    var opts = (0, page_1.enhancePage)(pageOptions, sourceType);
    // 直接透传的属性
    var data = opts.data || {};
    var observers = opts.observers || {};
    // 需要插入到 this 的数据
    var thisData = {};
    // 组件方法
    var methods = {};
    // 组件生命周期
    var lifetimes = {};
    // 页面生命周期
    var pageLifetimes = {};
    var isAlipaySource = sourceType === api_1.SOURCE_TYPE.ALIPAY;
    // 兼容支付宝
    if (isAlipaySource && typeof ((_a = opts === null || opts === void 0 ? void 0 : opts.events) === null || _a === void 0 ? void 0 : _a.onResize) === 'function') {
        pageLifetimes['resize'] = opts.events.onResize;
        // 其他事件组件不支持, 直接移除
        delete opts.events;
    }
    // 遍历每一个属性逐个分配
    for (var key in opts) {
        var value = opts[key];
        if (key === 'data')
            continue;
        if (key === 'observers')
            continue;
        if (key === 'methods') {
            Object.assign(methods, value || {});
            continue;
        }
        if (key === 'pageLifetimes') {
            Object.assign(pageLifetimes, value || {});
            continue;
        }
        if (key === 'lifetimes') {
            Object.assign(lifetimes, value || {});
            continue;
        }
        if (typeof value === 'function') {
            switch (key) {
                // 组件生命周期对齐
                case 'onLoad':
                case 'onReady':
                case 'onUnload':
                    lifetimes[COMPONENT_LIFETIME_MAPPINGS[key][sourceType]] = value;
                    break;
                // 页面生命周期对齐
                case 'onShow':
                case 'onHide':
                case 'onResize':
                    pageLifetimes[COMPONENT_PAGE_LIFETIME_MAPPINGS[key]] = value;
                    break;
                // 支付宝或微信原生组件生命周期
                case 'onInit':
                case 'didMount':
                case 'didUnmount':
                case 'created':
                case 'attached':
                case 'ready':
                case 'detached':
                    lifetimes[key] = value;
                    break;
                // 其他函数配置为方法
                default:
                    methods[key] = value;
                    break;
            }
        }
        // 其他属性直接添加到 thisData
        else {
            thisData[key] = value;
        }
    }
    // 转换出来的组件
    var componentOptions = {
        data: data,
        observers: observers,
        methods: methods,
        pageLifetimes: pageLifetimes
    };
    // 合并 lifetimes
    Object.assign(componentOptions, lifetimes);
    // 注入 thisData 到 组件 this 上下文中
    function injectThisData() {
        Object.assign(this, thisData);
    }
    // 挂载 thisData
    var hookByLifetime = isAlipaySource ? 'onInit' : 'created';
    componentOptions[hookByLifetime] = (0, api_1.compose)([
        injectThisData,
        (0, invokeOriginalFunction_1.invokeOriginalFunction)(hookByLifetime, componentOptions)
    ]);
    // 组件增强（含转端逻辑）
    return (0, component_1.enhanceComponent)(componentOptions, sourceType, {
        // 默认为 false
        invokeComponentHooks: features.invokeComponentHooks == null
            ? false
            : features.invokeComponentHooks
    });
}
exports.PageToComponent = PageToComponent;
/**
 * 支付宝 Page 转组件辅助函数
 * @param options - 小程序页面配置
 * @param features - 功能开关
 * @returns 返回组件配置
 */
function aPageToComponent(options, features) {
    if (features === void 0) { features = {}; }
    return PageToComponent(options, api_1.SOURCE_TYPE.ALIPAY, features);
}
exports.aPageToComponent = aPageToComponent;
/**
 * 微信 Page 页面转组件辅助函数
 * @param options - 小程序页面配置
 * @param features - 功能开关
 * @returns 返回组件配置
 */
function wPageToComponent(options, features) {
    if (features === void 0) { features = {}; }
    return PageToComponent(options, api_1.SOURCE_TYPE.WECHAT, features);
}
exports.wPageToComponent = wPageToComponent;
//# sourceMappingURL=pageToComponent.js.map

/***/ }),

/***/ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/plugin.js":
/*!*********************************************************************!*\
  !*** ../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/plugin.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.wPlugin = exports.aPlugin = exports.createPlugin = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
var api_1 = __webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js");
/**
 * 插件构造函数
 * @param options - 插件选项
 * @param options.getApp - 插件使用的 getApp 构造函数
 * @returns Mor 小程序插件对象 (用于和宿主小程序交换数据或能力)
 */
function createPlugin(pluginOptions) {
    var getApp = (pluginOptions || {}).getApp;
    if (typeof getApp === 'undefined') {
        api_1.logger.error('插件入口必须传 getApp');
        return;
    }
    delete pluginOptions.getApp;
    var app = getApp();
    var plugin = tslib_1.__assign(tslib_1.__assign({ getApp: getApp, $isMorPlugin: true }, pluginOptions), { internalInit: function (options) {
            var $hostEvent = (options !== null && options !== void 0 ? options : {}).$event;
            // 宿主的 event
            if (!this.$hostEvent && $hostEvent) {
                this.$hostEvent = $hostEvent;
                var app_1 = this.getApp();
                app_1.$hostEvent = $hostEvent;
            }
        }, morInit: function (extend) {
            var app = this.getApp();
            if (!app.$host)
                app.$host = {};
            Object.keys(extend).forEach(function (name) {
                app.$host[name] = extend[name];
            });
        } });
    if (app.$event)
        plugin.$pluginEvent = app.$event;
    return plugin;
}
exports.createPlugin = createPlugin;
/**
 * 支付宝插件构造函数
 */
function aPlugin() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return createPlugin.apply(void 0, args);
}
exports.aPlugin = aPlugin;
/**
 * 微信插件构造函数
 */
function wPlugin() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return createPlugin.apply(void 0, args);
}
exports.wPlugin = wPlugin;
//# sourceMappingURL=plugin.js.map

/***/ }),

/***/ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/plugins/contextPlugin.js":
/*!************************************************************************************!*\
  !*** ../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/plugins/contextPlugin.js ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContextPlugin = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
var api_1 = __webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js");
/**
 * context 插件
 */
var ContextPlugin = /** @class */ (function () {
    function ContextPlugin() {
        var _this = this;
        this.pluginName = 'MorContextPlugin';
        this.apply = function (hooks) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var $plugin = _this;
            hooks.appOnInit.tap(_this.pluginName, function (appOptions) {
                if (appOptions.$context) {
                    api_1.logger.error($plugin.pluginName, '请去除业务代码中的对 $context 的赋值，防止出现不可预知的问题。');
                }
            });
            hooks.appOnLaunch.tap(_this.pluginName, function (options) {
                var query = tslib_1.__assign({}, ((options === null || options === void 0 ? void 0 : options.query) || {}));
                this.$context = { appQuery: query };
            });
            hooks.pageOnInit.tap(_this.pluginName, function (pageOptions) {
                if (pageOptions.$context) {
                    api_1.logger.error($plugin.pluginName, '请去除业务代码中的对 $context 的赋值，防止出现不可预知的问题。');
                }
            });
            hooks.pageOnLoad.tap(_this.pluginName, function (query) {
                var _a, _b;
                var appQuery = {};
                if (typeof getApp !== 'undefined' && ((_a = getApp()) === null || _a === void 0 ? void 0 : _a.$context)) {
                    appQuery = ((_b = getApp().$context) === null || _b === void 0 ? void 0 : _b.appQuery) || {};
                }
                this.$context = {
                    pageQuery: query,
                    appQuery: appQuery
                };
            });
        };
    }
    return ContextPlugin;
}());
exports.ContextPlugin = ContextPlugin;
//# sourceMappingURL=contextPlugin.js.map

/***/ }),

/***/ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/plugins/eventPlugin.js":
/*!**********************************************************************************!*\
  !*** ../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/plugins/eventPlugin.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventPlugin = void 0;
var api_1 = __webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js");
// 默认 event 使用标记
var IS_DEFAULT_EVENT_USED = false;
/**
 * event 插件
 */
var EventPlugin = /** @class */ (function () {
    function EventPlugin() {
        var _this = this;
        this.pluginName = 'MorEventPlugin';
        this.apply = function (hooks) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var $plugin = _this;
            // 优先使用全局 event
            var $event = IS_DEFAULT_EVENT_USED
                ? (0, api_1.createEvent)('createByMorEventPlugin')
                : api_1.event;
            IS_DEFAULT_EVENT_USED = true;
            // app 注入 $event
            hooks.appOnInit.tap(_this.pluginName, function (appOptions) {
                if (appOptions.$event) {
                    api_1.logger.error($plugin.pluginName, '请去除业务代码中的对 $event 的赋值，防止出现不可预知的问题。');
                }
                appOptions.$event = $event;
            });
            // 由于存在非 createApp 初始化的情况，appOnLaunch 的时候补偿加一下
            hooks.appOnLaunch.tap(_this.pluginName, function () {
                if (!this.$event)
                    this.$event = $event;
            });
            // 页面注入 $event
            hooks.pageOnInit.tap(_this.pluginName, function (pageOptions) {
                if (pageOptions.$event) {
                    api_1.logger.error($plugin.pluginName, '请去除业务代码中的对 $event 的赋值，防止出现不可预知的问题。');
                }
                pageOptions.$event = $event;
            });
        };
    }
    return EventPlugin;
}());
exports.EventPlugin = EventPlugin;
//# sourceMappingURL=eventPlugin.js.map

/***/ }),

/***/ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/constants.js":
/*!******************************************************************************!*\
  !*** ../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/constants.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.APP_ON_HIDE_EVENT = exports.APP_ON_SHOW_EVENT = exports.MOR_EVENT_METHOD_PREFIX = exports.MOR_EVENT_PREFIX = void 0;
/**
 * mor 事件名称前缀
 */
exports.MOR_EVENT_PREFIX = '$mor:';
/**
 * mor 注入的事件方法前缀
 */
exports.MOR_EVENT_METHOD_PREFIX = "".concat(exports.MOR_EVENT_PREFIX, "event:");
/**
 * 监听 app 事件名称
 */
exports.APP_ON_SHOW_EVENT = "".concat(exports.MOR_EVENT_PREFIX, "appOnShow");
exports.APP_ON_HIDE_EVENT = "".concat(exports.MOR_EVENT_PREFIX, "appOnHide");
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/init.js":
/*!*************************************************************************!*\
  !*** ../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/init.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init = void 0;
var api_1 = __webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js");
var contextPlugin_1 = __webpack_require__(/*! ../plugins/contextPlugin */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/plugins/contextPlugin.js");
var eventPlugin_1 = __webpack_require__(/*! ../plugins/eventPlugin */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/plugins/eventPlugin.js");
var IS_DEFAULT_HOOKS_USED = false;
/**
 * 初始化, 创建 $hooks 及应用 solutions
 * @param solution 解决方案
 */
function init(solution) {
    var solutions = [
        function () {
            return {
                plugins: [new eventPlugin_1.EventPlugin(), new contextPlugin_1.ContextPlugin()]
            };
        }
    ].concat((0, api_1.asArray)(solution));
    var $hooks = IS_DEFAULT_HOOKS_USED
        ? (0, api_1.createHooks)('initWithSolutions')
        : api_1.hooks;
    IS_DEFAULT_HOOKS_USED = true;
    var pluginsNames = (0, api_1.applySolutions)($hooks, solutions);
    return {
        $hooks: $hooks,
        pluginsNames: pluginsNames
    };
}
exports.init = init;
//# sourceMappingURL=init.js.map

/***/ }),

/***/ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/invokeHook.js":
/*!*******************************************************************************!*\
  !*** ../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/invokeHook.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.invokeHook = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
var api_1 = __webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js");
/**
 * 调用 hook
 * @param hookName hook 名字
 */
var invokeHook = function (hookName) {
    return function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var hook = (_a = (0, api_1.getSharedProperty)('$morHooks', this)) === null || _a === void 0 ? void 0 : _a[hookName];
        if (typeof (hook === null || hook === void 0 ? void 0 : hook.call) === 'function') {
            hook.call.apply(hook, tslib_1.__spreadArray([this], args, false));
        }
        else {
            api_1.logger.error("".concat(hookName, " \u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684 hook"));
        }
    };
};
exports.invokeHook = invokeHook;
//# sourceMappingURL=invokeHook.js.map

/***/ }),

/***/ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/invokeOriginalFunction.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/invokeOriginalFunction.js ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.invokeOriginalFunction = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
/**
 * 调用原本的生命周期函数
 * @param fnName 事件名
 * @param obj 事件方法来源
 * @param shouldDeleteProperty 是否移除属性, 一些生命周期函数需要保存后并移除, 以避免重复触发
 */
var invokeOriginalFunction = function (fnName, obj, shouldDeleteProperty) {
    if (shouldDeleteProperty === void 0) { shouldDeleteProperty = false; }
    var originalFn = obj[fnName];
    if (shouldDeleteProperty && obj && fnName && fnName in obj) {
        delete obj[fnName];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (originalFn && typeof originalFn === 'function') {
            return originalFn.call.apply(originalFn, tslib_1.__spreadArray([this], args, false));
        }
    };
};
exports.invokeOriginalFunction = invokeOriginalFunction;
//# sourceMappingURL=invokeOriginalFunction.js.map

/***/ }),

/***/ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/isPromise.js":
/*!******************************************************************************!*\
  !*** ../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/isPromise.js ***!
  \******************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isPromise = void 0;
function isPromise(obj) {
    return (!!obj &&
        (typeof obj === 'object' || typeof obj === 'function') &&
        typeof obj.then === 'function');
}
exports.isPromise = isPromise;
//# sourceMappingURL=isPromise.js.map

/***/ }),

/***/ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/polyfill.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/polyfill.js ***!
  \*****************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var api_1 = __webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js");
(function morPolyfill() {
    try {
        Promise.prototype.finally =
            Promise.prototype.finally ||
                function morPolyfillPromiseFinally(onFinally) {
                    var isFunction = typeof onFinally === 'function';
                    return this.then(isFunction
                        ? function (value) {
                            return Promise.resolve(onFinally()).then(function () {
                                return value;
                            });
                        }
                        : onFinally, isFunction
                        ? function (reason) {
                            return Promise.resolve(onFinally()).then(function () {
                                throw reason;
                            });
                        }
                        : onFinally);
                };
    }
    catch (err) {
        api_1.logger.error('polyfill', err);
    }
})();
//# sourceMappingURL=polyfill.js.map

/***/ }),

/***/ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/api.js":
/*!****************************************************************!*\
  !*** ../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/api.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init = exports.registerFactory = exports.mor = exports.createApi = void 0;
var runtime_base_1 = __webpack_require__(/*! @morjs/runtime-base */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/index.js");
// 跨端支持的接口运行时引用注入位置, '' 空字符串是为了防止该注释被移除
// prettier-ignore
var apiTargetRuntime = __webpack_require__(/*! ../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/wechat/apis.js */ "../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/wechat/apis.js");
var apiSourceRuntime = __webpack_require__(/*! ../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/alipay/apisToOther.js */ "../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/alipay/apisToOther.js");
/**
 * 初始化 Mor API
 * 默认会自动初始化一个全局的 mor api
 * @example
 * 自定义 api 初始化并覆盖默认 mor api
 * createApi([adapters]).override()
 * @param adapters - 初始化 选项
 * @param adapters[x].initApi - 初始化接口方法, 接受 apiOptions 作为参数
 * @param options - 初始化选项, 默认为 {}
 * @returns Mor API
 */
function createApi(adapters, options) {
    if (options === void 0) { options = {}; }
    // global 小程序全局对象，如微信的 wx，支付宝的 my
    var global = (0, runtime_base_1.getGlobalObject)();
    var apiOptions = {};
    apiOptions.global = global;
    apiOptions.env = global.env || {};
    apiOptions.getApp =
        typeof getApp === 'function' ? getApp : (0, runtime_base_1.markAsUnsupport)('getApp');
    apiOptions.getCurrentPages =
        typeof getCurrentPages === 'function'
            ? getCurrentPages
            : (0, runtime_base_1.markAsUnsupport)('getCurrentPages');
    apiOptions.requirePlugin =
        typeof requirePlugin === 'function'
            ? requirePlugin
            : (0, runtime_base_1.markAsUnsupport)('requirePlugin');
    apiOptions.getEnv = runtime_base_1.getEnv;
    // 跨端支持的接口运行时调用注入位置, '' 空字符串是为了防止该注释被移除
    // prettier-ignore
    apiTargetRuntime.initApi(apiOptions);
apiSourceRuntime.initApi(apiOptions);
    // 转端适配会自动注入 转端 API 兼容性支持
    // 这里依赖 apiOptions 名称, 如修改会导致 apiOptions 不存在
    // targetAdapter.initApi(apiOptions)
    // sourceAdapter.initApi(apiOptions)
    // 执行 apiOptions 适配器初始化
    if (adapters === null || adapters === void 0 ? void 0 : adapters.length) {
        adapters.forEach(function (adapter) {
            if (typeof (adapter === null || adapter === void 0 ? void 0 : adapter.initApi) === 'function') {
                adapter.initApi(apiOptions, options || {});
            }
            else {
                runtime_base_1.logger.error("adapter.initApi \u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570, \u8BF7\u68C0\u67E5");
            }
        });
    }
    // 添加全局剩余的 apiOptions (不覆盖已有的接口)
    (0, runtime_base_1.transformApis)(apiOptions, global, {
        needPromisfiedApis: [],
        apiTransformConfig: {}
    }, true, false);
    // 添加全局事件支持, 仅当缺少事件支持时添加
    if (!apiOptions.on) {
        apiOptions.on = function (type, handler) {
            runtime_base_1.event.on.call(runtime_base_1.event, type, handler);
        };
    }
    if (!apiOptions.emit) {
        apiOptions.emit = function (type, e) {
            runtime_base_1.event.emit.call(runtime_base_1.event, type, e);
        };
    }
    // 覆盖默认的 mor apiOptions 实例
    apiOptions.override = function () {
        if (apiOptions === mor)
            return;
        Object.assign(mor, apiOptions);
        return mor;
    };
    return apiOptions;
}
exports.createApi = createApi;
/**
 * 初始化 mor 接口
 */
var mor = createApi();
exports.mor = mor;
/**
 * 工厂函数存储对象
 */
var FACTORIES = {};
/**
 * 注册接口初始化工厂函数
 * @param factoryName - 接口初始化工厂函数名称
 * @param factoryFunction - 接口初始化工厂函数
 */
function registerFactory(factoryName, factoryFunction) {
    FACTORIES[factoryName] = factoryFunction;
}
exports.registerFactory = registerFactory;
/**
 * 初始化一个新的 mor api 实例
 * @param options - 选项
 * @returns 新的 mor api 实例
 */
function init(options) {
    var newMor = Object.assign({}, mor);
    for (var _i = 0, _a = Object.keys(FACTORIES); _i < _a.length; _i++) {
        var factoryName = _a[_i];
        FACTORIES[factoryName].call(newMor, options);
        runtime_base_1.logger.debug('mor api factory', "".concat(factoryName, " \u521D\u59CB\u5316\u5B8C\u6210"));
    }
    return newMor;
}
exports.init = init;
//# sourceMappingURL=api.js.map

/***/ }),

/***/ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/app.js":
/*!******************************************************************!*\
  !*** ../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/app.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.wApp = exports.aApp = exports.registerAppAdapters = exports.createApp = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
var api_1 = __webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js");
var constants_1 = __webpack_require__(/*! ./utils/constants */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/constants.js");
var init_1 = __webpack_require__(/*! ./utils/init */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/init.js");
var invokeOriginalFunction_1 = __webpack_require__(/*! ./utils/invokeOriginalFunction */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/invokeOriginalFunction.js");
// 跨端支持的应用运行时引用注入位置, '' 空字符串是为了防止该注释被移除
// prettier-ignore
;
// 转端适配器
var APP_ADAPTERS = [];
// 初始化标记
var IS_INITIALIZED = false;
// 全局应用事件
var APP_EVENT_MAPPINGS = {
    onPageNotFound: 'appOnPageNotFound',
    onUnhandledRejection: 'appOnUnhandledRejection'
};
/**
 * 注入 app 生命周期 hook
 * @param appOptions 小程序 app 初始化 options
 */
function hookAppLifeCycle(appOptions) {
    var _a, _b, _c;
    /**
     * 调用 hook
     * @param hookName hook名字
     */
    var invokeHook = function (hookName) {
        return function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            (_a = this.$morHooks[hookName]).call.apply(_a, tslib_1.__spreadArray([this], args, false));
        };
    };
    /**
     * 调用事件通知
     * @param eventName 事件标识
     */
    var invokeEvent = function (eventName) {
        return function (arg) {
            if (this.$event) {
                this.$event.emit("".concat(constants_1.MOR_EVENT_PREFIX).concat(eventName), arg);
            }
        };
    };
    appOptions.onLaunch = (0, api_1.compose)([
        invokeHook('appOnLaunch'),
        (0, invokeOriginalFunction_1.invokeOriginalFunction)('onLaunch', appOptions)
    ]);
    appOptions.onShow = (0, api_1.compose)([
        invokeHook('appOnShow'),
        (0, invokeOriginalFunction_1.invokeOriginalFunction)('onShow', appOptions),
        invokeEvent('appOnShow')
    ]);
    appOptions.onHide = (0, api_1.compose)([
        invokeHook('appOnHide'),
        (0, invokeOriginalFunction_1.invokeOriginalFunction)('onHide', appOptions),
        invokeEvent('appOnHide')
    ]);
    appOptions.onError = (0, api_1.compose)([
        invokeHook('appOnError'),
        (0, invokeOriginalFunction_1.invokeOriginalFunction)('onError', appOptions)
    ]);
    // 这里的事件可能会改变小程序本身的行为, 故这里单独处理
    for (var eventName in APP_EVENT_MAPPINGS) {
        var hookName = APP_EVENT_MAPPINGS[eventName];
        if (hookName &&
            (appOptions[eventName] || ((_c = (_b = (_a = appOptions.$morHooks) === null || _a === void 0 ? void 0 : _a[hookName]) === null || _b === void 0 ? void 0 : _b.isUsed) === null || _c === void 0 ? void 0 : _c.call(_b)))) {
            appOptions[eventName] = (0, api_1.compose)([
                invokeHook(hookName),
                (0, invokeOriginalFunction_1.invokeOriginalFunction)(eventName, appOptions)
            ]);
        }
    }
}
/**
 * 注册 App
 */
function createApp(options, 
/**
 * 运行时 Solution 支持
 */
solution, 
/**
 * 拓展参数
 */
extend) {
    api_1.logger.time('createApp-init');
    // 配置 globalApp 的时候不检查多实例的问题
    // 原因： 允许插件或分包工程使用模拟 App
    //       这种情况下一个小程序会出现多个 App 初始化
    if (!(extend === null || extend === void 0 ? void 0 : extend.globalApp)) {
        if (IS_INITIALIZED) {
            api_1.logger.error('App 有且只能执行一次!');
            return;
        }
        else {
            IS_INITIALIZED = true;
        }
    }
    var appOptions = tslib_1.__assign({}, options);
    api_1.logger.time('app-init-solution');
    var _a = (0, init_1.init)(solution), $hooks = _a.$hooks, pluginsNames = _a.pluginsNames;
    api_1.logger.timeEnd('app-init-solution');
    if (extend === null || extend === void 0 ? void 0 : extend.onHooksCreated) {
        if (typeof extend.onHooksCreated !== 'function') {
            api_1.logger.error('onHooksCreated 必须是函数, 请检查 App 的 extends 配置');
            return;
        }
        extend.onHooksCreated($hooks);
    }
    // 添加到 App 实例中
    appOptions.$morHooks = $hooks;
    appOptions.$morPluginsNames = pluginsNames;
    // 触发 appOnConstruct hook, 兼容旧版本当 appOnConstruct 不存在时用 appOnInit 兜底
    var appOnConstruct = $hooks.appOnConstruct || $hooks.appOnInit;
    appOnConstruct.call(appOptions, appOptions);
    // 生命周期 hook
    api_1.logger.time('app-hook-lifetimes');
    hookAppLifeCycle(appOptions);
    api_1.logger.timeEnd('app-hook-lifetimes');
    // 跨端支持的应用运行时调用注入位置, '' 空字符串是为了防止该注释被移除
    // prettier-ignore
    ;
    // 执行 app 适配器初始化
    if (APP_ADAPTERS === null || APP_ADAPTERS === void 0 ? void 0 : APP_ADAPTERS.length) {
        APP_ADAPTERS.forEach(function (adapter) {
            if (typeof (adapter === null || adapter === void 0 ? void 0 : adapter.initApp) === 'function') {
                adapter.initApp(appOptions);
            }
            else {
                api_1.logger.error("adapter.initApp \u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570, \u8BF7\u68C0\u67E5");
            }
        });
    }
    api_1.logger.timeEnd('app-init');
    // 使用 extend.globalApp 替代 App
    // 用于 插件和分包模式下的 App 构造函数模拟
    if (extend === null || extend === void 0 ? void 0 : extend.globalApp) {
        if (typeof extend.globalApp !== 'function') {
            api_1.logger.error('globalApp 必须是函数, 请检查 App 的 extends 配置');
            return;
        }
        return extend.globalApp(appOptions);
    }
    else {
        return App(appOptions);
    }
}
exports.createApp = createApp;
/**
 * 注册应用转端适配器
 * @param adapters - 应用转端适配器
 */
function registerAppAdapters(adapters) {
    APP_ADAPTERS.push.apply(APP_ADAPTERS, (0, api_1.asArray)(adapters));
}
exports.registerAppAdapters = registerAppAdapters;
/**
 * 注册支付宝小程序 App
 */
exports.aApp = createApp;
/**
 * 注册微信小程序 App
 */
exports.wApp = createApp;
//# sourceMappingURL=app.js.map

/***/ }),

/***/ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/component.js":
/*!************************************************************************!*\
  !*** ../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/component.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.wComponent = exports.aComponent = exports.registerComponentAdapters = exports.createComponent = exports.enhanceComponent = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
var api_1 = __webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js");
var constants_1 = __webpack_require__(/*! ./utils/constants */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/constants.js");
var invokeHook_1 = __webpack_require__(/*! ./utils/invokeHook */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/invokeHook.js");
var invokeOriginalFunction_1 = __webpack_require__(/*! ./utils/invokeOriginalFunction */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/invokeOriginalFunction.js");
// 跨端支持的组件运行时引用注入位置, '' 空字符串是为了防止该注释被移除
// prettier-ignore
var componentSourceRuntime = __webpack_require__(/*! ../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/alipay/componentToOther.js */ "../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/alipay/componentToOther.js");
// 转端适配器
var COMPONENT_ADAPTERS = [];
// eslint-disable-next-line @typescript-eslint/no-empty-function
var emptyFn = function () { };
/**
 * hook 组件生命周期
 */
function hookComponentLifeCycle(componentOptions, needsToHookPageLifetimes, sourceType, invokeComponentHooks) {
    if (invokeComponentHooks === void 0) { invokeComponentHooks = true; }
    var isAlipaySource = sourceType === api_1.SOURCE_TYPE.ALIPAY;
    /**
     * 设置基础信息
     */
    var makeBaseInfo = function () {
        if (!this.$morId)
            this.$morId = String((0, api_1.generateId)());
    };
    /**
     * 做 pageLifetimes 的事件绑定
     * @param this 当前组件实例
     */
    var registerPageLifetimes = function () {
        var _a;
        // 这里检查 getCurrentPages 是否存在，防止导致整个应用崩溃
        // 目的是部分小程序页面转 H5 时，缺少完整的小程序 runtime polyfill 而直接报错
        if (typeof getCurrentPages === 'undefined') {
            api_1.logger.error('未发现 getCurrentPages 方法, 无法自动获取当前页面实例, pageLifetimes 相关事件注册失败');
            return;
        }
        var $event = (0, api_1.getSharedProperty)('$event', this);
        var allPages = getCurrentPages() || [];
        // 在当前组件中保存 所在页面的标记
        var pageFlag = (this.$morCurrentPageFlag =
            (_a = allPages[allPages.length - 1]) === null || _a === void 0 ? void 0 : _a.$morPageFlag);
        if (!pageFlag || !$event) {
            api_1.logger.warn('当前运行环境缺乏 $event 或 $morPageFlag 支持, ' +
                '请检查页面是否采用了 createPage/aPage/wPage 以及 App 是否初始化正确');
            return;
        }
        // 避免不重复添加
        if (this.$morPageLifetimesIsHooked)
            return;
        this.$morPageOnShow = this.$morPageOnShow.bind(this);
        this.$morPageOnHide = this.$morPageOnHide.bind(this);
        this.$morPageOnResize = this.$morPageOnResize.bind(this);
        $event.once("$mor:pageOnReady:".concat(pageFlag), this.$morPageOnShow);
        $event.on("$mor:pageOnShow:".concat(pageFlag), this.$morPageOnShow);
        $event.on("$mor:pageOnHide:".concat(pageFlag), this.$morPageOnHide);
        $event.on("$mor:pageOnResize:".concat(pageFlag), this.$morPageOnResize);
        this.$morPageLifetimesIsHooked = true;
    };
    /**
     * 去除pageLifetime的事件绑定
     */
    var unregisterPageLifetimes = function () {
        var $event = (0, api_1.getSharedProperty)('$event', this);
        if (!$event)
            return;
        if (!this.$morCurrentPageFlag)
            return;
        var pageFlag = this.$morCurrentPageFlag;
        $event.off("$mor:pageOnReady:".concat(pageFlag), this.$morPageOnShow);
        $event.off("$mor:pageOnShow:".concat(pageFlag), this.$morPageOnShow);
        $event.off("$mor:pageOnHide:".concat(pageFlag), this.$morPageOnHide);
        $event.off("$mor:pageOnResize:".concat(pageFlag), this.$morPageOnResize);
    };
    /**
     * 增加 $eventListener 事件绑定
     * @param this 当前组件实例
     */
    var addEventListeners = function () {
        var _this = this;
        var _a, _b;
        var $event = (0, api_1.getSharedProperty)('$event', this);
        if (!$event)
            return;
        if (!((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.$morEventListenerNames) === null || _b === void 0 ? void 0 : _b.length))
            return;
        // 在当前组件实例中添加 事件
        this.data.$morEventListenerNames.forEach(function (eventName) {
            var morEventName = "".concat(constants_1.MOR_EVENT_METHOD_PREFIX).concat(eventName);
            _this[morEventName] = _this[morEventName].bind(_this);
            $event.on(eventName, _this[morEventName]);
        });
    };
    /**
     * 去除 $eventListener 事件绑定
     */
    var removeEventListeners = function () {
        var _this = this;
        var _a, _b;
        var $event = (0, api_1.getSharedProperty)('$event', this);
        if (!$event)
            return;
        if (!((_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.$morEventListenerNames) === null || _b === void 0 ? void 0 : _b.length))
            return;
        this.data.$morEventListenerNames.forEach(function (eventName) {
            var morEventName = "".concat(constants_1.MOR_EVENT_METHOD_PREFIX).concat(eventName);
            $event.off(eventName, _this[morEventName]);
        });
    };
    var lifetimes = isAlipaySource
        ? componentOptions
        : componentOptions.lifetimes;
    // 支付宝 DSL 支持
    if (isAlipaySource) {
        // onInit
        lifetimes.onInit = (0, api_1.compose)([
            needsToHookPageLifetimes ? registerPageLifetimes : emptyFn,
            invokeComponentHooks ? (0, invokeHook_1.invokeHook)('componentOnInit') : emptyFn,
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('onInit', lifetimes)
        ]);
        // didMount
        componentOptions.didMount = (0, api_1.compose)([
            needsToHookPageLifetimes ? registerPageLifetimes : emptyFn,
            makeBaseInfo,
            invokeComponentHooks ? (0, invokeHook_1.invokeHook)('componentDidMount') : emptyFn,
            addEventListeners,
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('didMount', lifetimes)
        ]);
        // didUnmount
        componentOptions.didUnmount = (0, api_1.compose)([
            needsToHookPageLifetimes ? unregisterPageLifetimes : emptyFn,
            invokeComponentHooks ? (0, invokeHook_1.invokeHook)('componentDidUnmount') : emptyFn,
            removeEventListeners,
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('didUnmount', componentOptions)
        ]);
        // onError
        componentOptions.onError = (0, api_1.compose)([
            invokeComponentHooks ? (0, invokeHook_1.invokeHook)('componentOnError') : emptyFn,
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('onError', componentOptions)
        ]);
    }
    // 微信 DSL 支持
    else {
        // created
        lifetimes.created = (0, api_1.compose)([
            needsToHookPageLifetimes ? registerPageLifetimes : emptyFn,
            invokeComponentHooks ? (0, invokeHook_1.invokeHook)('componentOnCreated') : emptyFn,
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('created', lifetimes)
        ]);
        // attached
        lifetimes.attached = (0, api_1.compose)([
            needsToHookPageLifetimes ? registerPageLifetimes : emptyFn,
            makeBaseInfo,
            invokeComponentHooks ? (0, invokeHook_1.invokeHook)('componentOnAttached') : emptyFn,
            addEventListeners,
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('attached', lifetimes)
        ]);
        // detached
        lifetimes.detached = (0, api_1.compose)([
            needsToHookPageLifetimes ? unregisterPageLifetimes : emptyFn,
            invokeComponentHooks ? (0, invokeHook_1.invokeHook)('componentOnDetached') : emptyFn,
            removeEventListeners,
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('detached', lifetimes)
        ]);
        // error
        lifetimes.error = (0, api_1.compose)([
            invokeComponentHooks ? (0, invokeHook_1.invokeHook)('componentOnError') : emptyFn,
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('error', lifetimes)
        ]);
    }
}
/**
 * 增加 pageLifetimes 的相关方法注入
 */
function hookPageLifetimes(componentOptions, needsToHookPageLifetimes) {
    if (!needsToHookPageLifetimes)
        return;
    var pageLifetimes = componentOptions.pageLifetimes || {};
    var originalPageOnShow = pageLifetimes.show;
    componentOptions.methods.$morPageOnShow = function () {
        if (originalPageOnShow) {
            originalPageOnShow.call(this);
        }
    };
    var originalPageOnHide = pageLifetimes.hide;
    componentOptions.methods.$morPageOnHide = function () {
        if (originalPageOnHide) {
            originalPageOnHide.call(this);
        }
    };
    var originalPageOnResize = pageLifetimes.resize;
    componentOptions.methods.$morPageOnResize = function () {
        if (originalPageOnResize) {
            originalPageOnResize.call(this);
        }
    };
    delete componentOptions.pageLifetimes;
}
/**
 * 注入 $eventListener 中对应的方法
 */
function hookEventListener(componentOptions) {
    if (componentOptions.$eventListener) {
        var eventNames = Object.keys(componentOptions.$eventListener);
        var data = componentOptions.data;
        data.$morEventListenerNames = eventNames;
        eventNames.forEach(function (eventName) {
            var morEventName = "".concat(constants_1.MOR_EVENT_METHOD_PREFIX).concat(eventName);
            componentOptions.methods[morEventName] =
                componentOptions.$eventListener[eventName];
        });
    }
}
/**
 * 确保自定义组件选项中必要的值存在
 */
function ensureDataAndMethodsAndLifetimes(options, sourceType) {
    if (!options.methods)
        options.methods = {};
    if (!options.data)
        options.data = {};
    if (!options.lifetimes)
        options.lifetimes = {};
    // 如果 微信DSL
    if (sourceType === api_1.SOURCE_TYPE.WECHAT) {
        // 微信中 lifetimes 中的优先级高于 options 中的方法
        var created = options.lifetimes.created || options.created;
        delete options.created;
        options.lifetimes.created = created;
        var attached = options.lifetimes.attached || options.attached;
        delete options.attached;
        options.lifetimes.attached = attached;
        var ready = options.lifetimes.ready || options.ready;
        delete options.ready;
        options.lifetimes.ready = ready;
        var moved = options.lifetimes.moved || options.moved;
        delete options.moved;
        options.lifetimes.moved = moved;
        var detached = options.lifetimes.detached || options.detached;
        delete options.detached;
        options.lifetimes.detached = detached;
        var error = options.lifetimes.error || options.error;
        delete options.error;
        options.lifetimes.error = error;
    }
}
// 支付宝小程序运行环境
var isAlipayTarget = (0, api_1.getEnv)() === api_1.ENV_TYPE.ALIPAY ||
    (0, api_1.getEnv)() === api_1.ENV_TYPE.DINGDING ||
    (0, api_1.getEnv)() === api_1.ENV_TYPE.TAOBAO;
var WECHAT_COMPONENT_LIFETIMES_METHODS = [
    'created',
    'attached',
    'ready',
    'moved',
    'detached',
    'error'
];
/**
 * 支付宝基础库 2.8.5 (2022-12-29) 起新增 lifetimes 定义段，
 * 支持 created、attached 等组件节点树维度的生命周期函数
 */
var ALIPAY_COMPONENT_LIFETIMES_METHODS = [
    'onInit',
    'deriveDataFromProps',
    'didMount',
    'didUpdate',
    'didUnmount',
    'onError'
].concat(WECHAT_COMPONENT_LIFETIMES_METHODS);
function getComponentLifetimesMethods(sourceType) {
    return sourceType === api_1.SOURCE_TYPE.WECHAT
        ? WECHAT_COMPONENT_LIFETIMES_METHODS
        : ALIPAY_COMPONENT_LIFETIMES_METHODS;
}
/**
 * 处理 mixins 或 behaviors
 *  - 声明周期方法会进行合并
 *  - methods 会使用最后声明的
 *  - 数据 会进行合并
 * @param componentOptions - Component 参数
 * @param mixinType - mixin 类型, 用于区分 mixin 和 behavior
 * @param sourceType - 源码类型
 */
function processMixinsOrBehaviors(componentOptions, mixinType, sourceType) {
    var _a;
    if (!((_a = componentOptions === null || componentOptions === void 0 ? void 0 : componentOptions[mixinType]) === null || _a === void 0 ? void 0 : _a.length))
        return;
    var mixins = componentOptions[mixinType];
    delete componentOptions[mixinType];
    var lifetimesFunctions = {};
    var componentLifetimesMethods = getComponentLifetimesMethods(sourceType);
    // 合并 mixins
    function processMixins(mixins, 
    // 是否是组件的直接 mixins
    isComponentDirectMixins) {
        return mixins.reduce(function (prev, curr) {
            var _a;
            if (typeof curr !== 'object') {
                api_1.logger.error("\u65E0\u6548\u7684 ".concat(mixinType, ": "), curr, '已跳过');
                return prev;
            }
            var result = tslib_1.__assign({}, prev);
            if (mixinType === 'behaviors') {
                // 如果是组件直接使用的 behaviors
                // 需要执行 definitionFilter 方法
                if (isComponentDirectMixins && curr.definitionFilter) {
                    curr.definitionFilter(componentOptions);
                }
                // 处理 内嵌 behaviors
                if ((_a = curr === null || curr === void 0 ? void 0 : curr[mixinType]) === null || _a === void 0 ? void 0 : _a.length) {
                    var childMixins = curr === null || curr === void 0 ? void 0 : curr[mixinType];
                    delete curr[mixinType];
                    result = processMixins(tslib_1.__spreadArray([result], childMixins, true), false);
                }
            }
            // 合并 lifetimes, lifetimes 中的函数优先级高
            var current = tslib_1.__assign(tslib_1.__assign({}, curr), (curr.lifetimes || {}));
            Object.keys(current).forEach(function (name) {
                // 不处理 定义段函数
                if (name === 'definitionFilter')
                    return;
                // 合并 数据
                // 如 props/properties/data/methods
                if (typeof current[name] === 'object') {
                    result[name] = tslib_1.__assign(tslib_1.__assign({}, result[name]), current[name]);
                }
                // 合并 方法
                else if (typeof current[name] === 'function') {
                    var isLifetimeFn = componentLifetimesMethods.indexOf(name) !== -1;
                    if (isLifetimeFn) {
                        lifetimesFunctions[name] = lifetimesFunctions[name] || [];
                        lifetimesFunctions[name].push(current[name]);
                    }
                    // 非 lifetime method 只生效最后一个
                    else {
                        if (typeof result[name] === 'function') {
                            api_1.logger.warn("".concat(mixinType, " \u4E2D\u91CD\u590D\u5B9A\u4E49\u65B9\u6CD5, \u5C06\u751F\u6548\u6700\u540E\u58F0\u660E\u7684"), name);
                        }
                        result[name] = current[name];
                    }
                }
                // 其他的 赋值
                else {
                    result[name] = current[name];
                }
            });
            return result;
        }, {});
    }
    var merged = processMixins(mixins, true);
    // 合并普通数据或方法
    Object.keys(merged).forEach(function (name) {
        if (name in componentOptions) {
            if (typeof merged[name] === 'object') {
                var currType = typeof componentOptions[name];
                if (currType !== 'object') {
                    api_1.logger.warn("".concat(name, " \u5728 ").concat(mixinType, " \u4E2D\u5B9A\u4E49\u4E3A object, \u4F46\u662F\u5728\u5F53\u524D Component \u4E3A").concat(currType));
                    return;
                }
                componentOptions[name] = tslib_1.__assign(tslib_1.__assign({}, merged[name]), componentOptions[name]);
            }
        }
        else {
            componentOptions[name] = merged[name];
        }
    });
    // 合并 生命周期 函数
    Object.keys(lifetimesFunctions).forEach(function (name) {
        var _a;
        var originalFn = ((_a = componentOptions === null || componentOptions === void 0 ? void 0 : componentOptions.lifetimes) === null || _a === void 0 ? void 0 : _a[name]) || componentOptions[name];
        componentOptions[name] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            try {
                for (var _a = 0, _b = lifetimesFunctions[name]; _a < _b.length; _a++) {
                    var fn = _b[_a];
                    fn.call.apply(fn, tslib_1.__spreadArray([this], args, false));
                }
            }
            catch (err) {
                api_1.logger.error("".concat(mixinType, " \u51FD\u6570 ").concat(name, " \u62A5\u9519"), err);
            }
            if (originalFn)
                originalFn.call.apply(originalFn, tslib_1.__spreadArray([this], args, false));
        };
        componentOptions.lifetimes[name] = componentOptions[name];
    });
}
/**
 * 增强 Component 组件
 * @param options - 小程序组件配置
 * @param sourceType - 小程序组件源码类型, 编译时由 Mor 自动填充
 * @param features - 功能特性配置
 */
function enhanceComponent(options, sourceType, features) {
    if (features === void 0) { features = {}; }
    api_1.logger.time('component-init');
    if (!sourceType) {
        api_1.logger.warn("createComponent \u7F3A\u5C11 sourceType \u53EF\u80FD\u4F1A\u5BFC\u81F4\u5C0F\u7A0B\u5E8F\u7EC4\u4EF6\u521D\u59CB\u5316\u9519\u8BEF");
    }
    var componentOptions = tslib_1.__assign({}, options);
    var $morHooks = (0, api_1.getSharedProperty)('$morHooks', options);
    if (!$morHooks) {
        api_1.logger.warn('createComponent 依赖于 $morHooks 的初始化, 请检查配置');
        return componentOptions;
    }
    // 确保 data 属性 和 methods 属性
    ensureDataAndMethodsAndLifetimes(componentOptions, sourceType);
    // 处理 mixins
    processMixinsOrBehaviors(componentOptions, 'mixins', sourceType);
    // 仅非支付宝DSL且目标为支付宝小程序运行环境需要处理 behaviors
    if (sourceType === api_1.SOURCE_TYPE.WECHAT && isAlipayTarget) {
        processMixinsOrBehaviors(componentOptions, 'behaviors', sourceType);
    }
    // 触发 onConstruct, 兼容旧版本当 componentOnConstruct 不存在时用 componentOnInit 兜底
    if (features.invokeComponentHooks !== false) {
        var componentOnConstruct = $morHooks.componentOnConstruct || $morHooks.componentOnInit;
        componentOnConstruct.call(componentOptions, componentOptions);
    }
    // 是否需要添加 页面生命周期 支持，目前仅 支付宝及支付宝相关小程序运行环境 下需要
    var needsToHookPageLifetimes = componentOptions.pageLifetimes && isAlipayTarget;
    // 添加 生命周期 hook
    hookComponentLifeCycle(componentOptions, needsToHookPageLifetimes, sourceType, features.invokeComponentHooks !== false);
    // 添加 页面生命周期监听
    hookPageLifetimes(componentOptions, needsToHookPageLifetimes);
    // 添加 $eventListener 支持
    hookEventListener(componentOptions);
    // 跨端支持的组件运行时调用注入位置, '' 空字符串是为了防止该注释被移除
    // prettier-ignore
    'a' === sourceType && componentSourceRuntime.initComponent(componentOptions);
    // 执行 component 适配器初始化
    if (COMPONENT_ADAPTERS === null || COMPONENT_ADAPTERS === void 0 ? void 0 : COMPONENT_ADAPTERS.length) {
        COMPONENT_ADAPTERS.forEach(function (adapter) {
            if (typeof (adapter === null || adapter === void 0 ? void 0 : adapter.initComponent) === 'function') {
                adapter.initComponent(componentOptions);
            }
            else {
                api_1.logger.error("adapter.initComponent \u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570, \u8BF7\u68C0\u67E5");
            }
        });
    }
    api_1.logger.timeEnd('component-init');
    return componentOptions;
}
exports.enhanceComponent = enhanceComponent;
/**
 * Component 组件注册
 * @param options - 小程序组件配置
 * @param sourceType - 小程序组件源码类型, 编译时由 Mor 自动填充
 */
function createComponent(options, sourceType) {
    api_1.logger.time('component-init');
    var componentOptions = enhanceComponent(options, sourceType);
    api_1.logger.timeEnd('component-init');
    return Component(componentOptions);
}
exports.createComponent = createComponent;
/**
 * 注册组件转端适配器
 * @param adapters - 组件转端适配器
 */
function registerComponentAdapters(adapters) {
    COMPONENT_ADAPTERS.push.apply(COMPONENT_ADAPTERS, (0, api_1.asArray)(adapters));
}
exports.registerComponentAdapters = registerComponentAdapters;
/**
 * 支付宝 Component 组件注册
 * @param options - 小程序组件配置
 */
function aComponent(options) {
    return createComponent(options, api_1.SOURCE_TYPE.ALIPAY);
}
exports.aComponent = aComponent;
/**
 * 微信 Component 组件注册
 * @param options - 小程序组件配置
 */
function wComponent(options) {
    return createComponent(options, api_1.SOURCE_TYPE.WECHAT);
}
exports.wComponent = wComponent;
//# sourceMappingURL=component.js.map

/***/ }),

/***/ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/page.js":
/*!*******************************************************************!*\
  !*** ../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/page.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.wPage = exports.aPage = exports.registerPageAdapters = exports.createPage = exports.enhancePage = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
var api_1 = __webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js");
var constants_1 = __webpack_require__(/*! ./utils/constants */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/constants.js");
var invokeHook_1 = __webpack_require__(/*! ./utils/invokeHook */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/invokeHook.js");
var invokeOriginalFunction_1 = __webpack_require__(/*! ./utils/invokeOriginalFunction */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/invokeOriginalFunction.js");
var isPromise_1 = __webpack_require__(/*! ./utils/isPromise */ "../node_modules/_@morjs_core@1.0.69@@morjs/core/lib/utils/isPromise.js");
// 跨端支持的页面运行时引用注入位置, '' 空字符串是为了防止该注释被移除
// prettier-ignore
var pageSourceRuntime = __webpack_require__(/*! ../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/alipay/pageToOther.js */ "../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/alipay/pageToOther.js");
// 转端适配器
var PAGE_ADAPTERS = [];
/**
 * 处理 Page 的生命周期
 */
function hookPageLifeCycle(pageOptions, sourceType) {
    /**
     * 增加 appLifetimes 的事件监听
     *
     * 使用方法如下:
     * ```
     * createPage({
     *   appLifetimes: {
     *     show() {}
     *     hide() {}
     *   }
     * })
     * ```
     */
    var registerAppLifetimes = function () {
        var appLifetimes = this.appLifetimes;
        if (!appLifetimes)
            return;
        var $event = (0, api_1.getSharedProperty)('$event', this);
        if (!$event) {
            return api_1.logger.warn('createPage 中 appLifetimes 的运行依赖 $event，请检查配置');
        }
        // app show 支持
        if (appLifetimes.show) {
            if (typeof appLifetimes.show === 'function') {
                appLifetimes.show = appLifetimes.show.bind(this);
                $event.on(constants_1.APP_ON_SHOW_EVENT, appLifetimes.show);
            }
            else {
                api_1.logger.warn('appLifetimes 的 show 方法必须是 function');
            }
        }
        // app hide 支持
        if (appLifetimes.hide) {
            if (typeof appLifetimes.hide === 'function') {
                appLifetimes.hide = appLifetimes.hide.bind(this);
                $event.on(constants_1.APP_ON_HIDE_EVENT, appLifetimes.hide);
            }
            else {
                api_1.logger.warn('appLifetimes 的 hide 方法必须是 function');
            }
        }
    };
    /**
     * 取消 appLifetimes 的事件监听
     */
    var unregisterAppLifetimes = function () {
        var appLifetimes = this.appLifetimes;
        if (!appLifetimes)
            return;
        var $event = (0, api_1.getSharedProperty)('$event', this);
        if (!$event)
            return;
        if (appLifetimes.show)
            $event.off(constants_1.APP_ON_SHOW_EVENT, appLifetimes.show);
        if (appLifetimes.hide)
            $event.off(constants_1.APP_ON_HIDE_EVENT, appLifetimes.hide);
    };
    /**
     * 调用事件通知
     * @param eventName 事件标识
     */
    var invokeEvent = function (eventName) {
        return function (arg) {
            var $event = (0, api_1.getSharedProperty)('$event', this);
            if ($event && this.$morPageFlag) {
                $event.emit("$mor:".concat(eventName, ":").concat(this.$morPageFlag), arg);
            }
        };
    };
    /**
     * 增加 $eventListener 的事件监听
     */
    var addEventListeners = function () {
        var _this = this;
        var eventListener = this.$eventListener;
        if (!eventListener)
            return;
        var $event = (0, api_1.getSharedProperty)('$event', this);
        Object.keys(eventListener).forEach(function (eventName) {
            /**
             * 事件需要 bind this，否则实例并非一致
             * 事件如果绑定在 $eventListener 对象上，而非直接在 this 对象上
             * 会有隐藏 bug，导致 appx 底层框架在事件内调用 setData 时判断失效
             */
            _this["".concat(constants_1.MOR_EVENT_METHOD_PREFIX).concat(eventName)] =
                eventListener[eventName].bind(_this);
            $event.on(eventName, _this["".concat(constants_1.MOR_EVENT_METHOD_PREFIX).concat(eventName)]);
        });
    };
    /**
     * 去除 $eventListener 的事件监听
     */
    var removeEventListeners = function () {
        var _this = this;
        var eventListener = this.$eventListener;
        if (!eventListener)
            return;
        var $event = (0, api_1.getSharedProperty)('$event', this);
        Object.keys(eventListener).forEach(function (eventName) {
            $event.off(eventName, _this["".concat(constants_1.MOR_EVENT_METHOD_PREFIX).concat(eventName)]);
        });
    };
    /**
     *  确保必要的标示存在
     */
    var ensureViewIdExistance = function () {
        if (!('$viewId' in this))
            this.$viewId = (0, api_1.generateId)();
        this.$morPageFlag = String(this.$viewId);
    };
    pageOptions.onLoad = (0, api_1.compose)([
        ensureViewIdExistance,
        (0, invokeHook_1.invokeHook)('pageOnLoad'),
        addEventListeners,
        (0, invokeOriginalFunction_1.invokeOriginalFunction)('onLoad', pageOptions),
        registerAppLifetimes
    ]);
    pageOptions.onReady = (0, api_1.compose)([
        (0, invokeHook_1.invokeHook)('pageOnReady'),
        (0, invokeOriginalFunction_1.invokeOriginalFunction)('onReady', pageOptions),
        invokeEvent('pageOnReady')
    ]);
    pageOptions.onShow = (0, api_1.compose)([
        (0, invokeHook_1.invokeHook)('pageOnShow'),
        (0, invokeOriginalFunction_1.invokeOriginalFunction)('onShow', pageOptions),
        invokeEvent('pageOnShow')
    ]);
    pageOptions.onHide = (0, api_1.compose)([
        (0, invokeHook_1.invokeHook)('pageOnHide'),
        (0, invokeOriginalFunction_1.invokeOriginalFunction)('onHide', pageOptions),
        invokeEvent('pageOnHide')
    ]);
    pageOptions.onUnload = (0, api_1.compose)([
        (0, invokeHook_1.invokeHook)('pageOnUnload'),
        removeEventListeners,
        (0, invokeOriginalFunction_1.invokeOriginalFunction)('onUnload', pageOptions),
        unregisterAppLifetimes
    ]);
    // resize 支持
    // 区分支付宝和微信的 onResize 支持
    if (sourceType === api_1.SOURCE_TYPE.ALIPAY) {
        pageOptions.events = pageOptions.events || {};
        var events = pageOptions.events;
        events.onResize = (0, api_1.compose)([
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('onResize', pageOptions.events),
            invokeEvent('pageOnResize')
        ]);
    }
    else {
        pageOptions.onResize = (0, api_1.compose)([
            (0, invokeOriginalFunction_1.invokeOriginalFunction)('onResize', pageOptions),
            invokeEvent('pageOnResize')
        ]);
    }
}
// 通用
var PAGE_METHOD_NAMES = {
    onLoad: {},
    onShow: {},
    onHide: {},
    onReady: {},
    onUnload: {},
    onPullDownRefresh: {},
    onReachBottom: {},
    /**
     * 支付宝和微信表现不同
     * - 支付宝支持 promise, 这里直接对 promise 的结果进行合并
     * - 微信通过 { promise } 来获取异步结果, 且 3s 自动超时使用缺省内容, 这里仅做对象合并
     */
    onShareAppMessage: {
        r: function (previous, current) {
            if (previous == null)
                return current;
            if (current == null)
                return previous;
            if ((0, isPromise_1.isPromise)(previous) || (0, isPromise_1.isPromise)(current)) {
                return Promise.resolve(previous).then(function (p) {
                    return Promise.resolve(current).then(function (c) {
                        if (p == null)
                            return c;
                        if (c == null)
                            return p;
                        return tslib_1.__assign(tslib_1.__assign({}, p), c);
                    });
                });
            }
            else {
                return tslib_1.__assign(tslib_1.__assign({}, previous), current);
            }
        }
    },
    onPageScroll: {}
};
// 微信小程序
var WECHAT_METHOD_NAMES = tslib_1.__assign(tslib_1.__assign({}, PAGE_METHOD_NAMES), { onShareTimeline: {
        r: function (previous, current) {
            if (previous == null)
                return current;
            if (current == null)
                return previous;
            return tslib_1.__assign(tslib_1.__assign({}, previous), current);
        }
    }, onResize: {}, onAddToFavorites: {} });
// 支付宝小程序
var ALIPAY_METHOD_NAMES = tslib_1.__assign(tslib_1.__assign({}, PAGE_METHOD_NAMES), { onTitleClick: {}, onOptionMenuClick: {}, onPopMenuClick: {}, onPullIntercept: {}, onTabItemTap: {} });
function getPageMethodNames(sourceType) {
    return sourceType === api_1.SOURCE_TYPE.WECHAT
        ? WECHAT_METHOD_NAMES
        : ALIPAY_METHOD_NAMES;
}
/**
 * 实现 createPage 的 mixins 机制
 * @param pageOptions
 */
function processMixins(pageOptions, sourceType) {
    var _a;
    if (!((_a = pageOptions === null || pageOptions === void 0 ? void 0 : pageOptions.mixins) === null || _a === void 0 ? void 0 : _a.length))
        return;
    var pageMethodNames = getPageMethodNames(sourceType);
    var mixins = pageOptions.mixins;
    delete pageOptions.mixins;
    var protoFns = {};
    var merged = mixins.reduce(function (prev, curr) {
        if (typeof curr !== 'object') {
            api_1.logger.error('无效的 mixin: ', curr, '已跳过');
            return prev;
        }
        var result = tslib_1.__assign({}, prev);
        Object.keys(curr).forEach(function (name) {
            // 合并 数据
            if (typeof curr[name] === 'object') {
                result[name] = tslib_1.__assign(tslib_1.__assign({}, result[name]), curr[name]);
            }
            // 合并 方法
            else if (typeof curr[name] === 'function') {
                var isProtoFn = name in pageMethodNames;
                if (isProtoFn) {
                    protoFns[name] = protoFns[name] || [];
                    protoFns[name].push(curr[name]);
                }
                // 非 proto method 只生效最后一个
                else {
                    if (typeof result[name] === 'function') {
                        api_1.logger.warn('mixins 中重复定义方法，将生效最后声明的', name);
                    }
                    result[name] = curr[name];
                }
            }
            // 其他的 赋值
            else {
                result[name] = curr[name];
            }
        });
        return result;
    }, {});
    Object.keys(merged).forEach(function (name) {
        if (name in pageOptions) {
            if (typeof merged[name] === 'object') {
                var currType = typeof pageOptions[name];
                if (currType !== 'object') {
                    api_1.logger.warn("".concat(name, "\u5728 mixins \u4E2D\u5B9A\u4E49\u4E3A object, \u4F46\u662F\u5728\u5F53\u524D Page \u4E3A").concat(currType));
                    return;
                }
                pageOptions[name] = tslib_1.__assign(tslib_1.__assign({}, merged[name]), pageOptions[name]);
            }
        }
        else {
            pageOptions[name] = merged[name];
        }
    });
    // 处理 proto 方法的合并
    Object.keys(protoFns).forEach(function (name) {
        var originalFn = pageOptions[name];
        // 返回值
        var fnConfig = pageMethodNames[name];
        var result;
        pageOptions[name] = function () {
            var _a, _b;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            try {
                for (var _c = 0, _d = protoFns[name]; _c < _d.length; _c++) {
                    var fn = _d[_c];
                    var r = fn.call.apply(fn, tslib_1.__spreadArray([this], args, false));
                    result = (_a = fnConfig === null || fnConfig === void 0 ? void 0 : fnConfig.r) === null || _a === void 0 ? void 0 : _a.call(fnConfig, result, r);
                }
            }
            catch (err) {
                api_1.logger.error('mixins 函数报错', err);
            }
            if (originalFn) {
                var r = originalFn.call.apply(originalFn, tslib_1.__spreadArray([this], args, false));
                result = (_b = fnConfig === null || fnConfig === void 0 ? void 0 : fnConfig.r) === null || _b === void 0 ? void 0 : _b.call(fnConfig, result, r);
            }
            if (fnConfig === null || fnConfig === void 0 ? void 0 : fnConfig.r)
                return result;
        };
    });
}
/**
 * 增强页面功能: 注入 adapters/hooks、转换声明周期等
 */
function enhancePage(options, sourceType) {
    if (!sourceType) {
        api_1.logger.warn("createPage \u7F3A\u5C11 sourceType \u53EF\u80FD\u4F1A\u5BFC\u81F4\u5C0F\u7A0B\u5E8F\u9875\u9762\u521D\u59CB\u5316\u9519\u8BEF");
    }
    var $morHooks = (0, api_1.getSharedProperty)('$morHooks', options);
    var pageOptions = tslib_1.__assign({}, options);
    if (!$morHooks) {
        api_1.logger.warn('createPage 依赖 $morHooks，请检查配置');
        return options;
    }
    // mixins 支持
    processMixins(pageOptions, sourceType);
    // 触发 pageOnConstruct hook, 兼容旧版本当 pageOnConstruct 不存在时用 pageOnInit 兜底
    var pageOnConstruct = $morHooks.pageOnConstruct || $morHooks.pageOnInit;
    pageOnConstruct.call(pageOptions, pageOptions);
    // 添加页面生命周期 hook
    hookPageLifeCycle(pageOptions, sourceType);
    // 跨端支持的页面运行时调用注入位置, '' 空字符串是为了防止该注释被移除
    // prettier-ignore
    'a' === sourceType && pageSourceRuntime.initPage(pageOptions);
    // 执行 page 适配器初始化
    if (PAGE_ADAPTERS === null || PAGE_ADAPTERS === void 0 ? void 0 : PAGE_ADAPTERS.length) {
        PAGE_ADAPTERS.forEach(function (adapter) {
            if (typeof (adapter === null || adapter === void 0 ? void 0 : adapter.initPage) === 'function') {
                adapter.initPage(pageOptions);
            }
            else {
                api_1.logger.error("adapter.initPage \u5FC5\u987B\u662F\u4E00\u4E2A\u51FD\u6570, \u8BF7\u68C0\u67E5");
            }
        });
    }
    return pageOptions;
}
exports.enhancePage = enhancePage;
/**
 * 注册 Page 函数
 */
function createPage(options, sourceType) {
    api_1.logger.time('page-init');
    var pageOptions = enhancePage(options, sourceType);
    api_1.logger.timeEnd('page-init');
    return Page(pageOptions);
}
exports.createPage = createPage;
/**
 * 注册页面转端适配器
 * @param adapters - 页面转端适配器
 */
function registerPageAdapters(adapters) {
    PAGE_ADAPTERS.push.apply(PAGE_ADAPTERS, (0, api_1.asArray)(adapters));
}
exports.registerPageAdapters = registerPageAdapters;
/**
 * 支付宝 Page 页面注册
 * @param options - 小程序页面配置
 */
function aPage(options) {
    return createPage(options, api_1.SOURCE_TYPE.ALIPAY);
}
exports.aPage = aPage;
/**
 * 微信 Page 页面注册
 * @param options - 小程序页面配置
 */
function wPage(options) {
    return createPage(options, api_1.SOURCE_TYPE.WECHAT);
}
exports.wPage = wPage;
//# sourceMappingURL=page.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/env.js":
/*!**********************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/env.js ***!
  \**********************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getGlobalObject = exports.getEnvDesc = exports.getEnv = exports.SOURCE_TYPE = exports.ENV_TYPE_DESC = exports.ENV_TYPE = void 0;
/**
 * 支持的 env 类型
 * 用于 运行时判断
 */
var ENV_TYPE;
(function (ENV_TYPE) {
    /**
     * 微信小程序
     */
    ENV_TYPE["WECHAT"] = "WECHAT";
    /**
     * 支付宝小程序
     */
    ENV_TYPE["ALIPAY"] = "ALIPAY";
    /**
     * QQ 小程序
     */
    ENV_TYPE["QQ"] = "QQ";
    /**
     * 百度小程序
     */
    ENV_TYPE["BAIDU"] = "BAIDU";
    /**
     * 钉钉小程序
     */
    ENV_TYPE["DINGDING"] = "DINGDING";
    /**
     * 淘宝小程序
     */
    ENV_TYPE["TAOBAO"] = "TAOBAO";
    /**
     * 字节小程序
     */
    ENV_TYPE["BYTEDANCE"] = "BYTEDANCE";
    /**
     * 快手小程序
     */
    ENV_TYPE["KUAISHOU"] = "KUAISHOU";
    /**
     * Web 应用
     */
    ENV_TYPE["WEB"] = "WEB";
})(ENV_TYPE = exports.ENV_TYPE || (exports.ENV_TYPE = {}));
/**
 * 支持的 env 类型描述
 */
var ENV_TYPE_DESC;
(function (ENV_TYPE_DESC) {
    /**
     * 微信小程序
     */
    ENV_TYPE_DESC["WECHAT"] = "\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F";
    /**
     * 支付宝小程序
     */
    ENV_TYPE_DESC["ALIPAY"] = "\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F";
    /**
     * QQ 小程序
     */
    ENV_TYPE_DESC["QQ"] = "QQ \u5C0F\u7A0B\u5E8F";
    /**
     * 百度小程序
     */
    ENV_TYPE_DESC["BAIDU"] = "\u767E\u5EA6\u5C0F\u7A0B\u5E8F";
    /**
     * 钉钉小程序
     */
    ENV_TYPE_DESC["DINGDING"] = "\u9489\u9489\u5C0F\u7A0B\u5E8F";
    /**
     * 淘宝小程序
     */
    ENV_TYPE_DESC["TAOBAO"] = "\u6DD8\u5B9D\u5C0F\u7A0B\u5E8F";
    /**
     * 字节小程序
     */
    ENV_TYPE_DESC["BYTEDANCE"] = "\u5B57\u8282\u5C0F\u7A0B\u5E8F";
    /**
     * 字节小程序
     */
    ENV_TYPE_DESC["KUAISHOU"] = "\u5FEB\u624B\u5C0F\u7A0B\u5E8F";
    /**
     * Web 应用
     */
    ENV_TYPE_DESC["WEB"] = "Web \u5E94\u7528";
})(ENV_TYPE_DESC = exports.ENV_TYPE_DESC || (exports.ENV_TYPE_DESC = {}));
var SOURCE_TYPE;
(function (SOURCE_TYPE) {
    /**
     * 微信小程序 DSL 支持
     */
    SOURCE_TYPE["WECHAT"] = "w";
    /**
     * 支付宝小程序 DSL 支持
     */
    SOURCE_TYPE["ALIPAY"] = "a";
})(SOURCE_TYPE = exports.SOURCE_TYPE || (exports.SOURCE_TYPE = {}));
var _ENV = null;
/**
 * 获取小程序运行环境
 * @returns 当前环境
 */
function getEnv() {
    if (_ENV)
        return _ENV;
    // 此处 tt 的判断需要在 wx 之前，因为在字节小程序中同时支持调用 tt 和 wx 对象
    if (typeof tt !== 'undefined' && tt.getSystemInfo) {
        _ENV = ENV_TYPE.BYTEDANCE;
        return _ENV;
    }
    // 此处 swan 的判断需要在 my 之前，因为在百度小程序初始化阶段含有 my 对象
    if (typeof swan !== 'undefined' && swan.getSystemInfo) {
        _ENV = ENV_TYPE.BAIDU;
        return _ENV;
    }
    if (typeof wx !== 'undefined' && wx.getSystemInfo) {
        _ENV = ENV_TYPE.WECHAT;
        return _ENV;
    }
    if (typeof dd !== 'undefined' && dd.getSystemInfo) {
        _ENV = ENV_TYPE.DINGDING;
        return _ENV;
    }
    if (typeof my !== 'undefined' &&
        typeof (my === null || my === void 0 ? void 0 : my.tb) !== 'undefined' &&
        my.getSystemInfo) {
        _ENV = ENV_TYPE.TAOBAO;
        return _ENV;
    }
    if (typeof my !== 'undefined' && my.getSystemInfo) {
        _ENV = ENV_TYPE.ALIPAY;
        return _ENV;
    }
    if (typeof qq !== 'undefined' && qq.getSystemInfo) {
        _ENV = ENV_TYPE.QQ;
        return _ENV;
    }
    if (typeof ks !== 'undefined' && ks.getSystemInfo) {
        _ENV = ENV_TYPE.KUAISHOU;
        return _ENV;
    }
    if (typeof window !== 'undefined') {
        _ENV = ENV_TYPE.WEB;
        return _ENV;
    }
    return 'Unknown environment';
}
exports.getEnv = getEnv;
/**
 * 获取当前环境描述信息
 * @returns 当前环境描述信息
 */
function getEnvDesc() {
    return ENV_TYPE_DESC[getEnv()];
}
exports.getEnvDesc = getEnvDesc;
/**
 * 获取全局对象
 * @returns 全局对象
 */
function getGlobalObject() {
    var env = getEnv();
    if (env === ENV_TYPE.WECHAT)
        return wx;
    if (env === ENV_TYPE.ALIPAY)
        return my;
    if (env === ENV_TYPE.TAOBAO)
        return my;
    if (env === ENV_TYPE.QQ)
        return qq;
    if (env === ENV_TYPE.BYTEDANCE)
        return tt;
    if (env === ENV_TYPE.BAIDU)
        return swan;
    if (env === ENV_TYPE.DINGDING)
        return dd;
    if (env === ENV_TYPE.KUAISHOU)
        return ks;
    if (env === ENV_TYPE.WEB)
        return window;
    return null;
}
exports.getGlobalObject = getGlobalObject;
//# sourceMappingURL=env.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/base64.js":
/*!*************************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/base64.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Base64 = void 0;
var Base64 = {
    _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    encode: function (input) {
        var output = '';
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64.utf8Encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output =
                output +
                    this._keyStr.charAt(enc1) +
                    this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) +
                    this._keyStr.charAt(enc4);
        }
        return output;
    },
    decode: function (input) {
        var output = '';
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9+/=]/g, '');
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = Base64.utf8Decode(output);
        return output;
    },
    utf8Encode: function (string) {
        string = string.replace(/\r\n/g, '\n');
        var utftext = '';
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if (c > 127 && c < 2048) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },
    utf8Decode: function (utftext) {
        var string = '';
        var i = 0;
        var c = 0;
        var c2 = 0;
        var c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if (c > 191 && c < 224) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
};
exports.Base64 = Base64;
//# sourceMappingURL=base64.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/event.js":
/*!************************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/event.js ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

/* eslint-disable @typescript-eslint/no-non-null-assertion */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.event = exports.getAllEvents = exports.createEvent = void 0;
// 搜集所有创建的 Emitter 实例
// 主要用于 调试或检查
var EVENT_EMITTER_INSTANCES = {};
/**
 * 创建 Emitter 实例
 * @param reason - 事件创建原因, 用于统计
 * @param all - 自定义 Map 用于存储事件名称和事件处理函数
 * @returns Emitter
 */
function createEvent(reason, all) {
    all = all || new Map();
    function on(type, handler) {
        var handlers = all.get(type);
        if (handlers) {
            handlers.push(handler);
        }
        else {
            all.set(type, [handler]);
        }
    }
    function off(type, handler) {
        var handlers = all.get(type);
        if (handlers) {
            if (handler) {
                handlers.splice(handlers.indexOf(handler) >>> 0, 1);
            }
            else {
                all.set(type, []);
            }
        }
    }
    function emit(type, evt) {
        var handlers = all.get(type);
        if (handlers) {
            ;
            handlers
                .slice()
                .map(function (handler) {
                handler(evt);
            });
        }
        handlers = all.get('*');
        if (handlers) {
            ;
            handlers.slice().map(function (handler) {
                handler(type, evt);
            });
        }
    }
    function once(type, handler) {
        if (type === '*') {
            var fn_1 = function (type, event) {
                off(type, fn_1);
                handler(type, event);
            };
            on(type, fn_1);
        }
        else {
            var fn_2 = function (event) {
                off(type, fn_2);
                handler(event);
            };
            on(type, fn_2);
        }
    }
    var emitter = {
        all: all,
        on: on,
        off: off,
        emit: emit,
        once: once
    };
    // 记录创建的 event
    EVENT_EMITTER_INSTANCES[reason] = EVENT_EMITTER_INSTANCES[reason] || [];
    EVENT_EMITTER_INSTANCES[reason].push({
        createdAt: +new Date(),
        event: emitter
    });
    return emitter;
}
exports.createEvent = createEvent;
/**
 * 获取所有 event 实例
 */
function getAllEvents() {
    return EVENT_EMITTER_INSTANCES;
}
exports.getAllEvents = getAllEvents;
/**
 * 全局默认 Event
 */
exports.event = createEvent('default');
//# sourceMappingURL=event.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/hooks.js":
/*!************************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/hooks.js ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.applySolutions = exports.applyPlugins = exports.hooks = exports.getAllHooks = exports.createHooks = exports.SyncHook = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
var logger_1 = __webpack_require__(/*! ./logger */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/logger.js");
var asArray_1 = __webpack_require__(/*! ./utils/asArray */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/asArray.js");
var HookInvokeState;
(function (HookInvokeState) {
    HookInvokeState["pausing"] = "pausing";
    HookInvokeState["resuming"] = "resuming";
})(HookInvokeState || (HookInvokeState = {}));
/**
 * 同步 Hook
 */
var SyncHook = /** @class */ (function () {
    /**
     * @constructor
     * @param name - Hook 名称
     */
    function SyncHook(name, sharedState) {
        this.name = name || '';
        this.taps = [];
        this.sharedState = sharedState;
    }
    /**
     * 返回 hook 是否已被使用
     */
    SyncHook.prototype.isUsed = function () {
        return this.taps.length > 0;
    };
    /**
     * 创建 hook alias
     * @param name Hook 名称
     */
    SyncHook.prototype.alias = function (name) {
        var aliasHook = new SyncHook(name, this.sharedState);
        // 这里直接使用 taps 数组, 方便 alias Hook 共用
        aliasHook.taps = this.taps;
        return aliasHook;
    };
    /**
     * 添加 hook 插件
     * @param nameOrOptions 名称或选项
     * @param fn 函数
     */
    SyncHook.prototype.tap = function (nameOrOptions, fn) {
        var _a;
        var name;
        var stage;
        if (typeof nameOrOptions === 'string') {
            name = nameOrOptions;
            stage = 0;
        }
        else {
            name = nameOrOptions.name;
            stage = (_a = nameOrOptions.stage) !== null && _a !== void 0 ? _a : 0;
        }
        if (name == null) {
            logger_1.logger.error("$hooks.".concat(this.name, ".tap \u7F3A\u5C11 name"));
        }
        this.taps.push({
            type: 'sync',
            name: name,
            stage: stage,
            fn: fn
        });
    };
    /**
     * 执行 hook
     * @param context 上下文
     * @param args 参数列表
     */
    SyncHook.prototype.call = function (context) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        // 按照 stage 排序
        var taps = this.taps.sort(function (a, b) {
            return a.stage - b.stage;
        });
        for (var _b = 0, taps_1 = taps; _b < taps_1.length; _b++) {
            var tap = taps_1[_b];
            // 暂停中的 hook 将所有调用保存到堆栈中，等待后续恢复
            if (this.isPausing()) {
                this.sharedState.stack.push([this.name, tap, context, args]);
            }
            else {
                try {
                    (_a = tap.fn).call.apply(_a, tslib_1.__spreadArray([context], args, false));
                }
                catch (err) {
                    logger_1.logger.error(this.name, tap.name, err);
                }
            }
        }
    };
    SyncHook.prototype.isPausing = function () {
        var _a;
        var state = this.sharedState;
        // 当触发了 $hooks.pause 暂停，若未传入需要指定暂停的 hooks 则暂停所有生命周期触发
        // 若传入了某些指定的 hooks 数组，则只暂停这些传入 hooks
        if ((state === null || state === void 0 ? void 0 : state.state) !== HookInvokeState.pausing)
            return false;
        if (((_a = state.hooksNameList) === null || _a === void 0 ? void 0 : _a.length) === 0)
            return true;
        if (state.hooksNameList.indexOf(this.name) !== -1)
            return true;
        return false;
    };
    return SyncHook;
}());
exports.SyncHook = SyncHook;
// 搜集所有创建的 hooks 实例
// 主要用于 调试或检查
var HOOKS_INSTANCES = {};
/**
 * 创建 hooks 对象
 * @param reason Hooks 创建原因
 * @returns hooks 对象
 */
function createHooks(reason) {
    var sharedState = {
        state: HookInvokeState.resuming,
        stack: [],
        hooksNameList: []
    };
    var appOnConstruct = new SyncHook('appOnConstruct', sharedState);
    var pageOnConstructHook = new SyncHook('pageOnConstruct', sharedState);
    var componentOnInitHook = new SyncHook('componentOnInit', sharedState);
    var componentDidMountHook = new SyncHook('componentDidMount', sharedState);
    var componentDidUnmountHook = new SyncHook('componentDidUnmount', sharedState);
    var componentOnError = new SyncHook('componentOnError', sharedState);
    var hooks = {
        /* App 相关 hooks */
        appOnConstruct: appOnConstruct,
        // appOnInit 已废弃, 这里出于兼容性暂不移除
        appOnInit: appOnConstruct.alias('appOnInit'),
        appOnLaunch: new SyncHook('appOnLaunch', sharedState),
        appOnError: new SyncHook('appOnError', sharedState),
        appOnShow: new SyncHook('appOnShow', sharedState),
        appOnHide: new SyncHook('appOnHide', sharedState),
        appOnPageNotFound: new SyncHook('appOnPageNotFound', sharedState),
        appOnUnhandledRejection: new SyncHook('appOnUnhandledRejection', sharedState),
        /* Page 相关 hooks */
        pageOnConstruct: pageOnConstructHook,
        // pageOnInit 已废弃, 这里出于兼容性暂不移除
        pageOnInit: pageOnConstructHook.alias('pageOnInit'),
        pageOnLoad: new SyncHook('pageOnLoad', sharedState),
        pageOnReady: new SyncHook('pageOnReady', sharedState),
        pageOnShow: new SyncHook('pageOnShow', sharedState),
        pageOnHide: new SyncHook('pageOnHide', sharedState),
        pageOnUnload: new SyncHook('pageOnUnload', sharedState),
        /* Component 相关 hooks */
        componentOnConstruct: new SyncHook('componentOnConstruct', sharedState),
        componentOnInit: componentOnInitHook,
        componentOnCreated: componentOnInitHook.alias('componentOnCreated'),
        componentDidMount: componentDidMountHook,
        componentOnAttached: componentDidMountHook.alias('componentOnAttached'),
        componentDidUnmount: componentDidUnmountHook,
        componentOnDetached: componentDidUnmountHook.alias('componentOnDetached'),
        componentOnError: componentOnError,
        pause: function (hooksNameList) {
            sharedState.state = HookInvokeState.pausing;
            sharedState.hooksNameList = hooksNameList || [];
        },
        resume: function () {
            var _a;
            sharedState.state = HookInvokeState.resuming;
            var stackItem = sharedState.stack.shift();
            while (stackItem) {
                var name_1 = stackItem[0], tap = stackItem[1], context = stackItem[2], args = stackItem[3];
                try {
                    tap === null || tap === void 0 ? void 0 : (_a = tap.fn).call.apply(_a, tslib_1.__spreadArray([context], args, false));
                }
                catch (error) {
                    logger_1.logger.error(name_1, tap.name, error);
                }
                stackItem = sharedState.stack.shift();
            }
        }
    };
    // 记录创建的所有 hooks
    HOOKS_INSTANCES[reason] = HOOKS_INSTANCES[reason] || [];
    HOOKS_INSTANCES[reason].push({
        createdAt: +new Date(),
        hooks: hooks
    });
    return hooks;
}
exports.createHooks = createHooks;
/**
 * 获取所有 hooks
 */
function getAllHooks() {
    return HOOKS_INSTANCES;
}
exports.getAllHooks = getAllHooks;
/**
 * 获取全局共享属性，用于作为原子化的兜底实现
 *   1. 首先查找上下文中的属性
 *   2. 如果不存在，则查找 getApp 中的
 *   3. 如果不存在，则查找 小程序环境的 globalObject, 如 my 中是否存在
 */
exports.hooks = createHooks('default');
/**
 * 应用插件
 * @param hooks Hooks
 * @param plugins 插件列表
 */
function applyPlugins(hooks, plugins) {
    var pluginsNames = [];
    plugins.forEach(function (plugin) {
        try {
            plugin.apply(hooks);
            pluginsNames.push(plugin.pluginName);
        }
        catch (err) {
            logger_1.logger.error("[plugin ".concat(plugin.pluginName, "]: \u521D\u59CB\u5316\u62A5\u9519"), err);
        }
    });
    return pluginsNames;
}
exports.applyPlugins = applyPlugins;
/**
 * 应用 Solutions
 * @param hooks Hooks
 * @param solutions 插件集列表
 */
function applySolutions(hooks, solution) {
    var solutions = (0, asArray_1.asArray)(solution);
    var plugins = [];
    try {
        solutions.forEach(function (solution) {
            var _a;
            if (typeof solution === 'function') {
                plugins = plugins.concat(((_a = solution()) === null || _a === void 0 ? void 0 : _a.plugins) || []);
            }
            else {
                logger_1.logger.error("\u521D\u59CB\u5316\u8FD0\u884C\u65F6\u63D2\u4EF6\u5931\u8D25, \u539F\u56E0: ".concat(solution, " \u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684 solution"));
            }
        });
    }
    catch (err) {
        logger_1.logger.error("\u521D\u59CB\u5316\u8FD0\u884C\u65F6\u63D2\u4EF6\u5931\u8D25, \u539F\u56E0: ".concat(err));
    }
    return applyPlugins(hooks, plugins);
}
exports.applySolutions = applySolutions;
//# sourceMappingURL=hooks.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/index.js":
/*!************************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/index.js ***!
  \************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var tslib_1 = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
tslib_1.__exportStar(__webpack_require__(/*! ./base64 */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/base64.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./env */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/env.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./event */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/event.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./hooks */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/hooks.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./logger */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/logger.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./utils */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/index.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/logger.js":
/*!*************************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/logger.js ***!
  \*************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logger = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
var PREFIX = '[mor]';
function warn() {
    var msgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msgs[_i] = arguments[_i];
    }
    console.warn && console.warn.apply(console, tslib_1.__spreadArray([PREFIX], msgs, false));
}
function log() {
    var msgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msgs[_i] = arguments[_i];
    }
    console.log && console.log.apply(console, tslib_1.__spreadArray([PREFIX], msgs, false));
}
function error() {
    var msgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msgs[_i] = arguments[_i];
    }
    console.error && console.error.apply(console, tslib_1.__spreadArray([PREFIX], msgs, false));
}
function info() {
    var msgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msgs[_i] = arguments[_i];
    }
    console.info && console.info.apply(console, tslib_1.__spreadArray([PREFIX], msgs, false));
}
function debug() {
    var msgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msgs[_i] = arguments[_i];
    }
    console.debug && console.debug.apply(console, tslib_1.__spreadArray([PREFIX], msgs, false));
}
function deprecated(msg, fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        warn(msg);
        return fn.apply(void 0, args);
    };
}
var PERFORMANCE_TIMERS = {};
/**
 * 记录时间开始
 * @param label 标签
 */
function time(label) {
    PERFORMANCE_TIMERS[label] = +new Date();
}
/**
 * 记录时间结束并输出耗时
 * 大于 50ms 时会输出 warn
 * @param label 标签
 */
function timeEnd(label) {
    var start = PERFORMANCE_TIMERS[label];
    if (start) {
        delete PERFORMANCE_TIMERS[label];
        var millis = Date.now() - start;
        var msg = "".concat(label, " \u8017\u65F6: ").concat(millis, "ms");
        // 超过 50 ms
        // 输出警告
        millis > 50 ? warn(msg) : debug(msg);
    }
}
exports.logger = {
    warn: warn,
    log: log,
    error: error,
    info: info,
    debug: debug,
    deprecated: deprecated,
    time: time,
    timeEnd: timeEnd
};
//# sourceMappingURL=logger.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/asArray.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/asArray.js ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.asArray = void 0;
/**
 * 确保一个对象是数组
 *  - 如果 对象 == null 则返回空数组
 *  - 如果 对象不是数组 则返回包含该对象的数组
 *  - 如果 对象是数组 直接返回
 * @param arr - 需要转换为数组的参数
 * @returns 数组
 */
function asArray(arr) {
    return Array.isArray(arr) ? arr : arr == null ? [] : [arr];
}
exports.asArray = asArray;
//# sourceMappingURL=asArray.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/compose.js":
/*!********************************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/compose.js ***!
  \********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.compose = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
/**
 * 将多个函数合并为一个函数
 * @param stack - 函数堆栈
 * @returns 合并后的函数
 */
function compose(stack) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        for (var _a = 0, stack_1 = stack; _a < stack_1.length; _a++) {
            var fn = stack_1[_a];
            if (Object.prototype.toString.call(fn) === '[object Function]') {
                fn.call.apply(fn, tslib_1.__spreadArray([this], args, false));
            }
        }
    };
}
exports.compose = compose;
//# sourceMappingURL=compose.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/generateId.js":
/*!***********************************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/generateId.js ***!
  \***********************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateId = void 0;
var ID = 0;
/**
 * 生成 ID
 */
function generateId() {
    return ++ID;
}
exports.generateId = generateId;
//# sourceMappingURL=generateId.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/getSharedProperty.js":
/*!******************************************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/getSharedProperty.js ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSharedProperty = void 0;
var env_1 = __webpack_require__(/*! ../env */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/env.js");
var event_1 = __webpack_require__(/*! ../event */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/event.js");
var hooks_1 = __webpack_require__(/*! ../hooks */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/hooks.js");
// 默认的共享对象
var SHARED = {
    $morHooks: hooks_1.hooks,
    $event: event_1.event
};
/**
 * 获取全局共享属性，用于作为原子化的兜底实现
 *   1. 首先查找上下文中对应的属性
 *   2. 如果不存在，则查找 getApp 中的
 *   3. 如果不存在，则查找 小程序环境的 globalObject, 如 my 中是否存在
 *   4. 如果不存在，则使用 SHARED 作为兜底
 * @param propName - 共享属性名称
 * @param context - 当前执行环境的上下文
 * @returns propValue
 */
function getSharedProperty(propName, context) {
    // 先从当前上下文张获取，如果上下文存在的话
    if (context && context[propName] != null)
        return context[propName];
    // 尝试从 getApp 中获取
    if (typeof getApp === 'function') {
        var app = getApp();
        if (app && app[propName] != null)
            return app[propName];
    }
    // 从全局对象中获取
    var globalObj = (0, env_1.getGlobalObject)();
    if (globalObj && globalObj[propName] != null)
        return globalObj[propName];
    return SHARED[propName];
}
exports.getSharedProperty = getSharedProperty;
//# sourceMappingURL=getSharedProperty.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/hasOwnProperty.js":
/*!***************************************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/hasOwnProperty.js ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hasOwnProperty = void 0;
/**
 * 对象中是否包含对应的属性
 * @param obj - 对象
 * @param propertyName - 属性名称
 * @returns true or false
 */
function hasOwnProperty(obj, propertyName) {
    return Object.prototype.hasOwnProperty.call(obj, propertyName);
}
exports.hasOwnProperty = hasOwnProperty;
//# sourceMappingURL=hasOwnProperty.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/index.js":
/*!******************************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/index.js ***!
  \******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
var tslib_1 = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
tslib_1.__exportStar(__webpack_require__(/*! ./asArray */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/asArray.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./compose */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/compose.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./generateId */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/generateId.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./getSharedProperty */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/getSharedProperty.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./hasOwnProperty */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/hasOwnProperty.js"), exports);
tslib_1.__exportStar(__webpack_require__(/*! ./transformApis */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/transformApis.js"), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/transformApis.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/transformApis.js ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.markAsUnsupport = exports.transformApis = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
var env_1 = __webpack_require__(/*! ../env */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/env.js");
var logger_1 = __webpack_require__(/*! ../logger */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/logger.js");
var hasOwnProperty_1 = __webpack_require__(/*! ./hasOwnProperty */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/utils/hasOwnProperty.js");
/**
 * 获取原始小程序 request 函数
 * @param global 小程序全局对象
 * @returns request 函数
 */
function getOriginalRequest(global) {
    return function request(options) {
        options = options || {};
        if (typeof options === 'string') {
            options = {
                url: options
            };
        }
        var originSuccess = options.success;
        var originFail = options.fail;
        var originComplete = options.complete;
        var requestTask;
        var p = new Promise(function (resolve, reject) {
            options.success = function (res) {
                originSuccess && originSuccess(res);
                resolve(res);
            };
            options.fail = function (res) {
                originFail && originFail(res);
                reject(res);
            };
            options.complete = function (res) {
                originComplete && originComplete(res);
            };
            requestTask = global.request(options);
        });
        p.abort = function (cb) {
            cb && cb();
            if (requestTask) {
                requestTask.abort();
            }
            return p;
        };
        return p;
    };
}
/**
 * 接口抹平转换
 * @param mor - mor 接口对象
 * @param global - 小程序目标平台全局对象
 * @param config - 接口抹平配置
 * @param installAllGlobalApis - 是否在 mor 中添加所有的 API
 * @param allowOverride - 是否允许覆盖 API
 */
function transformApis(mor, global, config, installAllGlobalApis, allowOverride) {
    if (config === void 0) { config = {}; }
    if (installAllGlobalApis === void 0) { installAllGlobalApis = false; }
    if (allowOverride === void 0) { allowOverride = true; }
    var needPromisfiedApis = config.needPromisfiedApis || [];
    var apiTransformConfig = config.apiTransformConfig || {};
    var preservedApis = [
        'global',
        'env',
        'getApp',
        'getCurrentPages',
        'requirePlugin',
        'getEnv'
    ];
    // 获取所有需要抹平的接口
    var allApiNames = installAllGlobalApis ? Object.keys(global) : [];
    // 合并需要处理的接口名称
    Object.keys(apiTransformConfig)
        .concat(needPromisfiedApis)
        .forEach(function (apiName) {
        if (allApiNames.indexOf(apiName) === -1) {
            allApiNames.push(apiName);
        }
    });
    // 处理接口差异
    allApiNames.forEach(function (apiName) {
        // 不处理 preserved 的 api
        if (preservedApis.indexOf(apiName) !== -1)
            return;
        // 不处理 mor_ 开头的属性
        if (/^mor_/.test(apiName))
            return;
        // 不重复添加接口
        if (allowOverride === false && apiName in mor)
            return;
        var apiConfig = apiTransformConfig[apiName];
        // 非函数处理
        if (global[apiName] && typeof global[apiName] !== 'function') {
            mor[apiName] = global[apiName];
            return;
        }
        // 函数处理
        mor[apiName] = function (options) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            // options 差异抹平
            if (typeof (apiConfig === null || apiConfig === void 0 ? void 0 : apiConfig.opts) === 'function') {
                apiConfig.opts.apply(apiConfig, tslib_1.__spreadArray([options], args, false));
            }
            else if (apiConfig === null || apiConfig === void 0 ? void 0 : apiConfig.opts) {
                var change = apiConfig.opts.c;
                var set = apiConfig.opts.s;
                if (options == null)
                    options = {};
                // 替换 键值
                if (change) {
                    change.forEach(function (item) {
                        if (item.o in options)
                            options[item.n] = options[item.o];
                    });
                }
                // 改写值
                if (set) {
                    set.forEach(function (item) {
                        options[item.k] =
                            typeof item.v === 'function' ? item.v(options) : item.v;
                    });
                }
            }
            // 实际接口名称
            var actualApiName = (apiConfig === null || apiConfig === void 0 ? void 0 : apiConfig.n) || apiName;
            var task = null;
            var obj = Object.assign({}, options);
            // 执行替换函数
            if (typeof (apiConfig === null || apiConfig === void 0 ? void 0 : apiConfig.fn) === 'function') {
                return apiConfig.fn.apply(apiConfig, tslib_1.__spreadArray([global, options], args, false));
            }
            // 处理 request
            if (actualApiName === 'request') {
                return getOriginalRequest(global)(options);
            }
            // promisify 处理
            if (needPromisfiedApis.indexOf(apiName) !== -1) {
                // 新 apiName 可能不存在
                if (!(0, hasOwnProperty_1.hasOwnProperty)(global, actualApiName)) {
                    return Promise.resolve(markAsUnsupport(actualApiName)());
                }
                // Promise 化
                var p_1 = new Promise(function (resolve, reject) {
                    obj.success = function (res) {
                        var _a, _b;
                        (_a = apiConfig === null || apiConfig === void 0 ? void 0 : apiConfig.r) === null || _a === void 0 ? void 0 : _a.call(apiConfig, res);
                        (_b = options === null || options === void 0 ? void 0 : options.success) === null || _b === void 0 ? void 0 : _b.call(options, res);
                        if (actualApiName === 'connectSocket') {
                            resolve(Promise.resolve().then(function () {
                                return task ? Object.assign(task, res) : res;
                            }));
                        }
                        else {
                            resolve(res);
                        }
                    };
                    obj.fail = function (res) {
                        var _a;
                        (_a = options === null || options === void 0 ? void 0 : options.fail) === null || _a === void 0 ? void 0 : _a.call(options, res);
                        // 如果用户传入了 fail 则代表用户自行处理错误
                        // mor 不再抛出 promise 错误, 只标记完成
                        if (typeof (options === null || options === void 0 ? void 0 : options.fail) === 'function') {
                            resolve(null);
                        }
                        else {
                            reject(res);
                        }
                        logger_1.logger.error("\u63A5\u53E3 ".concat(actualApiName, " \u8C03\u7528\u9519\u8BEF: "), res, "\n\u53C2\u6570: ", tslib_1.__spreadArray([
                            options
                        ], args, true));
                    };
                    obj.complete = function (res) {
                        var _a;
                        (_a = options === null || options === void 0 ? void 0 : options.complete) === null || _a === void 0 ? void 0 : _a.call(options, res);
                    };
                    if (args.length) {
                        task = global[actualApiName].apply(global, tslib_1.__spreadArray([obj], args, false));
                    }
                    else {
                        task = global[actualApiName](obj);
                    }
                });
                // 给 promise 对象挂载属性
                if (actualApiName === 'uploadFile' ||
                    actualApiName === 'downloadFile') {
                    p_1.progress = function (cb) {
                        var _a;
                        (_a = task === null || task === void 0 ? void 0 : task.onProgressUpdate) === null || _a === void 0 ? void 0 : _a.call(task, cb);
                        return p_1;
                    };
                    p_1.abort = function (cb) {
                        var _a;
                        cb === null || cb === void 0 ? void 0 : cb();
                        (_a = task === null || task === void 0 ? void 0 : task.abort) === null || _a === void 0 ? void 0 : _a.call(task);
                        return p_1;
                    };
                }
                return p_1;
            }
            else {
                // 新 apiName 可能不存在
                if (!(0, hasOwnProperty_1.hasOwnProperty)(global, actualApiName)) {
                    return markAsUnsupport(actualApiName)();
                }
                var res = global[actualApiName].apply(global, tslib_1.__spreadArray([options], args, false));
                (_a = apiConfig === null || apiConfig === void 0 ? void 0 : apiConfig.r) === null || _a === void 0 ? void 0 : _a.call(apiConfig, res);
                return res;
            }
        };
    });
}
exports.transformApis = transformApis;
/**
 * 返回暂不支持的 函数
 * @param apiName - 接口名称
 */
function markAsUnsupport(apiName) {
    return function () {
        logger_1.logger.warn("".concat((0, env_1.getEnvDesc)(), "\u6682\u4E0D\u652F\u6301 ").concat(apiName));
    };
}
exports.markAsUnsupport = markAsUnsupport;
//# sourceMappingURL=transformApis.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/alipay/apisToOther.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/alipay/apisToOther.js ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initApi = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
var runtime_base_1 = __webpack_require__(/*! @morjs/runtime-base */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/index.js");
var needPromisfiedApis_1 = __webpack_require__(/*! ./needPromisfiedApis */ "../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/alipay/needPromisfiedApis.js");
/**
 * 将 16 进制的颜色值转换成 rgb 格式
 * @param hex - 16 进制的颜色值
 */
function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (_, r, g, b) { return "".concat(r + r).concat(g + g).concat(b + b); });
    var match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return match
        ? {
            r: parseInt(match[1], 16),
            g: parseInt(match[2], 16),
            b: parseInt(match[3], 16)
        }
        : null;
}
/**
 * 是否是浅色
 * @param r - rgb 色值区域中的 red
 * @param g - rgb 色值区域中的 green
 * @param b - rgb 色值区域中的 blue
 */
function isLightColor(r, g, b) {
    var y = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return y >= 128;
}
var changeToHex = function (buffer) {
    var hexArr = Array.prototype.map.call(new Uint8Array(buffer), function (bit) {
        return ('00' + bit.toString(16)).slice(-2);
    });
    return hexArr.join('');
};
//  changeToHex reverse changeToBuffer
var changeToBuffer = function (str) {
    var buffer = new ArrayBuffer(str.length / 2);
    var dataView = new DataView(buffer);
    for (var i = 0; i < str.length; i += 2) {
        dataView.setUint8(i / 2, parseInt(str.substr(i, 2), 16));
    }
    return buffer;
};
/**
 * 支付宝和微信接口的差异
 * 以支付宝为准
 * 支付宝 转 微信
 */
var apiTransformConfig = {
    showActionSheet: {
        opts: {
            c: [{ o: 'items', n: 'itemList' }]
        }
    },
    showToast: {
        opts: {
            c: [{ o: 'content', n: 'title' }],
            s: [
                {
                    k: 'icon',
                    v: function (options) {
                        if (options === void 0) { options = {}; }
                        // exception 映射
                        if (options.type === 'exception') {
                            switch ((0, runtime_base_1.getEnv)()) {
                                case runtime_base_1.ENV_TYPE.WECHAT:
                                case runtime_base_1.ENV_TYPE.QQ:
                                    return 'error';
                                case runtime_base_1.ENV_TYPE.BYTEDANCE:
                                    return 'fail';
                                default:
                                    return 'none';
                            }
                        }
                        else {
                            // 支付宝默认为 'none'
                            // 而微信及其他端默认为 'success'
                            // 所以这里默认返回 none 以确保行为一致
                            return options.type || 'none';
                        }
                    }
                }
            ]
        }
    },
    showLoading: {
        opts: {
            c: [{ o: 'content', n: 'title' }]
        }
    },
    setNavigationBar: {
        fn: function (global, options) {
            if (options === void 0) { options = {}; }
            var success = options === null || options === void 0 ? void 0 : options.success;
            var fail = options === null || options === void 0 ? void 0 : options.fail;
            var complete = options === null || options === void 0 ? void 0 : options.complete;
            if (options.title) {
                global.setNavigationBarTitle({
                    title: options.title,
                    success: success,
                    fail: fail,
                    complete: complete
                });
            }
            if (options.backgroundColor) {
                // 支付宝小程序没有前景色
                // 这里默认设置为黑色
                // 同时基于背景色来自动选择前景色
                var frontColor = '#000000';
                try {
                    var rgb = hexToRgb(options.backgroundColor);
                    if (rgb) {
                        if (isLightColor(rgb.r, rgb.g, rgb.b)) {
                            frontColor = '#000000';
                        }
                        else {
                            frontColor = '#ffffff';
                        }
                    }
                }
                catch (e) { }
                global.setNavigationBarColor({
                    frontColor: options.frontColor || frontColor,
                    backgroundColor: options.backgroundColor,
                    success: success,
                    fail: fail,
                    complete: complete
                });
            }
        }
    },
    saveImageToPhotosAlbum: {
        n: 'saveImage',
        opts: {
            c: [{ o: 'url', n: 'filePath' }]
        }
    },
    getFileInfo: {
        opts: {
            c: [{ o: 'apFilePath', n: 'filePath' }]
        }
    },
    getSavedFileInfo: {
        opts: {
            c: [{ o: 'apFilePath', n: 'filePath' }]
        }
    },
    removeSavedFile: {
        opts: {
            c: [{ o: 'apFilePath', n: 'filePath' }]
        }
    },
    saveFile: {
        opts: {
            c: [{ o: 'apFilePath', n: 'tempFilePath' }]
        },
        r: function (res) {
            res.apFilePath = res.savedFilePath;
        }
    },
    openLocation: {
        opts: {
            s: [
                {
                    k: 'latitude',
                    v: function (options) {
                        return Number(options.latitude);
                    }
                },
                {
                    k: 'longitude',
                    v: function (options) {
                        return Number(options.longitude);
                    }
                }
            ]
        }
    },
    uploadFile: {
        opts: {
            c: [{ o: 'fileName', n: 'name' }]
        }
    },
    getClipboard: {
        n: 'getClipboardData',
        r: function (res) {
            res.text = res.data;
        }
    },
    setClipboard: {
        n: 'setClipboardData',
        opts: {
            c: [{ o: 'text', n: 'data' }]
        }
    },
    makePhoneCall: {
        opts: {
            c: [{ o: 'number', n: 'phoneNumber' }]
        }
    },
    scan: {
        n: 'scanCode',
        opts: {
            c: [{ o: 'hideAlbum', n: 'onlyFromCamera' }],
            s: [
                {
                    k: 'scanType',
                    v: function (options) {
                        if (options.type && options.type.length) {
                            return [].concat(options.type).map(function (v) {
                                if (v === 'pdf417Code')
                                    return 'pdf417';
                                if (v === 'dmCode')
                                    return 'datamatrix';
                                if (v === 'narrowCode' || v === 'hmCode') {
                                    runtime_base_1.logger.warn("scanCode.scanType \u4E0D\u652F\u6301 ".concat(v, " \u7C7B\u578B"));
                                }
                                return v;
                            });
                        }
                    }
                }
            ]
        },
        r: function (res) {
            res.code = res.result;
        }
    },
    setScreenBrightness: {
        opts: {
            c: [{ o: 'brightness', n: 'value' }]
        }
    },
    onBLEConnectionStateChanged: {
        n: 'onBLEConnectionStateChange'
    },
    offBLEConnectionStateChanged: {
        n: 'offBLEConnectionStateChange'
    },
    connectBLEDevice: {
        n: 'createBLEConnection'
    },
    disconnectBLEDevice: {
        n: 'closeBLEConnection'
    },
    openBluetoothAdapter: {
        r: function (res) {
            res.isSupportBLE = res.errno === 0;
        }
    },
    getBLEDeviceCharacteristics: {
        fn: function (global, options) {
            global.getBLEDeviceCharacteristics(tslib_1.__assign(tslib_1.__assign({}, options), { success: function (res) {
                    var _res = res;
                    if (_res.characteristics) {
                        _res.characteristics.forEach(function (item) {
                            item.characteristicId = item.uuid;
                            delete item.uuid;
                        });
                    }
                    options.success && options.success(_res);
                } }));
        }
    },
    getBLEDeviceServices: {
        fn: function (global, options) {
            global.getBLEDeviceServices(tslib_1.__assign(tslib_1.__assign({}, options), { success: function (res) {
                    var _res = res;
                    if (_res.services) {
                        _res.services.forEach(function (item) {
                            item.serviceId = item.uuid;
                            delete item.uuid;
                        });
                    }
                    options.success && options.success(_res);
                } }));
        }
    },
    onBLECharacteristicValueChange: {
        fn: function (global, callback) {
            if (typeof callback === 'function') {
                global.onBLECharacteristicValueChange(function (res) {
                    res.value = changeToHex(res.value);
                    callback && callback(res);
                });
            }
            else if (typeof callback === 'object') {
                // object sucess
                global.onBLECharacteristicValueChange(function (res) {
                    res.value = changeToHex(res.value);
                    callback.success && callback.success(res);
                });
            }
        }
    },
    writeBLECharacteristicValue: {
        fn: function (global, options) {
            global.writeBLECharacteristicValue(tslib_1.__assign(tslib_1.__assign({}, options), { 
                // wx writeBLECharacteristicValue:fail parameter error: parameter.value should be ArrayBuffer;
                value: changeToBuffer(options.value) }));
        }
    },
    onBluetoothDeviceFound: {
        fn: function (global, callback) {
            global.onBluetoothDeviceFound(function (res) {
                var _res = res;
                if (_res.devices) {
                    _res.devices.forEach(function (item) {
                        item.deviceName = item.localName || item.name;
                    });
                }
                callback && callback(_res);
            });
        }
    },
    notifyBLECharacteristicValueChange: {
        fn: function (global, options) {
            global.notifyBLECharacteristicValueChange(tslib_1.__assign(tslib_1.__assign({}, options), { state: options.state !== false ? true : false }));
        }
    },
    request: {
        fn: function (global, options) {
            options = options || {};
            if (typeof options === 'string') {
                options = {
                    url: options
                };
            }
            options['header'] = {};
            if (options['headers']) {
                for (var k in options['headers']) {
                    var lowerK = k.toLocaleLowerCase();
                    options['header'][lowerK] = options['headers'][k];
                }
                delete options['headers'];
            }
            // promisified
            var originSuccess = options.success;
            var originFail = options.fail;
            var originComplete = options.complete;
            var requestTask;
            var p = new Promise(function (resolve, reject) {
                options.success = function (res) {
                    res.status = res.statusCode;
                    delete res.statusCode;
                    res.headers = res.header;
                    delete res.header;
                    originSuccess === null || originSuccess === void 0 ? void 0 : originSuccess(res);
                    resolve(res);
                };
                options.fail = function (res) {
                    originFail === null || originFail === void 0 ? void 0 : originFail(res);
                    // 如果用户传入了 fail 则代表用户自行处理错误
                    // mor 不再抛出 promise 错误, 只标记完成
                    if (typeof originFail === 'function') {
                        resolve(null);
                    }
                    else {
                        reject(res);
                    }
                };
                options.complete = function (res) {
                    originComplete === null || originComplete === void 0 ? void 0 : originComplete(res);
                };
                requestTask = global.request(options);
            });
            p.abort = function (cb) {
                var _a;
                cb === null || cb === void 0 ? void 0 : cb();
                (_a = requestTask === null || requestTask === void 0 ? void 0 : requestTask.abort) === null || _a === void 0 ? void 0 : _a.call(requestTask);
                return p;
            };
            return p;
        }
    },
    getStorageSync: {
        fn: function (global) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            // 支付宝 转 x 逻辑
            var arg1 = args[0];
            if ((arg1 === null || arg1 === void 0 ? void 0 : arg1.key) != null) {
                var res = global.getStorageSync(arg1 === null || arg1 === void 0 ? void 0 : arg1.key);
                return { data: res };
            }
            // 如果是走到了这里, 代表调用了原生方法
            else if (typeof arg1 === 'string') {
                return global.getStorageSync(arg1);
            }
            return runtime_base_1.logger.error('getStorageSync 传入参数错误');
        }
    },
    setStorageSync: {
        fn: function (global) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var arg1 = args[0];
            if ((arg1 === null || arg1 === void 0 ? void 0 : arg1.key) != null) {
                return global.setStorageSync(arg1.key, arg1 === null || arg1 === void 0 ? void 0 : arg1.data);
            }
            return runtime_base_1.logger.error('setStorageSync 传入参数错误');
        }
    },
    removeStorageSync: {
        fn: function (global) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var arg1 = args[0];
            if ((arg1 === null || arg1 === void 0 ? void 0 : arg1.key) != null) {
                return global.removeStorageSync(arg1.key);
            }
            return runtime_base_1.logger.error('removeStorageSync 传入参数错误');
        }
    },
    confirm: {
        n: 'showModal',
        opts: {
            c: [
                { o: 'cancelButtonText', n: 'cancelText' },
                { o: 'confirmButtonText', n: 'confirmText' }
            ]
        }
    },
    alert: {
        n: 'showModal',
        opts: {
            c: [{ o: 'buttonText', n: 'confirmText' }],
            s: [
                {
                    k: 'showCancel',
                    v: function () {
                        return false;
                    }
                }
            ]
        }
    },
    downloadFile: {
        r: function (res) {
            res.apFilePath = res.tempFilePath;
        }
    },
    chooseImage: {
        r: function (res) {
            res.apFilePaths = res.tempFilePaths;
        }
    },
    getScreenBrightness: {
        r: function (res) {
            res.brightness = res.value;
            delete res.value;
        }
    },
    getAuthCode: {
        n: 'login',
        r: function (res) {
            res.authCode = res.code;
            delete res.code;
        }
    },
    getOpenUserInfo: {
        n: 'getUserProfile',
        r: getUserProfile
    },
    createIntersectionObserver: {
        fn: function (global) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var options = (args === null || args === void 0 ? void 0 : args[0]) || {};
            if ((options === null || options === void 0 ? void 0 : options.selectAll) != null) {
                options.observeAll = options.selectAll;
                delete options.selectAll;
            }
            return global.createIntersectionObserver(void 0, options);
        }
    }
};
function getUserProfile(res) {
    var userInfo = res.userInfo;
    if (userInfo) {
        userInfo.avatar = userInfo.avatarUrl;
        if (userInfo.gender === 1) {
            userInfo.gender = 'm';
        }
        else if (userInfo.gender === 2) {
            userInfo.gender = 'f';
        }
        else {
            userInfo.gender = '';
        }
        userInfo.countryCode = userInfo.country;
        res.response = JSON.stringify({ response: userInfo });
    }
}
function initApi(mor) {
    (0, runtime_base_1.transformApis)(mor, (0, runtime_base_1.getGlobalObject)(), {
        needPromisfiedApis: needPromisfiedApis_1.needPromisfiedApis,
        apiTransformConfig: apiTransformConfig
    });
}
exports.initApi = initApi;
//# sourceMappingURL=apisToOther.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/alipay/componentToOther.js":
/*!*******************************************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/alipay/componentToOther.js ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initComponent = void 0;
var tslib_1 = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
var runtime_base_1 = __webpack_require__(/*! @morjs/runtime-base */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/index.js");
var clone_deep_1 = tslib_1.__importDefault(__webpack_require__(/*! clone-deep */ "../node_modules/_clone-deep@4.0.1@clone-deep/index.js"));
var behaviorOrMixin_1 = __webpack_require__(/*! ../common/behaviorOrMixin */ "../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/common/behaviorOrMixin.js");
var utilsToOther_1 = __webpack_require__(/*! ./utilsToOther */ "../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/alipay/utilsToOther.js");
var MOR_PREFIX = 'mor';
/**
 * 保存在 dataset 的事件代理相关方法名称映射
 */
var MOR_EVENT_HANDLERS_DATASET = "".concat(MOR_PREFIX, "EventHandlers");
/**
 * 用于保存事件代理相关方法名称映射
 */
var MOR_EVENT_HANDLERS = "$".concat(MOR_EVENT_HANDLERS_DATASET);
/**
 * 用于保存 函数类型 的 props
 */
var MOR_FUNCTION_PROPS = "$".concat(MOR_PREFIX, "FuncProps");
/**
 * 用于保存 非函数类型 的 props
 */
var MOR_COMMON_PROPS = "$".concat(MOR_PREFIX, "CommonProps");
/**
 * 用于保存 deriveDataFromProps 函数，并模拟触发
 */
var MOR_DERIVE_DATA_FROM_PROPS_LIFECYCLE = "$".concat(MOR_PREFIX, "DeriveDataFromPropsLifeCycle");
/**
 * 标记 mor 是否需要忽略下一次 deriveDataFromProps 函数执行, 用于跳过重复触发, 避免循环调用
 */
var MOR_IGNORE_NEXT_DERIVE_DATA_FROM_PROPS_FLAG = "$".concat(MOR_PREFIX, "IgnoreNextDeriveDataFromPropsLifeCycle");
/**
 * 标记 mor 是否正在执行 deriveDataFromProps 函数
 */
var MOR_IS_RUNNING_DERIVE_DATA_FROM_PROPS_FLAG = "$".concat(MOR_PREFIX, "IsRunningDeriveDataFromPropsLifeCycle");
/**
 * 标记 mor 是否已初始化完成
 */
var MOR_IS_INITIALIZED_FLAG = "$".concat(MOR_PREFIX, "IsInitialized");
/**
 * 用于保存 didUpdate 函数，并模拟触发
 */
var MOR_DID_UPDATE_LIFECYCLE = "$".concat(MOR_PREFIX, "DidUpdateLifeCycle");
/**
 * 用于在组件实例中保存 data 更新前的数据
 */
var MOR_PREV_DATA = "$".concat(MOR_PREFIX, "PrevData");
/**
 * 用于在组件实例中保存 props 更新前的数据
 */
var MOR_PREV_PROPS = "$".concat(MOR_PREFIX, "PrevProps");
/**
 * 标记为已完成首次挂载
 */
var MOR_IS_IN_DID_MOUNT_FLAG = "$".concat(MOR_PREFIX, "IsInDidMount");
// 空函数
function emptyFn() {
    return undefined;
}
// 深拷贝
function cloneDeep(data, type, from) {
    if (from === void 0) { from = ''; }
    try {
        return (0, clone_deep_1.default)(data);
    }
    catch (error) {
        runtime_base_1.logger.warn("[mor] \u7EC4\u4EF6 ".concat(from, " \u6DF1\u62F7\u8D1D ").concat(type, " \u5931\u8D25, \u515C\u5E95\u4E3A\u6D45\u62F7\u8D1D, \u5931\u8D25\u539F\u56E0: "), error);
        return tslib_1.__assign({}, data);
    }
}
/**
 * 生成随机不重复事件 ID
 * @returns 事件 ID
 */
function generateEventId(prefix) {
    if (prefix === void 0) { prefix = 'e'; }
    return prefix + '-' + String(+new Date()) + String(Math.random());
}
// 事件属性名称正则
// 也用于识别函数正则 按照支付宝小程序的规则，on 开头的是函数
var EVENT_ATTR_REG = /^on([A-Za-z]+)/;
/**
 * 提取事件名称
 * @param attr 属性
 * @returns 事件名称
 */
function getEventName(attr) {
    var match = attr.match(EVENT_ATTR_REG);
    if (match) {
        var eventName = match[1];
        return "".concat(eventName[0].toLowerCase()).concat(eventName.slice(1));
    }
    return '';
}
/**
 * 获取 prop 的值类型
 *
 * 微信自定义组件的属性类型可以为 String Number Boolean Object Array 其一，也可以为 null 表示不限制类型
 *
 * 参见文档: https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html
 *
 * @param val - 组件中设置的 prop 属性值
 * @returns 属性类型
 */
function getPropType(val) {
    var propType = Object.prototype.toString.call(val).slice(8, -1);
    if (propType === 'String')
        return String;
    if (propType === 'Number')
        return Number;
    if (propType === 'Boolean')
        return Boolean;
    if (propType === 'Object')
        return Object;
    if (propType === 'Array')
        return Array;
    if (propType === 'Function')
        return Function;
    return null;
}
/**
 * 映射的 prop 名字，主要用于支持在微信中不识别或者有兼容问题的 prop
 */
var MAP_PROPS = { style: 'morStyle' };
/**
 * 还原映射后的 prop 名字，分开两个 object 主要是为了取值方便
 */
var RESTORE_PROPS = { morStyle: 'style' };
/**
 * 是否是需要映射的 prop
 *
 * @param prop - 属性名
 * @returns 是否是映射属性
 */
function isMapProp(prop) {
    return prop in MAP_PROPS;
}
/**
 * 判断是否是函数属性
 *
 * @param name - 属性名
 * @param value - 属性值
 * @param type - 属性类型
 * @returns 是否为函数属性
 */
function isFuncProp(name, value, type) {
    if (type != null &&
        (type.name === 'Function' || typeof value === 'function')) {
        return true;
    }
    if (EVENT_ATTR_REG.test(name)) {
        return true;
    }
    return false;
}
/**
 * 处理映射的属性关系
 *
 * @param componentOptions - 组件选项
 * @param mappedProps - 映射的属性列表
 */
function hookMapProps(componentOptions, mappedProps) {
    if (!mappedProps.length)
        return;
    var _loop_1 = function (mapName) {
        componentOptions.observers[MAP_PROPS[mapName]] = function (val) {
            var _a;
            this.setData((_a = {}, _a[mapName] = val, _a));
        };
    };
    for (var _i = 0, mappedProps_1 = mappedProps; _i < mappedProps_1.length; _i++) {
        var mapName = mappedProps_1[_i];
        _loop_1(mapName);
    }
}
/**
 * 处理属性转换
 *
 * @param options - 组件选项
 */
function injectAndTransformProps(options) {
    var funcProps = [];
    var commonProps = [];
    var properties = {};
    var mappedProps = [];
    if (options.props) {
        Object.keys(options.props).forEach(function (name) {
            if (name in MAP_PROPS) {
                mappedProps.push(name);
            }
            var value = options.props[name];
            var type = getPropType(value);
            var propName = isMapProp(name) ? MAP_PROPS[name] : name;
            if (isFuncProp(name, value, type)) {
                funcProps.push({
                    name: propName,
                    value: value,
                    type: type
                });
            }
            else {
                properties[propName] = {
                    type: type,
                    value: value
                };
                commonProps.push({
                    name: propName,
                    value: value,
                    type: type
                });
            }
        });
        if (commonProps.length > 0) {
            options.properties = tslib_1.__assign(tslib_1.__assign({}, options.properties), properties);
        }
    }
    options.data[MOR_FUNCTION_PROPS] = funcProps;
    options.data[MOR_COMMON_PROPS] = commonProps;
    return {
        commonProps: commonProps,
        funcProps: funcProps,
        mappedProps: mappedProps
    };
}
/**
 * 增加属性的监听，实现 this.props 的映射
 *
 * @param options - 组件选项
 * @param commonProps - 属性列表
 */
function injectObserversForCommonProps(options, commonProps) {
    var observerNames = commonProps.map(function (prop) { return prop.name; }).join(',');
    options.observers[observerNames] = function () {
        var _this = this;
        if (!this[MOR_IS_INITIALIZED_FLAG])
            this[MOR_IS_INITIALIZED_FLAG] = true;
        if (!this.props)
            this.props = {};
        this.data[MOR_COMMON_PROPS].forEach(function (prop) {
            _this.props[prop.name] = _this.data[prop.name];
            if (prop.name in RESTORE_PROPS) {
                _this.props[RESTORE_PROPS[prop.name]] = _this.data[prop.name];
            }
        });
    };
}
/**
 * 处理更新类的生命周期函数挂载
 *
 * @param options - 组件选项
 */
function hookObserversLifeCycle(options) {
    if (options.didUpdate) {
        options.methods[MOR_DID_UPDATE_LIFECYCLE] = options.didUpdate;
    }
    if (options.deriveDataFromProps) {
        options.methods[MOR_DERIVE_DATA_FROM_PROPS_LIFECYCLE] =
            options.deriveDataFromProps;
    }
}
/**
 * 增加所有数据的监听，实现 this.props 等的映射
 *
 * @param componentOptions - 组件选项
 */
function injectWildcardObserversProps(componentOptions) {
    componentOptions.observers['**'] = function () {
        var _this = this;
        if (!this.props)
            this.props = {};
        if (!this[MOR_IS_INITIALIZED_FLAG])
            this[MOR_PREV_DATA] = tslib_1.__assign({}, this.data);
        if (!this[MOR_IGNORE_NEXT_DERIVE_DATA_FROM_PROPS_FLAG]) {
            this[MOR_PREV_PROPS] = tslib_1.__assign({}, this.props);
        }
        var nextProps = cloneDeep(this.props, 'this.props', this === null || this === void 0 ? void 0 : this.is);
        if (this.data[MOR_COMMON_PROPS]) {
            this.data[MOR_COMMON_PROPS].forEach(function (prop) {
                nextProps[prop.name] = _this.data[prop.name];
                if (prop.name in RESTORE_PROPS) {
                    nextProps[RESTORE_PROPS[prop.name]] = _this.data[prop.name];
                }
            });
        }
        var ignoreNextDidUpdate = false;
        if (this[MOR_DERIVE_DATA_FROM_PROPS_LIFECYCLE] &&
            !this[MOR_IGNORE_NEXT_DERIVE_DATA_FROM_PROPS_FLAG]) {
            this[MOR_IS_RUNNING_DERIVE_DATA_FROM_PROPS_FLAG] = true;
            this[MOR_DERIVE_DATA_FROM_PROPS_LIFECYCLE](nextProps);
            this[MOR_IS_RUNNING_DERIVE_DATA_FROM_PROPS_FLAG] = false;
            if (this[MOR_IGNORE_NEXT_DERIVE_DATA_FROM_PROPS_FLAG]) {
                ignoreNextDidUpdate = true;
            }
        }
        this.props = nextProps;
        if (this[MOR_DID_UPDATE_LIFECYCLE] &&
            this[MOR_IS_INITIALIZED_FLAG] &&
            this[MOR_IS_IN_DID_MOUNT_FLAG] &&
            !ignoreNextDidUpdate) {
            this[MOR_DID_UPDATE_LIFECYCLE](this[MOR_PREV_PROPS], this[MOR_PREV_DATA]);
        }
        if (!this[MOR_IS_INITIALIZED_FLAG] && !ignoreNextDidUpdate) {
            this[MOR_IS_INITIALIZED_FLAG] = true;
        }
    };
}
/**
 * 处理生命周期映射
 *
 * @param componentOptions - 组件选项
 * @param needsToObserversLifeCycle - 是否有做数据监听
 */
function hookComponentLifeCycle(componentOptions, needsToObserversLifeCycle) {
    /**
     * 调用原本的生命周期函数
     * @param fnName 事件名
     */
    var callOriginalFn = function (fnName) {
        var _a;
        var originalFn = componentOptions[fnName];
        if ((_a = componentOptions.lifetimes) === null || _a === void 0 ? void 0 : _a[fnName]) {
            originalFn = componentOptions.lifetimes[fnName];
        }
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (originalFn) {
                originalFn.call.apply(originalFn, tslib_1.__spreadArray([this], args, false));
            }
        };
    };
    /**
     * 初始化 this.props
     */
    var initializeProps = function () {
        var _this = this;
        if (!this[MOR_IS_INITIALIZED_FLAG] && this.data[MOR_COMMON_PROPS]) {
            if (!this.props)
                this.props = {};
            this.data[MOR_COMMON_PROPS].forEach(function (prop) {
                _this.props[prop.name] = _this.data[prop.name];
                if (prop.name in RESTORE_PROPS) {
                    _this.props[RESTORE_PROPS[prop.name]] = _this.data[prop.name];
                }
            });
        }
    };
    /**
     * 覆盖 this.setData 方法, 用于监听数据变化
     */
    var hackSetData = function () {
        var _this = this;
        var originalSetData = this.setData;
        if (!originalSetData) {
            runtime_base_1.logger.error("[mor] \u52AB\u6301 setData \u5931\u8D25, \u53EF\u80FD\u5BFC\u81F4\u65E0\u6CD5\u6B63\u786E\u89E6\u53D1\u66F4\u65B0");
        }
        this[MOR_PREV_DATA] = {};
        this.setData = function (nextData, fn) {
            // 在 deriveDataFromProps 中调用了 setData
            if (_this[MOR_IS_RUNNING_DERIVE_DATA_FROM_PROPS_FLAG]) {
                _this[MOR_IGNORE_NEXT_DERIVE_DATA_FROM_PROPS_FLAG] = true;
                // 单独处理 deriveDataFromProps 中 setData 过程中修改的部分，否则 prevData 会错乱
                Object.keys(nextData).forEach(function (name) {
                    _this[MOR_PREV_DATA][name] = _this.data[name];
                });
            }
            else {
                _this[MOR_IGNORE_NEXT_DERIVE_DATA_FROM_PROPS_FLAG] = false;
                // 全量备份 prevData
                _this[MOR_PREV_DATA] = tslib_1.__assign({}, _this.data);
            }
            originalSetData.call(_this, nextData, function () {
                var _a;
                _this[MOR_IGNORE_NEXT_DERIVE_DATA_FROM_PROPS_FLAG] = false;
                // 补偿机制，可能会有风险，如果 setData 的回调执行过快
                _this[MOR_PREV_DATA] = tslib_1.__assign({}, _this.data);
                (_a = fn === null || fn === void 0 ? void 0 : fn.call) === null || _a === void 0 ? void 0 : _a.call(fn, _this);
            });
        };
    };
    /**
     * 确保基础信息存在
     */
    var ensureBaseInfo = function () {
        if (!this.$page) {
            if (typeof getCurrentPages === 'function') {
                var pages = getCurrentPages();
                this.$page = pages[pages.length - 1];
            }
        }
        if (!this.$morId)
            this.$morId = String((0, runtime_base_1.generateId)());
        if (!this.$id)
            this.$id = this.$morId;
    };
    /**
     * 注入 this.props 函数事件
     */
    var injectPropsEventFunctions = function () {
        var _this = this;
        var morFuncProps = this.data[MOR_FUNCTION_PROPS];
        if (!(morFuncProps === null || morFuncProps === void 0 ? void 0 : morFuncProps.length))
            return;
        morFuncProps.forEach(function (eventProp) {
            // 将函数 prop 写入到 this.props
            // 确保支付宝小程序中的诸如 this.props.onClick 可以被正确调用
            _this.props[eventProp.name] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var triggerEventName = getEventName(eventProp.name);
                var eventId = generateEventId(eventProp.name);
                return new Promise(function (resolve, reject) {
                    if (_this[MOR_EVENT_HANDLERS]) {
                        var $event = (0, runtime_base_1.getSharedProperty)('$event', _this);
                        if ($event) {
                            // 这里监听 eventId
                            // 并标记为事件完成或失败
                            $event.once(eventId, function (value) {
                                // 如果是异常需要抛出
                                value instanceof Error ? reject(value) : resolve(value);
                            });
                        }
                        else {
                            runtime_base_1.logger.warn('aComponent 或 createComponent 运行时强依赖 $event 做事件处理，请检查配置');
                        }
                        // 触发小程序原生事件
                        // 事件会被 $morEventHandlerProxy 事件代理方法捕获
                        // 并触发 event 事件, 基于 eventId
                        _this.triggerEvent(triggerEventName, {
                            name: _this[MOR_EVENT_HANDLERS][triggerEventName],
                            args: args,
                            id: eventId
                        });
                        // 如果无 $event 则直接 标记 完成
                        if (!$event)
                            resolve(undefined);
                    }
                });
            };
        });
    };
    var injectEventHandlers = function () {
        var _this = this;
        var _a;
        var morEventHandlers = (_a = this.dataset) === null || _a === void 0 ? void 0 : _a[MOR_EVENT_HANDLERS_DATASET];
        if (morEventHandlers) {
            try {
                this[MOR_EVENT_HANDLERS] = JSON.parse(runtime_base_1.Base64.decode(morEventHandlers));
                // ref 支持
                if (this[MOR_EVENT_HANDLERS].ref) {
                    this.triggerEvent('ref', {
                        name: this[MOR_EVENT_HANDLERS].ref,
                        args: [this]
                    });
                }
                // 其他事件代理
                var handlerNames_1 = Object.keys(this[MOR_EVENT_HANDLERS]);
                if (this.data[MOR_FUNCTION_PROPS]) {
                    this.data[MOR_FUNCTION_PROPS].forEach(function (prop) {
                        if (handlerNames_1.indexOf(getEventName(prop.name)) === -1) {
                            _this.props[prop.name] = prop.value;
                        }
                    });
                }
            }
            catch (err) {
                runtime_base_1.logger.error('转换 aComponent 或 createComponent 事件出错', morEventHandlers, err);
            }
        }
        else {
            if (this.data[MOR_FUNCTION_PROPS]) {
                this.data[MOR_FUNCTION_PROPS].forEach(function (prop) {
                    _this.props[prop.name] = prop.value;
                });
            }
        }
    };
    // 标记为 didMount
    var markAsDidMount = function () {
        this[MOR_IS_IN_DID_MOUNT_FLAG] = true;
    };
    var lifetimes = componentOptions.lifetimes;
    componentOptions.created = lifetimes.created = (0, runtime_base_1.compose)([
        needsToObserversLifeCycle ? hackSetData : emptyFn,
        callOriginalFn('created')
    ]);
    componentOptions.attached = lifetimes.attached = (0, runtime_base_1.compose)([
        initializeProps,
        ensureBaseInfo,
        injectPropsEventFunctions,
        injectEventHandlers,
        callOriginalFn('onInit'),
        callOriginalFn('attached')
    ]);
    componentOptions.ready = lifetimes.ready = (0, runtime_base_1.compose)([
        markAsDidMount,
        // 补偿设置多一次，某些情况下会偶现 getCurrentPages 返回为空，导致 this.$page 为空
        ensureBaseInfo,
        callOriginalFn('didMount'),
        callOriginalFn('ready')
    ]);
    componentOptions.detached = lifetimes.detached = (0, runtime_base_1.compose)([
        callOriginalFn('didUnmount'),
        callOriginalFn('detached')
    ]);
    componentOptions.error = lifetimes.error = (0, runtime_base_1.compose)([
        callOriginalFn('onError'),
        callOriginalFn('error')
    ]);
}
/**
 * 处理默认自定义组件的 options
 *
 * @param componentOptions - 组件选项
 */
function addCompatibleOptions(componentOptions) {
    if (!componentOptions.options.styleIsolation) {
        // 将样式共享默认设置成全局，保持和支付宝一致的行为
        componentOptions.options.styleIsolation = 'shared';
    }
    if (typeof componentOptions.options.multipleSlots === 'undefined') {
        // 默认设置成多slot，经过实验，默认slot开启了没关系
        componentOptions.options.multipleSlots = true;
    }
    if (componentOptions.options.pureDataPattern) {
        runtime_base_1.logger.warn('options.pureDataPattern 会用于 aComponent 或 createComponent 的 $mor 内部属性维护' +
            '如果需要使用请增加 /^\\$mor/ 的适配');
    }
    else {
        componentOptions.options.pureDataPattern = /^\$mor/;
    }
}
/**
 * 确保组件有对应的对象的存在
 *
 * @param options - 组件选项
 */
function ensureOptions(options) {
    if (!options.data)
        options.data = {};
    if (!options.observers)
        options.observers = {};
    if (!options.options)
        options.options = {};
    if (!options.methods)
        options.methods = {};
    if (!options.lifetimes)
        options.lifetimes = {};
}
/**
 * 清除无用的选项
 * @param options - 组件选项
 */
function cleanOptions(options) {
    delete options.props;
    delete options.onInit;
    delete options.deriveDataFromProps;
    delete options.didMount;
    delete options.didUpdate;
    delete options.didUnmount;
}
/**
 * 支付宝小程序转其他端的 Component 差异抹平
 *
 * @export
 * @param options - 组件选项
 */
function initComponent(options) {
    var hasDidUpdate = typeof options.didUpdate === 'function';
    var hasDeriveDataFromProps = typeof options.deriveDataFromProps === 'function';
    var needsToObserversLifeCycle = hasDidUpdate || hasDeriveDataFromProps;
    // 确保必要的内容
    ensureOptions(options);
    // 设置自定义组件的兼容性选项
    addCompatibleOptions(options);
    // 属性兼容性处理
    var _a = injectAndTransformProps(options), commonProps = _a.commonProps, mappedProps = _a.mappedProps;
    if (mappedProps.length)
        hookMapProps(options, mappedProps);
    if (commonProps.length && !needsToObserversLifeCycle) {
        injectObserversForCommonProps(options, commonProps);
    }
    if (needsToObserversLifeCycle) {
        hookObserversLifeCycle(options);
        injectWildcardObserversProps(options);
    }
    // 注入 hasMixin 支持
    (0, behaviorOrMixin_1.injectHasMixinSupport)(options.methods, options.mixins || []);
    // 注入组件生命周期
    hookComponentLifeCycle(options, needsToObserversLifeCycle);
    // 添加事件代理支持
    (0, utilsToOther_1.addEventProxy)(options.methods);
    // 注入实例方法的兼容性支持
    (0, utilsToOther_1.injectInstanceMethodsSupport)(options.methods);
    // 清理无用的 选项
    cleanOptions(options);
}
exports.initComponent = initComponent;
//# sourceMappingURL=componentToOther.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/alipay/needPromisfiedApis.js":
/*!*********************************************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/alipay/needPromisfiedApis.js ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.needPromisfiedApis = void 0;
/**
 * 支付宝需要被 promisified 的接口
 */
exports.needPromisfiedApis = [
    'addPhoneContact',
    'alert',
    'chooseAlipayContact',
    'chooseCity',
    'chooseContact',
    'chooseImage',
    'chooseLocation',
    'choosePhoneContact',
    'chooseVideo',
    'clearStorage',
    'closeBluetoothAdapter',
    'closeSocket',
    'confirm',
    'compressImage',
    'connectBLEDevice',
    'connectSocket',
    'datePicker',
    'disconnectBLEDevice',
    'downloadFile',
    'getAddress',
    'getAuthCode',
    'getAvailableAudioSources',
    'getBatteryInfo',
    'getBeacons',
    'getBLEDeviceCharacteristics',
    'getBLEDeviceServices',
    'getBluetoothAdapterState',
    'getBluetoothDevices',
    'getConnectedBluetoothDevices',
    'getConnectedWifi',
    'getFileInfo',
    'getImageInfo',
    'getLocation',
    'getNetworkType',
    'getOpenUserInfo',
    'getPhoneNumber',
    'getRunData',
    'getRunScene',
    'getSavedFileInfo',
    'getSavedFileList',
    'getScreenBrightness',
    'getServerTime',
    'getSetting',
    'getStorage',
    'getStorageInfo',
    'getSystemInfo',
    'getTitleColor',
    'getWifiList',
    'hideKeyboard',
    'hideLoading',
    'hideNavigationBarLoading',
    'hideShareMenu',
    'hideTabBar',
    'hideTabBarRedDot',
    'hideToast',
    'loadFontFace',
    'makeBluetoothPair',
    'makePhoneCall',
    'multiLevelSelect',
    'navigateBack',
    'navigateBackMiniProgram',
    'navigateTo',
    'navigateToMiniProgram',
    'notifyBLECharacteristicValueChange',
    'onLocatedComplete',
    'openBluetoothAdapter',
    'openDocument',
    'openLocation',
    'openSetting',
    'optionsSelect',
    'pageScrollTo',
    'paySignCenter',
    'previewImage',
    'prompt',
    'readBLECharacteristicValue',
    'redirectTo',
    'regionPicker',
    'reLaunch',
    'removeSavedFile',
    'removeStorage',
    'removeTabBarBadge',
    'rsa',
    'saveFile',
    'saveImageToPhotosAlbum',
    'saveVideoToPhotosAlbum',
    'sendSocketMessage',
    'setBackgroundColor',
    'setBackgroundTextStyle',
    'setKeepScreenOn',
    'setLocatedCity',
    'setScreenBrightness',
    'setStorage',
    'setTabBarBadge',
    'setTabBarItem',
    'setTabBarStyle',
    'showActionSheet',
    'showAuthGuide',
    'showLoading',
    'showNavigationBarLoading',
    'showTabBar',
    'showTabBarRedDot',
    'showToast',
    'startAccelerometer',
    'startBeaconDiscovery',
    'startBluetoothDevicesDiscovery',
    'startCompass',
    'startPullDownRefresh',
    'stopAccelerometer',
    'stopBeaconDiscovery',
    'stopBluetoothDevicesDiscovery',
    'stopCompass',
    'stopPullDownRefresh',
    'switchTab',
    'textRiskIdentification',
    'tradePay',
    'uploadFile',
    'vibrate',
    'vibrateLong',
    'vibrateShort',
    'watchShake',
    'writeBLECharacteristicValue'
];
//# sourceMappingURL=needPromisfiedApis.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/alipay/pageToOther.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/alipay/pageToOther.js ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initPage = void 0;
var behaviorOrMixin_1 = __webpack_require__(/*! ../common/behaviorOrMixin */ "../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/common/behaviorOrMixin.js");
var utilsToOther_1 = __webpack_require__(/*! ./utilsToOther */ "../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/alipay/utilsToOther.js");
/**
 * 支付宝转其他端的 Page 差异抹平
 */
function initPage(options) {
    (0, utilsToOther_1.addEventProxy)(options);
    (0, utilsToOther_1.injectInstanceMethodsSupport)(options);
    (0, behaviorOrMixin_1.injectHasMixinSupport)(options, options.mixins || []);
}
exports.initPage = initPage;
//# sourceMappingURL=pageToOther.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/alipay/utilsToOther.js":
/*!***************************************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/alipay/utilsToOther.js ***!
  \***************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectInstanceMethodsSupport = exports.addEventProxy = void 0;
var runtime_base_1 = __webpack_require__(/*! @morjs/runtime-base */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/index.js");
/**
 * 事件代理能力注入
 *
 * @param options - 组件或页面选项
 */
function addEventProxy(options) {
    /**
     * 支付宝小程序转其他小程序的事件代理函数
     * @param event 事件
     */
    options.$morEventHandlerProxy = function (event) {
        var _a = event.detail, name = _a.name, args = _a.args, id = _a.id;
        var value;
        if (typeof this[name] === 'function') {
            try {
                value = this[name].apply(this, args);
            }
            catch (err) {
                // 如果是异常了，需要透传到函数接受方那里抛出
                value = err;
            }
        }
        else {
            runtime_base_1.logger.warn('调用的事件并非函数', name);
        }
        var $event = (0, runtime_base_1.getSharedProperty)('$event', this);
        if ($event) {
            $event.emit(id, value);
        }
        else {
            runtime_base_1.logger.warn('aComponent 依赖 $event 的注入，请检查配置');
        }
    };
    /**
     * 用于禁止触摸或滚动的相关事件操作
     */
    /* eslint-disable @typescript-eslint/no-empty-function */
    options.$morDisableScrollProxy = function () { };
}
exports.addEventProxy = addEventProxy;
/**
 * 注入实例方法支持
 */
function injectInstanceMethodsSupport(options) {
    // 提供批量更新方法支持
    options.$batchedUpdates = function (cb) {
        if (this.groupSetData)
            this.groupSetData(cb);
    };
}
exports.injectInstanceMethodsSupport = injectInstanceMethodsSupport;
//# sourceMappingURL=utilsToOther.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/common/behaviorOrMixin.js":
/*!******************************************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/common/behaviorOrMixin.js ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.injectHasMixinSupport = exports.injectHasBehaviorSupport = exports.Mixin = exports.Behavior = void 0;
var runtime_base_1 = __webpack_require__(/*! @morjs/runtime-base */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/index.js");
function BehaviorOrMixin(options, types) {
    var behaviorsOrMixins = (options === null || options === void 0 ? void 0 : options[types]) || [];
    var definitionFilter = options === null || options === void 0 ? void 0 : options.definitionFilter;
    var definitionFilterArr = [];
    // 执行当前 behaviors/mixins 中的 definitionFilter
    behaviorsOrMixins.map(function (item) {
        if (item.definitionFilter) {
            if (typeof item.definitionFilter === 'function') {
                definitionFilterArr.push(item.definitionFilter);
                item.definitionFilter(options);
            }
            else {
                runtime_base_1.logger.error("".concat(types, " definitionFilter \u5B9A\u4E49\u6BB5\u4E0D\u662F\u4E00\u4E2A\u6709\u6548\u7684\u51FD\u6570: ").concat(item.definitionFilter));
            }
        }
    });
    // 重写 definitionFilter, 补充 definitionFilterArr 参数
    if (definitionFilter) {
        options.definitionFilter = function (defFields) {
            definitionFilter(defFields, definitionFilterArr);
        };
    }
    return options;
}
/**
 * Behavior 构造函数实现
 * @param options - Behavior 选项
 */
function Behavior(options) {
    return BehaviorOrMixin(options, 'behaviors');
}
exports.Behavior = Behavior;
/**
 * Mixin 构造函数实现
 * @param options - Mixin 选项
 */
function Mixin(options) {
    return BehaviorOrMixin(options, 'mixins');
}
exports.Mixin = Mixin;
function hasBehaviorOrMixin(items, item) {
    var _a;
    if (!item)
        return false;
    if (items.indexOf(item) !== -1)
        return true;
    for (var i = 0; i < items.length; i++) {
        if (hasBehaviorOrMixin(((_a = items[i]) === null || _a === void 0 ? void 0 : _a.items) || [], item))
            return true;
    }
    return false;
}
/**
 * 注入 hasBehavior 方法支持
 */
function injectHasBehaviorSupport(options, behaviors) {
    // 保存当前页面或组件中的 behaviors
    behaviors = behaviors || [];
    options.hasBehavior = function (behavior) {
        return hasBehaviorOrMixin(behaviors, behavior);
    };
}
exports.injectHasBehaviorSupport = injectHasBehaviorSupport;
/**
 * 注入 hasMixin 方法支持
 */
function injectHasMixinSupport(options, mixins) {
    // 保存当前页面或组件中的 mixins
    mixins = mixins || [];
    options.hasMixin = function (mixin) {
        return hasBehaviorOrMixin(mixins, mixin);
    };
}
exports.injectHasMixinSupport = injectHasMixinSupport;
//# sourceMappingURL=behaviorOrMixin.js.map

/***/ }),

/***/ "../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/wechat/apis.js":
/*!*******************************************************************************************!*\
  !*** ../node_modules/_@morjs_runtime-mini@1.0.106@@morjs/runtime-mini/lib/wechat/apis.js ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initApi = exports.needPromisfiedApis = void 0;
var runtime_base_1 = __webpack_require__(/*! @morjs/runtime-base */ "../node_modules/_@morjs_runtime-base@1.0.69@@morjs/runtime-base/lib/index.js");
/**
 * 微信需要被 promisified 的接口
 */
exports.needPromisfiedApis = [
    'addPhoneContact',
    'authorize',
    'authPrivateMessage',
    'canvasGetImageData',
    'canvasPutImageData',
    'canvasToTempFilePath',
    'checkSession',
    'chooseAddress',
    'chooseImage',
    'chooseInvoiceTitle',
    'chooseLocation',
    'chooseVideo',
    'clearStorage',
    'closeBLEConnection',
    'closeBluetoothAdapter',
    'closeSocket',
    'compressImage',
    'connectSocket',
    'createBLEConnection',
    'disableAlertBeforeUnload',
    'downloadFile',
    'enableAlertBeforeUnload',
    'exitMiniProgram',
    'getAvailableAudioSources',
    'getBackgroundFetchData',
    'getBatteryInfo',
    'getBeacons',
    'getBLEDeviceCharacteristics',
    'getBLEDeviceServices',
    'getBluetoothAdapterState',
    'getBluetoothDevices',
    'getClipboardData',
    'getConnectedBluetoothDevices',
    'getConnectedWifi',
    'getExtConfig',
    'getFileInfo',
    'getGroupEnterInfo',
    'getImageInfo',
    'getLocation',
    'getNetworkType',
    'getSavedFileInfo',
    'getSavedFileList',
    'getScreenBrightness',
    'getSetting',
    'getShareInfo',
    'getStorage',
    'getStorageInfo',
    'getSystemInfo',
    'getUserInfo',
    'getUserProfile',
    'getWeRunData',
    'getWifiList',
    'hideHomeButton',
    'hideKeyboard',
    'hideLoading',
    'hideNavigationBarLoading',
    'hideShareMenu',
    'hideTabBar',
    'hideTabBarRedDot',
    'hideToast',
    'join1v1Chat',
    'loadFontFace',
    'login',
    'makePhoneCall',
    'navigateBack',
    'navigateBackMiniProgram',
    'navigateTo',
    'navigateToBookshelf',
    'navigateToMiniProgram',
    'notifyBLECharacteristicValueChange',
    'openBluetoothAdapter',
    'openCustomerServiceChat',
    'openDocument',
    'openLocation',
    'openSetting',
    'openVideoEditor',
    'pageScrollTo',
    'previewImage',
    'queryBookshelf',
    'readBLECharacteristicValue',
    'redirectTo',
    'reLaunch',
    'removeSavedFile',
    'removeStorage',
    'removeTabBarBadge',
    'requestSubscribeMessage',
    'saveFile',
    'saveFileToDisk',
    'saveImageToPhotosAlbum',
    'saveVideoToPhotosAlbum',
    'scanCode',
    'scanItem',
    'sendBizRedPacket',
    'sendSocketMessage',
    'setBackgroundColor',
    'setBackgroundTextStyle',
    'setClipboardData',
    'setEnable1v1Chat',
    'setEnableDebug',
    'setInnerAudioOption',
    'setKeepScreenOn',
    'setNavigationBarColor',
    'setNavigationBarTitle',
    'setScreenBrightness',
    'setStorage',
    'setTabBarBadge',
    'setTabBarItem',
    'setTabBarStyle',
    'setWindowSize',
    'showActionSheet',
    'showFavoriteGuide',
    'showLoading',
    'showModal',
    'showNavigationBarLoading',
    'showShareMenu',
    'showTabBar',
    'showTabBarRedDot',
    'showToast',
    'startAccelerometer',
    'startBeaconDiscovery',
    'startBluetoothDevicesDiscovery',
    'startCompass',
    'startDeviceMotionListening',
    'startFacialRecognitionVerify',
    'startPullDownRefresh',
    'stopAccelerometer',
    'stopBeaconDiscovery',
    'stopBluetoothDevicesDiscovery',
    'stopCompass',
    'stopDeviceMotionListening',
    'stopPullDownRefresh',
    'switchTab',
    'uploadFile',
    'vibrateLong',
    'vibrateShort',
    'writeBLECharacteristicValue'
];
var apiTransformConfig = {
    nextTick: {
        fn: function (global, callback) {
            if (typeof callback !== 'function')
                return;
            if (typeof (global === null || global === void 0 ? void 0 : global.nextTick) === 'function') {
                return global.nextTick(callback);
            }
            else {
                return setTimeout(callback, 0);
            }
        }
    }
};
function initApi(mor) {
    (0, runtime_base_1.transformApis)(mor, (0, runtime_base_1.getGlobalObject)(), {
        needPromisfiedApis: exports.needPromisfiedApis,
        apiTransformConfig: apiTransformConfig
    }, false, false);
}
exports.initApi = initApi;
//# sourceMappingURL=apis.js.map

/***/ }),

/***/ "../node_modules/_clone-deep@4.0.1@clone-deep/index.js":
/*!*************************************************************!*\
  !*** ../node_modules/_clone-deep@4.0.1@clone-deep/index.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


/**
 * Module dependenices
 */

const clone = __webpack_require__(/*! shallow-clone */ "../node_modules/_shallow-clone@3.0.1@shallow-clone/index.js");
const typeOf = __webpack_require__(/*! kind-of */ "../node_modules/_kind-of@6.0.3@kind-of/index.js");
const isPlainObject = __webpack_require__(/*! is-plain-object */ "../node_modules/_is-plain-object@2.0.4@is-plain-object/index.js");

function cloneDeep(val, instanceClone) {
  switch (typeOf(val)) {
    case 'object':
      return cloneObjectDeep(val, instanceClone);
    case 'array':
      return cloneArrayDeep(val, instanceClone);
    default: {
      return clone(val);
    }
  }
}

function cloneObjectDeep(val, instanceClone) {
  if (typeof instanceClone === 'function') {
    return instanceClone(val);
  }
  if (instanceClone || isPlainObject(val)) {
    const res = new val.constructor();
    for (let key in val) {
      res[key] = cloneDeep(val[key], instanceClone);
    }
    return res;
  }
  return val;
}

function cloneArrayDeep(val, instanceClone) {
  const res = new val.constructor(val.length);
  for (let i = 0; i < val.length; i++) {
    res[i] = cloneDeep(val[i], instanceClone);
  }
  return res;
}

/**
 * Expose `cloneDeep`
 */

module.exports = cloneDeep;


/***/ }),

/***/ "../node_modules/_dayjs@1.11.11@dayjs/dayjs.min.js":
/*!*********************************************************!*\
  !*** ../node_modules/_dayjs@1.11.11@dayjs/dayjs.min.js ***!
  \*********************************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function(t){return t instanceof _||!(!t||!t[p])},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},O=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=w(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[p]=!0}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return b},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return O(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<O(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return b.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return b.s(e.$y,4,"0");case"M":return a+1;case"MM":return b.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return b.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return b.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(s,u,!0);case"A":return $(s,u,!1);case"m":return String(u);case"mm":return b.s(u,2,"0");case"s":return String(e.$s);case"ss":return b.s(e.$s,2,"0");case"SSS":return b.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return b.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g}return l?$:b.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),k=_.prototype;return O.prototype=k,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=!0),O},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t)},O.en=D[g],O.Ls=D,O.p={},O}));

/***/ }),

/***/ "../node_modules/_is-plain-object@2.0.4@is-plain-object/index.js":
/*!***********************************************************************!*\
  !*** ../node_modules/_is-plain-object@2.0.4@is-plain-object/index.js ***!
  \***********************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(/*! isobject */ "../node_modules/_isobject@3.0.1@isobject/index.js");

function isObjectObject(o) {
  return isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};


/***/ }),

/***/ "../node_modules/_isobject@3.0.1@isobject/index.js":
/*!*********************************************************!*\
  !*** ../node_modules/_isobject@3.0.1@isobject/index.js ***!
  \*********************************************************/
/***/ (function(module) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};


/***/ }),

/***/ "../node_modules/_kind-of@6.0.3@kind-of/index.js":
/*!*******************************************************!*\
  !*** ../node_modules/_kind-of@6.0.3@kind-of/index.js ***!
  \*******************************************************/
/***/ (function(module) {

var toString = Object.prototype.toString;

module.exports = function kindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';

  var type = typeof val;
  if (type === 'boolean') return 'boolean';
  if (type === 'string') return 'string';
  if (type === 'number') return 'number';
  if (type === 'symbol') return 'symbol';
  if (type === 'function') {
    return isGeneratorFn(val) ? 'generatorfunction' : 'function';
  }

  if (isArray(val)) return 'array';
  if (isBuffer(val)) return 'buffer';
  if (isArguments(val)) return 'arguments';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  if (isRegexp(val)) return 'regexp';

  switch (ctorName(val)) {
    case 'Symbol': return 'symbol';
    case 'Promise': return 'promise';

    // Set, Map, WeakSet, WeakMap
    case 'WeakMap': return 'weakmap';
    case 'WeakSet': return 'weakset';
    case 'Map': return 'map';
    case 'Set': return 'set';

    // 8-bit typed arrays
    case 'Int8Array': return 'int8array';
    case 'Uint8Array': return 'uint8array';
    case 'Uint8ClampedArray': return 'uint8clampedarray';

    // 16-bit typed arrays
    case 'Int16Array': return 'int16array';
    case 'Uint16Array': return 'uint16array';

    // 32-bit typed arrays
    case 'Int32Array': return 'int32array';
    case 'Uint32Array': return 'uint32array';
    case 'Float32Array': return 'float32array';
    case 'Float64Array': return 'float64array';
  }

  if (isGeneratorObj(val)) {
    return 'generator';
  }

  // Non-plain objects
  type = toString.call(val);
  switch (type) {
    case '[object Object]': return 'object';
    // iterators
    case '[object Map Iterator]': return 'mapiterator';
    case '[object Set Iterator]': return 'setiterator';
    case '[object String Iterator]': return 'stringiterator';
    case '[object Array Iterator]': return 'arrayiterator';
  }

  // other
  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
};

function ctorName(val) {
  return typeof val.constructor === 'function' ? val.constructor.name : null;
}

function isArray(val) {
  if (Array.isArray) return Array.isArray(val);
  return val instanceof Array;
}

function isError(val) {
  return val instanceof Error || (typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number');
}

function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function'
    && typeof val.getDate === 'function'
    && typeof val.setDate === 'function';
}

function isRegexp(val) {
  if (val instanceof RegExp) return true;
  return typeof val.flags === 'string'
    && typeof val.ignoreCase === 'boolean'
    && typeof val.multiline === 'boolean'
    && typeof val.global === 'boolean';
}

function isGeneratorFn(name, val) {
  return ctorName(name) === 'GeneratorFunction';
}

function isGeneratorObj(val) {
  return typeof val.throw === 'function'
    && typeof val.return === 'function'
    && typeof val.next === 'function';
}

function isArguments(val) {
  try {
    if (typeof val.length === 'number' && typeof val.callee === 'function') {
      return true;
    }
  } catch (err) {
    if (err.message.indexOf('callee') !== -1) {
      return true;
    }
  }
  return false;
}

/**
 * If you need to support Safari 5-7 (8-10 yr-old browser),
 * take a look at https://github.com/feross/is-buffer
 */

function isBuffer(val) {
  if (val.constructor && typeof val.constructor.isBuffer === 'function') {
    return val.constructor.isBuffer(val);
  }
  return false;
}


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_Hash.js":
/*!*******************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_Hash.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hashClear = __webpack_require__(/*! ./_hashClear */ "../node_modules/_lodash@4.17.21@lodash/_hashClear.js"),
    hashDelete = __webpack_require__(/*! ./_hashDelete */ "../node_modules/_lodash@4.17.21@lodash/_hashDelete.js"),
    hashGet = __webpack_require__(/*! ./_hashGet */ "../node_modules/_lodash@4.17.21@lodash/_hashGet.js"),
    hashHas = __webpack_require__(/*! ./_hashHas */ "../node_modules/_lodash@4.17.21@lodash/_hashHas.js"),
    hashSet = __webpack_require__(/*! ./_hashSet */ "../node_modules/_lodash@4.17.21@lodash/_hashSet.js");

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_ListCache.js":
/*!************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_ListCache.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ "../node_modules/_lodash@4.17.21@lodash/_listCacheClear.js"),
    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ "../node_modules/_lodash@4.17.21@lodash/_listCacheDelete.js"),
    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ "../node_modules/_lodash@4.17.21@lodash/_listCacheGet.js"),
    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ "../node_modules/_lodash@4.17.21@lodash/_listCacheHas.js"),
    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ "../node_modules/_lodash@4.17.21@lodash/_listCacheSet.js");

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_Map.js":
/*!******************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_Map.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../node_modules/_lodash@4.17.21@lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../node_modules/_lodash@4.17.21@lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_MapCache.js":
/*!***********************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_MapCache.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ "../node_modules/_lodash@4.17.21@lodash/_mapCacheClear.js"),
    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ "../node_modules/_lodash@4.17.21@lodash/_mapCacheDelete.js"),
    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ "../node_modules/_lodash@4.17.21@lodash/_mapCacheGet.js"),
    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ "../node_modules/_lodash@4.17.21@lodash/_mapCacheHas.js"),
    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ "../node_modules/_lodash@4.17.21@lodash/_mapCacheSet.js");

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_Symbol.js":
/*!*********************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_Symbol.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "../node_modules/_lodash@4.17.21@lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_arrayMap.js":
/*!***********************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_arrayMap.js ***!
  \***********************************************************/
/***/ (function(module) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_assocIndexOf.js":
/*!***************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_assocIndexOf.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var eq = __webpack_require__(/*! ./eq */ "../node_modules/_lodash@4.17.21@lodash/eq.js");

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_baseGet.js":
/*!**********************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_baseGet.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var castPath = __webpack_require__(/*! ./_castPath */ "../node_modules/_lodash@4.17.21@lodash/_castPath.js"),
    toKey = __webpack_require__(/*! ./_toKey */ "../node_modules/_lodash@4.17.21@lodash/_toKey.js");

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_baseGetTag.js":
/*!*************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_baseGetTag.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../node_modules/_lodash@4.17.21@lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "../node_modules/_lodash@4.17.21@lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "../node_modules/_lodash@4.17.21@lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_baseIsNative.js":
/*!***************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_baseIsNative.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "../node_modules/_lodash@4.17.21@lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "../node_modules/_lodash@4.17.21@lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../node_modules/_lodash@4.17.21@lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "../node_modules/_lodash@4.17.21@lodash/_toSource.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_baseToString.js":
/*!***************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_baseToString.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../node_modules/_lodash@4.17.21@lodash/_Symbol.js"),
    arrayMap = __webpack_require__(/*! ./_arrayMap */ "../node_modules/_lodash@4.17.21@lodash/_arrayMap.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../node_modules/_lodash@4.17.21@lodash/isArray.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "../node_modules/_lodash@4.17.21@lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = baseToString;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_castPath.js":
/*!***********************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_castPath.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isArray = __webpack_require__(/*! ./isArray */ "../node_modules/_lodash@4.17.21@lodash/isArray.js"),
    isKey = __webpack_require__(/*! ./_isKey */ "../node_modules/_lodash@4.17.21@lodash/_isKey.js"),
    stringToPath = __webpack_require__(/*! ./_stringToPath */ "../node_modules/_lodash@4.17.21@lodash/_stringToPath.js"),
    toString = __webpack_require__(/*! ./toString */ "../node_modules/_lodash@4.17.21@lodash/toString.js");

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}

module.exports = castPath;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_coreJsData.js":
/*!*************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_coreJsData.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "../node_modules/_lodash@4.17.21@lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_freeGlobal.js":
/*!*************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_freeGlobal.js ***!
  \*************************************************************/
/***/ (function(module) {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_getMapData.js":
/*!*************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_getMapData.js ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isKeyable = __webpack_require__(/*! ./_isKeyable */ "../node_modules/_lodash@4.17.21@lodash/_isKeyable.js");

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_getNative.js":
/*!************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_getNative.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "../node_modules/_lodash@4.17.21@lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "../node_modules/_lodash@4.17.21@lodash/_getValue.js");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_getRawTag.js":
/*!************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_getRawTag.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../node_modules/_lodash@4.17.21@lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_getValue.js":
/*!***********************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_getValue.js ***!
  \***********************************************************/
/***/ (function(module) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_hashClear.js":
/*!************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_hashClear.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../node_modules/_lodash@4.17.21@lodash/_nativeCreate.js");

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_hashDelete.js":
/*!*************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_hashDelete.js ***!
  \*************************************************************/
/***/ (function(module) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_hashGet.js":
/*!**********************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_hashGet.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../node_modules/_lodash@4.17.21@lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_hashHas.js":
/*!**********************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_hashHas.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../node_modules/_lodash@4.17.21@lodash/_nativeCreate.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_hashSet.js":
/*!**********************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_hashSet.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../node_modules/_lodash@4.17.21@lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_isKey.js":
/*!********************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_isKey.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isArray = __webpack_require__(/*! ./isArray */ "../node_modules/_lodash@4.17.21@lodash/isArray.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "../node_modules/_lodash@4.17.21@lodash/isSymbol.js");

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

module.exports = isKey;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_isKeyable.js":
/*!************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_isKeyable.js ***!
  \************************************************************/
/***/ (function(module) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_isMasked.js":
/*!***********************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_isMasked.js ***!
  \***********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "../node_modules/_lodash@4.17.21@lodash/_coreJsData.js");

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_listCacheClear.js":
/*!*****************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_listCacheClear.js ***!
  \*****************************************************************/
/***/ (function(module) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_listCacheDelete.js":
/*!******************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_listCacheDelete.js ***!
  \******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../node_modules/_lodash@4.17.21@lodash/_assocIndexOf.js");

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_listCacheGet.js":
/*!***************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_listCacheGet.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../node_modules/_lodash@4.17.21@lodash/_assocIndexOf.js");

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_listCacheHas.js":
/*!***************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_listCacheHas.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../node_modules/_lodash@4.17.21@lodash/_assocIndexOf.js");

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_listCacheSet.js":
/*!***************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_listCacheSet.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../node_modules/_lodash@4.17.21@lodash/_assocIndexOf.js");

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_mapCacheClear.js":
/*!****************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_mapCacheClear.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Hash = __webpack_require__(/*! ./_Hash */ "../node_modules/_lodash@4.17.21@lodash/_Hash.js"),
    ListCache = __webpack_require__(/*! ./_ListCache */ "../node_modules/_lodash@4.17.21@lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "../node_modules/_lodash@4.17.21@lodash/_Map.js");

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_mapCacheDelete.js":
/*!*****************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_mapCacheDelete.js ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../node_modules/_lodash@4.17.21@lodash/_getMapData.js");

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_mapCacheGet.js":
/*!**************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_mapCacheGet.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../node_modules/_lodash@4.17.21@lodash/_getMapData.js");

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_mapCacheHas.js":
/*!**************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_mapCacheHas.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../node_modules/_lodash@4.17.21@lodash/_getMapData.js");

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_mapCacheSet.js":
/*!**************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_mapCacheSet.js ***!
  \**************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../node_modules/_lodash@4.17.21@lodash/_getMapData.js");

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_memoizeCapped.js":
/*!****************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_memoizeCapped.js ***!
  \****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var memoize = __webpack_require__(/*! ./memoize */ "../node_modules/_lodash@4.17.21@lodash/memoize.js");

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

module.exports = memoizeCapped;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_nativeCreate.js":
/*!***************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_nativeCreate.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../node_modules/_lodash@4.17.21@lodash/_getNative.js");

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_objectToString.js":
/*!*****************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_objectToString.js ***!
  \*****************************************************************/
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_root.js":
/*!*******************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_root.js ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../node_modules/_lodash@4.17.21@lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_stringToPath.js":
/*!***************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_stringToPath.js ***!
  \***************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var memoizeCapped = __webpack_require__(/*! ./_memoizeCapped */ "../node_modules/_lodash@4.17.21@lodash/_memoizeCapped.js");

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

module.exports = stringToPath;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_toKey.js":
/*!********************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_toKey.js ***!
  \********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isSymbol = __webpack_require__(/*! ./isSymbol */ "../node_modules/_lodash@4.17.21@lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toKey;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/_toSource.js":
/*!***********************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/_toSource.js ***!
  \***********************************************************/
/***/ (function(module) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/eq.js":
/*!****************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/eq.js ***!
  \****************************************************/
/***/ (function(module) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/get.js":
/*!*****************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/get.js ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGet = __webpack_require__(/*! ./_baseGet */ "../node_modules/_lodash@4.17.21@lodash/_baseGet.js");

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/isArray.js":
/*!*********************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/isArray.js ***!
  \*********************************************************/
/***/ (function(module) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/isFunction.js":
/*!************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/isFunction.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../node_modules/_lodash@4.17.21@lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../node_modules/_lodash@4.17.21@lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/isObject.js":
/*!**********************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/isObject.js ***!
  \**********************************************************/
/***/ (function(module) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/isObjectLike.js":
/*!**************************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/isObjectLike.js ***!
  \**************************************************************/
/***/ (function(module) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/isSymbol.js":
/*!**********************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/isSymbol.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../node_modules/_lodash@4.17.21@lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../node_modules/_lodash@4.17.21@lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/memoize.js":
/*!*********************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/memoize.js ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var MapCache = __webpack_require__(/*! ./_MapCache */ "../node_modules/_lodash@4.17.21@lodash/_MapCache.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

module.exports = memoize;


/***/ }),

/***/ "../node_modules/_lodash@4.17.21@lodash/toString.js":
/*!**********************************************************!*\
  !*** ../node_modules/_lodash@4.17.21@lodash/toString.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseToString = __webpack_require__(/*! ./_baseToString */ "../node_modules/_lodash@4.17.21@lodash/_baseToString.js");

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;


/***/ }),

/***/ "../node_modules/_shallow-clone@3.0.1@shallow-clone/index.js":
/*!*******************************************************************!*\
  !*** ../node_modules/_shallow-clone@3.0.1@shallow-clone/index.js ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
/*!
 * shallow-clone <https://github.com/jonschlinkert/shallow-clone>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */



const valueOf = Symbol.prototype.valueOf;
const typeOf = __webpack_require__(/*! kind-of */ "../node_modules/_kind-of@6.0.3@kind-of/index.js");

function clone(val, deep) {
  switch (typeOf(val)) {
    case 'array':
      return val.slice();
    case 'object':
      return Object.assign({}, val);
    case 'date':
      return new val.constructor(Number(val));
    case 'map':
      return new Map(val);
    case 'set':
      return new Set(val);
    case 'buffer':
      return cloneBuffer(val);
    case 'symbol':
      return cloneSymbol(val);
    case 'arraybuffer':
      return cloneArrayBuffer(val);
    case 'float32array':
    case 'float64array':
    case 'int16array':
    case 'int32array':
    case 'int8array':
    case 'uint16array':
    case 'uint32array':
    case 'uint8clampedarray':
    case 'uint8array':
      return cloneTypedArray(val);
    case 'regexp':
      return cloneRegExp(val);
    case 'error':
      return Object.create(val);
    default: {
      return val;
    }
  }
}

function cloneRegExp(val) {
  const flags = val.flags !== void 0 ? val.flags : (/\w+$/.exec(val) || void 0);
  const re = new val.constructor(val.source, flags);
  re.lastIndex = val.lastIndex;
  return re;
}

function cloneArrayBuffer(val) {
  const res = new val.constructor(val.byteLength);
  new Uint8Array(res).set(new Uint8Array(val));
  return res;
}

function cloneTypedArray(val, deep) {
  return new val.constructor(val.buffer, val.byteOffset, val.length);
}

function cloneBuffer(val) {
  const len = val.length;
  const buf = Buffer.allocUnsafe ? Buffer.allocUnsafe(len) : Buffer.from(len);
  val.copy(buf);
  return buf;
}

function cloneSymbol(val) {
  return valueOf ? Object(valueOf.call(val)) : {};
}

/**
 * Expose `clone`
 */

module.exports = clone;


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/back-top/props.js":
/*!*********************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/back-top/props.js ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    externalClasses: {
        type: Array,
    },
    visibilityHeight: {
        type: Number,
        value: 200,
    },
    scrollTop: {
        type: Number,
        value: 0,
    },
    fixed: {
        type: Boolean,
        value: true,
    },
    icon: {
        type: null,
        value: true,
    },
    text: {
        type: String,
        value: '',
    },
    theme: {
        type: String,
        value: 'round',
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/badge/props.js":
/*!******************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/badge/props.js ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    color: {
        type: String,
        value: '',
    },
    content: {
        type: String,
        value: '',
    },
    count: {
        type: null,
        value: 0,
    },
    dot: {
        type: Boolean,
        value: false,
    },
    externalClasses: {
        type: Array,
    },
    maxCount: {
        type: Number,
        value: 99,
    },
    offset: {
        type: Array,
    },
    shape: {
        type: String,
        value: 'circle',
    },
    showZero: {
        type: Boolean,
        value: false,
    },
    size: {
        type: String,
        value: 'medium',
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/button/props.js":
/*!*******************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/button/props.js ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    tId: {
        type: String,
        value: '',
    },
    block: {
        type: Boolean,
        value: false,
    },
    content: {
        type: String,
    },
    customDataset: {
        type: null,
    },
    disabled: {
        type: Boolean,
        value: false,
    },
    externalClasses: {
        type: Array,
    },
    ghost: {
        type: Boolean,
        value: false,
    },
    icon: {
        type: null,
    },
    loading: {
        type: Boolean,
        value: false,
    },
    loadingProps: {
        type: Object,
    },
    shape: {
        type: String,
        value: 'rectangle',
    },
    size: {
        type: String,
        value: 'medium',
    },
    theme: {
        type: String,
        value: 'default',
    },
    type: {
        type: String,
    },
    variant: {
        type: String,
        value: 'base',
    },
    openType: {
        type: String,
    },
    hoverClass: {
        type: String,
        value: '',
    },
    hoverStopPropagation: {
        type: Boolean,
        value: false,
    },
    hoverStartTime: {
        type: Number,
        value: 20,
    },
    hoverStayTime: {
        type: Number,
        value: 70,
    },
    lang: {
        type: String,
        value: 'en',
    },
    sessionFrom: {
        type: String,
        value: '',
    },
    sendMessageTitle: {
        type: String,
        value: '',
    },
    sendMessagePath: {
        type: String,
        value: '',
    },
    sendMessageImg: {
        type: String,
        value: '',
    },
    appParameter: {
        type: String,
        value: '',
    },
    showMessageCard: {
        type: Boolean,
        value: false,
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/cell/props.js":
/*!*****************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/cell/props.js ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    align: {
        type: String,
        value: 'middle',
    },
    arrow: {
        type: null,
        value: false,
    },
    bordered: {
        type: Boolean,
        value: true,
    },
    description: {
        type: String,
    },
    externalClasses: {
        type: Array,
    },
    hover: {
        type: Boolean,
    },
    image: {
        type: String,
    },
    jumpType: {
        type: String,
        value: 'navigateTo',
    },
    leftIcon: {
        type: null,
    },
    note: {
        type: String,
    },
    required: {
        type: Boolean,
        value: false,
    },
    rightIcon: {
        type: null,
    },
    title: {
        type: String,
    },
    url: {
        type: String,
        value: '',
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/checkbox-group/props.js":
/*!***************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/checkbox-group/props.js ***!
  \***************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    borderless: {
        type: Boolean,
        value: false,
    },
    disabled: {
        type: Boolean,
    },
    max: {
        type: Number,
        value: undefined,
    },
    name: {
        type: String,
        value: '',
    },
    options: {
        type: Array,
        value: [],
    },
    value: {
        type: Array,
        value: null,
    },
    defaultValue: {
        type: Array,
        value: [],
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/checkbox/props.js":
/*!*********************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/checkbox/props.js ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    block: {
        type: Boolean,
        value: true,
    },
    borderless: {
        type: Boolean,
        value: false,
    },
    checkAll: {
        type: Boolean,
        value: false,
    },
    checked: {
        type: Boolean,
        value: null,
    },
    defaultChecked: {
        type: Boolean,
        value: false,
    },
    content: {
        type: String,
    },
    contentDisabled: {
        type: Boolean,
    },
    disabled: {
        type: null,
        value: undefined,
    },
    externalClasses: {
        type: Array,
    },
    icon: {
        type: null,
        value: 'circle',
    },
    indeterminate: {
        type: Boolean,
        value: false,
    },
    label: {
        type: String,
    },
    maxContentRow: {
        type: Number,
        value: 5,
    },
    maxLabelRow: {
        type: Number,
        value: 3,
    },
    name: {
        type: String,
        value: '',
    },
    placement: {
        type: String,
        value: 'left',
    },
    readonly: {
        type: Boolean,
        value: false,
    },
    value: {
        type: null,
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js":
/*!********************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "prefix": function() { return /* binding */ prefix; }
/* harmony export */ });
/* harmony default export */ __webpack_exports__["default"] = ({
    prefix: "t",
});
const prefix = "t";


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/control.js":
/*!*************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/control.js ***!
  \*************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export useControl */
const defaultOption = {
    valueKey: 'value',
    defaultValueKey: 'defaultValue',
    changeEventName: 'change',
    strict: true,
};
function useControl(option = {}) {
    const { valueKey, defaultValueKey, changeEventName, strict } = Object.assign(Object.assign({}, defaultOption), option);
    const props = this.properties || {};
    const value = props[valueKey];
    const defaultValue = props[strict ? defaultValueKey : valueKey];
    let controlled = false;
    if (strict && typeof value !== 'undefined' && value !== null) {
        controlled = true;
    }
    const set = (newVal, extObj, fn) => {
        this.setData(Object.assign({ [`_${valueKey}`]: newVal }, extObj), fn);
    };
    return {
        controlled,
        initValue: controlled ? value : defaultValue,
        set,
        get: () => {
            return this.data[`_${valueKey}`];
        },
        change: (newVal, customChangeData, customUpdateFn) => {
            this.triggerEvent(changeEventName, typeof customChangeData !== 'undefined' ? customChangeData : newVal);
            if (controlled) {
                return;
            }
            if (typeof customUpdateFn === 'function') {
                customUpdateFn();
            }
            else {
                set(newVal);
            }
        },
    };
}



/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/flatTool.js":
/*!**************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/flatTool.js ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isObject": function() { return /* binding */ isObject; },
/* harmony export */   "isPlainObject": function() { return /* binding */ isPlainObject; },
/* harmony export */   "toObject": function() { return /* binding */ toObject; }
/* harmony export */ });
/* unused harmony exports getPrototypeOf, iterateInheritedPrototype */
const getPrototypeOf = function (obj) {
    return Object.getPrototypeOf ? Object.getPrototypeOf(obj) : obj.__proto__;
};
const isObject = function isObject(something) {
    const type = typeof something;
    return something !== null && (type === 'function' || type === 'object');
};
const iterateInheritedPrototype = function iterateInheritedPrototype(callback, fromCtor, toCtor, includeToCtor = true) {
    let proto = fromCtor.prototype || fromCtor;
    const toProto = toCtor.prototype || toCtor;
    while (proto) {
        if (!includeToCtor && proto === toProto)
            break;
        if (callback(proto) === false)
            break;
        if (proto === toProto)
            break;
        proto = getPrototypeOf(proto);
    }
};
const toObject = function toObject(something, options = {}) {
    const obj = {};
    if (!isObject(something))
        return obj;
    const excludes = options.excludes || ['constructor'];
    const { enumerable = true, configurable = 0, writable = 0 } = options;
    const defaultDesc = {};
    if (enumerable !== 0)
        defaultDesc.enumerable = enumerable;
    if (configurable !== 0)
        defaultDesc.configurable = configurable;
    if (writable !== 0)
        defaultDesc.writable = writable;
    iterateInheritedPrototype((proto) => {
        Object.getOwnPropertyNames(proto).forEach((key) => {
            if (excludes.indexOf(key) >= 0)
                return;
            if (Object.prototype.hasOwnProperty.call(obj, key))
                return;
            const desc = Object.getOwnPropertyDescriptor(proto, key);
            const fnKeys = ['get', 'set', 'value'];
            fnKeys.forEach((k) => {
                if (typeof desc[k] === 'function') {
                    const oldFn = desc[k];
                    desc[k] = function (...args) {
                        return oldFn.apply(Object.prototype.hasOwnProperty.call(options, 'bindTo') ? options.bindTo : this, args);
                    };
                }
            });
            Object.defineProperty(obj, key, Object.assign(Object.assign({}, desc), defaultDesc));
        });
    }, something, options.till || Object, false);
    return obj;
};
const isPlainObject = function isPlainObject(something) {
    return Object.prototype.toString.call(something) === '[object Object]';
};


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js":
/*!***********************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js ***!
  \***********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SuperComponent": function() { return /* reexport safe */ _superComponent__WEBPACK_IMPORTED_MODULE_0__.SuperComponent; },
/* harmony export */   "isObject": function() { return /* reexport safe */ _flatTool__WEBPACK_IMPORTED_MODULE_1__.isObject; },
/* harmony export */   "wxComponent": function() { return /* reexport safe */ _instantiationDecorator__WEBPACK_IMPORTED_MODULE_2__.wxComponent; }
/* harmony export */ });
/* harmony import */ var _superComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./superComponent */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/superComponent.js");
/* harmony import */ var _flatTool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./flatTool */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/flatTool.js");
/* harmony import */ var _instantiationDecorator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instantiationDecorator */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/instantiationDecorator.js");
/* harmony import */ var _control__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./control */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/control.js");






/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/instantiationDecorator.js":
/*!****************************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/instantiationDecorator.js ***!
  \****************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wxComponent": function() { return /* binding */ wxComponent; }
/* harmony export */ });
/* unused harmony export toComponent */
/* harmony import */ var _flatTool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./flatTool */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/flatTool.js");
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../version */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/version.js");


const RawLifeCycles = ['Created', 'Attached', 'Ready', 'Moved', 'Detached', 'Error'];
const NativeLifeCycles = RawLifeCycles.map((k) => k.toLowerCase());
const ComponentNativeProps = [
    'properties',
    'data',
    'observers',
    'methods',
    'behaviors',
    ...NativeLifeCycles,
    'relations',
    'externalClasses',
    'options',
    'lifetimes',
    'pageLifeTimes',
    'definitionFilter',
];
const toComponent = function toComponent(options) {
    const { relations, behaviors = [], externalClasses = [] } = options;
    if (options.properties) {
        Object.keys(options.properties).forEach((k) => {
            let opt = options.properties[k];
            if (!(0,_flatTool__WEBPACK_IMPORTED_MODULE_0__.isPlainObject)(opt)) {
                opt = { type: opt };
            }
            options.properties[k] = opt;
        });
        const ariaProps = [
            { key: 'ariaHidden', type: Boolean },
            { key: 'ariaRole', type: String },
            { key: 'ariaLabel', type: String },
            { key: 'ariaLabelledby', type: String },
            { key: 'ariaDescribedby', type: String },
            { key: 'ariaBusy', type: Boolean },
        ];
        ariaProps.forEach(({ key, type }) => {
            options.properties[key] = {
                type,
            };
        });
        options.properties.style = { type: String, value: '' };
        options.properties.customStyle = { type: String, value: '' };
    }
    if (!options.methods)
        options.methods = {};
    if (!options.lifetimes)
        options.lifetimes = {};
    const inits = {};
    if (relations) {
        const getRelations = (relation, path) => Behavior({
            created() {
                Object.defineProperty(this, `$${relation}`, {
                    get: () => {
                        const nodes = this.getRelationNodes(path) || [];
                        return relation === 'parent' ? nodes[0] : nodes;
                    },
                });
            },
        });
        const map = {};
        Object.keys(relations).forEach((path) => {
            const comp = relations[path];
            const relation = ['parent', 'ancestor'].includes(comp.type) ? 'parent' : 'children';
            const mixin = getRelations(relation, path);
            map[relation] = mixin;
        });
        behaviors.push(...Object.keys(map).map((key) => map[key]));
    }
    options.behaviors = [...behaviors];
    options.externalClasses = ['class', ...externalClasses];
    Object.getOwnPropertyNames(options).forEach((k) => {
        const desc = Object.getOwnPropertyDescriptor(options, k);
        if (!desc)
            return;
        if (NativeLifeCycles.indexOf(k) < 0 && typeof desc.value === 'function') {
            Object.defineProperty(options.methods, k, desc);
            delete options[k];
        }
        else if (ComponentNativeProps.indexOf(k) < 0) {
            inits[k] = desc;
        }
        else if (NativeLifeCycles.indexOf(k) >= 0) {
            options.lifetimes[k] = options[k];
        }
    });
    if (Object.keys(inits).length) {
        const oldCreated = options.lifetimes.created;
        const oldAttached = options.lifetimes.attached;
        const { controlledProps = [] } = options;
        options.lifetimes.created = function (...args) {
            Object.defineProperties(this, inits);
            if (oldCreated)
                oldCreated.apply(this, args);
        };
        options.lifetimes.attached = function (...args) {
            if (oldAttached)
                oldAttached.apply(this, args);
            controlledProps.forEach(({ key }) => {
                const defaultKey = `default${key.replace(/^(\w)/, (m, m1) => m1.toUpperCase())}`;
                const props = this.properties;
                if (props[key] == null) {
                    this._selfControlled = true;
                }
                if (props[key] == null && props[defaultKey] != null) {
                    this.setData({
                        [key]: props[defaultKey],
                    });
                }
            });
        };
        options.methods._trigger = function (evtName, detail, opts) {
            const target = controlledProps.find((item) => item.event == evtName);
            if (target) {
                const { key } = target;
                if (this._selfControlled) {
                    this.setData({
                        [key]: detail[key],
                    });
                }
            }
            this.triggerEvent(evtName, detail, opts);
        };
    }
    return options;
};
const wxComponent = function wxComponent() {
    return function (constructor) {
        class WxComponent extends constructor {
        }
        const current = new WxComponent();
        current.options = current.options || {};
        if ((0,_version__WEBPACK_IMPORTED_MODULE_1__.canUseVirtualHost)()) {
            current.options.virtualHost = true;
        }
        const obj = toComponent((0,_flatTool__WEBPACK_IMPORTED_MODULE_0__.toObject)(current));
        Component(obj);
    };
};


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/superComponent.js":
/*!********************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/superComponent.js ***!
  \********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SuperComponent": function() { return /* binding */ SuperComponent; }
/* harmony export */ });
class SuperComponent {
    constructor() {
        this.app = getApp();
    }
}


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/utils.js":
/*!*******************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/utils.js ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addUnit": function() { return /* binding */ addUnit; },
/* harmony export */   "calcIcon": function() { return /* binding */ calcIcon; },
/* harmony export */   "classNames": function() { return /* binding */ classNames; },
/* harmony export */   "getCharacterLength": function() { return /* binding */ getCharacterLength; },
/* harmony export */   "getCurrentPage": function() { return /* binding */ getCurrentPage; },
/* harmony export */   "getRect": function() { return /* binding */ getRect; },
/* harmony export */   "isNumber": function() { return /* binding */ isNumber; },
/* harmony export */   "setIcon": function() { return /* binding */ setIcon; },
/* harmony export */   "styles": function() { return /* binding */ styles; },
/* harmony export */   "uniqueFactory": function() { return /* binding */ uniqueFactory; }
/* harmony export */ });
/* unused harmony exports debounce, throttle, getAnimationFrame, isNull, isUndefined, isDef, chunk, getInstance, unitConvert, isBool, isObject, isString, toCamel, isOverSize, rpx2px */
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");

const systemInfo = wx.getSystemInfoSync();
const debounce = function (func, wait = 500) {
    let timerId;
    return function (...rest) {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            func.apply(this, rest);
        }, wait);
    };
};
const throttle = (func, wait = 100, options = null) => {
    let previous = 0;
    let timerid = null;
    if (!options) {
        options = {
            leading: true,
        };
    }
    return function (...args) {
        const now = Date.now();
        if (!previous && !options.leading)
            previous = now;
        const remaining = wait - (now - previous);
        const context = this;
        if (remaining <= 0) {
            if (timerid) {
                clearTimeout(timerid);
                timerid = null;
            }
            previous = now;
            func.apply(context, args);
        }
    };
};
const classNames = function (...args) {
    const hasOwn = {}.hasOwnProperty;
    const classes = [];
    args.forEach((arg) => {
        if (!arg)
            return;
        const argType = typeof arg;
        if (argType === 'string' || argType === 'number') {
            classes.push(arg);
        }
        else if (Array.isArray(arg) && arg.length) {
            const inner = classNames(...arg);
            if (inner) {
                classes.push(inner);
            }
        }
        else if (argType === 'object') {
            for (const key in arg) {
                if (hasOwn.call(arg, key) && arg[key]) {
                    classes.push(key);
                }
            }
        }
    });
    return classes.join(' ');
};
const styles = function (styleObj) {
    return Object.keys(styleObj)
        .map((styleKey) => `${styleKey}: ${styleObj[styleKey]}`)
        .join('; ');
};
const getAnimationFrame = function (context, cb) {
    return context
        .createSelectorQuery()
        .selectViewport()
        .boundingClientRect()
        .exec(() => {
        cb();
    });
};
const getRect = function (context, selector, needAll = false) {
    return new Promise((resolve, reject) => {
        context
            .createSelectorQuery()[needAll ? 'selectAll' : 'select'](selector)
            .boundingClientRect((rect) => {
            if (rect) {
                resolve(rect);
            }
            else {
                reject(rect);
            }
        })
            .exec();
    });
};
const isNumber = function (value) {
    return /^\d+(\.\d+)?$/.test(value);
};
const isNull = function (value) {
    return value === null;
};
const isUndefined = (value) => typeof value === 'undefined';
const isDef = function (value) {
    return !isUndefined(value) && !isNull(value);
};
const addUnit = function (value) {
    if (!isDef(value)) {
        return undefined;
    }
    value = String(value);
    return isNumber(value) ? `${value}px` : value;
};
const getCharacterLength = (type, char, max) => {
    const str = String(char !== null && char !== void 0 ? char : '');
    if (str.length === 0) {
        return {
            length: 0,
            characters: '',
        };
    }
    if (type === 'maxcharacter') {
        let len = 0;
        for (let i = 0; i < str.length; i += 1) {
            let currentStringLength = 0;
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
                currentStringLength = 2;
            }
            else {
                currentStringLength = 1;
            }
            if (len + currentStringLength > max) {
                return {
                    length: len,
                    characters: str.slice(0, i),
                };
            }
            len += currentStringLength;
        }
        return {
            length: len,
            characters: str,
        };
    }
    else if (type === 'maxlength') {
        const length = str.length > max ? max : str.length;
        return {
            length,
            characters: str.slice(0, length),
        };
    }
    return {
        length: str.length,
        characters: str,
    };
};
const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
const getInstance = function (context, selector) {
    if (!context) {
        const pages = getCurrentPages();
        const page = pages[pages.length - 1];
        context = page.$$basePage || page;
    }
    const instance = context ? context.selectComponent(selector) : null;
    if (!instance) {
        console.warn('未找到组件,请检查selector是否正确');
        return null;
    }
    return instance;
};
const unitConvert = (value) => {
    var _a;
    if (typeof value === 'string') {
        if (value.includes('rpx')) {
            return (parseInt(value, 10) * ((_a = systemInfo === null || systemInfo === void 0 ? void 0 : systemInfo.screenWidth) !== null && _a !== void 0 ? _a : 750)) / 750;
        }
        return parseInt(value, 10);
    }
    return value !== null && value !== void 0 ? value : 0;
};
const setIcon = (iconName, icon, defaultIcon) => {
    if (icon) {
        if (typeof icon === 'string') {
            return {
                [`${iconName}Name`]: icon,
                [`${iconName}Data`]: {},
            };
        }
        else if (typeof icon === 'object') {
            return {
                [`${iconName}Name`]: '',
                [`${iconName}Data`]: icon,
            };
        }
        else {
            return {
                [`${iconName}Name`]: defaultIcon,
                [`${iconName}Data`]: {},
            };
        }
    }
    return {
        [`${iconName}Name`]: '',
        [`${iconName}Data`]: {},
    };
};
const isBool = (val) => typeof val === 'boolean';
const isObject = (val) => typeof val === 'object' && val != null;
const isString = (val) => typeof val === 'string';
const toCamel = (str) => str.replace(/-(\w)/g, (match, m1) => m1.toUpperCase());
const getCurrentPage = function () {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
};
const uniqueFactory = (compName) => {
    let number = 0;
    return () => `${_config__WEBPACK_IMPORTED_MODULE_0__.prefix}_${compName}_${number++}`;
};
const calcIcon = (icon, defaultIcon) => {
    if ((isBool(icon) && icon && defaultIcon) || isString(icon)) {
        return { name: isBool(icon) ? defaultIcon : icon };
    }
    if (isObject(icon)) {
        return icon;
    }
    return null;
};
const isOverSize = (size, sizeLimit) => {
    var _a;
    if (!sizeLimit)
        return false;
    const base = 1000;
    const unitMap = {
        B: 1,
        KB: base,
        MB: base * base,
        GB: base * base * base,
    };
    const computedSize = typeof sizeLimit === 'number' ? sizeLimit * base : (sizeLimit === null || sizeLimit === void 0 ? void 0 : sizeLimit.size) * unitMap[(_a = sizeLimit === null || sizeLimit === void 0 ? void 0 : sizeLimit.unit) !== null && _a !== void 0 ? _a : 'KB'];
    return size > computedSize;
};
const rpx2px = (rpx) => Math.floor((systemInfo.windowWidth * rpx) / 750);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/version.js":
/*!*********************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/version.js ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "canIUseFormFieldButton": function() { return /* binding */ canIUseFormFieldButton; },
/* harmony export */   "canUseVirtualHost": function() { return /* binding */ canUseVirtualHost; }
/* harmony export */ });
let systemInfo;
function getSystemInfo() {
    if (systemInfo == null) {
        systemInfo = wx.getSystemInfoSync();
    }
    return systemInfo;
}
function compareVersion(v1, v2) {
    v1 = v1.split('.');
    v2 = v2.split('.');
    const len = Math.max(v1.length, v2.length);
    while (v1.length < len) {
        v1.push('0');
    }
    while (v2.length < len) {
        v2.push('0');
    }
    for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i]);
        const num2 = parseInt(v2[i]);
        if (num1 > num2) {
            return 1;
        }
        else if (num1 < num2) {
            return -1;
        }
    }
    return 0;
}
function judgeByVersion(version) {
    const currentSDKVersion = getSystemInfo().SDKVersion;
    return compareVersion(currentSDKVersion, version) >= 0;
}
function canIUseFormFieldButton() {
    const version = '2.10.3';
    return judgeByVersion(version);
}
function canUseVirtualHost() {
    return judgeByVersion('2.19.2');
}


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/dropdown-item/props.js":
/*!**************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/dropdown-item/props.js ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    disabled: {
        type: Boolean,
        value: false,
    },
    externalClasses: {
        type: Array,
    },
    keys: {
        type: Object,
    },
    label: {
        type: String,
        value: '',
    },
    multiple: {
        type: Boolean,
        value: false,
    },
    options: {
        type: Array,
        value: [],
    },
    optionsColumns: {
        type: null,
        value: 1,
    },
    optionsLayout: {
        type: String,
        value: 'columns',
    },
    value: {
        type: null,
        value: undefined,
    },
    defaultValue: {
        type: null,
        value: undefined,
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/dropdown-menu/props.js":
/*!**************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/dropdown-menu/props.js ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    arrowIcon: {
        type: null,
        value: 'caret-down-small',
    },
    closeOnClickOverlay: {
        type: Boolean,
        value: true,
    },
    duration: {
        type: null,
        value: 200,
    },
    externalClasses: {
        type: Array,
    },
    showOverlay: {
        type: Boolean,
        value: true,
    },
    zIndex: {
        type: Number,
        value: 11600,
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/empty/props.js":
/*!******************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/empty/props.js ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    description: {
        type: String,
    },
    externalClasses: {
        type: Array,
    },
    icon: {
        type: null,
    },
    image: {
        type: String,
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/fab/draggable/props.js":
/*!**************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/fab/draggable/props.js ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    direction: {
        type: String,
        value: 'all',
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/fab/props.js":
/*!****************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/fab/props.js ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    buttonProps: {
        type: Object,
    },
    draggable: {
        type: Boolean,
        optionalTypes: [String],
        value: false,
    },
    icon: {
        type: String,
        value: '',
    },
    style: {
        type: String,
        value: 'right: 16px; bottom: 32px;',
    },
    text: {
        type: String,
        value: '',
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/footer/props.js":
/*!*******************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/footer/props.js ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    links: {
        type: Array,
        value: [],
    },
    logo: {
        type: Object,
    },
    style: {
        type: String,
        value: '',
    },
    text: {
        type: String,
        value: '',
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/grid-item/props.js":
/*!**********************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/grid-item/props.js ***!
  \**********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    badgeProps: {
        type: Object,
        value: null,
    },
    description: {
        type: String,
    },
    externalClasses: {
        type: Array,
    },
    icon: {
        type: null,
    },
    image: {
        type: String,
    },
    imageProps: {
        type: Object,
    },
    jumpType: {
        type: String,
        value: 'navigate-to',
    },
    layout: {
        type: String,
        value: 'vertical',
    },
    text: {
        type: String,
    },
    url: {
        type: String,
        value: '',
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/grid/props.js":
/*!*****************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/grid/props.js ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    align: {
        type: String,
        value: 'center',
    },
    border: {
        type: null,
        value: false,
    },
    column: {
        type: Number,
        value: 4,
    },
    externalClasses: {
        type: Array,
    },
    gutter: {
        type: Number,
    },
    hover: {
        type: Boolean,
        value: false,
    },
    theme: {
        type: String,
        value: 'default',
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/icon/props.js":
/*!*****************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/icon/props.js ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    color: {
        type: String,
        value: '',
    },
    name: {
        type: String,
        value: '',
        required: true,
    },
    size: {
        type: String,
        value: '',
    },
    prefix: {
        type: String,
        value: undefined,
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/image/props.js":
/*!******************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/image/props.js ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    tId: {
        type: String,
        value: null,
    },
    error: {
        type: String,
        value: 'default',
    },
    externalClasses: {
        type: Array,
    },
    height: {
        type: null,
    },
    lazy: {
        type: Boolean,
        value: false,
    },
    loading: {
        type: String,
        value: 'default',
    },
    mode: {
        type: String,
        value: 'scaleToFill',
    },
    shape: {
        type: String,
        value: 'square',
    },
    showMenuByLongpress: {
        type: Boolean,
        value: false,
    },
    src: {
        type: String,
        value: '',
    },
    webp: {
        type: Boolean,
        value: false,
    },
    width: {
        type: null,
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/loading/props.js":
/*!********************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/loading/props.js ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    delay: {
        type: Number,
        value: 0,
    },
    duration: {
        type: Number,
        value: 800,
    },
    externalClasses: {
        type: Array,
    },
    indicator: {
        type: Boolean,
        value: true,
    },
    inheritColor: {
        type: Boolean,
        value: false,
    },
    layout: {
        type: String,
        value: 'horizontal',
    },
    loading: {
        type: Boolean,
        value: true,
    },
    pause: {
        type: Boolean,
        value: false,
    },
    progress: {
        type: Number,
    },
    reverse: {
        type: Boolean,
    },
    size: {
        type: String,
        value: '40rpx',
    },
    text: {
        type: String,
    },
    theme: {
        type: String,
        value: 'circular',
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/mixins/page-scroll.js":
/*!*************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/mixins/page-scroll.js ***!
  \*************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/utils */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/utils.js");

const onPageScroll = function (event) {
    const page = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.getCurrentPage)();
    if (!page)
        return;
    const { pageScroller } = page;
    pageScroller === null || pageScroller === void 0 ? void 0 : pageScroller.forEach((scroller) => {
        if (typeof scroller === 'function') {
            scroller(event);
        }
    });
};
/* harmony default export */ __webpack_exports__["default"] = ((funcName = 'onScroll') => {
    return Behavior({
        attached() {
            var _a;
            const page = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.getCurrentPage)();
            if (!page)
                return;
            const bindScroller = (_a = this[funcName]) === null || _a === void 0 ? void 0 : _a.bind(this);
            if (bindScroller) {
                this._pageScroller = bindScroller;
            }
            if (Array.isArray(page.pageScroller)) {
                page.pageScroller.push(bindScroller);
            }
            else {
                page.pageScroller =
                    typeof page.onPageScroll === 'function' ? [page.onPageScroll.bind(page), bindScroller] : [bindScroller];
            }
            page.onPageScroll = onPageScroll;
        },
        detached() {
            var _a;
            const page = (0,_common_utils__WEBPACK_IMPORTED_MODULE_0__.getCurrentPage)();
            if (!page)
                return;
            page.pageScroller = ((_a = page.pageScroller) === null || _a === void 0 ? void 0 : _a.filter((item) => item !== this._pageScroller)) || [];
        },
    });
});


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/mixins/touch.js":
/*!*******************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/mixins/touch.js ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const MinDistance = 10;
const getDirection = (x, y) => {
    if (x > y && x > MinDistance) {
        return 'horizontal';
    }
    if (y > x && y > MinDistance) {
        return 'vertical';
    }
    return '';
};
/* harmony default export */ __webpack_exports__["default"] = (Behavior({
    methods: {
        resetTouchStatus() {
            this.direction = '';
            this.deltaX = 0;
            this.deltaY = 0;
            this.offsetX = 0;
            this.offsetY = 0;
        },
        touchStart(event) {
            this.resetTouchStatus();
            const [touch] = event.touches;
            this.startX = touch.clientX;
            this.startY = touch.clientY;
        },
        touchMove(event) {
            const [touch] = event.touches;
            this.deltaX = touch.clientX - this.startX;
            this.deltaY = touch.clientY - this.startY;
            this.offsetX = Math.abs(this.deltaX);
            this.offsetY = Math.abs(this.deltaY);
            this.direction = getDirection(this.offsetX, this.offsetY);
        },
    },
}));


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/mixins/transition.js":
/*!************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/mixins/transition.js ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ transition; }
/* harmony export */ });
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");

const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_0__["default"];
function transition() {
    return Behavior({
        properties: {
            visible: {
                type: Boolean,
                value: null,
                observer: 'watchVisible',
            },
            appear: Boolean,
            name: {
                type: String,
                value: 'fade',
            },
            durations: {
                type: Number,
                optionalTypes: [Array],
            },
        },
        data: {
            transitionClass: '',
            transitionDurations: 300,
            className: '',
            realVisible: false,
        },
        created() {
            this.status = '';
            this.transitionT = 0;
        },
        attached() {
            this.durations = this.getDurations();
            if (this.data.visible) {
                this.enter();
            }
            this.inited = true;
        },
        detached() {
            clearTimeout(this.transitionT);
        },
        methods: {
            watchVisible(curr, prev) {
                if (this.inited && curr !== prev) {
                    curr ? this.enter() : this.leave();
                }
            },
            getDurations() {
                const { durations } = this.data;
                if (Array.isArray(durations)) {
                    return durations.map((item) => Number(item));
                }
                return [Number(durations), Number(durations)];
            },
            enter() {
                const { name } = this.data;
                const [duration] = this.durations;
                this.status = 'entering';
                this.setData({
                    realVisible: true,
                    transitionClass: `${prefix}-${name}-enter ${prefix}-${name}-enter-active`,
                });
                setTimeout(() => {
                    this.setData({
                        transitionClass: `${prefix}-${name}-enter-active ${prefix}-${name}-enter-to`,
                    });
                }, 30);
                if (typeof duration === 'number' && duration > 0) {
                    this.transitionT = setTimeout(this.entered.bind(this), duration + 30);
                }
            },
            entered() {
                this.customDuration = false;
                clearTimeout(this.transitionT);
                this.status = 'entered';
                this.setData({
                    transitionClass: '',
                });
            },
            leave() {
                const { name } = this.data;
                const [, duration] = this.durations;
                this.status = 'leaving';
                this.setData({
                    transitionClass: `${prefix}-${name}-leave  ${prefix}-${name}-leave-active`,
                });
                clearTimeout(this.transitionT);
                setTimeout(() => {
                    this.setData({
                        transitionClass: `${prefix}-${name}-leave-active ${prefix}-${name}-leave-to`,
                    });
                }, 30);
                if (typeof duration === 'number' && duration > 0) {
                    this.customDuration = true;
                    this.transitionT = setTimeout(this.leaved.bind(this), duration + 30);
                }
            },
            leaved() {
                this.customDuration = false;
                this.triggerEvent('leaved');
                clearTimeout(this.transitionT);
                this.status = 'leaved';
                this.setData({
                    transitionClass: '',
                });
            },
            onTransitionEnd() {
                if (this.customDuration) {
                    return;
                }
                clearTimeout(this.transitionT);
                if (this.status === 'entering' && this.data.visible) {
                    this.entered();
                }
                else if (this.status === 'leaving' && !this.data.visible) {
                    this.leaved();
                    this.setData({
                        realVisible: false,
                    });
                }
            },
        },
    });
}


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/mixins/using-custom-navbar.js":
/*!*********************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/mixins/using-custom-navbar.js ***!
  \*********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const useCustomNavbarBehavior = Behavior({
    properties: {
        usingCustomNavbar: {
            type: Boolean,
            value: false,
        },
        customNavbarHeight: {
            type: Number,
            value: 0,
        },
    },
    data: {
        distanceTop: 0,
    },
    lifetimes: {
        attached() {
            if (this.properties.usingCustomNavbar) {
                this.calculateCustomNavbarDistanceTop();
            }
        },
    },
    methods: {
        calculateCustomNavbarDistanceTop() {
            const { statusBarHeight } = wx.getSystemInfoSync();
            const menuButton = wx.getMenuButtonBoundingClientRect();
            const distance = menuButton.top + menuButton.bottom - statusBarHeight;
            this.setData({
                distanceTop: Math.max(distance, this.properties.customNavbarHeight + statusBarHeight),
            });
        },
    },
});
/* harmony default export */ __webpack_exports__["default"] = (useCustomNavbarBehavior);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/navbar/props.js":
/*!*******************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/navbar/props.js ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    animation: {
        type: Boolean,
        value: true,
    },
    delta: {
        type: Number,
        value: 1,
    },
    fixed: {
        type: Boolean,
        value: true,
    },
    leftArrow: {
        type: Boolean,
        value: false,
    },
    title: {
        type: String,
    },
    titleMaxLength: {
        type: Number,
    },
    visible: {
        type: Boolean,
        value: true,
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/overlay/props.js":
/*!********************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/overlay/props.js ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    backgroundColor: {
        type: String,
        value: '',
    },
    customStyle: {
        type: String,
        value: '',
    },
    duration: {
        type: Number,
        value: 300,
    },
    preventScrollThrough: {
        type: Boolean,
        value: true,
    },
    style: {
        type: String,
        value: '',
    },
    zIndex: {
        type: Number,
        value: 11000,
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/popup/props.js":
/*!******************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/popup/props.js ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    closeBtn: {
        type: Boolean,
    },
    closeOnOverlayClick: {
        type: Boolean,
        value: true,
    },
    content: {
        type: String,
    },
    duration: {
        type: Number,
        value: 240,
    },
    externalClasses: {
        type: Array,
    },
    overlayProps: {
        type: Object,
        value: {},
    },
    placement: {
        type: String,
        value: 'top',
    },
    preventScrollThrough: {
        type: Boolean,
        value: true,
    },
    showOverlay: {
        type: Boolean,
        value: true,
    },
    visible: {
        type: Boolean,
        value: null,
    },
    defaultVisible: {
        type: Boolean,
        value: false,
    },
    zIndex: {
        type: Number,
        value: 11500,
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/radio-group/props.js":
/*!************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/radio-group/props.js ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    placement: {
        type: String,
        value: 'left',
    },
    borderless: {
        type: Boolean,
        value: false,
    },
    disabled: {
        type: Boolean,
        value: undefined,
    },
    icon: {
        type: null,
        value: 'circle',
    },
    keys: {
        type: Object,
    },
    name: {
        type: String,
        value: '',
    },
    options: {
        type: Array,
    },
    value: {
        type: null,
        value: null,
    },
    defaultValue: {
        type: null,
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/radio/props.js":
/*!******************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/radio/props.js ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    placement: {
        type: String,
        value: null,
    },
    allowUncheck: {
        type: Boolean,
        value: false,
    },
    block: {
        type: Boolean,
        value: true,
    },
    checked: {
        type: Boolean,
        value: null,
    },
    defaultChecked: {
        type: Boolean,
        value: false,
    },
    content: {
        type: String,
    },
    contentDisabled: {
        type: Boolean,
        value: false,
    },
    readonly: {
        type: Boolean,
        value: false,
    },
    disabled: {
        type: Boolean,
        value: undefined,
    },
    externalClasses: {
        type: Array,
    },
    icon: {
        type: null,
        value: 'circle',
    },
    label: {
        type: String,
    },
    maxContentRow: {
        type: Number,
        value: 5,
    },
    maxLabelRow: {
        type: Number,
        value: 3,
    },
    name: {
        type: String,
        value: '',
    },
    value: {
        type: null,
        value: false,
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/search/props.js":
/*!*******************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/search/props.js ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    action: {
        type: String,
        value: '',
    },
    adjustPosition: {
        type: Boolean,
        value: true,
    },
    alwaysEmbed: {
        type: Boolean,
        value: false,
    },
    center: {
        type: Boolean,
        value: false,
    },
    clearable: {
        type: Boolean,
        value: true,
    },
    confirmHold: {
        type: Boolean,
        value: false,
    },
    confirmType: {
        type: String,
        value: 'search',
    },
    cursor: {
        type: Number,
    },
    cursorSpacing: {
        type: Number,
        value: 0,
    },
    disabled: {
        type: Boolean,
        value: false,
    },
    focus: {
        type: Boolean,
        value: false,
    },
    holdKeyboard: {
        type: Boolean,
        value: false,
    },
    leftIcon: {
        type: String,
        value: 'search',
    },
    maxcharacter: {
        type: Number,
    },
    maxlength: {
        type: Number,
        value: -1,
    },
    placeholder: {
        type: String,
        value: '',
    },
    placeholderClass: {
        type: String,
        value: 'input-placeholder',
    },
    placeholderStyle: {
        type: String,
        value: '',
    },
    resultList: {
        type: Array,
        value: [],
    },
    selectionEnd: {
        type: Number,
        value: -1,
    },
    selectionStart: {
        type: Number,
        value: -1,
    },
    shape: {
        type: String,
        value: 'square',
    },
    style: {
        type: String,
        value: '',
    },
    type: {
        type: String,
        value: 'text',
    },
    value: {
        type: String,
        value: '',
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/side-bar-item/props.js":
/*!**************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/side-bar-item/props.js ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    badgeProps: {
        type: Object,
    },
    disabled: {
        type: Boolean,
        value: false,
    },
    icon: {
        type: null,
    },
    label: {
        type: String,
        value: '',
    },
    value: {
        type: null,
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/side-bar/props.js":
/*!*********************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/side-bar/props.js ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    value: {
        type: null,
        value: null,
    },
    defaultValue: {
        type: null,
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/skeleton/props.js":
/*!*********************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/skeleton/props.js ***!
  \*********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    animation: {
        type: String,
        value: 'none',
    },
    delay: {
        type: Number,
        value: 0,
    },
    loading: {
        type: Boolean,
        value: true,
    },
    rowCol: {
        type: Array,
    },
    theme: {
        type: String,
        value: 'text',
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/sticky/props.js":
/*!*******************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/sticky/props.js ***!
  \*******************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    container: {
        type: null,
    },
    disabled: {
        type: Boolean,
        value: false,
    },
    externalClasses: {
        type: Array,
    },
    offsetTop: {
        type: Number,
        value: 0,
    },
    zIndex: {
        type: Number,
        value: 99,
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tab-panel/props.js":
/*!**********************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tab-panel/props.js ***!
  \**********************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    badgeProps: {
        type: Object,
        value: null,
    },
    destroyOnHide: {
        type: Boolean,
        value: true,
    },
    disabled: {
        type: Boolean,
        value: false,
    },
    icon: {
        type: null,
    },
    label: {
        type: String,
        value: '',
    },
    panel: {
        type: String,
    },
    value: {
        type: null,
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tabs/props.js":
/*!*****************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tabs/props.js ***!
  \*****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    animation: {
        type: Object,
    },
    externalClasses: {
        type: Array,
    },
    showBottomLine: {
        type: Boolean,
        value: true,
    },
    spaceEvenly: {
        type: Boolean,
        value: true,
    },
    split: {
        type: Boolean,
        value: true,
    },
    sticky: {
        type: Boolean,
        value: false,
    },
    stickyProps: {
        type: Object,
    },
    swipeable: {
        type: Boolean,
        value: true,
    },
    theme: {
        type: String,
        value: 'line',
    },
    value: {
        type: null,
        value: null,
    },
    defaultValue: {
        type: null,
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tag/props.js":
/*!****************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tag/props.js ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    closable: {
        type: null,
        value: false,
    },
    disabled: {
        type: Boolean,
        value: false,
    },
    externalClasses: {
        type: Array,
    },
    icon: {
        type: null,
    },
    maxWidth: {
        type: null,
    },
    shape: {
        type: String,
        value: 'square',
    },
    size: {
        type: String,
        value: 'medium',
    },
    theme: {
        type: String,
        value: 'default',
    },
    variant: {
        type: String,
        value: 'dark',
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tree-select/props.js":
/*!************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tree-select/props.js ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const props = {
    height: {
        type: null,
        value: 336,
    },
    keys: {
        type: Object,
    },
    multiple: {
        type: Boolean,
        value: false,
    },
    options: {
        type: Array,
        value: [],
    },
    value: {
        type: null,
        value: null,
    },
    defaultValue: {
        type: null,
    },
};
/* harmony default export */ __webpack_exports__["default"] = (props);


/***/ }),

/***/ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs":
/*!********************************************************!*\
  !*** ../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs ***!
  \********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__addDisposableResource": function() { return /* binding */ __addDisposableResource; },
/* harmony export */   "__assign": function() { return /* binding */ __assign; },
/* harmony export */   "__asyncDelegator": function() { return /* binding */ __asyncDelegator; },
/* harmony export */   "__asyncGenerator": function() { return /* binding */ __asyncGenerator; },
/* harmony export */   "__asyncValues": function() { return /* binding */ __asyncValues; },
/* harmony export */   "__await": function() { return /* binding */ __await; },
/* harmony export */   "__awaiter": function() { return /* binding */ __awaiter; },
/* harmony export */   "__classPrivateFieldGet": function() { return /* binding */ __classPrivateFieldGet; },
/* harmony export */   "__classPrivateFieldIn": function() { return /* binding */ __classPrivateFieldIn; },
/* harmony export */   "__classPrivateFieldSet": function() { return /* binding */ __classPrivateFieldSet; },
/* harmony export */   "__createBinding": function() { return /* binding */ __createBinding; },
/* harmony export */   "__decorate": function() { return /* binding */ __decorate; },
/* harmony export */   "__disposeResources": function() { return /* binding */ __disposeResources; },
/* harmony export */   "__esDecorate": function() { return /* binding */ __esDecorate; },
/* harmony export */   "__exportStar": function() { return /* binding */ __exportStar; },
/* harmony export */   "__extends": function() { return /* binding */ __extends; },
/* harmony export */   "__generator": function() { return /* binding */ __generator; },
/* harmony export */   "__importDefault": function() { return /* binding */ __importDefault; },
/* harmony export */   "__importStar": function() { return /* binding */ __importStar; },
/* harmony export */   "__makeTemplateObject": function() { return /* binding */ __makeTemplateObject; },
/* harmony export */   "__metadata": function() { return /* binding */ __metadata; },
/* harmony export */   "__param": function() { return /* binding */ __param; },
/* harmony export */   "__propKey": function() { return /* binding */ __propKey; },
/* harmony export */   "__read": function() { return /* binding */ __read; },
/* harmony export */   "__rest": function() { return /* binding */ __rest; },
/* harmony export */   "__runInitializers": function() { return /* binding */ __runInitializers; },
/* harmony export */   "__setFunctionName": function() { return /* binding */ __setFunctionName; },
/* harmony export */   "__spread": function() { return /* binding */ __spread; },
/* harmony export */   "__spreadArray": function() { return /* binding */ __spreadArray; },
/* harmony export */   "__spreadArrays": function() { return /* binding */ __spreadArrays; },
/* harmony export */   "__values": function() { return /* binding */ __values; }
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
      }
      catch (e) {
          fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

/* harmony default export */ __webpack_exports__["default"] = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
});


/***/ })

}]);
//# sourceMappingURL=mor.v.js.map