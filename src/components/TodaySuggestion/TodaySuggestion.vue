<template>
  <v-container fluid style="overflow-y: scroll">
    <h2>今日推荐</h2>
    <!-- <v-row>
      <v-col cols="4">
        <h3 style="margin-left: 10px"></h3>
      </v-col>
      <v-col cols="5"></v-col>
    </v-row> -->
    <v-row>
      <v-col cols="12" style="padding-bottom: 0px">
        <v-hover>
          <template v-slot="{ hover }">
            <v-card
              :elevation="hover ? 6 : 2"
              width="100%"
              style="border-radius: 5px"
            >
              <v-card-title>行业和公司</v-card-title>
              <v-card-text>
                <v-data-table
                  dense
                  :headers="headersOfQuadrants"
                  :items="data11"
                  :loading="loading11"
                  :options.sync="option11"
                  :server-items-length="totalItems11"
                  :footer-props="{
                    itemsPerPageOptions: [20],
                    showFirstLastPage: true,
                  }"
                >
                  <template v-slot:item.stockName="{ item }">
                    <div style="padding-left: 8px; text-align: left">
                      <span
                        style="font-size: 12px; vertical-align: text-bottom"
                        >{{ item.depotShow }}</span
                      >
                      <a @click="goToStockDetail(item)">{{ item.stockName }}</a>
                    </div>
                  </template>
                  <template v-slot:item.stockcode="{ item }">
                    <a @click="goToStockDetail(item)">{{ item.stockcode }}</a>
                  </template>

                  <template v-slot:item.raceGroup="{ item }">
                    <v-chip
                      v-for="(race, index) in item.raceGroup"
                      style="margin-right: 5px"
                      dense
                      small
                      dark
                      color="#6790A8"
                      v-bind:key="race + index"
                      >{{ race }}</v-chip
                    >
                  </template>
                  <template v-slot:item.sumMoMScoreVal="{ item }">
                    <span :style="getColor(item.sumMoMScoreVal)">{{
                      item.sumMoMScoreVal
                    }}</span>
                  </template>
                  <template v-slot:item.sumJyYesterdayMoMScoreVal ="{ item }">
                    <span :style="getColor(item.sumJyYesterdayMoMScoreVal )">{{
                      item.sumJyYesterdayMoMScoreVal 
                    }}</span>
                  </template>
                  <template v-slot:item.day_chg="{ item }">
                    <span :style="getColor(item.day_chg)">{{
                      item.day_chgP
                    }}</span>
                  </template>
                  <template v-slot:item.five_chg="{ item }">
                    <span :style="getColor(item.five_chg)">{{
                      item.five_chgP
                    }}</span>
                  </template>
                  <template v-slot:item.month_chg="{ item }">
                    <span :style="getColor(item.month_chg)">{{
                      item.month_chgP
                    }}</span>
                  </template>
                  <template  v-slot:item.ninety_chg="{item}">
                    <span :style="getColor(item.ninety_chg)">{{
                      item.ninety_chgP
                    }}</span>
                  </template>
                  <template v-slot:item.IPrate="{ item }">
                    <span :style="getColor(item.IPrate)">{{
                      item.IPrateP
                    }}</span>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
      <v-col cols="12" style="padding-bottom: 0px">
        <v-hover>
          <template v-slot="{ hover }">
            <v-card
              :elevation="hover ? 6 : 2"
              width="100%"
              style="border-radius: 5px"
            >
              <v-card-title>催化剂</v-card-title>
              <v-card-text>
                <v-data-table
                  dense
                  :headers="headersOfQuadrants"
                  :items="data13"
                  :loading="loading13"
                  :options.sync="option13"
                  :server-items-length="totalItems13"
                  :footer-props="{
                    itemsPerPageOptions: [20],
                    showFirstLastPage: true,
                  }"
                >
                  <template v-slot:item.stockName="{ item }">
                    <div style="padding-left: 8px; text-align: left">
                      <span
                        style="font-size: 12px; vertical-align: text-bottom"
                        >{{ item.depotShow }}</span
                      >
                      <a @click="goToStockDetail(item)">{{ item.stockName }}</a>
                    </div>
                  </template>
                  <template v-slot:item.stockcode="{ item }">
                    <a @click="goToStockDetail(item)">{{ item.stockcode }}</a>
                  </template>
                  <template v-slot:item.raceGroup="{ item }">
                    <v-chip
                      v-for="(race, index) in item.raceGroup"
                      style="margin-right: 5px"
                      dense
                      small
                      dark
                      color="#6790A8"
                      v-bind:key="race + index"
                      >{{ race }}</v-chip
                    >
                  </template>
                  <template v-slot:item.sumMoMScoreVal="{ item }">
                    <span :style="getColor(item.sumMoMScoreVal)">{{
                      item.sumMoMScoreVal
                    }}</span>
                  </template>
                  <template v-slot:item.sumJyYesterdayMoMScoreVal ="{ item }">
                    <span :style="getColor(item.sumJyYesterdayMoMScoreVal )">{{
                      item.sumJyYesterdayMoMScoreVal 
                    }}</span>
                  </template>
                  <template v-slot:item.day_chg="{ item }">
                    <span :style="getColor(item.day_chg)">{{
                      item.day_chgP
                    }}</span>
                  </template>
                  <template v-slot:item.five_chg="{ item }">
                    <span :style="getColor(item.five_chg)">{{
                      item.five_chgP
                    }}</span>
                  </template>
                  <template v-slot:item.month_chg="{ item }">
                    <span :style="getColor(item.month_chg)">{{
                      item.month_chgP
                    }}</span>
                  </template>
                   <template  v-slot:item.ninety_chg="{item}">
                    <span :style="getColor(item.ninety_chg)">{{
                      item.ninety_chgP
                    }}</span>
                  </template>
                  <template v-slot:item.IPrate="{ item }">
                    <span :style="getColor(item.IPrate)">{{
                      item.IPrateP
                    }}</span>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
      <v-col cols="12" style="padding-bottom: 0px">
        <v-hover>
          <template v-slot="{ hover }">
            <v-card
              :elevation="hover ? 6 : 2"
              width="100%"
              style="border-radius: 5px"
            >
              <v-card-title>交易指标</v-card-title>
              <v-card-text>
                <v-data-table
                  dense
                  :headers="quadrants12"
                  :items="data12"
                  :loading="loading12"
                  :options.sync="option12"
                  :server-items-length="totalItems12"
                  :footer-props="{
                    itemsPerPageOptions: [20],
                    showFirstLastPage: true,
                  }"
                >
                  <template v-slot:item.stockName="{ item }">
                    <div style="padding-left: 8px; text-align: left">
                      <span
                        style="font-size: 12px; vertical-align: text-bottom"
                        >{{ item.depotShow }}</span
                      >
                      <a @click="goToStockDetail(item)">{{ item.stockName }}</a>
                    </div>
                  </template>
                  <template v-slot:item.stockcode="{ item }">
                    <a @click="goToStockDetail(item)">{{ item.stockcode }}</a>
                  </template>
                  <template v-slot:item.raceGroup="{ item }">
                    <v-chip
                      v-for="(race, index) in item.raceGroup"
                      style="margin-right: 5px"
                      dense
                      small
                      dark
                      color="#6790A8"
                      v-bind:key="race + index"
                      >{{ race }}</v-chip
                    >
                  </template>
                  <template v-slot:item.sumJyMoMScoreVal="{ item }">
                    <span :style="getColor(item.sumJyMoMScoreVal)">{{
                      item.sumJyMoMScoreVal
                    }}</span>
                  </template>
                  <template v-slot:item.sumJyYesterdayMoMScoreVal ="{ item }">
                    <span :style="getColor(item.sumJyYesterdayMoMScoreVal )">{{
                      item.sumJyYesterdayMoMScoreVal 
                    }}</span>
                  </template>
                  <template v-slot:item.day_chg="{ item }">
                    <span :style="getColor(item.day_chg)">{{
                      item.day_chgP
                    }}</span>
                  </template>
                  <template v-slot:item.five_chg="{ item }">
                    <span :style="getColor(item.five_chg)">{{
                      item.five_chgP
                    }}</span>
                  </template>
                  <template v-slot:item.month_chg="{ item }">
                    <span :style="getColor(item.month_chg)">{{
                      item.month_chgP
                    }}</span>
                  </template>
                   <template  v-slot:item.ninety_chg="{item}">
                    <span :style="getColor(item.ninety_chg)">{{
                      item.ninety_chgP
                    }}</span>
                  </template>
                  <template v-slot:item.IPrate="{ item }">
                    <span :style="getColor(item.IPrate)">{{
                      item.IPrateP
                    }}</span>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" style="padding-bottom: 0px">
        <v-hover>
          <template v-slot="{ hover }">
            <v-card
              :elevation="hover ? 6 : 2"
              width="100%"
              style="border-radius: 5px"
            >
              <v-card-title>
                <div>OTC推荐</div>
                <div style="font-size: 0.8rem; margin-left: 12px">
                  <span style="background: #b3b3b3">灰色</span
                  >代表已经取消被推荐
                </div>
                <v-spacer></v-spacer>
                <v-checkbox
                  dense
                  v-model="otcFilter"
                  label="正在推荐"
                  value="0"
                  style="margin-right: 12px"
                  small
                ></v-checkbox>
                <v-checkbox
                  dense
                  v-model="otcFilter"
                  label="已取消推荐"
                  value="1"
                  small
                ></v-checkbox>
              </v-card-title>
              <v-card-text>
                <v-data-table
                  dense
                  :headers="otcHeader"
                  :items="otcItems"
                  :options.sync="otcOption"
                  :server-items-length="totalOtcItems"
                  :footer-props="{
                    itemsPerPageOptions: [20],
                    showFirstLastPage: true,
                  }"
                >
                  <template v-slot:item.stockName="{ item }">
                    <div
                      style="padding-left: 8px; text-align: left"
                      :style="
                        item.isCancel === '1' ? 'background:#b3b3b3;' : ''
                      "
                    >
                      {{ item.stockName }}
                    </div>
                  </template>
                  <template v-slot:item.stockCode="{ item }">
                    <div
                      :style="
                        item.isCancel === '1' ? 'background:#b3b3b3;' : ''
                      "
                    >
                      {{ item.stockCode }}
                    </div>
                  </template>

                  <template v-slot:item.day_chg="{ item }">
                    <span :style="getColor(item.day_chg)">{{
                      item.day_chgP
                    }}</span>
                  </template>
                  <template v-slot:item.five_chg="{ item }">
                    <span :style="getColor(item.five_chg)">{{
                      item.five_chgP
                    }}</span>
                  </template>
                  <template v-slot:item.month_chg="{ item }">
                    <span :style="getColor(item.month_chg)">{{
                      item.month_chgP
                    }}</span>
                  </template>
                   <template  v-slot:item.ninety_chg="{item}">
                    <span :style="getColor(item.ninety_chg)">{{
                      item.ninety_chgP
                    }}</span>
                  </template>
                  <template v-slot:item.IPrate="{ item }">
                    <span :style="getColor(item.IPrate)">{{
                      item.IPrateP
                    }}</span>
                  </template>
                  <template v-slot:item.recommendDate="{ item }">
                    <strong style="color: rgb(249 170 51); margin-right: 5px">{{
                      item.recommendDate
                    }}</strong>
                    <span
                      :style="
                        getColor(item.recommendRate) +
                        'width:45px;display:inline-block;'
                      "
                      >{{ item.recommendRateP }}</span
                    >
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>

    <!-- <v-row>
      <v-col cols="4">
        <h3 style="margin-left:10px;">总体得分排名</h3>
      </v-col>
      <v-col cols="5"></v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-2"
      style="margin-bottom: 15px;"
    ></v-data-table>-->
  </v-container>
