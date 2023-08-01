<template>
  <v-container fluid style="overflow-y: scroll">
    <h2>数据管理</h2>

    <v-hover>
      <template v-slot="{ hover }">
        <v-card
          :elevation="hover ? 6 : 2"
          style="border-radius: 5px; margin-top: 18px"
        >
          <v-card-title> 上传量化打分 </v-card-title>
          <v-card-text>
            <div style="width: 280px">
              <v-file-input
                v-model="files"
                dense
                full-width
                label="点击此处选择文件"
              ></v-file-input>
            </div>
          </v-card-text>
        </v-card> </template
    ></v-hover>
    <v-hover>
      <template v-slot="{ hover }">
        <v-card
          :elevation="hover ? 6 : 2"
          style="border-radius: 5px; margin-top: 18px"
        >
          <v-card-title>
            添加复盘股票
            <v-spacer></v-spacer>
            <div style="width: 210px; margin-right: 5px; margin-top: -15px">
              <v-menu
                v-model="menuForDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="reviewDate"
                    label="复盘日期"
                    prepend-icon="event"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="reviewDate"
                  @input="menuForDatePicker = false"
                ></v-date-picker>
              </v-menu>
            </div>
            <div style="width: 210px">
              <v-autocomplete
                dense
                v-model="newStockField"
                :items="stockList"
                :loading="addLoading"
                :search-input.sync="search"
                cache-items
                hide-no-data
                hide-selected
                item-text="showName"
                item-value="stockCode"
                label="添加股票"
                clearable
                placeholder="输入股票名字或代码"
                return-object
                @change="addNewStkToReview"
              >
              </v-autocomplete>
            </div>
          </v-card-title>
          <v-card-text>
            <v-data-table
              dense
              :headers="reviewHeader"
              :hide-default-footer="true"
              :footer-props="{
                itemsPerPageOptions: [100],
              }"
              :items="reviewItem"
            >
              <template v-slot:item.ifInPool="{ item }">
                <template v-if="item.ifInPool === '0'"> 未入池 </template>
                <template v-else-if="item.ifInPool === '1'"> 已入池 </template>
              </template>
              
              <template v-slot:item.Weekrate="{ item }">
                <span :style="getColor(item.Weekrate)">{{
                          item.WeekrateP
                        }}</span>
              </template>
              <template v-slot:item.weekMaxRate="{ item }">
                <span :style="getColor(item.weekMaxRate)">{{
                          item.weekMaxRateP
                        }}</span>
              </template><template v-slot:item.weekMinRate="{ item }">
                <span :style="getColor(item.weekMinRate)">{{
                          item.weekMinRateP
                        }}</span>
              </template>
              <template v-slot:item.action="{ item }">
                <a @click="canclStk(item)">取消</a>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </template>
    </v-hover>
  </v-container>
</template>

<script>
// import dataInterface from "../data/stockPoolsData"
import dataUtil from "../data/dataUtil/httpUtils";
import commonDataInterface from "../data/commonData";
import moment from "moment";

export default {
  name: "fileUploadTest",
  data: () => ({
    files: [],
    reviewHeader: [
      { text: "股票名称", value: "stockName" },
      { text: "股票代码", value: "stockCode" },
      { text: "是否入池", value: "ifInPool" },
      { text: "总市值(亿元)", value: "ev", align:'end',width:'200px'},
      { text: "当周涨幅", value: "Weekrate" },
      { text: "当周振幅", value: "weekSwing" },
      { text: "最大涨幅", value: "weekMaxRate" },
      { text: "最大跌幅", value: "weekMinRate" },
      { text: "操作", value: "action" },
    ],
    coreOptions: {
      sortBy: 'stockName'
    },
    reviewItem: [],
    newReviewStk: "",
    newStockField: {},
    stockList: [],
    addLoading: false,
    search: null,
    menuForDatePicker: false,
    reviewDate: null,
    loadingTest: false,
  }),
  created() {
    this.reviewDate = moment().format("YYYY-MM-DD");
    // this.getReviewPool();
  },
  methods: {
    loadMore() {
      console.log("我要加载更多啦啦啦！");
    },
    upload(file) {
      console.log(file);
      // 创建FormData对象
      let param = new FormData();
      // 将得到的文件流添加到FormData对象
      param.append("file", file, file.name);
      dataUtil
        .upload("controller/stockFactorController.php?uploadJyFactor", param)
        .then((e) => {
          console.log(e);
          alert("上传成功");
        });
    },
    getStocksByKey(key) {
      this.addLoading = true;
      let _self = this;
      commonDataInterface
        .getStocksByKey({ key: key, allStock: "1" })
        .then((res) => {
          res.list.forEach((e) => {
            e.showName =
              e.stockName + " | " + e.stockCode + " (" + e.pinyin + ")";
          });
          _self.stockList = res.list;
          _self.addLoading = false;
        });
    },
    // 添加新股票
    addNewStkToReview() {
      if (this.newStockField) {
        var _self = this;
        dataUtil
          .postWithURL("controller/stockController.php?saveOrUpdateWeekStock", {
            stockCode: this.newStockField.stockCode,
            weekDate: this.reviewDate,
            dr: 0,
          })
          .then((res) => {
            console.log(res);
            _self.getReviewPool();
            _self.newStockField = null;
          });
      }
    },
    // 取消股票
    canclStk(item) {
      var _self = this;
      dataUtil
        .postWithURL("controller/stockController.php?saveOrUpdateWeekStock", {
          stockCode: item.stockCode,
          weekDate: this.reviewDate,
          dr: 1,
        })
        .then((res) => {
          console.log(res);
          _self.getReviewPool();
        });
    },
    // 查询复盘股票池
    getReviewPool() {
      var _self = this;
      dataUtil
        .postWithURL("controller/stockController.php?getWeekStock", {
          weekDate: this.reviewDate,
        })
        .then((res) => {
          res.list.forEach(e => {
            e.ev = (e.ev / 100000000).toFixed(2);
            e.weekMaxRateP = _self.toPercent(e.weekMaxRate);
            e.weekMinRateP = _self.toPercent(e.weekMinRate);
            e.WeekrateP = _self.toPercent(e.Weekrate);
            e.weekSwing = e.weekSwing ?  e.weekSwing + '%' : "";
          })
          _self.reviewItem = res.list;
        });
    },
    // 加百分比
    toPercent(value) {
      return value ? (value * 100).toFixed(2) + "%" : null;
    },

    getColor(val) {
      if (val > 0) {
        return "color:red;";
      } else {
        return "color:green;";
      }
    },
    aa (item) {
      console.log(item);
    }
  },
  watch: {
    files(value) {
      this.upload(value);
    },
    search(val) {
      // this.search = val.toString();
      val && val !== this.newStockField && this.getStocksByKey(val);
    },
    reviewDate(val) {
      if (val) {
        this.getReviewPool();
      }
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
.v-card__title {
  padding-bottom: 0px;
}
