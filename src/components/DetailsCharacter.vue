<template>
  <div class="container" v-if="episodios && charactersInter">
    <div class="title">{{ GET_CARD_SELECT.name }}</div>
    <div class="box-infor-character">
      <div><img :src="GET_CARD_SELECT.image" class="img-character"/></div>
      <div class="box-data">
        <div>Status: <span class="text-infor">{{ GET_CARD_SELECT.status }}</span></div>
        <div>Gender: <span class="text-infor">{{ GET_CARD_SELECT.gender }}</span></div>
        <div>Origin: <span class="text-infor">{{ GET_CARD_SELECT.origin.name }}</span></div>
        <div>Species: <span class="text-infor">{{ GET_CARD_SELECT.species }}</span></div>
      </div>
    </div>
    <div class="box-principal-episode" v-if="GET_EPISODES.length > 0">
      <div class="title-episodio">Episodios donde apareció</div>
      <div class="box-episode">
          <div class="episode" v-for="(item, index) in GET_EPISODES" :key="index">
        <div class="name-episode">{{ item.name }}</div>
        <div class="date-episode">{{ item.air_date }}</div>
      </div>
      </div>
    </div>
    <div class="">
      <div class="title-episodio">Personajes interesantes</div>
      <div class="">
          <div id="card" class="cards">
      <q-card
        class="my-card card"
        :flat="true"
        v-for="(card, index) in GET_CHARACTER"
        :key="index"
      >
        <img :src="card.image" />

        <q-card-section>
          <div class="text-h6 q-mb-md">{{ card.name }}</div>
          <div class="text-subtitle2">
            Estado: <span class="text-infor">{{ card.status }}</span>
          </div>
          <div class="text-subtitle2">
            Origen: <span class="text-infor">{{ card.origin.name }}</span>
          </div>
        </q-card-section>
      </q-card>
    </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "DetailsCharacter",
  data() {
      return {
          episodios: false,
          charactersInter: false,
      };
  },
  computed: {
    ...mapGetters(["GET_CARD_SELECT", "GET_EPISODES", "GET_CHARACTER"]),
  },
  methods: {
    ...mapActions(["GET_EPISODIOS", "GET_CHARACTERS_INTERESTING"]),
    ...mapMutations(['SET_LOADING']),
  },
  async mounted() {
    const episode = this.GET_CARD_SELECT.episode
      .filter((e, index) => {
        return index < 4;
      })
      .map((item) => {
        return item.replace('https://rickandmortyapi.com/api/episode/', '');
      });
    this.SET_LOADING(true);
    this.episodios = await this.GET_EPISODIOS(episode);

    const request = [];

    for (let i = 0; i < 3; i++) {
        request.push(Math.round(Math.random() * 100));
    }
    this.charactersInter = await this.GET_CHARACTERS_INTERESTING(request);
    this.SET_LOADING(false);
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 30px;
}

.box-infor-character {
  display: block;
  margin-bottom: 50px;
  @media (min-width: 600px) {
    display: flex;
  }
}

.box-data {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: bold;
  font-size: 22px;
  margin-top: 14px;
  
  @media (min-width: 600px) {
    margin-left: 40px;
    font-size: 36px;
    margin-top: 0px;
  }
}

.title-episodio {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 18px;
  @media (min-width: 600px) {
    font-size: 30px;
  }
}

.episode {
  width: 100%;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  text-align: center;
  padding: 10px;
  margin-bottom: 14px;
  @media (min-width: 600px) {
    width: 23%;
  }
}

.box-episode {
    display: block;
    @media (min-width: 600px) {
    display: flex;
    justify-content: space-between;
  }
}

.img-character {
    width: 100%;
    @media (min-width: 600px) {
    width: 220px;
  }
}

.box-principal-episode {
    margin-bottom: 50px;
}

.name-episode {
    font-size: 20px;
    font-weight: bold;
}

.date-episode {
    font-size: 14px;
}

.card {
    cursor: initial;
}
</style>
