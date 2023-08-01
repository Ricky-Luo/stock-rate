<template>
  <v-container fluid style="overflow-y: scroll">
    <h2 style="margin-bottom: 12px">公告汇总</h2>
    <div class="d-flex flex-row" style="height: calc(100% - 43px)">
      <v-hover>
        <template v-slot="{ hover }">
          <v-card
            :elevation="hover ? 6 : 2"
            style="border-radius: 5px; width: 350px; margin-right: 12px"
          >
            <v-card-title style="padding-bottom: 0px"
              >公告列表
              <v-spacer></v-spacer>
              <div style="width: 180px; margin-top: 6px">
                <!-- <v-autocomplete
                  dense
                  v-model="stockForSearch"
                  single-line
                  :items="stockList"
                  :loading="stockLoading"
                  :search-input.sync="search"
                  cache-items
                  item-text="showName"
                  item-value="stockCode"
                  label="股票关键词"
                  clearable
                  return-object
                  @change="getAnnouncements"
                >
                </v-autocomplete> -->

                <v-text-field
                  v-model="stockForSearch"
                  single-line
                  label="股票 / 标题关键词"
                  @change="getAnnouncements"
                  clearable
                ></v-text-field>

              </div>
            </v-card-title>
            <v-card-subtitle style="padding-bottom: 0px; margin-top: 0px">
              <div style="width: 150px; display: inline-block">
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
                      dense
                      prepend-icon="event"
                      readonly
                      single-line
                      v-bind="attrs"
                      v-on="on"
                      :disabled="!stockForSearch"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startDate"
                    @input="menuForStartDate = false"
                    @change="getAnnouncements"
                  ></v-date-picker>
                </v-menu>
              </div>
              <div style="width: 150px; display: inline-block">
                <v-menu
                  v-model="menuForEndDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="endDate"
                      label="结束时间"
                      prepend-icon="event"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      dense
                      single-line
                      :disabled="!stockForSearch"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="endDate"
                    @change="getAnnouncements"
                    @input="menuForEndDate = false"
                  ></v-date-picker>
                </v-menu>
              </div>
            </v-card-subtitle>
            <v-card-text style="overflow-y: scroll; height: calc(100% - 140px)">
              <v-list dense>
                <v-list-item-group
                  dense
                  v-model="selectedAnnouncement"
                  active-class="secondary--text"
                >
                  <template v-for="(item, index) in announcementItems">
                    <v-list-item dense :key="index" style="padding-left: 0px">
                      <v-list-item-content>
                        <v-list-item-title
                          >{{ item.stock_code + " | " + item.stock_name }}
                        </v-list-item-title>
                        <v-list-item-subtitle
                          v-text="item.title"
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action style="margin-top: 0px">
                        <v-list-item-action-text
                          v-text="item.date"
                        ></v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider
                      v-if="index < announcementItems.length - 1"
                      :key="index + 'line'"
                    ></v-divider>
                  </template>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </template>
      </v-hover>

      <v-hover>
        <template v-slot="{ hover }">
          <v-card
            :elevation="hover ? 6 : 2"
            style="border-radius: 5px; width: calc(100% - 362px); height: 100%"
            v-show="selectedAnnouncement != null"
          >
            <v-card-title>
              {{
                currentAnnouncement
                  ? currentAnnouncement.stock_code +
                    " | " +
                  currentAnnouncement.stock_name  
                  : ""
              }}
              <span
                style="font-size: 1rem; margin-left: 24px; line-height: 0.8rem"
                >{{
                  currentAnnouncement ? currentAnnouncement.update_time : ""
                }}</span
              >
              <v-spacer></v-spacer>
              <v-btn text dense @click="checkRecent"
                ><span style="text-decoration: underline"
                  >查看
                  {{
                    currentAnnouncement ? currentAnnouncement.stock_name : ""
                  }}
                  的近期公告</span
                ></v-btn
              >

              <v-btn text dense @click="gotoRating"
                ><v-icon  small>launch</v-icon><span style="text-decoration: underline">去打分</span></v-btn
              >
            </v-card-title>
            <v-card-text style="height: calc(100% - 68px)">
              <iframe
                width="100%"
                style="height: 100%; border: none; border-radius: 15px"
                :src="currentAnnouncement ? currentAnnouncement.url : ''"
              ></iframe>
            </v-card-text>
          </v-card>
        </template>
      </v-hover>
    </div>
  </v-container>
</template>

<script>
// import sessionUtil from "../util/SessionStorage";
import commonDataInterface from "../data/commonData";
import moment from "moment";

export default {
  name: "Anouncements",
  components: {},
  data: () => ({
    announcementHeader: [
      { text: "股票代码", value: "stock_code", width: "95px", fixed: true },
      { text: "股票名称", value: "stock_name", width: "95px" },
      { text: "公告标题", value: "title", width: "95px" },
      { text: "发布时间", value: "update_time", width: "95px" },
    ],
    announcementItems: [],
    selectedAnnouncement: null,
    announcementLoading: false,
    startDate: "",
    endDate: "",
    menuForStartDate: false,
    menuForEndDate: false,
    options: {
      itemsPerPage: 20,
    },
    totalItems: {},
    currentAnnouncement: {},
    stockForSearch: undefined,
    stockList: [],
    stockLoading: false,
    search: null,
  }),
  mounted() {
    this.endDate = moment().add(1, "d").format("YYYY-MM-DD");
    this.startDate = moment().subtract(1, "days").format("YYYY-MM-DD");
    this.getAnnouncements();
  },
  activated() {
    if (this.$route.params.stockCode) {
      this.stockForSearch = this.$route.params.stockCode;
      this.endDate = moment().add(1, "d").format("YYYY-MM-DD");
    this.startDate = moment().subtract(3, "months").format("YYYY-MM-DD");
      this.getAnnouncements();
    }
  },
  methods: {
    getAnnouncements() {
      this.selectedAnnouncement = null;
      let _self = this;
      if (!this.stockForSearch) {
        this.endDate = moment().add(1, "d").format("YYYY-MM-DD");
        this.startDate = moment().subtract(1, "days").format("YYYY-MM-DD");
      }
      commonDataInterface
        .getAnnouncements({
          key: this.stockForSearch,
          startD: this.startDate,
          endD: this.endDate,
        })
        .then((res) => {
          _self.announcementItems = res.list;
          _self.selectedAnnouncement = 0;
        });
    },
    getStocksByKey(key) {
      this.stockLoading = true;
      let _self = this;
      commonDataInterface
        .getStocksByKey({ key: key, allStock: "1" })
        .then((res) => {
          res.list.forEach((e) => {
            e.showName =
              e.stockName + " | " + e.stockCode + " (" + e.pinyin + ")";
          });
          _self.stockList = res.list;
          _self.stockLoading = false;
        });
    },
    // 查看特定股票的近期报告
    checkRecent() {
      this.stockForSearch =  this.currentAnnouncement.stock_code;
      this.search = this.currentAnnouncement.stock_name;
      this.endDate = moment().add(1, "d").format("YYYY-MM-DD");
      this.startDate = moment().subtract(3, "months").format("YYYY-MM-DD");
      this.getAnnouncements();
    },
    gotoRating() {
      this.$router.push({
        name: "stockRating",
        params: {
          stockCode: this.currentAnnouncement.stock_code,
        },
      });
    },
  },
  computed: {},
  watch: { 
    selectedAnnouncement(value) {
      if (value === null) {
        return;
      }
      this.currentAnnouncement = this.announcementItems[value];
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
</style>