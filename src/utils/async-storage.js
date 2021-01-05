import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    await AsyncStorage.setItem(key, value)
}

export const storeSimpleData = async(key, value) => {
    try {
        await storeData(key, value);
    } catch (e) {
        // saving error
    }
}

export const storeComplexData = async(key, value) => {
    try {
        let jsonValue;
        try {
            jsonValue = JSON.stringify(value);
        } catch (e) {
            // stringifying error
        }
        console.log(`Saving ${jsonValue} to ${key}`);
        await storeData(key, jsonValue);
    } catch (e) {
        // saving error
    }
}

const getData = async (key) => {
    return await AsyncStorage.getItem(key);
}

export const getSimpleData = async (key) => {
    try {
        return await getData(key);
    } catch(e) {
        // error reading value
    }
}

export const getComplexData = async (key) => {
    const jsonValue = await getData(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
}