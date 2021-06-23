export default {
    SET_LOADING(state, open) {
        state.loading = open;
    },
    SET_RESULT_PAGE_INITIAL(state, payload) {
        state.characters = payload.response;
        state.statusFilter = payload.status;
        state.originFilter = payload.origin;
    },
    SET_RESULT_SEARCH(state, payload) {
        state.characters = payload;
    },
    SET_CARDS_SELECT(state, payload) {
        state.cardSelect = payload;
    },
    SET_EPISODE_RESPONSE(state, payload) {
        if (Array.isArray(payload)) {
           state.episodeResponse = payload;
        } else {
            state.episodeResponse = [];
            state.episodeResponse.push(payload);
        }
        
    },
    SET_CHARACTER_INTERESTING(state, payload) {
        state.characterInteresting = payload
    },
    SET_STEP(state, payload) {
        state.step = payload;
    },
    SET_CURRENT(state, payload) {
        state.current = payload;
    },
};
