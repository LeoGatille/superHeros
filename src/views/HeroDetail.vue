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
                    <HeroEditionForm :hero="hero" @done="closeDialog(dialog)" @refresh="fetchHero()"/>
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
                      {{ $t('tags.edited') }}
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
                    Series
                  </TimelineLinkList>

                  <TimelineLinkList :list="hero.stories.items" :color="'orange lighten-1'">
                    {{ $t('heroDetail.stories') }}
                  </TimelineLinkList>
                  <TimelineLinkList :list="hero.events.items" :color="'teal lighten-2'">
                    {{ $t('heroDetail.events') }}
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
                          :style="{'color': registeredHero ? '#ffbd00': 'grey'}"></font-awesome-icon>
                    </v-btn>

                  </template>
                  <span v-if="!registeredHero">{{ $t('tooltip.btn.add') }}</span>
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
import {mapActions, mapGetters, mapState} from "vuex";
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
    ...mapState(['favoriteHeroList']),
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
    if(!this.favoriteHeroList.length) {
      this.fetchDashboardHeroes()
      .then(() => {
        this.fetchHero();
      })
    } else {
      this.fetchHero();
    }
  },
  methods: {
    ...mapActions(['addOneHero', 'removeOneHero', 'fetchDashboardHeroes']),
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
      let func = () => {
        return this.registeredHero ? this.removeOneHero(this.hero.id) : this.addOneHero(this.hero);
      }
      func(this.hero)
          .then(() => {
            this.registeredHero = !this.registeredHero;
          });
    },
    closeDialog(dialog) {
      this.registeredHero = this.hero.savedDate;
      dialog.value = false;
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