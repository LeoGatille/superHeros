<template>
  <div>
    <ToolBar @setQuery="dispatchChangePage(0)" @changeItemDisplay="setItemsDisplay" :itemsDisplay="itemsDisplay"/>
    <template v-if="!loadingList">
      <div v-if="isItemsDisplay('card')" class="card-list">
        <HeroCard v-for="hero in (isFavorite ? favoriteHeroList : heroList)" :key="hero.name" :hero="hero"/>
      </div>
      <div v-if="isItemsDisplay('row')" class="row-list">
        <h2 v-for="hero in (isFavorite ? favoriteHeroList : heroList)" :key="hero.name">{{hero.name}}</h2>
      </div>
      <Pagination :current-page="currentPage" @changePage="dispatchChangePage"/>
    </template>
    <template v-else>
      <div>LOADING</div>
    </template>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import HeroCard from "@/components/HeroCard";
import Pagination from "@/components/Pagination";
import ToolBar from "@/components/ToolBar";

export default {
  name: "HeroList",
  props: {
    isFavorite: {type: Boolean, default: false}
  },
  components: {
    Pagination,
    HeroCard,
    ToolBar
  },
  data() {
    return {
      itemsDisplay: 'card',
    }
  },
  computed: {
    ...mapState(['loadingList', 'heroList', 'favoriteHeroList', 'pages']),
    currentPage() {
      return this.pages[this.currentList];
    },
    currentList() {
      return this.isFavorite ? 'dashboardHeroes' : 'allHeroes';
    },
  },
  created() {
    this.fetchHeroes();
  },
  methods: {
    ...mapActions(['changePageIndex', 'setDisplayedList', 'fetchAllHeroes', 'fetchDashboardHeroes']),
    fetchHeroes() {
      this.isFavorite ? this.fetchDashboardHeroes() : this.fetchAllHeroes();
    },
    dispatchChangePage(pageIndex) {
      this.changePageIndex({pageIndex, pageName: this.currentList});
      this.fetchHeroes();
    },
    setItemsDisplay(display) {
      this.itemsDisplay = display;
      console.log('hero list display => ', this.itemsDisplay)
    },
    isItemsDisplay(display) {
      console.log(this.itemsDisplay === display)
      return this.itemsDisplay === display;
    }
  }
}
</script>

<style scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  padding-top: 50px;
  justify-content: space-around;
}

.pagination {
  color: grey;
}

.current-page {
  font-weight: bold;
  color: black;
}

</style>