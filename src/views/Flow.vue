<template>
  <div class="landing">
    <section id="flows">
      <section class="flows">
        <Streams
          v-for="flow in streams"
          :key="flow.streamID"
          :stream="flow"
          class="flows"
        />
      </section>
      <img
        @click="addStream"
        class="addStream"
        src="../assets/pencil.png"
        alt="pencil"
      />
    </section>
  </div>
</template>

<script>
import Streams from "../components/Streams";
export default {
  name: "Flow",
  components: {
    Streams,
    // Settings,
  },
  data() {
    return {
      isShow: false,
      hashtag: String,
    };
  },
  beforeCreate() {
    this.$store.dispatch("getStreams");
  },
  computed: {
    showSettings() {
      return this.$store.state.showSettings;
    },
    streams() {
      return this.$store.state.streams;
    },
    followeds() {
      return this.$store.state.followed;
    },
  },
  methods: {
    deleteUser() {
      this.$store.dispatch("removeUser");
      this.$router.push("/userRemoved");
    },
    addStream() {
      console.log("In new add stream");
      this.$router.push("/newStream");
    },
  },
};
</script>

<style scoped>
#flows {
  width: 100%;
  height: auto;
  background-color: #082756;
  padding: 3rem 0 1.5rem 0;
}

.landing {
  padding-top: 50px;
  /* padding: 0rem; */
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-image: url("../assets/edit.png");
  background-position: bottom right;
  background-repeat: no-repeat;
}
.container-hastags {
  width: 90%;
  height: 50%;
}

.title {
  text-align: center;
  margin: 0.6rem 0 2rem 0;
  text-transform: capitalize;
  color: #fff;
}
.hashtags {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.hashtag {
  width: 100%;
  background-color: var(--main-bg-color);
  text-align: end;
  padding-top: 0.4rem;
  padding-right: 3rem;
  color: var(--third-text-color);
  border: 0;
}

.addStream {
  position: fixed;
  top: 88%;
  left: 85%;
  opacity: 0.6;
  border-radius: 8px;
  background-color: #ef4343;
  padding: 6px;
  cursor: pointer;
}
</style>
