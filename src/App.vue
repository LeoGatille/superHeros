<template>
  <v-app>
    <NavBar/>
    <v-main>
      <v-sheet
          id="scrolling-techniques-2"
          class="overflow-y-auto"
      >
        <v-container fluid>
          <div style="width: 100%; height: 2000px; background: royalblue">
            <LangSelector/>
            <Hellow18n/>
          </div>
        </v-container>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
import LangSelector from "@/components/LangSelector";
import Hellow18n from  "@/components/HelloI18n";
export default {
  name: 'App',

  components: {
    NavBar,
    LangSelector,
    Hellow18n
  },

  data: () => ({
    //
  }),
};
</script>
