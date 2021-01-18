export const namespaced = true

export const state = {
    notifications: [],
}
let nextId = 1;
export const mutations = {
    PUSH(state, notification) {
      state.notifications.push({
          ...notification,
          id: nextId++,
      });
    console.log('ADD NOTIF => ' + notification.type, state.notifications);
    },
    DELETE(state, notificationToRemove) {
      state.notifications = state.notifications.filter(notification => {
          return notification.id !== notificationToRemove.id;
      });
        console.log('REMOVE NOTIF => ', state.notifications);
    },
}
export const actions = {
    add({commit}, notification) {
        commit('PUSH', notification);
    },
    remove({commit}, notification) {
        commit('DELETE', notification)
    },
}