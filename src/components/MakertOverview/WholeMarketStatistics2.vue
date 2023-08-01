<template>
  <div>
    <!-- controller/marketController.php?allMarketChg -->
    <!-- 全市场和内部行情分析 start-->
        <v-card style="border-radius: 5px">
          <v-card-title>
            市场和内部行情分析
          </v-card-title>
          <v-card-text style="padding-bottom: 0px">
            <data-table
              :columns="allMarketHeader"
              :data="allMarketItems"
              :width="'100%'"
              :loading="allMarketLoading"
              :options="allMarketOptions"
            >

            <template v-slot:fiveRate="item">
                <span :style="getColor(item.item.fiveRate, item.item.noColor)">{{
                  item.item.fiveRateP
                }}</span>
              </template>
              <template v-slot:tenRate="item">
                <span :style="getColor(item.item.tenRate, item.item.noColor)">{{
                  item.item.tenRateP
                }}</span>
              </template>
              <template v-slot:thirtyRate="item">
                <span :style="getColor(item.item.thirtyRate, item.item.noColor)">{{
                  item.item.thirtyRateP
                }}</span>
              </template>
              <template v-slot:ninetyRate="item">
                <span :style="getColor(item.item.ninetyRate, item.item.noColor)">{{
                  item.item.ninetyRateP
                }}</span>
              </template>
              <template v-slot:inPoolRate="item">
                <span :style="getColor(item.item.inPoolRate, item.item.noColor)">{{
                  item.item.inPoolRateP
                }}</span>
              </template>

            </data-table>
          </v-card-text>
        </v-card>
    <!-- 全市场和内部行情分析 end -->
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
            <template v-slot:item.Weekrate="{ item }">
                <span :style="getColor(item.Weekrate)">{{item.Weekrate_show}}</span>
            </template>
            <template v-slot:item.Weekmaxrate="{ item }">
                <span :style="getColor(item.Weekmaxrate)">{{item.Weekmaxrate_show}}</span>
            </template>
            <template v-slot:item.Weekmaxdrop="{ item }">
                <span :style="getColor(item.Weekmaxdrop)">{{item.Weekmaxdrop_show}}</span>
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
            <template v-slot:item.Weekrate="{ item }">
                <span :style="getColor(item.Weekrate)">{{item.Weekrate_show}}</span>
            </template>
            <template v-slot:item.Weekmaxrate="{ item }">
                <span :style="getColor(item.Weekmaxrate)">{{item.Weekmaxrate_show}}</span>
            </template>
            <template v-slot:item.Weekmaxdrop="{ item }">
                <span :style="getColor(item.Weekmaxdrop)">{{item.Weekmaxdrop_show}}</span>
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
            <template v-slot:item.Tenrate="{ item }">
                <span :style="getColor(item.Tenrate)">{{item.Tenrate_show}}</span>
            </template>
            <template v-slot:item.Tenmaxrate="{ item }">
                <span :style="getColor(item.Tenmaxrate)">{{item.Tenmaxrate_show}}</span>
            </template>
            <template v-slot:item.Tenmaxdrop="{ item }">
                <span :style="getColor(item.Tenmaxdrop)">{{item.Tenmaxdrop_show}}</span>
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
            <template v-slot:item.Tenrate="{ item }">
                <span :style="getColor(item.Tenrate)">{{item.Tenrate_show}}</span>
            </template>
            <template v-slot:item.Tenmaxrate="{ item }">
                <span :style="getColor(item.Tenmaxrate)">{{item.Tenmaxrate_show}}</span>
            </template>
            <template v-slot:item.Tenmaxdrop="{ item }">
                <span :style="getColor(item.Tenmaxdrop)">{{item.Tenmaxdrop_show}}</span>
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
            <template v-slot:item.Thirtyrate="{ item }">
                <span :style="getColor(item.Thirtyrate)">{{item.Thirtyrate_show}}</span>
            </template>
            <template v-slot:item.Thirtymaxrate="{ item }">
                <span :style="getColor(item.Thirtymaxrate)">{{item.Thirtymaxrate_show}}</span>
            </template>
            <template v-slot:item.Thirtymaxdrop="{ item }">
                <span :style="getColor(item.Thirtymaxdrop)">{{item.Thirtymaxdrop_show}}</span>
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
            <template v-slot:item.Thirtyrate="{ item }">
                <span :style="getColor(item.Thirtyrate)">{{item.Thirtyrate_show}}</span>
            </template>
            <template v-slot:item.Thirtymaxrate="{ item }">
                <span :style="getColor(item.Thirtymaxrate)">{{item.Thirtymaxrate_show}}</span>
            </template>
            <template v-slot:item.Thirtymaxdrop="{ item }">
                <span :style="getColor(item.Thirtymaxdrop)">{{item.Thirtymaxdrop_show}}</span>
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
            <template v-slot:item.Ninetyrate="{ item }">
                <span :style="getColor(item.Ninetyrate)">{{item.Ninetyrate_show}}</span>
            </template>
            <template v-slot:item.Ninetymaxrate="{ item }">
                <span :style="getColor(item.Ninetymaxrate)">{{item.Ninetymaxrate_show}}</span>
            </template>
            <template v-slot:item.Ninetymaxdrop="{ item }">
                <span :style="getColor(item.Ninetymaxdrop)">{{item.Ninetymaxdrop_show}}</span>
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
            <template v-slot:item.Ninetyrate="{ item }">
                <span :style="getColor(item.Ninetyrate)">{{item.Ninetyrate_show}}</span>
            </template>
            <template v-slot:item.Ninetymaxrate="{ item }">
                <span :style="getColor(item.Ninetymaxrate)">{{item.Ninetymaxrate_show}}</span>
            </template>
            <template v-slot:item.Ninetymaxdrop="{ item }">
                <span :style="getColor(item.Ninetymaxdrop)">{{item.Ninetymaxdrop_show}}</span>
            </template>
            </v-data-table>
          
      </v-col>
    </v-row>
  </div>
