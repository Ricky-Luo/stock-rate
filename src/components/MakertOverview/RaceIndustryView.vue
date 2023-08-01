<template>
  <div>
    <v-card style="border-radius: 5px; margin-bottom: 12px">
      <v-tabs v-model="tab4" background-color="transparent">
        <v-tab style="background: gainsboro"> 涨跌幅—按市值排序</v-tab>
        <v-tab style="background: gainsboro"> 行业涨跌幅</v-tab>
        <v-tab style="background: gainsboro"> 赛道标签涨跌幅</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab4">
        <v-tab-item :key="'涨跌幅—按市值排序'">
          <!-- 涨跌幅—按市值排序(近5日) start-->
          <v-card flat style="border-radius: 5px">
            <v-card-title>近5日涨跌幅</v-card-title>
            <v-card-text>
              <v-data-table
                dense
                :loading="industryStatisticLoading1"
                :fixed-header="true"
                :headers="industryStatisticHeader1"
                :hide-default-footer="true"
                :items="industryStatisticData1"
                :items-per-page="20"
              >
                <template v-slot:item.avgRate="{ item }">
                  <span :style="getColor(item.avgRate)">{{
                    item.avgRateP
                  }}</span>
                </template>
                <template v-slot:item.downRate="{ item }">
                  <span :style="getColor(item.downRate)">{{
                    item.downRateP
                  }}</span>
                </template>
                <template v-slot:item.upRate="{ item }">
                  <span :style="getColor(item.upRate)">{{ item.upRateP }}</span>
                </template>
                <template v-slot:item.upStockNameCode="{ item }">
                  <div style="padding-left: 8px; text-align: left">
                    <span
                      style="font-size: 12px; vertical-align: text-bottom"
                      >{{ item.depotShow }}</span
                    >
                    <span>{{ item.upStockNameCode }}</span>
                  </div>
                </template>
                <template v-slot:item.downStockNameCode="{ item }">
                  <div style="padding-left: 8px; text-align: left">
                    <span
                      style="font-size: 12px; vertical-align: text-bottom"
                      >{{ item.depotShow }}</span
                    >
                    <span>{{ item.downStockNameCode }}</span>
                  </div>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
          <!-- 涨跌幅—按市值排序(近5日) end-->

          <!-- 涨跌幅—按市值排序(近10日) start-->
          <v-card flat style="border-radius: 5px">
            <v-card-title>近30日涨跌幅</v-card-title>
            <v-card-text>
              <v-data-table
                dense
                :loading="industryStatisticLoading4"
                :fixed-header="true"
                :headers="industryStatisticHeader4"
                :hide-default-footer="true"
                :items="industryStatisticData4"
                :items-per-page="20"
              >
                <template v-slot:item.avgRate="{ item }">
                  <span :style="getColor(item.avgRate)">{{
                    item.avgRateP
                  }}</span>
                </template>
                <template v-slot:item.downRate="{ item }">
                  <span :style="getColor(item.downRate)">{{
                    item.downRateP
                  }}</span>
                </template>
                <template v-slot:item.upRate="{ item }">
                  <span :style="getColor(item.upRate)">{{ item.upRateP }}</span>
                </template>
                <template v-slot:item.upStockNameCode="{ item }">
                  <div style="padding-left: 8px; text-align: left">
                    <span
                      style="font-size: 12px; vertical-align: text-bottom"
                      >{{ item.depotShow }}</span
                    >
                    <span>{{ item.upStockNameCode }}</span>
                  </div>
                </template>
                <template v-slot:item.downStockNameCode="{ item }">
                  <div style="padding-left: 8px; text-align: left">
                    <span
                      style="font-size: 12px; vertical-align: text-bottom"
                      >{{ item.depotShow }}</span
                    >
                    <span>{{ item.downStockNameCode }}</span>
                  </div>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
          <!-- 涨跌幅—按市值排序(近10日) end-->
          <!-- 涨跌幅—按市值排序(入池以来) start-->
          <v-card flat style="border-radius: 5px">
            <v-card-title>入池以来涨跌幅</v-card-title>
            <v-card-text>
              <v-data-table
                dense
                :loading="industryStatisticLoading7"
                :fixed-header="true"
                :headers="industryStatisticHeader7"
                :hide-default-footer="true"
                :items="industryStatisticData7"
                :items-per-page="20"
              >
                <template v-slot:item.avgRate="{ item }">
                  <span :style="getColor(item.avgRate)">{{
                    item.avgRateP
                  }}</span>
                </template>
                <template v-slot:item.downRate="{ item }">
                  <span :style="getColor(item.downRate)">{{
                    item.downRateP
                  }}</span>
                </template>
                <template v-slot:item.upRate="{ item }">
                  <span :style="getColor(item.upRate)">{{ item.upRateP }}</span>
                </template>
                <template v-slot:item.upStockNameCode="{ item }">
                  <div style="padding-left: 8px; text-align: left">
                    <span
                      style="font-size: 12px; vertical-align: text-bottom"
                      >{{ item.depotShow }}</span
                    >
                    <span>{{ item.upStockNameCode }}</span>
                  </div>
                </template>
                <template v-slot:item.downStockNameCode="{ item }">
                  <div style="padding-left: 8px; text-align: left">
                    <span
                      style="font-size: 12px; vertical-align: text-bottom"
                      >{{ item.depotShow }}</span
                    >
                    <span>{{ item.downStockNameCode }}</span>
                  </div>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
          <!-- 涨跌幅—按市值排序(入池以来) end-->
        </v-tab-item>
        <v-tab-item :key="'行业涨跌幅'">
          <!-- 行业涨跌幅TOP10(近5日) start-->
          <v-row>
            <v-col cols="6">
              <v-card flat style="border-radius: 5px">
                <v-card-title>行业涨幅TOP10(近5日)</v-card-title>
                <v-card-text>
                  <v-data-table
                    dense
                    :loading="industryStatisticLoading2"
                    :fixed-header="true"
                    :headers="industryStatisticHeader2"
                    :hide-default-footer="true"
                    :items="industryStatisticData2"
                    :items-per-page="20"
                  >
                    <template v-slot:item.Weekrate="{ item }">
                      <span :style="getColor(item.Weekrate)">{{
                        item.WeekrateP
                      }}</span>
                    </template>
                    <template v-slot:item.stockWeekRate="{ item }">
                      <span :style="getColor(item.stockWeekRate)">{{
                        item.stockWeekRateP
                      }}</span>
                    </template>
                    <template v-slot:item.stockMaxIpRate="{ item }">
                      <span :style="getColor(item.stockMaxIpRate)">{{
                        item.stockMaxIpRateP
                      }}</span>
                    </template>
                    <template v-slot:item.stockNameCode="{ item }">
                      <div style="padding-left: 8px; text-align: left">
                        <span
                          style="font-size: 12px; vertical-align: text-bottom"
                          >{{ item.depotShow }}</span
                        >
                        <span>{{ item.stockNameCode }}</span>
                      </div>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card flat style="border-radius: 5px">
                <v-card-title>行业跌幅TOP10(近5日)</v-card-title>
                <v-card-text>
                  <v-data-table
                    dense
                    :loading="industryStatisticLoading3"
                    :fixed-header="true"
                    :headers="industryStatisticHeader3"
                    :hide-default-footer="true"
                    :items="industryStatisticData3"
                    :items-per-page="20"
                  >
                    <template v-slot:item.Weekrate="{ item }">
                      <span :style="getColor(item.Weekrate)">{{
                        item.WeekrateP
                      }}</span>
                    </template>
                    <template v-slot:item.stockWeekMinRate="{ item }">
                      <span :style="getColor(item.stockWeekMinRate)">{{
                        item.stockWeekMinRateP
                      }}</span>
                    </template>
                    <template v-slot:item.stockMaxIpRate="{ item }">
                      <span :style="getColor(item.stockMaxIpRate)">{{
                        item.stockMaxIpRateP
                      }}</span>
                    </template>
                    <template v-slot:item.stockNameCode="{ item }">
                      <div style="padding-left: 8px; text-align: left">
                        <span
                          style="font-size: 12px; vertical-align: text-bottom"
                          >{{ item.depotShow }}</span
                        >
                        <span>{{ item.stockNameCode }}</span>
                      </div>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <!-- 行业涨跌幅TOP10(近5日) end -->
          <!-- 行业涨跌幅TOP10(近30日) start -->
          <v-row>
            <v-col cols="6">
              <v-card flat style="border-radius: 5px">
                <v-card-title>行业涨幅TOP10(近30日)</v-card-title>
                <v-card-text>
                  <v-data-table
                    dense
                    :loading="industryStatisticLoading5"
                    :fixed-header="true"
                    :headers="industryStatisticHeader5"
                    :hide-default-footer="true"
                    :items="industryStatisticData5"
                    :items-per-page="20"
                  >
                    <template v-slot:item.monthRate="{ item }">
                      <span :style="getColor(item.monthRate)">{{
                        item.monthRateP
                      }}</span>
                    </template>
                    <template v-slot:item.stockMonthRate="{ item }">
                      <span :style="getColor(item.stockMonthRate)">{{
                        item.stockMonthRateP
                      }}</span>
                    </template>
                    <template v-slot:item.stockMaxIpRate="{ item }">
                      <span :style="getColor(item.stockMaxIpRate)">{{
                        item.stockMaxIpRateP
                      }}</span>
                    </template>
                    <template v-slot:item.stockNameCode="{ item }">
                      <div style="padding-left: 8px; text-align: left">
                        <span
                          style="font-size: 12px; vertical-align: text-bottom"
                          >{{ item.depotShow }}</span
                        >
                        <span>{{ item.stockNameCode }}</span>
                      </div>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card flat style="border-radius: 5px">
                <v-card-title>行业跌幅TOP10(近30日)</v-card-title>
                <v-card-text>
                  <v-data-table
                    dense
                    :loading="industryStatisticLoading6"
                    :fixed-header="true"
                    :headers="industryStatisticHeader6"
                    :hide-default-footer="true"
                    :items="industryStatisticData6"
                    :items-per-page="20"
                  >
                    <template v-slot:item.monthRate="{ item }">
                      <span :style="getColor(item.monthRate)">{{
                        item.monthRateP
                      }}</span>
                    </template>
                    <template v-slot:item.stockMonthRate="{ item }">
                      <span :style="getColor(item.stockMonthRate)">{{
                        item.stockMonthRateP
                      }}</span>
                    </template>
                    <template v-slot:item.stockMinIpRate="{ item }">
                      <span :style="getColor(item.stockMinIpRate)">{{
                        item.stockMinIpRateP
                      }}</span>
                    </template>
                    <template v-slot:item.stockNameCode="{ item }">
                      <div style="padding-left: 8px; text-align: left">
                        <span
                          style="font-size: 12px; vertical-align: text-bottom"
                          >{{ item.depotShow }}</span
                        >
                        <span>{{ item.stockNameCode }}</span>
                      </div>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <!-- 行业涨跌幅TOP10(近30日) end -->
          <!-- 行业涨跌幅TOP10(入池已来) start -->
          <v-row>
            <v-col cols="6">
              <v-card flat style="border-radius: 5px">
                <v-card-title>行业涨幅TOP10(入池已来)</v-card-title>
                <v-card-text>
                  <v-data-table
                    dense
                    :loading="industryStatisticLoading8"
                    :fixed-header="true"
                    :headers="industryStatisticHeader8"
                    :hide-default-footer="true"
                    :items="industryStatisticData8"
                    :items-per-page="20"
                  >
                    <template v-slot:item.IPrate="{ item }">
                      <span :style="getColor(item.IPrate)">{{
                        item.IPrateP
                      }}</span>
                    </template>
                    <template v-slot:item.stockIpRate="{ item }">
                      <span :style="getColor(item.stockIpRate)">{{
                        item.stockIpRateP
                      }}</span>
                    </template>
                    <template v-slot:item.stockMaxIpRate="{ item }">
                      <span :style="getColor(item.stockMaxIpRate)">{{
                        item.stockMaxIpRateP
                      }}</span>
                    </template>
                    <template v-slot:item.stockNameCode="{ item }">
                      <div style="padding-left: 8px; text-align: left">
                        <span
                          style="font-size: 12px; vertical-align: text-bottom"
                          >{{ item.depotShow }}</span
                        >
                        <span>{{ item.stockNameCode }}</span>
                      </div>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card flat style="border-radius: 5px">
                <v-card-title>行业跌幅TOP10(入池已来)</v-card-title>
                <v-card-text>
                  <v-data-table
                    dense
                    :loading="industryStatisticLoading9"
                    :fixed-header="true"
                    :headers="industryStatisticHeader9"
                    :hide-default-footer="true"
                    :items="industryStatisticData9"
                    :items-per-page="20"
                  >
                    <template v-slot:item.IPrate="{ item }">
                      <span :style="getColor(item.IPrate)">{{
                        item.IPrateP
                      }}</span>
                    </template>
                    <template v-slot:item.stockIpRate="{ item }">
                      <span :style="getColor(item.stockIpRate)">{{
                        item.stockIpRateP
                      }}</span>
                    </template>
                    <template v-slot:item.stockMinIpRate="{ item }">
                      <span :style="getColor(item.stockMinIpRate)">{{
                        item.stockMinIpRateP
                      }}</span>
                    </template>
                    <template v-slot:item.stockNameCode="{ item }">
                      <div style="padding-left: 8px; text-align: left">
                        <span
                          style="font-size: 12px; vertical-align: text-bottom"
                          >{{ item.depotShow }}</span
                        >
                        <span>{{ item.stockNameCode }}</span>
                      </div>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <!-- 行业涨跌幅TOP10(入池已来) end -->
        </v-tab-item>
        <v-tab-item :key="'赛道标签涨跌幅'">
          <v-row>
            <v-col cols="6">
              <v-card>
                <v-card-title>赛道标签5日涨幅</v-card-title>
                <v-card-text>
                  <v-data-table
                dense
                :loading="raceChgFiveLoading1"
                :fixed-header="true"
                :headers="raceChgHeader1"
                :hide-default-footer="true"
                :items="raceChgFiveData1"
                :items-per-page="20"
              >
                <template v-slot:item.stockRateVal="{ item }">
                  <span :style="getColor(item.stockRateVal)">{{
                    item.stockRateValP
                  }}</span>
                </template>

                <template v-slot:item.raceRateVal="{ item }">
                  <span :style="getColor(item.raceRateVal)">{{
                    item.raceRateValP
                  }}</span>
                </template>
                <template v-slot:item.stockMaxIpRate="{ item }">
                  <span :style="getColor(item.stockMaxIpRate)">{{
                    item.stockMaxIpRateP
                  }}</span>
                </template>
                <template v-slot:item.stockMinIpRate="{ item }">
                  <span :style="getColor(item.stockMinIpRate)">{{
                    item.stockMinIpRateP
                  }}</span>
                </template>
              </v-data-table>
                </v-card-text>
              </v-card>
              
            </v-col>
            <v-col cols="6">
              <v-card>
                <v-card-title>赛道标签5日跌幅</v-card-title>
                <v-card-text>
                  <v-data-table
                dense
                :loading="raceChgFiveLoading0"
                :fixed-header="true"
                :headers="raceChgHeader0"
                :hide-default-footer="true"
                :items="raceChgFiveData0"
                :items-per-page="20"
              >
                <template v-slot:item.stockRateVal="{ item }">
                  <span :style="getColor(item.stockRateVal)">{{
                    item.stockRateValP
                  }}</span>
                </template>

                <template v-slot:item.raceRateVal="{ item }">
                  <span :style="getColor(item.raceRateVal)">{{
                    item.raceRateValP
                  }}</span>
                </template>
                <template v-slot:item.stockMaxIpRate="{ item }">
                  <span :style="getColor(item.stockMaxIpRate)">{{
                    item.stockMaxIpRateP
                  }}</span>
                </template>
                <template v-slot:item.stockMinIpRate="{ item }">
                  <span :style="getColor(item.stockMinIpRate)">{{
                    item.stockMinIpRateP
                  }}</span>
                </template>
              </v-data-table>
                </v-card-text>
              </v-card>
              
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-card>
                <v-card-title>赛道标签10日涨幅</v-card-title>
                <v-card-text>
                  <v-data-table
                dense
                :loading="raceChgTenLoading1"
                :fixed-header="true"
                :headers="raceChgHeader1"
                :hide-default-footer="true"
                :items="raceChgTenData1"
                :items-per-page="20"
              >
                <template v-slot:item.stockRateVal="{ item }">
                  <span :style="getColor(item.stockRateVal)">{{
                    item.stockRateValP
                  }}</span>
                </template>

                <template v-slot:item.raceRateVal="{ item }">
                  <span :style="getColor(item.raceRateVal)">{{
                    item.raceRateValP
                  }}</span>
                </template>

                <template v-slot:item.stockMaxIpRate="{ item }">
                  <span :style="getColor(item.stockMaxIpRate)">{{
                    item.stockMaxIpRateP
                  }}</span>
                </template>
                <template v-slot:item.stockMinIpRate="{ item }">
                  <span :style="getColor(item.stockMinIpRate)">{{
                    item.stockMinIpRateP
                  }}</span>
                </template>
              </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card>
                <v-card-title> 赛道标签10日跌幅</v-card-title>
                <v-card-text>
                  <v-data-table
                dense
                :loading="raceChgTenLoading0"
                :fixed-header="true"
                :headers="raceChgHeader0"
                :hide-default-footer="true"
                :items="raceChgTenData0"
                :items-per-page="20"
              >
                <template v-slot:item.stockRateVal="{ item }">
                  <span :style="getColor(item.stockRateVal)">{{
                    item.stockRateValP
                  }}</span>
                </template>
                <template v-slot:item.raceRateVal="{ item }">
                  <span :style="getColor(item.raceRateVal)">{{
                    item.raceRateValP
                  }}</span>
                </template>
                <template v-slot:item.stockMaxIpRate="{ item }">
                  <span :style="getColor(item.stockMaxIpRate)">{{
                    item.stockMaxIpRateP
                  }}</span>
                </template>
                <template v-slot:item.stockMinIpRate="{ item }">
                  <span :style="getColor(item.stockMinIpRate)">{{
                    item.stockMinIpRateP
                  }}</span>
                </template>
              </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-card>
                <v-card-title>赛道标签30日涨幅</v-card-title>
                <v-card-text>
                  <v-data-table
                dense
                :loading="raceChgThirtyLoading1"
                :fixed-header="true"
                :headers="raceChgHeader1"
                :hide-default-footer="true"
                :items="raceChgThirtyData1"
                :items-per-page="20"
              >
                <template v-slot:item.stockRateVal="{ item }">
                  <span :style="getColor(item.stockRateVal)">{{
                    item.stockRateValP
                  }}</span>
                </template>
                <template v-slot:item.raceRateVal="{ item }">
                  <span :style="getColor(item.raceRateVal)">{{
                    item.raceRateValP
                  }}</span>
                </template>
                <template v-slot:item.stockMaxIpRate="{ item }">
                  <span :style="getColor(item.stockMaxIpRate)">{{
                    item.stockMaxIpRateP
                  }}</span>
                </template>
                <template v-slot:item.stockMinIpRate="{ item }">
                  <span :style="getColor(item.stockMinIpRate)">{{
                    item.stockMinIpRateP
                  }}</span>
                </template>
              </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card>
                <v-card-title>赛道标签30日跌幅</v-card-title>
                <v-card-text>
                  <v-data-table
                dense
                :loading="raceChgThirtyLoading0"
                :fixed-header="true"
                :headers="raceChgHeader0"
                :hide-default-footer="true"
                :items="raceChgThirtyData0"
                :items-per-page="20"
              >
                <template v-slot:item.stockRateVal="{ item }">
                  <span :style="getColor(item.stockRateVal)">{{
                    item.stockRateValP
                  }}</span>
                </template>
                <template v-slot:item.raceRateVal="{ item }">
                  <span :style="getColor(item.raceRateVal)">{{
                    item.raceRateValP
                  }}</span>
                </template>
                <template v-slot:item.stockMaxIpRate="{ item }">
                  <span :style="getColor(item.stockMaxIpRate)">{{
                    item.stockMaxIpRateP
                  }}</span>
                </template>
                <template v-slot:item.stockMinIpRate="{ item }">
                  <span :style="getColor(item.stockMinIpRate)">{{
                    item.stockMinIpRateP
                  }}</span>
                </template>
              </v-data-table>
                </v-card-text>
              </v-card>
              
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-card>
                <v-card-title>赛道标签90日涨幅</v-card-title>
                <v-card-text>
                  <v-data-table
                dense
                :loading="raceChgNinetyLoading1"
                :fixed-header="true"
                :headers="raceChgHeader1"
                :hide-default-footer="true"
                :items="raceChgNinetyData1"
                :items-per-page="20"
              >
                <template v-slot:item.stockRateVal="{ item }">
                  <span :style="getColor(item.stockRateVal)">{{
                    item.stockRateValP
                  }}</span>
                </template>
                <template v-slot:item.raceRateVal="{ item }">
                  <span :style="getColor(item.raceRateVal)">{{
                    item.raceRateValP
                  }}</span>
                </template>
                <template v-slot:item.stockMaxIpRate="{ item }">
                  <span :style="getColor(item.stockMaxIpRate)">{{
                    item.stockMaxIpRateP
                  }}</span>
                </template>
                <template v-slot:item.stockMinIpRate="{ item }">
                  <span :style="getColor(item.stockMinIpRate)">{{
                    item.stockMinIpRateP
                  }}</span>
                </template>
              </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card>
                <v-card-title>赛道标签90日跌幅</v-card-title>
                <v-card-text>
                  <v-data-table
                dense
                :loading="raceChgNinetyLoading0"
                :fixed-header="true"
                :headers="raceChgHeader0"
                :hide-default-footer="true"
                :items="raceChgNinetyData0"
                :items-per-page="20"
              >
                <template v-slot:item.stockRateVal="{ item }">
                  <span :style="getColor(item.stockRateVal)">{{
                    item.stockRateValP
                  }}</span>
                </template>
                <template v-slot:item.raceRateVal="{ item }">
                  <span :style="getColor(item.raceRateVal)">{{
                    item.raceRateValP
                  }}</span>
                </template>
                <template v-slot:item.stockMaxIpRate="{ item }">
                  <span :style="getColor(item.stockMaxIpRate)">{{
                    item.stockMaxIpRateP
                  }}</span>
                </template>
                <template v-slot:item.stockMinIpRate="{ item }">
                  <span :style="getColor(item.stockMinIpRate)">{{
                    item.stockMinIpRateP
                  }}</span>
                </template>
              </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-card>
                <v-card-title>赛道标签自入池以来涨幅</v-card-title>
                <v-card-text>
                  <v-data-table
                dense
                :loading="raceChgIPLoading1"
                :fixed-header="true"
                :headers="raceChgHeader1"
                :hide-default-footer="true"
                :items="raceChgIPData1"
                :items-per-page="20"
              >
                <template v-slot:item.stockRateVal="{ item }">
                  <span :style="getColor(item.stockRateVal)">{{
                    item.stockRateValP
                  }}</span>
                </template>
                <template v-slot:item.raceRateVal="{ item }">
                  <span :style="getColor(item.raceRateVal)">{{
                    item.raceRateValP
                  }}</span>
                </template>
                <template v-slot:item.stockMaxIpRate="{ item }">
                  <span :style="getColor(item.stockMaxIpRate)">{{
                    item.stockMaxIpRateP
                  }}</span>
                </template>
                <template v-slot:item.stockMinIpRate="{ item }">
                  <span :style="getColor(item.stockMinIpRate)">{{
                    item.stockMinIpRateP
                  }}</span>
                </template>
              </v-data-table>
                </v-card-text>
              </v-card>
              
            </v-col>
            <v-col cols="6">
              <v-card>
                <v-card-title>赛道标签自入池以来跌幅</v-card-title>
                <v-card-text>
                  <v-data-table
                dense
                :loading="raceChgIPLoading0"
                :fixed-header="true"
                :headers="raceChgHeader0"
                :hide-default-footer="true"
                :items="raceChgIPData0"
                :items-per-page="20"
              >
                <template v-slot:item.stockRateVal="{ item }">
                  <span :style="getColor(item.stockRateVal)">{{
                    item.stockRateValP
                  }}</span>
                </template>
                <template v-slot:item.raceRateVal="{ item }">
                  <span :style="getColor(item.raceRateVal)">{{
                    item.raceRateValP
                  }}</span>
                </template>
                <template v-slot:item.stockMaxIpRate="{ item }">
                  <span :style="getColor(item.stockMaxIpRate)">{{
                    item.stockMaxIpRateP
                  }}</span>
                </template>
                <template v-slot:item.stockMinIpRate="{ item }">
                  <span :style="getColor(item.stockMinIpRate)">{{
                    item.stockMinIpRateP
                  }}</span>
                </template>
              </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import dataInterface from "../../data/marketOverviewData";
