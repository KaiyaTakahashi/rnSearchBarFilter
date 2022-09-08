import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';

const App = () => {
const [filteredData, setfilteredData] = useState([]);
const [masterData, setmasterData] = useState([]);
const [search,setsearch] = useState('');

useEffect(() => {
  fetchPosts();
  return () => {

  }
}, [])

  const fetchPosts = () => {
    const apiURL = 'https://api.github.com/search/repositories?q=username';
    fetch(apiURL)
    .then((response) => response.json())
    .then((responseJson) => {
      setfilteredData(responseJson.items);
      setmasterData(responseJson.items);
    }).catch((error) => {
      console.error(error);
    })
  }

  const ItemView = ({item}) => {
    return (
      <Text style={styles.itemStyle}>
        {item.id}{". "}{item.name}
      </Text>
    )
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilteredData(newData);
      setsearch(text);
    } else {
      setfilteredData(masterData);
      setsearch(text);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          value={search}
          placeholder="search Here"
          underlineColorAndroid="transparent"
          onChangeText={(text) => searchFilter(text)}
        />
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
}

const ItemSeparatorView = () => {
  return (
    <View
      style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  itemStyle: {
    padding: 15
  },
  textInputStyle: {
    height: 60,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: 'blue',
    backgroundColor: 'white'
  }
});

export default App;