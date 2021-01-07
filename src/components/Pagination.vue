<template>
  <div>
    <span v-if="currentPage > 3">...</span>
    <span v-for="index in maxPage" :key="'beforeCurrentPage' + index">
          <span v-if="index < currentPage && index > currentPage - 4">{{index}}</span>
    </span>

    <span @click="previousPage()">&lt;</span>
    <span class="current-page">{{currentPage}}</span>
    <span @click="nextPage()">&gt;</span>

    <span v-for="index in maxPage" :key="'afterCurrentPage' + index">
          <span v-if="index > currentPage && index < currentPage + 4">{{index}}</span>
    </span>
    <span v-if="maxPage > currentPage + 3">...</span>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Pagination",
  computed: {
    ...mapState(['currentPage', 'maxPage'])
  },
  methods: {
    previousPage() {
      this.$store.dispatch('goToPreviousPage');
    },
    nextPage() {
      this.$store.dispatch('goToNextPage');
    }
  }
}
</script>

<style scoped>

</style>