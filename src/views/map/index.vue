<template>
    <div class="container">
        <iframe style="border: navajowhite; width: 100%;height: 500px;" :src="'https://map.adamscan.io?r=' + Math.random(100) * 10 ** 17 ">
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
    .container {
        min-height: 500px; 
        margin-top: -480px;
    }
    .level_second .el-image__inner {
        width: 80px;
    }
</style>