<template>
  <v-row no-gutters style="width: 100%">
    <v-col
        v-for="enterprise in enterprises"
        :key="enterprise.id"
        cols="12"
        sm="4"
    >
      <v-sheet class="ma-2 pa-2">
        <EnterpriseComponent
          :prop_enterprise="enterprise"
        ></EnterpriseComponent>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useUserStore } from '@/stores/user'
import { type Enterprise} from "@/interfaces/auth";
import EnterpriseComponent from "@/components/EnterpriseComponent.vue";

export default defineComponent({
  name: "EnterprisesList",
  components: {EnterpriseComponent},
  data() {
    return {
      enterprises: [] as Enterprise[]
    }
  },
  mounted() {
    const userStore = useUserStore();
    this.enterprises = userStore.getEnterprises;
  }
})
</script>

<style scoped>

</style>
