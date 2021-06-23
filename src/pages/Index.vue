<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <Loading />
        <Title />
        <div v-if="statusInfor">
          <router-view />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue';
import Title from '../components/globals/Title.vue';
import Loading from '../components/globals/Loading.vue';
import { mapActions, mapMutations, mapState } from 'vuex';

export default defineComponent({
  name: 'PageIndex',
  components: {
    Title,
    Loading,
  },
  data() {
    return {
      statusInfor: false,
    }
  },
  computed: {
    ...mapState(['characters']),
  },
  methods: {
    ...mapMutations(['SET_LOADING']),
    ...mapActions(['GET_INFORMATION_START']),
  },
  async mounted() {
    this.SET_LOADING(true);
    this.statusInfor = await this.GET_INFORMATION_START();
    this.SET_LOADING(false);
  },
})
</script>
