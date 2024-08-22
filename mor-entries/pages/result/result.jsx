import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _isNativeReflectConstruct from "@babel/runtime/helpers/isNativeReflectConstruct";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
import '@morjs/runtime-web/lib/components';
import '@morjs/runtime-web/lib/api';
import React from 'react';
import EntryPage from '@/pages/result/result';
var Page = /*#__PURE__*/function (_React$Component) {
  function Page() {
    _classCallCheck(this, Page);
    return _callSuper(this, Page, arguments);
  }
  _inherits(Page, _React$Component);
  return _createClass(Page, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("tiga-page-host", {
        "show-back": "false",
        "show-header": "true"
      }, /*#__PURE__*/React.createElement(EntryPage, null));
    }
  }]);
}(React.Component);
export default Page;