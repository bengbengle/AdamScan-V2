<template>
    <div style='min-height: 500px;'>
        <!-- <iframe style="
            border: navajowhite;
            width: 100vw;
            height: 100vh;
        " src='https://testnet.map.adambox.io?r=1'></iframe> -->
          <iframe style="border: navajowhite; width: 100vw;height: 100vh;" :src="'https://map.adamscan.io?r=' + Math.random(100) * 10 ** 17 ">
        </iframe>
    </div>
</template>
<script defer="true">
  export default {
        name: "map",
        components: {
        },
        mounted() {
        },
        data() {
            return {}
        },
        methods: {}
    }
</script>

<style scoped>
    .level_second .el-image__inner{
        width: 80px;
    }
</style>