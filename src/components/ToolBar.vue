<template>
  <v-toolbar
      class="custom-toolbar"
      dense
      light
      style="height: 60px"
      :style="{top: this.top + 'px'}"
  >
    <!--    <div style="height: 100%">-->
    <!--        <SearchBar-->
    <!--            @validation="launchSearch"-->
    <!--            @keyUp="setRequestedName"-->
    <!--        />-->
    <!--    </div>-->
    <!--    <div style="width: 50px; height: 100%">-->
    <!--        <v-select-->
    <!--            dense-->
    <!--            :items="limits"-->
    <!--            v-model="limit"-->
    <!--        ></v-select>-->

    <!--    </div>-->

    <div class="search-bar input-container">
      <v-text-field
          :placeholder="$t('searchBar.placeholder')"
          prepend-icon="mdi-magnify"
          single-line
          v-model="searchValueModel"
          @input="formatQuery()"
      ></v-text-field>

    </div>
    <div class="select input-container">
      <v-select
          :label="$t('toolbar.limit')"
          :items="limits"
          v-model="limitModel"
          @input="formatQuery()"
      ></v-select>

    </div>
    <div class="input-container">
      <v-select
          v-model="orderByModel"
          :items="orderByOptions"
          item-text="name"
          item-value="value"
          label="Select"
          persistent-hint
          return-object
          single-line
          @input="formatQuery()"
      ></v-select>
    </div>

    <div v-if="this.itemsDisplay" class="toggle-container">
      <div
          class="toggle"
          :class="{'active': isListDisplay('card')}"
          @click="setItemDisplay('card')"
      >
        <font-awesome-icon :icon="['fas', 'id-card']"></font-awesome-icon>
      </div>
      <div class="separator"></div>
      <div
          class="toggle"
          :class="{'active': isListDisplay('row')}"
          @click="setItemDisplay('row')"
      >
        <font-awesome-icon :icon="['fas', 'th-list']"></font-awesome-icon>
      </div>
    </div>

    <v-spacer></v-spacer>
    <div>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              fab
              dark
              small
              color="primary"
              v-bind="attrs"
              v-on="on"
              @click="search()"
          >
            <font-awesome-icon
                style="color: white"
                :icon="['fas', 'search']"
            ></font-awesome-icon>
          </v-btn>

        </template>
        <span>{{ $t('btn.edition.apply.text') }}</span>
      </v-tooltip>
    </div>

  </v-toolbar>
</template>
<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "ToolBar",
  props: {
    itemsDisplay: {
      type: String,
      required: false,
    }
  },
  data() {
    return {
      scrollEvent: null,
      top: 208,
      lastPageYOffset: 0,
      searchValueModel: '',
      limitModel: '',
      limits: [10, 20, 30, 50, 100],
      orderByModel: {name: 'A-Z', value: 'name'},
    }
  },
  computed: {
    ...mapState(['searchValue', 'limit', 'orderBy',]),
    orderByName() {
      return this.orderByOptions.find(option => {
        return option.value === this.orderBy;
      })
    },
    orderByOptions() {
      return [
        {name: 'A-Z', value: 'name'},
        {name: 'Z-A', value: '-name'},
        {name: this.$t('toolbar.orderBy.dateIncreasing'), value: 'modified'},
        {name: this.$t('toolbar.orderBy.dateDecreasing'), value: '-modified'},
      ];
    }
  },
  created() {
    this.scrollEvent = window.addEventListener('scroll', this.handleScroll);
    this.orderByModel = this.orderByName;
    this.searchValueModel = this.searchValue;
    this.limitModel = this.limit;
  },
  methods: {
    ...mapActions(['setQuery']),
    formatQuery() {
      this.setQuery({searchValue: this.searchValueModel, limit: this.limitModel, orderBy: this.orderByModel.value});
    },
    search() {
      this.$emit('setQuery')
    },
    setRequestedName() {
      this.$store.dispatch('fetchIn' + this.$route.query.listType)
    },
    handleScroll() {
      if ((window.pageYOffset <= 100)) {
        this.top -= 5;
        // this.top =  this.lastPageYOffset < window.pageYOffset ?  this.top - (this.top - window.pageYOffset) : this.top + (this.top + window.pageYOffset);
        if (window.pageYOffset === 0) {
          this.top = 208;
        }
      } else {
        this.top = 104;
      }
    },
    isListDisplay(display) {
      return this.itemsDisplay === display;
    },
    setItemDisplay(display) {
      this.$emit('changeItemDisplay', display);
    }
  }
}
</script>

<style lang="scss" scoped>
.v-toolbar__content {
  height: 100%;
}

.custom-toolbar {
  align-items: center;
  padding-top: 5px;
  height: 60px;
  position: fixed;
  width: 1000px;
  z-index: 200;
  left: 3px;

  .input-container {
    margin-right: 50px;
    padding-top: 25px;
  }

  .select {
    width: 60px;
  }
}

.toggle-container {
  display: flex;
  width: 60px;
  border: solid lightgrey 1px;
  border-radius: 5px;
  overflow: hidden;

  .toggle {
    width: 50%;
    cursor: pointer;
    padding: 5px;
    background-color: lightgrey;
    color: grey;
  }

  .active {
    background-color: white;
    color: black;
    box-shadow: 3px 0 3px grey;
  }

  .separator {
    width: 1px;
    height: 100%;
    background-color: grey;
  }
}
</style>