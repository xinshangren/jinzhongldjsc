<template>
  <div>
    <van-tabs
      v-model="active"
      :sticky="false"
      :ellipsis="false"
      line-width="20%"
      style="font-size: 14px;"
      color="#2796e7"
      title-inactive-color="#999999"
      title-active-color="#2796e7"
      @change="tabsclick"
    >
      <van-tab
        v-for="(item,index) in departList"
        :key="index"
        :title="item.departname"
        :id="item.id"
      >
        <cq_dingbanDetailVue v-bind:departId="item.id"></cq_dingbanDetailVue>
      </van-tab>
      <van-tab v-if="isShow"  :title="areaName">
        <img style="width:100%;" src="../../../assets/img/no-data.jpg" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import $ from "jquery";
import cq_dingbanDetailVue from "@/page/qxztc/cq/cq_dingbanDetail.vue";
import { httpMethod } from "../../../api/getData.js";
import { Search } from "vant";
import global_variable from "../../../api/global_variable.js";
import vhtmlpanel from "@/components/HtmlPanel.vue";

export default {
  name: "headline",
  data() {
    return {
      isShow: false,
      departId: "",
      departList: [],
      areaName: "",
      active: 0,
      data: {},
      url1:
        "http://203.207.104.105:22001/gov-inter/pages/groupManage/myGroupList.html"
      // url1:
      //   "http://203.207.104.105:22001/gov-inter/pages/index.jsp?type=12%25269UFckSUDKYbqp5WXsFeANg%253D%253D&corpId=12%2526zm5I%252B28cxAMS%252B8HHXdo5eHVKvsWXYvgTY07BZfJRnlTqhywqrsMf84vlraBG5RiW"
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(from);
    if (from.path != "/") {
      if (to.path == "/cyzx/nyts/nyts") {
        to.meta.keepAlive = true;
      } else {
        to.meta.keepAlive = false;
      }
    }else{
       to.meta.keepAlive = false;
    }
    next();
  },
  mounted() {
    var params = this.$route.query;
    this.areaName = params.menu;
    this.doAddAppLogList(
      global_variable.logId,
      global_variable.ddPhone,
      params.num,
      params.menu
    );
    this.departId = params.departId;
    this.getDepartList(this.departId);
  },
  methods: {
    getDepartList: function(departId) {
      var self = this;
      var params = {
        departId: departId
      };
      httpMethod
        .goUserLogin(params)
        .then(res => {
          if (res.success == "1") {
            if (res.tSDepartList != null && res.tSDepartList.length>0) {
              self.departList = res.tSDepartList;
            } else {
              self.isShow = true;
            }
          } else if (res.success == "0") {
            self.$toast(res.msg);
          }
        })
        .catch(err => {
          this.$toast(err);
          this.finished = true;
        });
    },
    changeactive: function(data) {
      this.active = data;
    },
    tabsclick: function(name, title) {}, //获取记录日志的logid
    doAddAppLogList: function(logId, ddPhone, grouping_id, grouping_name) {
      var params = {
        logId: logId,
        ddPhone: ddPhone,
        grouping_id: grouping_id,
        grouping_name: grouping_name
      };
      httpMethod
        .doAddAppLogList(params)
        .then(res => {
          if (res.success == "1") {
          }
        })
        .catch(err => {
          // this.$toast(err);
        });
    }
  },
  components: {
    cq_dingbanDetailVue
  }
};
</script>

<style socped>
</style>