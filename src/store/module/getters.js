export default {
    GET_RETURN_CHARACTER(state) {
        return state.characters;
    },
    GET_RETURN_STATUS_FILTER(state) {
        return state.statusFilter;
    },
    GET_RETURN_ORIGIN_FILTER(state) {
        return state.originFilter;
    },
    GET_CARD_SELECT(state) {
        return state.cardSelect;
    },
    GET_EPISODES(state) {
        return state.episodeResponse;
    },
    GET_CHARACTER(state) {
        return state.characterInteresting;
    },
    GET_LAST_STEP(state) {
        return state.step;
    },
    GET_LOADING(state) {
        return state.loading;
    },
    GET_CURRENT(state) {
        return state.current;
    },
};