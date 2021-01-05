import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Divider, Icon, Layout, Text, useTheme } from '@ui-kitten/components';
import { SafeAreaView, View } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { TopNavigationWithBack } from '../components/topbar.components';
import { PrinterIcon, EyeIcon, MessageIcon } from '../components/accessory-icon.components';
import { getComplexData, } from '../utils/async-storage';

export const AcknowledgementScreen = ({ navigation }) => {
    const theme = useTheme();

    const [ currentMember, setCurrentMember ] = useState({ names: "", idno: "", tea_nb: "" });
    const [ workConfig, setWorkConfig ] = useState({});
    const [ billData, setBillData ] = useState({});

    useEffect(() => {
        getComplexData("current_member").then((data) => setCurrentMember(data));
    }, []);

    useEffect(() => {
        getComplexData("work_config").then((data) => setWorkConfig(data));
    }, []);

    useEffect(() => {
        getComplexData("bill_data").then((data) => {
            console.log({bill_data: data});
            setBillData(data)
        });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigationWithBack navigation={navigation}/>
            <Divider />
            <Layout style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ alignItems: 'center', }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-around", width: "90%", alignItems: 'center', marginTop: 10, borderWidth: 2, paddingVertical: 10, borderColor: "rgba(0, 0, 0, 0.1)", borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                        <View>
                            <UserAvatar size={50} borderRadius={10} component={<Icon style={{ width: 32, height: 32 }} name='person-outline' fill={theme["color-basic-default"]}/>} bgColors={[theme["color-primary-default"]]} />
                        </View>
                        <View style={{flexDirection: "column", justifyContent: "space-between"}}>
                            <View style={{ flex: 1, marginTop: 2 }}>
                                <Text style={{ fontWeight: "bold" }} category='label'>{currentMember.names}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', }}>
                                <Text appearance="hint" category='label'>{currentMember.idno}</Text>
                            </View>
                        </View>
                        <View style={{ justifyContent: "center", alignItems: "center"}}>
                            <View style={{ flex: 1, alignSelf: "center", justifyContent: 'center',}}>
                                <Text style={{ fontWeight: "bold" }} category='label'>{currentMember.tea_nb}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, width: "95%", marginBottom: 10, borderWidth: 2, borderTopWidth: 0, paddingVertical: 10, borderColor: "rgba(0, 0, 0, 0.1)", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingHorizontal: 10, backgroundColor: theme["color-primary-default"]}}>
                    <View style={{ flex: 1, }}>
                        <View style={{ alignItems: 'center', marginVertical: 20, }}>
                            <Icon style={{ width: 80, height: 80, marginVertical: 13, }} name="checkmark-circle-outline" fill="white" />
                            <Text style={{ fontWeight: "bold", color: "white" }}>SAVED SUCCESSFULLY</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                            <View style={{ alignItems: 'center'}}>
                                <Text style={{ fontWeight: "bold", color: "white", fontSize: 50, alignSelf: 'baseline',}}>
                                    {billData.records.length}
                                </Text>
                                <Text style={{ fontWeight: "bold", color: "white" }}>BAGS</Text>
                            </View>
                            <View style={{ alignItems: 'center'}}>
                                <Text style={{ fontWeight: "bold", color: "white", fontSize: 50, }}>
                                    {billData.records.reduce((p, c) => Number(p) + Number(c), 0)}
                                </Text>
                                <Text style={{ fontWeight: "bold", color: "white" }}>KILOGRAMS</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ justifyContent: "center"}}>
                        <View style={{ backgroundColor: "white", minHeight: 35, borderRadius: 20, flexDirection: 'row', }}>
                            <View style={{ flex: 1,  flexDirection: 'row', justifyContent: "center", alignItems: "center"}}>
                                <Icon style={{ width: 25, height: 25, marginHorizontal: 10 }} name="calendar-outline" fill={theme["color-primary-default"]} />
                                <Text style={{ fontWeight: "bold"}}>{`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`}</Text>
                            </View>
                            <View style={{flex: 1, borderRadius: 20, flexDirection: 'row', justifyContent: "center", alignItems: "center"}}>
                                <Icon style={{ width: 25, height: 25, marginHorizontal: 10 }} name="clock-outline" fill={theme["color-primary-default"]} />
                                <Text style={{ fontWeight: "bold"}}>{`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <ButtonGroup appearance='outline' status='primary' style={{ justifyContent: "space-between", width: "95%", marginBottom: 10}}>
                    <Button style={{ flex: 1 }} accessoryRight={EyeIcon} onPress={()=>navigation.navigate("Bill")}>VIEW BILL</Button>
                    <Button accessoryLeft={PrinterIcon}/>
                    <Button accessoryLeft={MessageIcon}/>
                </ButtonGroup>
            </Layout>
        </SafeAreaView>
    );
};