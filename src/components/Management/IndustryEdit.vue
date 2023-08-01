<template>
  <div>
    <v-card>
      <v-card-title style="font-size: 1.05em">查看行业</v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="industry.industry"
                :success-messages="saveSucInfo"
                dense
                label="行业名称"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="industry.comment"
                dense
                label="备注"
              ></v-text-field>
            </v-col>

          </v-row>
          <v-row style="margin-top:-30px;">
            <v-col cols="12" style="text-align:right;">
              <v-btn
                style=""
                small
                dark
                color="primary"
                elevation="2"
                outlined
                @click="saveIndustry"
              >
                <v-icon left dense small>save</v-icon>
                保存行业名字</v-btn
              >
            </v-col>
          </v-row>
          <!-- 股票关联操作部分 start -->
          <v-row v-show="industry.id !== undefined">
            <!-- <v-col cols="7">
              <v-card outlined style="border-radius: 10px">
                <v-card-title style="font-size: 1.1em">候选股票池</v-card-title>
                <v-card-text>
                  <div style="display: flex">
                    <v-text-field
                      v-model="filterStockC"
                      dense
                      @change="getStocklist(true)"
                      label="筛选"
                      placeholder="输入股票名字或代码"
                    ></v-text-field>
                    <div>
                      <v-btn
                        fab
                        dark
                        x-small
                        elevation="2"
                        outlined
                        color="primary"
                        @click="getStocklist(true)"
                      >
                        <v-icon dark>search</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <v-data-table
                    :headers="stockListHeader"
                    :items="stockList"
                    :loading="stocksLoading"
                    dense
                    :options.sync="stocksOptions"
                    :server-items-length="stkListLength"
                    :footer-props="{
                      itemsPerPageOptions: [10],
                    }"
                  >
                    <template v-slot:item.action="{ item }">
                      <a @click="addToRace(item)">关联</a>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col> -->
            <v-col cols="12">
              <v-card
                color="#e0e0e0"
                style="border-radius: 10px; height: 100%"
              >
                <v-card-title style="font-size: 1.1em"
                  >“{{ industry.industry }}”关联的股票</v-card-title
                >
                <v-card-text>
                  <div style="width: 100%; height: 318px; overflow: scroll">
                    <v-list dense color="#e0e0e0">
                      <v-list-item-group
                        v-model="stockPooolCheckedU"
                        multiple
                      >
                        <!-- 循环迭代出候选股票池 start-->
                        <template v-for="(stock, index) in stockPoolU">
                          <v-list-item
                            v-bind:key="stock.stockCode"
                            :value="stock.stockCode"
                          >
                            <template>
                              <v-list-item-content>
                                <v-list-item-title
                                  v-text="
                                    stock.stockName + ' | ' + stock.stockCode
                                  "
                                ></v-list-item-title>
                              </v-list-item-content>

                              <!-- <v-list-item-icon>
                                <v-btn
                                  icon
                                  dense
                                  small
                                  color="black"
                                  @click="deleteFromUser(stock)"
                                >
                                  <v-icon dense small>delete</v-icon>
                                </v-btn>
                              </v-list-item-icon> -->
                            </template>
                          </v-list-item>
                          <v-divider
                            v-bind:key="stock.stockCode + index"
                          ></v-divider>
                        </template>
                        <!-- 循环迭代出候选股票池 end-->
                      </v-list-item-group>
                    </v-list>
                  </div>
                </v-card-text>
                <!-- <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    small
                    dense
                    elevation="2"
                    color="black"
                    outlined
                    :loading="saveRaceLoading"
                    @click="selectAllPoolU"
                    v-show="stockPoolU.length > 0"
                  >
                    <v-icon left dense small>clear_all</v-icon>
                    全部移除</v-btn
                  >
                </v-card-actions> -->
              </v-card>
            </v-col>
          </v-row>
          <!-- 股票操作关联部分 end -->
        </v-container>
      </v-card-text>
      <!-- <v-card-actions
        style="margin-top: -35px; padding-right: 27px; padding-bottom: 15px"
      >
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          dense
          dark
          small
          :loading="saveRaceLoading"
          @click="cancl"
          elevation="2"
          outlined
        >
          <v-icon left dense small>done_all</v-icon>
          完成</v-btn
        >
      </v-card-actions> -->
    </v-card>
  </div>
</template>

<script>
import dataInterface from "../../data/managementData";
import commonDataInterface from "../../data/commonData";

