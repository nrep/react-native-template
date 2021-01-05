import { Button, Datepicker, Icon, IndexPath, Select, SelectItem } from '@ui-kitten/components';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { SaveIcon } from './accessory-icon.components';
import { getCooperativeRealm, getInstitutionRealm } from '../utils/realm/realms';
import { getSimpleData, storeComplexData } from '../utils/async-storage';

export const Config = ({ navigation, modalizeRef }) => {
    const [date, setDate] = useState(new Date());
    const [cooperativeId, setCooperativeId] = useState();
    const [zones, setZones] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState(new IndexPath(0));
    const [hangars, setHangars] = useState([]);
    const [useHangar, setUseHangar] = useState(false);
    const [selectedCombination, setSelectedCombination] = useState(new IndexPath(0));
    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState(new IndexPath(0));
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(new IndexPath(0));

    useEffect(() => {
        getSimpleData("cooperative_id").then(value => setCooperativeId(value));
    }, []);

    useEffect(() => {
        getCooperativeRealm(Number(cooperativeId)).then(realm => {
            const levels = realm.objects("level");
            setZones(levels);
        }).catch(e => console.log(e.message));
    }, [cooperativeId]);

    useEffect(() => {
        getInstitutionRealm(Number(cooperativeId)).then(realm => {
            const driverz = realm.objects("driver");
            const carz = realm.objects("car");

            console.log({ driverz });
            console.log({ carz });

            setDrivers(driverz);
            setCars(carz);
        }).catch(e => console.log(e.message));
    }, [cooperativeId]);

    const PinIcon = (props) => (
        <Icon {...props} name='pin-outline'/>
    );

    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

    const CalendarIcon = (props) => (
        <Icon {...props} name='calendar-outline'/>
    );

    const CarIcon = (props) => (
        <Icon {...props} name='car-outline'/>
    );

    const PersonIcon = (props) => (
        <Icon {...props} name='person-outline'/>
    );

    return (
        <Modalize adjustToContentHeight={true} ref={modalizeRef}>
            <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 15 }}>
                <Datepicker
                    style={{ marginVertical: 10, }}
                    date={date}
                    onSelect={nextDate => setDate(nextDate)}
                    size="large"
                    accessoryRight={CalendarIcon}
                />
                <Select
                    size='large'
                    accessoryLeft={PinIcon}
                    style={{ marginVertical: 10 }}
                    selectedIndex={selectedLevel}
                    value={(selectedLevel.row >= 0 && zones.length > 0) ? zones[selectedLevel.row]["Level"] : "Select zone"}
                    onSelect={(index) => {
                            setSelectedLevel(index)
                            const combinations = zones[index.row]["combinations"];
                            combinations.map(value => console.log({value}));
                            setHangars(combinations);
                            setUseHangar(true);
                        }
                    }>
                    {zones.map((value) => (
                        <SelectItem value={value.Level_id} title={value.Level} key={value.Level_id} />
                    ))}
                </Select>
                <Select
                    size='large'
                    accessoryLeft={PinIcon}
                    style={{ marginVertical: 10 }}
                    selectedIndex={selectedCombination}
                    disabled={!useHangar}
                    value={(useHangar && selectedCombination.row >= 0) ? hangars[selectedCombination.row]["Combination"] : "Select hangar"}
                    onSelect={index => setSelectedCombination(index)}>
                        {useHangar == true && hangars.map((value) => (
                            <SelectItem value={value.id} title={value.Combination} key={value.id} />
                        ))}
                </Select>
                <Select
                    size='large'
                    accessoryLeft={CarIcon}
                    style={{ marginVertical: 10 }}
                    selectedIndex={selectedCar}
                    value={(selectedCar.row >= 0 && cars.length > 0) ? cars[selectedCar.row]["plaque"] : "Select car"}
                    onSelect={(index) => {
                            setSelectedCar(index)
                        }
                    }>
                    {cars.map((value) => (
                        <SelectItem value={value.id} title={value.plaque} key={value.id} />
                    ))}
                </Select>
                <Select
                    size='large'
                    accessoryLeft={PersonIcon}
                    style={{ marginVertical: 10 }}
                    selectedIndex={selectedDriver}
                    value={(selectedDriver.row >= 0 && drivers.length > 0) ? drivers[selectedDriver.row]["names"] : "Select driver"}
                    onSelect={(index) => {
                            setSelectedDriver(index)
                        }
                    }>
                    {drivers.map((value) => (
                        <SelectItem value={value.id} title={value.names} key={value.id} />
                    ))}
                </Select>
                <Button
                    accessoryLeft={SaveIcon}
                    style={{ marginVertical: 10 }}
                    onPress={() => {
                        // Validate
                        if (!date) {
                            alert("Please choose a date");
                            return;
                        }
                        if (selectedLevel.row < 0) {
                            alert("Please choose a zone");
                            return;
                        }
                        if (!useHangar) {
                            alert("Please choose a zone");
                            return;
                        }
                        if (selectedCombination.row < 0) {
                            alert("Please choose a hangar");
                            return;
                        }
                        if (selectedCar.row < 0) {
                            alert("Please choose a car");
                            return;
                        }
                        if (selectedDriver.row < 0) {
                            alert("Please choose a driver");
                            return;
                        }
                        // Save config
                        const workConfig = {
                            date,
                            zone: zones[selectedLevel.row],
                            hangar: hangars[selectedCombination.row],
                            car: cars[selectedCar.row],
                            driver: drivers[selectedDriver.row],
                            created_at: new Date().toLocaleString()
                        }
                        console.log({workConfig});
                        storeComplexData("work_config", workConfig).then(() => navigation.navigate("Search")).catch(e => console.log(e.message));
                        // Navigate
                    }}>
                    SAVE CONFIGURATION
                </Button>
            </View>
        </Modalize>
    );
};

