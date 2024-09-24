
export const missingImageString = 'images/placeholder_for_missing_posters.png';

export const getImageUrl = (imageString) => `${process.env.REACT_APP_API_URL}/images/${imageString}`;


export const placeholderImage = `${process.env.REACT_APP_API_URL}/images/placeholder_for_missing_posters.png`;

export const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

export const getTruncatedTitle = (title) => {
  let maxLength = 12;
  if (title.length > maxLength) {
    return `${title.slice(0, maxLength)}...`;
  }
  return title;
};
