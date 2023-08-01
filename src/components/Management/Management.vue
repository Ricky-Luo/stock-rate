<template>
  <v-container fluid style="overflow-y: scroll">
    <h2 style="margin-left: 10px">管理</h2>
    <v-row>
      <v-col cols="6">
        <v-hover>
          <template v-slot="{ hover }">
            <v-card
              :elevation="hover ? 6 : 2"
              style="
                border-radius: 5px;
                margin-left: 10px;
                margin-bottom: 10px;
                width: 100%;
              "
            >
              <v-card-title style="font-size: 1.05em">
                标签管理
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="filterKeyRace"
                  append-icon="mdi-magnify"
                  label="查找标签"
                  dense
                  style="margin-top: -15px"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-card-text style="max-height: 200px; overflow: scroll">
                <v-chip
                  close
                  color="#6790A8"
                  dark
                  small
                  style="margin-right: 15px; margin-bottom: 15px"
                  v-for="(race, index) in raceList"
                  v-bind:key="race.id"
                  @click="editRace(race)"
                  @click:close="deleteRace(race, index)"
                  >{{ race.raceName + " (" + race.stockCount + ")" }}</v-chip
                >
              </v-card-text>
              <v-card-actions>
                <v-btn
                  id="xinzengsaidao"
                  small
                  outlined
                  color="primary"
                  elevation="2"
                  @click="editRace"
                  style="margin-left: 10px; margin-bottom: 8px"
                >
                  新增标签
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>
      </v-col>
      <v-col cols="6">
        <v-hover>
          <template v-slot="{ hover }">
            <v-card
              :elevation="hover ? 6 : 2"
              style="
                border-radius: 5px;
                margin-left: 10px;
                margin-bottom: 10px;
                width: 100%;
              "
            >
              <v-card-title style="font-size: 1.05em">
                行业管理
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="filterKeyIndustry"
                  append-icon="mdi-magnify"
                  label="查找行业"
                  dense
                  style="margin-top: -15px"
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-card-text style="max-height: 200px; overflow: scroll">
                <v-chip
                  close
                  dense
                  small
                  style="margin-right: 15px; margin-bottom: 15px"
                  v-for="(industry, index) in industryList"
                  v-bind:key="'industry' + industry.id"
                  @click="editIndustry(industry)"
                  @click:close="deleteIndustry(industry, index)"
                  >{{
                    industry.industry + " (" + industry.stockCount + ")"
                  }}</v-chip
                >
              </v-card-text>
              <v-card-actions>
                <v-btn
                  id="xinzengsaidao"
                  small
                  outlined
                  color="primary"
                  elevation="2"
                  @click="editIndustry"
                  style="margin-left: 10px; margin-bottom: 8px"
                >
                  新增行业
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>

    <!-- 编辑赛道弹出页面，包含 RaceEdit 子组件 start -->
    <v-dialog v-model="raceEditBool" width="700px">
      <race-edit
        :race="editedRaceItem"
        @complete="completeRaceEdit"
      ></race-edit>
    </v-dialog>
    <!-- 编辑赛道弹出页面，包含 RaceEdit 子组件 end-->

    <!-- 编辑行业弹出页面，包含 RaceEdit 子组件 start -->
    <v-dialog v-model="industryEditBool" width="280px">
      <industry-edit
        :industry="editIndustryItem"
        @complete="completeIndustryEdit"
      ></industry-edit>
    </v-dialog>
    <!-- 编辑行业弹出页面，包含 RaceEdit 子组件 end-->

    <v-row>
      <v-col cols="4">
        <h3 style="margin-left: 10px">因子管理</h3>
      </v-col>
      <v-col cols="5"></v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xl="6">
        <v-hover>
          <template v-slot="{ hover }">
            <v-card
              :elevation="hover ? 6 : 2"
              style="border-radius: 5px; margin-left: 10px; margin-bottom: 10px"
            >
              <v-card-title style="font-size: 1.02rem">行业和公司</v-card-title>
              <!-- <v-card-subtitle>我是象限说明</v-card-subtitle> -->
              <v-card-text>
                <v-data-table
                  :headers="factorListHeader"
                  :items="factorListTable1"
                  :items-per-page="5"
                >
                  <template v-slot:item.actions="{ item }">
                    <a
                      style="margin-right: 5px"
                      @click="editFactorItem(item, 11, 1)"
                      >修改</a
                    >
                    <a
                      style="margin-right: 5px; margin-left: 5px"
                      @click="deleteItem(item, 11, 1)"
                      >删除</a
                    >
                  </template>
                </v-data-table>
              </v-card-text>
              <div class="table-footer-prepend d-flex pl-2 align-center">
                <v-btn
                  outlined
                  small
                  color="primary"
                  elevation="2"
                  @click="goToOperatePage(11, 1)"
                >
                  新增因子
                </v-btn>
              </div>
            </v-card>
          </template>
        </v-hover>
      </v-col>

      <v-col cols="12" xl="6">
        <v-hover>
          <template v-slot="{ hover }">
            <v-card
              :elevation="hover ? 6 : 2"
              style="border-radius: 5px; margin-left: 10px; margin-bottom: 10px"
            >
              <v-card-title style="font-size: 1.02rem">交易</v-card-title>
              <!-- <v-card-subtitle>我是象限说明</v-card-subtitle> -->
              <v-card-text>
                <v-data-table
                  :headers="factorListHeader"
                  :items="factorListTable2"
                  :items-per-page="5"
                >
                  <template v-slot:item.actions="{ item }">
                    <a
                      style="margin-right: 5px"
                      @click="editFactorItem(item, 12, 2)"
                      >修改</a
                    >
                    <a
                      style="margin-right: 5px; margin-left: 5px"
                      @click="deleteItem(item, 12, 2)"
                      >删除</a
                    >
                  </template>
                </v-data-table>
              </v-card-text>
              <div class="table-footer-prepend d-flex pl-2 align-center">
                <v-btn
                  outlined
                  small
                  color="primary"
                  elevation="2"
                  @click="goToOperatePage(12, 2)"
                >
                  新增因子
                </v-btn>
              </div>
            </v-card>
          </template>
        </v-hover>
      </v-col>

      <v-col cols="12" xl="6">
        <v-hover>
          <template v-slot="{ hover }">
            <v-card
              :elevation="hover ? 6 : 2"
              style="border-radius: 5px; margin-left: 10px; margin-bottom: 10px"
            >
              <v-card-title style="font-size: 1.02rem">催化剂</v-card-title>
              <!-- <v-card-subtitle>我是象限说明</v-card-subtitle> -->
              <v-card-text>
                <v-data-table
                  :headers="factorListHeader"
                  :items="factorListTable3"
                  :items-per-page="5"
                >
                  <template v-slot:item.actions="{ item }">
                    <a
                      style="margin-right: 5px"
                      @click="editFactorItem(item, 13, 3)"
                      >修改</a
                    >
                    <a
                      style="margin-right: 5px; margin-left: 5px"
                      @click="deleteItem(item, 13, 3)"
                      >删除</a
                    >
                  </template>
                </v-data-table>
              </v-card-text>
              <div class="table-footer-prepend d-flex pl-2 align-center">
                <v-btn
                  outlined
                  small
                  color="primary"
                  elevation="2"
                  @click="goToOperatePage(13, 3)"
                >
                  新增因子
                </v-btn>
              </div>
            </v-card>
          </template>
        </v-hover>
      </v-col>

      <!-- <v-col cols="12" xl="6">
        <v-hover>
          <template v-slot="{ hover }">
            <v-card
              :elevation="hover ? 6 : 2"
              style="border-radius:5px;margin-left:10px;margin-bottom:10px;"
            >
              <v-card-title style="font-size: 1.02rem;">OTC</v-card-title>
              <v-card-subtitle>我是象限说明</v-card-subtitle>
              <v-card-text>
              <v-data-table
                :headers="factorListHeader"
                :items="factorListTable4"
                :items-per-page="5"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="editFactorItem(item, 14, 4)">mdi-pencil</v-icon>
                  <v-icon small @click="deleteItem(item, 14, 4)">mdi-delete</v-icon>
                </template>
              </v-data-table>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="mx-2" small color="secondary" @click="goToOperatePage(14, 4)">
                  新增因子
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>
      </v-col> -->
    </v-row>
    <!-- 编辑因子弹出页面 start -->
    <v-dialog v-model="editdialog" max-width="700px">
      <v-card>
        <v-card-title style="font-size: 1.05em">{{ editTitle }}</v-card-title>
        <v-card-text>
          <v-container>
            <!-- 编辑因子基本信息阶段 start -->
            <div v-show="step1">
              <!-- <v-form v-model="factorStep1Vali" lazy-validation> -->
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.fname"
                    label="因子名称"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.defination"
                    label="定义"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="editedItem.weight"
                    label="权重"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row style="margin-top: -30px">
                <v-col cols="4">
                  <v-select
                    :items="quadrantChildenItems"
                    v-model="editedItem.categoryId"
                    dense
                    item-value="id"
                    item-text="typename"
                    label="类别"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-select
                    :items="frequenceItems"
                    v-model="editedItem.freq"
                    dense
                    label="更新频率"
                  ></v-select>
                </v-col>
                <v-col cols="3" offset="1" style="text-align: right">
                  <v-btn
                    color="primary"
                    dense
                    outlined
                    small
                    dark
                    :loading="saveFactorLoading"
                    @click="saveUpdFactor"
                    :disabled="factorStep1Vali"
                  >
                    <v-icon left dense small>arrow_forward</v-icon>保存并继续
                  </v-btn>
                </v-col>
              </v-row>
              <!-- </v-form> -->
            </div>
            <!-- 编辑因子基本信息阶段 end -->
            <!-- 选择打分人阶段 start -->
            <v-row v-show="step1 == false">
              <v-col cols="12">
                <v-chip
                  color="indigo"
                  :outlined="!(responseUser === response)"
                  :close="responseUser === response"
                  dense
                  dark
                  small
                  v-for="(response, index) in responseList"
                  v-bind:key="index"
                  style="float: left; margin-right: 10px; margin-bottom: 10px"
                  @click="changeResponse(response)"
                  @click:close="deleteResponse(response, index)"
                >
                  <v-icon left>mdi-account</v-icon>
                  {{ response.userName }}
                </v-chip>

                <v-autocomplete
                  dense
                  v-model="newResponseUser"
                  :items="userList"
                  :loading="getUsersLoading"
                  :search-input.sync="userKey"
                  @change="setResponseUser"
                  cache-items
                  hide-no-data
                  hide-selected
                  item-text="fullName"
                  item-value="userId"
                  label="输入新打分人"
                  clearable
                  solo
                  style="width: 150px; margin-top: -10px"
                  return-object
                ></v-autocomplete>
              </v-col>
            </v-row>
            <!-- 选择打分人阶段 end -->
            <v-row v-show="responseUser && step1 == false">
              <v-col cols="6">
                <v-card outlined style="border-radius: 10px">
                  <v-card-title style="font-size: 1.1em"
                    >候选股票池</v-card-title
                  >
                  <v-card-text>
                    <div style="display: flex">
                      <v-text-field
                        v-model="filterStockC"
                        dense
                        single-line
                        @change="getStocklistByFid(true)"
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
                          @click="getStocklistByFid(true)"
                        >
                          <v-icon dark>search</v-icon>
                        </v-btn>
                      </div>
                    </div>

                    <v-data-table
                      :headers="stockListHeader"
                      :items="stockPool"
                      :loading="stocksLoading"
                      dense
                      :options.sync="stocksOptions"
                      :server-items-length="stkListLength"
                      :footer-props="{
                        itemsPerPageOptions: [10],
                      }"
                    >
                      <template v-slot:item.action="{ item }">
                        <a @click="addToUser(item)">关联</a>
                      </template>
                    </v-data-table>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <!-- <v-btn text @click="selectAllPool">全选</v-btn>
                    <v-btn text @click="unSelectAllPool">全不选</v-btn>
                    <v-btn small dense light @click="addToUser">
                      <v-icon left dense small>sync_alt</v-icon>
                      添加给{{ responseUser ? responseUser.userName : "" }}
                    </v-btn> -->
                    <v-btn text @click="addAllToUser"> 全部添加 </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col cols="6">
                <v-card color="indigo" dark style="border-radius: 10px">
                  <v-card-title style="font-size: 1.1em"
                    >{{
                      responseUser ? responseUser.userName : ""
                    }}负责的股票池</v-card-title
                  >
                  <v-card-text>
                    <v-select
                      v-model="raceForFilterU"
                      dense
                      :items="raceListForFilter"
                      chips
                      label="筛选标签"
                      multiple
                    ></v-select>

                    <v-text-field
                      v-model="filterStockU"
                      dense
                      label="筛选"
                      placeholder="输入股票名字或代码"
                    ></v-text-field>

                    <div style="width: 100%; height: 265px; overflow: scroll">
                      <v-list dense color="indigo">
                        <v-list-item-group
                          color="white"
                          v-model="stockPooolCheckedU"
                          multiple
                        >
                          <!-- 循环迭代出候选股票池 start-->
                          <template v-for="(stock, index) in stocksResultU">
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

                                <v-list-item-icon>
                                  <v-btn
                                    icon
                                    dense
                                    small
                                    color="white"
                                    @click="deleteFromUser(stock)"
                                  >
                                    <v-icon dense small>delete</v-icon>
                                  </v-btn>
                                </v-list-item-icon>
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
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      small
                      dense
                      light
                      :loading="updUserStkFacLoading"
                      @click="clearUserStk()"
                      v-show="stockPoolU.length > 0"
                    >
                      <v-icon left dense small>clear_all</v-icon>全部移除
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <v-row
              style="margin-top: -10px"
              v-show="step1 === false && responseUser"
            >
              <v-col cols="9"></v-col>
              <v-col cols="3" style="text-align: right">
                <v-btn
                  color="secondary"
                  dense
                  dark
                  small
                  :loading="updUserStkFacLoading"
                  @click="finishFactorEdit"
                >
                  <v-icon left dense small>done_all</v-icon>完成
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="editdialog = false;" dense small>取消</v-btn>
          <v-btn color="primary" rounded @click="save" dense small>保存</v-btn>
        </v-card-actions>-->
      </v-card>
    </v-dialog>
    <!-- 编辑因子弹出页面 end -->
  </v-container>
