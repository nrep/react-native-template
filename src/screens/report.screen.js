import React from 'react';
import { SafeAreaView } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Report } from '../components/report.component'
const BackIcon = (props) => (
  <Icon {...props} name='arrow-back' />
);

export const ReportScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Report />
            </Layout>
        </SafeAreaView>
    );
};