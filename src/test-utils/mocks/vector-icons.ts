const React = require('react');
const { View } = require('react-native');

const Ionicons = () => React.createElement(View, { testID: 'icon' });
Ionicons.loadFont = () => Promise.resolve();

module.exports = { Ionicons, default: Ionicons };
