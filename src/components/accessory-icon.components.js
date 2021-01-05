import { Icon, useTheme, Spinner } from '@ui-kitten/components';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export const PlusIcon = (props) => (
    <Icon {...props} name='plus'/>
);

export const ArrowBackIcon = (props) => {
    const theme = useTheme();
    return (
        <Icon {...props} name='arrow-back' fill={theme["color-primary-default"]}/>
    )
};

export const SaveIcon = (props) => (
    <Icon {...props} name='save-outline'/>
);

export const ForwardArrowIcon = (props) => (
    <Icon {...props} name='arrow-ios-forward-outline'/>
);

export const MessageIcon = (props) => (
    <Icon {...props} name='message-circle-outline'/>
);

export const PrinterIcon = (props) => (
    <Icon {...props} name='printer-outline'/>
);

export const EyeIcon = (props) => (
    <Icon {...props} name='eye-outline'/>
);
  
export const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
        <Spinner status="basic" size='small'/>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        margin: 2,
    },
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});