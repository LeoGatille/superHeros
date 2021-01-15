<template>
  <v-toolbar class="toolbar" dense light :style="{top: this.top + 'px'}">
    <SearchBar
        @validation="launchSearch"
        @keyUp="setRequestedName"
    />
    <v-select
        label="Outlined style"
        dense
        outlined
        :items="limits"
        v-model="limit"
    ></v-select>
    <v-spacer></v-spacer>
    <v-btn
        color="primary"
    >
      {{ $t('btn.edition.apply.text') }}
    </v-btn>
  </v-toolbar>
</template>
<script>
import SearchBar from '@/components/SearchBar';

export default {
  name: "ToolBar",
  data() {
    return {
      scrollEvent: null,
      top: 208,
      lastPageYOffset: 0,
      limit: 20,
      limits: [10, 20, 30, 50, 100],
      // scrollEvent: window.addEventListener('scroll', this.setToolBarTop())
    }
  },
  created() {
    this.scrollEvent = window.addEventListener('scroll', this.handleScroll);
  },
  components: {SearchBar},
  methods: {
    launchSearch(value) {
      this.$store.dispatch('setRequestedName', value);
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
.toolbar {
  padding-top: 20px;
  height: 60px;
  position: fixed;
  width: calc(100% + 10px);
  z-index: 200;
  left: 3px;

}
</style>