</template>

<script>
import dataInterface from "../../data/managementData";
import session from "../../util/SessionStorage";
import commonDataInterface from "../../data/commonData";
import RaceEdit from "./RaceEdit";
import IndustryEdit from "./IndustryEdit";

export default {
  name: "Management",
  components: {
    RaceEdit,
    IndustryEdit,
  },
  data: () => ({
    userId: session.getSessionStorage("userid"),
    currentQuadrantInfo: {
      quadrantId: "",
      index: "",
    }, // 当前操作所在象限，用于刷新当前象限因子列表
    factorListHeader: [
      { text: "因子名称", value: "fname" },
      { text: "定义", value: "defination" },
      { text: "权重", value: "weight" },

      { text: "操作", value: "actions", sortable: false, width: "80px" },
    ],
    headersOfAutodrome: [
      { text: "标签名字", value: "name" },
      { text: "标签说明", value: "calories" },
      { text: "对应股票", value: "stocks" },
    ],
    factorListTable1: [],
    factorListTable2: [],
    factorListTable3: [],
    factorListTable4: [],
    editdialog: false,
    editedItem: {
      fname: "",
      defination: 0,
      weight: 0,
      categoryId: "",
      factorId: "",
      freq: "",
      id: "",
    },
    editTitle: "新增因子",
    factorStep1Vali: false, // 新增因子非空校验
    raceList: [],
    raceListForSearch: [],
    industryListForSearch: [],
    raceListForFilter: [],
    raceForFilter: [],
    activea: false,
    filterStockC: "",
    filterStockCisLoading: false,
    responseUser: {}, // 修改因子弹出界面上的负责打分人
    stocksForFilter: [], // 股票下拉框原始数据
    search: null,
    stocksResult: [], // 股票过滤结果
    stockPool: [], // 股票池
    stockPooolChecked: [], // 股票池勾选结果
    filterStockCisLoadingU: false,
    raceForFilterU: [],
    filterStockU: "",
    stocksResultU: [], // 用户股票过滤结果
    stockPoolU: [], // 用户股票池
    stockPooolCheckedU: [],
    saveFactorLoading: false,
    saveFactorBtnText: "保存因子",
    raceEditBool: false,
    industryEditBool: false,
    editIndustryItem: {
      industry: "",
      id: "",
    },
    responseList: [], //负责人列表
    // currentReponse: '', // 当前负责人
    editedRaceItem: {
      raceName: "",
      id: "",
    },
    newResponseUser: "",
    userList: [],
    getUsersLoading: false,
    userKey: null,
    updUserStkFacLoading: false,
    quadrantChildenItems: [], // 象限下面的小类别
    step1: true,
    frequenceItems: ["日频", "周频", "月频"],
    filterKeyRace: "",
    industryList: [],
    filterKeyIndustry: "",
    stockListHeader: [
      { text: "股票代码", value: "stockCode", fixed: true },
      { text: "股票名称", value: "stockName" },
      { text: "操作", value: "action", align: "center" },
    ],
    stocksLoading: false,
    stocksOptions: {
      itemsPerPage: 10,
    },
    stkListLength: 0,
  }),
  mounted() {
    this.init();
  },
  methods: {
    // 新增因子
    goToOperatePage(quadrantId, qIndex) {
      // 获取该象限的所有小类别
      this.getQuadrantChildren(quadrantId);
      this.editedItem.categoryId = "";
      this.editTitle = "添加新因子";
      this.editedItem.fname = "";
      this.editedItem.defination = "";
      this.editedItem.weight = "0";
      this.editedItem.factorId = "";
      this.editedItem.id = "";
      this.editedItem.freq = "";
      this.responseList = [];
      this.responseUser = null;
      this.stockPool = [];
      this.stockPoolU = [];
      this.editdialog = true;
      this.step1 = true;

      // 保存当前象限信息
      this.currentQuadrantInfo.quadrantId = quadrantId;
      this.currentQuadrantInfo.index = qIndex;
    },
    // 获取象限子类别的list,传入象限ID
    getQuadrantChildren(quadrantId) {
      let _self = this;
      dataInterface.getCategoryList({ pid: quadrantId }).then((response) => {
        _self.quadrantChildenItems = response.list;
      });
    },
    // 查询因子列表管理界面
    getFactorListM(categoryXxId, index) {
      let _self = this;
      dataInterface
        .getFactorListM({ categoryXxId: categoryXxId })
        .then((response) => {
          _self["factorListTable" + index] = response.list;
        });
    },
    // 保存修改因子
    saveUpdFactor() {
      this.saveFactorLoading = true;
      let _self = this;
      dataInterface
        .saveUpdFactor({ factor: this.editedItem })
        .then((response) => {
          if (response.code === "0") {
            _self.saveFactorLoading = false;
            _self.saveFactorBtnText = "保存成功";
            _self.step1 = false;
            _self.editTitle =
              "给 *" + _self.editedItem.fname + "* 指定负责打分人";
            _self.editedItem.factorId = response.id;
            _self.editedItem.id = response.id;
            _self.getStocklistByFid(response.id);
          }
        });
    },
    // 保存因子、用户、股票之间的关联关系。
    saveUpdUserStkFac() {
      let _self = this;
      this.updUserStkFacLoading = true;
      let stockList = [];
      this.stockPoolU.forEach((e) => {
        stockList.push(e.stockCode);
      });
      dataInterface
        .saveUpdUserStkFac({
          stockList: stockList,
          factorId: this.editedItem.factorId,
          userId: this.responseUser.userId,
        })
        .then((response) => {
          if (response.code === "0") {
            _self.updUserStkFacLoading = false;
          }
        });
    },
    save() {},
    close() {},
    // 查询象限
    getCategoryList(pid, recall) {
      dataInterface.getCategoryList({ pid: pid }).then((response) => {
        recall(response);
      });
    },
    // 页面初始化操作
    init() {
      // var _self = this;
      this.getCategoryList(0, (res) => {
        if (res.list && res.list.length > 0) {
          res.list.forEach((e, index) => {
            this.getFactorListM(e.id, index + 1);
          });
        }
      });
      this.getRaceList(true);
      this.getIndustryList();
    },
    // 获取所有行业
    getIndustryList() {
      let _self = this;
      dataInterface.getIndustryList({}).then((res) => {
        _self.industryList = res.list;
        _self.industryListForSearch = res.list;
      });
    },
    getStocksByKey(key) {
      this.filterStockCisLoading = true;
      let _self = this;
      commonDataInterface
        .getStocksByKey({ key: key, allStock: "0" })
        .then((res) => {
          _self.stocksForFilter = res.list;
          _self.filterStockCisLoading = false;
        });
    },
    // 新增因子
    newFactor() {
      this.editTitle = "新增因子";
      this.editdialog = true;
    },
    // 打开编辑因子二级界面
    editFactorItem(item, quadrantId, qIndex) {
      // this.responseUser = {};
      this.getStocklistByFid(item.factorid);
      this.getUsersByFid(item.factorid);
      this.getQuadrantChildren(item.categoryXxId);
      this.editTitle =
        "修改 : " + item.categoryXxName + " > " + item.fname + "";
      this.editedItem.fname = item.fname;
      this.editedItem.defination = item.defination;
      this.editedItem.weight = item.weight;
      this.editedItem.freq = item.freq;
      this.editedItem.categoryId = item.categoryid;
      this.editedItem.factorId = item.factorid;
      this.editedItem.id = item.factorid;
      this.step1 = true;
      this.editdialog = true;
      // 保存当前象限信息
      this.currentQuadrantInfo.quadrantId = quadrantId;
      this.currentQuadrantInfo.index = qIndex;
    },
    // 查询该因子的负责人
    getUsersByFid(factorId) {
      let _self = this;
      dataInterface
        .getUsersByFid({ factorid: factorId, groupUser: "1" })
        .then((res) => {
          let responseList = [];
          res.list.forEach((e) => {
            responseList.push({ userName: e.name, userId: e.userid });
          });
          _self.responseList = responseList; // [...new Set()];
          _self.responseUser = responseList[0];
        });
    },
    deleteItem(item, id, tableIndex) {
      let _self = this;
      item.dr = 1;
      dataInterface.saveUpdFactor({ factor: item }).then((response) => {
        if (response.code === "0") {
          _self.getFactorListM(id, tableIndex);
        }
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
    // 执行筛选用户股票池动作
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
    // 根据因子ID获取股票池，有需要用到股票池的地方触发
    // 候选股票池是核心池
    getStocklistByFid() {
      var _self = this;
      commonDataInterface
        .getStocksByKey({
          key: this.filterStockC,
          allStock: "0",
          pageNo: this.stocksOptions.page,
          pageSize: this.stocksOptions.itemsPerPage,
        })
        .then((res) => {
          _self.stockPool = res.list;
          _self.stkListLength = parseInt(res.countNum);
        });
    },
    toggle(index) {
      if (this.stocksResult[index].checked) {
        this.stocksResult[index].checked = false;
      } else {
        this.stocksResult[index].checked = true;
      }
    },
    addAllToUser() {
      var _self = this;
      this.updUserStkFacLoading = true;
      commonDataInterface
        .getStocksByKey({ key: this.filterStockC, allStock: "0", pageNo: 1, pageSize: 500,})
        .then((res) => {
          var temp = _self.stockPoolU.concat(res.list);
          _self.stockPoolU = [...new Set(temp)];
          _self.saveUpdUserStkFac();
        });
    },
    // 添加给用户
    addToUser(item) {
      this.stockPoolU.push(item);
      this.stockPoolU = [...new Set(this.stockPoolU)];
      this.saveUpdUserStkFac();
    },
    // 删除用户池中被选中的股票
    deleteFromUser(stock) {
      for (let i = 0; i < this.stockPoolU.length; i++) {
        if (this.stockPoolU[i].stockCode === stock.stockCode) {
          this.stockPoolU.splice(i, 1);
          break;
        }
      }
      this.saveUpdUserStkFac();
    },
    // 清空当前选中用户所有的股票
    clearUserStk() {
      this.stockPoolU = [];
      this.saveUpdUserStkFac();
    },
    // 获取所有赛道
    getRaceList(forceRefresh) {
      var _self = this;
      dataInterface.getRaceList({}, forceRefresh).then((res) => {
        let raceNameList = [];
        res.forEach((e) => {
          raceNameList.push(e.raceName);
        });
        _self.raceList = res;
        _self.raceListForSearch = res;
        _self.raceListForFilter = raceNameList;
      });
    },
    // 编辑赛道
    editRace(race) {
      this.raceEditBool = true;
      if (race) {
        this.editedRaceItem = race;
      } else {
        this.editedRaceItem.id = "";
        this.editedRaceItem.raceName = "";
      }
    },
    // 删除赛道
    deleteRace(item, index) {
      var r = confirm("确定删除标签：  " + item.raceName + "  吗？");
      if (r == false) {
        return;
      }

      var _self = this;
      this.editedRaceItem = item;
      this.editedRaceItem.dr = "1";
      dataInterface
        .saveUpdRace({
          raceList: [this.editedRaceItem],
        })
        .then((res) => {
          if (res.code === "0") {
            _self.raceList.splice(index, 1);
            _self.getRaceList(true);
            _self.raceEditBool = false;
          }
        });
    },
    // 编辑行业
    editIndustry(industry) {
      this.industryEditBool = true;
      if (industry) {
        this.editIndustryItem = industry;
      } else {
        this.editIndustryItem.id = "";
        this.editIndustryItem.raceName = "";
      }
    },
    // 删除赛道
    deleteIndustry(item, index) {
      var r = confirm("确定删除行业：  " + item.industry + "  吗？");
      if (r == false) {
        return;
      }

      var _self = this;
      var temp = item;
      temp.dr = "1";
      dataInterface.saveUpdIndustry(temp).then((res) => {
        if (res.code === "0") {
          _self.industryList.splice(index, 1);
          _self.getIndustryList(true);
          _self.industryEditBool = false;
        }
      });
    },
    // 当弹出框编辑赛道完毕后，调用此方法。
    completeRaceEdit() {
      this.raceEditBool = false;
      this.getRaceList(true);
    },
    completeIndustryEdit() {
      this.industryEditBool = false;
      this.getIndustryList(true);
    },
    // 模糊查询用户
    getUsersByKey(key) {
      var _self = this;
      _self.getUsersLoading = true;
      commonDataInterface.getUsersByKey({ key: key }).then((res) => {
        _self.userList = res.list;
        _self.getUsersLoading = false;
      });
    },
    // 设置新打分人
    setResponseUser() {
      if (this.newResponseUser) {
        let bool = true;
        this.responseList.forEach((e) => {
          if (e.userId === this.newResponseUser.userId) {
            bool = false;
          }
        });
        if (bool) {
          this.responseList.push({
            userId: this.newResponseUser.userId,
            userName: this.newResponseUser.fullName,
          });
          if (!this.responseUser) {
            this.responseUser = this.responseList[0];
          }
        }
      }
    },
    // 改变当前操作得打分人
    changeResponse(response) {
      this.responseUser = response;
      // 需要增加当前负责人
      // 此处需要重新查询负责人股票池
    },
    // 删除打分人
    deleteResponse(user, index) {
      if (this.responseList.length === 1) {
        window.alert("已存在的因子，至少对应一个打分人。");
        return;
      }
      let _self = this;
      this.updUserStkFacLoading = true;
      let stockList = [];
      this.stockPoolU.forEach((e) => {
        stockList.push(e.stockCode);
      });
      dataInterface
        .saveUpdUserStkFac({
          stockList: [],
          factorId: this.editedItem.factorId,
          userId: user.userId,
        })
        .then((response) => {
          if (response.code === "0") {
            _self.updUserStkFacLoading = false;
            _self.responseList.splice(index, 1);
            _self.responseUser = _self.responseList[0];
          }
        });
    },
    // 填充用户股票池
    getResponseStockPool() {
      let _self = this;
      if (!this.editedItem.factorId || !this.responseUser) {
        return;
      }

      dataInterface
        .getUsersByFid({
          factorid: this.editedItem.factorId,
          userid: this.responseUser.userId, // 这里应该是当前负责人的id
        })
        .then((res) => {
          _self.stockPoolU = res.list;
        });
    },
    // 完成因子分配工作
    finishFactorEdit() {
      this.getFactorListM(
        this.currentQuadrantInfo.quadrantId,
        this.currentQuadrantInfo.index
      );
      this.editdialog = false;
    },
  },
  computed: {},
  watch: {
    search(val) {
      val && val !== this.filterStockC && this.getStocksByKey(val);
    },
    userKey(val) {
      val && val !== this.newResponseUser && this.getUsersByKey(val);
    },
    raceForFilter() {
      this.doFilterForCStocks();
    },
    filterStockC() {
      this.doFilterForCStocks();
    },
    stockPool() {
      this.doFilterForCStocks();
    },
    raceForFilterU() {
      this.doFilterForCStocksU();
    },
    filterStockU() {
      this.doFilterForCStocksU();
    },
    stockPoolU() {
      this.doFilterForCStocksU();
    },
    responseUser() {
      this.getResponseStockPool();
    },
    // 执行过滤赛道动作
    filterKeyRace(val) {
      if (val) {
        let result = this.raceListForSearch.filter(
          (e) => e.raceName.indexOf(val) > -1 || e.pinyin.indexOf(val) > -1
        );
        this.raceList = result;
      } else {
        this.raceList = JSON.parse(JSON.stringify(this.raceListForSearch));
      }
    },
    filterKeyIndustry(val) {
      if (val) {
        let result = this.industryListForSearch.filter(
          (e) => e.industry.indexOf(val) > -1 || e.pinyin.indexOf(val) > -1
        );
        this.industryList = result;
      } else {
        this.industryList = JSON.parse(
          JSON.stringify(this.industryListForSearch)
        );
      }
    },
    stocksOptions: {
      handler() {
        this.getStocklistByFid();
      },
      deep: true,
    },
  },
};
</script>
<style scoped>
.table-footer-prepend {
  margin-top: -70px;
  height: 58px;
  margin-left: 10px;
}
</style>
<style>
.v-label {
  font-size: 14px;
}
.v-input {
  font-size: 14px;
}
</style>
