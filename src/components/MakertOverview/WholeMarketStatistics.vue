<template>
  <div>
    <v-row>
      <v-col cols="6" style="padding-bottom: 0px">
            <v-data-table
              :loading="loading1"
              dense
              :fixed-header="true"
              :headers="header1"
              :hide-default-footer="true"
              :items="data1"
              :items-per-page="20"
            >
            <template v-slot:item.five_chg="{ item }">
                <span :style="getColor(item.five_chg)">{{item.five_chg_show}}</span>
            </template>
            <template v-slot:item.stockCode="{ item }">
                <span v-if="isInPool === '1'" style="color:#f9aa33">{{item.stockCode}}</span>
                <span v-else>{{item.stockCode}}</span>
            </template>
            <template v-slot:item.stockName="{ item }">
                <span v-if="isInPool === '1'" style="color:#f9aa33">{{item.stockName}}</span>
                <span v-else>{{item.stockName}}</span>
            </template>
            </v-data-table>
      </v-col>
      <v-col cols="6">
        
            <v-data-table
              :loading="loading2"
              dense
              :fixed-header="true"
              :headers="header2"
              :hide-default-footer="true"
              :items="data2"
              :items-per-page="20"
            >
            <template v-slot:item.five_chg="{ item }">
                <span :style="getColor(item.five_chg)">{{item.five_chg_show}}</span>
            </template>
            <template v-slot:item.stockCode="{ item }">
                <span v-if="isInPool === '1'" style="color:#f9aa33">{{item.stockCode}}</span>
                <span v-else>{{item.stockCode}}</span>
            </template>
            <template v-slot:item.stockName="{ item }">
                <span v-if="isInPool === '1'" style="color:#f9aa33">{{item.stockName}}</span>
                <span v-else>{{item.stockName}}</span>
            </template>
            </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
            <v-data-table
              :loading="loading3"
              dense
              :fixed-header="true"
              :headers="header3"
              :hide-default-footer="true"
              :items="data3"
              :items-per-page="20"
            >
            <template v-slot:item.ten_chg="{ item }">
                <span :style="getColor(item.ten_chg)">{{item.ten_chg_show}}</span>
            </template>
            <template v-slot:item.stockCode="{ item }">
                <span v-if="isInPool === '1'" style="color:#f9aa33">{{item.stockCode}}</span>
                <span v-else>{{item.stockCode}}</span>
            </template>
            <template v-slot:item.stockName="{ item }">
                <span v-if="isInPool === '1'" style="color:#f9aa33">{{item.stockName}}</span>
                <span v-else>{{item.stockName}}</span>
            </template>
            </v-data-table>
      </v-col>
      <v-col cols="6">
            <v-data-table
              :loading="loading4"
              dense
              :fixed-header="true"
              :headers="header4"
              :hide-default-footer="true"
              :items="data4"
              :items-per-page="20"
            >
            <template v-slot:item.ten_chg="{ item }">
                <span :style="getColor(item.ten_chg)">{{item.ten_chg_show}}</span>
            </template>
            <template v-slot:item.stockCode="{ item }">
                <span v-if="isInPool === '1'" style="color:#f9aa33">{{item.stockCode}}</span>
                <span v-else>{{item.stockCode}}</span>
            </template>
            <template v-slot:item.stockName="{ item }">
                <span v-if="isInPool === '1'" style="color:#f9aa33">{{item.stockName}}</span>
                <span v-else>{{item.stockName}}</span>
            </template>
            </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
            <v-data-table
              :loading="loading5"
              dense
              :fixed-header="true"
              :headers="header5"
              :hide-default-footer="true"
              :items="data5"
              :items-per-page="20"
            >
            <template v-slot:item.month_chg="{ item }">
                <span :style="getColor(item.month_chg)">{{item.month_chg_show}}</span>
            </template>
            <template v-slot:item.stockCode="{ item }">
                <span v-if="isInPool === '1'" style="color:#f9aa33">{{item.stockCode}}</span>
                <span v-else>{{item.stockCode}}</span>
            </template>
            <template v-slot:item.stockName="{ item }">
                <span v-if="isInPool === '1'" style="color:#f9aa33">{{item.stockName}}</span>
                <span v-else>{{item.stockName}}</span>
            </template>
            </v-data-table>
      </v-col>
      <v-col cols="6">
        
            <v-data-table
              :loading="loading6"
              dense
              :fixed-header="true"
              :headers="header6"
              :hide-default-footer="true"
              :items="data6"
              :items-per-page="20"
            >
            <template v-slot:item.month_chg="{ item }">
                <span :style="getColor(item.month_chg)">{{item.month_chg_show}}</span>
            </template>
            <template v-slot:item.stockCode="{ item }">
                <span v-if="isInPool === '1'" style="color:#f9aa33">{{item.stockCode}}</span>
                <span v-else>{{item.stockCode}}</span>
            </template>
            <template v-slot:item.stockName="{ item }">
                <span v-if="isInPool === '1'" style="color:#f9aa33">{{item.stockName}}</span>
                <span v-else>{{item.stockName}}</span>
            </template>
            </v-data-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        
            <v-data-table
              :loading="loading7"
              dense
              :fixed-header="true"
              :headers="header7"
              :hide-default-footer="true"
              :items="data7"
              :items-per-page="20"
            >
            <template v-slot:item.ninety_chg="{ item }">
                <span :style="getColor(item.ninety_chg)">{{item.ninety_chg_show}}</span>
            </template>
            <template v-slot:item.stockCode="{ item }">
                <span v-if="isInPool === '1'" style="color:#f9aa33">{{item.stockCode}}</span>
                <span v-else>{{item.stockCode}}</span>
            </template>
            <template v-slot:item.stockName="{ item }">
                <span v-if="isInPool === '1'" style="color:#f9aa33">{{item.stockName}}</span>
                <span v-else>{{item.stockName}}</span>
            </template>
            </v-data-table>
          
      </v-col>
      <v-col cols="6">
        
            <v-data-table
              :loading="loading8"
              dense
              :fixed-header="true"
              :headers="header8"
              :hide-default-footer="true"
              :items="data8"
              :items-per-page="20"
            >
            <template v-slot:item.ninety_chg="{ item }">
                <span :style="getColor(item.ninety_chg)">{{item.ninety_chg_show}}</span>
            </template>
            <template v-slot:item.stockCode="{ item }">
                <span v-if="isInPool === '1'" style="color:#f9aa33">{{item.stockCode}}</span>
                <span v-else>{{item.stockCode}}</span>
            </template>
            <template v-slot:item.stockName="{ item }">
                <span v-if="isInPool === '1'" style="color:#f9aa33">{{item.stockName}}</span>
                <span v-else>{{item.stockName}}</span>
            </template>
            </v-data-table>
          
      </v-col>
    </v-row>
  </div>
