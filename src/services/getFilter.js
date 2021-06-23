import axios from 'axios';
import config from '../config';

export default async (text) => {
  const options = {
    method: 'get',
    url: `${config.getCharacterUrl}/?status=${text.status}&origin=${text.origin}`,
    params: {
      name: 'Earth'
    }
  };

  try {
      return await axios(options).then((resp) => resp.data);
  } catch (error) {
    return null;
  }
};