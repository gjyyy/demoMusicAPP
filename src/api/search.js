import jsonp from '@/assets/js/jsonp.js'
import {commonparams, options} from '@/api/config.js'
import axios from 'axios'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonparams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

//搜索
export function search(query, page, zhida, perpage) {
  const url = '/api/search'

  const data = Object.assign({}, commonparams, {
    g_tk:5381,
    uin:0,
    format:'json',
    inCharset:'utf-8',
    outCharset:'utf-8',
    notice:0,
    platform:'h5',
    needNewCode:1,
    w:query,
    zhidaqu:1,
    catZhida: zhida ? 1 : 0,
    t:0,
    flag:1,
    ie:'utf-8',
    sem:1,
    aggr:0,
    perpage:perpage,
    n:20,
    p:page,
    remoteplace:'txt.mqq.all',
    _:1537612841753
  })

  return axios.get(url, {
      params: data
    }).then((res) => {
      return Promise.resolve(res.data)
    })
}
