import Realm from "realm";

const getRealmApp = (realmAppId) => {
    let app = Realm.App.getApp(realmAppId);
    
    if (app.currentUser) {
        console.log({current: app.currentUser});
    } else {
        app = new Realm.App(realmAppId);
    }
    return app;
}

export const getUser = async (realmAppId, userApiKey) => {
    const app = getRealmApp(realmAppId);
    if (app.currentUser) {
        console.log({available: app.currentUser.id});
        return app.currentUser
    }

    // We don't have a user - login a user and open the realm async
    const credentials = Realm.Credentials.serverApiKey(userApiKey);
    const user = await app.logIn(credentials);
    console.log({new_one: app.currentUser});

    return user;
}