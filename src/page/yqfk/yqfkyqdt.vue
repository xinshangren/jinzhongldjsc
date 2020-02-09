<template>

  <div style="margin:10px;background: #ffffff;border-radius:5px">
    <div style="padding:17px;">
      <div style="font-size: 20px;font-weight: 700;">疫情统计</div>
      <!-- <div style="font-size: 13px;margin-top: 1px;color: #999999;">统计截止2020.2.8 20:55</div> -->
      <div style="display: flex;margin-top: 15px;">
        <div style="width: 25%;text-align: center;">
          <div style="font-size: 15px;font-weight: 700;color: #cb4000;">确诊</div>
          <div style="font-size: 20px;font-weight: 700;color: #cb4000;margin-top: 5px;">{{eqtj.diagonsis}}</div>
          <div style="font-size: 13px;color: #999999;">较昨日{{eqtj.diachange}}</div>
        </div>
        <div style="width: 25%;text-align: center;">
          <div style="font-size: 15px;font-weight: 700;color: #e85400;">疑似</div>
          <div style="font-size: 20px;font-weight: 700;color: #e85400;margin-top: 5px;">{{eqtj.suspected}}</div>
          <div style="font-size: 13px;color: #999999;">较昨日{{eqtj.suschange}}</div>
        </div>
        <div style="width: 25%;text-align: center;">
          <div style="font-size: 15px;font-weight: 700;color: #676767;">死亡</div>
          <div style="font-size: 20px;font-weight: 700;color: #676767;margin-top: 5px;">{{eqtj.die}}</div>
          <div style="font-size: 13px;color: #999999;">较昨日{{eqtj.diechange}}</div>
        </div>
        <div style="width: 25%;text-align: center;">
          <div style="font-size: 15px;font-weight: 700;color: #008d5e;">治愈</div>
          <div style="font-size: 20px;font-weight: 700;color: #008d5e;margin-top: 5px;">{{eqtj.cure}}</div>
          <div style="font-size: 13px;color: #999999;">较昨日{{eqtj.curechange}}</div>
        </div>
      </div>
      <hr style="background: #e6e6e6;border:0;height:1px;margin-top: 20px;" />
      <div style="font-size: 20px;font-weight: 700;margin-top: 15px;">晋中疫情地图</div>
      <div style="height:310px;width: 100%;margin-top: -35px;" id="myCharts1" ref="myCharts1">

      </div>
      <div style="width: 90%;display: flex;font-size: 11px;margin-left: 83px;margin-top: -6px;">
        <div>0</div>
        <div style="margin-left: 30px;">1-3</div>
        <div style="margin-left: 22px;">4-9</div>
        <div style="margin-left: 14px;">10-19</div>
        <div style="margin-left: 10px;">20-49</div>
        <div style="margin-left: 14px;">≥50</div>
      </div>
      <hr style="background: #e6e6e6;border:0;height:1px;margin-top: 20px;" />
      <div style="font-size: 20px;font-weight: 700;margin-top: 15px;">晋中疫情新增/累计确诊趋势图</div>
      <div style="height:310px;width: 100%;" id="myCharts2" ref="myCharts2">

      </div>
      <div style="width: 100%;margin-top: 10px;">
        <div style="background: #fafafa;height: 42px;display: flex;">
          <div style="text-align: center;width: 25%;font-size: 15px;font-weight: 600;margin-top: 9px;color: #656565;">地区
          </div>
          <div style="text-align: center;width: 25%;font-size: 15px;font-weight: 600;margin-top: 9px;color: #cb4000;">确诊
          </div>
          <div style="text-align: center;width: 25%;font-size: 15px;font-weight: 600;margin-top: 9px;color: #a49898;">死亡
          </div>
          <div style="text-align: center;width: 25%;font-size: 15px;font-weight: 600;margin-top: 9px;color: #0c9256;">治愈
          </div>
        </div>
        <div style="height: 32px;margin-top: 4px;background: #fafafa;">
          <div style="display: flex;color: #626262;">
            <div style="text-align: center;width: 25%;font-size: 15px;margin-top: 5px;">{{tableList_sheng.provinceName}}</div>
            <div style="text-align: center;width: 25%;font-size: 15px;margin-top: 5px;">{{tableList_sheng.confirmedCount}}</div>
            <div style="text-align: center;width: 25%;font-size: 15px;margin-top: 5px;">{{tableList_sheng.deadCount}}</div>
            <div style="text-align: center;width: 25%;font-size: 15px;margin-top: 5px;">{{tableList_sheng.curedCount}}</div>
          </div>
          <hr style="background: #e6e6e6;border:0;height:1px;" />
        </div>
        <div style="height: 32px;margin-top: 4px;" v-for="(item,index) in tableList_shi">
          <div style="display: flex;color: #626262;">
            <div style="text-align: center;width: 25%;font-size: 15px;margin-top: 5px;">{{item.cityName}}</div>
            <div style="text-align: center;width: 25%;font-size: 15px;margin-top: 5px;">{{item.diagnosed}}</div>
            <div style="text-align: center;width: 25%;font-size: 15px;margin-top: 5px;">{{item.died}}</div>
            <div style="text-align: center;width: 25%;font-size: 15px;margin-top: 5px;">{{item.cured}}</div>
          </div>
          <hr style="background: #e6e6e6;border:0;height:1px;" />
        </div>
        
      </div>
    </div>
  </div>
  </div>
  </div>


