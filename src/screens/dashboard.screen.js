import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';
import { Button, Icon, Layout, Text, TopNavigation, TopNavigationAction, useTheme } from '@ui-kitten/components';
import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, useWindowDimensions, View } from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import { PlusIcon, ForwardArrowIcon } from '../components/accessory-icon.components';
import { Config } from '../components/config.component';
import { getSimpleData } from '../utils/async-storage';

const config = {
    hasXAxisBackgroundLines: false,
    xAxisLabelStyle: {
        position: 'right',
        suffix: 'KG'
    },
    hasYAxisLabels: true,
};

export const DashboardScreen = ({ navigation }) => {
    const windowWidth = useWindowDimensions().width;
    const theme = useTheme();

    const [cooperativeId, setCooperativeId] = useState();

    useEffect(() => {
        getSimpleData("cooperative_id").then(value => setCooperativeId(value));
    }, []);

    const MenuIcon = (props) => (
        <Icon {...props} name='menu' fill={theme["color-primary-default"]}/>
    );

    const navigateBack = () => {
        navigation.toggleDrawer();
    };

    const BackAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={navigateBack}/>
    );

    const styles = StyleSheet.create({
        chart: {
            padding: 10,
            paddingTop: 20,
            // borderRadius: 20,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            width: "100%",
            /* borderBottomWidth: .5,
            borderBottomColor: "rgba(0, 0, 0, 0.1)",
            borderLeftWidth: .5,
            borderLeftColor: "rgba(0, 0, 0, 0.5)",
            borderRightWidth: .5,
            borderRightColor: "rgba(0, 0, 0, 0.5)", */
        }
    });

    const modalizeRef = useRef(null);

    const onOpen = () => {
        modalizeRef.current?.open();
    };
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TopNavigation title={evaProps => <Text {...evaProps} style={{color: theme["text-primary-color"]}}>CDMS</Text>} alignment='center' accessoryLeft={BackAction} />
            <Layout style={{ flex: 1, alignItems: 'center', }}>
                <View>
                    <VerticalBarGraph
                        data={[20, 45, 28, 80, 99, 43, 50]}
                        labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                        width={windowWidth - 10}
                        height={(useWindowDimensions().height * 32) / 100}
                        barRadius={5}
                        barWidthPercentage={0.35}
                        baseConfig={config}
                        style={styles.chart}
                        barColor={theme["color-primary-default"]}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, width: '95%', borderWidth: 1.5, marginTop: 10, borderColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 6,}}>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent:  'center', paddingRight: 9}}>
                        <View style={{ backgroundColor: theme["color-primary-100"], paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 }}>
                            <Text style={{ textAlign: "center", fontWeight: 'bold', fontSize: 12, }}>Alert</Text>
                        </View>
                    </View>
                    <View style={{ flex: 7, alignItems: 'center', justifyContent:  'center'}}>
                        <Text category="s2" style={{ textAlign: "center", fontWeight: "bold", fontSize: 12 }} appearance='hint'>Please set field configuration</Text>
                    </View>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent:  'center'}}>
                        <Button appearance='ghost' accessoryLeft={ForwardArrowIcon} onPress={onOpen}/>
                    </View>
                </View>
                <View style={{ alignItems: 'center'}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: '95%', paddingVertical: 5, paddingLeft: 5,}}>
                        <View style={{ alignItems: "flex-start", width: '70%'}}>
                            <Text style={{ fontWeight: "bold", }}>Recent records</Text>
                        </View>
                        <View style={{ alignSelf: "flex-end"}}>
                            <Button appearance='ghost' accessoryLeft={PlusIcon} size="small">NEW</Button>
                        </View>
                    </View>
                    <View style={{ width: "95%" }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%", alignItems: 'center', marginVertical: 5}}>
                            <View>
                                <UserAvatar size={50} borderRadius={10} name="MUHAMED ADAM" bgColors={[theme["color-primary-default"], theme["color-info-default"], theme["color-success-default"], theme["color-warning-default"]]} />
                            </View>
                            <View style={{flexDirection: "column", justifyContent: "space-between"}}>
                                <View style={{ flex: 1, marginTop: 2 }}>
                                    <Text style={{ fontWeight: "bold",}} category='label'>MUHAMED ADAM KHAN</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', }}>
                                    <Text appearance="hint" category='label'>1111111111111111 - 777</Text>
                                </View>
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center"}}>
                                <View style={{ flex: 1,}}>
                                    <Text style={{ fontWeight: "bold",}} category='label'>40KG</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', }}>
                                    <Text appearance="hint" category='label'>TODAY</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%", alignItems: 'center', marginVertical: 5}}>
                            <View>
                                <UserAvatar size={50} borderRadius={10} name="MUHAMED ADAM" bgColors={[theme["color-primary-default"], theme["color-info-default"], theme["color-success-default"], theme["color-warning-default"]]} />
                            </View>
                            <View style={{flexDirection: "column", justifyContent: "space-between"}}>
                                <View style={{ flex: 1, marginTop: 2 }}>
                                    <Text style={{ fontWeight: "bold",}} category='label'>MUHAMED ADAM KHAN</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', }}>
                                    <Text appearance="hint" category='label'>1111111111111111 - 777</Text>
                                </View>
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center"}}>
                                <View style={{ flex: 1,}}>
                                    <Text style={{ fontWeight: "bold",}} category='label'>40KG</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', }}>
                                    <Text appearance="hint" category='label'>TODAY</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%", alignItems: 'center', marginVertical: 5}}>
                            <View>
                                <UserAvatar size={50} borderRadius={10} name="MUHAMED ADAM" bgColors={[theme["color-primary-default"], theme["color-info-default"], theme["color-success-default"], theme["color-warning-default"]]} />
                            </View>
                            <View style={{flexDirection: "column", justifyContent: "space-between"}}>
                                <View style={{ flex: 1, marginTop: 2 }}>
                                    <Text style={{ fontWeight: "bold",}} category='label'>MUHAMED ADAM KHAN</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', }}>
                                    <Text appearance="hint" category='label'>1111111111111111 - 777</Text>
                                </View>
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center"}}>
                                <View style={{ flex: 1,}}>
                                    <Text style={{ fontWeight: "bold",}} category='label'>40KG</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', }}>
                                    <Text appearance="hint" category='label'>TODAY</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Layout>
            <Config navigation={navigation} modalizeRef={modalizeRef} />
        </SafeAreaView>
    );
};

