(self.webpackChunkangular_components_and_patterns=self.webpackChunkangular_components_and_patterns||[]).push([[792],{"./.storybook lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:\\/\\.storybook(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.(mdx%7Cstories\\.(js%7Cjsx%7Cts%7Ctsx)))$":(module,__unused_webpack_exports,__webpack_require__)=>{var map={"./About.mdx":["./.storybook/About.mdx",53,8]};function webpackAsyncContext(req){if(!__webpack_require__.o(map,req))return Promise.resolve().then((()=>{var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}));var ids=map[req],id=ids[0];return Promise.all(ids.slice(1).map(__webpack_require__.e)).then((()=>__webpack_require__(id)))}webpackAsyncContext.keys=()=>Object.keys(map),webpackAsyncContext.id="./.storybook lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:\\/\\.storybook(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.(mdx%7Cstories\\.(js%7Cjsx%7Cts%7Ctsx)))$",module.exports=webpackAsyncContext},"./.storybook/preview.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{decorators:()=>decorators,default:()=>__WEBPACK_DEFAULT_EXPORT__,parameters:()=>parameters});var _angular_common_http_testing__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/.pnpm/@angular+common@19.1.1_@angular+core@19.1.1_rxjs@7.8.1/node_modules/@angular/common/fesm2022/http/testing.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/@angular+core@19.1.1_rxjs@7.8.1_zone.js@0.15.0/node_modules/@angular/core/fesm2022/core.mjs"),_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/.pnpm/@angular+platform-browser@19.1.1_@angular+animations@19.1.1_@angular+common@19.1.1_@angular+core@19.1.1/node_modules/@angular/platform-browser/fesm2022/animations.mjs"),_angular_router_testing__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/.pnpm/@angular+router@19.1.1_@angular+common@19.1.1_@angular+core@19.1.1_@angular+platform-browser@19.1.1_rxjs@7.8.1/node_modules/@angular/router/fesm2022/testing.mjs"),_storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/@storybook+angular@8.5.0_@angular-devkit+architect@0.1901.2_@angular-devkit+build-angular@19._pmvp6vdxfscxoadcvykmzvwx3a/node_modules/@storybook/angular/dist/index.mjs");const parameters={docs:{canvas:{sourceState:"shown"},toc:!0},controls:{hideNoControlsWarning:!0,expanded:!0,matchers:{color:/(background|color)/i,date:/Date$/}}},decorators=[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.applicationConfig)({providers:[(0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.importProvidersFrom)(_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__.BrowserAnimationsModule,_angular_common_http_testing__WEBPACK_IMPORTED_MODULE_3__.Sj,_angular_router_testing__WEBPACK_IMPORTED_MODULE_4__.RouterTestingModule)]}),(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.componentWrapperDecorator)((story=>(window.localStorage.removeItem("@@STATE"),story)))],__WEBPACK_DEFAULT_EXPORT__={parameters,decorators,tags:["autodocs"]}},"./storybook-config-entry.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";var external_STORYBOOK_MODULE_CHANNELS_=__webpack_require__("storybook/internal/channels"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global"),asyncToGenerator=__webpack_require__("./node_modules/.pnpm/@babel+runtime@7.26.0/node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");const importers=[function(){var _ref=(0,asyncToGenerator.A)((function*(path){if(!/^\.[\\/](?:\.storybook(?:\/(?!\.)(?:(?:(?!(?:^|\/)\.).)*?)\/|\/|$)(?!\.)(?=.)[^/]*?\.(mdx|stories\.(js|jsx|ts|tsx)))$/.exec(path))return;const pathRemainder=path.substring(13);return __webpack_require__("./.storybook lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:\\/\\.storybook(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.(mdx%7Cstories\\.(js%7Cjsx%7Cts%7Ctsx)))$")("./"+pathRemainder)}));return function(_x){return _ref.apply(this,arguments)}}(),function(){var _ref2=(0,asyncToGenerator.A)((function*(path){if(!/^\.[\\/](?:src\/app(?:\/(?!\.)(?:(?:(?!(?:^|\/)\.).)*?)\/|\/|$)(?!\.)(?=.)[^/]*?\.(mdx|stories\.(js|jsx|ts|tsx)))$/.exec(path))return;const pathRemainder=path.substring(10);return __webpack_require__("./src/app lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:\\/src\\/app(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.(mdx%7Cstories\\.(js%7Cjsx%7Cts%7Ctsx)))$")("./"+pathRemainder)}));return function(_x2){return _ref2.apply(this,arguments)}}()];function _importFn(){return(_importFn=(0,asyncToGenerator.A)((function*(path){for(let i=0;i<importers.length;i++){const moduleExports=yield(x=()=>importers[i](path),x());if(moduleExports)return moduleExports}var x}))).apply(this,arguments)}const channel=(0,external_STORYBOOK_MODULE_CHANNELS_.createBrowserChannel)({page:"preview"});external_STORYBOOK_MODULE_PREVIEW_API_.addons.setChannel(channel),"DEVELOPMENT"===external_STORYBOOK_MODULE_GLOBAL_.global.CONFIG_TYPE&&(window.__STORYBOOK_SERVER_CHANNEL__=channel);const preview=new external_STORYBOOK_MODULE_PREVIEW_API_.PreviewWeb((function importFn(_x3){return _importFn.apply(this,arguments)}),(()=>(0,external_STORYBOOK_MODULE_PREVIEW_API_.composeConfigs)([__webpack_require__("./node_modules/.pnpm/@storybook+angular@8.5.0_@angular-devkit+architect@0.1901.2_@angular-devkit+build-angular@19._pmvp6vdxfscxoadcvykmzvwx3a/node_modules/@storybook/angular/dist/client/preview-prod.js"),__webpack_require__("./node_modules/.pnpm/@storybook+angular@8.5.0_@angular-devkit+architect@0.1901.2_@angular-devkit+build-angular@19._pmvp6vdxfscxoadcvykmzvwx3a/node_modules/@storybook/angular/dist/client/docs/config.js"),__webpack_require__("./node_modules/.pnpm/@storybook+angular@8.5.0_@angular-devkit+architect@0.1901.2_@angular-devkit+build-angular@19._pmvp6vdxfscxoadcvykmzvwx3a/node_modules/@storybook/angular/dist/client/config.js"),__webpack_require__("./node_modules/.pnpm/@storybook+addon-essentials@8.5.0_@types+react@19.0.7_storybook@8.5.0/node_modules/@storybook/addon-essentials/dist/actions/preview.mjs"),__webpack_require__("./node_modules/.pnpm/@storybook+addon-essentials@8.5.0_@types+react@19.0.7_storybook@8.5.0/node_modules/@storybook/addon-essentials/dist/docs/preview.mjs"),__webpack_require__("./node_modules/.pnpm/@storybook+addon-essentials@8.5.0_@types+react@19.0.7_storybook@8.5.0/node_modules/@storybook/addon-essentials/dist/backgrounds/preview.mjs"),__webpack_require__("./node_modules/.pnpm/@storybook+addon-essentials@8.5.0_@types+react@19.0.7_storybook@8.5.0/node_modules/@storybook/addon-essentials/dist/viewport/preview.mjs"),__webpack_require__("./node_modules/.pnpm/@storybook+addon-essentials@8.5.0_@types+react@19.0.7_storybook@8.5.0/node_modules/@storybook/addon-essentials/dist/measure/preview.mjs"),__webpack_require__("./node_modules/.pnpm/@storybook+addon-essentials@8.5.0_@types+react@19.0.7_storybook@8.5.0/node_modules/@storybook/addon-essentials/dist/outline/preview.mjs"),__webpack_require__("./node_modules/.pnpm/@storybook+addon-essentials@8.5.0_@types+react@19.0.7_storybook@8.5.0/node_modules/@storybook/addon-essentials/dist/highlight/preview.mjs"),__webpack_require__("./node_modules/.pnpm/@storybook+addon-a11y@8.5.0_storybook@8.5.0_vitest@3.0.2/node_modules/@storybook/addon-a11y/dist/preview.mjs"),__webpack_require__("./node_modules/.pnpm/@storybook+addon-interactions@8.5.0_storybook@8.5.0/node_modules/@storybook/addon-interactions/dist/preview.mjs"),__webpack_require__("./node_modules/.pnpm/storybook-addon-angular-router@1.10.1_@storybook+addon-actions@8.5.0_@storybook+angular@8.5.0_s2figpt53npoyivdzntoolz4cy/node_modules/storybook-addon-angular-router/dist/preset/preview.js"),__webpack_require__("./.storybook/preview.ts")])));window.__STORYBOOK_PREVIEW__=preview,window.__STORYBOOK_STORY_STORE__=preview.storyStore,window.__STORYBOOK_ADDONS_CHANNEL__=channel},"./node_modules/.pnpm/@storybook+instrumenter@8.5.0_storybook@8.5.0/node_modules/@storybook/instrumenter/dist sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/.pnpm/@storybook+instrumenter@8.5.0_storybook@8.5.0/node_modules/@storybook/instrumenter/dist sync recursive",module.exports=webpackEmptyContext},"./node_modules/.pnpm/@storybook+test@8.5.0_storybook@8.5.0/node_modules/@storybook/test/dist sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/.pnpm/@storybook+test@8.5.0_storybook@8.5.0/node_modules/@storybook/test/dist sync recursive",module.exports=webpackEmptyContext},"./node_modules/.pnpm/memoizerific@1.11.3/node_modules/memoizerific sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/.pnpm/memoizerific@1.11.3/node_modules/memoizerific sync recursive",module.exports=webpackEmptyContext},"./global/styles/styles.scss?ngGlobalStyle":()=>{},"./src/app lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:\\/src\\/app(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.(mdx%7Cstories\\.(js%7Cjsx%7Cts%7Ctsx)))$":(module,__unused_webpack_exports,__webpack_require__)=>{var map={"./app.component.stories":["./src/app/app.component.stories.ts",210],"./app.component.stories.ts":["./src/app/app.component.stories.ts",210],"./pages/dev-page/dev-page.component.stories":["./src/app/pages/dev-page/dev-page.component.stories.ts",291],"./pages/dev-page/dev-page.component.stories.ts":["./src/app/pages/dev-page/dev-page.component.stories.ts",291],"./utils/ng-template/ng-template-type-example.component.stories":["./src/app/utils/ng-template/ng-template-type-example.component.stories.ts",652],"./utils/ng-template/ng-template-type-example.component.stories.ts":["./src/app/utils/ng-template/ng-template-type-example.component.stories.ts",652],"./utils/ng-template/ng-template-type-example.example.mdx":["./src/app/utils/ng-template/ng-template-type-example.example.mdx",53,961]};function webpackAsyncContext(req){if(!__webpack_require__.o(map,req))return Promise.resolve().then((()=>{var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}));var ids=map[req],id=ids[0];return Promise.all(ids.slice(1).map(__webpack_require__.e)).then((()=>__webpack_require__(id)))}webpackAsyncContext.keys=()=>Object.keys(map),webpackAsyncContext.id="./src/app lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:\\/src\\/app(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.(mdx%7Cstories\\.(js%7Cjsx%7Cts%7Ctsx)))$",module.exports=webpackAsyncContext},"storybook/internal/channels":module=>{"use strict";module.exports=__STORYBOOK_MODULE_CHANNELS__},"storybook/internal/client-logger":module=>{"use strict";module.exports=__STORYBOOK_MODULE_CLIENT_LOGGER__},"storybook/internal/preview-errors":module=>{"use strict";module.exports=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__},"storybook/internal/core-events":module=>{"use strict";module.exports=__STORYBOOK_MODULE_CORE_EVENTS__},"@storybook/global":module=>{"use strict";module.exports=__STORYBOOK_MODULE_GLOBAL__},"storybook/internal/preview-api":module=>{"use strict";module.exports=__STORYBOOK_MODULE_PREVIEW_API__}},__webpack_require__=>{var __webpack_exec__=moduleId=>__webpack_require__(__webpack_require__.s=moduleId);__webpack_require__.O(0,[805],(()=>(__webpack_exec__("./storybook-config-entry.js"),__webpack_exec__("./node_modules/.pnpm/zone.js@0.15.0/node_modules/zone.js/fesm2015/zone.js"),__webpack_exec__("./node_modules/.pnpm/@angular+compiler@19.1.1_@angular+core@19.1.1/node_modules/@angular/compiler/fesm2022/compiler.mjs"),__webpack_exec__("./global/styles/styles.scss?ngGlobalStyle"))));__webpack_require__.O()}]);