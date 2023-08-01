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
            <template v-slot:item.fiveRate="{ item }">
                <span :style="getColor(item.fiveRate)">{{item.fiveRate_show}}</span>
            </template>
            <template v-slot:item.fiveMaxRate="{ item }">
                <span :style="getColor(item.fiveMaxRate)">{{item.fiveMaxRate_show}}</span>
            </template>
            <template v-slot:item.fiveMaxDrop="{ item }">
                <span :style="getColor(item.fiveMaxDrop)">{{item.fiveMaxDrop_show}}</span>
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
            <template v-slot:item.fiveRate="{ item }">
                <span :style="getColor(item.fiveRate)">{{item.fiveRate_show}}</span>
            </template>
            <template v-slot:item.fiveMaxRate="{ item }">
                <span :style="getColor(item.fiveMaxRate)">{{item.fiveMaxRate_show}}</span>
            </template>
            <template v-slot:item.fiveMaxDrop="{ item }">
                <span :style="getColor(item.fiveMaxDrop)">{{item.fiveMaxDrop_show}}</span>
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
            <template v-slot:item.tenRate="{ item }">
                <span :style="getColor(item.tenRate)">{{item.tenRate_show}}</span>
            </template>
            <template v-slot:item.tenMaxRate="{ item }">
                <span :style="getColor(item.tenMaxRate)">{{item.tenMaxRate_show}}</span>
            </template>
            <template v-slot:item.tenMaxDrop="{ item }">
                <span :style="getColor(item.tenMaxDrop)">{{item.tenMaxDrop_show}}</span>
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
            <template v-slot:item.tenRate="{ item }">
                <span :style="getColor(item.tenRate)">{{item.tenRate_show}}</span>
            </template>
            <template v-slot:item.tenMaxRate="{ item }">
                <span :style="getColor(item.tenMaxRate)">{{item.tenMaxRate_show}}</span>
            </template>
            <template v-slot:item.tenMaxDrop="{ item }">
                <span :style="getColor(item.tenMaxDrop)">{{item.tenMaxDrop_show}}</span>
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
            <template v-slot:item.thirtyRate="{ item }">
                <span :style="getColor(item.thirtyRate)">{{item.thirtyRate_show}}</span>
            </template>
            <template v-slot:item.thirtyMaxRate="{ item }">
                <span :style="getColor(item.thirtyMaxRate)">{{item.thirtyMaxRate_show}}</span>
            </template>
            <template v-slot:item.thirtyMaxDrop="{ item }">
                <span :style="getColor(item.thirtyMaxDrop)">{{item.thirtyMaxDrop_show}}</span>
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
            <template v-slot:item.thirtyRate="{ item }">
                <span :style="getColor(item.thirtyRate)">{{item.thirtyRate_show}}</span>
            </template>
            <template v-slot:item.thirtyMaxRate="{ item }">
                <span :style="getColor(item.thirtyMaxRate)">{{item.thirtyMaxRate_show}}</span>
            </template>
            <template v-slot:item.thirtyMaxDrop="{ item }">
                <span :style="getColor(item.thirtyMaxDrop)">{{item.thirtyMaxDrop_show}}</span>
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
            <template v-slot:item.ninetyRate="{ item }">
                <span :style="getColor(item.ninetyRate)">{{item.ninetyRate_show}}</span>
            </template>
            <template v-slot:item.ninetyMaxRate="{ item }">
                <span :style="getColor(item.ninetyMaxRate)">{{item.ninetyMaxRate_show}}</span>
            </template>
            <template v-slot:item.ninetyMaxDrop="{ item }">
                <span :style="getColor(item.ninetyMaxDrop)">{{item.ninetyMaxDrop_show}}</span>
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
            <template v-slot:item.ninetyRate="{ item }">
                <span :style="getColor(item.ninetyRate)">{{item.ninetyRate_show}}</span>
            </template>
            <template v-slot:item.ninetyMaxRate="{ item }">
                <span :style="getColor(item.ninetyMaxRate)">{{item.ninetyMaxRate_show}}</span>
            </template>
            <template v-slot:item.ninetyMaxDrop="{ item }">
                <span :style="getColor(item.ninetyMaxDrop)">{{item.ninetyMaxDrop_show}}</span>
            </template>
            </v-data-table>
          
      </v-col>
    </v-row>
  </div>
</template>