export default {
  name: "RaceIndustryView",
  props: [],
  data: () => ({
    tab4: "赛道标签涨跌幅",
    industryStatisticHeader1: [
      { text: "规模区间", value: "evNum", width: "105px", sortable: false },
      { text: "个数", value: "allNum", width: "105px", sortable: false },
      { text: "上涨家数", value: "upNum", width: "105px", sortable: false },
      { text: "下跌家数", value: "downNum", width: "105px", sortable: false },
      { text: "平均涨幅", value: "avgRate", width: "105px", sortable: false },
      {
        text: "最大涨幅个股",
        value: "upStockNameCode",
        width: "155px",
        sortable: false,
        align: "end",
      },
      { text: "最大涨幅", value: "upRate", width: "105px", sortable: false },
      {
        text: "细分行业",
        value: "upIndustry",
        width: "105px",
        sortable: false,
      },
      {
        text: "最大跌幅个股",
        value: "downStockNameCode",
        width: "155px",
        sortable: false,
        align: "end",
      },
      { text: "最大跌幅", value: "downRate", width: "105px", sortable: false },
      {
        text: "细分行业",
        value: "downIndustry",
        width: "105px",
        sortable: false,
      },
    ],
    industryStatisticHeader2: [
      { text: "TOP10", value: "index", width: "55px", sortable: false },
      {
        text: "行业名称",
        value: "industryName",
        width: "105px",
        sortable: false,
      },
      {
        text: "上涨家数",
        value: "Weekrisecount",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "下跌家数",
        value: "Weekdropcount",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "行业涨幅",
        value: "Weekrate",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "领涨个股",
        value: "stockNameCode",
        width: "165px",
        sortable: false,
        align: "start",
      },
      {
        text: "领涨个股周涨幅",
        value: "stockWeekRate",
        width: "100px",
        sortable: false,
        align: "end",
      },
      {
        text: "入池以来最大涨幅",
        value: "stockMaxIpRate",
        width: "115px",
        sortable: false,
        align: "end",
      },
    ],
    industryStatisticHeader3: [
      { text: "TOP10", value: "index", width: "55px", sortable: false },
      {
        text: "行业名称",
        value: "industryName",
        width: "105px",
        sortable: false,
      },
      {
        text: "上涨家数",
        value: "Weekrisecount",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "下跌家数",
        value: "Weekdropcount",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "行业涨幅",
        value: "Weekrate",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "领跌个股",
        value: "stockNameCode",
        width: "165px",
        sortable: false,
        align: "start",
      },
      {
        text: "领跌个股周跌幅",
        value: "stockWeekMinRate",
        width: "100px",
        sortable: false,
        align: "end",
      },
      {
        text: "入池以来最大涨幅",
        value: "stockMaxIpRate",
        width: "115px",
        sortable: false,
        align: "end",
      },
    ],
    industryStatisticHeader4: [
      { text: "规模区间", value: "evNum", width: "105px", sortable: false },
      { text: "个数", value: "allNum", width: "105px", sortable: false },
      { text: "上涨家数", value: "upNum", width: "105px", sortable: false },
      { text: "下跌家数", value: "downNum", width: "105px", sortable: false },
      { text: "平均涨幅", value: "avgRate", width: "105px", sortable: false },
      {
        text: "最大涨幅个股",
        value: "upStockNameCode",
        width: "155px",
        sortable: false,
        align: "end",
      },
      { text: "最大涨幅", value: "upRate", width: "105px", sortable: false },
      {
        text: "细分行业",
        value: "upIndustry",
        width: "105px",
        sortable: false,
      },
      {
        text: "最大跌幅个股",
        value: "downStockNameCode",
        width: "155px",
        sortable: false,
        align: "end",
      },
      { text: "最大跌幅", value: "downRate", width: "105px", sortable: false },
      {
        text: "细分行业",
        value: "downIndustry",
        width: "115px",
        sortable: false,
      },
    ],
    industryStatisticHeader5: [
      { text: "TOP10", value: "index", width: "55px", sortable: false },
      {
        text: "行业名称",
        value: "industryName",
        width: "105px",
        sortable: false,
      },
      {
        text: "上涨家数",
        value: "monthRiceCount",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "下跌家数",
        value: "monthDropCount",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "行业涨幅",
        value: "monthRate",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "领涨个股",
        value: "stockNameCode",
        width: "165px",
        sortable: false,
        align: "start",
      },
      {
        text: "领涨个股30日涨幅",
        value: "stockMonthRate",
        width: "115px",
        sortable: false,
        align: "end",
      },
      {
        text: "入池以来最大涨幅",
        value: "stockMaxIpRate",
        width: "115px",
        sortable: false,
        align: "end",
      },
    ],
    industryStatisticHeader6: [
      { text: "TOP10", value: "index", width: "55px", sortable: false },
      {
        text: "行业名称",
        value: "industryName",
        width: "105px",
        sortable: false,
      },
      {
        text: "上涨家数",
        value: "monthRiceCount",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "下跌家数",
        value: "monthDropCount",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "行业跌幅",
        value: "monthRate",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "领跌个股",
        value: "stockNameCode",
        width: "165px",
        sortable: false,
        align: "start",
      },
      {
        text: "领跌个股30日跌幅",
        value: "stockMonthRate",
        width: "115px",
        sortable: false,
        align: "end",
      },
      {
        text: "入池以来最大跌幅",
        value: "stockMinIpRate",
        width: "115px",
        sortable: false,
        align: "end",
      },
    ],
    industryStatisticHeader7: [
      { text: "规模区间", value: "evNum", width: "105px", sortable: false },
      { text: "个数", value: "allNum", width: "105px", sortable: false },
      { text: "上涨家数", value: "upNum", width: "105px", sortable: false },
      { text: "下跌家数", value: "downNum", width: "105px", sortable: false },
      { text: "平均涨幅", value: "avgRate", width: "105px", sortable: false },
      {
        text: "最大涨幅个股",
        value: "upStockNameCode",
        width: "155px",
        sortable: false,
        align: "end",
      },
      { text: "最大涨幅", value: "upRate", width: "105px", sortable: false },
      {
        text: "细分行业",
        value: "upIndustry",
        width: "105px",
        sortable: false,
      },
      {
        text: "最大跌幅个股",
        value: "downStockNameCode",
        width: "155px",
        sortable: false,
        align: "end",
      },
      { text: "最大跌幅", value: "downRate", width: "105px", sortable: false },
      {
        text: "细分行业",
        value: "downIndustry",
        width: "105px",
        sortable: false,
      },
    ],
    industryStatisticHeader8: [
      { text: "TOP10", value: "index", width: "55px", sortable: false },
      {
        text: "行业名称",
        value: "industryName",
        width: "105px",
        sortable: false,
      },
      {
        text: "上涨家数",
        value: "IPrisecount",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "下跌家数",
        value: "IPdropcount",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "行业涨幅",
        value: "IPrate",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "领涨个股",
        value: "stockNameCode",
        width: "165px",
        sortable: false,
        align: "start",
      },
      {
        text: "领涨个股入池涨幅",
        value: "stockIpRate",
        width: "115px",
        sortable: false,
        align: "end",
      },
      {
        text: "入池以来最大涨幅",
        value: "stockMaxIpRate",
        width: "115px",
        sortable: false,
        align: "end",
      },
    ],
    industryStatisticHeader9: [
      { text: "TOP10", value: "index", width: "55px", sortable: false },
      {
        text: "行业名称",
        value: "industryName",
        width: "105px",
        sortable: false,
      },
      {
        text: "上涨家数",
        value: "IPrisecount",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "下跌家数",
        value: "IPdropcount",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "行业跌幅",
        value: "IPrate",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "领跌个股",
        value: "stockNameCode",
        width: "165px",
        sortable: false,
        align: "start",
      },
      {
        text: "领跌个股入池跌幅",
        value: "stockIpRate",
        width: "115px",
        sortable: false,
        align: "end",
      },
      {
        text: "入池以来最大跌幅",
        value: "stockMinIpRate",
        width: "115px",
        sortable: false,
        align: "end",
      },
    ],
    industryStatisticLoading1: false,
    industryStatisticLoading2: false,
    industryStatisticLoading3: false,
    industryStatisticLoading4: false,
    industryStatisticLoading5: false,
    industryStatisticLoading6: false,
    industryStatisticLoading7: false,
    industryStatisticLoading8: false,
    industryStatisticLoading9: false,
    industryStatisticData1: [],
    industryStatisticData2: [],
    industryStatisticData3: [],
    industryStatisticData4: [],
    industryStatisticData5: [],
    industryStatisticData6: [],
    industryStatisticData7: [],
    industryStatisticData8: [],
    industryStatisticData9: [],
    raceChgHeader1: [
      { text: "TOP10", value: "index", width: "55px", sortable: false },
      {
        text: "赛道/标签名称",
        value: "raceName",
        width: "105px",
        sortable: false,
      },
      {
        text: "上涨家数",
        value: "raceRiseVal",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "下跌家数",
        value: "raceDropVal",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "标签涨幅",
        value: "raceRateVal",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "领涨个股",
        value: "stockNameCode",
        width: "165px",
        sortable: false,
        align: "start",
      },
      {
        text: "领涨个股涨幅",
        value: "stockRateVal",
        width: "100px",
        sortable: false,
        align: "end",
      },
      {
        text: "入池以来最大涨幅",
        value: "stockMaxIpRate",
        width: "115px",
        sortable: false,
        align: "end",
      },
    ],
    raceChgHeader0: [
      { text: "TOP10", value: "index", width: "55px", sortable: false },
      {
        text: "赛道/标签名称",
        value: "raceName",
        width: "105px",
        sortable: false,
      },
      {
        text: "上涨家数",
        value: "raceRiseVal",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "下跌家数",
        value: "raceDropVal",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "标签涨幅",
        value: "raceRateVal",
        width: "60px",
        sortable: false,
        align: "end",
      },
      {
        text: "领跌个股",
        value: "stockNameCode",
        width: "165px",
        sortable: false,
        align: "start",
      },
      {
        text: "领跌个股跌幅",
        value: "stockRateVal",
        width: "100px",
        sortable: false,
        align: "end",
      },
      {
        text: "入池以来最大跌幅",
        value: "stockMinIpRate",
        width: "115px",
        sortable: false,
        align: "end",
      },
    ],
    raceChgFiveLoading1: false,
    raceChgFiveLoading0: false,
    raceChgTenLoading1: false,
    raceChgTenLoading0: false,
    raceChgThirtyLoading1: false,
    raceChgThirtyLoading0: false,
    raceChgNinetyLoading1: false,
    raceChgNinetyLoading0: false,
    raceChgIPLoading1: false,
    raceChgIPLoading0: false,
    raceChgFiveData1: [],
    raceChgFiveData0: [],
    raceChgTenData1: [],
    raceChgTenData0: [],
    raceChgThirtyData1: [],
    raceChgThirtyData0: [],
    raceChgNinetyData1: [],
    raceChgNinetyData0: [],
    raceChgIPData1: [],
    raceChgIPData0: [],

    evNumMap: {
      1000: ">1000亿",
      500: "500-1000亿",
      200: "200-500亿",
      100: "100-200亿",
      50: "50-100亿",
      0: "0-50亿",
    },
    evOtherMap: {
      3: "一级",
      1: "核心",
      4: "二级",
      5: "三级",
    },
  }),
  mounted() {
    this.getIndustryStatisticData1();
    this.getIndustryStatisticData4();
    this.getIndustryStatisticData7();
    var _self = this;
    setTimeout(() => {
      _self.loopGetIndusStcCom();
    }, 1500);
    setTimeout(() => {
      _self.loopGetRaceMarketChgCom();
    }, 3000);
  },
  methods: {
    // getEvMarketChg
    getIndustryStatisticData1() {
      this.industryStatisticLoading1 = true;
      let _self = this;
      dataInterface
        .getEvMarketChg({
          queryType: "weekRate",
        })
        .then((res) => {
          if (res.code === "0") {
            let tempList = res.list.concat(res.upLevelList);
            tempList.forEach((e) => {
              // 处理平均涨幅
              e.avgRateP = e.avgRate
                ? (e.avgRate * 100).toFixed(2) + "%"
                : null;
              // 处理股票代码和名字
              e.upStockNameCode = e.upStockName + "(" + e.upStockCode + ")";
              e.downStockNameCode =
                e.downStockName + "(" + e.downStockCode + ")";
              // 处理最大跌幅个股跌幅
              e.downRateP = e.downRate
                ? (e.downRate * 100).toFixed(2) + "%"
                : null;
              // 处理最大涨幅个股涨幅
              e.upRateP = e.upRate ? (e.upRate * 100).toFixed(2) + "%" : null;
              // 规模区间转换名字
              e.evNum = _self.evNumMap[e.evNum];
              if (e.stockLevel !== undefined) {
                e.evNum = _self.evOtherMap[e.stockLevel];
              }
              // 处理角标
              e.depotShow = e.depot;
              if (e.depot === "0") {
                e.depotShow = " ";
              } else if (e.depot === "99") {
                e.depotShow = "0";
              }
            });
            _self.industryStatisticData1 = tempList;
            _self.industryStatisticLoading1 = false;
          }
        });
    },
    getIndustryStatisticData4() {
      this.industryStatisticLoading4 = true;
      let _self = this;
      dataInterface
        .getEvMarketChg({
          queryType: "30Rate",
        })
        .then((res) => {
          if (res.code === "0") {
            let tempList = res.list.concat(res.upLevelList);
            tempList.forEach((e) => {
              // 处理平均涨幅
              e.avgRateP = e.avgRate
                ? (e.avgRate * 100).toFixed(2) + "%"
                : null;
              // 处理股票代码和名字
              e.upStockNameCode = e.upStockName + "(" + e.upStockCode + ")";
              e.downStockNameCode =
                e.downStockName + "(" + e.downStockCode + ")";
              // 处理最大跌幅个股跌幅
              e.downRateP = e.downRate
                ? (e.downRate * 100).toFixed(2) + "%"
                : null;
              // 处理最大涨幅个股涨幅
              e.upRateP = e.upRate ? (e.upRate * 100).toFixed(2) + "%" : null;
              // 规模区间转换名字
              e.evNum = _self.evNumMap[e.evNum];
              if (e.stockLevel !== undefined) {
                e.evNum = _self.evOtherMap[e.stockLevel];
              }
              // 处理角标
              e.depotShow = e.depot;
              if (e.depot === "0") {
                e.depotShow = " ";
              } else if (e.depot === "99") {
                e.depotShow = "0";
              }
            });

            _self.industryStatisticData4 = tempList;
            _self.industryStatisticLoading4 = false;
          }
        });
    },
    getIndustryStatisticData7() {
      this.industryStatisticLoading7 = true;
      let _self = this;
      dataInterface
        .getEvMarketChg({
          queryType: "ipRate",
        })
        .then((res) => {
          if (res.code === "0") {
            let tempList = res.list.concat(res.upLevelList);
            tempList.forEach((e) => {
              // 处理平均涨幅
              e.avgRateP = e.avgRate
                ? (e.avgRate * 100).toFixed(2) + "%"
                : null;
              // 处理股票代码和名字
              e.upStockNameCode = e.upStockName + "(" + e.upStockCode + ")";
              e.downStockNameCode =
                e.downStockName + "(" + e.downStockCode + ")";
              // 处理最大跌幅个股跌幅
              e.downRateP = e.downRate
                ? (e.downRate * 100).toFixed(2) + "%"
                : null;
              // 处理最大涨幅个股涨幅
              e.upRateP = e.upRate ? (e.upRate * 100).toFixed(2) + "%" : null;
              // 规模区间转换名字
              e.evNum = _self.evNumMap[e.evNum];
              if (e.stockLevel !== undefined) {
                e.evNum = _self.evOtherMap[e.stockLevel];
              }
              // 处理角标
              e.depotShow = e.depot;
              if (e.depot === "0") {
                e.depotShow = " ";
              } else if (e.depot === "99") {
                e.depotShow = "0";
              }
            });
            _self.industryStatisticData7 = tempList;
            _self.industryStatisticLoading7 = false;
          }
        });
    },
    // 获取行业统计公共方法
    getIndusStcCom(
      index,
      queryType,
      orderByKey,
      ifDesc,
      queryRateCol,
      queryRateType
    ) {
      this["industryStatisticLoading" + index] = true;
      let _self = this;
      dataInterface
        .getIndusStc({
          queryType: queryType,
          orderByKey: orderByKey,
          ifDesc: ifDesc,
          queryRateCol: queryRateCol,
          queryRateType: queryRateType,
        })
        .then((res) => {
          if (res.code === "0") {
            let i = 1;
            res.list.forEach((e) => {
              // 处理序号
              e.index = i < 10 ? "0" + i : i;
              i++;
              e.stockNameCode = e.stockName + "(" + e.stockcode + ")";
              e.IPrateP = _self.toPercent(e.IPrate);
              e.WeekrateP = _self.toPercent(e.Weekrate);
              e.monthRateP = _self.toPercent(e.monthRate);
              e.stockIpRateP = _self.toPercent(e.stockIpRate);
              e.stockMinIpRateP = _self.toPercent(e.stockMinIpRate);
              e.stockMaxIpRateP = _self.toPercent(e.stockMaxIpRate);
              e.stockMonthMaxRateP = _self.toPercent(e.stockMonthMaxRate);
              e.stockMonthRateP = _self.toPercent(e.stockMonthRate);
              e.stockWeekMaxRateP = _self.toPercent(e.stockWeekMaxRate);
              e.stockWeekMinRateP = _self.toPercent(e.stockWeekMinRate);
              e.stockWeekRateP = _self.toPercent(e.stockWeekRate);
              // 处理角标
              e.depotShow = e.depot;
              if (e.depot === "0") {
                e.depotShow = " ";
              } else if (e.depot === "99") {
                e.depotShow = "0";
              }
            });
            _self["industryStatisticData" + index] = res.list;
            _self["industryStatisticLoading" + index] = false;
          }
        });
    },
    // 循环调用 获取行业统计公共方法
    loopGetIndusStcCom() {
      let indexes = [2, 3, 5, 6, 8, 9];
      let paramMap = {
        2: {
          queryType: "weekRate",
          orderByKey: "weekRate",
          ifDesc: "1",
          queryRateCol: "weekMaxRate",
          queryRateType: "max",
        },
        3: {
          queryType: "weekRate",
          orderByKey: "weekRate",
          ifDesc: "0",
          queryRateCol: "weekMinRate",
          queryRateType: "min",
        },
        5: {
          queryType: "30Rate",
          orderByKey: "30Rate",
          ifDesc: "1",
          queryRateCol: "30MaxRate",
          queryRateType: "max",
        },
        6: {
          queryType: "30Rate",
          orderByKey: "30Rate",
          ifDesc: "0",
          queryRateCol: "30MinRate",
          queryRateType: "min",
        },
        8: {
          queryType: "ipRate",
          orderByKey: "ipRate",
          ifDesc: "1",
          queryRateCol: "ipMaxRate",
          queryRateType: "max",
        },
        9: {
          queryType: "ipRate",
          orderByKey: "ipRate",
          ifDesc: "0",
          queryRateCol: "ipMinRate",
          queryRateType: "min",
        },
      };

      indexes.forEach((e) => {
        this.getIndusStcCom(
          e,
          paramMap[e].queryType,
          paramMap[e].orderByKey,
          paramMap[e].ifDesc,
          paramMap[e].queryRateCol,
          paramMap[e].queryRateType
        );
      });
    },
    getRaceMarketChgCom(orderByKey, queryType, ifDesc, loading, dataName) {
      this[loading] = true;
      let _self = this;
      dataInterface
        .getRaceMarketChg({
          queryType: queryType,
          orderByKey: orderByKey,
          ifDesc: ifDesc,
        })
        .then((res) => {
          if (res.code === "0") {
            let i = 1;
            res.list.forEach((e) => {
              // 处理序号
              e.index = i < 10 ? "0" + i : i;
              i++;
              e.stockNameCode = e.stockName + "(" + e.stockcode + ")";
              e.IPrateP = _self.toPercent(e.IPrate);
              e.stockMaxIpRateP = _self.toPercent(e.stockMaxIpRate);
              e.stockMinIpRateP = _self.toPercent(e.stockMinIpRate);
              e.raceDropVal = e.raceDropVal ? parseInt(e.raceDropVal) : 0;
              e.raceRiseVal = e.raceRiseVal ? parseInt(e.raceRiseVal) : 0;
              e.stockRateValP = _self.toPercent(e.stockRateVal);
              e.raceRateValP = _self.toPercent(e.raceRateVal);
              // 处理角标
              e.depotShow = e.depot;
              if (e.depot === "0") {
                e.depotShow = " ";
              } else if (e.depot === "99") {
                e.depotShow = "0";
              }
            });
            console.log(dataName);
            console.log(res.list);
            _self[dataName] = res.list;
            _self[loading] = false;
          }
        });
    },
    loopGetRaceMarketChgCom() {
      let paramMap = {
        1: {
          orderByKey: "fiveRate",
          queryRateType: "max",
          ifDesc: "1",
          loading: "raceChgFiveLoading1",
          data: "raceChgFiveData1",
          riseRate: "stockWeekRate",
          riseCount: "fiveRiseCount",
          dropCount: "fiveDropCount",
        },
        2: {
          orderByKey: "fiveRate",
          queryRateType: "min",
          ifDesc: "0",
          loading: "raceChgFiveLoading0",
          data: "raceChgFiveData0",
          riseRate: "stockWeekRate",
          riseCount: "fiveRiseCount",
          dropCount: "fiveDropCount",
        },
        3: {
          orderByKey: "tenRate",
          queryRateType: "max",
          ifDesc: "1",
          loading: "raceChgTenLoading1",
          data: "raceChgTenData1",
          riseRate: "tenRate",
          riseCount: "tenRiseCount",
          dropCount: "tenDropCount",
        },
        4: {
          orderByKey: "tenRate",
          queryRateType: "min",
          ifDesc: "0",
          loading: "raceChgTenLoading0",
          data: "raceChgTenData0",
          riseRate: "tenRate",
          riseCount: "tenRiseCount",
          dropCount: "tenDropCount",
        },
        5: {
          orderByKey: "thirtyRate",
          queryRateType: "max",
          ifDesc: "1",
          loading: "raceChgThirtyLoading1",
          data: "raceChgThirtyData1",
          riseRate: "thirtyRate",
          riseCount: "thirtyRiseCount",
          dropCount: "thirtyDropCount",
        },
        6: {
          orderByKey: "thirtyRate",
          queryRateType: "min",
          ifDesc: "0",
          loading: "raceChgThirtyLoading0",
          data: "raceChgThirtyData0",
          riseRate: "thirtyRate",
          riseCount: "thirtyRiseCount",
          dropCount: "thirtyDropCount",
        },
        7: {
          orderByKey: "ninetyRate",
          queryRateType: "max",
          ifDesc: "1",
          loading: "raceChgNinetyLoading1",
          data: "raceChgNinetyData1",
          riseRate: "ninetyRate",
          riseCount: "ninetyRiseCount",
          dropCount: "ninetyDropCount",
        },
        8: {
          orderByKey: "ninetyRate",
          queryRateType: "min",
          ifDesc: "0",
          loading: "raceChgNinetyLoading0",
          data: "raceChgNinetyData0",
          riseRate: "ninetyRate",
          riseCount: "ninetyRiseCount",
          dropCount: "ninetyDropCount",
        },
        9: {
          orderByKey: "ipRate",
          queryRateType: "max",
          ifDesc: "1",
          loading: "raceChgIPLoading1",
          data: "raceChgIPData1",
          riseRate: "stockIpRate",
          riseCount: "ipRiseCount",
          dropCount: "ipDropCount",
        },
        10: {
          orderByKey: "ipRate",
          queryRateType: "min",
          ifDesc: "0",
          loading: "raceChgIPLoading0",
          data: "raceChgIPData0",
          riseRate: "stockIpRate",
          riseCount: "ipRiseCount",
          dropCount: "ipDropCount",
        },
      };
      for (let i = 1; i < 4; i++) {
        this.getRaceMarketChgCom(
          paramMap[i].orderByKey,
          paramMap[i].queryRateType,
          paramMap[i].ifDesc,
          paramMap[i].loading,
          paramMap[i].data,
          paramMap[i].riseRate,
          paramMap[i].riseCount,
          paramMap[i].dropCount
        );
      }
      var _self = this;
      setTimeout(() => {
        for (let i = 4; i < 7; i++) {
          _self.getRaceMarketChgCom(
            paramMap[i].orderByKey,
            paramMap[i].queryRateType,
            paramMap[i].ifDesc,
            paramMap[i].loading,
            paramMap[i].data,
            paramMap[i].riseRate,
            paramMap[i].riseCount,
            paramMap[i].dropCount
          );
        }
      }, 1500);
      setTimeout(() => {
        for (let i = 7; i < 11; i++) {
          _self.getRaceMarketChgCom(
            paramMap[i].orderByKey,
            paramMap[i].queryRateType,
            paramMap[i].ifDesc,
            paramMap[i].loading,
            paramMap[i].data,
            paramMap[i].riseRate,
            paramMap[i].riseCount,
            paramMap[i].dropCount
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
  },
  computed: {},
  watch: {},
};
</script>
