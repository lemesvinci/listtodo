import React, { Component } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import commonStyles from "../commonStyles";
import DateTimePicker from "@react-native-community/datetimepicker";  
import moment from "moment";

const initialState = { desc: "", date: new Date() };

export default class extends Component {
  state = {
    ...initialState,
  };

  getDateTimePicker = () => {
    let datePicker = (
      <DateTimePicker
        value={this.state.date}
        onChange={(_, date) => this.setState({ date })}
        mode="date"
        />)
  
      if (Platform.OS === "android") {
        datePicker = (
          <View>
            <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
              <Text style={styles.button}>Data: {moment(this.state.date).format("ddd, D [de] MMMM [de] YYYY")}</Text>
            </TouchableOpacity>
            {this.state.showDatePicker && (
              <DateTimePicker
                value={this.state.date}
                onChange={(_, date) => this.setState({ date, showDatePicker: false })}
                mode="date"
              />
            )}
          </View>
        );
      }
  
      return datePicker;
} 

render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>Nova Tarefa</Text>
          <TextInput
            style={styles.input}
            placeholder="informe a descrição"
            value={this.state.desc}
            onChangeText={(desc) => this.setState({ desc })}
          />
          {this.getDateTimePicker()}
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <TouchableWithoutFeedback onPress={this.props.onCancel}>
                <Text style={styles.button}>Cancelar</Text>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
            <TouchableOpacity>
              <TouchableWithoutFeedback onPress={this.props.onSave}>
                <Text style={styles.button}>Salvar</Text>
              </TouchableWithoutFeedback>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background}></View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  container: {
    backgroundColor: "#FFF",
  },
  header: {
    fontFamily: commonStyles.fontFamily,
    backgroundColor: commonStyles.colors.today,
    color: "#333",
    textAlign: "center",
    padding: 15,
    fontSize: 18,
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    height: 40,
    margin: 15,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 6,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: commonStyles.colors.today,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginLeft: 15,
  },
});
