import axios from 'axios';

const AUTH_TOKEN = '30641317-2c1589b9e698647cbb48b6071';
const IMAGES_PER_PAGE = 12;

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: AUTH_TOKEN,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: IMAGES_PER_PAGE,
  },
});

export async function queryImages({ page, query }) {
  const response = await instance.get('/', {
    params: {
      q: query,
      page,
    },
  });

  const { totalHits, hits } = response.data;
  const totalPages = Math.ceil(totalHits / IMAGES_PER_PAGE);

  return {
    hasMoreImages: totalPages > page,
    images: hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
      id,
      webformatURL,
      largeImageURL,
      alt: tags,
    })),
  };
}