</template>

<script>
import dataInterface from "../../data/marketOverviewData";
export default {
  name: "WholeMarketStatistic",
  props: [],
  data: () => ({
    loading1: false,
    header1: [
      { text: "序号", value: "index", sortable: false },
      { text: "股票代码", value: "stockCode", sortable: false, align: "end" },
      { text: "股票名称", value: "stockName", sortable: false },
      { text: "申万三级行业", value: "industry", sortable: false },
      { text: "近5日涨幅", value: "five_chg", sortable: false },
    ],
    data1: [],
    loading2: false,
    header2: [
      { text: "序号", value: "index", sortable: false },
      { text: "股票代码", value: "stockCode", sortable: false, align: "end" },
      { text: "股票名称", value: "stockName", sortable: false },
      { text: "申万三级行业", value: "industry", sortable: false },
      { text: "近5日跌幅", value: "five_chg", sortable: false },
    ],
    data2: [],
    loading3: false,
    header3: [
      { text: "序号", value: "index", sortable: false },
      { text: "股票代码", value: "stockCode", sortable: false, align: "end" },
      { text: "股票名称", value: "stockName", sortable: false },
      { text: "申万三级行业", value: "industry", sortable: false },
      { text: "近10日涨幅", value: "ten_chg", sortable: false },
    ],
    data3: [],
    loading4: false,
    header4: [
      { text: "序号", value: "index", sortable: false },
      { text: "股票代码", value: "stockCode", sortable: false, align: "end" },
      { text: "股票名称", value: "stockName", sortable: false },
      { text: "申万三级行业", value: "industry", sortable: false },
      { text: "近10日跌幅", value: "ten_chg", sortable: false },
    ],
    data4: [],
    loading5: false,
    header5: [
      { text: "序号", value: "index", sortable: false },
      { text: "股票代码", value: "stockCode", sortable: false, align: "end" },
      { text: "股票名称", value: "stockName", sortable: false },
      { text: "申万三级行业", value: "industry", sortable: false },
      { text: "近30日涨幅", value: "month_chg", sortable: false },
    ],
    data5: [],
    loading6: false,
    header6: [
      { text: "序号", value: "index", sortable: false },
      { text: "股票代码", value: "stockCode", sortable: false, align: "end" },
      { text: "股票名称", value: "stockName", sortable: false },
      { text: "申万三级行业", value: "industry", sortable: false },
      { text: "近30日跌幅", value: "month_chg", sortable: false },
    ],
    data6: [],
    loading7: false,
    header7: [
      { text: "序号", value: "index", sortable: false },
      { text: "股票代码", value: "stockCode", sortable: false, align: "end" },
      { text: "股票名称", value: "stockName", sortable: false },
      { text: "申万三级行业", value: "industry", sortable: false },
      { text: "近90日涨幅", value: "ninety_chg", sortable: false },
    ],
    data7: [],
    loading8: false,
    header8: [
      { text: "序号", value: "index", sortable: false },
      { text: "股票代码", value: "stockCode", sortable: false, align: "end" },
      { text: "股票名称", value: "stockName", sortable: false },
      { text: "申万三级行业", value: "industry", sortable: false },
      { text: "近90日跌幅", value: "ninety_chg", sortable: false },
    ],
    data8: [],
  }),
  mounted() {
    var types = ["five_chg", "ten_chg", "month_chg", "ninety_chg"];
    let j = 1;
    for (let i = 0; i < types.length; i++) {
      // 升序
      this.getSwIndustryTop2(types[i], j, "1");
      j++;
      // 降序
      this.getSwIndustryTop2(types[i], j, "0");
      j++;
    }
  },
  methods: {
    //   swIndustryTop2
    getSwIndustryTop2(type, index, desc) {
      var _self = this;
      this["loading" + index] = true;
      dataInterface
        .swIndustryTop2({ orderByKey: type, ifDesc: desc })
        .then((res) => {
          var i = 1;
          res.list.forEach((e) => {
            e.index = i < 10 ? '0' + i : i;
            i++;
            e.five_chg_show = this.toPercent(e.five_chg);
            e.ten_chg_show = this.toPercent(e.ten_chg);
            e.month_chg_show = this.toPercent(e.month_chg);
            e.ninety_chg_show = this.toPercent(e.ninety_chg);
          });
          this["loading" + index] = false;
          _self["data" + index] = res.list;
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
  },
  computed: {},
  watch: {},
};
</script>
<style>
</style>
