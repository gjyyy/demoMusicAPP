import originJSONP from 'jsonp'

export default function jsonp (url,data,option){
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)//第一位传值前加上？号，如果已经url上传过参数则加上&拼接data传来的参数
    return new Promise((resolve,reject)=>{
        originJSONP(url,option,(err,data)=>{
            if(!err){
                resolve(data)
            }
            else{
                reject(err)
            }
        })
    })
}

export function param(data){
    //枚举出data传值对象，把键值对用=相连，加上&字符串，拼接到一起
    let url=''
    for(var k in data){
        let value=data[k] !==undefined ? data[k]:''
        url+='&'+k+'='+encodeURIComponent(value)
        //encodeURIcomponent 把URI字符串采用URF-8编码格式转化成escape格式的字符串
    }
    return url ? url.substring(1):''
}