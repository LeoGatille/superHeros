<template>
  <div class="pagination-container">
    <v-btn icon v-if="currentPage > 3">...</v-btn>
    <span  v-for="index in pagesBeforeCurrentPage" :key="'beforeCurrentPage' + index">
          <v-btn icon  @click="changePage(index)">{{index + 1}}</v-btn>
    </span>

    <v-btn v-if="currentPage < 0 " icon @click="changePage(currentPage - 1)">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </v-btn>
    <v-btn icon color="black" class="current-page">{{currentPage + 1 }}</v-btn>
    <v-btn v-if="currentPage > maxPage" icon @click="changePage(currentPage + 1 )">
      <font-awesome-icon :icon="['fas', 'arrow-right']" />
    </v-btn>

    <span  v-for="index in pagesAfterCurrentPage" :key="'afterCurrentPage' + index">
          <v-btn icon  @click="changePage(index )" >{{index + 1 }}</v-btn>
    </span>
    <v-btn icon v-if="maxPage > currentPage + 3">...</v-btn>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Pagination",
  created() {
  },
  computed: {
    ...mapState(['maxPage']),
    pagesBeforeCurrentPage() {
      const indexBeforeCurrentPage = [];
      let i = this.currentPage - 4;
      while((this.currentPage > 0 ) && (i < this.currentPage - 1 )) {
        i++;
        if(i > -1) {
          indexBeforeCurrentPage.push(i);
        }
      }
      return indexBeforeCurrentPage
    },
    pagesAfterCurrentPage() {
      const indexAfterCurrentPage = [];
      let i = this.currentPage;
      while((this.maxPage > 1) && (i >= this.currentPage) &&( i < this.currentPage + 3) && (this.maxPage > i)) {
        i++;
        indexAfterCurrentPage.push(i);
      }
      return indexAfterCurrentPage
    },
    currentPage() {
      return this.$store.state[`${this.$route.query.listType}Page`]
    }
  },
  methods: {
    changePage(index) {
      this.$emit('changePage', index )
    }
  }
}
</script>

<style scoped>
.pagination-container {
  width: 50%;
  display: flex;
  justify-content: space-around;
  margin: 0 auto;

}

</style>