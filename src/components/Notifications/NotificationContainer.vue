<template>
  <div class="notifications-container">
    <div v-for="notification in notifications"
         :key="notification.id">
      <Notification
          :notification="notification"/>
    </div>
  </div>
</template>

<script>
import Notification from "@/components/Notifications/Notification";
import {mapState} from "vuex";

export default {
  name: "NotificationContainer",
  components: {Notification},
  computed: {
    ...mapState('notifications', ['notifications'])
  },
}
</script>

<style scoped>
.notifications-container {
  display: flex;
  flex-direction: column-reverse;
  justify-items: flex-start;
  width: 400px;
  height: max-content;
  position: fixed;
  z-index: 99999;
  right: 15px;
}
</style>