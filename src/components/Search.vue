<template>
  <div class="container">
    <div class="">
      <q-input
        square
        outlined
        v-model="searchtext"
        label="Buscar..."
        @keyup="searchCharacter"
      />
    </div>
    <div class="box-filter">
      <div class="q-mr-md">Filtrar por:</div>
      <div id="status" class="q-mr-md">
        <q-btn-dropdown
          label="Status"
          :unelevated="true"
          no-caps
        >
          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="onItemStatusClick(item)"
              v-for="(item, index) in GET_RETURN_STATUS_FILTER"
              :key="index"
            >
              <q-item-section>
                <q-item-label>{{ item }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
      <div id="origin">
        <q-btn-dropdown
          label="Origin"
          :unelevated="true"
          no-caps
        >
          <q-list>
            <q-item
              clickable
              v-close-popup
              @click="onItemOriginClick(item)"
              v-for="(item, index) in GET_RETURN_ORIGIN_FILTER"
              :key="index"
              v-model="originText"
            >
              <q-item-section>
                <q-item-label>{{ item }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </div>
    </div>
    <div id="card" class="cards">
      <q-card
        class="my-card card"
        :flat="true"
        v-for="(card, index) in GET_RETURN_CHARACTER"
        :key="index"
        @click="handlerDetails(card)"
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
      <div class="card-empty"></div>
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination @click="handlerClick" v-model="current" :max="5" color="grey-5" text-color="dark"/>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "Search",
  data() {
    return {
      searchtext: "",
      current: ref(1),
      originText: "",
      statusFilters: false,
    };
  },
  computed: {
    ...mapGetters([
      "GET_RETURN_CHARACTER",
      "GET_RETURN_STATUS_FILTER",
      "GET_RETURN_ORIGIN_FILTER",
      "GET_CURRENT",
    ]),
  },
  methods: {
    ...mapActions(["GET_INFORMATION_START", "GET_SEARCH_CHARACTER", "GET_FILTER_INFORMATION_STATUS", "GET_FILTER_INFORMATION_ORIGIN", "GET_PAGINATION"]),
    ...mapMutations(["SET_LOADING", "SET_CARDS_SELECT", "SET_STEP", "SET_CURRENT"]),
    async onItemStatusClick(value) {

      const request = {
        status: value,
        origin: '',
      }
      this.SET_LOADING(true);
      this.statusFilters = await this.GET_FILTER_INFORMATION_STATUS(request);
      this.SET_LOADING(false);
    },
    async onItemOriginClick(value) {

      const request = {
        status: '',
        origin: value,
      }
      this.SET_LOADING(true);
      this.statusFilters = await this.GET_FILTER_INFORMATION_ORIGIN(request);
      this.SET_LOADING(false);
    },
    async searchCharacter() {
      this.statusInfor = await this.GET_SEARCH_CHARACTER(this.searchtext);
    },
    async handlerClick() {

      this.SET_CURRENT(this.current);
      this.SET_LOADING(true);
      this.statusInfor = await this.GET_PAGINATION(this.current);
      this.SET_LOADING(false);
    },
    async handlerDetails(value) {
      this.searchtext = '';
      this.SET_CARDS_SELECT(value);
      this.SET_STEP(2);
      this.$router.push({ name: 'CardSelect' });
    }
  },
  mounted() {
    this.SET_STEP(1);
    this.current = this.GET_CURRENT;
  },
};
</script>

<style lang="scss" scoped>
.box-filter {
  display: flex;
  margin: 50px 0px;
  align-items: center;
}

.q-btn:before {
  border: 1px solid #e5e5e5;
}


.card-empty {
  width: 27%;
  margin-bottom: 60px;
}

.q-card img {
  height: 55%;
  object-fit: cover;
}
</style>
