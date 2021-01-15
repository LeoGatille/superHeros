<template>
  <div>
    <ToolBar @setQuery="dispatchChangePage(0)" @changeItemDisplay="setItemsDisplay" :itemsDisplay="itemsDisplay"/>
    <template v-if="!loadingList">
      <div v-if="isItemsDisplay('card')" class="list card-list">
        <HeroCard v-for="hero in (isFavorite ? favoriteHeroList : heroList)" :key="hero.name" :hero="hero"/>
      </div>
      <div v-if="isItemsDisplay('row')" class="list row-list">
        <HeroRowList :hero-list="this.heroList"/>
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
  justify-content: space-around;
}
.list {
  padding-top: 50px;

}

.pagination {
  color: grey;
}

.current-page {
  font-weight: bold;
  color: black;
}

</style>