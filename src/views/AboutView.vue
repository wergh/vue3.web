<template>
    Estoy aqui
</template>

<style>

</style>
<script lang="ts">
import {defineComponent} from "vue";
export default defineComponent({
  mounted() {
    const plugin = document.createElement("script");
    plugin.setAttribute(
        "src",
        "https://app.vagon.io/vagonsdk.js"
    );
    plugin.async = true;
    document.head.appendChild(plugin);

    document.addEventListener("DOMContentLoaded", function(event) {

    });
  }
});
</script>
