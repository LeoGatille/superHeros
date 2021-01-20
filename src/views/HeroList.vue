<template>
  <div>
    <ToolBar @setQuery="dispatchChangePage(0)" @changeItemDisplay="setItemsDisplay" :itemsDisplay="itemsDisplay"/>
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
    ...mapState(['loadingList', 'heroList', 'favoriteHeroList', 'pages', 'limit']),
    getList() {
      return this.isFavorite ? this.favoriteHeroList : this.heroList;
    },
    currentPage() {
      return this.pages[this.paginationKey];
    },
    paginationKey() {
    //! Obsolete must be removed without breaking pagination
      return this.isFavorite ? 'favorites' : 'allHeroes';
    },
  },
  created() {
    if(!this.favoriteHeroList.length) {
      this.fetchDashboardHeroes()
          .then(() => {
            if(this.doesHeroListNeedAFetch()) {
              console.log('FETCHING')
              this.fetchAllHeroes();
            }
          })
    } else if(this.doesHeroListNeedAFetch()){
      console.log('FETCHING')
      this.fetchAllHeroes();
    }
  },
  methods: {
    ...mapActions(['changePageIndex', 'setDisplayedList', 'fetchAllHeroes', 'fetchDashboardHeroes']),
    doesHeroListNeedAFetch() {
      return !this.isFavorite && this.heroList.length < this.limit;
    },
    fetchHeroes() {
      this.isFavorite ? this.fetchDashboardHeroes() : this.fetchAllHeroes();
    },
    dispatchChangePage(pageIndex) {
      this.changePageIndex({pageIndex, pageName: this.paginationKey});
      this.fetchHeroes();
    },
    setItemsDisplay(display) {
      this.itemsDisplay = display;
    },
    isItemsDisplay(display) {
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