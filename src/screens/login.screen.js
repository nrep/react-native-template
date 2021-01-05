import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Icon, Input, Layout } from '@ui-kitten/components';
import React, { useState } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, View } from 'react-native';
import { LoadingIndicator } from '../components/accessory-icon.components';
import { getComplexData, storeComplexData, storeSimpleData } from '../utils/async-storage';
import { getPublicRealm } from '../utils/realm/realms';

export const LoginScreen = ({ navigation }) => {

    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [loading, setLoading] = useState(false);

    const login = async() => {
        setLoading(true);
        const realm = await getPublicRealm();
        AsyncStorage.getAllKeys().then((keys) => {
            keys.map(value => {
                getComplexData(value).then((data) => console.log({value, data}));
            });
        });
        const users = realm.objects("login");

        const user = users.filtered(`username == '${userName}' and password == '${password}'`)[0];

        if (user) {
            await storeSimpleData("cooperative_id", user.institution_id.toString());
            await storeComplexData("user_info", user);
            realm.close();
            setLoading(false);
            navigation.navigate("Drawer");
        } else {
            setLoading(false);
            alert("Please check your username and password and try again.");
        }
    }

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderEyeIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
        </TouchableWithoutFeedback>
    );

    const renderUserIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={'person'}/>
        </TouchableWithoutFeedback>
    );

    const renderLockIcon = (props) => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={'lock'}/>
        </TouchableWithoutFeedback>
    );

    const renderLoadingIndicator = (props) => {
        return loading && <LoadingIndicator {...props} />
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: "5%", }}>
                <Input
                    value={userName}
                    label='Username'
                    placeholder='Enter your username'
                    accessoryLeft={renderUserIcon}
                    onChangeText={nextValue => setUserName(nextValue)}
                    size='large'
                    style={{ marginBottom: 10 }}
                />
                <Input
                    value={password}
                    label='Password'
                    placeholder='Enter password'
                    accessoryRight={renderEyeIcon}
                    accessoryLeft={renderLockIcon}
                    secureTextEntry={secureTextEntry}
                    onChangeText={nextValue => setPassword(nextValue)}
                    size='large'
                    style={{ marginBottom: 10 }}
                />
                <View style={{ width: "100%", marginTop: 10 }}>
                    <Button onPress={() => login()} accessoryRight={renderLoadingIndicator} disabled={loading}>LOGIN</Button>
                </View>
            </Layout>
        </SafeAreaView>
    );
};