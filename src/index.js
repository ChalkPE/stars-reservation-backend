import Koa from 'koa'
import axios from 'axios'

// 한스타 예약 페이지
const url = 'https://gameevent.kakao.com/preregistrations/907?from=m_brandpage'

// 모바일 페이지 봐야 해서 iPhone 7
const headers = { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1' }

// 세자리수 콤마 지워야 함 나중에
const pattern = /전체 예약자.*?([\d,]+).*?명/

// 긁어온 시각, 예약자 수
const last = { date: 0, value: 0 }

const router = async ctx => {
  if ((Date.now() - last.date) > 500) {
    try {
      const { data } = await axios.get(url, { headers })
      last.value = data.match(pattern)[1].replace(/,/g, '')
    } catch (err) {
      console.error(err)
    }

    last.date = Date.now()
  }

  ctx.body = last.value
}

new Koa()
  .use(router)
  .listen(8080, () => console.log('8080'))
