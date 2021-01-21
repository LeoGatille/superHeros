<template>
  <div>
    <ToolBar @setQuery="dispatchChangePage(0)" @changeItemDisplay="changeHeroDisplay" :itemsDisplay="heroesDisplay"/>
    <template v-if="!loadingList">
      <div v-if="isItemsDisplay('card')" class="list card-list">
        <HeroCard v-for="hero in getList" :key="hero.name" :hero="hero"/>
      </div>
      <div v-if="isItemsDisplay('row')" class="list row-list">
        <HeroRowList :hero-list="getList"/>
      </div>
      <Pagination :current-page="currentPage" @changePage="dispatchChangePage"/>
    </template>
    <template v-else>
      <div
          style="display: flex; flex-wrap: wrap"
          v-if="isItemsDisplay('card')">
        <v-skeleton-loader
            style="margin: 10px"
            v-for="index in 12"
            :key="index"
            class="mx-auto"
            width="300"
            type="card"
        ></v-skeleton-loader>
      </div>
      <div v-else>

        <v-skeleton-loader
            style="margin: 10px"
            class="mx-auto"
            :width="'100%'"
            type="table-thead"
        ></v-skeleton-loader>
        <v-skeleton-loader
            style="margin: 10px"
            class="mx-auto"
            :width="'100%'"
            type="table-tbody"
        ></v-skeleton-loader>
        <v-skeleton-loader
            style="margin: 10px"
            class="mx-auto"
            :width="'100%'"
            type="table-tbody"
        ></v-skeleton-loader>
        <v-skeleton-loader
            style="margin: 10px"
            class="mx-auto"
            :width="'100%'"
            type="table-tfoot"
        ></v-skeleton-loader>
      </div>

    </template>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import HeroCard from "@/components/HeroCard";
import Pagination from "@/components/Pagination";
import ToolBar from "@/components/ToolBar";
import HeroRowList from "@/components/HeroRowList";

export default {
  name: "HeroList",
  props: {
    isFavorite: {type: Boolean, default: false}
  },
  components: {
    HeroRowList,
    Pagination,
    HeroCard,
    ToolBar
  },
  computed: {
    ...mapState(['heroesDisplay', 'loadingList', 'heroList', 'favoriteHeroList', 'filteredFavoriteHeroList', 'pages', 'limit', 'searchValue', 'orderBy', "totalItems"]),
    getList() {
      return this.isFavorite ? this.filteredFavoriteHeroList : this.heroList;
    },
    currentPage() {
      return this.pages[this.paginationKey];
    },
    paginationKey() {
      return this.isFavorite ? 'favorites' : 'allHeroes';
    },
  },
  created() {
    if (!this.favoriteHeroList.length) {
      this.fetchDashboardHeroes()
          .then(() => {
            if (this.doesHeroListNeedAFetch()) {
              this.fetchAllHeroes();
            }
          })
    } else if (this.doesHeroListNeedAFetch()) {
      this.fetchAllHeroes();
    }
    this.setMaxPage(this.isFavorite ? this.favoriteHeroList.length : this.totalItems)
  },
  methods: {
    ...mapActions(['changePageIndex', 'fetchAllHeroes', 'fetchDashboardHeroes', 'setHeroesDisplay', 'filterFavoriteHeroList', "setMaxPage"]),
    doesHeroListNeedAFetch() {
      return !this.isFavorite && this.heroList.length < this.limit;
    },
    fetchHeroes() {
      this.isFavorite ? this.filterFavoriteHeroList() : this.fetchAllHeroes();
    },
    dispatchChangePage(pageIndex) {
      this.changePageIndex({pageIndex, pageName: this.paginationKey});
      this.fetchHeroes();
    },
    isItemsDisplay(display) {
      return this.heroesDisplay === display;
    },
    changeHeroDisplay(display) {
      this.setHeroesDisplay(display)
    }
  }
}
</script>

<style scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.list {
  padding-top: 50px;

}

</style>