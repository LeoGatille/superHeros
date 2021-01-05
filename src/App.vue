<template>
  <v-app>
    <v-app-bar
        fixed
        prominent
        color="#fcb69f"
        dark
        shrink-on-scroll
        fade-img-on-scroll
        src="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title>Title</v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>Tab 1</v-tab>
          <v-tab>Tab 2</v-tab>
          <v-tab>Tab 3</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <v-sheet
          id="scrolling-techniques-2"
          class="overflow-y-auto"
      >
        <v-container>
          <div style="width: 100%; height: 2000px; background: red"></div>
        </v-container>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
// import NavBar from "@/components/NavBar";

export default {
  name: 'App',

  components: {
    // NavBar,
  },

  data: () => ({
    //
  }),
};
</script>
