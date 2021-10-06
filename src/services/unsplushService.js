import axios from 'axios'


export const unsplushService = {
  getImagesByKeyword,
}

export async function getImagesByKeyword(keyword) {
  var prmRes = axios.get(`https://api.unsplash.com/search/photos/?client_id=PA3Oow8kvS9lXoH0KnT7yxn2e_FAaKFzROSIXsAdPNE&query=${keyword}`)
  return prmRes.then(res => {
    return res.data
  })
}