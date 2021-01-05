import { keys } from './api-keys';
import { getSyncedRealm } from './utils';

export const getPublicRealm = async () => {
    const realmAppId = "public-sdcsa";
    return getSyncedRealm(realmAppId, keys.public.key, "PUBLIC");
}

export const getCooperativeRealm = async (cooperativeId) => {
    const realmAppId = "cooperative-oytzk";
    return await getSyncedRealm(realmAppId, keys.cooperative.key, cooperativeId);
}

export const getInstitutionRealm = async (institutionId) => {
    const realmAppId = "institution-aosqn";
    return await getSyncedRealm(realmAppId, keys.institution.key, institutionId);
}

export const getUserRealm = async (userId) => {
    const realmAppId = "user-laffz";
    return await getSyncedRealm(realmAppId, keys.user.key, userId);
}