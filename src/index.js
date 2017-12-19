import Koa from 'koa'
import path from 'path'

import etag from 'koa-etag'
import serve from 'koa-static'
import logger from 'koa-chalk-logger'
import conditional from 'koa-conditional-get'
import router from './router'

const build = path.join(__dirname, '..', '..', 'stars-reservation', 'build')

new Koa()
  .use(logger())
  .use(conditional())
  .use(etag())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve(build, { maxage: 1000 * 60 * 5 }))
  .listen(8080, () => console.log('Server running on port 8080'))
