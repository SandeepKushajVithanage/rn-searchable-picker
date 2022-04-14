import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    Platform,
    Keyboard,
    TextInput,
    StyleSheet,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

import AntDesign from 'react-native-vector-icons/AntDesign'
import Feater from 'react-native-vector-icons/Feather'

const RNSearchablePicker = props => {

    const [search, setSearch] = useState('')
    const [list, setList] = useState([])
    const [visible, setVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    const [initial, setInitial] = useState(true)

    const onPressItem = (item, index) => {
        props?.onValueChange(item?.value, index)
        setSelected(item)
        setVisible(false)
    }

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => onPressItem(item, index)}
                style={{
                    padding: 10,
                    marginHorizontal: item?.value && item?.value !== '' ? 5 : 0,
                    borderRadius: 5,
                    backgroundColor: item?.value && item?.value !== '' ? item?.value === selected?.value ? '#f0f0f0' : 'none' : 'none',
                }}>
                <Text style={{
                    color: item?.value && item?.value !== '' ? 'black' : 'grey',
                    fontSize: 15,
                }} numberOfLines={1}>{item.label}</Text>
            </TouchableOpacity>
        )
    }

    const ItemSeparatorView = () => {
        return (
            <View
                style={{
                    height: 10,
                    width: '100%',
                }}
            />
        );
    };

    const onTextChange = (text) => {
        setSearch(text)
    }

    useEffect(() => {
        if (visible === false) {
            setSearch('')
        } else {
            Keyboard.dismiss()
        }
    }, [visible])

    useEffect(() => {
        setList(props?.items)
        const temp = props?.items?.find(item => {
            return props?.value === item?.value
        })
        if (temp) {
            onPressItem(temp,)
        }
    }, [])

    useEffect(() => {
        setList(props?.items)
    }, [props?.items])

    useEffect(() => {
        if (initial) {
            const temp = props?.items?.find(item => {
                return props?.value === item?.value
            })
            if (temp) {
                onPressItem(temp, 0)
                setInitial(false)
            }
        }
    }, [props?.value])

    useEffect(() => {
        const text = search?.toLowerCase()
        const tempList = props?.items?.filter(item => {
            return item?.label?.toLowerCase()?.match(text) || item?.value?.toLowerCase()?.match(text)
        })
        setList(tempList, 0)
    }, [search])
    
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => setVisible(true)}
                style={[styles.selectedValueContainer, props?.containerStyle]}>
                <Text
                    numberOfLines={1}
                    style={selected?.value && selected?.value !== '' ?
                        [styles.selectedValue, styles.value, props?.valueStyle] :
                        [styles.selectedValue, styles.placeholder, props?.placeholderStyle]}>
                    {selected?.label ? selected?.label : props?.placeholder?.label}
                </Text>
                <AntDesign
                    style={{ marginLeft: 10 }}
                    name={'caretdown'}
                    size={9}
                    color={selected?.value && selected?.value !== '' ? '#000' : 'grey'} />
            </TouchableOpacity>
            <Modal visible={visible} transparent={true}>
                <TouchableOpacity disabled={true} onPress={() => setVisible(false)} activeOpacity={1}>
                    <SafeAreaView style={styles.safeArea}>
                        <View style={styles.closeIcon}>
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <Feater name={'x'} size={25} color={'white'} />
                            </TouchableOpacity>
                        </View>
                        <View
                            onStartShouldSetResponder={() => true}
                            style={styles.searchContainer}>
                            <TextInput
                                placeholder={props?.searchPlaceholder}
                                value={search}
                                onChangeText={onTextChange}
                                style={styles.textInput} />
                        </View>
                        <View onStartShouldSetResponder={() => true} style={{ height: 10 }} />
                        <View
                            onStartShouldSetResponder={() => true}
                            style={styles.dataContainer}>
                            <FlatList
                                keyboardShouldPersistTaps={'handled'}
                                contentContainerStyle={{ paddingVertical: 20 }}
                                data={props?.placeholder ? [props.placeholder, ...list] : list}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem}
                                ItemSeparatorComponent={ItemSeparatorView}
                            />
                        </View>
                    </SafeAreaView>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

export default RNSearchablePicker

const styles = StyleSheet.create({
    container: {

    },
    selectedValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Platform.OS === 'ios' ? 0 : 16,
        backgroundColor: '#FFF',
        borderRadius: 10,
    },
    selectedValue: {
        fontSize: 15,
        width: '90%',
    },
    value: {
        color: '#000',
    },
    placeholder: {
        color: 'grey',
    },
    safeArea: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        padding: 25,
        paddingBottom: 100,
        justifyContent: 'center',
    },
    closeIcon: {
        alignItems: 'flex-end',
        width: Platform.OS === 'ios' ? '90%' : '100%',
        marginTop: 20,
        marginBottom: 10,
    },
    searchContainer: {
        borderRadius: 5,
        height: 50,
        backgroundColor: '#FFF',
        width: Platform.OS === 'ios' ? '90%' : '100%',
        padding: 5,
    },
    dataContainer: {
        borderRadius: 5,
        width: Platform.OS === 'ios' ? '90%' : '100%',
        backgroundColor: '#FFF',
        maxHeight: Platform.OS === 'ios' ? hp(70) : hp(80),
    },
    textInput: {
        width: '100%',
        height: '100%',
    },
})