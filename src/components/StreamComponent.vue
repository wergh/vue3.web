<template>
  <div style="height: 100%">
    <div class="vagon-container">
      <iframe id="vagonFrame" allow="microphone  *; clipboard-read *; clipboard-write *; encrypted-media *;" :src="vagonStreamUrl" class="iframe-responsive"/>
    </div>
  </div>
</template>

<script lang="ts">
import { useUserStore, useEnterpriseStore} from '@/stores/user'
import {defineComponent} from "vue";

export default defineComponent({
  name: "StreamComponent",
  data() {
    return {
      vagonStreamUrl: ''
    }
  },
  mounted() {
    const userStore = useUserStore();
    const enterpriseStore = useEnterpriseStore();

    const vagonStreamUrl = enterpriseStore.getPixelStreamingUrl;
    const vueModel = this;
    const plugin = document.createElement("script");
    plugin.setAttribute(
        "src",
        "https://app.vagon.io/vagonsdk.js"
    );
    plugin.async = true;
    document.head.appendChild(plugin);
    this.$nextTick(function () {
      if (/Mobi|Android|iPad|iPod|iPhone/i.test(navigator.userAgent) || (navigator.userAgent.includes('Mac') && navigator.maxTouchPoints > 1) ){
        vueModel.vagonStreamUrl = vagonStreamUrl+"?launchFlags=-player%3DMobileCamera";
        // document.getElementById("vagonFrame").src = vagonStreamUrl+"?launchFlags=-player%3DMobileCamera";
      } else {
        vueModel.vagonStreamUrl = vagonStreamUrl+"?launchFlags=-player%3DPCImmersive";
        // document.getElementById("vagonFrame").src = vagonStreamUrl+"?launchFlags=-player%3DPCImmersive";
      }

      window.Vagon.onConnected(() => {
        let obj = { type: "user", data: userStore.getUser }
        let myJSON = JSON.stringify(obj);
        window.Vagon.sendApplicationMessage(myJSON);
      });


    })
    // document.addEventListener("DOMContentLoaded", function(event) {
    //
    //
    //   let obj = { type: "login", data: userStore.$state.user }
    //   let myJSON = JSON.stringify(obj);
    //   window.Vagon.sendApplicationMessage(myJSON);
    // });
  }
})
</script>

<style scoped>
@media only screen and (orientation: landscape) {
  .vagon-container {
    /*position: relative;*/
    /*overflow: hidden;*/
    width: 100%;
    height: 100%;
    /*padding-top: 40.25%; !* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) *!*/
  }

}
@media only screen and (orientation: portrait) {
  .vagon-container {
    /*position: relative;*/
    /*overflow: hidden;*/
    width: 100%;
    height: 100%;
    /*padding-top: 211.11%; !* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) *!*/
  }
}
</style>
