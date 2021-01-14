<template>
  <v-timeline-item
      :color="color"
  >

    <v-card
        :color="color"
    >
      <div class="header">
        <v-card-title class="title text-white">
          <slot></slot>
        </v-card-title>
        <div class="custom-badge" :style="{color: color}">
          {{ list.length }}
        </div>
      </div>
      <div class="body" v-if="list.length">
        <div class="colored-column" :style="{backgroundColor: color}"></div>
        <v-card-text class="white text--primary">
          <v-container>
            <v-chip-group
                column
            >
              <v-chip
                  :color="color"
                  outlined
                  v-for="item in list"
                  :key="item.name"
              >
                {{ item.name }}
              </v-chip>
            </v-chip-group>
          </v-container>
        </v-card-text>

      </div>
    </v-card>

    <v-divider></v-divider>
  </v-timeline-item>

</template>

<script>
export default {
  name: "TimelineLinkList",
  props: {
    list: {
      type: Array,
    },
    color: {
      type: String,
      default: 'grey',
    }
  }
}
</script>

<style lang="scss" scoped>
.text-white {
  color: white;
}

.header {
  display: flex;
  align-items: center;

  .custom-badge {
    height: max-content;
    min-width: 30px;
    margin-left: 10px;
    padding: 5px;
    font-weight: bold;
    text-align: center;
    border-radius: 15px;
    background-color: white;
  }
}
.body {
  display: flex;
}
  .colored-column {
    width: 5px;
    height: 100px;
  }
</style>