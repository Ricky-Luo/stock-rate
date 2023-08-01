<template>
  <v-container fluid style="overflow-y:scroll;">
    <v-row>
      <v-col cols="4">
        <h2 style="margin-left:10px;">指标列表</h2>
      </v-col>
      <v-col cols="6"></v-col>
      <v-col cols="2" style="padding-right:22px;">
        <v-text-field
          v-model="factorKeyword"
          append-icon="mdi-magnify"
          label="搜索类型名字、指标名字"
          single-line
          hide-details
        ></v-text-field>
      </v-col>
    </v-row>
    <template v-for="factorGroup in factorTree">
      <h3 style="margin-left:10px;" v-bind:key="factorGroup.typeName">{{factorGroup.typeName}}</h3>
      <v-row
        :align="'start'"
        :justify="'start'"
        style="padding:10px;"
        v-bind:key="factorGroup.typeName + '1'"
      >
        <v-hover v-for="factor in factorGroup.type" v-bind:key="factor.sfid">
          <template v-slot="{ hover }">
            <v-card
              :elevation="hover ? 6 : 2"
              width="220"
              style="border-radius:5px;margin-left:10px;margin-bottom:10px;"
            >
              <v-card-title style="font-size: 1.02rem;">{{factor.fname}}</v-card-title>
              <v-card-subtitle>{{factor.defination}}</v-card-subtitle>
              <!--  -->
              <v-divider class="mx-4"></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="mx-2" small color="secondary" @click="goToOperatePage(factor)">
                  <v-icon left dense small>edit</v-icon>打分
                </v-btn>
              </v-card-actions>
              <v-card-text style="padding-bottom:0px">
                <p>
                  <strong>{{factor.freq}}</strong>
                  <span style="margin-left:10px;margin-right:10px;">|</span>数据来源：
                  <strong>{{factor.datasource ? factor.datasource : '未知'}}</strong>
                </p>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-row>
    </template>
    <v-dialog
      v-model="dialog"
      style="overflow-x: hidden;"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card style="background:#EDF0F2;">
        <v-toolbar dark color="primary" style="border-radius: 24px 24px 0px 0px">
          <v-toolbar-title style="margin-left:15px;">
            给每个股票或行业打分
            <span
              style="color:#f9aa33;font-size:1rem;margin-left:10px;"
            >{{currentFactor.fname}}</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-text-field
              label="搜索股票名称、代码"
              outlined
              prepend-inner-icon="search"
              v-model="stockKeyword"
              dense
              rounded
              style="margin-top:12px;margin-left:15px;"
            ></v-text-field>
          </v-toolbar-items>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">
              <v-icon left dense small>done_all</v-icon>完成
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div style="padding:24px 24px 24px 20px;">
            <div  style="    width: 100%;display: flex;">
            <h3
              style="margin-left:10px;display:inline;width:90px;line-height:45px;"
            >{{currentTab}}</h3>
            <!-- 行业选择条 start -->
            <div style="width: calc(100% - 91px);overflow-x: scroll;display: inline-flex;" ref="buttonBox">
              <v-btn-toggle tile v-model="currentTab" color="primary" dense group>
                <v-btn
                  :value="tab.typeName"
                  v-for="(tab,index) in stockTreeForSearch"
                  v-bind:key="tab.typeName"
                  @click="changeCurrentTab(index)"
                  :ref="tab.typeName"
                >{{tab.typeName}}</v-btn>
              </v-btn-toggle>
            </div>
            </div>
            <!-- 行业选择条 end -->
            <template v-for="(stockGroup, indexGroup) in stockTree">
            <v-row
              :align="'start'"
              :justify="'start'"
              style="padding:10px;"
              v-bind:key="stockGroup.typeName + '1'"
            >
              <v-hover v-for="(stock, indexStock) in stockGroup.type" v-bind:key="stock.stockCode">
                <template v-slot="{ hover }">
                  <v-card
                    :elevation="hover ? 6 : 2"
                    width="220"
                    style="border-radius:5px;margin-left:10px;margin-bottom:10px;"
                  >
                    <v-card-title style="font-size: 1.02rem;">{{stock.stockName}}</v-card-title>
                    <v-card-subtitle>{{stock.stockCode}}</v-card-subtitle>
                    <v-card-text style="padding-bottom:0px">
                      <p>
                        最后更新日期：
                        <strong>{{stock.tdate}}</strong>
                      </p>
                      <p>
                        上期分数：
                        <strong style="color:#f9aa33">{{stock.score}}</strong>
                        <span
                          style="color:red;margin-left:10px;"
                          v-show="stockModels[stock.stockCode + 'dValue'] > 0"
                        >{{stockModels[stock.stockCode + 'dValue']}}%⬆</span>
                        <span
                          style="color:green;margin-left:10px;"
                          v-show="stockModels[stock.stockCode + 'dValue'] < 0"
                        >{{stockModels[stock.stockCode + 'dValue']}}%⬇</span>
                      </p>
                      <v-text-field
                        :ref="stock.stockCode"
                        v-model.number="stockModels[stock.stockCode]"
                        dense
                        clearable
                        label="本期分数"
                        solo
                        style="margin-left:-5px;"
                        class="styled-input"
                        @change="saveOneStockScore(stock.stockCode, stock, indexGroup, indexStock)"
                      ></v-text-field>

                      <v-textarea
                        label="打分理由"
                        v-model="stockModels[stock.stockCode + 'reason']"
                        style="margin-left:-5px;margin-top:-10px;"
                        solo
                        @change="saveOneStockScore(stock.stockCode, stock, indexGroup, indexStock)"
                      ></v-textarea>
                    </v-card-text>
                    <!--  -->
                  </v-card>
                </template>
              </v-hover>
            </v-row>
          </template>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import dataInterface from "../data/ratingOperationData";
