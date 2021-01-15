<template>
  <v-form>
    <div class="search-bar" @keyup="onKeuUp()" @keyup.enter="onKeyEnterUp()">
        <font-awesome-icon class="std-icon" :icon="['fas', 'search']" />
      <v-text-field
          class="text-field"
          full-width
          v-model="inputValue"
          :placeholder="$t('searchBar.placeholder')"
      color="grey"
      dense >
      </v-text-field>
    </div>
  </v-form>
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

  .std-icon {
    color: grey;
  }
}
</style>