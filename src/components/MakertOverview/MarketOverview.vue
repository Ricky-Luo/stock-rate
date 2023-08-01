<template>
  <v-container fluid style="overflow: hidden">
    <h2 style="margin-bottom: 12px">股票池复盘</h2>
    <div style="height: calc(100% - 115px); margin-bottom: 10px; width: 100%">
      <v-window
        v-model="activeBtn"
        :vertical="false"
        :show-arrows="false"
        style="height: 100%; overflow-y: scroll"
        ref="windowRef"
      >
        <v-window-item :key="0" style="height: 100%; overflow-y: scroll">
          <v-row>
            <v-col cols="6">
              <v-card flat style="border-radius: 5px">
                <v-card-title>个股近30日回撤</v-card-title>
                <v-card-text>
                  <v-data-table
                    dense
                    :loading="stockLoading30Maxdrop1"
                    :fixed-header="true"
                    :headers="stockData30maxdrop1Header"
                    :hide-default-footer="true"
                    :items="stockData30maxdrop1"
                    :items-per-page="20"
                  >
                    <template v-slot:item.maxdrop30="{ item }">
                      <span :style="getColor(item.maxdrop30)">{{
                        item.maxdrop30P
                      }}</span>
                    </template>

                    <template v-slot:item.raceGroup="{ item }">
                      <v-chip
                        v-for="(race, index) in item.raceGroup"
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
                    <template v-slot:item.name="{ item }">
                      <div style="padding-left: 8px; text-align: left">
                        <span
                          style="font-size: 12px; vertical-align: text-bottom"
                          >{{ item.depotShow }}</span
                        >
                        <span>{{ item.name }}</span>
                      </div>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card flat style="border-radius: 5px">
                <v-card-title>个股入池以来回撤</v-card-title>
                <v-card-text>
                  <v-data-table
                    dense
                    :loading="stockLoadingIPmaxdrop"
                    :fixed-header="true"
                    :headers="stockDataIPmaxdropHeader"
                    :hide-default-footer="true"
                    :items="stockDataIPmaxdrop"
                    :items-per-page="20"
                  >
                    <template v-slot:item.IPrate="{ item }">
                      <span :style="getColor(item.IPrate)">{{
                        item.IPrateP
                      }}</span>
                    </template>
                    <template v-slot:item.IPmaxdrop="{ item }">
                      <span :style="getColor(item.IPmaxdrop)">{{
                        item.IPmaxdropP
                      }}</span>
                    </template>
                    <template v-slot:item.IPminrate="{ item }">
                      <span :style="getColor(item.IPminrate)">{{
                        item.IPminrateP
                      }}</span>
                    </template>

                    <template v-slot:item.IPenddrop="{ item }">
                      <span :style="getColor(item.IPenddrop)">{{
                        item.IPenddropP
                      }}</span>
                    </template>

                    <template v-slot:item.raceGroup="{ item }">
                      <v-chip
                        v-for="(race, index) in item.raceGroup"
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
                    <template v-slot:item.name="{ item }">
                      <div style="padding-left: 8px; text-align: left">
                        <span
                          style="font-size: 12px; vertical-align: text-bottom"
                          >{{ item.depotShow }}</span
                        >
                        <span>{{ item.name }}</span>
                      </div>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-card flat style="border-radius: 5px">
                <v-card-title>个股近5日涨幅排名</v-card-title>
                <v-card-text>
                  <v-data-table
                    :loading="stockLoadingWeekrate1"
                    dense
                    :fixed-header="true"
                    :headers="stockDataWeekrate1Header"
                    :hide-default-footer="true"
                    :items="stockDataWeekrate1"
                    :items-per-page="20"
                  >
                    <template v-slot:item.Weekrate="{ item }">
                      <span :style="getColor(item.Weekrate)">{{
                        item.WeekrateP
                      }}</span>
                    </template>
                    <template v-slot:item.raceGroup="{ item }">
                      <v-chip
                        v-for="(race, index) in item.raceGroup"
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
                    <template v-slot:item.name="{ item }">
                      <div style="padding-left: 8px; text-align: left">
                        <span
                          style="font-size: 12px; vertical-align: text-bottom"
                          >{{ item.depotShow }}</span
                        >
                        <span>{{ item.name }}</span>
                      </div>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card flat style="border-radius: 5px">
                <v-card-title>个股近5日跌幅排名</v-card-title>
                <v-card-text>
                  <v-data-table
                    dense
                    :loading="stockLoadingWeekrate0"
                    :fixed-header="true"
                    :headers="stockDataWeekrate0Header"
                    :hide-default-footer="true"
                    :items="stockDataWeekrate0"
                    :items-per-page="20"
                  >
                    <template v-slot:item.Weekrate="{ item }">
                      <span :style="getColor(item.Weekrate)">{{
                        item.WeekrateP
                      }}</span>
                    </template>
                    <template v-slot:item.raceGroup="{ item }">
                      <v-chip
                        v-for="(race, index) in item.raceGroup"
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
                    <template v-slot:item.name="{ item }">
                      <div style="padding-left: 8px; text-align: left">
                        <span
                          style="font-size: 12px; vertical-align: text-bottom"
                          >{{ item.depotShow }}</span
                        >
                        <span>{{ item.name }}</span>
                      </div>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-card flat style="border-radius: 5px">
                <v-card-title>个股近10日涨幅排名</v-card-title>
                <v-card-text>
                  <v-data-table
                    :loading="stockLoadingTenrate1"
                    dense
                    :fixed-header="true"
                    :headers="stockDataTenrate1Header"
                    :hide-default-footer="true"
                    :items="stockDataTenrate1"
                    :items-per-page="20"
                  >
                    <template v-slot:item.Tenrate="{ item }">
                      <span :style="getColor(item.Tenrate)">{{
                        item.TenrateP
                      }}</span>
                    </template>
                    <template v-slot:item.raceGroup="{ item }">
                      <v-chip
                        v-for="(race, index) in item.raceGroup"
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
                    <template v-slot:item.name="{ item }">
                      <div style="padding-left: 8px; text-align: left">
                        <span
                          style="font-size: 12px; vertical-align: text-bottom"
                          >{{ item.depotShow }}</span
                        >
                        <span>{{ item.name }}</span>
                      </div>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card flat style="border-radius: 5px">
                <v-card-title>个股近10日跌幅排名</v-card-title>
                <v-card-text>
                  <v-data-table
                    dense
                    :loading="stockLoadingTenrate0"
                    :fixed-header="true"
                    :headers="stockDataTenrate0Header"
                    :hide-default-footer="true"
                    :items="stockDataTenrate0"
                    :items-per-page="20"
                  >
                    <template v-slot:item.Tenrate="{ item }">
                      <span :style="getColor(item.Tenrate)">{{
                        item.TenrateP
                      }}</span>
                    </template>
                    <template v-slot:item.raceGroup="{ item }">
                      <v-chip
                        v-for="(race, index) in item.raceGroup"
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
                    <template v-slot:item.name="{ item }">
                      <div style="padding-left: 8px; text-align: left">
                        <span
                          style="font-size: 12px; vertical-align: text-bottom"
                          >{{ item.depotShow }}</span
                        >
                        <span>{{ item.name }}</span>
                      </div>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-card flat style="border-radius: 5px">
                <v-card-title>个股近30日涨幅排名</v-card-title>
                <v-card-text>
                  <v-data-table
                    :loading="stockLoading30Rate1"
                    dense
                    :fixed-header="true"
                    :headers="stockData30Rate1Header"
                    :hide-default-footer="true"
                    :items="stockData30Rate1"
                    :items-per-page="20"
                  >
                    <template v-slot:item.ThirtyRate="{ item }">
                      <span :style="getColor(item.ThirtyRate)">{{
                        item.ThirtyRateP
                      }}</span>
                    </template>
                    <template v-slot:item.raceGroup="{ item }">
                      <v-chip
                        v-for="(race, index) in item.raceGroup"
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
                    <template v-slot:item.name="{ item }">
                      <div style="padding-left: 8px; text-align: left">
                        <span
                          style="font-size: 12px; vertical-align: text-bottom"
                          >{{ item.depotShow }}</span
                        >
                        <span>{{ item.name }}</span>
                      </div>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card flat style="border-radius: 5px">
                <v-card-title>个股近30日跌幅排名</v-card-title>
                <v-card-text>
                  <v-data-table
                    dense
                    :loading="stockLoading30Rate0"
                    :fixed-header="true"
                    :headers="stockData30Rate0Header"
                    :hide-default-footer="true"
                    :items="stockData30Rate0"
                    :items-per-page="20"
                  >
                    <template v-slot:item.ThirtyRate="{ item }">
                      <span :style="getColor(item.ThirtyRate)">{{
                        item.ThirtyRateP
                      }}</span>
                    </template>
                    <template v-slot:item.raceGroup="{ item }">
                      <v-chip
                        v-for="(race, index) in item.raceGroup"
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
                    <template v-slot:item.name="{ item }">
                      <div style="padding-left: 8px; text-align: left">
                        <span
                          style="font-size: 12px; vertical-align: text-bottom"
                          >{{ item.depotShow }}</span
                        >
                        <span>{{ item.name }}</span>
                      </div>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-card flat style="border-radius: 5px">
                <v-card-title>个股近90日涨幅排名</v-card-title>
                <v-card-text>
                  <v-data-table
                    :loading="stockLoadingNinetyrate1"
                    dense
                    :fixed-header="true"
                    :headers="stockDataNinetyrate1Header"
                    :hide-default-footer="true"
                    :items="stockDataNinetyrate1"
                    :items-per-page="20"
                  >
                    <template v-slot:item.Ninetyrate="{ item }">
                      <span :style="getColor(item.Ninetyrate)">{{
                        item.NinetyrateP
                      }}</span>
                    </template>
                    <template v-slot:item.raceGroup="{ item }">
                      <v-chip
                        v-for="(race, index) in item.raceGroup"
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
                    <template v-slot:item.name="{ item }">
                      <div style="padding-left: 8px; text-align: left">
                        <span
                          style="font-size: 12px; vertical-align: text-bottom"
                          >{{ item.depotShow }}</span
                        >
                        <span>{{ item.name }}</span>
                      </div>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card flat style="border-radius: 5px">
                <v-card-title>个股近90日跌幅排名</v-card-title>
                <v-card-text>
                  <v-data-table
                    dense
                    :loading="stockLoadingNinetyrate0"
                    :fixed-header="true"
                    :headers="stockDataNinetyrate0Header"
                    :hide-default-footer="true"
                    :items="stockDataNinetyrate0"
                    :items-per-page="20"
                  >
                    <template v-slot:item.Ninetyrate="{ item }">
                      <span :style="getColor(item.Ninetyrate)">{{
                        item.NinetyrateP
                      }}</span>
                    </template>
                    <template v-slot:item.raceGroup="{ item }">
                      <v-chip
                        v-for="(race, index) in item.raceGroup"
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
                    <template v-slot:item.name="{ item }">
                      <div style="padding-left: 8px; text-align: left">
                        <span
                          style="font-size: 12px; vertical-align: text-bottom"
                          >{{ item.depotShow }}</span
                        >
                        <span>{{ item.name }}</span>
                      </div>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-card flat style="border-radius: 5px">
                <v-card-title>个股入池以来涨幅排名</v-card-title>
                <v-card-text>
                  <v-data-table
                    dense
                    :loading="stockLoadingIPrate1"
                    :fixed-header="true"
                    :headers="stockDataIPrate1Header"
                    :hide-default-footer="true"
                    :items="stockDataIPrate1"
                    :items-per-page="20"
                  >
                    <template v-slot:item.IPrate="{ item }">
                      <span :style="getColor(item.IPrate)">{{
                        item.IPrateP
                      }}</span>
                    </template>
                    <template v-slot:item.IPmaxdrop="{ item }">
                      <span :style="getColor(item.IPmaxdrop)">{{
                        item.IPmaxdropP
                      }}</span>
                    </template>
                    <template v-slot:item.IPminrate="{ item }">
                      <span :style="getColor(item.IPminrate)">{{
                        item.IPminrateP
                      }}</span>
                    </template>
                    <template v-slot:item.raceGroup="{ item }">
                      <v-chip
                        v-for="(race, index) in item.raceGroup"
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
                    <template v-slot:item.name="{ item }">
                      <div style="padding-left: 8px; text-align: left">
                        <span
                          style="font-size: 12px; vertical-align: text-bottom"
                          >{{ item.depotShow }}</span
                        >
                        <span>{{ item.name }}</span>
                      </div>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card flat style="border-radius: 5px">
                <v-card-title>个股入池以来跌幅排名</v-card-title>
                <v-card-text>
                  <v-data-table
                    dense
                    :loading="stockLoadingIPrate0"
                    :fixed-header="true"
                    :headers="stockDataIPrate0Header"
                    :hide-default-footer="true"
                    :items="stockDataIPrate0"
                    :items-per-page="20"
                  >
                    <template v-slot:item.IPrate="{ item }">
                      <span :style="getColor(item.IPrate)">{{
                        item.IPrateP
                      }}</span>
                    </template>
                    <template v-slot:item.IPmaxdrop="{ item }">
                      <span :style="getColor(item.IPmaxdrop)">{{
                        item.IPmaxdropP
                      }}</span>
                    </template>
                    <template v-slot:item.IPminrate="{ item }">
                      <span :style="getColor(item.IPminrate)">{{
                        item.IPminrateP
                      }}</span>
                    </template>
                    <template v-slot:item.raceGroup="{ item }">
                      <v-chip
                        v-for="(race, index) in item.raceGroup"
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
                    <template v-slot:item.name="{ item }">
                      <div style="padding-left: 8px; text-align: left">
                        <span
                          style="font-size: 12px; vertical-align: text-bottom"
                          >{{ item.depotShow }}</span
                        >
                        <span>{{ item.name }}</span>
                      </div>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item :key="1">
          <race-industry-view></race-industry-view>
        </v-window-item>
        <v-window-item :key="2">
          <whole-market-statistics></whole-market-statistics>
        </v-window-item>
        <v-window-item :key="3">
          <whole-market-statistics-2></whole-market-statistics-2>
        </v-window-item>
        <v-window-item :key="4">
          <whole-market-statistics-3></whole-market-statistics-3>
        </v-window-item>
      </v-window>
    </div>
    <v-bottom-navigation
      :value="activeBtn"
      color="secondary"
      dark
      background-color="primary"
      horizontal
    >
      <v-btn @click="activeBtn = 0">
        <span>股票池个股</span>
        <v-icon>show_chart</v-icon>
      </v-btn>

      <v-btn @click="activeBtn = 1">
        <span>行业/赛道标签</span>
        <v-icon>bar_chart</v-icon>
      </v-btn>

      <v-btn @click="activeBtn = 2">
        <span>细分龙头</span>
        <v-icon>apartment</v-icon>
      </v-btn>
      <v-btn @click="activeBtn = 3">
        <span>全A个股</span>
        <v-icon>assessment</v-icon>
      </v-btn>
      <v-btn @click="activeBtn = 4">
        <span>全A行业</span>
        <v-icon>assessment</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-btn
      text
      small
      style="position: absolute; z-index: 5; top: 15px; right: 20px"
      @click="showMemorandum"
    >
      <v-icon left> post_add </v-icon>
      <span style="text-decoration: underline">速记与复盘</span>
    </v-btn>
  </v-container>
