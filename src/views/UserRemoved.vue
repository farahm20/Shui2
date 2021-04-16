<template>
  <section class="landing">
    <!-- <SettingsIcon /> -->
    <img
      class="goToLogin"
      @click="goToLogin"
      src="../assets/setting.png"
      alt=""
    />
    <p class="removeMsg">
      You no longer exists <br />
      in Shui system
    </p>
  </section>
</template>

<script>
// import SettingsIcon from "@/components/SettingsIcon";

export default {
  name: "UserRemoved",
  data() {
    return {};
  },
  components: {
    // SettingsIcon,
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
  },
  computed: {
    // showSettings() {
    //   return this.$store.state.showSettings;
    // },
  },
};
</script>

<style scoped>
.landing {
  background-color: #082756;

  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.goToLogin {
  position: fixed;
  top: 7px;
  left: 5%;
  z-index: 100;
  cursor: pointer;
}

.removeMsg {
  margin-bottom: 0;
  font-family: Cantarell;
  font-style: normal;
  font-weight: bold;
  font-size: 25px;
  line-height: 50px;
  letter-spacing: -0.03em;

  color: #ffffff;
}
</style>
