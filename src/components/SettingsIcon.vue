<template>
  <nav class="settings-icon" @click="toggle">
    <img src="../assets/setting.png" alt="setting" class="settings" />
  </nav>
</template>

<script>
export default {
  name: "SettingsIcon",
  methods: {
    toggle() {
      console.log("in toggle!");
      if (
        this.$route.path == "/" ||
        this.$route.path == "/register" ||
        this.$route.path == "/login"
        // ||
        // this.$route.path == "/userRemoved"
      ) {
        return;
      }
      this.$store.commit("toggle");
    },
  },
};
</script>

<style>
.settings {
  position: fixed;
  top: 7px;
  left: 5%;
  z-index: 100;
  cursor: pointer;
}
</style>
