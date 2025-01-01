# 2024秋冬BS Project——商品比价网站

## 运行项目

**说明:** ==开发环境为Windows11，使用的是Windows版本的Docker Desktop。运行前请确保你的Docker Image中存在==`node:latest`、`nginx:latex`、`mysql:5.7`

1. 进入PriceCmp文件夹根目录，在命令行执行命令`docker-compose up --build`，随后在浏览器访问`localhost:5173`。
2. 值得注意的是，因为一开始数据库内没有数据，所以进入商城页面会显示搜索错误。（因为数据库没有数据的话会自动调用`/shopping/search`爬取网页数据，但这时没有token可以用来验证身份，所以报错）
3. 另一点是，因为前后端都运行在localhost上，此时手机无法访问网页。可以将在vite.config中将前端host更改为无线局域网的IP地址，但同时也要更改访问后端的IP，否则在手机上无法访问后端。
