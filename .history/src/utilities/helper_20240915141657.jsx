import { client } from "../axios/axios"

export const getImageUrl = async (imageString) => {

 
    const response = await client.get(`images/${imageString}`)

    const {baseURL, url} = response?.config
    const imageURL = `${baseURL}/${url}`;
   
    return imageURL;
  }


export const debounce = (func, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

