import React, { useState, useEffect, useReducer } from 'react';
import { Button, Divider, Icon, Input, Layout, Text, useTheme } from '@ui-kitten/components';
import { SafeAreaView, View, ScrollView } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { TopNavigationWithBack } from '../components/topbar.components';
import { PlusIcon, ForwardArrowIcon } from '../components/accessory-icon.components';
import { getComplexData, storeComplexData } from '../utils/async-storage';
import { getUserRealm } from '../utils/realm/realms';

export const RecordScreen = ({ navigation }) => {
    const [ recordsUpdated, setRecordsUpdated ] = useState(false);
    function reducer(state, action) {
        state[action.type] = action.value;
        setRecordsUpdated(!recordsUpdated);
        return state;
    }

    const [ inputCount, setInputCount ] = useState(0);
    const [ inputs, setInputs ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ records, setRecords ] = useReducer(reducer, []);
    const [ currentMember, setCurrentMember ] = useState({ names: "", idno: "", tea_nb: "" });
    const [ workConfig, setWorkConfig ] = useState({});
    const [ userInfo, setUserInfo ] = useState({});

    const theme = useTheme();

    const incrementInputs = () => {
        if (Array.isArray(records) && records.length == inputCount) {
            setInputCount(inputCount + 1);
        } else {
            console.log({inputCount, inputs});
            alert("Please fill the added inputs.");
        }
    }

    useEffect(() => {
        const arr = Array();

        for (let index = 0; index < inputCount; index++) {
            console.log({ index });
            arr.push("");
            console.log({ arr });
        }
        setInputs(arr);
    }, [inputCount]);

    useEffect(() => {
        let tot = 0;
        tot = records.reduce((acc, record) => (acc + Number(record)), tot);
        setTotal(tot);
    }, [recordsUpdated]);

    useEffect(() => {
        getComplexData("current_member").then((data) => setCurrentMember(data));
    }, []);

    useEffect(() => {
        getComplexData("work_config").then((data) => setWorkConfig(data));
    }, []);

    useEffect(() => {
        getComplexData("user_info").then((data) => setUserInfo(data));
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigationWithBack navigation={navigation}/>
            <Divider />
            <Layout style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ alignItems: 'center' }}>
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
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '95%', paddingVertical: 5, paddingLeft: 10, borderWidth: 2, borderColor: "rgba(0, 0, 0, 0.1)", borderTopRightRadius: 10, borderTopLeftRadius: 10}}>
                        <View style={{ flex: 1}}>
                            <Text style={{ fontWeight: "bold", }}>{total} KG</Text>
                        </View>
                        <View style={{ flex: 1}}>
                            <Text style={{ fontWeight: "bold", }}>{inputCount > 0 && inputCount}{inputCount == 0 && "NO"} BAG{(inputCount == 0 || inputCount > 1) && "S"}</Text>
                        </View>
                        <View style={{ alignSelf: "flex-end"}}>
                            <Button appearance='ghost' accessoryLeft={PlusIcon} size="small" onPress={() => incrementInputs()}>NEW</Button>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, width: "95%", marginBottom: 10, borderWidth: 2, borderTopWidth: 0, paddingVertical: 10, borderColor: "rgba(0, 0, 0, 0.1)", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingHorizontal: 10}}>
                    <ScrollView style={{ flex: 1 }}>
                        {Array.isArray(inputs) && inputs.length > 0 && inputs.map((v, i) => (
                            <Input
                                keyboardType="numeric"
                                key={i}
                                label={`Bag ${i + 1}`}
                                placeholder='Enter your username'
                                // accessoryLeft={renderUserIcon}
                                // secureTextEntry={secureTextEntry}
                                onChangeText={nextValue => setRecords({ type: i, value: nextValue })}
                                size='small'
                                style={{ marginBottom: 10 }}
                            />
                        ))}
                    </ScrollView>
                    <Button
                        accessoryRight={ForwardArrowIcon}
                        style={{ marginVertical: 5 }}
                        onPress={()=> {
                            // Remove Empty
                            const notEmptyRecords = records.filter((v) => v);
                            // Store and navigate
                            if (notEmptyRecords.length > 0) {
                                getUserRealm(currentMember._id).then(realm => {
                                    realm.write(() => {
                                        let insertedIds = [];
                                        notEmptyRecords.forEach((record, index) => {
                                            console.log({bloc: workConfig.hangar, date: new Date()});
                                            const lastRecord = realm.objects("umusaruro").filtered("id != null").sorted("id", true)[0];
                                            let lastId = 0;
                                            if (lastRecord && lastRecord._id) {
                                                lastId = lastRecord._id;
                                            }
                                            const harvest = realm.create("umusaruro", {
                                                _id: lastId + 1,
                                                id: lastId + 1,
                                                bloc: workConfig.hangar.id,
                                                cooperative_id: currentMember.cooperative_id,
                                                created_at: new Date(),
                                                date: workConfig.date,
                                                inserted_by: userInfo._id,
                                                members_id: currentMember._id,
                                                prices_id: 1,
                                                quantity: Number(record),
                                                status: "unpaid",
                                                updated_at: new Date()
                                            })
                                            insertedIds.push(harvest._id);
                                            console.log({record, harvest});

                                            (index == (notEmptyRecords.length - 1)) && storeComplexData("bill_data", { records: notEmptyRecords, member: currentMember, insertedIds }).then(() => navigation.navigate("Ack")).catch(e => console.log(e.message));
                                        });
                                    })
                                }).catch(err => console.log(err.message));
                            } else {
                                alert("Please add one bag at least");
                            }
                        }}>
                        SAVE &amp; CONTINUE
                    </Button>
                </View>
            </Layout>
        </SafeAreaView>
    );
};