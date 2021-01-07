<template>
  <div>
    <span v-if="currentPage > 3">...</span>
    <span v-for="index in maxPage" :key="'beforeCurrentPage' + index">
          <span  @click="changePage(index)" v-if="index < currentPage && index > currentPage - 4">{{index + 1}}</span>
    </span>

    <span @click="changePage(currentPage - 1)">&lt;</span>
    <span class="current-page">{{currentPage + 1 }}</span>
    <span @click="changePage(currentPage + 1 )">&gt;</span>

    <span v-for="index in maxPage" :key="'afterCurrentPage' + index">
          <span  @click="changePage(index )"  v-if="index > currentPage && index < currentPage + 4">{{index + 1 }}</span>
    </span>
    <span v-if="maxPage > currentPage + 3">...</span>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Pagination",
  created() {
    console.log('props CurrentPage => ', this.currentPage)
  },
  computed: {
    ...mapState(['maxPage']),
    currentPage() {
      return this.$store.state[`${this.$route.query.listType}Page`]
    }
  },
  methods: {
    changePage(index) {
      console.log('where is my brain ? => ', index)
      this.$emit('changePage', index )
    }
  }
}
</script>

<style scoped>

</style>