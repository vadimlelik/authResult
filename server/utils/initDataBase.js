import Quality from "../model/qualityModel.js";
import qualities from '../mock/qualities.json' assert { type: 'json' };

const createInitialEntity = async (Model, data) => {
    try {
        await Model.collection.drop()

        return await Promise.all(data.map(async (item) => {
            try {
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (e) {
                return e
            }
        }))
    } catch (e) {

    }

}
export const initDataBase = async () => {
    try {

        const quality = await Quality.find()
        if (quality.length !== qualities.length) {
            await createInitialEntity(Quality, qualities)
            console.log('create quality')
        }
    } catch (e) {
        console.log(e)
    }

}

