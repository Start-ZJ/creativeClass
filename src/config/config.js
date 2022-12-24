import store from "./../redux/store";

const reduxState = store.getState();
const config = {
    port: 'http://127.0.0.1:7002',
    isuse: true,
    getUser: () => {
        return reduxState.UserState.userParams[0]
    }
}
export default config;