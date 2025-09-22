import { Provider } from "react-redux";
import store from "./redux/store.js";
import { Confirmation, Notification } from "./components/Alert.jsx";
import Topbar from "./components/Topbar.jsx";
import Container from "./components/Container.jsx";

function App() {
  return (
    <>
      <Provider store={store}>
        <Topbar />
        <Container />
        <Notification />
        <Confirmation />
      </Provider>
    </>
  );
}

export default App;
