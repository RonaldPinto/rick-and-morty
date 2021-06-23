import axios from 'axios';
import config from '../config';

export default async (data) => {
  const options = {
    method: 'get',
    url: `${config.getCharacterUrl}/${data}`,
  };

  try {
      return await axios(options).then((resp) => resp.data);
  } catch (error) {
    return null;
  }
};