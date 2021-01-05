import { Text, TopNavigation, TopNavigationAction, useTheme } from '@ui-kitten/components';
import React from 'react';
import { ArrowBackIcon } from '../components/accessory-icon.components';

export const TopNavigationWithBack = ({ navigation }) => {
    const theme = useTheme();

    const navigateBack = () => {
        navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={ArrowBackIcon} onPress={navigateBack}/>
    );

    return (
        <TopNavigation title={evaProps => <Text {...evaProps} style={{color: theme["text-primary-color"]}}>CDMS</Text>} alignment='center' accessoryLeft={BackAction} />
    );
};