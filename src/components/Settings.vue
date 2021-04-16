<template>
  <section class="settings">
    <SettingsIcon />
    <div class="streams">
      <h1>Streams</h1>
      <!-- <p class="hashtags">{{ hashtags }}</p> -->
      <article class="printHashtags">
        <DeleteHashtags
          class="hashtag"
          v-for="(hashtag, index) in allHashtags"
          :key="index"
          :hashtags="hashtag"
        />
        <!-- <h5>{{ hashtag }}</h5>
          <div @click="removeHashtag">
            <img src="./../assets/X.png" alt="removeTag" />
          </div> -->

        <!-- <img
          src="../assets/checkmark.png"
          alt="checkmark"
          @click="removeHashtags"
          class="removeHashtag"
        /> -->
      </article>
    </div>
    <div class="dropdownDiv">
      <section class="dropdownSection">
        <select class="dropdown" type="text" name="hashtag" v-model="hashtag">
          <option
            v-for="(hashtag, index) in allHashtags"
            :key="index"
            :value="hashtag"
            >{{ hashtag }}</option
          >
        </select>
        <button class="addBtn" @click="addHashtag">
          <img src="./../assets/add.png" alt="addTag" />
        </button>
      </section>
      <button @click="removeUser" class="btn-emergency">
        Shooooot, they're on me!!
      </button>
    </div>
  </section>
</template>

<script>
import SettingsIcon from "@/components/SettingsIcon";
import DeleteHashtags from "@/components/DeleteHashtags";

export default {
  name: "Settings",
  props: {
    hashtags: String,
  },
  data() {
    return {
      hashtag: String,
    };
  },
  components: {
    SettingsIcon,
    DeleteHashtags,
  },
  methods: {
    removeUser() {
      this.$store.dispatch("removeUser");
      this.$router.push("/userRemoved");
      return this.$store.state.showSettings;
    },
    checkStatus() {
      this.$store.dispatch("checkStatus");
    },
    async addHashtag() {
      await this.$store.dispatch("addHashtag", this.hashtag);
      await this.$store.dispatch("followedHashtags");
    },
    async removeHashtags() {
      await this.$store.dispatch("removeHashTags", { hashtag: this.hashtags });
      await this.$store.dispatch("followedHashtags");
    },
  },
  computed: {
    allHashtags() {
      return this.$store.getters.allHashtags;
    },
    showSettings() {
      return this.$store.state.showSettings;
    },
  },
  // goTo() {
  //   this.$router.push("/flow");
  // },
};
</script>

<style scoped>
.settings {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 80vh;
  background: #ef4343;
  box-shadow: 0px 0px 0px 100vh rgba(0, 0, 0, 0.69);
}

.streams {
  width: 90%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.printHashtags {
  margin-left: 149px;
  display: grid;
  grid-template-columns: 160px 160px;
  width: 131px;
}

.hashtag {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 1em;
  margin: 0.5em;
  height: 32px;
  min-width: 131px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

article {
  background-color: rgba(255, 255, 255, 0.2);
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0px 4px 4px 0px;
}

.dropdownDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dropdown {
  width: 250px;
  height: 50px;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: #ef4343;
  font-family: PT Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 36px;
  margin: 0;
  display: flex;
  align-items: center;
  color: #ffffff;
}

.dropdownSection {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 300px;
  flex-direction: row;
  background-color: #ffffff;
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 1.5em;
  margin-top: 1.5em;
}

.addBtn {
  height: 50px;
  width: 58px;
  border: 2px solid #ffffff;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: #ffffff;
}

/* .settings {
  width: 100px;
  height: auto;
  background-color: rgb(111, 153, 139);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.4rem 0 0.4rem 0;
  padding: 0.4rem 0 0.4rem 0;
  background-color: #f05e5e;
} */
</style>
