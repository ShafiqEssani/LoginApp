// import library
import React from 'react';
import { Text, View } from 'react-native';

//create component
const Header = (props) => {
  const { ts, vs } = styles;

  return (
    <View style={vs}>
    <Text style={ts}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  vs: {
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    elevation: 2,
    position: 'relative'
  },
  ts: {
    fontSize: 30
  }
};

//make this component available for other parts of the App
export { Header };