import session from "../util/SessionStorage";
// import SingleFactorDetail from "./SingleFactorDetail";
import moment from "moment";

export default {
  name: "StockRating",

  components: {
    // SingleFactorDetail
  },
  data: () => ({
    factorTreeForSearch: [],
    factorTree: [],
    dialog: false,
    stockTree: [],
    stockTreeForSearch: [],
    stockModels: {},
    userId: session.getSessionStorage("userid"),
    currentFactor: {},
    factorKeyword: "",
    stockKeyword: "",
    today: "", // 今天日期
    currentTab: '',
    currentIndex: 0,
  }),
  mounted() {
    this.getFactorList();
    this.today = moment().format("YYYY-MM-DD");
  },
  watch: {
    factorKeyword(value) {
      if (value) {
        for (let i = 0; i < this.factorTreeForSearch.length; i++) {
          this.factorTree[i].type = this.factorTreeForSearch[i].type.filter(
            (e) => e.fname.indexOf(value.toUpperCase()) > -1
          );
        }
      } else {
        this.factorTree = JSON.parse(JSON.stringify(this.factorTreeForSearch));
      }
    },
    stockKeyword(value) {
      if (value) {
        let length = this.stockTreeForSearch.length;
        let isChange = false;
        for(let i = 0; i < length; i++) {
          this.stockTreeForSearch[i].type.forEach(e => {
            if (e && (e.stockName.indexOf(value.toUpperCase()) > -1 ||  e.stockCode.indexOf(value.toUpperCase()) > -1 || e.pinyin.indexOf(value.toLowerCase()) > -1)) {
              this.stockTree = [{}];
              this.stockTree[0].type = [e];
              this.stockTree[0].typeName = this.stockTreeForSearch[i].typeName;
              this.currentTab = this.stockTreeForSearch[i].typeName;
              this.currentIndex = i;
              isChange = true;
            }
          })
          if (isChange) {
            break;
          }
        }
        if (!isChange) {
          this.stockTree = [];
        }
        // this.$refs['buttonBox'].scrollLeft = this.$refs[this.currentTab][0].$el.offsetLeft;
        this.$refs['buttonBox'].scrollTo({
          left: this.$refs[this.currentTab][0].$el.offsetLeft,
          behavior: 'smooth'
        })
        // this.changeCurrentTab(this.currentIndex);
      } else {
        this.stockTree = [JSON.parse(JSON.stringify(this.stockTreeForSearch[this.currentIndex]))];
      }
    }
  },
  methods: {
    // 获取所有因子
    getFactorList() {
      let _self = this;
      dataInterface.getFactorList({ userid: this.userId }).then((response) => {
        let res = response.list;
        let typeGroup = {};
        let factorTreeTemp = [];
        res.forEach((e) => {
          typeGroup[e.type] = [];
        });
        for (let type in typeGroup) {
          res.forEach((e) => {
            if (e.type === type) {
              typeGroup[type].push(e);
            }
          });
          factorTreeTemp.push({
            type: typeGroup[type],
            typeName: type,
          });
        }
        _self.factorTreeForSearch = JSON.parse(JSON.stringify(factorTreeTemp));
        _self.factorTree = factorTreeTemp;
      });
    },
    // 去打分页面
    goToOperatePage(factor) {
      this.currentFactor = factor;
      this.dialog = true;
      this.stockModels = {};
      let _self = this;
      dataInterface
        .getStocklistByFid({
          factorid: factor.id,
          userid: this.userId,
        })
        .then((res) => {
          let list = res.list;
          let typeGroup = {};
          let stockTreeTemp = [];
          list.forEach((e) => {
            if (!e.industry) {
              e.industry = '暂无行业';
            }
            _self.$set(_self.stockModels, e.stockCode, e.score);
            _self.$set(
              _self.stockModels,
              e.stockCode + "reason",
              e.ratingReason
            );
            typeGroup[e.industry] = [];
          });
          for (let industry in typeGroup) {
            list.forEach((e) => {
              if (e.industry === industry) {
                typeGroup[industry].push(e);
              }
            });
            stockTreeTemp.push({
              type: typeGroup[industry],
              typeName: industry,
            });
          }
          _self.stockTreeForSearch = JSON.parse(JSON.stringify(stockTreeTemp));
          _self.currentTab = stockTreeTemp[0].typeName; // 设置当前industry tab。
          _self.currentIndex = 0; // 设置当前industry tab。
          _self.stockTree = [stockTreeTemp[0]];

        });
    },
    // 保存单个股票得分
    saveOneStockScore(stockcode, stock) {
      if (!this.stockModels[stockcode] || this.stockModels[stockcode] <= 0) {
        return;
      }
      let _self = this;
      let prop = {
        sfRateList: [
          {
            rateid: stock.rateid,
            freq: this.currentFactor.freq,
            sfid: stock.sfid,
            tdate: this.today,
            score: this.stockModels[stockcode],
            updateuser: this.userId,
            ratingReason: this.stockModels[stockcode + "reason"],
          },
        ],
      };
      if (stock.id) {
        prop.id = stock.id;
      }
      dataInterface.saveRate(prop).then((res) => {
        if (res.code === "0") {
          if (stock.score) {
            _self.stockModels[stockcode + "dValue"] = (
            ((_self.stockModels[stockcode] - stock.score) / stock.score) *
            100
          ).toFixed(2);
          }
          if (res.id) {
            stock.id = res.id;
          }
          // _self.stockTree[indexGroup]["type"][
          //   indexStock
          // ].score = this.stockModels[stockcode].toString();
        }
      });
    },
    changeCurrentTab(index) {
      this.currentIndex = index;
      this.stockTree = [JSON.parse(JSON.stringify(this.stockTreeForSearch[index]))];
    }
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
</style>
