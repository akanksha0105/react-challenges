import { client } from "../axios/axios"
export const missingImageString = 'placeholder_for_missing_posters.png'
export const getImageUrl = async (imageString) => {
  // Handle the case where the image is missing
  if (imageString === "posterthatismissing.jpg") {
    return `${base}/${missingImageString}`;
  }

  try {
    const response = await client.get(`images/${imageString}`);
    const { baseURL, url } = response?.config;
    const imageURL = `${baseURL}/${url}`;
    return imageURL;
  } catch (error) {
    console.error("Error retrieving image", error);
    return "";
  }
};



export const debounce = (func, wait) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

