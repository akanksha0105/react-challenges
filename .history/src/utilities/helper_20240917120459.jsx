import { baseURL, client } from "../axios/axios"
export const missingImageString = 'images/placeholder_for_missing_posters.png'
export const getImageUrl = async (imageString) => {

  if (imageString === "posterthatismissing.jpg") {
    return `${baseURL}/${missingImageString}`;
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

export const getTruncatedTitle = (title) => {
  let max
  if (title.length > maxLength) {
    return `${title.slice(0, maxLength)}...`;
  }
  return title;
};
