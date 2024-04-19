<template>
<HeaderLanding></HeaderLanding>
<LoginComponent></LoginComponent>
</template>

<script>
import HeaderLanding from "@/components/HeaderLanding.vue";
import LoginComponent from "@/components/Login.vue";
export default {
  name: "LandingPage",
  components: {LoginComponent, HeaderLanding}
}
</script>

<style scoped>

</style>
