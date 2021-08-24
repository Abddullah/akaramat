import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView, Image, Modal, Alert, TouchableOpacity } from 'react-native';
import ImageBrowser from './ImageBrowser';

export default class ImagePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageBrowserOpen: false,
      photos: []
    }
  }

  // call all props
  renderUri(uri){
    const {onImage} = this.props;
    onImage(uri);
  }

  imageBrowserCallback = (callback) => {
    callback.then((photos) => {
      this.renderUri(photos[0].uri)

      this.setState({
        imageBrowserOpen: false,
        photos
      })
    }).catch((e) => console.log(e))
  }

  renderImage(item, i) {
    console.log(item,i,"imagePicker")
    return (
      <Image
        style={{ height: 100, width: 100 }}
        source={{ uri: item.file }}
        key={i}
      />
    )
  }
  render() {
    if (this.state.imageBrowserOpen) {
      return (
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.imageBrowserOpen}
          >

            <ImageBrowser max={1} callback={this.imageBrowserCallback} />
          </Modal>
        </View>
      )
    }

    return (
      <View >
        <TouchableOpacity style={{
          justifyContent: "center", alignItems: "center",
          height: "100%", width: "80%",
          backgroundColor: "#33CD5F",
          borderWidth: 0.75,
          borderColor: '#33CD5F'
        }}
          onPress={() => this.setState({ imageBrowserOpen: true })}
        >
          <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Upload Photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});