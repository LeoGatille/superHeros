<template>
  <div>
    <template v-if="!loading">
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-img :src="setImgURL"></v-img>
          </v-col>
          <v-col cols="6">
            <div>
              <h1>{{hero.name}}</h1>
              <p>{{hero.description}}</p>
            </div>
          </v-col>
          <v-col cols="1"></v-col>
          <v-col cols="1">
            <div>
              <div class="action-btn-container">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        fab
                        class="mx-2"
                        v-bind="attrs"
                        v-on="on"
                        icon
                        large
                        dark
                        @click="onStarClick()"
                    >
                      <font-awesome-icon :icon="['fas', 'star']" :style="{'color': registeredHero ? '#ffbd00': 'grey'}"></font-awesome-icon>
                    </v-btn>

                  </template>
                  <span v-if="!registeredHero">{{$t('tooltip.btn.add')}}</span>
                  <span v-else>{{$t('tooltip.btn.remove')}}</span>
                </v-tooltip>
              </div>
              <v-tooltip bottom>
                <template v-slot:activator="{on, attrs}">
                  <v-btn
                      depressed
                      v-bind="attrs"
                      v-on="on"
                      color="green"
                      @click="editHero()"
                  >
                    {{editBtnText}}
                  </v-btn>
                </template>
                <span>{{editBtnTooltip}}</span>
              </v-tooltip>


              <v-dialog
                  transition="dialog-bottom-transition"
                  max-width="90%"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                  >Edition</v-btn>
                </template>

                <template v-slot:default="dialog">
                  <Dialog :dialog="dialog">
                    <HeroEditionForm :hero="hero"/>
                  </Dialog>
                </template>
              </v-dialog>

            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<script>
import LocalService from "@/api/services/LocalService";
import marvelService from "@/api/services/marvelAPI/marvelService";
import HeroEditionForm from '@/components/HeroEditionForm';
import Dialog from '@/components/Dialog';
import {mapActions, mapGetters} from "vuex";

export default {
  name: "HeroDetail",
  components: {
    HeroEditionForm,
    Dialog,
  },
  props: ['heroId'],
  data() {
    return {
      loading: true,
      registeredHero: false,
      hero: {},
    }
  },
  computed: {
    ...mapGetters(['getHeroBydId']),
    parseIntId() {
      return parseInt(this.heroId)
    },
    setImgURL() {
      return this.hero.thumbnail ?  (this.hero.thumbnail.path + '.' + this.hero.thumbnail.extension) : '';
    },
    editBtnText() {
      return this.$t(`btn.edition.set.text`)
    },
    editBtnTooltip() {
      return this.$t(`btn.edition.set.tooltip`)
    },
  },
  created() {
      LocalService.getOneLocalStorageHero(this.parseIntId)
          .then(hero => {
            this.hero = hero;
            console.log('local => ', this.hero)
            this.registeredHero = true;
          })
          .catch(() => {
            if (this.getHeroBydId(this.parseIntId)) {
              this.hero = this.getHeroBydId(this.parseIntId);
            } else {
            marvelService.getHeroById(this.parseIntId)
              .then(res => {
                this.hero = res.data.data.results[0];
                console.log('API => ', this.hero)
              })
            }
          })
          .finally(() => {
                this.loading = false;
          })
  },
  methods: {
    ...mapActions(['addOneHero', 'removeOneHero']),
    onStarClick() {
      let func =  this.registeredHero ? this.removeOneHero : this.addOneHero;
      func(this.hero.id)
      .then(() => {
        this.registeredHero = !this.registeredHero;
      });
    },
    editHero() {

    }
  }
}
</script>
<style lang="scss" scoped>
.action-btn-container {
  svg {
    transform: scale(2);
  }
}
</style>