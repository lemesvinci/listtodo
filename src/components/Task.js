import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import commonStyles from "../commonStyles";
import { Swipeable } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import moment from "moment";
import "moment/locale/pt-br";
import { TouchableWithoutFeedback } from "react-native";

export default (props) => {
    const doneOrNotStyle = props.doneAt ? { textDecorationLine: "line-through" } : {};
    
    
    const date = props.estimateAt ? props.estimateAt : props.doneAt;
    const formattedDate = date ? moment(date).locale("pt-br").format("ddd, D [de] MMMM") : "";

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.rightAction} onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name="trash" size={30} color="#FFF" />
            </TouchableOpacity>
        );
    };

    const getLeftContent = () => {
        return (
            <View style={styles.leftAction}>
                <Icon name="trash" size={20} color="#FFF" style={styles.excludeIcon} />
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        );
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Swipeable
                renderRightActions={getRightContent}
                renderLeftActions={getLeftContent}
                onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}
            >
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
                        <View style={styles.checkContainer}>{getCheckView(props.doneAt)}</View>
                    </TouchableWithoutFeedback>
                    <View>
                        <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                        <Text style={styles.date}>{formattedDate}</Text>
                    </View>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    );
};

function getCheckView(doneAt) {
    if (doneAt) {
        return (
            <View style={styles.done}>
                <Icon name="check" size={16} color="#FFF" />
            </View>
        );
    } else {
        return <View style={styles.pending} />;
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderColor: "#AAA",
        borderBottomWidth: 1,
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: "#FFF",
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
    rightAction: {
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        height: "100%",
    },
    leftAction: {
        backgroundColor: "red",
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: "#FFF",
        fontSize: 20,
        margin: 10,
    },
    excludeIcon: {
        marginLeft: 10,
    },
});