</template>
<script>
  import Vue from "vue";
  import { PullRefresh } from "vant";
  import { httpMethod } from "../../api/getData.js";
  import global_variable from '../../api/global_variable.js';
  import { yqfkyqdtJs } from './yqfkyqdt.js';
  import echarts from "echarts";
  import Qs from 'qs'
  import axios from 'axios'
Vue.prototype.$http = axios
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
        pageSize: 10,
        eqtj: {
          "die": 0,
          "diechange": 0,
          "diagonsis": 0,
          "suspected": 0,
          "diachange": 0,
          "suschange": 0,
          "curechange": 0,
          "cure": 0
        },
        tableList_sheng:{},
        tableList_shi:[],
      };
    },
    mounted() {
      var orderHight1 = document.documentElement.clientHeight;
      var heightlist = orderHight1 - 160;
      $("#yqdt").css("height", heightlist + "px");
      this.getData();

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
      },
      getData: function () {
        var self = this;
        httpMethod
          .getEpidemicData()
          .then(res => {
            var code = res.success;
            if (code == "1") {
              self.eqtj = res.data;
              self.getOneEchars(echarts, myCharts1, res.eqMap);
              self.getTwoEchars(echarts, myCharts2, res.rateData);
              self.getTableData();
            }
          })
      },
      getTableData:function() {
        var self = this;
        axios.get('https://m.look.360.cn/events/feiyan?sv=&version=&market=&device=2&net=4&stype=&scene=&sub_scene=&refer_scene=&refer_subscene=&f=jsonp&location=true&_=1581157051846&callback=jsonp1').then(function(result) {
            // result是所有的返回回来的数据
            // 包括了响应报文行
            // 响应报文头
            // 响应报文体
            var res = JSON.parse(result.substring(7,result.length-2))
            var data = res.data
            data.forEach(element => {
              if(element.city == '山西省'){
                self.tableList_sheng = element.data;
                self.tableList_shi = element.cities;
              }
            });
            console.log(self.tableList_sheng);
            console.log(self.tableList_shi);
        });
      },
      //初始化第一个图表
      getOneEchars: function (echarts, value, data) {
        yqfkyqdtJs.showjmrjsrEchars1(echarts, value, data);
      },
      //初始化第一个图表
      getTwoEchars: function (echarts, value, data) {
        yqfkyqdtJs.showjmrjsrEchars2(echarts, value, data);
      },
    },

  };
</script>

<style socped>

</style>