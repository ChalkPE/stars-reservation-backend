import axios from 'axios'

import Router from 'koa-router'
const router = new Router()

const last = { date: 0, value: 0 }
const url = 'https://gameevent.kakao.com/preregistrations/907?from=m_brandpage'
const headers = { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1' }

router.get('/data', async ctx => {
  if ((Date.now() - last.date) > 500) {
    try {
      const { data } = await axios.get(url, { headers })
      last.value = data.match(/전체 예약자.*?([\d,]+).*?명/)[1].replace(/,/g, '')
    } catch (err) {
      console.error(err)
    }
    last.date = Date.now()
  }
  ctx.body = last.value
})

export default router
