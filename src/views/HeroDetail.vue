<template>
  <div>
    <template v-if="!loading">
      <v-container fluid>
        <v-row>
          <v-col lg="4" sm="12">
            <v-img :src="setImgURL"></v-img>
            <v-dialog
                transition="dialog-bottom-transition"
                max-width="90%"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    width="100%"
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                >
                  Edition
                </v-btn>
              </template>

              <template v-slot:default="dialog">
                <Dialog :dialog="dialog">
                  <template v-slot:title>
                    <h2>{{ $t('dialog.edition.title') }}</h2>
                  </template>
                  <template v-slot:content>
                    <HeroEditionForm :hero="hero" @done="dialog.value = false" @refresh="fetchHero()"/>
                  </template>
                </Dialog>
              </template>
            </v-dialog>
          </v-col>
          <v-col lg="7" sm="12">
            <v-container fluid>
              <v-row>
                <div>
                  <h1>
                    {{ hero.name }}
                    &nbsp;
                    <v-chip
                        v-if="hero.edited"
                        color="teal accent-3"
                        label
                        outlined
                        small
                    >
                      {{$t('tags.edited')}}
                    </v-chip>
                  </h1>
                  <p>{{ hero.description }}</p>
                </div>
              </v-row>
              <v-row>
                <v-timeline dense>
                  <TimelineLinkList :list="hero.comics.items" :color="'red accent-4'">
                    Comics
                  </TimelineLinkList>

                  <TimelineLinkList :list="hero.series.items" :color="'blue darken-1'">
                    Comics
                  </TimelineLinkList>

                  <TimelineLinkList :list="hero.stories.items" :color="'orange lighten-1'">
                    Comics
                  </TimelineLinkList>
                  <TimelineLinkList :list="hero.events.items" :color="'teal lighten-2'">
                    Comics
                  </TimelineLinkList>
                </v-timeline>
                <div class="items-list">
                </div>
              </v-row>

            </v-container>
          </v-col>

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
                      <font-awesome-icon
                          :icon="['fas', 'star']"
                          :style="{'color': hero.savedDate ? '#ffbd00': 'grey'}"></font-awesome-icon>
                    </v-btn>

                  </template>
                  <span v-if="!hero.savedDate">{{ $t('tooltip.btn.add') }}</span>
                  <span v-else>{{ $t('tooltip.btn.remove') }}</span>
                </v-tooltip>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import marvelService from "@/api/services/marvelAPI/marvelService";
import Dialog from '@/components/share/Dialog';
import HeroEditionForm from '@/components/HeroEditionForm';
import TimelineLinkList from "@/components/share/TimelineLinkList";

export default {
  name: "HeroDetail",
  components: {
    Dialog,
    HeroEditionForm,
    TimelineLinkList,
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
      return this.hero.thumbnail ? (this.hero.thumbnail.path + '.' + this.hero.thumbnail.extension) : '';
    },
    editBtnText() {
      return this.$t(`btn.edition.set.text`)
    },
    editBtnTooltip() {
      return this.$t(`btn.edition.set.tooltip`)
    },
  },
  created() {

    this.fetchHero()
    // this.hero = this.getHeroBydId(this.parseIntId, true)
    //     ? this.getHeroBydId(this.parseIntId, true)
    //     : this.getHeroBydId(this.parseIntId)
    //       ? this.getHeroBydId(this.parseIntId)
    //       : this.fetchHeroById(this.parseIntId)
    //
    // console.log(this.hero.name, this.hero)
    // this.registeredHero = !!this.hero.savedDate
    //
    // this.loading = false;
    //
    // this.hero = this.getHeroBydId(this.parseIntId, true)
    //     ? this.getHeroBydId(this.parseIntId, true)
    //     ? this.getHeroBydId(this.parseIntId)
    //     : Promise.resolve(this.fetchHeroById())
    //     : ''


    // if(this.getHeroBydId(this.parseIntId, true)) {
    //   console.log('firstCase => ', this.getHeroBydId(this.parseIntId, true))
    //   this.hero = this.getHeroBydId(this.parseIntId, true)
    // } else if(this.getHeroBydId(this.parseIntId)) {
    //   console.log('secondCase', this.getHeroBydId(this.parseIntId))
    //   this.hero = this.getHeroBydId(this.parseIntId)
    // } else {
    //    this.fetchHeroById().then(res => {
    //    this.hero = res.data.data.results[0];
    //   console.log('thirdCase => ', this.hero);
    //
    //    })
    // }

    // LocalService.getOneLocalStorageHero(this.parseIntId)
    //     .then(hero => {
    //       this.hero = hero;
    //       this.registeredHero = true;
    //     })
    //     .catch(() => {
    //       if (this.getHeroBydId(this.parseIntId)) {
    //         this.hero = this.getHeroBydId(this.parseIntId);
    //       } else {
    //       marvelService.getHeroById(this.parseIntId)
    //         .then(res => {
    //           this.hero = res.data.data.results[0];
    //         })
    //       }
    //     })
    //     .finally(() => {
    //         this.loading = false;
    //     })
  },
  methods: {
    ...mapActions(['addOneHero', 'removeOneHero']),
    fetchHero() {
      if (this.getHeroBydId(this.parseIntId, true) || this.getHeroBydId(this.parseIntId)) {
        this.hero = this.getHeroBydId(this.parseIntId, true) ? this.getHeroBydId(this.parseIntId, true) : this.getHeroBydId(this.parseIntId);
        this.registeredHero = !!this.hero.savedDate;
        this.loading = false;
      } else {
        this.fetchHeroById()
            .then(hero => {
              this.hero = hero;
              this.loading = false;
            });
      }
    },
    fetchHeroById() {
      return marvelService.getHeroById(this.parseIntId)
          .then(res => {
            return res.data.data.results[0];
          });
    },
    onStarClick() {
      let func = this.registeredHero ? this.removeOneHero : this.addOneHero;
      func(this.hero)
          .then(() => {
            this.registeredHero = !this.registeredHero;
          });
    },
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