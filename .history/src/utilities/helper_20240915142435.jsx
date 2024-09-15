import { client } from "../axios/axios"
export const missingImageString = 'posterthatismissing.jpg'
export const getImageUrl = async (imageString) => {

  // if(imageString === missingImageString){
  //   // 
  // }

    try {
      const response = await client.get(`images/${imageString}`)
    
      const {baseURL, url} = response?.config
      const imageURL = `${baseURL}/${url}`;
      return imageURL;
    }
     catch(e)
   
   
   
  }


export const debounce = (func, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

