<template>
    <v-toolbar dense light>
      <SearchBar @validation="launchSearch"
                 @keyUp="setRequestedName"/>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
</template>

<script>
import SearchBar from '@/components/SearchBar';

export default {
  name: "ToolBar",
  components: {SearchBar},
  methods: {
    launchSearch(value) {
      this.$store.dispatch('setRequestedName', value);
    },
    setRequestedName() {
      this.$store.dispatch('fetchIn' + this.$route.query.listType)
    }
  }
}
</script>

<style scoped>

</style>