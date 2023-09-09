import * as imagesAPI from './images-api'

export async function getSearchImage(search) {
  const query = search
    try {
      const data = await imagesAPI.index(query)
        return data
    }catch(err){
        return err
    }
}