</template>

<script>
import dataInterface from "../../data/marketOverviewData";
import WholeMarketStatistics from "./WholeMarketStatistics.vue";
import store from "../../util/Store";
import WholeMarketStatistics2 from "./WholeMarketStatistics2.vue";
import WholeMarketStatistics3 from "./WholeMarketStatistics3.vue";
import RaceIndustryView from "./RaceIndustryView.vue";

export default {
  name: "marketOverview",
  components: {
    WholeMarketStatistics,
    WholeMarketStatistics2,
    WholeMarketStatistics3,
    RaceIndustryView,
  },
  data: () => ({
    tab1: null,
    tab2: null,
    tab3: null,

    tab5: null,
    tab6: null,
    activeBtn: 0,
    window: 1,

    stockLoading30Maxdrop1: false,
    stockLoadingIPmaxdrop: false,
    stockLoadingWeekrate1: false,
    stockLoadingWeekrate0: false,
    stockLoadingTenrate1: false,
    stockLoadingTenrate0: false,
    stockLoading30Rate1: false,
    stockLoading30Rate0: false,
    stockLoadingNinetyrate1: false,
    stockLoadingNinetyrate0: false,
    stockLoadingIPrate1: false,
    stockLoadingIPrate0: false,
    stockData30maxdrop1Header: [
      { text: "序号", value: "index", width: "45px", sortable: false },
      {
        text: "股票代码",
        value: "stockCode",

        width: "85px",
        sortable: false,
        align: "end",
      },
      { text: "股票名称", value: "name", width: "105px", sortable: false },
      { text: "行业", value: "industry", width: "105px", sortable: false },
      {
        text: "赛道/标签",
        value: "raceGroup",
        width: "155px",
        sortable: false,
      },
      {
        text: "回撤",
        value: "maxdrop30",
        width: "105px",
        align: "end",
        sortable: false,
      },
      {
        text: "市值(亿元)",
        value: "ev",
        align: "end",
        width: "105px",
        sortable: false,
      },
    ],
    stockDataIPmaxdropHeader: [
      { text: "序号", value: "index", width: "45px", sortable: false },
      {
        text: "股票代码",
        value: "stockCode",
        width: "85px",
        sortable: false,
        align: "end",
      },
      { text: "股票名称", value: "name", width: "105px", sortable: false },
      { text: "行业", value: "industry", width: "105px", sortable: false },
      {
        text: "赛道/标签",
        value: "raceGroup",
        width: "155px",
        sortable: false,
      },
      {
        text: "现价回撤",
        value: "IPenddrop",
        width: "95px",
        align: "end",
        sortable: false,
      },
      {
        text: "入池涨跌幅",
        value: "IPrate",
        width: "100px",
        align: "end",
        sortable: false,
      },
      {
        text: "最大回撤",
        value: "IPmaxdrop",
        width: "85px",
        align: "end",
        sortable: false,
      },
      {
        text: "最大亏损",
        value: "IPminrate",
        width: "85px",
        align: "end",
        sortable: false,
      },
      {
        text: "市值(亿元)",
        value: "ev",
        align: "end",
        width: "105px",
        sortable: false,
      },
      {
        text: "调入日期",
        value: "createdAt",
        width: "90px",
        align: "end",
        sortable: false,
      },
      {
        text: "存续期(天)",
        value: "inDay",
        width: "80px",
        align: "end",
        sortable: false,
      },
    ],
    stockDataWeekrate1Header: [
      { text: "序号", width: "45px", value: "index", sortable: false },
      {
        text: "股票代码",
        width: "85px",
        value: "stockCode",
        sortable: false,
        align: "end",
      },
      { text: "股票名称", width: "105px", value: "name", sortable: false },
      { text: "行业", width: "105px", value: "industry", sortable: false },
      {
        text: "赛道/标签",
        width: "155px",
        value: "raceGroup",
        sortable: false,
      },
      {
        text: "涨幅%",
        value: "Weekrate",
        align: "end",
        width: "105px",
        sortable: false,
      },
      {
        text: "市值(亿元)",
        value: "ev",
        align: "end",
        width: "105px",
        sortable: false,
      },
    ],
    stockDataWeekrate0Header: [
      { text: "序号", width: "45px", value: "index", sortable: false },
      {
        text: "股票代码",
        width: "85px",
        value: "stockCode",
        sortable: false,
        align: "end",
      },
      { text: "股票名称", width: "105px", value: "name", sortable: false },
      { text: "行业", width: "105px", value: "industry", sortable: false },
      {
        text: "赛道/标签",
        width: "155px",
        value: "raceGroup",
        sortable: false,
      },
      {
        text: "跌幅%",
        value: "Weekrate",
        align: "end",
        width: "105px",
        sortable: false,
      },
      {
        text: "市值(亿元)",
        value: "ev",
        align: "end",
        width: "105px",
        sortable: false,
      },
    ],
    stockDataTenrate1Header: [
      { text: "序号", value: "index", width: "45px", sortable: false },
      {
        text: "股票代码",
        value: "stockCode",
        width: "105px",
        sortable: false,
        align: "end",
      },
      { text: "股票名称", value: "name", width: "85px", sortable: false },
      { text: "行业", value: "industry", width: "105px", sortable: false },
      {
        text: "赛道/标签",
        value: "raceGroup",
        width: "105px",
        sortable: false,
      },
      {
        text: "涨幅",
        value: "Tenrate",
        width: "105px",
        align: "end",
        sortable: false,
      },
      {
        text: "市值(亿元)",
        value: "ev",
        align: "end",
        width: "105px",
        sortable: false,
      },
    ],
    stockDataTenrate0Header: [
      { text: "序号", value: "index", width: "45px", sortable: false },
      {
        text: "股票代码",
        value: "stockCode",
        width: "85px",
        sortable: false,
        align: "end",
      },
      { text: "股票名称", value: "name", width: "105px", sortable: false },
      { text: "行业", value: "industry", width: "105px", sortable: false },
      {
        text: "赛道/标签",
        value: "raceGroup",
        width: "105px",
        sortable: false,
      },
      {
        text: "跌幅",
        value: "Tenrate",
        width: "105px",
        align: "end",
        sortable: false,
      },
      {
        text: "市值(亿元)",
        value: "ev",
        align: "end",
        width: "105px",
        sortable: false,
      },
    ],
    stockData30Rate1Header: [
      { text: "序号", value: "index", width: "45px", sortable: false },
      {
        text: "股票代码",
        value: "stockCode",
        width: "85px",
        sortable: false,
        align: "end",
      },
      { text: "股票名称", value: "name", width: "105px", sortable: false },
      { text: "行业", value: "industry", width: "105px", sortable: false },
      {
        text: "赛道/标签",
        value: "raceGroup",
        width: "105px",
        sortable: false,
      },
      {
        text: "涨幅",
        value: "ThirtyRate",
        width: "105px",
        align: "end",
        sortable: false,
      },
      {
        text: "市值(亿元)",
        value: "ev",
        align: "end",
        width: "105px",
        sortable: false,
      },
    ],
    stockData30Rate0Header: [
      { text: "序号", value: "index", width: "45px", sortable: false },
      {
        text: "股票代码",
        value: "stockCode",
        width: "85px",
        sortable: false,
        align: "end",
      },
      { text: "股票名称", value: "name", width: "105px", sortable: false },
      { text: "行业", value: "industry", width: "105px", sortable: false },
      {
        text: "赛道/标签",
        value: "raceGroup",
        width: "105px",
        sortable: false,
      },
      {
        text: "跌幅",
        value: "ThirtyRate",
        width: "105px",
        align: "end",
        sortable: false,
      },
      {
        text: "市值(亿元)",
        value: "ev",
        align: "end",
        width: "105px",
        sortable: false,
      },
    ],
    stockDataNinetyrate1Header: [
      { text: "序号", value: "index", width: "45px", sortable: false },
      {
        text: "股票代码",
        value: "stockCode",
        width: "85px",
        sortable: false,
        align: "end",
      },
      { text: "股票名称", value: "name", width: "105px", sortable: false },
      { text: "行业", value: "industry", width: "105px", sortable: false },
      {
        text: "赛道/标签",
        value: "raceGroup",
        width: "105px",
        sortable: false,
      },
      {
        text: "涨幅",
        value: "Ninetyrate",
        width: "105px",
        align: "end",
        sortable: false,
      },
      {
        text: "市值(亿元)",
        value: "ev",
        align: "end",
        width: "105px",
        sortable: false,
      },
    ],
    stockDataNinetyrate0Header: [
      { text: "序号", value: "index", width: "45px", sortable: false },
      {
        text: "股票代码",
        value: "stockCode",
        width: "85px",
        sortable: false,
        align: "end",
      },
      { text: "股票名称", value: "name", width: "105px", sortable: false },
      { text: "行业", value: "industry", width: "105px", sortable: false },
      {
        text: "赛道/标签",
        value: "raceGroup",
        width: "105px",
        sortable: false,
      },
      {
        text: "跌幅",
        value: "Ninetyrate",
        width: "105px",
        align: "end",
        sortable: false,
      },
      {
        text: "市值(亿元)",
        value: "ev",
        align: "end",
        width: "105px",
        sortable: false,
      },
    ],
    stockDataIPrate1Header: [
      { text: "序号", value: "index", width: "45px", sortable: false },
      {
        text: "股票代码",
        value: "stockCode",
        width: "85px",
        sortable: false,
        align: "end",
      },
      { text: "股票名称", value: "name", width: "105px", sortable: false },
      { text: "行业", value: "industry", width: "105px", sortable: false },
      {
        text: "赛道/标签",
        value: "raceGroup",
        width: "155px",
        sortable: false,
      },
      {
        text: "入池涨幅",
        value: "IPrate",
        width: "85px",
        align: "end",
        sortable: false,
      },
      {
        text: "最大回撤",
        value: "IPmaxdrop",
        width: "85px",
        align: "end",
        sortable: false,
      },
      {
        text: "最大亏损",
        value: "IPminrate",
        width: "85px",
        align: "end",
        sortable: false,
      },
      {
        text: "市值(亿元)",
        value: "ev",
        align: "end",
        width: "105px",
        sortable: false,
      },
      {
        text: "调入日期",
        value: "createdAt",
        width: "90px",
        align: "end",
        sortable: false,
      },
      {
        text: "存续期(天)",
        value: "inDay",
        width: "80px",
        align: "end",
        sortable: false,
      },
    ],
    stockDataIPrate0Header: [
      { text: "序号", value: "index", sortable: false, width: "45px" },
      {
        text: "股票代码",
        value: "stockCode",
        sortable: false,
        width: "85px",
        align: "end",
      },
      { text: "股票名称", value: "name", sortable: false, width: "89px" },
      { text: "行业", value: "industry", width: "105px", sortable: false },
      {
        text: "赛道/标签",
        value: "raceGroup",
        width: "155px",
        sortable: false,
      },
      {
        text: "入池跌幅",
        value: "IPrate",
        align: "end",
        sortable: false,
        width: "89px",
      },
      {
        text: "最大回撤",
        value: "IPmaxdrop",
        align: "end",
        sortable: false,
        width: "89px",
      },
      {
        text: "最大亏损",
        value: "IPminrate",
        align: "end",
        sortable: false,
        width: "89px",
      },
      {
        text: "市值(亿元)",
        value: "ev",
        align: "end",
        sortable: false,
      },
      {
        text: "调入日期",
        value: "createdAt",
        align: "end",
        sortable: false,
        width: "90px",
      },
      {
        text: "存续期(天)",
        value: "inDay",
        align: "end",
        sortable: false,
        width: "80px",
      },
    ],
    stockData30maxdrop1: [],
    stockDataIPmaxdrop: [],
    stockDataWeekrate1: [],
    stockDataWeekrate0: [],
    stockDataTenrate1: [],
    stockDataTenrate0: [],
    stockData30Rate1: [],
    stockData30Rate0: [],
    stockDataNinetyrate1: [],
    stockDataNinetyrate0: [],
    stockDataIPrate1: [],
    stockDataIPrate0: [],

    tableHeight: 100,
    tb2TableHeight: 100,
    AMarketRiseLoading: false,
    AmarketDropLoading: false,
    coreStaticWeekWaveLoading: false,
    coreStaticMonthWaveLoading: false,
    coreStaticSinceWaveLoading: false,
    IndusWeekWaveLoading: false,
    IndusMonthWaveLoading: false,
    IndusSiceWaveLoading: false,
  }),
  created() {
    this.loopGetSingleStockData();
  },
  mounted() {},
  methods: {
    // 批量格式化数据
    dealData(list) {
      let index = 1;
      list.forEach((e) => {
        // 处理序号
        e.index = index < 10 ? "0" + index : index;
        index++;
        if (e.raceName) {
          e.raceGroup = e.raceName.split(",");
        } else {
          e.raceGroup = [];
        }
        // 处理涨幅
        e.WeekrateP = this.toPercent(e.Weekrate);
        // 处理市值
        e.ev = (e.ev / 100000000).toFixed(2);
        // 处理PE和预期PE
        e.estpe_FY1 =
          e.estpe_FY1 && e.estpe_FY1 !== "0"
            ? parseFloat(e.estpe_FY1).toFixed(2)
            : "-";
        e.estpe_FY2 =
          e.estpe_FY2 && e.estpe_FY2 !== "0"
            ? parseFloat(e.estpe_FY2).toFixed(2)
            : "-";
        e.estpe_FY3 =
          e.estpe_FY3 && e.estpe_FY3 !== "0"
            ? parseFloat(e.estpe_FY3).toFixed(2)
            : "-";
        e.pe = e.pe && e.pe !== "0" ? parseFloat(e.pe).toFixed(2) : "-";

        // 处理日期
        // if (e.createdAt) {
        //   console.log(e.createdAt);
        //   let createdAtIndex = e.createdAt.indexOf(" ");
        //   e.createdAt = e.createdAt.slice(0, createdAtIndex + 1);
        //   console.log(e.createdAt);
        // }
        // 处理入池涨幅
        e.IPrateP = this.toPercent(e.IPrate);
        // 处理最大回撤
        e.IPmaxdropP = this.toPercent(e.IPmaxdrop);
        e["maxdrop30"] = e["30maxdrop"];
        e["maxdrop30P"] = this.toPercent(e["maxdrop30"]);
        // 处理最大亏损
        e.IPminrateP = this.toPercent(e.IPminrate);
        // 处理现价回撤
        e.IPenddropP = this.toPercent(e.IPenddrop);
        e.TenrateP = this.toPercent(e.Tenrate);
        e.ThirtyRate = e['30rate'];
        e.ThirtyRateP = this.toPercent(e['30rate']);
        e.NinetyrateP = this.toPercent(e.Ninetyrate);

        // 处理角标
        e.depotShow = e.depot;
        if (e.depot === "0") {
          e.depotShow = " ";
        } else if (e.depot === "99") {
          e.depotShow = "0";
        }
      });
      return list;
    },
    getSingleStockData1() {
      let _self = this;
      this.singleStockLoading1 = true;
      dataInterface
        .getAllMarketChange({
          pageNo: "1",
          pageSize: "20",
          orderByKey: "Weekrate",
          ifDesc: "1",
        })
        .then((res) => {
          _self.singleStockData1 = _self.dealData(res.list);
          _self.singleStockLoading1 = false;
        });
    },
    getSingleStockData2() {
      let _self = this;
      this.singleStockLoading2 = true;
      dataInterface
        .getAllMarketChange({
          pageNo: "1",
          pageSize: "20",
          orderByKey: "IPrate",
          ifDesc: "1",
        })
        .then((res) => {
          _self.singleStockData2 = _self.dealData(res.list);
          _self.singleStockLoading2 = false;
        });
    },
    getSingleStockData3() {
      let _self = this;
      this.singleStockLoading3 = true;
      dataInterface
        .getAllMarketChange({
          pageNo: "1",
          pageSize: "20",
          orderByKey: "Weekrate",
          ifDesc: "0",
        })
        .then((res) => {
          _self.singleStockData3 = _self.dealData(res.list);
          _self.singleStockLoading3 = false;
        });
    },
    getSingleStockData4() {
      let _self = this;
      this.singleStockLoading4 = true;
      dataInterface
        .getAllMarketChange({
          pageNo: "1",
          pageSize: "20",
          orderByKey: "IPrate",
          ifDesc: "0",
        })
        .then((res) => {
          _self.singleStockData4 = _self.dealData(res.list);
          _self.singleStockLoading4 = false;
        });
    },
    getSingleStockData5() {
      let _self = this;
      this.singleStockLoading5 = true;
      dataInterface
        .getAllMarketChange({
          pageNo: "1",
          pageSize: "20",
          orderByKey: "30maxdrop",
          ifDesc: "0",
        })
        .then((res) => {
          _self.singleStockData5 = _self.dealData(res.list);
          _self.singleStockLoading5 = false;
        });
    },
    getSingleStockData6() {
      let _self = this;
      this.singleStockLoading6 = true;
      dataInterface
        .getAllMarketChange({
          pageNo: "1",
          pageSize: "20",
          orderByKey: "IPmaxdrop",
          ifDesc: "0",
        })
        .then((res) => {
          _self.singleStockData6 = _self.dealData(res.list);
          _self.singleStockLoading6 = false;
        });
    },
    // 获取单个表格数据
    getSingleStockData(loading, data, orderByKey, ifDesc) {
      let _self = this;
      this[loading] = true;
      dataInterface
        .getAllMarketChange({
          pageNo: "1",
          pageSize: "20",
          orderByKey: orderByKey,
          ifDesc: ifDesc,
        })
        .then((res) => {
          _self[data] = _self.dealData(res.list);
          _self[loading] = false;
        });
    },
    // 连续获取12个表格的数据
    loopGetSingleStockData() {
      let tableCofig = [
        {
          loading: "stockLoading30Maxdrop1",
          data: "stockData30maxdrop1",
          orderByKey: "30maxdrop",
          ifDesc: "0",
        },
        {
          loading: "stockLoadingIPmaxdrop",
          data: "stockDataIPmaxdrop",
          orderByKey: "IPenddrop",
          ifDesc: "0",
        },
        {
          loading: "stockLoadingWeekrate1",
          data: "stockDataWeekrate1",
          orderByKey: "Weekrate",
          ifDesc: "1",
        },
        {
          loading: "stockLoadingWeekrate0",
          data: "stockDataWeekrate0",
          orderByKey: "Weekrate",
          ifDesc: "0",
        },
        {
          loading: "stockLoadingTenrate1",
          data: "stockDataTenrate1",
          orderByKey: "Tenrate",
          ifDesc: "1",
        },
        {
          loading: "stockLoadingTenrate0",
          data: "stockDataTenrate0",
          orderByKey: "Tenrate",
          ifDesc: "0",
        },
        {
          loading: "stockLoading30Rate1",
          data: "stockData30Rate1",
          orderByKey: "Thirtyenddrop",
          ifDesc: "1",
        },
        {
          loading: "stockLoading30Rate0",
          data: "stockData30Rate0",
          orderByKey: "Thirtyenddrop",
          ifDesc: "0",
        },
        {
          loading: "stockLoadingNinetyrate1",
          data: "stockDataNinetyrate1",
          orderByKey: "Ninetyrate",
          ifDesc: "1",
        },
        {
          loading: "stockLoadingNinetyrate0",
          data: "stockDataNinetyrate0",
          orderByKey: "Ninetyrate",
          ifDesc: "0",
        },
        {
          loading: "stockLoadingIPrate1",
          data: "stockDataIPrate1",
          orderByKey: "IPrate",
          ifDesc: "1",
        },
        {
          loading: "stockLoadingIPrate0",
          data: "stockDataIPrate0",
          orderByKey: "IPrate",
          ifDesc: "0",
        },
      ];
      for (let i = 0; i < 7; i++) {
        this.getSingleStockData(
          tableCofig[i].loading,
          tableCofig[i].data,
          tableCofig[i].orderByKey,
          tableCofig[i].ifDesc
        );
      }
      var _self = this;
      setTimeout(() => {
        for (let i = 7; i < 12; i++) {
          _self.getSingleStockData(
            tableCofig[i].loading,
            tableCofig[i].data,
            tableCofig[i].orderByKey,
            tableCofig[i].ifDesc
          );
        }
      }, 3000);
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
    // 显示速记面板
    showMemorandum() {
      store.commit("saveMemorandumShow", 1);
    },
  },
  computed: {},
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
  padding-left: 6px !important;
  padding-right: 6px !important;
}
</style>
<style scoped>
.v-window__container {
  height: 100%;
}
</style>