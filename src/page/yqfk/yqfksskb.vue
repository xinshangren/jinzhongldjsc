<template>

  <div>
     <iframe id="sskb" style="width:100%;" src="https://m.carelink.cn/activity/epidemic/ssbb_jd.html?ad_od=share&utm_source=androidapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Wxfriends&from=singlemessage&isappinstalled=0" scrolling="auto" frameborder="0"></iframe>

  </div>

</template>
<script>
  import Vue from "vue";
  import { PullRefresh } from "vant";
  import { httpMethod } from "../../api/getData.js";
  import global_variable from '../../api/global_variable.js';
  Vue.use(PullRefresh);
  export default {
    name: "picsnews",
    data() {
      return {
        userId: "",//暂时默认
        error: false,
        list: [],
        loading: false, //是否处于加载状态
        finished: false, //是否已加载完所有数据
        isLoading: false, //是否处于下拉刷新状态
        page: 1,
        pageSize: 10
      };
    },
    mounted() {
     var orderHight1 = document.documentElement.clientHeight;
    var heightlist = orderHight1 - 160;
    $("#sskb").css("height", heightlist + "px");
    },
    methods: {
      getPictureclass: function () {
        var params = {
          page: this.page,
          pageSize: this.pageSize,
          userId: this.userId
        };
        this.page = this.page + 1;
        httpMethod
          .getPictureclass(params)
          .then(res => {
            if (res.success == "1") {
              this.list = this.list.concat(res.dataList);
              for (var i = 0; i < this.list.length; i++) {
                var url1 = httpMethod.returnBaseUrlFun();
                if (this.list[i].imgUrl == null) {
                  this.list[i].imgUrl = url1 + "upload/error/error.jpg"
                }
              }
              if (res.dataList < 4) {
                this.finished = true;
              }
            } else if (res.success == "0") {
              this.error = true;
            }
            this.loading = false;
            this.isLoading = false;
          })
          .catch(err => {
            this.$toast(err);
            this.finished = true;
          });
      },
      onRefresh() {
        this.page = 1;
        this.finished = false;
        this.list = [];
        console.log("onrefresh");
        this.getPictureclass();
      },
      onLoad() {
        //上拉加载
        this.error = false;
        console.log("onLoad");
        this.getPictureclass();
      },
      goDetile(item) {
        item.ifRead = "1"
        var id = item.id
        this.$router.push({
          path: "/toutiao/newsdetile",
          name: "newsdetile",
          params: {
            articleId: id
          }
        });
      }
    },

  };
</script>

<style socped>

</style>