<template>
  <v-container fluid style="overflow-y: scroll">
    <v-row>
      <v-col cols="12" style="padding-bottom: 0px">
        <h2 style="display: inline-block">
          {{ stockCode }}|{{ stockName }}
          <v-chip
            color="#6790A8"
            dark
            small
            style="margin-right: 15px"
            v-for="(race, index) in raceList"
            v-bind:key="race + index"
            >{{ race }}</v-chip
          >
        </h2>
        <strong style="font-size: 1.1em">[{{ industry }}]</strong>
      </v-col>
    </v-row>
    <!-- 雷达图 -->
    <v-row>
      <v-col cols="4">
        <v-hover>
          <template v-slot="{ hover }">
            <v-card :elevation="hover ? 6 : 2" style="border-radius: 5px">
              <v-card-title>得分分布</v-card-title>
              <v-card-text>
                <div id="radarContainer"></div>
                <div style="margin-top: -18px">
                  基本面：{{ scoreData[0] }} | 技术面：{{ scoreData[1] }} |
                  催化剂:{{ scoreData[2] }}
                </div>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
      <v-col cols="8" style="padding-left: 0px">
        <v-hover>
          <template v-slot="{ hover }">
            <v-card
              ref="detailCard"
              :elevation="hover ? 6 : 2"
              style="border-radius: 5px"
            >
              <v-card-title style="margin-bottom: 2px">近期详情</v-card-title>
              <v-card-text>
                <v-card
                  style="
                    width: 200px;
                    margin-right: 8px;
                    display: inline-block;
                    vertical-align: top;
                    margin-top: 8px;
                  "
                  color="#ffe8c6"
                >
                  <v-card-title class="subheading font-weight-bold"
                    >基本</v-card-title
                  >
                  <v-divider></v-divider>
                  <div class="detail-container">
                    <div class="detial-item">
                      <span>1Day涨跌幅</span>
                      <span
                        :style="
                          stockInfo.day_chg > 0
                            ? 'font-weight:700;color:red;'
                            : 'font-weight:700;color:green;'
                        "
                        >{{ (stockInfo.day_chg * 100).toFixed(2) + "%" }}</span
                      >
                    </div>

                    <div class="detial-item">
                      <span>5Day涨跌幅</span>
                      <span
                        :style="
                          stockInfo.five_chg > 0
                            ? 'font-weight:700;color:red;'
                            : 'font-weight:700;color:green;'
                        "
                        >{{ (stockInfo.five_chg * 100).toFixed(2) + "%" }}</span
                      >
                    </div>

                    <div class="detial-item">
                      <span>30Day涨跌幅</span>
                      <span
                        :style="
                          stockInfo.month_chg > 0
                            ? 'font-weight:700;color:red;'
                            : 'font-weight:700;color:green;'
                        "
                        >{{
                          (stockInfo.month_chg * 100).toFixed(2) + "%"
                        }}</span
                      >
                    </div>

                    <div class="detial-item">
                      <span>当日量比</span>
                      <span>{{ stockInfo.vol_ratio }}</span>
                    </div>
                    <div class="detial-item">
                      <span>当日成交额(亿):</span>
                      <span>{{ (stockInfo.amt / 100000000).toFixed(2) }}</span>
                    </div>
                    <div class="detial-item">
                      <span>总市值(亿元):</span>
                      <span>{{ (stockInfo.ev / 100000000).toFixed(2) }}</span>
                    </div>
                    <div class="detial-item">
                      <span>市净率:</span>
                      <span>{{ stockInfo.pb }}</span>
                    </div>
                    <div class="detial-item">
                      <span>市盈率:</span>
                      <span>{{ stockInfo.pe }}</span>
                    </div>
                  </div>
                </v-card>

                <v-card
                  style="
                    width: 200px;
                    margin-right: 8px;
                    display: inline-block;
                    margin-top: 8px;
                  "
                  color="#ffe8c6"
                >
                  <v-card-title class="subheading font-weight-bold"
                    >{{ forecastData.ylycYear }}预测</v-card-title
                  >
                  <v-divider></v-divider>
                  <div class="detail-container">
                    <div class="detial-item">
                      <span>PE:</span>
                      <span>{{
                        forecastData.estpe_FY1 === "0"
                          ? "暂无"
                          : forecastData.estpe_FY1
                      }}</span>
                    </div>

                    <div class="detial-item">
                      <span>EPS:</span>
                      <span>{{
                        forecastData.west_eps_FY1 === "0"
                          ? "暂无"
                          : forecastData.west_eps_FY1
                      }}</span>
                    </div>

                    <div class="detial-item">
                      <span>净利润(亿):</span>
                      <span>{{
                        forecastData.west_netprofit_FY1 === "0"
                          ? "暂无"
                          : (
                              forecastData.west_netprofit_FY1 / 100000000
                            ).toFixed(2)
                      }}</span>
                    </div>

                    <div class="detial-item">
                      <span>营业收入(亿):</span>
                      <span>{{
                        forecastData.west_sales_FY1 === "0"
                          ? "暂无"
                          : (forecastData.west_sales_FY1 / 100000000).toFixed(2)
                      }}</span>
                    </div>
                  </div>
                </v-card>

                <v-card
                  color="#ffe8c6"
                  style="
                    width: 200px;
                    margin-right: 8px;
                    display: inline-block;
                    margin-top: 8px;
                  "
                >
                  <v-card-title class="subheading font-weight-bold"
                    >{{ forecastData.secondYear }}预测</v-card-title
                  >
                  <v-divider></v-divider>
                  <div class="detail-container">
                    <div class="detial-item">
                      <span>PE:</span>
                      <span>{{
                        forecastData.estpe_FY2 === "0"
                          ? "暂无"
                          : forecastData.estpe_FY2
                      }}</span>
                    </div>
                    <div class="detial-item">
                      <span>EPS:</span>
                      <span>{{
                        forecastData.west_eps_FY2 === "0"
                          ? "暂无"
                          : forecastData.west_eps_FY2
                      }}</span>
                    </div>
                    <div class="detial-item">
                      <span>净利润(亿):</span>
                      <span>{{
                        forecastData.west_netprofit_FY2 === "0"
                          ? "暂无"
                          : (
                              forecastData.west_netprofit_FY2 / 100000000
                            ).toFixed(2)
                      }}</span>
                    </div>
                    <div class="detial-item">
                      <span>营业收入(亿):</span>
                      <span>{{
                        forecastData.west_sales_FY2 === "0"
                          ? "暂无"
                          : (forecastData.west_sales_FY2 / 100000000).toFixed(2)
                      }}</span>
                    </div>
                  </div>
                </v-card>

                <v-card
                  color="#ffe8c6"
                  style="
                    width: 200px;
                    margin-right: 8px;
                    display: inline-block;
                    margin-top: 8px;
                  "
                >
                  <v-card-title class="subheading font-weight-bold"
                    >{{ forecastData.thirdYear }}预测</v-card-title
                  >
                  <v-divider></v-divider>
                  <div class="detail-container">
                    <div class="detial-item">
                      <span>PE:</span>
                      <span>{{
                        forecastData.estpe_FY3 === "0"
                          ? "暂无"
                          : forecastData.estpe_FY3
                      }}</span>
                    </div>

                    <div class="detial-item">
                      <span>EPS:</span>
                      <span>{{
                        forecastData.west_eps_FY3 === "0"
                          ? "暂无"
                          : forecastData.west_eps_FY3
                      }}</span>
                    </div>

                    <div class="detial-item">
                      <span>净利润(亿):</span>
                      <span>{{
                        forecastData.west_netprofit_FY3 === "0"
                          ? "暂无"
                          : (
                              forecastData.west_netprofit_FY3 / 100000000
                            ).toFixed(2)
                      }}</span>
                    </div>

                    <div class="detial-item">
                      <span>营业收入(亿):</span>
                      <span>{{
                        forecastData.west_sales_FY3 === "0"
                          ? "暂无"
                          : (forecastData.west_sales_FY3 / 100000000).toFixed(2)
                      }}</span>
                    </div>
                  </div>
                </v-card>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-hover>
          <template v-slot="{ hover }">
            <v-card
              :elevation="hover ? 6 : 2"
              style="border-radius: 5px; margin-top: -12px"
            >
              <v-card-title>因子得分
            <v-spacer></v-spacer>
                <v-btn text dense @click="gotoRating" 
                ><v-icon small>launch</v-icon><span style="text-decoration: underline">去打分</span></v-btn
              >
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="3" style="padding-bottom: 0px">
                    <v-card
                      dark
                      color="primary"
                      style="
                        max-height: 400px;
                        overflow-y: scroll;
                        border-radius: 8px;
                      "
                    >
                      <v-list dense color="primary">
                        <v-list-item-group
                          dark
                          dense
                          v-model="selectedFactors"
                          active-class="secondary--text"
                          multiple
                        >
                          <template v-for="(factor, index) in factorList">
                            <v-list-item dense :key="index">
                              <v-list-item-content>
                                <v-list-item-title>{{
                                  factor.factorName + " | " + factor.score
                                }}</v-list-item-title>
                                <v-list-item-subtitle
                                  v-text="factor.ratingReason"
                                ></v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                            <v-divider
                              v-if="index < factorList.length - 1"
                              :key="index + '1'"
                            ></v-divider>
                          </template>
                        </v-list-item-group>
                      </v-list>
                    </v-card>
                  </v-col>
                  <v-col cols="9" style="padding-bottom: 0px">
                    <v-row style="margin-top: -16px">
                      <v-col cols="2">
                        <v-menu
                          v-model="menuForStartDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="startDate"
                              label="开始时间"
                              prepend-icon="event"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              single-line
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="startDate"
                            @change="clickFactor"
                            @input="menuForStartDate = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="2">
                        <v-menu
                          v-model="menuForEndDate"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="endDate"
                              label="结束时间"
                              prepend-icon="event"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              single-line
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="endDate"
                            @change="clickFactor"
                            @input="menuForEndDate = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="3">
                        <v-btn
                          text
                          @click="setPeriod(3)"
                          dense
                          style="margin-top: 15px"
                          ><span style="text-decoration: underline"
                            >三个月</span
                          ></v-btn
                        >
                        <v-btn
                          text
                          @click="setPeriod(6)"
                          dense
                          style="margin-top: 15px"
                          ><span style="text-decoration: underline"
                            >半年</span
                          ></v-btn
                        >
                        <v-btn
                          text
                          @click="setPeriod(12)"
                          dense
                          style="margin-top: 15px"
                          ><span style="text-decoration: underline"
                            >一年</span
                          ></v-btn
                        >
                      </v-col>
                    </v-row>
                    <div
                      style="width: 100%; height: 320px"
                      id="lineContainer"
                    ></div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>

    <v-hover>
      <template v-slot="{ hover }">
        <v-card :elevation="hover ? 6 : 2" style="border-radius: 5px">
          <v-card-title>PE Band</v-card-title>
          <v-card-text>
            <v-row style="margin-top: -16px">
              <v-col cols="2">
                <div style="width: 140px">
                  <v-menu
                    v-model="menuForStartDate2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    width="144px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="startDatePE"
                        label="开始时间"
                        prepend-icon="event"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        single-line
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="startDatePE"
                      @change="getPePbBand"
                      @input="menuForStartDate2 = false"
                    ></v-date-picker>
                  </v-menu>
                </div>
              </v-col>

              <v-col cols="2">
                <div style="width: 140px">
                  <v-menu
                    v-model="menuForEndDate2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="endDatePE"
                        label="结束时间"
                        prepend-icon="event"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        single-line
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="endDatePE"
                      @change="getPePbBand"
                      @input="menuForEndDate2 = false"
                    ></v-date-picker>
                  </v-menu>
                </div>
              </v-col>
              <v-col cols="4">
                <v-btn
                  text
                  @click="setPeriodPE(3)"
                  dense
                  style="margin-top: 15px"
                  ><span style="text-decoration: underline">3Y</span></v-btn
                >
                <v-btn
                  text
                  @click="setPeriodPE(5)"
                  dense
                  style="margin-top: 15px"
                  ><span style="text-decoration: underline">5Y</span></v-btn
                >
                <v-btn
                  text
                  @click="setPeriodPE(10)"
                  dense
                  style="margin-top: 15px"
                  ><span style="text-decoration: underline">10Y</span></v-btn
                >
                <v-btn
                  text
                  @click="setPeriodPE(20)"
                  dense
                  style="margin-top: 15px"
                  ><span style="text-decoration: underline">20Y</span></v-btn
                >
              </v-col>

              <v-col cols="2">
                <v-radio-group
                  v-model="isPEorPB"
                  dense
                  style="flex-direction: row"
                  @change="getPePbBand"
                >
                  <v-radio
                    label="PE"
                    value="pe_ttm"
                    style="margin-bottom: 0px; margin-right: 8px"
                  ></v-radio>
                  <v-radio label="PB" value="pb_lf"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="1"> </v-col>
            </v-row>
            <div
              style="width: 100%; height: 320px"
              id="PeBandChartContainer"
            ></div>
          </v-card-text>
        </v-card>
      </template>
    </v-hover>

    <v-icon
      style="position: absolute; z-index: 5; top: 30px; right: 20px"
      @click="goBack"
      >keyboard_backspace</v-icon
    >
  </v-container>
