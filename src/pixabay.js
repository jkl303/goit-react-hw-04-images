import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const params = {
  key: '30906362-b5b03bb7697802982655c2c3d',
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const fetchImgs = async (q, page = 1) => {
  const response = await axios.get(null, {
    params: { q, page, ...params },
  });
  return response.data;
};