<script>
import dataInterface from "../../data/marketOverviewData";
// import DataTable from "../DataTable.vue";
export default {
  name: "WholeMarketStatistic3",
  // components: { DataTable },
  props: [],
  data: () => ({
    loading1: false,
    header1: [
      { text: "序号", value: "index", sortable: false },
      { text: "行业代码", value: "industryCode", sortable: false, align: "end" },
      { text: "行业名称", value: "industryName", sortable: false },
      { text: "涨跌幅度", value: "fiveRate", sortable: false },
      { text: "最大上涨", value: "fiveMaxRate", sortable: false },
      { text: "最大回撤", value: "fiveMaxDrop", sortable: false },
    ],
    data1: [],
    loading2: false,
    header2: [
      { text: "序号", value: "index", sortable: false },
      { text: "行业代码", value: "industryCode", sortable: false, align: "end" },
      { text: "行业名称", value: "industryName", sortable: false },
      { text: "涨跌幅度", value: "fiveRate", sortable: false },
      { text: "最大上涨", value: "fiveMaxRate", sortable: false },
      { text: "最大回撤", value: "fiveMaxDrop", sortable: false },
    ],
    data2: [],
    loading3: false,
    header3: [
      { text: "序号", value: "index", sortable: false },
      { text: "行业代码", value: "industryCode", sortable: false, align: "end" },
      { text: "行业名称", value: "industryName", sortable: false },
      { text: "涨跌幅度", value: "tenRate", sortable: false },
      { text: "最大上涨", value: "tenMaxRate", sortable: false },
      { text: "最大回撤", value: "tenMaxDrop", sortable: false },
    ],
    data3: [],
    loading4: false,
    header4: [
      { text: "序号", value: "index", sortable: false },
      { text: "行业代码", value: "industryCode", sortable: false, align: "end" },
      { text: "行业名称", value: "industryName", sortable: false },
      { text: "涨跌幅度", value: "tenRate", sortable: false },
      { text: "最大上涨", value: "tenMaxRate", sortable: false },
      { text: "最大回撤", value: "tenMaxDrop", sortable: false },
    ],
    data4: [],
    loading5: false,
    header5: [
       { text: "序号", value: "index", sortable: false },
      { text: "行业代码", value: "industryCode", sortable: false, align: "end" },
      { text: "行业名称", value: "industryName", sortable: false },
      { text: "涨跌幅度", value: "thirtyRate", sortable: false },
      { text: "最大上涨", value: "thirtyMaxRate", sortable: false },
      { text: "最大回撤", value: "thirtyMaxDrop", sortable: false },
    ],
    data5: [],
    loading6: false,
    header6: [
      { text: "序号", value: "index", sortable: false },
      { text: "行业代码", value: "industryCode", sortable: false, align: "end" },
      { text: "行业名称", value: "industryName", sortable: false },
      { text: "涨跌幅度", value: "thirtyRate", sortable: false },
      { text: "最大上涨", value: "thirtyMaxRate", sortable: false },
      { text: "最大回撤", value: "thirtyMaxDrop", sortable: false },
    ],
    data6: [],
    loading7: false,
    header7: [
      { text: "序号", value: "index", sortable: false },
      { text: "行业代码", value: "industryCode", sortable: false, align: "end" },
      { text: "行业名称", value: "industryName", sortable: false },
      { text: "涨跌幅度", value: "ninetyRate", sortable: false },
      { text: "最大上涨", value: "ninetyMaxRate", sortable: false },
      { text: "最大回撤", value: "ninetyMaxDrop", sortable: false },
    ],
    data7: [],
    loading8: false,
    header8: [
      { text: "序号", value: "index", sortable: false },
      { text: "行业代码", value: "industryCode", sortable: false, align: "end" },
      { text: "行业名称", value: "industryName", sortable: false },
      { text: "涨跌幅度", value: "ninetyRate", sortable: false },
      { text: "最大上涨", value: "ninetyMaxRate", sortable: false },
      { text: "最大回撤", value: "ninetyMaxDrop", sortable: false },
    ],
    data8: [],
  }),
  mounted() {
    var types = ["fiveRate", "tenRate", "thirtyRate", "ninetyRate"];
    let j = 1;
    for (let i = 0; i < types.length; i++) {
      // 升序
      this.getIndTwoMarketChg(types[i], j, "1");
      j++;
      // 降序
      this.getIndTwoMarketChg(types[i], j, "0");
      j++;
    }
  },
  methods: {
    //   swIndustryTop2
    getIndTwoMarketChg(type, index, desc) {
      var _self = this;
      this["loading" + index] = true;
      dataInterface
        .getIndTwoMarketChg({ orderByKey: type, ifDesc: desc })
        .then((res) => {
          console.log(res);
          var i = 1;
          res.list.forEach((e) => {
            e.index = i < 10 ? '0' + i : i;
            i++;
            e.fiveRate_show = this.toPercent(e.fiveRate);
            e.fiveMaxRate_show = this.toPercent(e.fiveMaxRate);
            e.fiveMaxDrop_show = this.toPercent(e.fiveMaxDrop);
            e.tenRate_show = this.toPercent(e.tenRate);
            e.tenMaxRate_show = this.toPercent(e.tenMaxRate);
            e.tenMaxDrop_show = this.toPercent(e.tenMaxDrop);
            e.thirtyRate_show = this.toPercent(e.thirtyRate);
            e.thirtyMaxRate_show = this.toPercent(e.thirtyMaxRate);
            e.thirtyMaxDrop_show = this.toPercent(e.thirtyMaxDrop);
            e.ninetyRate_show = this.toPercent(e.ninetyRate);
            e.ninetyMaxRate_show = this.toPercent(e.ninetyMaxRate);
            e.ninetyMaxDrop_show = this.toPercent(e.ninetyMaxDrop);
          });
          this["loading" + index] = false;
          _self["data" + index] = res.list;
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
