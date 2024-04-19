<template>
  <div class="enterprise-selector" @click="selectEnterprise">
    <div>
      <img src="@/assets/enterprise.png" />
    </div>
    {{enterpriseName}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useEnterpriseStore } from '@/stores/user'
import { type Enterprise} from "@/interfaces/auth";

export default defineComponent({
  name: "EnterpriseComponent",
  props: ['prop_enterprise'],
  data() {
    return {
      enterprise:null as Enterprise|null,
      enterpriseName: ''
    }
  },
  mounted() {
    this.enterprise = this.prop_enterprise;
    this.enterpriseName = (this.enterprise) ? this.enterprise.name : '';
  },
  methods:{
    selectEnterprise() {
      const enterpriseStore = useEnterpriseStore();
      if(this.enterprise) {
        enterpriseStore.storeEnterprise(this.enterprise)
      }
      this.$router.push('/stream')

    }
  }
})
</script>

<style scoped>
  .enterprise-selector{
    cursor: pointer;
  }
</style>
