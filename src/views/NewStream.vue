<template>
  <div class="newStream">
    <textarea
      v-model="info"
      class="infoText"
      type="text"
      placeholder="Share your message"
    />

    <input
      v-model="hashtag"
      type="text"
      class="hashtagInput"
      placeholder="#hastag"
    />
    <button @click="createStream" class="publish">Publish</button>
  </div>
</template>

<script>
export default {
  name: "NewStream",
  data() {
    return {
      info: "",
      hashtag: "",
    };
  },
  methods: {
    createStream() {
      this.$store.dispatch("createStream", {
        info: this.info,
        hashtag: this.hashtag,
      });
    },
  },
};
</script>

<style>
.newStream {
  background-color: #082756;
}

.infoText {
  height: 400px;
  width: 90%;
  margin: 5rem 0 5rem 0;
  padding-top: 1rem;
  overflow: auto;
  border: 1px solid black;
  background-color: #fff;
  color: #000;
  text-align: center;
}

.hashtagInput {
  width: 90%;
  height: 62px;
  margin-bottom: 2rem;
  border: 1px solid #ffffff;
  background-color: #082756;
  color: #757575;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  cursor: pointer;
}

.publish {
  width: 90%;
  height: 62px;
  margin-bottom: 10px;
  background-color: #ef4343;
}
</style>
