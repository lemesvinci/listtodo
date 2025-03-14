import { Alert, Platform } from "react-native";

const server =
  Platform.OS === "ios"
    ? "http://192.168.0.104:3001"
    : "http://192.168.0.104:3001";

function showError(err) {
  let msg = "Erro desconhecido!";

  if (err.response) {
    if (err.response.data) {
      msg =
        typeof err.response.data === "string"
          ? err.response.data
          : JSON.stringify(err.response.data, null, 2);
    } else {
      msg = `Erro ${err.response.status}: ${err.response.statusText}`;
    }
  } else if (err.message) {

    msg = err.message;
  }

  Alert.alert("Ops! Ocorreu um Problema!", msg);
}

function showSuccess(msg) {
  Alert.alert("Sucesso!", msg);
}

export { server, showError, showSuccess };