<template>
    <div>
        <div>目录</div>
        <ul class="menu">
            <li class="head">
                <router-link to="/enter/brief">走进善博</router-link>
            </li>
            <li>
                <router-link to="/enter/brief">----场馆概况</router-link>
            </li>
            <li>
                <router-link to="/enter/news">----最新资讯</router-link>
            </li>
            <li>
                <router-link to="/enter/guide">----参观指南</router-link>
            </li>
            <li>
                <router-link to="/enter/tickets_apply">----票务预约</router-link>
            </li>
        </ul>
        <ul class="menu">
            <li class="head">
                <router-link to="/taste/display">品味善博</router-link>
            </li>
            <li>
                <router-link to="/taste/display">----陈列展览</router-link>
            </li>
            <li>
                <router-link to="/taste/map_index">----地图导览</router-link>
            </li>
            <li>
                <router-link to="/taste/treasure">----善博珍宝</router-link>
            </li>
            <li>
                <router-link to="/taste/creative">----文创产品</router-link>
            </li>
        </ul>
        <ul class="menu">
            <li class="head">
                <router-link to="/play">玩转善博</router-link>
            </li>
            <li>
                <router-link to="/play/edu_sport">----教育活动</router-link>
            </li>
            <li>
                <router-link to="/play/vol_index">----志愿服务</router-link>
            </li>
            <li>
                <router-link to="/play/game">----互动游戏</router-link>
            </li>
            <li>
                <router-link to="/play/question">----调查问卷</router-link>
            </li>
            <!--<li>-->
            <!--<a href="https://3gimg.qq.com/lightmap/v1/marker/index.html?marker=coord%3A34.04795%2C114.40179%3Btitle%3A吉鸿昌烈士纪念馆%3Baddr%3A河南省周口市扶沟县鸿昌大道(东邻周郑公路%2C南依311国道)%3Buid%3A7967391113943802549&key=TKUBZ-D24AF-GJ4JY-JDVM2-IBYKK-KEBCU&referer=pcmap&ch=uri-api&ADTAG=uri-api.pcmap"-->
            <!--class="sub5">&#45;&#45;&#45;&#45;交通信息</a>-->
            <!--&lt;!&ndash; <router-link to="/visit/traffic">&#45;&#45;&#45;&#45;交通信息</router-link> &ndash;&gt;-->
            <!--</li>-->
        </ul>
    </div>
</template>
<script>
    export default {

    }

</script>
<style scoped>
    .menu {
        padding: 15px;
    }

    .menu li {
        font-size: 15px;
        line-height: 50px;
    }

    .menu li.head {
        font-size: 25px;
        font-weight: bold;
    }

</style>
