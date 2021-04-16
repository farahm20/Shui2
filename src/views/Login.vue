<template>
  <div class="landing">
    <header>
      <div class="main">
        <img src="../assets/subtract.png" alt="" />
        <h1>SHUI</h1>
        <h3>FLOW FREELY</h3>
      </div>
      <LoginCreds />
    </header>
    <footer>
      <img src="../assets/waves.png" alt="" />
    </footer>
  </div>
</template>

<script>
import LoginCreds from "../components/LoginCreds";
export default {
  name: "Login",
  components: {
    LoginCreds,
  },
};
</script>

<style scoped>
.landing {
  padding-top: 50px;
}

.logored {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
.mainDiv {
  display: flex;
  margin: auto;
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
</style>
