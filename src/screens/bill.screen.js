import React from 'react';
import { Button, ButtonGroup, Divider, Icon, Layout, Text, useTheme } from '@ui-kitten/components';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { TopNavigationWithBack } from '../components/topbar.components';
import { MessageIcon, PrinterIcon } from '../components/accessory-icon.components';
// Import RNPrint
import RNPrint from 'react-native-print';

export const BillScreen = ({ navigation }) => {
    const theme = useTheme();

    const printHTML = async () => {
        await RNPrint.print({
            html: `
            <div style="">
                <h1>KOBACYAMU</h1>
                <div style="display: flex; flex-direction: row;">
                    <div>Zone: </div>
                    <div>KIBYAGIRA</div>
                </div>
                <div style="display: flex; flex-direction: row;">
                    <div>Hangar: </div>
                    <div>KIBYAGIRA</div>
                </div>
                <div style="display: flex; flex-direction: row;">
                    <div>Names: </div>
                    <div>NDAHAYO RUGERO Elvis Peace</div>
                </div>
                <div style="display: flex; flex-direction: row;">
                    <div>Idno: </div>
                    <div>1199680088557483</div>
                </div>
                <div style="display: flex; flex-direction: row;">
                    <div>Tea N&deg;: </div>
                    <div>1199680088557483</div>
                </div>
                <div style="display: flex; flex-direction: row;">
                    <div>Date: </div>
                    <div>${new Date().toLocaleDateString()}</div>
                </div>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>N&deg;</th>
                            <th>Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>10</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>TOTAL</th>
                            <th>50 KG</th>
                        </tr>
                        <tr>
                            <th>LOSS</th>
                            <th>50 KG</th>
                        </tr>
                        <tr>
                            <th>FOR FACTORY</th>
                            <th>50 KG</th>
                        </tr>
                    </tfoot>
                </table>
                <table>
                    <thead>
                        <tr>
                            <th colspan="2">UNPAID</th>
                        </tr>
                        <tr>
                            <th>UMUSARURO</th>
                            <th>50 KG</th>
                        </tr>
                        <tr>
                            <th>IFUMBIRE</th>
                            <th>50 KG</th>
                        </tr>
                    </thead>
                </table>
                <div style="display: flex; flex-direction: row;">
                    <div>Done by: </div>
                    <div>MUHAMEDI ADAM KHAN</div>
                </div>
                <div style="display: flex; flex-direction: row;">
                    <div>On: </div>
                    <div>${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</div>
                </div>
            </div>
            `,
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigationWithBack navigation={navigation}/>
            <Divider />
            <Layout style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ width: "95%", paddingHorizontal: 10, marginTop: 10, borderWidth: 2, paddingVertical: 10, borderColor: "rgba(0, 0, 0, 0.1)", borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                            <View>
                                <View style={{ marginTop: 2, marginBottom: 10 }}>
                                    <Text style={{ fontWeight: "bold" }} category='label'>KOBACYAMU</Text>
                                </View>
                                <View style={{ justifyContent: 'center', marginBottom: 10 }}>
                                    <Text appearance="hint" category='label'>Zone: <Text style={{ fontSize: 13, fontWeight: 'bold' }}>KIBYAGIRA</Text></Text>
                                    <Text appearance="hint" category='label'>Hangar: <Text style={{ fontSize: 13, fontWeight: 'bold' }}>KIBYAGIRA</Text></Text>
                                </View>
                                <View style={{ justifyContent: 'center', marginBottom: 10 }}>
                                    <Text appearance="hint" category='label'>Names: <Text style={{ fontSize: 13, fontWeight: 'bold', flexWrap: 'wrap-reverse', }}>NDAHAYO RUGERO Elvis Peace</Text></Text>
                                    <Text appearance="hint" category='label'>Idno: <Text style={{ fontSize: 13, fontWeight: 'bold' }}>1199680088557483</Text></Text>
                                    <Text appearance="hint" category='label'>Tea N&deg;: <Text style={{ fontSize: 13, fontWeight: 'bold' }}>1003</Text></Text>
                                </View>
                                <View style={{ justifyContent: 'center', marginBottom: 10 }}>
                                    <Text appearance="hint" category='label'>Date: <Text style={{ fontSize: 13, fontWeight: 'bold' }}>12-12-2020</Text></Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={{ flexDirection: "row", width: "95%", alignItems: 'center', borderWidth: 2, borderTopWidth: 0, padding: 10, borderColor: "rgba(0, 0, 0, 0.1)", justifyContent: "space-evenly", backgroundColor: theme["color-primary-default"], }}>
                                <View style={{ flex: 1, marginTop: 2 }}>
                                    <Text style={{ fontWeight: "bold", color: "white" }} category='label'>N&deg;</Text>
                                </View>
                                <View style={{ alignSelf: "center", justifyContent: 'center',}}>
                                    <Text style={{ fontWeight: "bold", color: "white" }} category='label'>Qty</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", width: "95%", alignItems: 'center', borderWidth: 2, borderTopWidth: 0, padding: 10, borderColor: "rgba(0, 0, 0, 0.1)", justifyContent: "space-evenly" }}>
                                <View style={{ flex: 1, marginTop: 2 }}>
                                    <Text style={{ fontWeight: "bold" }} category='label'>1</Text>
                                </View>
                                <View style={{ alignSelf: "center", justifyContent: 'center', }}>
                                    <Text style={{ fontWeight: "bold" }} category='label'>10</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", width: "95%", alignItems: 'center', borderWidth: 2, borderTopWidth: 0, padding: 10, borderColor: "rgba(0, 0, 0, 0.1)", justifyContent: "space-evenly" }}>
                                <View style={{ flex: 1, marginTop: 2 }}>
                                    <Text style={{ fontWeight: "bold" }} category='label'>1</Text>
                                </View>
                                <View style={{ alignSelf: "center", justifyContent: 'center',}}>
                                    <Text style={{ fontWeight: "bold" }} category='label'>10</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", width: "95%", alignItems: 'center', borderWidth: 2, borderTopWidth: 0, padding: 10, borderColor: "rgba(0, 0, 0, 0.1)", justifyContent: "space-evenly", }}>
                                <View style={{ flex: 1, marginTop: 2 }}>
                                    <Text style={{ fontWeight: "bold" }} category='label'>1</Text>
                                </View>
                                <View style={{ alignSelf: "center", justifyContent: 'center',}}>
                                    <Text style={{ fontWeight: "bold" }} category='label'>10</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", width: "95%", alignItems: 'center', borderWidth: 2, borderTopWidth: 0, padding: 10, borderColor: "rgba(0, 0, 0, 0.1)", justifyContent: "space-evenly" }}>
                                <View style={{ flex: 1, marginTop: 2 }}>
                                    <Text style={{ fontWeight: "bold" }} category='label'>1</Text>
                                </View>
                                <View style={{ alignSelf: "center", justifyContent: 'center',}}>
                                    <Text style={{ fontWeight: "bold" }} category='label'>10</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", width: "95%", alignItems: 'center', borderWidth: 2, borderTopWidth: 0, padding: 10, borderColor: "rgba(0, 0, 0, 0.1)", justifyContent: "space-evenly" }}>
                                <View style={{ flex: 1, marginTop: 2 }}>
                                    <Text style={{ fontWeight: "bold" }} category='label'>1</Text>
                                </View>
                                <View style={{ alignSelf: "center", justifyContent: 'center',}}>
                                    <Text style={{ fontWeight: "bold" }} category='label'>10</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ width: "95%", alignItems: 'center', borderWidth: 2, borderTopWidth: 0, padding: 10, borderColor: "rgba(0, 0, 0, 0.1)", justifyContent: "space-around", }}>
                            <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                <View style={{ marginTop: 2, flex: 1 }}>
                                    <Text style={{ fontWeight: "bold" }} category='label'>TOTAL</Text>
                                </View>
                                <View style={{ justifyContent: 'center', }}>
                                    <Text>50<Text appearance="hint" category='label'>KG</Text></Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                <View style={{ marginTop: 2, flex: 1 }}>
                                    <Text style={{ fontWeight: "bold" }} category='label'>LOSS</Text>
                                </View>
                                <View style={{ justifyContent: 'center', }}>
                                    <Text>50<Text appearance="hint" category='label'>KG</Text></Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                <View style={{ marginTop: 2, flex: 1 }}>
                                    <Text style={{ fontWeight: "bold" }} category='label'>FOR FACTORY</Text>
                                </View>
                                <View style={{ justifyContent: 'center', }}>
                                    <Text>50<Text appearance="hint" category='label'>KG</Text></Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", width: "95%", alignItems: 'center', borderWidth: 2, borderTopWidth: 0, padding: 10, borderColor: "rgba(0, 0, 0, 0.1)", justifyContent: "space-evenly", backgroundColor: theme["color-primary-default"], }}>
                            <View style={{ flex: 1, marginTop: 2 }}>
                                <Text style={{ fontWeight: "bold", color: "white" }} category='label'>UNPAID</Text>
                            </View>
                        </View>
                        <View style={{ width: "95%", alignItems: 'center', borderWidth: 2, borderTopWidth: 0, padding: 10, borderColor: "rgba(0, 0, 0, 0.1)", justifyContent: "space-around", }}>
                            <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                <View style={{ marginTop: 2, flex: 1 }}>
                                    <Text style={{ fontWeight: "bold" }} category='label'>UMUSARURO</Text>
                                </View>
                                <View style={{ justifyContent: 'center', }}>
                                    <Text>50<Text appearance="hint" category='label'>KG</Text></Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", marginBottom: 10 }}>
                                <View style={{ marginTop: 2, flex: 1 }}>
                                    <Text style={{ fontWeight: "bold" }} category='label'>IFUMBIRE</Text>
                                </View>
                                <View style={{ justifyContent: 'center', }}>
                                    <Text>50<Text appearance="hint" category='label'>KG</Text></Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", width: "95%", alignItems: 'center', borderWidth: 2, borderTopWidth: 0, padding: 10, borderColor: "rgba(0, 0, 0, 0.1)", justifyContent: "space-evenly", marginBottom: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10,  }}>
                            <View style={{ flex: 1, marginTop: 2 }}>
                                <Text style={{ fontWeight: "bold" }} category='label'>Done by: <Text appearance="hint" category='label'>MUHAMED ADAM KHAN</Text></Text>
                            </View>
                            <View style={{ alignSelf: "center", justifyContent: 'center',}}>
                                <Text style={{ fontWeight: "bold" }} category='label'>On <Text appearance="hint" category='label'>{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</Text></Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <ButtonGroup appearance='outline' status='primary' style={{ justifyContent: "space-between", width: "95%", marginBottom: 10, alignSelf: "center"}}>
                    <Button style={{ flex: 1 }} accessoryRight={PrinterIcon} onPress={()=> printHTML()}>Print BILL</Button>
                    <Button accessoryLeft={MessageIcon}/>
                </ButtonGroup>
            </Layout>
        </SafeAreaView>
    );
};