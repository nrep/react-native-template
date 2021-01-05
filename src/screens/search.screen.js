import { Button, Icon, Layout, useTheme } from '@ui-kitten/components';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Modalize } from 'react-native-modalize';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { getCooperativeRealm } from '../utils/realm/realms';
import { SearchListItem } from '../components/list-item.components';
import { getSimpleData } from '../utils/async-storage';

export const SearchScreen = ({ navigation }) => {
    const [isQR, setIsQR] = useState(false);
    const [queryString, setQueryString] = useState("");
    const [filter, setFilter] = useState("tea_nb");
    const [searchResults, setSearchResults] = useState([]);
    const [cooperativeId, setCooperativeId] = useState(0);

    const search = (realmKey) => {
        getCooperativeRealm(Number(realmKey)).then(realm => {
            const members = realm.objects("member");
            let topResults = members.filtered(`${filter} CONTAINS '${queryString}' LIMIT(20)`);
            setSearchResults(topResults);
        }).catch(e => console.log(e.message));
    }

    useEffect(() => {
        if (cooperativeId > 0) {
            search(cooperativeId);
        } else {
            getSimpleData("cooperative_id").then(value => {
                search(value);
            });
        }
    }, [queryString]);

    const window = useWindowDimensions();

    const theme = useTheme();
    const modalizeRef = React.useRef(null);

    const onOpen = () => {
        modalizeRef.current?.open();
    };

    const CameraIcon = (props) => (
        <Icon {...props} name='camera-outline'/>
    );

    const MenuIcon = (props) => (
        <Icon {...props} name='menu-2-outline'/>
    );

    const onSuccess = (e) => {
        console.log({data: e.data});
        navigation.navigate("Record");
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, alignItems: 'center', marginVertical: 10}}>
                    <View style={{ width: "10%" }}>
                        <Icon name="arrow-back" style={{ width: 25, height: 25 }} fill={theme["color-primary-default"]} />
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 10, flexDirection: "row", borderWidth: 1.5, borderColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 6,}}>
                        <TextInput
                            style={{ flex: 1}}
                            placeholder='Place your Text'
                            value={queryString}
                            onChangeText={nextValue => setQueryString(nextValue)}
                            />
                        <View style={{ alignSelf: 'stretch',}}>
                            <Button accessoryLeft={MenuIcon} appearance='ghost' status="primary" />
                        </View>
                    </View>
                    <TouchableOpacity style={{ alignSelf: 'stretch', justifyContent: 'center', borderWidth: 1.5, borderRadius: 6, borderColor: theme["color-primary-500"], paddingHorizontal: 10}} onPress={() => onOpen()}>
                        <CameraIcon style={{ height: 25, width: 25 }} fill={theme["color-primary-default"]} />
                    </TouchableOpacity>
                </View>
                {!isQR && (
                    <ScrollView style={{ width: "95%"}}>
                        {searchResults.map(value => <SearchListItem key={value.id} navigation={navigation} names={value.names} idNo={value.idno} teaNumber={value.tea_nb} value={value} />)}
                    </ScrollView>
                )}
                <Modalize adjustToContentHeight={true} ref={modalizeRef}>
                    <QRCodeScanner
                        containerStyle={{height: window.height, width: window.width, borderRadius: 30}}
                        cameraStyle={[{height: window.height, width: window.width, borderRadius: 30}]}
                        onRead={onSuccess}
                        flashMode={RNCamera.Constants.FlashMode.auto}
                        showMarker={true}
                        markerStyle={{borderColor: theme["color-primary-default"]}}
                    />
                </Modalize>
            </Layout>
        </SafeAreaView>
    );
};