</template>

<script>
import dataInterface from "../../data/todaySuggestionData";
// import commonDataInterface from "../../data/commonData";
import session from "../../util/SessionStorage";

export default {
  name: "TodaySuggestion",
  //   components: {
  //   },
  data: () => ({
    factorTree: [],
    dialog: false,
    stockTree: [],
    stockModels: {},
    userId: session.getSessionStorage("userid"),
    xxIds: [11, 12, 13], // 象限Id
    quadrants: ["行业和公司", "交易指标", "催化剂", "OTC"],
    headersOfQuadrants: [
      { text: "股票代码", value: "stockcode", width: "95px", sortable: false },
      { text: "股票名称", value: "stockName", width: "95px", sortable: false },
      { text: "分级", value: "stockLevel", width: "60px" },
      { text: "行业", value: "industry", width: "80px", sortable: false },
      {
        text: "赛道/标签",
        value: "raceGroup",
        width: "180px",
        sortable: false,
      },
      { text: "象限总分", value: "sumScore", width: "80px", align: "end" },
      {
        text: "今日环比",
        value: "sumMoMScoreVal",
        width: "80px",
        align: "end",
      },
      {
        text: "昨日环比",
        value: "sumJyYesterdayMoMScoreVal",
        width: "80px",
        align: "end",
      },
      { text: "当日涨幅", value: "day_chg", width: "80px", align: "end" },
      { text: "量比", value: "vol_ratio", width: "54px", align: "end" },
      { text: "波动率", value: "stdevr", width: "70px", align: "end" },
      { text: "5日涨幅", value: "five_chg", width: "74px", align: "end" },
      {
        text: "30日涨幅",
        value: "month_chg",
        width: "84px",
        align: "end",
      },
      {
        text: "90日涨幅",
        value: "ninety_chg",
        width: "84px",
        align: "end",
      },
      {
        text: "入池以来涨幅",
        value: "IPrate",
        width: "105px",
        align: "end",
      },
      { text: "市值(亿元)", value: "ev", width: "94px", align: "end" },

      { text: "PE", value: "pe", width: "80px", align: "end" },
      { text: "PE(20)", value: "estpe_FY1", width: "80px", align: "end" },
      { text: "PE(21)", value: "estpe_FY2", width: "80px", align: "end" },
      { text: "PE(22)", value: "estpe_FY3", width: "80px", align: "end" },

      {
        text: "入池日期",
        value: "transferDate",
        width: "100px",
        align: "end",
      },
    ],
    quadrants12: [
      { text: "股票代码", value: "stockcode", width: "95px", sortable: false },
      { text: "股票名称", value: "stockName", width: "95px", sortable: false },
      { text: "分级", value: "stockLevel", width: "60px" },
      { text: "行业", value: "industry", width: "80px", sortable: false },
      {
        text: "赛道/标签",
        value: "raceGroup",
        width: "180px",
        sortable: false,
      },
      { text: "象限总分", value: "sumJy", width: "80px", align: "end" },
      {
        text: "今日环比",
        value: "sumJyMoMScoreVal",
        width: "80px",
        align: "end",
      },
      {
        text: "昨日环比",
        value: "sumJyYesterdayMoMScoreVal",
        width: "80px",
        align: "end",
      },
      { text: "当日涨幅", value: "day_chg", width: "80px", align: "end" },
      { text: "量比", value: "vol_ratio", width: "54px", align: "end" },
      { text: "波动率", value: "stdevr", width: "70px", align: "end" },
      { text: "5日涨幅", value: "five_chg", width: "74px", align: "end" },
      {
        text: "30日涨幅",
        value: "month_chg",
        width: "84px",
        align: "end",
      },
      {
        text: "90日涨幅",
        value: "ninety_chg",
        width: "84px",
        align: "end",
      },
      {
        text: "入池以来涨幅",
        value: "IPrate",
        width: "105px",
        align: "end",
      },
      { text: "市值(亿元)", value: "ev", width: "94px", align: "end" },

      { text: "PE", value: "pe", width: "80px", align: "end" },
      { text: "PE(20)", value: "estpe_FY1", width: "80px", align: "end" },
      { text: "PE(21)", value: "estpe_FY2", width: "80px", align: "end" },
      { text: "PE(22)", value: "estpe_FY3", width: "80px", align: "end" },

      // {
      //   text: "入池日期",
      //   value: "transferDate",
      //   width: "100px",
      //   align: "end",
      // },
      { text: "交易增强", width: "80px", value: "lhRate", align: "end" },
      // { text: "启动点选股", value: "lhRate_1" },
      // { text: "异动提示", value: "lhRate_2" },
    ],
    otcHeader: [
      { text: "股票代码", value: "stockCode", width: "90px", sortable: false },
      { text: "股票名称", value: "stockName", width: "90px", sortable: false },
      {
        text: "推荐日期 / 涨幅",
        value: "recommendDate",
        width: "195px",
        align: "end",
      },
      { text: "市值(亿元)", value: "ev", width: "94px", align: "end" },
      {
        text: "收盘价",
        value: "close_price",
        width: "94px",
        align: "end",
      },
      { text: "当日涨跌幅", value: "day_chg", width: "90px", align: "end" },
      { text: "量比", value: "vol_ratio", width: "75px", align: "end" },
      { text: "波动率", value: "stdevr", width: "70px", align: "end" },

      { text: "5日涨幅", value: "five_chg", width: "105px", align: "end" },
      {
        text: "30日涨幅",
        value: "month_chg",
        width: "105px",
        align: "end",
      },
      {
        text: "90日涨幅",
        value: "ninety_chg",
        width: "84px",
        align: "end",
      },
      {
        text: "入池以来涨幅",
        value: "IPrate",
        width: "105px",
        align: "end",
      },
      { text: "PE", value: "pe", width: "80px", align: "end" },
      { text: "PE(20)", value: "estpe_FY1", width: "90px", align: "end" },
      { text: "PE(21)", value: "estpe_FY2", width: "90px", align: "end" },
      { text: "PE(22)", value: "estpe_FY3", width: "90px", align: "end" },
      { text: "入池理由", value: "reason", width: "105px" },
    ],
    otcItems: [],
    originalOtcItems: [],
    otcOption: { itemsPerPage: 10, sortBy: ["isCancel"], sortDesc: [false] },
    totalOtcItems: 50,
    data11: [],
    data12: [],
    data13: [],
    data14: [],
    option11: { itemsPerPage: 20, sortBy: ["sumMoMScoreVal"], sortDesc: [true] },
    option12: { itemsPerPage: 20, sortBy: ["sumJyMoMScoreVal"], sortDesc: [true] },
    option13: { itemsPerPage: 20, sortBy: ["sumMoMScoreVal"], sortDesc: [true] },
    option14: { itemsPerPage: 20, sortBy: ["sumScore"], sortDesc: [true] },
    totalItems11: 100,
    totalItems12: 100,
    totalItems13: 100,
    totalItems14: 100,
    loading11: false,
    loading12: false,
    loading13: false,
    stockLevelMap: {
      1: "核心",
      2: "备选",
      3: "一级",
      4: "二级",
    },
    pollingWorker: null,
    otcFilter:['0','0'],
  }),
  mounted() {
    // this.xxIds.forEach((e) => {
    //   this.getXxResult(e);
    // });
    this.getOTCSuggestion();
    this.initWorker();
  },
  methods: {
    // 定时刷新页面Start
    initWorker() {
      var _self = this;
      if (this.pollingWorker) {
        this.pollingWorker.terminate();
      }
      this.pollingWorker = this.createWorker(function () {
        setInterval(function () {
          self.postMessage("");
        }, 300000);
      });

      this.pollingWorker.onmessage = function () {
        _self.refreshAll();
      };
    },
    createWorker(f) {
      var blob = new Blob(["(" + f.toString() + ")()"]);
      var url = window.URL.createObjectURL(blob);
      var worker = new Worker(url);
      return worker;
    },
    refreshAll() {
      this.xxIds.forEach((e) => {
        this.getXxResult(e);
      });
      this.getOTCSuggestion();
    },
    // 定时刷新页面End

    // 获取单个象限得分
    getXxResult(xx) {
      let _self = this;
      this["loading" + xx] = true;
      let orderByKey = "";
      if (this["option" + xx].sortBy && this["option" + xx].sortBy.length > 0) {
        orderByKey = this["option" + xx].sortBy[0];
      }
      let ifDesc = "";
      if (
        this["option" + xx].sortDesc &&
        this["option" + xx].sortDesc.length > 0
      ) {
        ifDesc = this["option" + xx].sortDesc[0] ? "1" : "0";
      }

      dataInterface
        .getStockrateByXx({
          xxId: xx,
          pageNo: this["option" + xx].page,
          pageSize: "20",
          orderByKey: orderByKey,
          ifDesc: ifDesc,
        })
        .then((res) => {
          res.list.forEach((e) => {
            if (e.stockNum) {
              if (e.stockNum >= 10 && e.stockNum < 100) {
                e.stockNum = "0" + e.stockNum;
              } else if (e.stockNum < 10) {
                e.stockNum = "00" + e.stockNum;
              }
            }
            if (e.raceName) {
              e.raceGroup = e.raceName.split(",");
            } else {
              e.raceGroup = [];
            }
            e.day_chgP = e.day_chg ? (e.day_chg * 100).toFixed(2) + "%" : null;
            e.five_chgP = e.five_chg
              ? (e.five_chg * 100).toFixed(2) + "%"
              : null;
            e.month_chgP = e.month_chg
              ? (e.month_chg * 100).toFixed(2) + "%"
              : null;
            e.ninety_chgP = e.ninety_chg
        ? (e.ninety_chg * 100).toFixed(2) + "%"
        : null;
            e.IPrateP = e.IPrate ? (e.IPrate * 100).toFixed(2) + "%" : null;
            e.estpe_FY1 =
              e.estpe_FY1 && e.estpe_FY1 !== '0'
                ? parseFloat(e.estpe_FY1).toFixed(2)
                : '-';
            e.estpe_FY2 =
              e.estpe_FY2 && e.estpe_FY2 !== '0'
                ? parseFloat(e.estpe_FY2).toFixed(2)
                : '-';
            e.estpe_FY3 =
              e.estpe_FY3 && e.estpe_FY3 !== '0'
                ? parseFloat(e.estpe_FY3).toFixed(2)
                : '-';
            e.pe = e.pe && e.pe !== '0' ? parseFloat(e.pe).toFixed(2) : '-';

            e.ev = (e.ev / 100000000).toFixed(2);
            // stockLevelMap
            e.stockLevel = _self.stockLevelMap[e.stockLevel];
            e.depotShow = e.depot;
            if (e.depot === "0") {
              e.depotShow = " ";
            } else if (e.depot === "99") {
              e.depotShow = "0";
            }
          });

          _self["data" + xx] = res.list;
          _self["loading" + xx] = false;
        });
    },
    goToStockDetail(stock) {
      this.$router.push({
        name: "stockDetail",
        params: {
          stockCode: stock.stockcode,
          stockName: stock.stockName,
          industry: stock.industry,
          day_chg: stock.day_chg,
          five_chg: stock.five_chg,
          month_chg: stock.month_chg,
          vol_ratio: stock.vol_ratio,
          amt: stock.amt,
          ev: stock.ev,
          pe: stock.pe,
          pb: stock.pb,
        },
      });
    },
    // 获取OTC推荐
    getOTCSuggestion() {
      let _self = this;
      let orderByKey = "";
      if (this.otcOption.sortBy && this.otcOption.sortBy.length > 0) {
        orderByKey = this.otcOption.sortBy[0];
      }
      let ifDesc = "";
      if (this.otcOption.sortDesc && this.otcOption.sortDesc.length > 0) {
        ifDesc = this.otcOption.sortDesc[0] ? "1" : "0";
      }
      dataInterface
        .getOTCRecdList({
          isCancel: "",
          pageNo: this.otcOption.page,
          pageSize: 20,
          orderByKey: orderByKey,
          ifDesc: ifDesc,
        })
        .then((res) => {
          res.list.forEach((e) => {
            e.day_chgP = e.day_chg ? (e.day_chg * 100).toFixed(2) + "%" : null;
            e.five_chgP = e.five_chg
              ? (e.five_chg * 100).toFixed(2) + "%"
              : null;
            e.month_chgP = e.month_chg
              ? (e.month_chg * 100).toFixed(2) + "%"
              : null;
            e.ninety_chgP = e.ninety_chg
        ? (e.ninety_chg * 100).toFixed(2) + "%"
        : null;
            e.ev = (e.ev / 100000000).toFixed(2);
            e.IPrateP = e.IPrate ? (e.IPrate * 100).toFixed(2) + "%" : null;
            e.estpe_FY1 =
              e.estpe_FY1 && e.estpe_FY1 !== '0'
                ? parseFloat(e.estpe_FY1).toFixed(2)
                : '-';
            e.estpe_FY2 =
              e.estpe_FY2 && e.estpe_FY2 !== '0'
                ? parseFloat(e.estpe_FY2).toFixed(2)
                : '-';
            e.estpe_FY3 =
              e.estpe_FY3 && e.estpe_FY3 !== '0'
                ? parseFloat(e.estpe_FY3).toFixed(2)
                : '-';
            e.pe = e.pe && e.pe !== '0' ? parseFloat(e.pe).toFixed(2) : '-';
            if (e.recommendDate === "0000-00-00") {
              e.recommendDate = "";
            }
            e.recommendRateP = e.recommendRate
              ? parseFloat(e.recommendRate).toFixed(2) + "%"
              : null;
          });
          // _self.otcItems = res.list;
          _self.originalOtcItems = JSON.parse(JSON.stringify(res.list));
          _self.otcItems = res.list.filter(e => _self.otcFilter.includes(e.isCancel));
          _self.totalOtcItems = res.countNum;
        });
    },
    getColor(val) {
      if (val > 0) {
        return "color:red;";
      } else {
        return "color:green;";
      }
    },
  },
  computed: {
    // 象限一半的长度，用于渲染页面。
    quadrantsHalfLength() {
      if (this.quadrants.length % 2 === 0) {
        return this.quadrants.length / 2;
      } else {
        return parseInt((this.quadrants.length / 2).toString());
      }
    },
  },
  watch: {
    option11: {
      handler() {
        this.getXxResult("11");
      },
      deep: true,
    },
    option12: {
      handler() {
        this.getXxResult("12");
      },
      deep: true,
    },
    option13: {
      handler() {
        this.getXxResult("13");
      },
      deep: true,
    },
    option14: {
      handler() {
        this.getXxResult("14");
      },
      deep: true,
    },
    // 过滤otc推荐
    otcFilter(value) {
      if (value.length < 1) {
        return;
      }
      this.otcItems = this.originalOtcItems.filter(e => value.includes(e.isCancel));
    }
  },
};
</script>
<style>
.v-data-table td,
.v-data-table th {
  padding-left: 0px !important;
  padding-right: 6px !important;
}
</style>
