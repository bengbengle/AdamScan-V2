<template>
    <div class="container">
        <iframe style="
            border: navajowhite;
            width: 100%;
            height: 500px;
        " src='https://testnet.map.adambox.io?r=1'></iframe>
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
    .level_second .el-image__inner{
        width: 80px;
    }
</style>