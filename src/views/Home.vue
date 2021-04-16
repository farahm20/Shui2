<template>
  <div class="landing">
    <main>
      <div class="main">
        <img src="../assets/subtract.png" alt="subtract" />
        <h1>SHUI</h1>
        <h3>FLOW FREELY</h3>
      </div>
    </main>
    <footer>
      "
      <!-- <img src="../assets/waves.png" alt="" class="waves"/> -->
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",

  mounted() {
    setTimeout(() => {
      this.$router.replace("/register");
    }, 3000);
  },
};
</script>
<style scoped>
.landing {
  background-color: #082756;
  display: flex;
  flex-direction: column;
  height: 100vh;

  padding: 0rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-image: url("../assets/waves.png");
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: contain;
}
header {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.main {
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  margin-bottom: 0;
  /* font-family: Cantarell; */
  font-style: normal;
  font-weight: bold;
  font-size: 35px;
  line-height: 50px;
  letter-spacing: -0.03em;
  color: #ffffff;
}
h3 {
  height: 23px;
  font-family: PT Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.2em;
  color: rgba(0, 178, 255, 0.8);
}

.waves {
  width: auto;
}
</style>
