<template>
  <section id="printHashtags">
    <h5>{{ hashtags }}</h5>

    <img @click="removeHashtag" src="./../assets/X.png" alt="removeTag" />

    <!-- <p class="hashtag">{{ hashtags }}</p>
    <img
      @click="deleteHashtag"
      class="trash"
      src="../assets/trash.svg"
      alt=""
    /> -->
  </section>
</template>

<script>
export default {
  name: "Settings",
  props: {
    hashtags: String,
  },
  data() {
    return {};
  },
  methods: {
    async removeHashtag() {
      await this.$store.dispatch("deleteHashtag", { hashtag: this.hashtags });
      await this.$store.dispatch("followedHashtags");
    },
  },
  computed: {},
};
</script>

<style>
.printHashtags {
  margin-left: 149px;
  display: grid;
  grid-template-columns: 160px 160px;
  width: 131px;
}
</style>
