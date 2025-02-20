import { generateService } from '@umijs/openapi'

generateService({
  requestLibPath: "import request from '@/request'", //使用自定义的request来生成请求代码
  schemaPath: 'http://localhost:8080/api/v2/api-docs', //参考后端api文档
  serversPath: './src', //请求代码保存位置。
})
