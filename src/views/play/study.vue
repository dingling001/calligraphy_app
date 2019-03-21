<template>
    <div class="s_box">
        <iframe :src="src" frameborder="0"></iframe>
    </div>
</template>

<script>
    import {baseUrl} from "../../config/url";

    export default {
        name: "study",
        data() {
            return {
                src: ''
            }
        },
        created() {
            this.src = baseUrl + 'learn_content_info?p=wx&apitoken=' + this.U.Cookie.get('slb_api_token')
        },
    }
</script>

<style scoped lang="scss">
    .s_box {
        height: 100vh;
        overflow: hidden;
        iframe {
            width: 100%;
            height: 100%;
        }
    }

</style>
