<template>
  <v-app>
    <NavBar/>
    <v-main>
      <v-sheet
          id="scrolling-techniques-2"
          class="overflow-y-auto"
      >
        <v-container>
          <div style="width: 100%; height: 2000px; background: royalblue">

          </div>
        </v-container>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import NavBar from "@/components/NavBar";

export default {
  name: 'App',

  components: {
    NavBar,
  },

  data: () => ({
    //
  }),
};
</script>
