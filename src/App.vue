<template>
  <div id="app">
    <SettingsIcon />
    <Settings v-if="showSettings" />
    <!-- <img src="./assets/redStag.png" alt="redStag" @click="goTo" class="sTag" />
    <img src="./assets/redStag.png" alt="redStag" class="sTag" /> -->

    <router-view />
  </div>
</template>

<script>
import SettingsIcon from "./components/SettingsIcon";
import Settings from "./components/Settings";

export default {
  name: "App",

  components: {
    SettingsIcon,
    Settings,
  },
  computed: {
    showSettings() {
      return this.$store.state.showSettings;
    },
  },
  methods: {
    checkStatus() {
      this.$store.dispatch("checkStatus");
    },
    // goTo() {
    //   this.$router.push("/flow");
    // },
  },
  beforeMount() {
    this.$store.dispatch("checkStatus");
  },
};
</script>

<style>
.landing {
  background-color: #082756;
  display: flex;
  flex-direction: column;
  height: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
.lable-shui {
  position: fixed;
  top: 0px;
  left: 5%;
}

.sTag {
  position: fixed;
  top: 0px;
  left: 5%;
  z-index: 100;
  /* 
  display: flex;
  justify-content: flex-start;
  align-items: flex-start; */
}

footer {
  display: flex;
  flex-direction: column;
}
</style>
