<template>

  <v-dialog
      v-model="dialogValue"
      transition="dialog-bottom-transition"
      max-width="90%"
  >
    <template v-slot:activator="{on, attrs}">
      <v-btn
          width="100%"
          :class="{'big-btn' : bigBtn, 'small-btn' : ! bigBtn }"
          color="primary"
          v-bind="attrs"
          v-on="on"
          @click="openDialog()"
      >
        <slot name="button"></slot>
      </v-btn>
    </template>
    <template v-slot:default>
      <div class="dialog-container">
        <header>
          <div class="overlay-soft">
            <v-container fluid>
              <slot name="title"></slot>
            </v-container>
          </div>
        </header>
        <v-container fluid v-if="dialogValue">
          <slot name="content"></slot>
        </v-container>
      </div>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: "Dialog.vue",
  props: {
    dialogValue: {
      type: Boolean,
      required: true
    },
    bigBtn: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    openDialog() {
      this.$emit('open')
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-container {
  background-color: white;

  header {
    height: 50px;
    background-image: url('../../../public/all_heroes.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    .overlay-soft {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
    }
  }

}
</style>