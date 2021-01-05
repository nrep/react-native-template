import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Drawer, DrawerItem, IndexPath, Tab, TabBar, TopNavigation } from '@ui-kitten/components';
import React from 'react';
import { BillScreen } from '../screens/bill.screen';
import { AcknowledgementScreen } from '../screens/acknowledgement.screen';
import { ConfigScreen } from '../screens/config.screen';
import { DashboardScreen } from '../screens/dashboard.screen';
import { LoginScreen } from '../screens/login.screen';
import { RecordScreen } from '../screens/record.screen';
import { ReportScreen } from '../screens/report.screen';
import { SearchScreen } from '../screens/search.screen';
import { SettingsScreen } from '../screens/settings.screen';

const { Navigator, Screen } = createStackNavigator();
const Side = createDrawerNavigator();
const Top = createMaterialTopTabNavigator();

const TransactionNavigator = () => (
    <Navigator headerMode='none'>
        <Screen name='Dash' component={DashboardScreen} />
        <Screen name='Search' component={SearchScreen} />
        <Screen name='Record' component={RecordScreen} />
        <Screen name='Ack' component={AcknowledgementScreen} />
        <Screen name='Bill' component={BillScreen} />
    </Navigator>
);

const TopTabBar = ({ navigation, state }) => (
    <>
        <TopNavigation title='MyApp' alignment='center' />
        <TabBar
            selectedIndex={state.index}
            onSelect={index => navigation.navigate(state.routeNames[index])}>
            <Tab title='DAILY' />
            <Tab title='WEEKLY' />
            <Tab title='MONTHLY' />
            <Tab title='CUSTOM' />
        </TabBar>
    </>
);

const ReportNavigator = () => (
    <Top.Navigator tabBar={props => <TopTabBar {...props} />}>
        <Top.Screen name='DAILY' component={ReportScreen} />
        <Top.Screen name='WEEKLY' component={ReportScreen} />
        <Top.Screen name='MONTHLY' component={ReportScreen} />
        <Top.Screen name='CUSTOM' component={ReportScreen} />
    </Top.Navigator>
);

const DrawerContent = ({ navigation, state }) => (
    <Drawer
        selectedIndex={new IndexPath(state.index)}
        onSelect={index => navigation.navigate(state.routeNames[index.row])}>
        <DrawerItem title='Dashboard' />
        <DrawerItem title='Configure' />
        <DrawerItem title='Report' />
        <DrawerItem title='Settings' />
        <DrawerItem title='Logout' />
    </Drawer>
);

const DrawerNavigator = () => (
    <Side.Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Side.Screen name='Dashboard' component={TransactionNavigator} />
        <Side.Screen name='Configure' component={ConfigScreen} />
        <Side.Screen name='Report' component={ReportNavigator} />
        <Side.Screen name='Settings' component={SettingsScreen} />
        <Side.Screen name='Logout' component={DashboardScreen} />
    </Side.Navigator>
);

const HomeNavigator = () => (
    <Navigator headerMode='none'>
        <Screen name='Login' component={LoginScreen} />
        <Screen name='Drawer' component={DrawerNavigator} />
    </Navigator>
);

export const AppNavigator = () => (
    <NavigationContainer>
        <HomeNavigator />
    </NavigationContainer>
);