<template>
  <div class="amap-page-container">

    <div id="centeridv" class="detiles" style="display: ;">
      <img src="../../assets/img/popup-x.png" class="closeimg" @click="closede()" />
      <div class="zbyq">周边疫情</div>
      <div class='zbyqdetile'>您所在<span class="dataclass">{{address}},{{city}}</span>目前已有<span
          class="dataclass">{{numbers}}</span>起新型冠状病毒肺炎确诊病例。确诊病例已收入定点医院救治，只要做好自身防护，无需过分担心。</div>
    </div>

    <div id="fkdivde" class="detiles" style="display: none;" >
      <img src="../../assets/img/popup-x.png" class="closeimg" @click="closede()" />
      <div class="zbyq">防控人员信息</div>
      <div class="yqlineclass">
        <img src="../../assets/img/icon-ysxm.png" class="yqimgclass" />
        <div class="yqtitleclass">姓名</div>
        <div class="yqdetileclass">{{name}}</div>
      </div>
      <div class="yqlineclass" @click="callPhone(phone,$event)">
        <img src="../../assets/img/icon-lxdh.png" class="yqimgclass" />
        <div class="yqtitleclass">联系方式</div>
        <div class="yqdetileclass">{{phone}}</div>
        <img src="../../assets/img/phone_call.png" class="yqimgclass" />
      </div>
      <div class="yqlineclass">
        <img src="../../assets/img/icon-yqdz.png" class="yqimgclass" />
        <div class="yqtitleclass">地址</div>
        <div class="yqdetileclass">{{peoaddress}}</div>
      </div>
    </div>

    <div id="grdivde" class="detiles" style="display: none;" >
      <img src="../../assets/img/popup-x.png" class="closeimg" @click="closede()" />
      <div class="zbyq">感染人员信息</div>
      <div class="yqlineclass">
        <img src="../../assets/img/icon-ysxm.png" class="yqimgclass" />
        <div class="yqtitleclass">姓名</div>
        <div class="yqdetileclass">{{name}}</div>
      </div>
      <div class="yqlineclass">
        <img src="../../assets/img/icon-sfqz.png" class="yqimgclass" />
        <div class="yqtitleclass">是否确诊</div>
        <div class="yqdetileclass">{{isqz}}</div>
      </div>
      <div class="yqlineclass">
        <img src="../../assets/img/icon-yqdz.png" class="yqimgclass" />
        <div class="yqtitleclass">地址</div>
        <div class="yqdetileclass">{{peoaddress}}</div>
      </div>
      <div>
        <div class="yqlineclass">
          <img src="../../assets/img/icon-hdgj.png" class="yqimgclass" />
          <div class="yqtitleclass">活动轨迹</div>
        </div>
        <div class="yqdetileclass">{{peohdgj}}</div>
      </div>
    </div>

    <div id="grfh" style="width: 100%; display: flex;position: absolute;top: 50px; z-index: 1;">
      <div id="grdiv" class="yqfkselect" style="margin-left: 20%;border-radius:4px 0 0 4px;">
        <img id="grdimg" :src="img1" class="selimg" />
        感染人员
      </div>
      <div id="fkdiv" class="yqfknoselect" style="border-radius:0 4px 4px 0;">
        <img id="fkimg" :src="img2" class="selimg" />
        防控人员
      </div>
    </div>
    <el-amap ref="map" id="mapid" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom"
      :features="features">
      <el-amap-marker v-for="(marker, index) in markers" :key="index" :position="marker.position"
        :template="marker.template" :vid="index" :content="marker.content" :events="marker.events"></el-amap-marker>
        <el-amap-circle v-for="(circle,index) in circles" :key="index" 
        :center="circle.center" :radius="circle.radius" :fill-opacity="circle.fillOpacity" 
        :fill-color="circle.fillColor" :stroke-weight="circle.strokeWeight" :stroke-color="circle.strokeColor"
        ></el-amap-circle>
    
    </el-amap>
  </div>
</template>

