# rn-searchable-picker

<i>rn-searchable-picker</i> is a small library that provides a dropdown menu which has an ability to search and select. So that React Native developers can use this for large set of items.

Try it and make your life simpler! 

<br>

<img src="https://drive.google.com/uc?export=view&id=1Uo_bj00RFr442nowNC8C7vqcpQlZsjzF" />
<img src="https://drive.google.com/uc?export=view&id=1T-u-9YrvwKLiIYNxbtIKrfqyNbZoPWiL" />

<br> 

## Installation

`npm install rn-searchable-picker --save` <br>
`yarn add rn-searchable-picker` <br>

<br> 

## Properties and Methods

| Prop                  | Description                                                                                                                                       | Default             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| **`value`**           | Initial selected value. It should be a value of an item in `data` Array.                                                     |  _None_              |
| **`onValueChange`**            | A void method which executes when the selected value changes. <br> _Ex : (value, index, item) => console.log(value, index, item)_                                                                                                                                        | _None_                |
| **`items`**       | Dropdown items. <br> _Ex : [ {label: 'Label', value: 'value'}, ]_ | `[ ]` |
| **`backgroundColor`** | Background color of the button.                                                                                                                   | `#007AFF`           |
| **`placeholder`**    | Placeholder object. <br> _Ex : {label: 'Select Value', value: 'placeholder'}._                                                                                               | `{ }`                 |
| **`searchPlaceholder`**         | Placeholder for search field.                                                                                                     | _None_              |
| **`containerStyle`**           | Background style for selected value.                                                     |  `Style Object`              |
| **`placeholderStyle`**            | Placeholder style                                                                                                                                       | `Style Object`               |
| **`valueStyle`**       | Selected value style | `Style Object` |
| **`onOpen`** | A void function which executes when opening the dropdown. <br> _Ex : () => console.log('Picker is opening')_                                                                                                                   | _None_           |
| **`onClose`** | A void function which executes when opening the dropdown. <br> _Ex : () => console.log('Picker is closing')_                                                                                                                   | _None_           |
| **`onChangeText`**         | A void method which executes when typing in search field. _Ex : text => console.log(text)_                                                                                                      | _None_              |
| **`renderIcon`** | Icon for dropdown. <br> _Ex : color => <AntDesign name={'down'} size={15} color={color} />_                                                                                                                   | _Arrow Down Icon_           |
| **`closeByBackgroundTouch`**         | Close picker by touching background blur area without close icon                                                                                                      | `false`              |
| **`selectedValueBackgroundColor`** | Selected value background color                                                                                                                   | `#F0F0F0`           |
| **`selectedValueColor`**         | Selected value color                                                                                                      | `#000000`              |
| **`itemBackgroundColor`** | Background color of items in list.                                                                                                                   | _None_           |
| **`itemColor`**         | Item text color                                                                                                      | `#000000`              |
| **`textInputStyle`**         | Search field input text style                                                                                                     | `Style Object`              |

<br> 

## Usage


```js
import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import RNSearchablePicker from 'rn-searchable-picker'
import AntDesign from 'react-native-vector-icons/AntDesign'

const App = () => {

  const data = [
    { label: 'Item 01', value: 'value 01', extra: "something else" },
    { label: 'Item 02', value: 'value 02' },
    { label: 'Item 03', value: 'value 03' },
    { label: 'Item 04', value: 'value 04', extra: "something else" },
    { label: 'Item 05', value: 'value 05' },
    { label: 'Item 06', value: 'value 06' },
  ]

  const renderIcon = color => <AntDesign name={'down'} size={15} color={color} />

  return (
    <View style={styles.container}>
      <RNSearchablePicker
        value={'value 02'} // initial value (optionsl)
        onValueChange={(value, index, item) => console.log(value, index, item)}
        items={data} // required
        placeholder={{
          label: 'Select Value',
          value: 'placeholder'
        }}
        searchPlaceholder={'Type here...'}
        onOpen={() => console.log('Picker is opening')}
        onClose={() => console.log('Picker is closing')}
        renderIcon={renderIcon}
        onChangeText={text => console.log(text)}
        closeByBackgroundTouch={true} />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
   padding: 10,
  },
})
```