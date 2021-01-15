<template>
  <v-toolbar
      class="custom-toolbar"
      dense
      light
      style="height: 60px"
      :style="{top: this.top + 'px'}"
  >
    <!--    <div style="height: 100%">-->
    <!--        <SearchBar-->
    <!--            @validation="launchSearch"-->
    <!--            @keyUp="setRequestedName"-->
    <!--        />-->
    <!--    </div>-->
    <!--    <div style="width: 50px; height: 100%">-->
    <!--        <v-select-->
    <!--            dense-->
    <!--            :items="limits"-->
    <!--            v-model="limit"-->
    <!--        ></v-select>-->

    <!--    </div>-->

    <div class="search-bar input-container">
      <v-text-field
          :placeholder="$t('searchBar.placeholder')"
          prepend-icon="mdi-magnify"
          single-line
          v-model="searchValue"
      ></v-text-field>

    </div>
    <div class="select input-container">
      <v-select
          label="limit"
          :items="limits"
          v-model="limit"
      ></v-select>

    </div>

    <v-spacer></v-spacer>
    <div>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              fab
              dark
              small
              color="primary"
              v-bind="attrs"
              v-on="on"
              @click="search()"
          >
            <font-awesome-icon
                style="color: white"
                :icon="['fas', 'search']"
            ></font-awesome-icon>
          </v-btn>

        </template>
        <span>{{ $t('btn.edition.apply.text') }}</span>
      </v-tooltip>

    </div>
  </v-toolbar>
</template>
<script>
// import SearchBar from '@/components/SearchBar';

import {mapActions} from "vuex";

export default {
  name: "ToolBar",
  // components: {SearchBar},
  data() {
    return {
      scrollEvent: null,
      top: 208,
      lastPageYOffset: 0,
      searchValue: '',
      limit: 20,
      limits: [10, 20, 30, 50, 100],
    }
  },
  created() {
    this.scrollEvent = window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    ...mapActions(['setQuery']),
    search() {
      this.setQuery({searchValue: this.searchValue, limit: this.limit});
      this.$emit('setQuery')
    },
    setRequestedName() {
      this.$store.dispatch('fetchIn' + this.$route.query.listType)
    },
    handleScroll() {
      if ((window.pageYOffset <= 100)) {
        this.top -= 5;
        // this.top =  this.lastPageYOffset < window.pageYOffset ?  this.top - (this.top - window.pageYOffset) : this.top + (this.top + window.pageYOffset);
        if (window.pageYOffset === 0) {
          this.top = 208;
        }
      } else {
        this.top = 104;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-toolbar__content {
  height: 100%;
}

.custom-toolbar {
  align-items: center;
  padding-top: 5px;
  height: 60px;
  position: fixed;
  width: 450px;
  z-index: 200;
  left: 3px;

  .input-container {
    margin-right: 50px;
    padding-top: 25px;
  }

  .search-bar {

  }

  .select {
    width: 50px;
  }

}
</style>