<script>
  import Vue from "vue";
  import { httpMethod } from "../../api/getData.js";
  import VueAMap from "vue-amap";
  import dd from "dingtalk-jsapi";
  import $ from "jquery";
  Vue.use(VueAMap);
  VueAMap.initAMapApiLoader({
    key: "4f77ad005164acbf55e904ed14bf8660",
    plugin: [
      "AMap.Autocomplete",
      "AMap.PlaceSearch",
      "AMap.Scale",
      "AMap.OverView",
      "AMap.ToolBar",
      "AMap.MapType",
      "AMap.PolyEditor",
      "AMap.CircleEditor"
    ],
    v: "1.4.4"
  });
  let amapManager = new VueAMap.AMapManager();
  export default {
    name: "homevue",
    data() {
      return {
        name: 'xxx',
        isqz: '疑似',
        phone: '13620614683',
        img1: require("../../assets/img/grsle.png"),
        img2: require("../../assets/img/fhnosel.png"),
        address: 'xx市',
        peoaddress: 'xx市',
        peohdgj: 'xx市',
        city:'xx市',
        numbers: 'xx',
        show: true,
        date: "2019-10",
        amapManager,
        iswxshow: false,
        features: ["point"],
        // center: [112.75276, 37.6879],
        center: [112.1762730000, 37.1895590000],
        zoom: 12,
        resizeEnable: true,
        events: {
          'moveend': () => {
          },
          'zoomchange': () => {
          },
          'click': (e) => {

          }
        },
        defaultLayer: null,
        map: null,
        markers: [],
        tableList_shi:[],
        mcircle:null,
        circles:[]         
      };
    },
    mounted() {
      var _this = this;
      // 设置地图高度
      var orderHight1 = document.documentElement.clientHeight;
      var heightlist = orderHight1-45;
      $("#mapid").css("height", heightlist + "px");

      $("#grfh div").click(function () {
        if ($(this).hasClass("yqfknoselect")) {
          $(this).removeClass("yqfknoselect");
          $(this).addClass("yqfkselect");
          if ($(this).attr("id") == "grdiv") {
            _this.img1 = require("../../assets/img/grsle.png");
            _this.img2 = require("../../assets/img/fhnosel.png");
            $('#fkdiv').removeClass('yqfkselect');
            $('#fkdiv').addClass('yqfknoselect');
            _this.getEpidemicPersonnels();
            $('#grdivde').css('display', 'none');
            $('#centeridv').css('display', 'none');
            $('#fkdivde').css('display', 'none');
          } else {
            _this.img1 = require("../../assets/img/grnosel.png");
            _this.img2 = require("../../assets/img/fhsel.png");
            $('#grdiv').removeClass('yqfkselect');
            $('#grdiv').addClass('yqfknoselect');
            _this.getControlPersonnels();
            $('#grdivde').css('display', 'none');
            $('#centeridv').css('display', 'none');
            $('#fkdivde').css('display', 'none');
          }
        }
      });

      _this.getData();
      _this.gojq();
      //  获取点位信息
      _this.getEpidemicPersonnels();
    },
    methods: {
      closede: function () {
        $('#grdivde').css('display', 'none');
        $('#centeridv').css('display', 'none');
        $('#fkdivde').css('display', 'none');
      },
      getData: function () {
        var self = this;
        httpMethod
          .getEqDetail()
          .then(res => {
            var code = res.success;
            if (code == "1") {
              var data = JSON.parse(res.data).data;
              data.forEach(element => {
                if (element.city == '山西省') {
                  self.tableList_shi = element.cities;
                }
              });
            }
            console.log(self.tableList_sheng);
            console.log(self.tableList_shi);
          });
      },
      callPhone: function (phone, event) {
        window.location.href = "tel://" + phone;
        event.stopPropagation();
      },
      gojq: function () {
        var _this = this;
        var currentUrl = window.location.href; //当前页面地址
        var number = currentUrl.indexOf("#");
        currentUrl = currentUrl.substring(0, number);
        console.log(currentUrl);
        var params = {
          currentUrl: currentUrl
        };

        httpMethod
          .getConfig(params)
          .then(res => {
            if (res.success == "1") {
              var data = JSON.parse(res.config);
              this.corpId = data.corpId;
              dd.ready(function () {
                dd.config({
                  agentId: data.agentId,
                  corpId: data.corpId,
                  timeStamp: data.timeStamp,
                  nonceStr: data.nonceStr,
                  signature: data.signature,
                  jsApiList: [
                    "runtime.info",
                    "biz.contact.choose",
                    "device.notification.confirm",
                    "device.notification.alert",
                    "device.notification.prompt",
                    "biz.ding.post",
                    "biz.util.openLink",
                    "device.audio",
                    "device.audio.startRecord",
                    "device.audio.stopRecord",
                    "device.audio.translateVoice",
                    "biz.ding.create",
                    "biz.telephone.call",
                    "biz.contact.complexPicker",
                    "biz.util.open",
                    "biz.chat.open",
                    "biz.chat.pickConversation",
                    "biz.user.get",
                    "biz.util.uploadImage",
                    "biz.chat.openSingleChat",
                    "biz.ding.create",
                    "biz.chat.toConversation",
                    "device.geolocation.get",
                    "biz.map.locate"
                  ]
                });
                dd.error(function (error) {
                  alert("dd error: " + JSON.stringify(error));
                });
              });
            } else if (res.success == "0") {
              this.error = true;
            }
          })
          .catch(err => {
            this.$toast(err);
          });
      },

      //
      getEpidemicPersonnels: function () {
        var _this = this;
        if(_this.$parent.grrydata){
            _this.drawGRRPoints(_this.$parent.grrydata);
        }else{
        var params = {
        };
        httpMethod
          .getEpidemicPersonnels(params)
          .then(res => {
            console.log(res);
            if (res.success == "1") {
              _this.$parent.grrydata = res;
              _this.drawGRRPoints(res);
            }
          })
          .catch(err => { });
        }
      },
      drawGRRPoints:function(res){
              var _this = this;
              var markers = [];
              var path1 = require("../../assets/img/grnosel.png");
              for (let i = 0; i < res.data.length; i++) {
                if (
                  res.data[i].longitude != null &&
                  res.data[i].latitude != null &&
                  res.data[i].longitude != "" &&
                  res.data[i].latitude != ""
                )
                  markers.push({
                    position: [res.data[i].longitude, res.data[i].latitude],
                    template:
                      "<div  style='height:30px'><img src='" +
                      path1 +
                      "' style='height:30px'></div>",
                    events: {
                      click: (e) => {
                        _this.name = res.data[i].name + " " + res.data[i].sex + " " + res.data[i].age + "岁";
                        _this.isqz = res.data[i].persontype;
                        _this.peoaddress = res.data[i].address;
                        _this.peohdgj = res.data[i].activity_track;
                        $('#grdivde').css('display', '');
                        $('#centeridv').css('display', 'none');
                        $('#fkdivde').css('display', 'none');

                      }
                    }
                  });
              }

              // //获取定位中心点
              // var path = require("../../assets/img/icon-po.png");
              // var centerpo = {
              //   position: _this.center,
              //   template:
              //     "<div  style='height:30px;margin-left:-10px;margin-top:15px'><img src='" +
              //     path +
              //     "' style='height:30px'></div>",
              // };
              // markers.push(centerpo);
              // _this.markers = markers;
              // //添加范围圈
              // if (_this.map == null) {
              //   _this.map = amapManager.getMap();
              // }
              // var circle1 = new AMap.Circle({
              //   center: _this.center,
              //   radius: 2000,
              //   fillColor: "#17c5e4 ",
              //   strokeWeight: 1,
              //   strokeColor: "white",
              //   fillOpacity: 0.4
              // });
              // _this.map.add(circle1);
              // _this.map.setFitView();

              // var m1 = new AMap.Marker({
              //   map: _this.map,
              //   draggable: true,
              //   position: new AMap.LngLat(116.368904, 39.923423)
              // });
              // var m2 = new AMap.Marker({
              //   map: _this.map,
              //   draggable: true,
              //   position: new AMap.LngLat(116.387271, 39.922501)
              // });
              // var p1 = m1.getPosition();
              // var p2 = m2.getPosition();
              // var textPos = p1.divideBy(2).add(p2.divideBy(2));
              // var distance = Math.round(p1.distance(p2));
              // console.log(distance);

              dd.ready(function () {
                // 获取定位信息
                // dd.device.geolocation.get({
                //   targetAccuracy: 2000,
                //   coordinate: 1,
                //   withReGeocode: false,
                //   useCache: true, //默认是true，如果需要频繁获取地理位置，请设置false
                //   onSuccess: function (result) {

                //   },
                //   onFail: function (err) {
                //     // alert("dd定位 error: " + JSON.stringify(err));
                //   }
                // });
                if(!_this.$parent.localmarker)
                dd.biz.map.locate({
                  onSuccess: function (result1) {
                    console.log(JSON.stringify(result1));
                    _this.address = result1.province + result1.city + result1.adName;
                    for(var i=0;i<_this.tableList_shi.length;i++){
                      if(_this.tableList_shi[i].cityName==result1.city){
                        _this.numbers=_this.tableList_shi[i].diagnosed;
                        _this.city=result1.city;
                      }
                    }
                    _this.center = [result1.longitude, result1.latitude];
                    var path = require("../../assets/img/icon-po.png");
                    _this.$parent.localmarker = {
                      position: [result1.longitude, result1.latitude],
                      template:
                        "<div  style='height:30px;margin-top:15px;margin-left:-5px;'><img src='" +
                        path +
                        "' style='height:30px'></div>"
                    }
                    markers.push(_this.$parent.localmarker);

                    if (_this.map == null) {
                      _this.map = amapManager.getMap();
                    }
                    // _this.map.remove(_this.map.getAllOverlays('polygon'));
                    // _this.map.clearMap();
                    // var mcircle = new AMap.Circle({
                    //   center: _this.center,
                    //   radius: 2000,
                    //   fillColor: "#17c5e4 ",
                    //   strokeWeight: 1,
                    //   strokeColor: "white",
                    //   fillOpacity: 0.4
                    // });
                    // _this.map.add(mcircle);
                    // _this.map.setFitView();
                      var circle = {
                        center: _this.center,
                        radius: 2000,
                        fillColor: "#17c5e4 ",
                        strokeWeight: 1,
                        strokeColor: "white",
                        fillOpacity: 0.4
                      }
                    _this.circles=[circle]; 
                    _this.markers = markers;
                    $('#centeridv').css('display', '');

                  },
                  onFail: function (err1) {
                    console.log(JSON.stringify(err1));
                  }
                });
                else{
                  markers.push(_this.$parent.localmarker);
                  _this.markers = markers;
                }
              });
      },
      getControlPersonnels: function () {
        var _this = this;
        if(_this.$parent.fkrydata){
            _this.drawFKRPoints(_this.$parent.fkrydata);
        }else{
        var params = {
        };
        httpMethod
          .getControlPersonnels(params)
          .then(res => {
            console.log(res);
            if (res.success == "1") {
              _this.$parent.fkrydata = res;
              _this.drawFKRPoints(res);
            }
          })
          .catch(err => { });
        }
      },
      drawFKRPoints:function(res){
              var _this = this;
              if (_this.map == null) {
                  _this.map = amapManager.getMap();
                }
                // _this.circles=[];
              // _this.map.clearMap();
              var markers = [];
              var path1 = require("../../assets/img/fhnosel.png");
              for (let i = 0; i < res.data.length; i++) {
                if (
                  res.data[i].longitude != null &&
                  res.data[i].latitude != null &&
                  res.data[i].longitude != "" &&
                  res.data[i].latitude != ""
                )
                  markers.push({
                    position: [res.data[i].longitude, res.data[i].latitude],
                    template:
                      "<div  style='height:30px'><img src='" +
                      path1 +
                      "' style='height:30px'></div>",
                    events: {
                      click: (e) => {
                        _this.name = res.data[i].name;
                        _this.phone = res.data[i].phone;
                        _this.peoaddress = res.data[i].address;
                        $('#grdivde').css('display', 'none');
                        $('#centeridv').css('display', 'none');
                        $('#fkdivde').css('display', '');
                      }
                    }
                  });
              }
              if(_this.$parent.localmarker)
              markers.push(_this.$parent.localmarker);
              _this.markers = markers;
      },
      setMapFeatures() {
        if (this.map == null) {
          this.map = amapManager.getMap();
        }
        var features = [];
        var inputs = document.querySelectorAll(".tc");
        inputs.forEach(function (input) {
          if (input.checked) {
            features.push(input.value);
          }
        });
        console.log(features);
        this.map.setFeatures(features);
      }
    }
  };
