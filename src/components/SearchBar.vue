<template>
  <div class="search-bar" @keyup="onKeuUp()" @keyup.enter="onKeyEnterUp()">
      <font-awesome-icon class="std-icon" :icon="['fas', 'search']" />
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
    onKeyEnterUp() { //! Must be migrated to parent
      this.$emit('validation');
    },
    onKeuUp() {
      this.$emit('keyUp', this.inputValue);
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