</template>

<script>
import dataInterface from "../../data/marketOverviewData";
import DataTable from "../DataTable.vue";
export default {
  name: "WholeMarketStatistic2",
  components: { DataTable },
  props: [],
  data: () => ({
    allMarketHeader: [
      { text: "股票池", value: "sw_industry_name", width: "", sortable: false },
      { text: "成立以来", value: "inPoolRate", width: "", sortable: false, align: "end"},
      { text: "5日", value: "fiveRate", width: "", sortable: false, align: "end" },
      { text: "10日", value: "tenRate", width: "", sortable: false, align: "end" },
      { text: "30日", value: "thirtyRate", width: "", sortable: false, align: "end" },
      { text: "90日", value: "ninetyRate", width: "", sortable: false, align: "end" },
    ],
    allMarketItems: [],
    allMarketLoading: false,
    allMarketOptions: {
      itemsPerPage: 50,
    },
    loading1: false,
    header1: [
      { text: "序号", value: "index", sortable: false },
      { text: "股票代码", value: "stockCode", sortable: false, align: "end" },
      { text: "股票名称", value: "name", sortable: false },
      { text: "行业", value: "industry", sortable: false },
      { text: "近5日涨幅", value: "Weekrate", sortable: false },
      { text: "最大上涨", value: "Weekmaxrate", sortable: false },
      { text: "最大回撤", value: "Weekmaxdrop", sortable: false },
    ],
    data1: [],
    loading2: false,
    header2: [
      { text: "序号", value: "index", sortable: false },
      { text: "股票代码", value: "stockCode", sortable: false, align: "end" },
      { text: "股票名称", value: "name", sortable: false },
      { text: "行业", value: "industry", sortable: false },
      { text: "近5日跌幅", value: "Weekrate", sortable: false },
      { text: "最大上涨", value: "Weekmaxrate", sortable: false },
      { text: "最大回撤", value: "Weekmaxdrop", sortable: false },
    ],
    data2: [],
    loading3: false,
    header3: [
      { text: "序号", value: "index", sortable: false },
      { text: "股票代码", value: "stockCode", sortable: false, align: "end" },
      { text: "股票名称", value: "name", sortable: false },
      { text: "行业", value: "industry", sortable: false },
      { text: "10日涨幅", value: "Tenrate", sortable: false },
      { text: "最大上涨", value: "Tenmaxrate", sortable: false },
      { text: "最大回撤", value: "Tenmaxdrop", sortable: false },
    ],
    data3: [],
    loading4: false,
    header4: [
       { text: "序号", value: "index", sortable: false },
      { text: "股票代码", value: "stockCode", sortable: false, align: "end" },
      { text: "股票名称", value: "name", sortable: false },
      { text: "行业", value: "industry", sortable: false },
      { text: "10日跌幅", value: "Tenrate", sortable: false },
      { text: "最大上涨", value: "Tenmaxrate", sortable: false },
      { text: "最大回撤", value: "Tenmaxdrop", sortable: false },
    ],
    data4: [],
    loading5: false,
    header5: [
       { text: "序号", value: "index", sortable: false },
      { text: "股票代码", value: "stockCode", sortable: false, align: "end" },
      { text: "股票名称", value: "name", sortable: false },
      { text: "行业", value: "industry", sortable: false },
      { text: "30日涨幅", value: "Thirtyrate", sortable: false },
      { text: "最大上涨", value: "Thirtymaxrate", sortable: false },
      { text: "最大回撤", value: "Thirtymaxdrop", sortable: false },
    ],
    data5: [],
    loading6: false,
    header6: [
      { text: "序号", value: "index", sortable: false },
      { text: "股票代码", value: "stockCode", sortable: false, align: "end" },
      { text: "股票名称", value: "name", sortable: false },
      { text: "行业", value: "industry", sortable: false },
      { text: "30日跌幅", value: "Thirtyrate", sortable: false },
      { text: "最大上涨", value: "Thirtymaxrate", sortable: false },
      { text: "最大回撤", value: "Thirtymaxdrop", sortable: false },
    ],
    data6: [],
    loading7: false,
    header7: [
      { text: "序号", value: "index", sortable: false },
      { text: "股票代码", value: "stockCode", sortable: false, align: "end" },
      { text: "股票名称", value: "name", sortable: false },
      { text: "行业", value: "industry", sortable: false },
      { text: "90日涨幅", value: "Ninetyrate", sortable: false },
      { text: "最大上涨", value: "Ninetymaxrate", sortable: false },
      { text: "最大回撤", value: "Ninetymaxdrop", sortable: false },
    ],
    data7: [],
    loading8: false,
    header8: [
      { text: "序号", value: "index", sortable: false },
      { text: "股票代码", value: "stockCode", sortable: false, align: "end" },
      { text: "股票名称", value: "name", sortable: false },
      { text: "行业", value: "industry", sortable: false },
      { text: "90日跌幅", value: "Ninetyrate", sortable: false },
      { text: "最大上涨", value: "Ninetymaxrate", sortable: false },
      { text: "最大回撤", value: "Ninetymaxdrop", sortable: false },
    ],
    data8: [],
  }),
  mounted() {
    var types = ["fiveRate", "tenRate", "thirtyRate", "ninetyRate"];
    let j = 1;
    for (let i = 0; i < types.length; i++) {
      // 升序
      this.getSwIndustryTop2(types[i], j, "1");
      j++;
      // 降序
      this.getSwIndustryTop2(types[i], j, "0");
      j++;
    }
    this.getAllMarketChg();
  },
  methods: {
    //   swIndustryTop2
    getSwIndustryTop2(type, index, desc) {
      var _self = this;
      this["loading" + index] = true;
      dataInterface
        .getAllAMarketChg({ orderByKey: type, ifDesc: desc })
        .then((res) => {
          var i = 1;
          res.list.forEach((e) => {
            e.index = i < 10 ? '0' + i : i;
            i++;
            e.Weekrate_show = this.toPercent(e.Weekrate);
            e.Weekmaxrate_show = this.toPercent(e.Weekmaxrate);
            e.Weekmaxdrop_show = this.toPercent(e.Weekmaxdrop);
            e.Tenrate_show = this.toPercent(e.Tenrate);
            e.Tenmaxrate_show = this.toPercent(e.Tenmaxrate);
            e.Tenmaxdrop_show = this.toPercent(e.Tenmaxdrop);
            e.Ninetyrate_show = this.toPercent(e.Ninetyrate);
            e.Ninetymaxrate_show = this.toPercent(e.Ninetymaxrate);
            e.Ninetymaxdrop_show = this.toPercent(e.Ninetymaxdrop);
            e.Thirtyrate_show = this.toPercent(e.Thirtyrate);
            e.Thirtymaxrate_show = this.toPercent(e.Thirtymaxrate);
            e.Thirtymaxdrop_show = this.toPercent(e.Thirtymaxdrop);
          });
          this["loading" + index] = false;
          _self["data" + index] = res.list;
        });
    },
    // 获取全市场统计数据
    getAllMarketChg() {
      let _self = this;
      this.allMarketLoading = true;
      dataInterface.getAllMarketChg({}).then((res) => {
        for (let i = 0; i < 4; i++) {
          res.list[i].fiveRateP = res.list[i].fiveRate;
          res.list[i].tenRateP = res.list[i].tenRate;
          res.list[i].thirtyRateP = res.list[i].thirtyRate;
          res.list[i].ninetyRateP = res.list[i].ninetyRate;
          res.list[i].inPoolRateP = res.list[i].inPoolRate;
          res.list[i].noColor = true;
        }

        for (let i = 4; i < res.list.length; i++) {
          res.list[i].fiveRateP = _self.toPercent(res.list[i].fiveRate);
          res.list[i].tenRateP = _self.toPercent(res.list[i].tenRate);
          res.list[i].thirtyRateP = _self.toPercent(res.list[i].thirtyRate);
          res.list[i].ninetyRateP = _self.toPercent(res.list[i].ninetyRate);
          res.list[i].inPoolRateP = _self.toPercent(res.list[i].inPoolRate);
        }
        // res.list[0].noColor = true;
        // res.list[1].noColor = true;
        // res.list[2].noColor = true;
        _self.allMarketItems = res.list;
        _self.allMarketLoading = false;
      });
    },
    // 加百分比
    toPercent(value) {
      return value ? (value * 100).toFixed(2) + "%" : null;
    },
    getColor(val, noColor) {
      if (noColor) {
        return 'color:auto;'
      }
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
