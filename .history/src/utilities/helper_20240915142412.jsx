import { client } from "../axios/axios"
export const missingImageString = 'posterthatismissing.jpg'
export const getImageUrl = async (imageString) => {

  // if(imageString === missingImageString){
  //   // 
  // }

    try {

    }
   
   
    return imageURL;
  }


export const debounce = (func, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

