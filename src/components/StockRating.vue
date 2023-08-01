<template>
  <v-container fluid style="overflow-y: hidden">
    <h2>股票评分</h2>
    <v-row>
      <v-col cols="8" style="padding-bottom: 0px">
        <v-hover>
          <template v-slot="{ hover }">
            <v-card :elevation="hover ? 6 : 2" style="border-radius: 5px">
              <v-card-title style="padding-top: 0px; padding-bottom: 0px">
                股票池
                <v-spacer></v-spacer>
                <div style="width: 120px; margin-right: 5px">
                  <v-text-field
                    v-model="searchFiled.searchKeyWord"
                    label="股票名称/代码"
                    single-line
                    clearable
                    @change="getRatingStockList"
                  ></v-text-field>
                </div>
                <div style="width: 100px; margin-right: 5px">
                  <v-combobox
                    v-model="searchFiled.marketType"
                    dense
                    :items="marketTypeList"
                    label="市场类别"
                    full-width
                    @change="getRatingStockList"
                  ></v-combobox>
                </div>
                <div style="width: 80px; margin-right: 5px">
                  <v-autocomplete
                    v-model="searchFiled.depotFilter"
                    dense
                    :items="depotList"
                    label="关注人"
                    item-text="depotName"
                    item-value="depot"
                    full-width
                    clearable
                    @change="getRatingStockList"
                  ></v-autocomplete>
                </div>

                <div style="width: 80px; margin-right: 5px">
                  <v-autocomplete
                    v-model="searchFiled.stockLevel"
                    dense
                    :items="stockLevelList"
                    label="评级"
                    item-text="levelName"
                    item-value="levelValue"
                    full-width
                    clearable
                    @change="getRatingStockList"
                  ></v-autocomplete>
                </div>
                <div style="width: 120px; margin-right: 5px">
                  <v-combobox
                    v-model="searchFiled.indusForFilter"
                    dense
                    :items="industryList"
                    label="行业"
                    item-text="industry"
                    item-value="id"
                    full-width
                    clearable
                    @change="getRatingStockList"
                  ></v-combobox>
                </div>
                <div style="width: 120px; margin-right: 5px">
                  <v-combobox
                    v-model="searchFiled.raceForFilter"
                    dense
                    :items="raceListForFilter"
                    label="赛道/标签"
                    full-width
                    clearable
                    @change="getRatingStockList"
                  ></v-combobox>
                </div>
                <div>
                  <v-btn
                    fab
                    dark
                    x-small
                    outlined
                    color="primary"
                    elevation="2"
                    @click="getRatingStockList"
                  >
                    <v-icon dark>search</v-icon>
                  </v-btn>
                </div>
              </v-card-title>
              <v-card-text>
                <data-table
                  :columns="stockListHeader"
                  :data="stockList"
                  :width="'100%'"
                  :height="tableHeight"
                  :options="rateStockListOptions"
                  @scrollToEnd="loadMore"
                  @sortMethod="getRatingStockList(true)"
                  @clickRow="chooseCurrentStock"
                  :loading="stockListLoading"
                  :showPopup="true"
                >
                  <template v-slot:stockName="item">
                    <div style="padding-left: 8px; text-align: left">
                      <span
                        style="font-size: 12px; vertical-align: text-bottom"
                        >{{ item.item.depotShow }}</span
                      >
                      <span>{{ item.item.stockName }}</span>
                    </div>
                  </template>

                  <template v-slot:raceGroup="item">
                    <v-chip
                      v-for="(race, index) in item.item.raceGroup"
                      style="
                        margin-right: 5px;
                        margin-top: 2px;
                        margin-bottom: 2px;
                      "
                      dense
                      small
                      dark
                      color="#6790A8"
                      v-bind:key="race + index"
                      >{{ race }}</v-chip
                    >
                  </template>
                  <template v-slot:day_chg="item">
                    <span :style="getColor(item.item.day_chg)">{{
                      item.item.day_chgP
                    }}</span>
                  </template>
                  <template v-slot:five_chg="item">
                    <span :style="getColor(item.item.five_chg)">{{
                      item.item.five_chgP
                    }}</span>
                  </template>
                  <template v-slot:month_chg="item">
                    <span :style="getColor(item.item.month_chg)">{{
                      item.item.month_chgP
                    }}</span>
                  </template>
                  <template v-slot:ninety_chg="item">
                    <span :style="getColor(item.item.ninety_chg)">{{
                      item.item.ninety_chgP
                    }}</span>
                  </template>

                  <template v-slot:IPrate="item">
                    <span :style="getColor(item.item.IPrate)">{{
                      item.item.IPrateP
                    }}</span>
                  </template>
                  <template v-slot:popup="item">
                <div>
                  <v-card
                    :elevation="hover ? 6 : 2"
                    width="100%"
                    style="border-radius: 5px"
                  >
                    <v-card-title
                      >{{ item.item.stockCode }} |
                      {{ item.item.stockName }}</v-card-title
                    >
                    <v-card-text>
                      <table>
                        <thead>
                          <tr>
                            <th style="width: 80px" align="left">PE</th>
                            <th style="width: 80px" align="left">PE(20)</th>
                            <th style="width: 80px" align="left">PE(21)</th>
                            <th style="width: 80px" align="left">PE(22)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td align="left">{{ item.item.pe }}</td>
                            <td align="left">{{ item.item.estpe_FY1 }}</td>
                            <td align="left">{{ item.item.estpe_FY2 }}</td>
                            <td align="left">{{ item.item.estpe_FY3 }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <p>{{ item.item.reason }}</p>
                    </v-card-text>
                  </v-card>
                </div>
              </template>
                </data-table>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
      <v-col cols="4" style="padding-left: 0px">
        <v-hover>
          <template v-slot="{ hover }">
            <v-card
              :elevation="hover ? 6 : 2"
              style="border-radius: 5px"
              ref="operatingCard"
            >
              <v-card-title
                >个股评分{{
                  currentStock.length > 0
                    ? " - " +
                      currentStock[0].stockCode +
                      " | " +
                      currentStock[0].stockName
                    : ""
                }}</v-card-title
              >
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-card
                      outlined
                      style="border-radius: 15px 15px 0px 0px"
                      color="#cae7ff"
                    >
                      <v-list-item>
                        <v-list-item-content style="padding-bottom: 0px">
                          <div class="overline" style="margin-bottom: 6px">
                            基本面
                          </div>
                          <v-card-text style="padding: 0px">
                            <v-tooltip
                              top
                              v-for="factor in sortedFator['11']"
                              v-bind:key="factor.factorId"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-chip
                                  :color="
                                    factor.isSelect
                                      ? 'primary'
                                      : 'rgba(0, 0, 0, 0.6)'
                                  "
                                  dark
                                  :outlined="!factor.isSelect"
                                  style="margin-right: 5px; margin-bottom: 5px"
                                  v-bind="attrs"
                                  small
                                  v-on="on"
                                  @click="clickFactor(factor, factor.index)"
                                  >{{ factor.factorName }} |
                                  {{ factor.score }}</v-chip
                                >
                              </template>
                              <span>{{ factor.factorName }}</span>
                            </v-tooltip>
                          </v-card-text>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                    <v-card outlined color="rgb(255 195 190)">
                      <v-list-item>
                        <v-list-item-content style="padding-bottom: 0px">
                          <div class="overline" style="margin-bottom: 6px">
                            <span>催化剂</span>
                            <a style="float: right" @click="gotoAnnouncement"
                              >查看相关公告</a
                            >
                          </div>
                          <v-card-text style="padding: 0px">
                            <v-tooltip
                              top
                              v-for="factor in sortedFator['13']"
                              v-bind:key="factor.factorId"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-chip
                                  :color="
                                    factor.isSelect
                                      ? 'primary'
                                      : 'rgba(0, 0, 0, 0.6)'
                                  "
                                  dark
                                  :outlined="!factor.isSelect"
                                  style="margin-right: 5px; margin-bottom: 5px"
                                  v-bind="attrs"
                                  small
                                  v-on="on"
                                  @click="clickFactor(factor, factor.index)"
                                  >{{ factor.factorName }} |
                                  {{ factor.score }}</v-chip
                                >
                              </template>
                              <span>{{ factor.factorName }}</span>
                            </v-tooltip>
                          </v-card-text>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                    <v-card
                      outlined
                      style="border-radius: 0px 0px 15px 15px"
                      color="#ffd6a3"
                    >
                      <v-list-item>
                        <v-list-item-content style="padding-bottom: 0px">
                          <div class="overline" style="margin-bottom: 6px">
                            技术面
                          </div>
                          <v-card-text style="padding: 0px">
                            <v-tooltip
                              top
                              v-for="factor in sortedFator['12']"
                              v-bind:key="factor.factorId"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-chip
                                  :color="
                                    factor.isSelect
                                      ? 'primary'
                                      : 'rgba(0, 0, 0, 0.6)'
                                  "
                                  dark
                                  :outlined="!factor.isSelect"
                                  style="margin-right: 5px; margin-bottom: 5px"
                                  v-bind="attrs"
                                  small
                                  v-on="on"
                                  @click="clickFactor(factor, factor.index)"
                                  >{{ factor.factorName }} |
                                  {{ factor.score }}</v-chip
                                >
                              </template>
                              <span>{{ factor.factorName }}</span>
                            </v-tooltip>
                          </v-card-text>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>

                    <h3
                      v-show="currentStock.length < 1 && factorList.length < 1"
                    >
                      请在左侧选择一条需要打分的股票。
                    </h3>
                  </v-col>
                </v-row>
                <v-row
                  v-show="currentStock.length > 0 && factorList.length > 0"
                >
                  <v-col cols="12">
                    <p>
                      当前因子:
                      <strong>{{ currentFactor.factorName }}</strong>
                    </p>
                    <p>
                      更新日期:
                      <strong>{{ currentFactor.tdate }}</strong>
                    </p>
                    <p>
                      上期分数:
                      <strong style="color: black">{{
                        currentFactor.scoreHis
                      }}</strong>
                      | 本期分数:
                      <strong style="color: black">{{
                        currentFactor.score
                      }}</strong>
                      | 环比变化:
                      <span
                        style="color: red; margin-left: 10px"
                        v-show="diffrence > 0"
                        >{{ diffrence }}% ({{ diffrenceValue }}) ⬆</span
                      >
                      <span
                        style="color: green; margin-left: 10px"
                        v-show="diffrence < 0"
                        >{{ diffrence }}% ({{ diffrenceValue }}) ⬇</span
                      >
                    </p>
                    <v-text-field
                      ref="currentScore"
                      v-model.number="currentScore"
                      dense
                      clearable
                      label="本期分数"
                      hint="新的本期分数，会覆盖掉早些时候的本期分数。"
                      outlined
                      small
                      prepend-icon="emoji_objects"
                      class="styled-input"
                      :rules="currentScoreRule"
                      @keydown="nextOne"
                    ></v-text-field>

                    <v-textarea
                      label="得分说明"
                      prepend-icon="subject"
                      v-model="currentReason"
                      outlined
                      rows="2"
                      dense
                      ref="currentReason"
                      @keydown="done"
                    ></v-textarea>
                    <v-menu
                      v-model="menuForDatePicker"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      dense
                      min-width="290px"
                      ref="rateDate"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="rateDate"
                          label="修正日期"
                          dense
                          outlined
                          prepend-icon="event"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          v-show="currentFactor.categoryPid === '12'"
                          hint="根据选中的日期更新历史分数。"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="rateDate"
                        @input="menuForDatePicker = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row
                  v-show="currentStock.length > 0 && factorList.length > 0"
                  style="margin-top: -30px"
                >
                  <v-col cols="12" style="text-align: right; padding: 0px">
                    <v-btn
                      :loading="ratingLoading"
                      small
                      color="secondary"
                      @click="doneSaveOneStockScore"
                      style="margin-right: 12px"
                    >
                      <v-icon left dense small>done</v-icon>完成
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
        <v-card style="border-radius: 5px; margin-top: 10px">
          <v-card-title>历史得分 - <span style="color:grey;margin-left:8px;font-size:1.05rem">{{currentFactor.factorName}}</span></v-card-title>
          <v-card-text
            :style="{ height: historyCardHight + 'px', overflowY: 'scroll' }"
          >
            <v-timeline align-top dense v-show="rateHisList.length > 0">
              <v-timeline-item
                color="primary"
                small
                v-for="(item, index) in rateHisList"
                v-bind:key="index"
              >
                <v-row class="pt-1">
                  <v-col cols="4" style="padding: 0px">
                    <strong>{{ item.tdate }}</strong>
                  </v-col>
                  <v-col style="padding: 0px">
                    <strong>{{ item.score  + '|' + item.fullName}}</strong>
                    <div class="caption">
                      {{ item.ratingReason }}
                    </div>
                  </v-col>
                </v-row>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>

        <!-- <v-card
          style="border-radius: 5px; margin-top: 10px"
        >
          <v-card-title>快捷键提示</v-card-title>
          <v-card-text>
            <p>
              有多个因子的情况，按 <v-icon small>arrow_back</v-icon>键 /
              <v-icon small>arrow_forward</v-icon>键 快速切换。
            </p>
            <p>在输入的时候，按 enter 键，可以快速跳到下一输入项。</p>
            <p>
              在输入的时候，同时按下(alt + enter) / (ctrl +
              enter),可以快捷保存。
            </p>
          </v-card-text>
        </v-card> -->
      </v-col>
    </v-row>
    <!-- <div
      style="    width: 100%;
    height: 100%;
    background: #ffffff78;
    position: absolute;
    z-index: 30;
    top: 0;"
      v-show="ratingLoading"
    ></div>-->
    <v-icon
      style="position: absolute; z-index: 5; top: 20px; right: 20px"
      @click="goBack"
      v-show="showBoBack"
      >keyboard_backspace</v-icon
    >
  </v-container>
</template>

<script>
// import sessionUtil from "../util/SessionStorage";
import commonDataInterface from "../data/commonData";
import dataInterface from "../data/ratingOperationData";
import session from "../util/SessionStorage";

// import SingleFactorDetail from "./SingleFactorDetail";
import moment from "moment";
import notice from "../util/Notice";
import authority from "../util/Authority";
import store from "../util/Store";
import DataTable from "./DataTable.vue";

export default {
  name: "StockRating",

  components: {
    // SingleFactorDetail
    DataTable,
  },
  data: () => ({
    userId: session.getSessionStorage("userid"),
    stockListHeader: [
      {
        text: "序号",
        value: "stockNum",
        width: "48px",
        align: "start",
        fixed: true,
      },
      {
        text: "股票代码",
        value: "stockCode",
        width: "70px",
        fixed: true,
        align: "end",
        sortable: false,
      },
      {
        text: "股票名称",
        value: "stockName",
        width: "89px",
        align: "center",
        sortable: false,
      },
      {
        text: "分级",
        value: "stockLevel",
        width: "54px",
        align: "start",
        sortable: false,
      },
      { text: "行业", value: "industry", width: "74px" },
      {
        text: "赛道/标签",
        value: "raceGroup",
        width: "150px",
        sortable: false,
      },
      {
        text: "基本面",
        value: "score_hq",
        width: "64px",
        align: "end",
        sortable: true,
      },
      {
        text: "技术面",
        value: "score_jy",
        width: "64px",
        align: "end",
        sortable: true,
      },
      {
        text: "催化剂",
        value: "score_chj",
        width: "64px",
        align: "end",
        sortable: true,
      },
      { text: "市值(亿元)", value: "ev", width: "94px", align: "end" },
      { text: "流通(亿元)", value: "mkt_cap_float", width: "94px", align: "end" },
      {
        text: "收盘价",
        value: "close_price",
        width: "84px",
        align: "end",
      },
      { text: "当日涨幅", value: "day_chg", width: "74px", align: "end" },
      { text: "量比", value: "vol_ratio", width: "54px", align: "end" },
      { text: "波动率", value: "stdevr", width: "64px", align: "end" },
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
        text: "入池涨幅",
        value: "IPrate",
        width: "84px",
        align: "end",
      },
    ],
    rateStockListOptions: {
      itemsPerPage: 70,
      sortBy: "stockLevel",
      sortDesc: true,
    },
    stockList: [],
    stockListLoading: false,
    stockListTableOps: {},
    stockListLength: 0,
    optTableHeader: [
      { text: "因子名称", value: "" },
      { text: "打分理由", value: "" },
      { text: "因子名称", value: "" },
      { text: "因子名称", value: "" },
      { text: "因子名称", value: "" },
    ],
    currentStock: [],
    factorList: [],
    factorIndex: 0,
    currentFactor: {},
    currentScore: "",
    currentScoreRule: [
      (value) => !!value || "分数不能为空。",
      (value) => {
        var n = Number(value);
        if (!isNaN(n)) {
          return true;
        } else {
          return "分数必须为数字。";
        }
      },
      (value) => value <= 100 || "分数必须小于或等于100。",
    ],
    currentReason: "",
    diffrence: null,
    diffrenceValue: null,
    today: "", // 今天日期
    defaultStartD: "", // 默认历史查询开始时间
    searchFiled: {
      searchKeyWord: "",
      marketType: "全市场",
      depotFilter: "",
      stockLevel: null,
      indusForFilter: null,
      raceForFilter: null,
    },
    marketTypeList: [
      "全市场",
      "A股市场", // sz,sh
      "A股主板", // sh
      "A股中小板",
      "A股科创板", // sh,688开头
      "A股创业板", // sz,300开头
      "HK", // hk
      "US", //
    ],
    depotList: [
      { depot: "99", depotName: "base0" },
      { depot: "1", depotName: "base1" },
      { depot: "2", depotName: "base2" },
      { depot: "3", depotName: "base3" },
      { depot: "4", depotName: "base4" },
      { depot: "5", depotName: "base5" },
      { depot: "6", depotName: "base6" },
      { depot: "7", depotName: "base7" },
    ],
    stockLevelList: [
      { levelName: "核心", levelValue: "1" },
      { levelName: "备选", levelValue: "2" },
      { levelName: "一级", levelValue: "3" },
      { levelName: "二级", levelValue: "4" },
      { levelName: "三级", levelValue: "5" },
    ],

    searchKeyWord: "",
    scoreHis: "",
    ratingLoading: false,
    clickCount: 1,
    raceForFilter: "",
    raceListForFilter: [],
    indusForFilter: "",
    industryList: [],
    tableHeight: "600",
    menuForDatePicker: false,
    rateDate: "",
    sortedFator: {},
    stockLevelMap: {
      1: "核心",
      2: "备选",
      3: "一级",
      4: "二级",
      5: "三级",
    },
    showBoBack: false,
    rateHisList: [],
    historyCardHight: 200,
  }),
  mounted() {
    // 获取股票Code和Name
    if (this.$route.params.stockCode) {
      this.searchFiled.searchKeyWord = this.$route.params.stockCode;
    }
    // this.getFactorList();
    this.today = moment().format("YYYY-MM-DD");
    this.defaultStartD = moment().subtract("6", "months").format("YYYY-MM-DD");
    this.rateDate = JSON.parse(JSON.stringify(this.today));
    this.getRatingStockList();
    this.getRaceList();
    this.getIndustryList();
    this.tableHeight = document.body.offsetHeight - 160 + "px";
    document.onkeydown = this.quickOpt;
  },
  activated() {
    // 获取股票Code和Name
    if (this.$route.params.stockCode) {
      this.searchFiled.searchKeyWord = this.$route.params.stockCode;
      this.getRatingStockList(true);
      this.showBoBack = true;
    } else {
      this.showBoBack = false;
    }
  },
  methods: {
    // 键盘快捷操作
    quickOpt(e) {
      // if (e.code === "ArrowLeft") {
      //   if (this.factorIndex > 0) {
      //     let index = this.factorIndex - 1;
      //     this.clickFactor(this.factorList[index], index);
      //   }
      // }
      // if (e.code === "ArrowRight") {
      //   if (this.factorIndex < this.factorList.length - 1) {
      //     let index = this.factorIndex + 1;
      //     this.clickFactor(this.factorList[index], index);
      //   }
      // }
      if (e.code === "F2") {
        store.commit("saveMemorandumShow", 1);
      }
    },
    // 获取所有行业
    getIndustryList() {
      let _self = this;
      commonDataInterface.getIndustryList({}).then((res) => {
        _self.industryList = res.list;
      });
    },
    // 获取所有赛道
    getRaceList() {
      var _self = this;
      commonDataInterface.getRaceList({}).then((res) => {
        let raceNameList = [];
        res.forEach((e) => {
          raceNameList.push(e.raceName);
        });
        _self.raceListForFilter = raceNameList;
      });
    },
    nextOne(e) {
      if (e.keyCode === 13) {
        if (!this.$refs["currentScore"].validate(true)) {
          return;
        }
        this.$refs["currentReason"].focus();
      }
      if (e.keyCode === 13 && (e.altKey === true || e.ctrlKey === true)) {
        this.saveOneStockScore();
      }
    },
    done(e) {
      if (e.keyCode === 13 && (e.altKey === true || e.ctrlKey === true)) {
        this.saveOneStockScore();
      }
    },
    chooseCurrentStock(item) {
      this.currentStock = [item];
      this.getFators();
    },
    //
    clickFactor(factor, index) {
      this.currentFactor.isSelect = false;
      factor.isSelect = true;
      this.currentFactor = factor;
      this.factorIndex = index;
      this.diffrence = null;
      this.diffrenceValue = null;
      this.currentReason = factor.ratingReason;
      this.currentScore = factor.score;
      if (factor.scoreHis && factor.scoreHis !== "0.00") {
        this.diffrenceValue = factor.score - factor.scoreHis;
        this.diffrence = (
          ((factor.score - factor.scoreHis) / factor.scoreHis) *
          100
        ).toFixed(2);
      } else {
        this.diffrenceValue = factor.score - factor.scoreHis;
        this.diffrence = "";
      }
      this.$refs["currentScore"].focus();
      this.getRateHis();
    },
    // 获取当前股票打分因子
    getFators() {
      let _self = this;
      if (!this.currentStock[0]) {
        return;
      }
      if (authority.isPermissible("基金经理")) {
        dataInterface
          .getAdminFactorByUser({
            stockCode: this.currentStock[0].stockCode,
            userId: this.userId,
          })
          .then((res) => {
            if (res.list.length > 0) {
              res.list.forEach((e) => {
                e.isSelect = false;
              });
              res.list[0].isSelect = true; // 默认选中第一个
              let i = 0;
              res.list.forEach((e) => {
                e.index = i;
                i++;
              });

              if (_self.userId !== "54a731ab199368c36022ba0e990802fc") {
                let tempList = [];
                let i = 0;
                res.list.forEach((e) => {
                  if (
                    e.factorName !== "启动点选股" &&
                    e.factorName !== "异动提示"
                  ) {
                    e.index = i;
                    i++;
                    tempList.push(e);
                  }
                });
                _self.factorList = tempList;
              } else {
                _self.factorList = res.list;
              }
              _self.sortedFator = _self.sortFactors(_self.factorList);
              _self.clickFactor(_self.factorList[0], 0);
            } else {
              _self.factorList = [];
              _self.currentFactor = {};
            }
            setTimeout(() => {
              _self.historyCardHight =
                document.body.offsetHeight -
                this.$refs.operatingCard.$el.offsetHeight -
                125;
            }, 100);
          });
      } else {
        commonDataInterface
          .getFacByStkCode({
            stockCode: this.currentStock[0].stockCode,
            userId: this.userId,
          })
          .then((res) => {
            if (res.list.length > 0) {
              res.list.forEach((e) => {
                e.isSelect = false;
              });
              res.list[0].isSelect = true; // 默认选中第一个
              if (_self.userId !== "54a731ab199368c36022ba0e990802fc") {
                let tempList = [];
                let i = 0;
                res.list.forEach((e) => {
                  e.index = i;
                  i++;
                  if (
                    e.factorName !== "启动点选股" &&
                    e.factorName !== "异动提示"
                  ) {
                    tempList.push(e);
                  }
                });
                _self.factorList = tempList;
              } else {
                _self.factorList = res.list;
              }
              _self.sortedFator = _self.sortFactors(_self.factorList);
              _self.clickFactor(_self.factorList[0], 0);
            } else {
              _self.factorList = [];
              _self.currentFactor = {};
            }
          });
      }
    },
    // 把因子列表分类
    sortFactors(list) {
      let map = {
        11: [],
        12: [],
        13: [],
        14: [],
      };
      list.forEach((e) => {
        switch (e.categoryPid) {
          case "11":
            map["11"].push(e);
            break;
          case "12":
            map["12"].push(e);
            break;
          case "13":
            map["13"].push(e);
            break;
          case "14":
            map["14"].push(e);
            break;
        }
      });
      return map;
    },
    // 获取所有需要打分的股票列表
    getRatingStockList(newSearch) {
      var _self = this;
      this.stockListLoading = true;
      if (newSearch) {
        this.rateStockListOptions.page = 1;
      }
      let ifDesc = this.rateStockListOptions.sortDesc ? "1" : "0";

      if (authority.isPermissible("基金经理")) {
        dataInterface
          .getAdminStkList({
            userId: this.userId,
            stockKey: this.searchFiled.searchKeyWord,
            industryKey: this.searchFiled.indusForFilter
              ? this.searchFiled.indusForFilter.id
              : "",
            raceKey: this.searchFiled.raceForFilter,
            depotKey: this.searchFiled.depotFilter,
            stockLevelKey: this.searchFiled.stockLevel,
            marketKey: this.searchFiled.marketType,
            pageNo: this.rateStockListOptions.page,
            pageSize: this.rateStockListOptions.itemsPerPage,
            orderByKey: this.rateStockListOptions.sortBy,
            ifDesc: ifDesc,
          })
          .then((res) => {
            _self.dealStockList(res.list, newSearch);
          });
      } else {
        dataInterface
          .getStocksByUser({
            userId: this.userId,
            stockKey: this.searchFiled.searchKeyWord,
            industryKey: this.searchFiled.indusForFilter
              ? this.searchFiled.indusForFilter.id
              : "",
            raceKey: this.searchFiled.raceForFilter,
            depotKey: this.searchFiled.depotFilter,
            stockLevelKey: this.searchFiled.stockLevel,
            marketKey: this.searchFiled.marketType,
            pageNo: this.rateStockListOptions.page,
            pageSize: this.rateStockListOptions.itemsPerPage,
            orderByKey: this.rateStockListOptions.sortBy,
            ifDesc: ifDesc,
          })
          .then((res) => {
            _self.dealStockList(res.list, newSearch);
          });
      }
    },
    // 处理股票列表方法。拿到待打分的股票后，批量整理。
    dealStockList(list, newSearch) {
      let i = 0;
      list.forEach((e) => {
        e.index = i;
        i++;
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
        e.five_chgP = e.five_chg ? (e.five_chg * 100).toFixed(2) + "%" : null;
        e.month_chgP = e.month_chg
          ? (e.month_chg * 100).toFixed(2) + "%"
          : null;
        e.ninety_chgP = e.ninety_chg
        ? (e.ninety_chg * 100).toFixed(2) + "%"
        : null;
        e.IPrateP = e.IPrate ? (e.IPrate * 100).toFixed(2) + "%" : null;
        e.ev = (e.ev / 100000000).toFixed(2);
        e.mkt_cap_float = e.mkt_cap_float && e.mkt_cap_float !== '0' ? (e.mkt_cap_float / 100000000).toFixed(2):'-';
        e.stockLevel = this.stockLevelMap[e.stockLevel];
        e.depotShow = e.depot;
        if (e.depot === "0") {
          e.depotShow = " ";
        } else if (e.depot === "99") {
          e.depotShow = "0";
        }
      });
      if (newSearch) {
        // 如果是全新查询，直接赋值
        this.stockList = list;
      } else {
        // 如果是滚动查询，需要叠加之前的数据
        this.stockList = this.stockList.concat(list);
        // this.$refs.coreStockTable.scrollBy(200, 0); // 方法2
      }
      this.chooseCurrentStock(this.stockList[0]);
      this.stockListLoading = false;
    },
    loadMore() {
      // page需要加1
      this.rateStockListOptions.page++;
      this.getRatingStockList();
    },
    doneSaveOneStockScore() {
      this.clickCount++;
      if (this.clickCount > 3) {
        notice.setNotice(
          "info",
          "输入完成后，可以按 (alt + enter) / (ctrl + enter) 快捷保存哟。"
        );
        this.clickCount = -10000;
      }
      this.saveOneStockScore();
    },
    // 保存单个股票得分
    saveOneStockScore() {
      if (!this.$refs["currentScore"].validate(true)) {
        this.$refs["currentScore"].focus();
        return;
      }
      let _self = this;
      this.ratingLoading = true;
      if(this.currentFactor.categoryPid !== '12') {
        this.rateDate = this.today;
      }
      let prop = {
        sfRateList: [
          {
            rateid: this.currentStock[0].rateid,
            freq: this.currentFactor.freq,
            sfid: this.currentFactor.sfid,
            tdate: this.today,
            score: this.currentScore,
            updateuser: this.userId,
            ratingReason: this.currentReason,
            factorId: this.currentFactor.factorId,
            stockCode: this.currentStock[0].stockCode,
            rateDate: this.rateDate,
          },
        ],
      };
      dataInterface.saveRate(prop).then((res) => {
        // sfid: 65292
        if (res.code === "0") {
          _self.factorList[_self.factorIndex].score = _self.currentScore;
          _self.factorList[_self.factorIndex].ratingReason =
            _self.currentReason;
          if (_self.factorIndex < _self.factorList.length - 1) {
            let index = _self.factorIndex + 1;
            _self.currentFactor.sfid = res.sfid;
            _self.clickFactor(_self.factorList[index], index);
          }
          _self.rateDate = _self.today;
          _self.ratingLoading = false;
        }
      });
    },
    changeCurrentTab(index) {
      this.currentIndex = index;
      this.stockTree = [
        JSON.parse(JSON.stringify(this.stockTreeForSearch[index])),
      ];
    },
    // 获取因子历史
    getRateHis() {
      var _self = this;
      dataInterface
        .getRateHis({
          stockCode: this.currentStock[0].stockCode,
          startD: this.defaultStartD,
          endD: this.today,
          factorList: [this.currentFactor.factorId],
        })
        .then((res) => {
          _self.rateHisList = res.list;
        });
    },
    getColor(val) {
      if (val > 0) {
        return "color:red;";
      } else {
        return "color:green;";
      }
    },
    // 退回到前面一页
    goBack() {
      this.$router.back();
    },
    gotoAnnouncement() {
      this.$router.push({
        name: "anouncements",
        params: {
          stockCode: this.currentStock[0].stockCode,
        },
      });
    },
  },

  watch: {},
};
</script>
<style>
.v-label {
  font-size: 14px;
}
.v-input {
  font-size: 14px;
}
.v-data-table td,
.v-data-table th {
  padding-left: 0px !important;
  padding-right: 3px !important;
}
</style>
<style scoped>
.v-card__title {
  padding-bottom: 0px;
}
strong {
  color: black;
}
</style>