</template>

<script>
// import sessionUtil from "../util/SessionStorage";
import commonDataInterface from "../data/commonData";
import dataInterface from "../data/stockDetailData";
import "echarts/lib/chart/radar"; // 引入雷达图
import "echarts/lib/chart/lines"; // 引入折线图
import notice from "../util/Notice";
import moment from "moment";

export default {
  name: "StockDetail",
  components: {},
  data: () => ({
    raceList: [],
    stockCode: "",
    stockName: "",
    stockInfo: {}, // 通过路由传过来的一些股票基本数据
    infoCardWidth: "",
    factorList: [],
    menuForStartDate: false,
    startDate: "",
    menuForEndDate: false,
    endDate: "",
    controlClickFactor: 0, // 用来控制clickFactor方法不会被重复调用
    controlClickFactor2: 0,
    forecastData: {},
    industry: "",
    xAxisData: [],
    seriesData: [],
    menuForStartDate2: false,
    menuForEndDate2: false,
    selectedFactors: [],
    startDatePE: "",
    endDatePE: "",
    isPEorPB: "pe_ttm",
    scoreData: {},
  }),
  mounted() {
    // 获取股票Code和Name
    if (!this.$route.params.stockCode) {
      notice.setNotice("error", "没有指定特定股票，已经返回上一页。");
      this.$router.back();
    }
    // 处理路由传过来的参数
    this.stockCode = this.$route.params.stockCode;
    this.stockName = this.$route.params.stockName;
    this.industry = this.$route.params.industry;
    this.stockInfo.day_chg = this.$route.params.day_chg;
    this.stockInfo.five_chg = this.$route.params.five_chg;
    this.stockInfo.month_chg = this.$route.params.month_chg;
    this.stockInfo.vol_ratio = this.$route.params.vol_ratio;
    this.stockInfo.amt = this.$route.params.amt;
    this.stockInfo.ev = this.$route.params.ev;
    this.stockInfo.pe = this.$route.params.pe;
    this.stockInfo.pb = this.$route.params.pb;

    this.getQuadrantsRate(); // 查询四个象限总分
    this.getRaceList();
    this.getFators();
    // 设置历史数据的默认时间
    this.setPeriod(1); // 初始为一个月。
    this.setPeriodPE(3); // 设置PE Band初始时间段为3年。
    this.getWindForecast();
    this.infoCardWidth = this.$refs.detailCard.$el.offsetWidth;
  },
  methods: {
    // 获取所有赛道
    getRaceList() {
      var _self = this;
      commonDataInterface
        .getStocksByKey({ key: this.stockCode })
        .then((res) => {
          if (res.list.length > 0) {
            if (res.list[0].raceName) {
              _self.raceList = res.list[0].raceName.split(",");
            }
          }
        });
    },
    // 绘制雷达图
    initRadar(radarData) {
      var dom = document.getElementById("radarContainer");
      var myChart = this.$echarts.init(dom);
      //   var app = {};
      var option = {
        // title: {
        //   text: "基础雷达图"
        // },
        grid: {
          left: "8",
          right: "8",
          bottom: "8",
          containLabel: true,
        },
        tooltip: {},
        // legend: {
        //   data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"]
        // },
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          indicator: [
            { name: "基本面", max: 100 },
            { name: "技术面", max: 100 },
            { name: "催化剂", max: 100 },
            // { name: "OTC", max: 100 },
          ],
        },
        series: [
          {
            type: "radar",
            data: radarData,
          },
        ],
      };
      myChart.setOption(option, true);
    },
    getFators() {
      let _self = this;
      commonDataInterface
        .getFacByStkCode({
          stockCode: this.stockCode,
          // userId: sessionUtil.getSessionStorage("userid"),
        })
        .then((res) => {
          if (res.list.length > 0) {
            res.list.forEach((e) => {
              e.isSelect = false;
            });
            res.list[0].isSelect = true; // 默认选中第一个
            let temp = res.list.filter((e) => e.categoryPid !== "12");
            temp.push({
              factorId: "4",
              factorName: "交易因子(综合)",
              score: "",
              ratingReason: "系统评分",
              isSelect: false,
            });
            _self.factorList = temp;
            _self.selectedFactors = [0];
          }
        });
    },
    // 点击因子获取因子历史评分数据。已经获取了的，点击设为取消。
    // getJyScoreHis
    clickFactor() {
      // if (this.controlClickFactor > 0) {
      //   return;
      // }
      // this.controlClickFactor++;
      let factorsToChart = [];
      this.selectedFactors.forEach((e) => {
        factorsToChart.push(this.factorList[e]);
      });
      let factorIdList = [];
      factorsToChart.forEach((e) => {
        if (e.factorId !== "4") {
          factorIdList.push(e.factorId);
        } else if (e.factorId === "4") {
          // 如果有点击交易因子，调用专门的交易因子历史获取方法。
          this.getJyScoreHis();
        }
      });
      this.xAxisData = [];
      this.seriesData = [];
      if (factorIdList.length < 1) {
        this.controlClickFactor = 0;
        return;
      }
      let _self = this;
      dataInterface
        .getStockFacHis({
          factorList: factorIdList,
          stockCode: this.stockCode,
          startD: this.startDate,
          endD: this.endDate,
        })
        .then((res) => {
          _self.controlClickFactor = 0;
          let dataMap = res.list;
          let series = [];
          let xAxix = [];
          for (let key in dataMap) {
            let line = { type: "line" };
            line.name = key;
            line.data = [];
            // 处理折线数据
            dataMap[key].forEach((e) => {
              line.data.push(e.score);
            });
            // 处理日期轴数据
            if (xAxix.length < 1) {
              dataMap[key].forEach((e) => {
              xAxix.push(e.tdate);
            });
            }
            series.push(line);
          }
          console.log(xAxix);
          if (_self.xAxisData.length < 1) {
            xAxix = [...new Set(xAxix)];
            let tempXAxix = _self.xAxisData.concat(xAxix);
            _self.xAxisData = [...new Set(tempXAxix)];
            _self.xAxisData = tempXAxix;
          }
          _self.seriesData = _self.seriesData.concat(series);
          if (_self.controlClickFactor2 === 0) {
            _self.showLine();
          }
        });
    },
    // 单独获取交易历史记录
    getJyScoreHis() {
      this.controlClickFactor2++;
      let _self = this;
      dataInterface
        .getJyScoreHis({
          stockCode: this.stockCode,
          startD: this.startDate,
          endD: this.endDate,
        })
        .then((res) => {
          this.controlClickFactor2 = 0;
          let dataMap = res.list;
          let series = [];
          let xAxix = [];
          for (let key in dataMap) {
            let line = { type: "line" };
            line.name = key;
            line.data = [];
            dataMap[key].forEach((e) => {
              line.data.push(e.score);
              xAxix.push(e.tdate);
            });
            series.push(line);
          }
          xAxix = [...new Set(xAxix)];
          // let tempXAxix = _self.xAxisData.concat(xAxix);
          // _self.xAxisData = [...new Set(tempXAxix)];
          _self.xAxisData = xAxix;
          _self.seriesData = _self.seriesData.concat(series);
          if (_self.controlClickFactor === 0) {
            _self.showLine();
          }
        });
    },
    showLine() {
      var dom = document.getElementById("lineContainer");
      var myChart = this.$echarts.init(dom);
      //   var app = {};
      var option = {
        title: {
          text: "多因子得分走势",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["夏普得分", "现金流"],
          bottom: "20px",
        },
        grid: {
          left: "8",
          right: "8",
          bottom: "8",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
          right: "50px",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xAxisData,
        },
        yAxis: {
          type: "value",
        },
        series: this.seriesData,
      };
      myChart.setOption(option, true);
    },
    // 退回到前面一页
    goBack() {
      this.$router.back();
    },
    // 设置历史查询时间区间
    setPeriod(months) {
      this.endDate = moment().format("YYYY-MM-DD");
      this.startDate = moment().subtract(months, "months").format("YYYY-MM-DD");
      this.clickFactor();
    },
    // 查询四个象限总分
    getQuadrantsRate() {
      var _self = this;
      dataInterface
        .getQuadrantsRate({ stockCode: this.stockCode })
        .then((res) => {
          let scoreData = [];
          res.list.forEach((e) => {
            if (e.xxName === "交易") {
              scoreData.push(e.sumJy);
            } else {
              scoreData.push(e.sumScore);
            }
          });
          _self.initRadar([
            {
              value: scoreData,
              name: this.stockCode + " | " + this.stockName,
            },
          ]);
          this.scoreData = scoreData;
        });
    },
    // 获取万得预测
    getWindForecast() {
      var _self = this;
      dataInterface
        .getWindForecast({ stockCode: this.stockCode })
        .then((res) => {
          _self.forecastData = res.ylyc;
        });
    },
    getPePbBand() {
      var _self = this;
      dataInterface
        .getPePbBand({
          stockCode: this.stockCode,
          startD: this.startDatePE,
          endD: this.endDatePE,
          bandType: this.isPEorPB,
        })
        .then((res) => {
          _self.drawPeBandChart(res);
        });
    },
    setPeriodPE(num) {
      this.endDatePE = moment().format("YYYY-MM-DD");
      this.startDatePE = moment().subtract(num, "years").format("YYYY-MM-DD");
      this.getPePbBand();
    },
    // 绘制PE Band Chart 图形。
    drawPeBandChart(data) {
      data.peDates.forEach((e) => {
        e.showSymbol = false;
        if (e.name === "股价") {
          e.color = "#f9aa33";
        } else {
          e.color = "#344955";
        }
      });
      var dom = document.getElementById("PeBandChartContainer");
      var myChart = this.$echarts.init(dom);
      var option = {
        title: {
          text: "橙色线条为股价，蓝灰色线条为PE Band。",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
        },
        // legend: {
        //   data: ["夏普得分", "现金流"],
        //   bottom: "20px",
        // },
        grid: {
          left: "8",
          right: "8",
          bottom: "8",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
          right: "50px",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: data.tradedate,
        },
        yAxis: {
          type: "value",
          min: function (value) {
            //取最小值向下取整为最小刻度
            return Math.floor(value.min);
          },
          max: function (value) {
            //取最大值向上取整为最大刻度
            return Math.ceil(value.max);
          },
        },
        series: data.peDates,
      };
      myChart.setOption(option, true);
    },
    gotoRating() {
      this.$router.push({
        name: "stockRating",
        params: {
          stockCode: this.stockCode,
        },
      });
    },
  },
  computed: {},
  watch: {
    // 监视选择的
    selectedFactors() {
      this.clickFactor();
    },
  },
};
</script>
<style>
.v-label {
  font-size: 14px;
}
.v-input {
  font-size: 14px;
}
#radarContainer {
  height: 318px;
}
.info-div {
  width: 100px;
  height: 38px;
  margin-right: 35px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detail-container {
  width: 100%;
  padding: 16px;
}
.detail-container .detial-item {
  margin-bottom: 8px;
}
.detail-container .detial-item > span:first-child {
  width: 100px;
  display: inline-block;
}
.detail-container .detial-item > span:last-child {
  width: 60px;
  display: inline-block;
  text-align: right;
  font-weight: bold;
}
.v-input--radio-group--column .v-input--radio-group__input {
  flex-direction: row;
}
</style>