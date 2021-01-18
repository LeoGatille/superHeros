<template>
<!--  <div>-->
<!--    <h1>{{notification.message}}</h1>-->
<!--  </div>-->
  <div>
    <v-snackbar
        class="stack-snackbar"
        v-model="snackbar"
        :timeout="1500"
        color="success"
        :outlined="isSuccess(notification.type)"
        centered
        bottom
        absolute
    >
      <font-awesome-icon :icon="['fas', icon]"></font-awesome-icon>
      {{ notification.message }}

      <template v-slot:action="{ attrs }">
        <v-btn
            :color="isSuccess() ? 'green darken-1' : 'grey darken-3'"
            class="text--white"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          <font-awesome-icon :icon="['fas', icon]" :style="{color: isSuccess() ? 'white' : 'red'}"></font-awesome-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      snackbar: true
    }
  },
  computed: {
    icon() {
      return this.isSuccess() ? 'check' : 'skull-crossbones';
    }
  },
  methods: {
    isSuccess() {
      return this.notification.type === 'success';
    }
  }
}
</script>

<style scoped>
.stack-snackbar {
  position: relative;
}
</style>