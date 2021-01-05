import Realm from 'realm';
import { getUser } from './auth';

export const getConfig = (user, partitionValue) => {
    return {
        sync: {
            user,
            partitionValue: partitionValue,
            existingRealmFileBehavior: {
                type: "openImmediately",
                timeOutBehavior: "openLocalRealm"
            },
            error: (error) => {
                console.log({ error, user, partitionValue });
            },
        }
    };
}

export const getRealm = async (config) => {
    return await Realm.open(config);
}

export const getSyncedRealm = async (realmAppId, apiKey, partitionValue) => {
    const user = await getUser(realmAppId, apiKey);
    const config = getConfig(user, partitionValue);
    return await getRealm(config);
}