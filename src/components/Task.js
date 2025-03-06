import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import commonStyles from "../commonStyles";
import moment from "moment";
import 'moment/locale/pt-br'
import { TouchableWithoutFeedback } from "react-native";

export default (props) => {

    const doneOrNotStyle = props.doneAt != null ? { textDecorationLine: "line-through" } : {};
    const formattedDate = moment(date).locale('pt-br').format("ddd, D [de] MMMM")
    const date = props.estimateAt ? props.estimateAt : props.doneAt;

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
                <View style={styles.checkContainer}>{getCheckView(props.doneAt)}</View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                <Text style={styles.date}>{formattedDate}</Text>
            </View>
        </View>
    );
};

function getCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={styles.done}>
                <Icon name="check" size={16} color="#FFF" />
            </View>
        );
    } else {
        return (
            <View style={styles.pending}>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderColor: "#AAA",
        borderBottomWidth: 1,
        alignItems: "center",
        paddingVertical: 10,
    },
    checkContainer: {
        width: "20%",
        alignItems: "center",
        justifyContent: "center",
    },
    pending: {
        borderColor: "#555",
        borderWidth: 1,
        width: 25,
        height: 25,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
    },
    done: {
        backgroundColor: "#4D7031",
        width: 25,
        height: 25,
        borderRadius: 13,
        alignItems: "center",
        justifyContent: "center",
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15,
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12,        
    },
});
