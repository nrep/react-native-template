import { Text, useTheme } from '@ui-kitten/components';
import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { storeComplexData } from '../utils/async-storage';

export const SearchListItem = (props) => {
    const [pressed, setPressed] = React.useState(false);

    const theme = useTheme();
    return (
        <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={theme["color-primary-default"]}
            onPress={() => {
                storeComplexData("current_member", props.value).then(() => props.navigation.navigate("Record")).catch(e => console.log(e));
            }}
            onShowUnderlay={() => setPressed(true)}
            onHideUnderlay={() => setPressed(false)}
            style={{ borderRadius: 10, }}>
            <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%", alignItems: 'center', marginVertical: 10}}>
                <View>
                    <UserAvatar size={50} borderRadius={10} name="MUHAMED ADAM" bgColors={(pressed) ? ["white"] : [theme["color-primary-default"], theme["color-info-default"], theme["color-success-default"], theme["color-warning-default"]]} />
                </View>
                <View style={{flexDirection: "column", justifyContent: "space-between"}}>
                    <View style={{ flex: 1, marginTop: 2 }}>
                        <Text style={{ fontWeight: "bold", color: (pressed) ? "white": theme["color-basic-900"] }} category='label'>{props.names}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', }}>
                        <Text appearance="hint" category='label'>{props.idNo}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center"}}>
                    <View style={{ flex: 1, alignSelf: "center", justifyContent: 'center',}}>
                        <Text style={{ fontWeight: "bold", color: (pressed) ? "white": theme["color-basic-900"]}} category='label'>{props.teaNumber}</Text>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}