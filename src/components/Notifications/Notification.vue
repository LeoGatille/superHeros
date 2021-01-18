<template>
  <!--  <div>-->
  <!--    <h1>{{notification.message}}</h1>-->
  <!--  </div>-->
  <div>
    <v-snackbar
        class="stack-snackbar"
        v-model="snackbar"
        :color="isSuccess() ? 'green darken-1' : 'grey darken-3'"
        :outlined="isSuccess(notification.type)"
        centered
        bottom
        absolute
    >
      <div class="snackbar-content">
        <div class="icon-container">
          <font-awesome-icon class="icon" :icon="['fas', icon]"
                             :style="{color: isSuccess() ? 'green darken-1' : 'grey'}"></font-awesome-icon>
        </div>
        <div>
          {{ notification.message }}
        </div>
      </div>

      <template v-slot:action="{ attrs }">
        <v-btn
            class="text--white"
            text
            v-bind="attrs"
            @click="removeNotification()"
        >
          <font-awesome-icon :icon="['fas', 'times']"></font-awesome-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import {mapActions} from "vuex";

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
      timeout: null,
      snackbar: true
    }
  },
  computed: {
    icon() {
      return this.isSuccess() ? 'check' : 'sad-tear';
    }
  },
  mounted() {
    this.timeout = setTimeout(() => {
      this.removeNotification();
    }, 2000)
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  methods: {
    ...mapActions('notifications', ['remove']),
    isSuccess() {
      return this.notification.type === 'success';
    },
    removeNotification() {
      this.snackbar = false;
      this.remove(this.notification);
    }
  }
}
</script>

<style lang="scss" scoped>
.stack-snackbar {
  position: relative;
}

.snackbar-content {
  display: flex;
  align-items: center;
  height: 100%;

  .icon-container {
    margin-right: 20px;

    svg {
      transform: scale(2);
    }
  }
}
</style>