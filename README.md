# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Run project

1. clone project
2. npm install
3. npm start

## Init Setup Project Steps:

1. eslint setup: npm init @eslint/config
2. lint-staged install: npm install --save-dev lint-staged
3. husky setup:
   npm install husky -D
   npm pkg set scripts.prepare="husky install"
   npm run prepare
   npx husky add .husky/pre-commit "npx lint-staged"
4. prettier install: npm install --save-dev --save-exact prettier
5. npm i -D @craco/craco

## 说明

测试地址：https://panda0312.github.io/geo-fence-app

应用包含 Map,List 页面,围栏数据存储于浏览器 localStorage,使用 google map api
实现功能：

1. 在地图上添加围栏，鼠标操作请查看菜单栏 Instruction 部分。
2. 围栏可编辑，删除。
3. 围栏列表数据展示，列表数据可删除，查询

## 主要技术框架使用

react, jotai(状态管理), @react-google-maps/api(谷歌地图 api 组件)
antd(Ant Design 组件库), 其他详见 package.json 文件
