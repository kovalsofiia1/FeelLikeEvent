import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';

interface Item {
    label: string;
    value: string;
}

interface Props {
    title: string;
    items: Item[];
    selectedItems: ValueType[];
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const MultipleSelect: React.FC<Props> = ({ title, items, selectedItems, setSelectedItems }) => {
    const [open, setOpen] = useState(false);

    return (
        <View className=''>
            <DropDownPicker
                open={open}
                value={selectedItems}
                items={items}
                setOpen={setOpen}
                setValue={setSelectedItems}
                placeholder={title}
                multiple={true}
                mode="BADGE"
                badgeColors="#2196F3"
                badgeTextStyle={{ color: 'white' }}
                style={{
                    backgroundColor: '#FAFAFA',
                    borderBlockColor: 'grey',
                    minHeight: 30,
                    width: 150,
                    borderRadius: 14,
                    zIndex: open ? 1000 : 1,
                }}
                textStyle={{ color: 'black' }}
                dropDownContainerStyle={{
                    backgroundColor: 'grey',
                    zIndex: open ? 1000 : 1,
                }}
                listMode="MODAL"
            />
        </View>
    )
}

export default MultipleSelect

const styles = StyleSheet.create({})