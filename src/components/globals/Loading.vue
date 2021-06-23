<template>
  <div class="loading-component" v-if="GET_LOADING">
    <div class="q-pa-md">
      <div class="q-gutter-md row">
        <q-spinner color="primary" size="3em" :thickness="10" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: "Loading",
  computed: {
    ...mapGetters(['GET_LOADING']),
  },
  mounted() {
    console.log('print');
  }
};
</script>

<style lang="scss" scoped>
.loading-component {
  position: fixed;
  z-index: 1;
  margin: auto;
  top: 0;
  left: 0 !important;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading-component:before {
  content: "";
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  width: 100% !important;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
