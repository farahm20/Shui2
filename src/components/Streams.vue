<template>
  <article class="streams">
    <section class="inStream">
      <p class="date">{{ stream.date }}</p>
      <p class="info">{{ stream.info }}</p>
      <h3 class="owner">━ {{ stream.user }}</h3>
    </section>
    <p class="hashtag">{{ stream.hashtag }}</p>
  </article>
</template>
<script>
export default {
  name: "Streams",
  props: {
    stream: Object,
  },
};
</script>

<style scoped>
.streams {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;
  height: max-content;
  background-color: #082756;
}

.inStream {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  background-color: #ffff;
  margin: 0;
  border-radius: 4px;
  padding-left: 6px;
}

.hashtag {
  width: 100%;
  text-align: end;
  padding-top: 0.4rem;
  padding-right: 3rem;
  color: #00b2ff;
  border: 0;
}
</style>
