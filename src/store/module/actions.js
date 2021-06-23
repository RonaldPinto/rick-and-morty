import services from "../../services/index";

export default {
  async GET_INFORMATION_START(context) {
    try {
      const response = await services.getCharacter();
      if (response?.results) {
        const status = response.results.map((e) => {
          return e.status;
        });
        const origin = response.results.map((e) => {
          return e.origin.name;
        });

        const newStatus = [...new Set(status)];
        const newOrigin = [...new Set(origin)];

        const responseFinal = {
          origin: newOrigin,
          status: newStatus,
          response: response.results,
        };

        context.commit("SET_RESULT_PAGE_INITIAL", responseFinal);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async GET_SEARCH_CHARACTER(context, text) {
    try {
      const response = await services.getSearch(text);

      if (response?.results) {
        context.commit("SET_RESULT_SEARCH", response.results);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async GET_FILTER_INFORMATION_STATUS(context, text) {
    try {
      const response = await services.getFilter(text);

      if (response?.results) {
        context.commit("SET_RESULT_SEARCH", response.results);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async GET_FILTER_INFORMATION_ORIGIN(context, text) {
    try {
      const response = await services.getFilter(text);
      if (response?.results) {
        context.commit("SET_RESULT_SEARCH", response.results);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async GET_PAGINATION(context, page) {
    try {
      const response = await services.getPaginate(page);
      if (response?.results) {
        context.commit("SET_RESULT_SEARCH", response.results);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async GET_EPISODIOS(context, page) {
    try {
      const response = await services.getEpisode(page.toString());
      if (response) {
        context.commit("SET_EPISODE_RESPONSE", response);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async GET_CHARACTERS_INTERESTING(context, id) {
    try {
      const response = await services.getCharacterInteresting(id.toString());
      if (response) {
        context.commit("SET_CHARACTER_INTERESTING", response);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
