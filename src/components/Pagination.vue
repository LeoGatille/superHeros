<template>
  <div class="pagination-container">
  <span v-show="(currentPage ) > 3 ">
      <v-btn
          icon
          @click="changePage(0)"
      >
        {{ 1 }}
      </v-btn>
      <v-btn
          disabled
          icon
      >
    ...
  </v-btn>
    </span>
    <span
        v-for="(index, i) in 3"
        :key="'beforeCurrentPage' + index"
    >
          <v-btn
              v- v-if="((i - 3) + (currentPage + 1)) > 0"
              icon
              @click="changePage((i - 3) + (currentPage))"
          >
            {{ (i - 3) + (currentPage + 1) }}
          </v-btn>
    </span>

    <v-btn
        icon
        color="black"
        class="current-page"
    >
      {{ currentPage + 1 }}
    </v-btn>

    <span v-for="(index, i) in 3" :key="'afterCurrentPage' + index">
        <v-btn
            v-if="((maxPage - currentPage) > (i + 1))"
            icon
            @click="changePage(currentPage + (i + 1))"
        >
          {{ (currentPage + i) + 2 }}
        </v-btn>
    </span>

    <span v-show="maxPage > (currentPage + 3)">
      <v-btn
          disabled
          icon
      >
        ...
      </v-btn>
      <v-btn
          icon
          @click="changePage(maxPage - 1)"
      >
        {{ maxPage }}
      </v-btn>
    </span>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Pagination",
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState(['maxPage']),
  },
  methods: {
    changePage(index) {
      this.$emit('changePage', index)
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