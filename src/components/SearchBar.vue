<template>
  <div class="search-bar">
      <font-awesome-icon @click="search()" class="std-icon" :icon="['fas', 'search']" />
    <v-text-field
        v-model="inputValue"
    color="grey"
    dense >
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      inputValue: '',
    }
  },
  methods: {
    search() {
      console.log('value => ', this.inputValue);
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  align-items: center;
  padding: 0 10px;
  background: white;
  border-radius: 30px 30px 30px 30px;
  .std-icon {
    color: grey;
  }
}
</style>