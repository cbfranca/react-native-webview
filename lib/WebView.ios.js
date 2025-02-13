var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { Image, View, NativeModules, } from 'react-native';
import invariant from 'invariant';
// @ts-expect-error react-native doesn't have this type
import codegenNativeCommandsUntyped from 'react-native/Libraries/Utilities/codegenNativeCommands';
import RNCWebView from "./WebViewNativeComponent.ios";
import { defaultOriginWhitelist, defaultRenderError, defaultRenderLoading, useWebWiewLogic, } from './WebViewShared';
import styles from './WebView.styles';
var codegenNativeCommands = codegenNativeCommandsUntyped;
var Commands = codegenNativeCommands({
    supportedCommands: ['goBack', 'goForward', 'reload', 'stopLoading', 'injectJavaScript', 'requestFocus', 'postMessage', 'loadUrl']
});
var resolveAssetSource = Image.resolveAssetSource;
var processDecelerationRate = function (decelerationRate) {
    var newDecelerationRate = decelerationRate;
    if (newDecelerationRate === 'normal') {
        newDecelerationRate = 0.998;
    }
    else if (newDecelerationRate === 'fast') {
        newDecelerationRate = 0.99;
    }
    return newDecelerationRate;
};
var RNCWebViewManager = NativeModules.RNCWebViewManager;
var useWarnIfChanges = function (value, name) {
    var ref = useRef(value);
    if (ref.current !== value) {
        console.warn("Changes to property ".concat(name, " do nothing after the initial render."));
        ref.current = value;
    }
};
var WebViewComponent = forwardRef(function (_a, ref) {
    var _b = _a.javaScriptEnabled, javaScriptEnabled = _b === void 0 ? true : _b, _c = _a.cacheEnabled, cacheEnabled = _c === void 0 ? true : _c, _d = _a.originWhitelist, originWhitelist = _d === void 0 ? defaultOriginWhitelist : _d, _e = _a.useSharedProcessPool, useSharedProcessPool = _e === void 0 ? true : _e, _f = _a.textInteractionEnabled, textInteractionEnabled = _f === void 0 ? true : _f, injectedJavaScript = _a.injectedJavaScript, injectedJavaScriptBeforeContentLoaded = _a.injectedJavaScriptBeforeContentLoaded, _g = _a.injectedJavaScriptForMainFrameOnly, injectedJavaScriptForMainFrameOnly = _g === void 0 ? true : _g, _h = _a.injectedJavaScriptBeforeContentLoadedForMainFrameOnly, injectedJavaScriptBeforeContentLoadedForMainFrameOnly = _h === void 0 ? true : _h, startInLoadingState = _a.startInLoadingState, onNavigationStateChange = _a.onNavigationStateChange, onLoadStart = _a.onLoadStart, onError = _a.onError, onLoad = _a.onLoad, onLoadEnd = _a.onLoadEnd, onLoadProgress = _a.onLoadProgress, onContentProcessDidTerminateProp = _a.onContentProcessDidTerminate, onFileDownload = _a.onFileDownload, onHttpErrorProp = _a.onHttpError, onMessageProp = _a.onMessage, onOpenWindowProp = _a.onOpenWindow, renderLoading = _a.renderLoading, renderError = _a.renderError, style = _a.style, containerStyle = _a.containerStyle, source = _a.source, nativeConfig = _a.nativeConfig, allowsInlineMediaPlayback = _a.allowsInlineMediaPlayback, allowsAirPlayForMediaPlayback = _a.allowsAirPlayForMediaPlayback, mediaPlaybackRequiresUserAction = _a.mediaPlaybackRequiresUserAction, dataDetectorTypes = _a.dataDetectorTypes, incognito = _a.incognito, decelerationRateProp = _a.decelerationRate, onShouldStartLoadWithRequestProp = _a.onShouldStartLoadWithRequest, otherProps = __rest(_a, ["javaScriptEnabled", "cacheEnabled", "originWhitelist", "useSharedProcessPool", "textInteractionEnabled", "injectedJavaScript", "injectedJavaScriptBeforeContentLoaded", "injectedJavaScriptForMainFrameOnly", "injectedJavaScriptBeforeContentLoadedForMainFrameOnly", "startInLoadingState", "onNavigationStateChange", "onLoadStart", "onError", "onLoad", "onLoadEnd", "onLoadProgress", "onContentProcessDidTerminate", "onFileDownload", "onHttpError", "onMessage", "onOpenWindow", "renderLoading", "renderError", "style", "containerStyle", "source", "nativeConfig", "allowsInlineMediaPlayback", "allowsAirPlayForMediaPlayback", "mediaPlaybackRequiresUserAction", "dataDetectorTypes", "incognito", "decelerationRate", "onShouldStartLoadWithRequest"]);
    var webViewRef = useRef(null);
    var onShouldStartLoadWithRequestCallback = useCallback(function (shouldStart, _url, lockIdentifier) {
        if (lockIdentifier === void 0) { lockIdentifier = 0; }
        var viewManager = (nativeConfig === null || nativeConfig === void 0 ? void 0 : nativeConfig.viewManager)
            || RNCWebViewManager;
        viewManager.startLoadWithResult(!!shouldStart, lockIdentifier);
    }, [nativeConfig === null || nativeConfig === void 0 ? void 0 : nativeConfig.viewManager]);
    var _j = useWebWiewLogic({
        onNavigationStateChange: onNavigationStateChange,
        onLoad: onLoad,
        onError: onError,
        onHttpErrorProp: onHttpErrorProp,
        onLoadEnd: onLoadEnd,
        onLoadProgress: onLoadProgress,
        onLoadStart: onLoadStart,
        onMessageProp: onMessageProp,
        onOpenWindowProp: onOpenWindowProp,
        startInLoadingState: startInLoadingState,
        originWhitelist: originWhitelist,
        onShouldStartLoadWithRequestProp: onShouldStartLoadWithRequestProp,
        onShouldStartLoadWithRequestCallback: onShouldStartLoadWithRequestCallback,
        onContentProcessDidTerminateProp: onContentProcessDidTerminateProp
    }), onLoadingStart = _j.onLoadingStart, onShouldStartLoadWithRequest = _j.onShouldStartLoadWithRequest, onMessage = _j.onMessage, onOpenWindow = _j.onOpenWindow, viewState = _j.viewState, setViewState = _j.setViewState, lastErrorEvent = _j.lastErrorEvent, onHttpError = _j.onHttpError, onLoadingError = _j.onLoadingError, onLoadingFinish = _j.onLoadingFinish, onLoadingProgress = _j.onLoadingProgress, onContentProcessDidTerminate = _j.onContentProcessDidTerminate;
    useImperativeHandle(ref, function () { return ({
        goForward: function () { return Commands.goForward(webViewRef.current); },
        goBack: function () { return Commands.goBack(webViewRef.current); },
        reload: function () {
            setViewState('LOADING');
            Commands.reload(webViewRef.current);
        },
        stopLoading: function () { return Commands.stopLoading(webViewRef.current); },
        postMessage: function (data) { return Commands.postMessage(webViewRef.current, data); },
        injectJavaScript: function (data) { return Commands.injectJavaScript(webViewRef.current, data); },
        requestFocus: function () { return Commands.requestFocus(webViewRef.current); }
    }); }, [setViewState, webViewRef]);
    useWarnIfChanges(allowsInlineMediaPlayback, 'allowsInlineMediaPlayback');
    useWarnIfChanges(allowsAirPlayForMediaPlayback, 'allowsAirPlayForMediaPlayback');
    useWarnIfChanges(incognito, 'incognito');
    useWarnIfChanges(mediaPlaybackRequiresUserAction, 'mediaPlaybackRequiresUserAction');
    useWarnIfChanges(dataDetectorTypes, 'dataDetectorTypes');
    var otherView = null;
    if (viewState === 'LOADING') {
        otherView = (renderLoading || defaultRenderLoading)();
    }
    else if (viewState === 'ERROR') {
        invariant(lastErrorEvent != null, 'lastErrorEvent expected to be non-null');
        otherView = (renderError || defaultRenderError)(lastErrorEvent.domain, lastErrorEvent.code, lastErrorEvent.description);
    }
    else if (viewState !== 'IDLE') {
        console.error("RNCWebView invalid state encountered: ".concat(viewState));
    }
    var webViewStyles = [styles.container, styles.webView, style];
    var webViewContainerStyle = [styles.container, containerStyle];
    var decelerationRate = processDecelerationRate(decelerationRateProp);
    var NativeWebView = (nativeConfig === null || nativeConfig === void 0 ? void 0 : nativeConfig.component)
        || RNCWebView;
    var webView = (<NativeWebView key="webViewKey" {...otherProps} javaScriptEnabled={javaScriptEnabled} cacheEnabled={cacheEnabled} useSharedProcessPool={useSharedProcessPool} textInteractionEnabled={textInteractionEnabled} decelerationRate={decelerationRate} messagingEnabled={typeof onMessage === 'function'} onLoadingError={onLoadingError} onLoadingFinish={onLoadingFinish} onLoadingProgress={onLoadingProgress} onFileDownload={onFileDownload} onLoadingStart={onLoadingStart} onHttpError={onHttpError} onMessage={onMessage} onOpenWindow={onOpenWindowProp && onOpenWindow} onShouldStartLoadWithRequest={onShouldStartLoadWithRequest} onContentProcessDidTerminate={onContentProcessDidTerminate} injectedJavaScript={injectedJavaScript} injectedJavaScriptBeforeContentLoaded={injectedJavaScriptBeforeContentLoaded} injectedJavaScriptForMainFrameOnly={injectedJavaScriptForMainFrameOnly} injectedJavaScriptBeforeContentLoadedForMainFrameOnly={injectedJavaScriptBeforeContentLoadedForMainFrameOnly} dataDetectorTypes={dataDetectorTypes} allowsAirPlayForMediaPlayback={allowsAirPlayForMediaPlayback} allowsInlineMediaPlayback={allowsInlineMediaPlayback} incognito={incognito} mediaPlaybackRequiresUserAction={mediaPlaybackRequiresUserAction} ref={webViewRef} 
    // TODO: find a better way to type this.
    source={resolveAssetSource(source)} style={webViewStyles} {...nativeConfig === null || nativeConfig === void 0 ? void 0 : nativeConfig.props}/>);
    return (<View style={webViewContainerStyle}>
      {webView}
      {otherView}
    </View>);
});
// no native implementation for iOS, depends only on permissions
var isFileUploadSupported = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, true];
}); }); };
var WebView = Object.assign(WebViewComponent, { isFileUploadSupported: isFileUploadSupported });
export default WebView;
