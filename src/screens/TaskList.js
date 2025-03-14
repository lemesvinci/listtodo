import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import todayImage from "../../assets/imgs/today.jpg";
import tomorrowImage from "../../assets/imgs/tomorrow.jpg";
import weekImage from "../../assets/imgs/week.jpg";
import monthImage from "../../assets/imgs/month.jpg";
import commonStyles from "../commonStyles";
import moment from "moment";
import axios from "axios";
import "moment/locale/pt-br";
import Task from "../components/Task";
import AddTask from "./AddTask";
import { server, showError } from "../common";

const initialState = {
  showDoneTasks: true,
  showAddTask: false,
  visibleTasks: [],
  tasks: [],
};

export default class TaskList extends Component {
  state = { ...initialState };

  componentDidMount = async () => {
    try {
      const stateString = await AsyncStorage.getItem("tasks");
      if (stateString) {
        const state = JSON.parse(stateString);
        this.setState({ ...state }, this.loadTasks);
      } else {
        this.loadTasks();
      }
    } catch (error) {
      console.log("Erro ao carregar tarefas:", error);
    }
  };

  loadTasks = async () => {
    try {
      const maxDate = moment().add({days: this.props.daysAhead}).format('YYYY-MM-DD 23:59:59')
      const res = await axios.get(`${server}/tasks?date=${maxDate}`);
      this.setState({ tasks: res.data }, this.filterTasks);
    } catch (e) {
      showError(e);
    }
  };

  saveTasks = async () => {
    try {
      await AsyncStorage.setItem(
        "tasks",
        JSON.stringify({
          showDoneTasks: this.state.showDoneTasks,
          tasks: this.state.tasks,
        })
      );
    } catch (error) {
      console.log("Erro ao salvar tarefas:", error);
    }
  };

  toggleFilter = () => {
    this.setState(
      (prevState) => ({ showDoneTasks: !prevState.showDoneTasks }),
      this.filterTasks
    );
  };

  toggleTask = async (taskId) => {
    try {
      await axios.put(`${server}/tasks/${taskId}/toggle`)
      this.loadTasks()
    } catch (e) {
      showError(e);
    }
  };

  addTask = async (newTask) => {
    if (!newTask.desc || !newTask.desc.trim()) {
      Alert.alert("Dados inválidos", "Descrição não informada!");
      return;
    }

    try {
      await axios.post(`${server}/tasks`, {
        desc: newTask.desc,
        estimateAt: newTask.date,
      });
      this.setState({ showAddTask: false }, this.loadTasks);
    } catch (e) {
      showError(e);
    }
  };

  deleteTask = async (id) => {
    try {
      await axios.delete(`${server}/tasks/${id}`);
      this.loadTasks();
    } catch (e) {
      showError(e);
    }
  };

  filterTasks = () => {
    const { showDoneTasks, tasks } = this.state;
    const visibleTasks = showDoneTasks ? tasks : tasks.filter((t) => !t.doneAt);
    if (JSON.stringify(visibleTasks) !== JSON.stringify(this.state.visibleTasks)) {
      this.setState({ visibleTasks });
    }
  };

  getImage = () => {
    switch(this.props.daysAhead) {
      case 0: return todayImage
      case 1: return tomorrowImage
      case 7: return weekImage
      default: return monthImage
    }
  }

  getButtonColor = () => {
    switch(this.props.daysAhead) {
      case 0: return commonStyles.colors.today
      case 1: return commonStyles.colors.tomorrow
      case 7: return commonStyles.colors.week
      default: return commonStyles.colors.month
    }
  }

  render() {
    const today = moment().locale("pt-br").format("ddd, D [de] MMMM");
    return (
      <View style={styles.container}>
        <AddTask
          isVisible={this.state.showAddTask}
          onCancel={() => this.setState({ showAddTask: false })}
          onSave={this.addTask}
        />
        <ImageBackground source={this.getImage()} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon
                name={this.state.showDoneTasks ? "eye" : "eye-slash"}
                size={20}
                color={commonStyles.colors.secondary}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskList}>
          <FlatList
            data={this.state.visibleTasks}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => (
              <Task {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask} />
            )}
          />
        </View>
        <TouchableOpacity
          style={[styles.addButton, {backgroundColor: this.getButtonColor()}]}
          activeOpacity={0.7}
          onPress={() => this.setState({ showAddTask: true })}
        >
          <Icon name="plus" size={20} color={commonStyles.colors.secondary} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3,
  },
  taskList: {
    flex: 7,
  },
  titleBar: {
    flex: 1,
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: "white",
    fontSize: 50,
    marginLeft: 20,
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: "white",
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30,
  },
  iconBar: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: "flex-end",
  },
  addButton: {
    position: "absolute",
    right: 30,
    bottom: 30,
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