export default {
  name: "IndustryEdit",
  //   components: {
  //   },
  props: ["industry"],
  data: () => ({
    filterStockC: "",
    stockPooolChecked: [],
    stocksResult: [],
    raceForFilterU: [],
    filterStockU: "",
    stockPooolCheckedU: [],
    search: null,
    stockPool: [], // 股票池
    stockPoolU: [], // 用户股票池
    saveRaceLoading: false,
    saveSucInfo: "",
    stockListHeader: [
      { text: "股票代码", value: "stockCode", fixed: true },
      { text: "股票名称", value: "stockName" },
      { text: "操作", value: "action", align: "center" },
    ],
    stockList: [],
    stocksLoading: false,
    stocksOptions: {
      itemsPerPage: 10,
    },
    stkListLength: 0,
  }),
  mounted() {
    this.saveSucInfo = "";
    this.getRaceList();
    this.getStocklist();
    this.getIndustyStks();
  },
  methods: {
    // 保存赛道
    saveIndustry() {
      var _self = this;
      this.industry.dr = "0";
      dataInterface
        .saveUpdIndustry(this.industry)
        .then((res) => {
          if (res.code === "0") {
            if (!this.industry.id) {
              this.industry.id = res.id;
            }
            _self.saveSucInfo = "标签名称保存成功。";
          }
        });
    },
    // 获取所有赛道
    getRaceList() {
      var _self = this;
      dataInterface.getRaceList({}).then((res) => {
        let raceNameList = [];
        res.forEach((e) => {
          raceNameList.push(e.raceName);
        });
        _self.raceListForFilter = raceNameList;
      });
    },
    //  按行业id查询相关股票
    getIndustyStks() {
      let _self = this;
      if (this.industry.id) {
        let param = {
          industryKey: this.industry.id,
          allStock: "0",
          pageNo: 1,
          pageSize: 300
        };
        commonDataInterface.getStocksByKey(param).then((res) => {
          if (res.list.length > 0) {
              _self.stockPoolU = res.list;
            } else {
              _self.stockPoolU = [];
            }
        });
      } else {
        _self.stockPoolU = [];
      }
    },
    // 获取股票池
    getStocklist() {
      var _self = this;
      this.stocksLoading = true;

      let param = {
        allStock: "0",
        pageNo: this.stocksOptions.page,
        pageSize: 10,
        key: this.filterStockC,
      };
      commonDataInterface.getStocksByKey(param).then((res) => {
        _self.stockPool = res.list;
        _self.stockList = res.list;
        _self.stkListLength = parseInt(res.countNum);
        _self.stocksLoading = false;
      });
    },
    // 执行筛选候选股票池动作
    doFilterForCStocks() {
      let temp1 = [];
      if (this.raceForFilter.length > 0) {
        this.raceForFilter.forEach((e) => {
          this.stockPool.forEach((a) => {
            if (a.raceName && a.raceName.indexOf(e) > -1) {
              a.checked = false;
              temp1.push(a);
            }
          });
        });
      } else {
        temp1 = JSON.parse(JSON.stringify(this.stockPool));
      }
      let temp2 = [];
      if (this.filterStockC) {
        temp1.forEach((e) => {
          if (
            e.stockName.indexOf(this.filterStockC) > -1 ||
            e.stockCode.indexOf(this.filterStockC) > -1
          ) {
            e.checked = false;
            temp2.push(e);
          }
        });
      } else {
        temp2 = temp1;
        temp2.forEach((e) => {
          e.checked = false;
        });
      }
      this.stocksResult = temp2;
    },
    // 执行筛选标签股票池动作
    doFilterForCStocksU() {
      let temp1 = [];
      if (this.raceForFilterU.length > 0) {
        this.raceForFilterU.forEach((e) => {
          this.stockPoolU.forEach((a) => {
            if (a.raceName === e) {
              temp1.push(a);
            }
          });
        });
      } else {
        temp1 = JSON.parse(JSON.stringify(this.stockPoolU));
      }
      let temp2 = [];
      if (this.filterStockU) {
        temp1.forEach((e) => {
          if (
            e.stockName.indexOf(this.filterStockU) > -1 ||
            e.stockCode.indexOf(this.filterStockU) > -1
          ) {
            temp2.push(e);
          }
        });
      } else {
        temp2 = temp1;
      }
      this.stocksResultU = temp2;
    },
    // 关联到赛道
    addToRace(item) {
      let temp = JSON.parse(JSON.stringify(this.stockPoolU));
      temp.push(item);
      this.stockPoolU = [...new Set(temp)];
      this.saveRaceStocks();
    },
    // 删除用户池中被选中的股票
    deleteFromUser(stock) {
      for (let i = 0; i < this.stockPoolU.length; i++) {
        if (this.stockPoolU[i].stockCode === stock.stockCode) {
          this.stockPoolU.splice(i, 1);
          break;
        }
      }
      this.saveRaceStocks();
    },
    // 全选候选池
    selectAllPoolU() {
      this.stockPoolU = [];
      this.saveRaceStocks();
    },
    // 关联赛道和股票，并保存到数据库
    saveRaceStocks() {
      this.saveRaceLoading = true;
      var _self = this;
      let stockList = [];
      this.stockPoolU.forEach((e) => {
        stockList.push(e.stockCode);
      });
      dataInterface
        .saveRaceStocks({
          stockList: stockList,
          raceid: this.race.id,
        })
        .then((res) => {
          if (res.code === "0") {
            _self.saveRaceLoading = false;
          }
        });
    },
    cancl() {
      this.$emit("complete");
    },
  },
  computed: {},
  watch: {
    industry() {
      this.saveSucInfo = "";
      this.getIndustyStks();
    },
    stocksOptions: {
      handler() {
        this.getStocklist();
      },
      deep: true,
    },
  },
};
</script>
<style>
</style>
