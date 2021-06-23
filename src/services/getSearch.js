import axios from 'axios';
import config from '../config';

export default async (text) => {
  const options = {
    method: 'get',
    url: `${config.getCharacterUrl}/?name=${text}`,
  };

  try {
      return await axios(options).then((resp) => resp.data);
  } catch (error) {
    return null;
  }
};