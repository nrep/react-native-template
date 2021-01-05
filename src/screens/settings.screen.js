import React from 'react';
import { SafeAreaView } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';
import { ThemeContext } from '../utils/theme-context';

export const SettingsScreen = ({ navigation }) => {

    const themeContext = React.useContext(ThemeContext);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button style={{ marginVertical: 4 }} onPress={themeContext.toggleTheme}>TOGGLE THEME</Button>
            </Layout>
        </SafeAreaView>
    );
};