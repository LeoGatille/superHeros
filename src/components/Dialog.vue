<template>
  <div class="dialog-container">
    <header>
      <div class="overlay-soft"></div>
    </header>
    <v-container fluid>
      <slot></slot>
      <v-btn @click="close()">close</v-btn>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Dialog.vue",
  props: {
    dialog: {
      type: Object,
      required: true
    }
  },
  methods: {
    close() {
      this.dialog.value = false;
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialog-container {
    background-color: white;
    header {
      height: 50px;
      background-image: url('../../public/all_heroes.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      .overlay-soft {
        width: 100%;
        height: 100%;
        background-color: white;
        opacity: .5;
      }
    }
  }
</style>