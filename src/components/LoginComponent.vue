<template>
  <v-text-field
      clearable
      label="Username"
      prepend-inner-icon="$account"
      variant="outlined"
      v-model="username"
  ></v-text-field>

  <v-text-field
      type="password"
      clearable
      label="Password"
      variant="outlined"
      persistent-hint
      prepend-inner-icon="$lock"
      v-model="password"
  ></v-text-field>

  <div>
    <span class="text-subtitle-2 text-red">{{warning_text}}</span>
  </div>
  <div class="mt-5">
    <v-btn
        :loading="loading"
        v-on:click="requestLogin"
        class="flex-grow-1"
        variant="tonal"
    >
      Login
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {ApiClient} from "@/services/client";
import { useTokenStore, useUserStore } from '@/stores/user'

export default defineComponent({
  name: "LoginComponent",
  data() {
    return {
      username: "",
      password:"",
      warning_text: "",
      loading: false,

    }
  },
  methods: {
    async requestLogin() {
      const tokenStore = useTokenStore()
      const vueModel = this;
      const username = vueModel.username;
      const password = vueModel.password;
      vueModel.loading  = true;
      const  data = await ApiClient.logIn({username, password});
      const token = {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in
      }
      if (!data.access_token) {
        vueModel.warning_text = 'Login incorrect';
        vueModel.loading = false;
        tokenStore.$reset();
      }
      else {
        vueModel.warning_text = "";
        vueModel.loading = false;
        tokenStore.storeToken(token);
        const userStore = useUserStore();
        const user = await ApiClient.getUser();
        const enterprises = await ApiClient.getEnterprises();
        userStore.storeUser({
          id: user.data.id,
          name: user.data.name,
          surname: user.data.surname,
          username: user.data.username,
          email: user.data.email,
          enterprises: enterprises.data
        })
        this.$router.push('/enterprises')
        }
    },
  },
})
</script>

<style scoped>

</style>