</script>
<style socped>
  .detiles {
    width: 100%;
    padding: 10px;
    background-color: #ecf6ff;
    position: absolute;
    border-radius: 5px 5px 0 0;
    bottom: 0;
    z-index: 161;
  }

  .zbyq {
    color: #333333;
    font-size: 15px;
    font-weight: bold;
  }

  .zbyqdetile {
    color: #333333;
    font-size: 12px;
    width: 90%;
  }

  .dataclass {
    color: #ad6800;
    font-size: 15px;
    font-weight: bold;
  }

  .yqfkselect {
    display: flex;
    color: #ffffff;
    font-size: 15px;
    text-align: center;
    background-color: #3098fe;
    width: 30%;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
  }

  .yqfknoselect {
    width: 30%;
    display: flex;
    color: #333333;
    font-size: 15px;
    text-align: center;
    background-color: #ffffff;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
  }

  .selimg {
    height: 20px;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .yqimgclass {
    margin-left: 10px;
    height: 20px;
  }

  .yqtitleclass {
    font-size: 14px;
    color: #333333;
    margin-left: 10px;
  }

  .yqdetileclass {
    font-size: 14px;
    color: #999999;
    margin-left: 10px;
    margin-right: 10px;
  }

  .yqlineclass {
    display: flex;
    margin-top: 10px;
  }

  .closeimg {
    position: absolute;
    height: 30px;
    right: 30px;
    top: 0px;
  }
</style>