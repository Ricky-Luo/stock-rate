<template>
  <v-container fluid style="overflow-y: scroll">
    <h2 style="margin-bottom: 12px">股票池和OTC池</h2>
    <!-- 核心池 start -->
    <v-hover v-show="coreOrTurnOut">
      <template v-slot="{ hover }">
        <v-card :elevation="hover ? 6 : 2" style="border-radius: 5px">
          <v-card-title>
            股票池
            <v-btn
              text
              small
              dense
              color="secondary"
              style="margin-bottom: -5px"
              @click="switchToOutedStocks"
            >
              <v-icon small>sync_alt</v-icon>
              调出池
            </v-btn>
            <v-spacer></v-spacer>
            <!-- <v-checkbox
                  dense
                  label="仅显示最近更新"
                  value="1"
                ></v-checkbox> -->

            <div style="width: 160px; margin-right: 5px;margin-left:12px;">
              <v-text-field
                v-model="filterKeyCore"
                single-line
                label="股票名称/代码"
                @change="getCoreStocks(true)"
                clearable
              ></v-text-field>
            </div>

            <div style="width: 120px; margin-right: 5px">
              <v-combobox
                v-model="marketTypeForCore" 
                dense
                :items="marketTypeList"
                label="市场类别"
                full-width
                @change="getCoreStocks(true)"
              ></v-combobox>
            </div>
            <div style="width: 120px; margin-right: 5px">
              <v-autocomplete
                v-model="depotFilterForCore"
                dense
                :items="depotList"
                label="关注人"
                item-text="depotName"
                item-value="depot"
                full-width
                clearable
                @change="getCoreStocks(true)"
              ></v-autocomplete>
            </div>

            <div style="width: 120px; margin-right: 5px">
              <v-autocomplete
                v-model="stockLevelForCore"
                dense
                :items="stockLevelList"
                label="评级"
                item-text="levelName"
                item-value="levelValue"
                full-width
                clearable
                @change="getCoreStocks(true)"
              ></v-autocomplete>
            </div>

            <div style="width: 120px; margin-right: 5px">
              <v-combobox
                v-model="industryFilterForCore"
                dense
                :items="industryList"
                label="行业"
                item-text="industry"
                item-value="id"
                full-width
                clearable
                @change="getCoreStocks(true)"
              ></v-combobox>
            </div>
            <div style="width: 120px; margin-right: 5px">
              <v-combobox
                v-model="raceFilterForCore"
                dense
                :items="raceList"
                label="赛道/标签"
                item-text="raceName"
                item-value="id"
                full-width
                clearable
                @change="getCoreStocks(true)"
              ></v-combobox>
            </div>
            <div>
              <v-btn
                fab
                dark
                x-small
                elevation="2"
                outlined
                color="primary"
                @click="getCoreStocks(true)"
              >
                <v-icon dark>search</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text style="padding-bottom: 0px">
            <data-table
              :columns="coreHeader"
              :data="coreItems"
              :width="'100%'"
              :height="'950px'"
              @scrollToEnd="loadMoreCoreStocks"
              @sortMethod="getCoreStocks(true)"
              :loading="coreTableLoading"
              :options="coreOptions"
              :showPopup="true"
              ref="coreStockTable"
            >
              <template v-slot:stockCode="item">
                <a @click="goToStockDetail(item.item)">{{
                  item.item.stockCode
                }}</a>
              </template>

              <template v-slot:stockName="item">
                <span
                  style="
                    font-size: 12px;
                    margin-right: 3px;
                    vertical-align: text-bottom;
                  "
                  >{{ item.item.depotShow }}</span
                >
                <a @click="goToStockDetail(item.item)">{{
                  item.item.stockName
                }}</a>
              </template>
              <template v-slot:goRating="item">
                <v-icon @click="goRating(item.item)" small>launch</v-icon>
              </template>

              <template v-slot:raceGroup="item">
                <v-chip
                  v-for="(race, index) in item.item.raceGroup"
                  style="margin-right: 5px; margin-top: 2px; margin-bottom: 2px"
                  dense
                  small
                  dark
                  color="#6790A8"
                  v-bind:key="race + index"
                  >{{ race }}</v-chip
                >
              </template>

              <template v-slot:action="item">
                <template v-if="item.item.lastTransType === '1'">
                  申请调出中
                </template>
                <template v-else>
                  <a @click="pullOutFCore(item.item)">申请调出</a>
                  <a @click="editCoreStock(item.item)" style="margin-left: 5px"
                    >修改</a
                  >
                </template>
              </template>
              <template v-slot:day_chg="item">
                <span :style="getColor(item.item.day_chg)">{{
                  item.item.day_chgP
                }}</span>
              </template>
              <template v-slot:five_chg="item">
                <span :style="getColor(item.item.five_chg)">{{
                  item.item.five_chgP
                }}</span>
              </template>
              <template v-slot:month_chg="item">
                <span :style="getColor(item.item.month_chg)">{{
                  item.item.month_chgP
                }}</span>
              </template>
              <template v-slot:ninety_chg="item">
                    <span :style="getColor(item.item.ninety_chg)">{{
                      item.item.ninety_chgP
                    }}</span>
                  </template>
              <template v-slot:IPrate="item">
                <span :style="getColor(item.item.IPrate)">{{
                  item.item.IPrateP
                }}</span>
              </template>
              <template v-slot:popup="item">
                <div>
                  <v-card
                    :elevation="hover ? 6 : 2"
                    width="100%"
                    style="border-radius: 5px"
                  >
                    <v-card-title
                      >{{ item.item.stockCode }} |
                      {{ item.item.stockName }}</v-card-title
                    >
                    <v-card-text>
                      <table style="width:100%;margin-bottom:6px;">
                        <!-- <thead>
                          <tr>
                            <th style="width: 80px" align="left">PE</th>
                            <th style="width: 80px" align="left">PE(20)</th>
                            <th style="width: 80px" align="left">PE(21)</th>
                            <th style="width: 80px" align="left">PE(22)</th>
                          </tr>
                        </thead> -->
                        <tbody>
                          <!-- <tr>
                            <td align="left">{{ item.item.pe }}</td>
                            <td align="left">{{ item.item.estpe_FY1 }}</td>
                            <td align="left">{{ item.item.estpe_FY2 }}</td>
                            <td align="left">{{ item.item.estpe_FY3 }}</td>
                          </tr> -->
                          <tr>
                            <td align="right">PE(TTM)</td>
                            <td align="right">{{item.item.pe_ttm}}</td>
                            <td align="right">PB(MRQ)</td>
                            <td align="right">{{item.item.pb}}</td>
                          </tr>
                          <tr>
                            <td align="right">PEG</td>
                            <td align="right">{{item.item.peg}}</td>
                            <td align="right">PS(TTM)</td>
                            <td align="right">{{item.item.ps_ttm}}</td>
                          </tr>
                          <tr>
                            <td align="right">毛利率</td>
                            <td align="right">{{item.item.netprofitmargin}}</td>
                            <td align="right">净利率</td>
                            <td align="right">{{item.item.grossprofitmargin}}</td>
                          </tr>
                          <tr>
                            <td align="right">ROE</td>
                            <td align="right">{{item.item.roe}}</td>
                            <td align="right">负债率</td>
                            <td align="right">{{item.item.debttoassets}}</td>
                          </tr>
                          <tr>
                            <td align="right">商誉</td>
                            <td align="right">{{item.item.goodwill}}</td>
                            <td align="right">质押比</td>
                            <td align="right">{{item.item.share_pledgeda_pct}}</td>
                          </tr>
                          <!-- <tr>
                            <td align="right">融资余额</td>
                            <td align="right">{{item.item.mrg_long_bal}}</td>
                            <td align="right">融券余额</td>
                            <td align="right">{{item.item.mrg_short_bal}}</td>
                          </tr> -->
                        </tbody>
                      </table>
                      <p>理由：{{ item.item.reason }}</p>
                    </v-card-text>
                  </v-card>
                </div>
              </template>
            </data-table>
          </v-card-text>
          <v-card-actions>
            <v-btn
              outlined
              small
              dense
              color="primary"
              elevation="2"
              @click="addNewStockToCore"
              v-show="coreOrTurnOut"
            >
              调入新股票
            </v-btn>

            <v-btn
              outlined
              small
              dense
              color="primary"
              elevation="2"
              @click="donwloadXLSX"
              v-show="coreOrTurnOut"
              style="margin-left: 5px"
            >
              <v-icon small>vertical_align_bottom</v-icon>
              下载序列模板
            </v-btn>

            <v-file-input
              id="path"
              :value="uploadFile"
              v-model="uploadFile"
              style="display: none"
            ></v-file-input>
            <v-btn
              outlined
              small
              dense
              color="primary"
              elevation="2"
              onclick="path.click()"
              v-show="coreOrTurnOut"
              style="margin-left: 5px"
              :loading="uploadLoading"
            >
              <v-icon small>vertical_align_top</v-icon>
              上传股票序列
            </v-btn>
            <v-spacer></v-spacer>
            <span style="margin-right: 8px; color: rgba(0, 0, 0, 0.87)"
              >共 {{ coreTotalItems }}</span
            >
          </v-card-actions>
        </v-card>
      </template>
    </v-hover>
    <div
      class="table-footer-prepend d-flex pl-2 align-center"
      style="margin-top: -52px"
      v-show="coreOrTurnOut"
    ></div>
    <v-hover v-show="!coreOrTurnOut">
      <template v-slot="{ hover }">
        <v-card
          :elevation="hover ? 6 : 2"
          style="border-radius: 5px; margin-top: 8px"
        >
          <v-card-title>
            调出池
            <v-btn
              text
              small
              dense
              color="secondary"
              style="margin-bottom: -5px"
              @click="switchToOutedStocks"
            >
              <v-icon small>sync_alt</v-icon>
              股票池
            </v-btn>
            <v-spacer></v-spacer>
            <div style="width: 180px; margin-right: 5px">
              <v-text-field
                v-model="filterKeyCore"
                single-line
                label="股票名称/代码"
                @change="getOutedStocks(true)"
                clearable
              ></v-text-field>
            </div>

            <div style="width: 180px; margin-right: 5px">
              <v-combobox
                v-model="industryFilterForOuted"
                dense
                :items="industryList"
                label="行业"
                item-text="industry"
                item-value="id"
                full-width
                clearable
                @change="getOutedStocks(true)"
              ></v-combobox>
            </div>
            <div style="width: 180px; margin-right: 5px">
              <v-combobox
                v-model="marketTypeForOuted"
                dense
                :items="marketTypeList"
                label="市场类别"
                full-width
                @change="getOutedStocks(true)"
              ></v-combobox>
            </div>
            <div>
              <v-btn
                fab
                dark
                x-small
                elevation="2"
                outlined
                color="primary"
                @click="getOutedStocks(true)"
              >
                <v-icon dark>search</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="outedHeader"
              :items="outedItems"
              :loading="outedLoading"
              dense
              :options.sync="outedOptions"
              :server-items-length="outedTotalItems"
              :footer-props="{
                itemsPerPageOptions: [20],
                showFirstLastPage: true,
              }"
            >
              <template v-slot:item.action="{ item }">
                <template>
                  <a @click="eidtOutedItem(item)">调整</a>
                  <a @click="deleteOutedItem(item)" style="margin-left: 5px"
                    >删除</a
                  >
                </template>
              </template>
              <template v-slot:item.rate="{ item }">
                <span :style="getColor(item.rate)">{{ item.rateP }}</span>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </template>
    </v-hover>

    <!-- 核心池 end -->

    <!-- OTC池 start -->
    <v-hover
      v-show="otcOrTurnOut"
      v-if="isPermissible('otc')"
      style="margin-top: 12px"
    >
      <template v-slot="{ hover }">
        <v-card
          :elevation="hover ? 6 : 2"
          style="border-radius: 5px; margin-top: 6px"
        >
          <v-card-title>
            OTC池
            <v-btn
              text
              small
              dense
              color="secondary"
              style="margin-bottom: -5px"
              @click="switchOTCorHis"
            >
              <v-icon small>sync_alt</v-icon>
              OTC调出记录
            </v-btn>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <div style="width: 160px; margin-right: 5px">
              <v-text-field
                v-model="filterKeyOtc"
                single-line
                label="股票关键字"
                clearable
                @change="getOtcStocks(true)"
              ></v-text-field>
            </div>
            <div style="width: 120px; margin-right: 5px">
              <v-combobox
                v-model="raceFilterForOTC"
                dense
                :items="raceList"
                label="赛道/标签"
                item-text="raceName"
                item-value="id"
                full-width
                clearable
                @change="getOtcStocks(true)"
              ></v-combobox>
            </div>
            <div style="width: 120px; margin-right: 5px">
              <v-combobox
                v-model="industryFilterForOTC"
                dense
                :items="industryList"
                label="行业"
                item-text="industry"
                item-value="id"
                full-width
                clearable
                @change="getOtcStocks(true)"
              ></v-combobox>
            </div>
            <div style="width: 120px; margin-right: 5px">
              <v-combobox
                v-model="marketTypeForOTC"
                dense
                :items="marketTypeList"
                label="市场类别"
                full-width
                @change="getOtcStocks(true)"
              ></v-combobox>
            </div>
            <div>
              <v-btn
                fab
                dark
                x-small
                outlined
                color="primary"
                elevation="2"
                @click="getOtcStocks(true)"
              >
                <v-icon dark>search</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text style="padding-bottom: 0px">
            <data-table
              :columns="otcHeader"
              :data="otcItems"
              :width="'100%'"
              :height="'500px'"
              @scrollToEnd="loadMoreOtcStocks"
              @sortMethod="getOtcStocks(true)"
              :loading="otcTableLoading"
              :options="otcOptions"
              :showPopup="true"
              ref="otcStockTable"
            >
              <template v-slot:stockName="item">
                <a @click="goToStockDetail(item.item)">{{
                  item.item.stockName
                }}</a>
              </template>
              <template v-slot:stockCode="item">
                <a @click="goToStockDetail(item.item)">{{
                  item.item.stockCode
                }}</a>
              </template>
              <template v-slot:stdevr="item">
                <a @click="showVolatilityHis(item.item)">{{
                  item.item.stdevr
                }}</a>
              </template>

              <template v-slot:raceGroup="item">
                <v-chip
                  v-for="(race, index) in item.item.raceGroup"
                  style="margin-right: 5px; margin-top: 2px; margin-bottom: 2px"
                  dense
                  small
                  dark
                  color="#6790A8"
                  v-bind:key="race + index"
                  >{{ race }}</v-chip
                >
              </template>

              <template v-slot:day_chg="item">
                <span :style="getColor(item.item.day_chg)">{{
                  item.item.day_chgP
                }}</span>
              </template>
              <template v-slot:five_chg="item">
                <span :style="getColor(item.item.five_chg)">{{
                  item.item.five_chgP
                }}</span>
              </template>
              <template v-slot:month_chg="item">
                <span :style="getColor(item.item.month_chg)">{{
                  item.item.month_chgP
                }}</span>
              </template>
              <template v-slot:ninety_chg="item">
                    <span :style="getColor(item.item.ninety_chg)">{{
                      item.item.ninety_chgP
                    }}</span>
                  </template>
              <template v-slot:IPrate="item">
                <span :style="getColor(item.item.IPrate)">{{
                  item.item.IPrateP
                }}</span>
              </template>
              <template v-slot:action="item">
                <a text dense @click="pullOutFOtc(item.item)">调出</a>
                <a
                  text
                  dense
                  @click="editOtcStock(item.item)"
                  style="margin-left: 5px"
                  >修改</a
                >
              </template>

              <template v-slot:recommendDate="item">
                <strong style="color: rgb(249 170 51); margin-right: 5px">{{
                  item.item.recommendDateS
                }}</strong>
                <span
                  :style="
                    getColor(item.item.recommendRate) +
                    'width:60px;display:inline-block;'
                  "
                  >{{ item.item.recommendRateP }}</span
                >
                <template v-if="item.item.recommendDate">
                  <a
                    text
                    dense
                    style="margin-right: 5px; margin-left: 5px"
                    @click="canclRecommend(item.item)"
                    >撤销</a
                  >
                </template>
                <a text dense @click="recommend(item.item)">推荐</a>
              </template>
              <template v-slot:popup="item">
                <div>
                  <v-card
                    :elevation="hover ? 6 : 2"
                    width="100%"
                    style="border-radius: 5px"
                  >
                    <v-card-title
                      >{{ item.item.stockCode }} |
                      {{ item.item.stockName }}</v-card-title
                    >
                    <v-card-text>
                      <table>
                        <thead>
                          <tr>
                            <th style="width: 80px" align="left">PE</th>
                            <th style="width: 80px" align="left">PE(20)</th>
                            <th style="width: 80px" align="left">PE(21)</th>
                            <th style="width: 80px" align="left">PE(22)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td align="left">{{ item.item.pe }}</td>
                            <td align="left">{{ item.item.estpe_FY1 }}</td>
                            <td align="left">{{ item.item.estpe_FY2 }}</td>
                            <td align="left">{{ item.item.estpe_FY3 }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <p>理由：{{ item.item.reason }}</p>
                    </v-card-text>
                  </v-card>
                </div>
              </template>
            </data-table>
          </v-card-text>
          <v-card-actions>
            <v-btn
              outlined
              small
              color="primary"
              elevation="2"
              @click="addNewStockToOtc"
              v-show="otcOrTurnOut"
              v-if="isPermissible('otc')"
            >
              调入新股票
            </v-btn>
            <v-spacer></v-spacer>
            <span style="margin-right: 8px; color: rgba(0, 0, 0, 0.87)"
              >共 {{ otcTotalItems }}</span
            >
          </v-card-actions>
        </v-card>
      </template>
    </v-hover>
    <!-- OTC池调出记录 start -->
    <v-hover v-show="!otcOrTurnOut">
      <template v-slot="{ hover }">
        <v-card
          :elevation="hover ? 6 : 2"
          style="border-radius: 5px; margin-top: 16px"
        >
          <v-card-title>
            OTC调出记录
            <v-btn
              text
              small
              dense
              color="secondary"
              style="margin-bottom: -5px"
              @click="switchOTCorHis"
            >
              <v-icon small>sync_alt</v-icon>
              OTC池
            </v-btn>
            <v-spacer></v-spacer>
            <div style="width: 180px; margin-right: 5px">
              <v-text-field
                v-model="filterKeyOTCOptHis"
                single-line
                label="股票关键字"
                @change="getOtcOptHis(true)"
                clearable
              ></v-text-field>
            </div>
            <div>
              <v-btn
                fab
                dark
                x-small
                elevation="2"
                outlined
                color="primary"
                @click="getOtcOptHis(true)"
              >
                <v-icon dark>search</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="otcHisHeaders"
              :items="otcHisItems"
              :loading="otcHisLoading"
              dense
              :options.sync="otcHisOption"
              :server-items-length="otcHisTotalItems"
              :footer-props="{
                itemsPerPageOptions: [20],
                showFirstLastPage: true,
              }"
            >
              <template v-slot:item.rate="{ item }">
                <span :style="getColor(item.rate)">{{ item.rateP }}</span>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </template>
    </v-hover>
    <!-- OTC池调出记录 end -->

    <v-row>
      <v-col cols="6">
        <v-hover>
          <template v-slot="{ hover }">
            <v-card :elevation="hover ? 6 : 2" style="border-radius: 5px">
              <v-card-title> 我的申请 </v-card-title>
              <v-card-text>

                <data-table
                  :columns="myApplyHeader"
                  :data="myApplyItems"
                  :width="'100%'"
                  :height="'300px'"
                  :showPopup="true"
                >
                  <template v-slot:popup="item">
                    <div>
                      <v-card
                        :elevation="hover ? 6 : 2"
                        width="100%"
                        style="border-radius: 5px"
                      >
                        <v-card-title
                          >{{ item.item.stockCode }} |
                          {{ item.item.stockName }}</v-card-title
                        >
                        <v-card-text>
                          <p>理由：{{ item.item.reason }}</p>
                        </v-card-text>
                      </v-card>
                    </div>
                  </template>
                  <template v-slot:action="item">
                    <template v-if="item.item.checkRes == '1'"> 审核通过 </template>
                    <template v-else-if="item.item.checkRes == '2'">
                      被拒绝
                    </template>
                    <template v-else>
                      <a @click="canclApply(item.item)">撤销申请</a>
                    </template>
                  </template>
                </data-table>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
      <v-col cols="6" style="padding-left: 0px">
        <v-hover v-if="isPermissible('审核人')">
          <template v-slot="{ hover }">
            <v-card :elevation="hover ? 6 : 2" style="border-radius: 5px">
              <v-card-title>
                待审批
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
              </v-card-title>
              <v-card-text>
                <data-table
                  :columns="authHeader"
                  :data="authItems"
                  :width="'100%'"
                  :height="'300px'"
                  :showPopup="true"
                >
                  <template v-slot:popup="item">
                    <div>
                      <v-card
                        :elevation="hover ? 6 : 2"
                        width="100%"
                        style="border-radius: 5px"
                      >
                        <v-card-title
                          >{{ item.item.stockCode }} |
                          {{ item.item.stockName }}</v-card-title
                        >
                        <v-card-text>
                          <p>理由：{{ item.item.reason }}</p>
                        </v-card-text>
                      </v-card>
                    </div>
                  </template>
                  <template v-slot:action="item">
                    <a @click="showApplyDetail(item.item)">审批</a>
                  </template>
                </data-table>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
    <v-dialog v-model="addNewStockBool" width="300px">
      <v-card>
        <v-card-title
          style="font-size: 1.05em"
          v-html="editTitle"
        ></v-card-title>
        <v-card-text>
          <v-container>
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
              :rules="newStkRule"
              ref="newStkField"
              label="股票"
              clearable
              placeholder="输入股票名字或代码"
              v-show="eidtStatus !== 'eidtCore'"
              return-object
            >
            </v-autocomplete>

            <v-text-field
              v-show="eidtStatus === 'eidtCore'"
              v-model="newStockQuance"
              label="序号"
              clearable
            ></v-text-field>

            <v-autocomplete
              v-model="depot"
              dense
              small-chips
              :items="depotList"
              label="设置关注人"
              return-object
              item-text="depotName"
              item-value="depot"
            ></v-autocomplete>

            <v-autocomplete
              v-model="newStockLevel"
              dense
              small-chips
              :items="stockLevelList"
              label="设置评级"
              return-object
              item-text="levelName"
              item-value="levelValue"
            ></v-autocomplete>

            <v-autocomplete
              v-model="newStockIndus"
              dense
              small-chipes
              :items="industryList"
              label="设置行业"
              item-text="industry"
              item-value="id"
              return-object
            ></v-autocomplete>
            <v-autocomplete
              v-model="newStockRace"
              dense
              small-chips
              :items="raceList"
              label="设置赛道/标签"
              item-text="raceName"
              item-value="id"
              return-object
              multiple
              chips
            ></v-autocomplete>
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
                  v-model="intoDate"
                  label="调入日期"
                  prepend-icon="event"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="intoDate"
                @input="menuForDatePicker = false"
              ></v-date-picker>
            </v-menu>
            <!-- <v-combobox
              dense
              small-chips
              v-model="newResponseUser"
              :items="userList"
              item-text="fullName"
              item-value="userId"
              label="负责人"
            ></v-combobox> -->
            <!-- <v-switch v-model="keepLogin" :label="`把负责人设置为打分人`" dense small></v-switch> -->
            <!-- :readonly="eidtStatus === 'eidtCore'" -->
            <v-textarea
              outlined
              label="调入原因"
              counter
              v-model="newStock.reason"
            ></v-textarea>
          </v-container>
        </v-card-text>
        <v-card-actions style="margin-top: -42px">
          <v-spacer></v-spacer>
          <v-btn text small @click="canclCoreEdit">取消</v-btn>
          <v-btn
            small
            dense
            outlined
            color="primary"
            elevation="2"
            v-show="eidtStatus !== 'eidtCore'"
            @click="saveAdded"
            style="margin-right: 24px"
          >
            <v-icon left dense small>done</v-icon>申请调入
          </v-btn>

          <v-btn
            small
            dense
            outlined
            color="primary"
            elevation="2"
            v-show="eidtStatus === 'eidtCore'"
            @click="updStock"
            style="margin-right: 24px"
          >
            <v-icon left dense small>done</v-icon>确定修改
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 调入OTC start -->
    <v-dialog v-model="addNewOtcBool" width="300px">
      <v-card>
        <v-card-title
          style="font-size: 1.05em"
          v-html="editTitle"
        ></v-card-title>
        <v-card-text>
          <v-container>
            <v-autocomplete
              dense
              v-show="otcEidtStatus !== false"
              v-model="newOtcStock.stock"
              :items="stockList"
              :loading="addLoading"
              :search-input.sync="search"
              cache-items
              hide-no-data
              hide-selected
              item-text="showName"
              item-value="stockCode"
              label="股票"
              :rules="newStkOTCRule"
              ref="newStkOTCField"
              clearable
              placeholder="输入股票名字或代码"
              return-object
            >
            </v-autocomplete>

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
                  v-model="newOtcStock.date"
                  label="调入日期"
                  prepend-icon="event"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="newOtcStock.date"
                @input="menuForDatePicker = false"
              ></v-date-picker>
            </v-menu>

            <v-textarea
              outlined
              label="调入原因"
              counter
              v-model="newOtcStock.reason"
            ></v-textarea>
          </v-container>
        </v-card-text>
        <v-card-actions style="margin-top: -42px">
          <v-spacer></v-spacer>
          <v-btn text small @click="canclOTcEdit">取消</v-btn>
          <v-btn
            small
            dense
            outlined
            color="primary"
            elevation="2"
            v-show="otcEidtStatus === true"
            @click="saveOtcAdd"
            style="margin-right: 24px"
          >
            <v-icon left dense small>done</v-icon>调入
          </v-btn>
          <v-btn
            small
            dense
            outlined
            color="primary"
            elevation="2"
            v-show="otcEidtStatus === false"
            @click="saveOtcUpded"
            style="margin-right: 24px"
          >
            <v-icon left dense small>done</v-icon>确定修改
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 调入OTC start -->

    <v-dialog v-model="authDialog" width="300px">
      <v-card>
        <v-card-title style="font-size: 1.05em">{{ editTitle }}</v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              v-model="authInstance.createUser"
              label="申请人"
              readonly
            ></v-text-field>
            <v-text-field
              v-model="authInstance.stockName"
              label="申请股票"
              readonly
            ></v-text-field>
            <v-textarea
              label="调入原因"
              counter
              v-model="authInstance.reason"
              readonly
            ></v-textarea>
          </v-container>
        </v-card-text>
        <v-card-actions style="margin-top: -42px">
          <v-spacer></v-spacer>
          <v-btn small dense color="primary" @click="refuseApply">
            <v-icon left dense small>close</v-icon>拒绝
          </v-btn>
          <v-btn
            small
            dense
            color="secondary"
            @click="passApply"
            style="margin-right: 24px"
          >
            <v-icon left dense small>done</v-icon>通过
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="volatilityDialog" width="600px">
      <v-card>
        <v-card-title style="font-size: 1.05em">{{
          volatilityTitle
        }}</v-card-title>
        <v-card-text>
          <v-container>
            <div style="width: 100%; height: 300px" id="lineContainer"></div>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- 修改调出池item dialog start -->
    <v-dialog v-model="editOutedDialog" width="300px">
      <v-card>
        <v-card-title style="font-size: 1.05em"> 修改日期 </v-card-title>
        <v-card-text>
          <v-container>
            <v-menu
              v-model="menuForDatePicker2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="editedOutedItem.outDate"
                  label="调入日期"
                  prepend-icon="event"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="editedOutedItem.outDate"
                @input="menuForDatePicker2 = false"
                @change="saveEditOutedItem"
              ></v-date-picker>
            </v-menu>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- 修改调出池item dialog end -->
  </v-container>
</template>

<script>
import "echarts/lib/chart/radar"; // 引入雷达图
import "echarts/lib/chart/lines"; // 引入折线图
import dataInterface from "../data/stockPoolsData";
import commonDataInterface from "../data/commonData";
import session from "../util/SessionStorage";
import authority from "../util/Authority";
import DataTable from "./DataTable.vue";
import moment from "moment";
// import moment from "moment";

export default {
  name: "StockPools",
  components: { DataTable },
  data: () => ({
    uploadFile: {},
    uploadLoading: false,
    coreOrTurnOut: true,
    tab1: null,
    coreHeader: [
      // {
      //   text: "序号",
      //   value: "stockNum",
      //   width: "60px",
      //   align: "start",
      //   fixed: true,
      // },
      {
        text: "股票代码",
        value: "stockCode",
        width: "95px",
        fixed: true,
        sortable: false,
      },
      { text: "股票名称", value: "stockName", width: "95px", sortable: false },
      {
      text: "去打分",
        value: "goRating",
        width: "50px",
        fixed: true,
        sortable: false,
      },
      { text: "分级", value: "stockLevelText", width: "60px", sortable: false },
      { text: "行业", value: "industry", width: "100px" },
      {
        text: "赛道/标签",
        value: "raceGroup",
        width: "165px",
        sortable: false,
      },
      {
        text: "基本面",
        value: "score_hq",
        width: "64px",
        align: "end",
        sortable: true,
      },
      {
        text: "催化剂",
        value: "score_chj",
        width: "64px",
        align: "end",
        sortable: true,
      },
      {
        text: "技术面",
        value: "score_jy",
        width: "64px",
        align: "end",
        sortable: true,
      },
      { text: "市值(亿元)", value: "ev", width: "94px", align: "end" },
      { text: "流通(亿元)", value: "mkt_cap_float", width: "94px", align: "end" },
      {
        text: "收盘价",
        value: "close_price",
        width: "94px",
        align: "end",
      },
      { text: "当日涨幅", value: "day_chg", width: "80px", align: "end" },
      { text: "量比", value: "vol_ratio", width: "64px", align: "end" },
      { text: "波动率", value: "stdevr", width: "70px", align: "end" },
      { text: "5日涨幅", value: "five_chg", width: "74px", align: "end" },
      {
        text: "30日涨幅",
        value: "month_chg",
        width: "85px",
        align: "end",
      },
      {
        text: "90日涨幅",
        value: "ninety_chg",
        width: "84px",
        align: "end",
      },
      {
        text: "入池涨幅",
        value: "IPrate",
        width: "85px",
        align: "end",
      },
      { text: "PE", value: "pe", width: "80px", align: "end" },
      { text: "PB", value: "pb", width: "80px", align: "end" },
      {
        text: "入池日期",
        value: "transferDate",
        width: "100px",
        align: "end",
      },

      {
        text: "修正",
        value: "action",
        width: "110px",
        align: "end",
        sortable: false,
      },
    ],
    coreItemsForSearch: [],
    coreItems: [],
    otcHeader: [
      { text: "股票代码", value: "stockCode", width: "95px", sortable: false },
      { text: "股票名称", value: "stockName", width: "95px", sortable: false },
      {
        text: "入池日期",
        value: "transferDate",
        width: "100px",
        align: "start",
      },
      {
        text: "日期 / 涨幅 / 推荐",
        value: "recommendDate",
        width: "170px",
        align: "end",
        sortable: false,
      },
      { text: "市值(亿元)", value: "ev", width: "94px", align: "end" },
      { text: "流通(亿元)", value: "mkt_cap_float", width: "94px", align: "end" },
      {
        text: "收盘价",
        value: "close_price",
        width: "94px",
        align: "end",
      },
      { text: "当日涨跌幅", value: "day_chg", width: "90px", align: "end" },
      { text: "量比", value: "vol_ratio", width: "75px", align: "end" },
      { text: "波动率", value: "stdevr", width: "70px", align: "end" },

      { text: "5日涨幅", value: "five_chg", width: "85px", align: "end" },
      {
        text: "30日涨幅",
        value: "month_chg",
        width: "85px",
        align: "end",
      },
      {
        text: "90日涨幅",
        value: "ninety_chg",
        width: "84px",
        align: "end",
      },
      {
        text: "入池涨幅",
        value: "IPrate",
        width: "85px",
        align: "end",
      },
      { text: "PE", value: "pe", width: "80px", align: "end" },
      { text: "PB", value: "pb", width: "80px", align: "end" },
      { text: "操作", value: "action", width: "115px", sortable: false },
    ],
    otcItemsForSearch: [],
    otcItems: [],
    industryFilterForOuted: null,
    marketTypeForOuted: null,
    outedHeader: [
      { text: "股票代码", value: "stockCode", width: "95px" },
      { text: "股票名称", value: "name", width: "95px" },
      { text: "行业", value: "industry", width: "95px" },
      { text: "调入日期", value: "transferDate", width: "95px" },
      { text: "调出日期", value: "outDate", width: "95px" },
      { text: "涨跌幅", value: "rate", width: "95px" },
      { text: "操作", value: "action", align: "center", width: "115px" },
    ],
    outedItems: [],
    outedLoading: false,
    outedTotalItems: 0,
    outedOptions: {
      itemsPerPage: 20,
    },
    raceList: [],
    raceListForSearch: [],
    selectedRace: [],
    filterKeyCore: "",
    filterKeyOtc: "",
    editTitle: "",
    addedStock: "",
    stockList: [],
    addLoading: false,
    search: null,
    addNewStockBool: false,
    newStock: {
      stockCode: "",
      reason: "",
    },
    newStockField: {},
    myApplyHeader: [
      { text: "股票代码", value: "stockCode" },
      { text: "股票名称", value: "stockName" },
      { text: "申请时间", value: "transferDate" },
      { text: "方向", value: "direction" },
      // { text: "申请理由", value: "reason" },
      { text: "状态", value: "action" },
    ],
    myApplyItems: [],
    authHeader: [
      { text: "股票代码", value: "stockCode" },
      { text: "股票名称", value: "stockName" },
      { text: "申请日期", value: "transferDate" },
      { text: "方向", value: "direction" },
      { text: "申请理由", value: "reason" },
      { text: "申请人", value: "createUser" },
      { text: "操作", value: "action" },
    ],
    authItems: [],
    authInstance: {},
    authDialog: false,
    coreOrOtc: true, // 此次申请属于core还是OTC
    filterKeyRace: "",
    coreOptions: {
      itemsPerPage: 50,
      sortBy: "isChange",
      sortDesc: true,
    },
    coreTotalItems: 0,
    coreTableLoading: false,
    otcTableLoading: false,
    otcOptions: {
      itemsPerPage: 30,
      sortBy: "stdevr",
      sortDesc: true,
    },
    otcTotalItems: 0,
    newStockRace: [],
    newStockIndus: "",
    industryList: [],
    menuForDatePicker: false,
    menuForDatePicker2: false,
    intoDate: "",
    newResponseUser: "",
    userList: [],
    depot: "",
    depotFilterForCore: "",
    depotList: [
      { depot: "99", depotName: "NO.0" },
      { depot: "1", depotName: "NO.1" },
      { depot: "2", depotName: "NO.2" },
      { depot: "3", depotName: "NO.3" },
      { depot: "4", depotName: "NO.4" },
      { depot: "5", depotName: "NO.5" },
      { depot: "6", depotName: "NO.6" },
      { depot: "7", depotName: "NO.7" },
      { depot: "8", depotName: "NO.8" },
    ],
    depotMap: {
      99: "NO.0",
      1: "NO.1",
      2: "NO.2",
      3: "NO.3",
      4: "NO.4",
      5: "NO.5",
      6: "NO.6",
      7: "NO.7",
      8: "NO.8",
    },
    coreSortBy: "ev",
    coreSortDesc: false,
    eidtStatus: "eidtCore",
    udpateStock: {},
    volatilityDialog: false,
    volatilityTitle: "",
    raceFilterForCore: null,
    industryFilterForCore: null,
    raceFilterForOTC: null,
    industryFilterForOTC: null,
    marketTypeForCore: "全市场",
    marketTypeForOTC: "全市场",
    marketTypeList: [
      "全市场",
      "A股市场", // sz,sh
      "A股主板", // sh
      "A股中小板",
      "A股科创板", // sh,688开头
      "A股创业板", // sz,300开头
      "HK", // hk
      "US", //
    ],
    editOutedDialog: false,
    editedOutedItem: {},
    newStockQuance: null,
    newStockLevel: {
      levelName:"二级",
      levelValue:"4"
    }, // 新股票的分级
    stockLevelMap: {
      1: "核心",
      // 2: "备选",
      3: "一级",
      4: "二级",
      5: "三级",
    },
    stockLevelList: [
      { levelName: "核心", levelValue: "1" },
      // { levelName: "备选", levelValue: "2" },
      { levelName: "一级", levelValue: "3" },
      { levelName: "二级", levelValue: "4" },
      { levelName: "三级", levelValue: "5" },
    ],
    stockLevelForCore: null,
    addNewOtcBool: false,
    newOtcStock: {
      stock: null,
      intoDate: null,
      reason: null,
    },
    otcEidtStatus: false,
    pollingWorker: null,
    newStkRule: [(value) => !!value || "Required."],
    newStkOTCRule: [(value) => !!value || "Required."],
    otcOrTurnOut: true,
    otcHisHeaders: [
      { text: "股票代码", value: "stockCode" },
      { text: "股票名称", value: "name" },
      { text: "调入日期", value: "createDate" },
      { text: "调出日期", value: "outDate" },
      { text: "推荐日期", value: "lastRecommentDate" },
      { text: "涨跌幅", value: "rate", width: "95px" },
      { text: "初始调入理由", value: "reason" },
    ],
    otcHisItems: [],
    otcHisLoading: false,
    otcHisOption: {
      itemsPerPage: 20,
    },
    otcHisTotalItems: 0,
    filterKeyOTCOptHis: "",
    currentInfoStkList: [], //当前需要实时更新股票价格信息的股票列表
    today: '',
  }),
  mounted() {
    this.today = moment().format("YYYY-MM-DD");
    this.intoDate = this.today;
    this.getCoreStocks();
    this.getRaceList();
    this.getOtcStocks();
    this.getApplyList();
    this.getAuthList();
    this.getIndustryList();
    this.getUserList();
    this.getOutedStocks();
    this.getOtcOptHis();
  },
  methods: {
    // 检查股票是否存在于pool中
    checkStkInPool(stockCode, type) {
      var _self = this;
      dataInterface
        .checkStkInPool({
          stockType: type,
          stockCode: stockCode,
        })
        .then((e) => {
          if (e.count > 0) {
            if (type === "") {
              _self.newStkRule = ["股票池中已经存在相同股票。"];
            } else {
              _self.newStkOTCRule = ["股票池中已经存在相同股票。"];
            }
          } else {
            if (type === "") {
              _self.newStkRule = [true];
            } else {
              _self.newStkOTCRule = [true];
            }
          }
        });
    },
    initWorker() {
      var _self = this;
      if (this.pollingWorker) {
        this.pollingWorker.terminate();
      }
      this.pollingWorker = this.createWorker(function () {
        setInterval(function () {
          self.postMessage("");
        }, 3000);
      });

      this.pollingWorker.onmessage = function () {
        var stockList = session.getSessionStorage("currentInfoStkList");
        _self.fetchCurrentInfo(stockList);
      };
    },
    createWorker(f) {
      var blob = new Blob(["(" + f.toString() + ")()"]);
      var url = window.URL.createObjectURL(blob);
      var worker = new Worker(url);
      return worker;
    },
    scrollFunction(e) {
      console.log(e);
    },
    // 获取股票当前信息。价格、市值等。
    fetchCurrentInfo(param) {
      var _self = this;
      dataInterface.fetchCurrentInfo(param).then((data) => {
        let dataGroup = data.split(";");
        let stockInfoMap = {};
        dataGroup.forEach((e) => {
          let index = e.indexOf('="');
          let dataStr = e.slice(index, e.length - 1);
          let dataDetail = dataStr.split("~").filter((e) => e != "");
          let startIndex = e.lastIndexOf("_") + 1;
          let stockCode = e.slice(startIndex, index);

          stockInfoMap[stockCode] = {
            price: dataDetail[3],
            // mValue: dataDetail[8],
            rise: dataDetail[4],
            risePercent: dataDetail[5],
            stockCode: stockCode,
          };
        });
        _self.coreItems.forEach((e) => {
          let index = e.stockCode.indexOf(".");
          let key = "";
          if (index + 2 === e.stockCode.length) {
            let code = e.stockCode.slice(0, index);
            key = "us" + code;
          } else {
            let code = e.stockCode.slice(0, index);
            let type = e.stockCode
              .slice(index + 1, e.stockCode.length)
              .toLowerCase();
            if (type == "hk") {
              key = type + "0" + code;
            } else {
              key = type + code;
            }
          }
          if (stockInfoMap[key]) {
            e.close_price = stockInfoMap[key].price;
            // e.ev = parseFloat(stockInfoMap[key].mValue).toFixed(2);
          }
        });
      });
    },
    // 调入到核心池
    addNewStockToCore() {
      this.editTitle = "调入股票到核心池";
      this.eidtStatus = "addNew";
      this.newStockQuance = null;
      this.depot = null;
      this.newStockIndus = null;
      this.intoDate = this.today;
      this.newResponseUser = null;
      this.addNewStockBool = true;
      this.coreOrOtc = true;
    },
    // 修改核心池股票
    editCoreStock(item) {
      this.eidtStatus = "eidtCore";
      this.editTitle =
        "修改:<strong style='color:rgb(249 170 51)'>" +
        item.stockCode +
        "|" +
        item.stockName +
        "</strong>";
      this.newStockField = {
        stockCode: item.stockCode,
        stockName: item.stockName,
      };
      if (item.depot !== null && item.depot !== "") {
        this.depot = {
          depot: item.depot,
          depotName: this.depotMap[item.depot],
        };
      } else {
        this.depot = null;
      }
      let raceIds = item.raceIds ? item.raceIds.split(",") : "";
      let stockRace = [];
      for (let i = 0; i < raceIds.length; i++) {
        stockRace.push({
          id: raceIds[i],
          raceName: item.raceGroup[i],
        });
      }

      this.newStockRace = stockRace;

      this.newStockIndus = {
        id: item.industryId,
        industry: item.industry,
      };
      this.intoDate = item.transferDate;
      if (item.responseUser) {
        this.newResponseUser = {
          userId: item.responseUser,
          fullName: item.responseUserName,
        };
      }
      this.newStockLevel = {
        levelName: this.stockLevelMap[item.stockLevel],
        levelValue: item.stockLevel,
      };
      this.newStock.reason = item.reason;
      this.newStockQuance = item.stockNum;
      this.addNewStockBool = true;
      this.coreOrOtc = true;
      this.udpateStock["id"] = item.id;
      this.udpateStock["transferId"] = item.transferId;
      this.udpateStock["stockCode"] = item.stockCode;
    },
    // 保存修改
    updStock() {
      // 整理参数
      this.udpateStock.reason = this.newStock.reason;
      this.udpateStock.responseUser = this.newResponseUser
        ? this.newResponseUser.userId
        : "";
      this.udpateStock.depot = this.depot ? this.depot.depot : "";
      this.udpateStock.raceList = [];
      this.newStockRace.forEach((e) => {
        this.udpateStock.raceList.push(e.id);
      });
      this.udpateStock.industryId = this.newStockIndus.id;
      this.udpateStock.transferDate = this.intoDate;
      this.udpateStock.stockLevel = this.newStockLevel
        ? this.newStockLevel.levelValue
        : "";
      this.udpateStock.stockNum = this.newStockQuance;
      // 发送请求
      var _self = this;
      dataInterface.updStock(this.udpateStock).then(() => {
        _self.getCoreStocks();
        _self.addNewStockBool = false;
      });
    },
    // 调入到OTC池
    addNewStockToOtc() {
      this.editTitle = "调入股票到OTC池";
      this.otcEidtStatus = true;
      this.addNewOtcBool = true;
      this.coreOrOtc = false;
    },
    // 修改OTC股票
    editOtcStock(item) {
      this.editTitle =
        "修改:<strong style='color:rgb(249 170 51)'>" +
        item.stockCode +
        " | " +
        item.stockName +
        "</strong>";
      this.newOtcStock.stock = {
        // stockName: item.stockName,
        stockCode: item.stockCode,
        showName: item.stockName,
      };
      this.newOtcStock.date = item.transferDate;
      this.newOtcStock.reason = item.reason;
      this.otcEidtStatus = false;
      this.addNewOtcBool = true;
      this.coreOrOtc = false;
    },
    // 获取所有标签
    getRaceList() {
      var _self = this;
      commonDataInterface.getRaceList({}).then((res) => {
        res.forEach((e) => {
          e.selected = false;
          e.raceName = e.raceName + "(" + e.pinyin + ")";
        });
        _self.raceList = res;
        _self.raceListForSearch = res;
      });
    },
    clickRace(race, index) {
      if (race.selected) {
        this.raceList[index].selected = false;
        this.selectedRace.splice(this.selectedRace.indexOf(race), 1);
      } else {
        this.raceList[index].selected = true;
        this.selectedRace.push(race);
      }
      this.getCoreStocks(true);
      this.getOtcStocks(true);
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
    // 下拉加载更多核心库股票数据
    loadMoreCoreStocks() {
      // page需要加1
      this.coreOptions.page++;
      this.getCoreStocks();
    },
    // 查询核心库股票方法
    getCoreStocks(newSearch) {
      let _self = this;
      this.coreTableLoading = true;
      let industryKey = "";
      let raceKey = "";
      let depot = "";
      if (this.industryFilterForCore) {
        industryKey = this.industryFilterForCore.id;
      }
      if (this.raceFilterForCore) {
        raceKey = this.raceFilterForCore.id;
      }
      if (this.depotFilterForCore) {
        depot = this.depotFilterForCore;
      }
      let stockLevelForCore = this.stockLevelForCore;
      if (newSearch) {
        this.coreOptions.page = 1;
        this.currentInfoStkList = [];
      }
      let ifDesc = this.coreOptions.sortDesc ? "1" : "0";
      commonDataInterface
        .getStocksByKey({
          key: this.filterKeyCore,
          allStock: "0",
          industryKey: industryKey,
          raceKey: raceKey,
          depotKey: depot,
          stockLevelKey: stockLevelForCore,
          pageNo: this.coreOptions.page,
          pageSize: this.coreOptions.itemsPerPage,
          orderByKey: this.coreOptions.sortBy,
          marketKey: this.marketTypeForCore,
          ifDesc: ifDesc,
        })
        .then((res) => {
          res.list.forEach((e) => {
            _self.currentInfoStkList.push(e.stockCode);
            if (e.stockNum) {
              if (e.stockNum >= 10 && e.stockNum < 100) {
                e.stockNum = "0" + e.stockNum;
              } else if (e.stockNum < 10) {
                e.stockNum = "00" + e.stockNum;
              }
            }
            if (e.raceName) {
              e.raceGroup = e.raceName.split(",");
            } else {
              e.raceGroup = [];
            }
            e.day_chgP = e.day_chg ? (e.day_chg * 100).toFixed(2) + "%" : null;
            e.five_chgP = e.five_chg
              ? (e.five_chg * 100).toFixed(2) + "%"
              : null;
            e.month_chgP = e.month_chg
              ? (e.month_chg * 100).toFixed(2) + "%"
              : null;
            e.ninety_chgP = e.ninety_chg
        ? (e.ninety_chg * 100).toFixed(2) + "%"
        : null;
            e.IPrateP = e.IPrate ? (e.IPrate * 100).toFixed(2) + "%" : null;
            e.estpe_FY1 =
              e.estpe_FY1 && e.estpe_FY1 !== '0'
                ? parseFloat(e.estpe_FY1).toFixed(2)
                : '-';
            e.estpe_FY2 =
              e.estpe_FY2 && e.estpe_FY2 !== '0'
                ? parseFloat(e.estpe_FY2).toFixed(2)
                : '-';
            e.estpe_FY3 =
              e.estpe_FY3 && e.estpe_FY3 !== '0'
                ? parseFloat(e.estpe_FY3).toFixed(2)
                : '-';
            e.pe = e.pe && e.pe !== '0' ? parseFloat(e.pe).toFixed(2) : '-';

            e.ev = (e.ev / 100000000).toFixed(2);
            // e.mrg_short_bal = (e.mrg_short_bal / 100000000).toFixed(2) + '亿';
            // e.mrg_long_bal = (e.mrg_long_bal / 100000000).toFixed(2) + '亿';
            e.goodwill = (e.goodwill / 100000000).toFixed(2) + '亿';
            
            e.mkt_cap_float = e.mkt_cap_float && e.mkt_cap_float !== '0' ? (e.mkt_cap_float / 100000000).toFixed(2):'-';
            e.lastTransType = e.lastCheckRes === "2" ? "0" : e.lastTransType;
            e.depotShow = e.depot;
            if (e.depot === "0") {
              e.depotShow = " ";
            } else if (e.depot === "99") {
              e.depotShow = "0";
            }
            if (e.transferDate) {
              let transferDateIndex = e.transferDate.indexOf(" ");
              e.transferDate = e.transferDate.slice(0, transferDateIndex);
            }
            // stockLevelMap
            e.stockLevelText = _self.stockLevelMap[e.stockLevel];
          });
          _self.coreItemsForSearch = JSON.parse(JSON.stringify(res.list));
          _self.coreTotalItems = parseInt(res.countNum);
          if (newSearch) {
            // 如果是全新查询，直接赋值
            _self.coreItems = res.list;
          } else {
            // 如果是滚动查询，需要叠加之前的数据
            _self.coreItems = _self.coreItems.concat(res.list);
            // this.$refs.coreStockTable.scrollBy(200, 0); // 方法2
          }
          _self.coreTableLoading = false;
          session.setSessionStorage(
            "currentInfoStkList",
            _self.currentInfoStkList
          );
          _self.initWorker(_self.coreItems);
        });
    },
    getOutedStocks(newSearch) {
      let _self = this;
      this.outedLoading = true;
      let industryKey = "";
      if (this.industryFilterForOuted) {
        industryKey = this.industryFilterForOuted.id;
      }
      if (newSearch) {
        this.outedOptions.page = 1;
      }
      let orderByKey = "";
      if (this.outedOptions.sortBy && this.outedOptions.sortBy.length > 0) {
        orderByKey = this.outedOptions.sortBy[0];
      }
      let ifDesc = "";
      if (this.outedOptions.sortDesc && this.outedOptions.sortDesc.length > 0) {
        ifDesc = this.outedOptions.sortDesc[0] ? "1" : "0";
      }
      dataInterface
        .getOutStockList({
          key: this.filterKeyCore,
          allStock: "0",
          industryKey: industryKey,
          pageNo: this.outedOptions.page,
          pageSize: 20,
          orderByKey: orderByKey,
          marketKey: this.marketTypeForOuted,
          ifDesc: ifDesc,
        })
        .then((res) => {
          res.list.forEach((e) => {
            if (e.transferDate) {
              let transferDateIndex = e.transferDate.indexOf(" ");
              e.transferDate = e.transferDate.slice(0, transferDateIndex);
            }
            if (e.outDate) {
              let outDateIndex = e.outDate.indexOf(" ");
              e.outDate = e.outDate.slice(0, outDateIndex);
            }
            e.rateP = e.rate ? (e.rate * 100).toFixed(2) + "%" : null;
          });
          _self.outedTotalItems = parseInt(res.countNum);
          _self.outedItems = res.list;
          _self.outedLoading = false;
        });
    },
    loadMoreOtcStocks() {
      this.otcOptions.page++;
      this.getOtcStocks();
    },
    getOtcStocks(newSearch) {
      let _self = this;
      this.otcTableLoading = true;

      let industryKey = "";
      let raceKey = "";
      if (this.industryFilterForOTC) {
        industryKey = this.industryFilterForOTC.id;
      }
      if (this.raceFilterForOTC) {
        raceKey = this.raceFilterForOTC.id;
      }

      if (newSearch) {
        this.otcOptions.page = 1;
      }
      let ifDesc = this.otcOptions.sortDesc ? "1" : "0";
      commonDataInterface
        .getStocksByKey({
          key: this.filterKeyOtc,
          industryKey: industryKey,
          raceKey: raceKey,
          allStock: "2",
          marketKey: this.marketTypeForOTC,
          pageNo: this.otcOptions.page,
          pageSize: this.otcOptions.itemsPerPage,
          orderByKey: this.otcOptions.sortBy,
          ifDesc: ifDesc,
        })
        .then((res) => {
          res.list.forEach((e) => {
            if (e.raceName) {
              e.raceGroup = e.raceName.split(",");
            } else {
              e.raceGroup = [];
            }
            e.day_chgP = e.day_chg ? (e.day_chg * 100).toFixed(2) + "%" : null;
            e.five_chgP = e.five_chg
              ? (e.five_chg * 100).toFixed(2) + "%"
              : null;
            e.month_chgP = e.month_chg
              ? (e.month_chg * 100).toFixed(2) + "%"
              : null;
            e.ninety_chgP = e.ninety_chg
        ? (e.ninety_chg * 100).toFixed(2) + "%"
        : null;
            e.ev = (e.ev / 100000000).toFixed(2);
             e.mkt_cap_float = e.mkt_cap_float && e.mkt_cap_float !== '0' ? (e.mkt_cap_float / 100000000).toFixed(2):'-';
            e.IPrateP = e.IPrate ? (e.IPrate * 100).toFixed(2) + "%" : null;
            e.estpe_FY1 =
              e.estpe_FY1 && e.estpe_FY1 !== '0'
                ? parseFloat(e.estpe_FY1).toFixed(2)
                : '-';
            e.estpe_FY2 =
              e.estpe_FY2 && e.estpe_FY2 !== '0'
                ? parseFloat(e.estpe_FY2).toFixed(2)
                : '-';
            e.estpe_FY3 =
              e.estpe_FY3 && e.estpe_FY3 !== '0'
                ? parseFloat(e.estpe_FY3).toFixed(2)
                : '-';
            e.pe = e.pe && e.pe !== '0' ? parseFloat(e.pe).toFixed(2) : '-';
            if (e.recommendDate) {
              if (e.recommendDate === "0000-00-00") {
                e.recommendDate = "";
              } else {
                e.recommendDateS = e.recommendDate.slice(
                  5,
                  e.recommendDate.length
                );
              }
            }

            e.recommendRateP = e.recommendRate
              ? parseFloat(e.recommendRate).toFixed(2) + "%"
              : null;
          });
          _self.otcItemsForSearch = JSON.parse(JSON.stringify(res.list));
          _self.otcTotalItems = parseInt(res.countNum);
          if (newSearch) {
            // 如果是全新查询，直接赋值
            _self.otcItems = res.list;
          } else {
            // 如果是滚动查询，需要叠加之前的数据
            _self.otcItems = _self.otcItems.concat(res.list);
            // this.$refs.otcStockTable.scrollBy(200, 0); // 方法2
          }
          this.otcTableLoading = false;
        });
    },
    // 确认申请调入
    saveAdded() {
      if (
        !this.$refs["newStkField"].validate(true) &&
        this.eidtStatus !== "eidtCore"
      ) {
        this.$refs["newStkField"].focus();
        return;
      }
      this.newStock.stockNum = this.newStockQuance;
      this.newStock.transferType = "0";
      this.newStock.userId = session.getSessionStorage("userid");
      this.newStock.stockCode = this.newStockField.stockCode;
      this.newStock.raceList = [];
      this.newStockRace.forEach((e) => this.newStock.raceList.push(e.id));
      this.newStock.industryId = this.newStockIndus
        ? this.newStockIndus.id
        : "";
      this.newStock.date = this.intoDate;
      this.newStock.responseUser = this.newResponseUser
        ? this.newResponseUser.userId
        : "";
      this.newStock.dr = "0";
      this.newStock.depot = this.depot ? this.depot.depot : "";
      this.newStock.stockLevel = this.newStockLevel
        ? this.newStockLevel.levelValue
        : "";
      // 如果权限为审核人，noCheck 为 1；
      if (authority.isPermissible("审核人")) {
        this.newStock.noCheck = "1";
      } else {
        this.newStock.noCheck = "";
      }
      let _self = this;
      dataInterface.optCorePool(this.newStock).then((res) => {
        if (res.code === "0") {
          _self.addNewStockBool = false;
          _self.getApplyList();
          _self.getAuthList();
          _self.depot = "";
          this.clearAddForm();
        }
      });
    },
    // OTC推荐
    recommend(item) {
      item.recommendVal = 1;
      item.raceList = item.raceIds ? item.raceIds.split(",") : [];
      item.date = item.transferDate;
      item.createUser = this.userId;
      item.recommendDate = new Date();
      let _self = this;
      // optOtcPool
      dataInterface.saveUpdOTCRecommend(item).then((res) => {
        if (res.code === "0") {
          _self.getOtcStocks(true);
        }
      });
    },
    canclRecommend(item) {
      // item.recommendVal = -1;
      item.raceList = item.raceIds ? item.raceIds.split(",") : [];
      // item.date = item.transferDate;
      item.id = item.recommendId;
      item.isCancel = 1;
      let _self = this;
      dataInterface.saveUpdOTCRecommend(item).then((res) => {
        if (res.code === "0") {
          _self.getOtcStocks(true);
        }
      });
    },

    // 清空调入form
    clearAddForm() {
      this.newStockField = null;
      this.newStockRace = [];
      this.newStockIndus = "";
      this.intoDate = this.today;
      this.newResponseUser = null;
      this.depot = "";
      this.newStock.reason = null;
      this.newStock.transferId = null;
    },
    goToStockDetail(stock) {
      this.$router.push({
        name: "stockDetail",
        params: {
          stockCode: stock.stockCode,
          stockName: stock.stockName,
          day_chg: stock.day_chg,
          industry: stock.industry,
          five_chg: stock.five_chg,
          month_chg: stock.month_chg,
          vol_ratio: stock.vol_ratio,
          amt: stock.amt,
          ev: stock.ev,
          pe: stock.pe,
          pb: stock.pb,
        },
      });
    },
    // 获取申请列表
    getApplyList() {
      var _self = this;
      dataInterface
        .authPoolList({
          userId: session.getSessionStorage("userid"),
        })
        .then((res) => {
          res.list.forEach((e) => {
            if (e.transferDate) {
              e.transferDate = e.transferDate.slice(
                0,
                e.transferDate.indexOf(" ")
              );
            }
            e.direction = e.transferType === "1" ? "调出股票池" : "调入股票池";
          });
          _self.myApplyItems = res.list;
        });
    },
    // 获取审批列表
    getAuthList() {
      var _self = this;
      dataInterface
        .authPoolList({
          // checkUser: session.getSessionStorage("userid"),
          checkRes: "0",
        })
        .then((res) => {
          res.list.forEach((e) => {
            e.transferDate = e.transferDate.slice(
              0,
              e.transferDate.indexOf(" ")
            );
            e.direction = e.transferType === "1" ? "调出股票池" : "调入股票池";
          });
          _self.authItems = res.list;
        });
    },
    // 撤销申请
    canclApply(item) {
      let _self = this;
      dataInterface
        .optCorePool({ id: item.id, dr: 1, transferType: item.transferType })
        .then((res) => {
          if (res.code === "0") {
            _self.getApplyList();
          }
        });
    },
    // 查看申请详情
    showApplyDetail(item) {
      this.authInstance = item;
      this.authDialog = true;
    },
    // 拒绝申请
    refuseApply() {
      let _self = this;
      dataInterface
        .authOptCore({
          transferId: this.authInstance.id,
          checkRes: "2",
          userId: session.getSessionStorage("userid"),
        })
        .then((res) => {
          if (res.code === "0") {
            _self.authDialog = false;
            _self.getCoreStocks();
            _self.getAuthList();
            _self.getApplyList();
          }
        });
    },
    // 通过申请
    passApply() {
      let _self = this;
      dataInterface
        .authOptCore({
          transferId: this.authInstance.id,
          checkRes: "1",
          userId: session.getSessionStorage("userid"),
        })
        .then((res) => {
          if (res.code === "0") {
            _self.authDialog = false;
            _self.getAuthList();
            _self.getCoreStocks();
            // _self.getOtcStocks();
            _self.getApplyList();
          }
        });
    },
    // 权限校验
    isPermissible(roleName) {
      return authority.isPermissible(roleName);
    },
    // 申请移出核心池
    pullOutFCore(item) {
      var r = confirm(
        "确定申请调出  " + item.stockName + "|" + item.stockCode + "  吗？"
      );
      if (r == false) {
        return;
      }
      this.newStock.transferType = "1";
      this.newStock.userId = session.getSessionStorage("userid");
      this.newStock.stockCode = item.stockCode;
      this.newStock.date = item.transferDate;
      this.newStock.transferId = item.transferId;
      this.newStock.reason = item.reason;
      // 如果权限为审核人，noCheck 为 1；
      if (authority.isPermissible("审核人")) {
        this.newStock.noCheck = "1";
      } else {
        this.newStock.noCheck = "";
      }
      let _self = this;
      dataInterface.optCorePool(this.newStock).then((res) => {
        if (res.code === "0") {
          _self.clearAddForm();
          _self.getApplyList();
          _self.getAuthList();
          _self.getCoreStocks(true);
        }
      });
    },
    // 自主移出OTC池
    pullOutFOtc(item) {
      var r = confirm(
        "OTC股票池操作不经过审核，确定要直接调出  " +
          item.stockName +
          "|" +
          item.stockCode +
          "  吗？"
      );
      if (r == true) {
        this.newStock.dr = "1";
        this.newStock.userId = session.getSessionStorage("userid");
        this.newStock.stockCode = item.stockCode;
        this.newStock.id = item.id;
        this.newStock.date = item.transferDate;
        this.newStock.reason = item.reason;
        this.newStock.recommendDate = item.recommendDate;
        let _self = this;
        dataInterface.optOtcPool(this.newStock).then((res) => {
          if (res.code === "0") {
            _self.getOtcStocks();
          }
        });
      }
    },
    // 获取所有行业
    getIndustryList() {
      let _self = this;
      dataInterface.getIndustryList({}).then((res) => {
        res.list.forEach((e) => {
          e.industry = e.industry + "(" + e.pinyin + ")";
        });
        _self.industryList = res.list;
      });
    },
    getUserList() {
      let _self = this;
      commonDataInterface.getUsersByKey({}).then((res) => {
        _self.userList = res.list;
      });
    },
    getColor(val) {
      if (val > 0) {
        return "color:red;";
      } else {
        return "color:green;";
      }
    },
    // 展示otc历史波动率
    showVolatilityHis(item) {
      this.volatilityTitle =
        item.stockName + "  |  " + item.stockCode + "的波动率变化 ";
      this.volatilityDialog = true;
      var _self = this;
      let date = "";
      dataInterface.getOTCBDLHis({ stockCode: item.stockCode }).then((res) => {
        let list = res.list;
        let data = [];
        if (list && list[0]) {
          data.push(list[0]["bdl30"]);
          data.push(list[0]["bdl7"]);
          data.push(list[0]["bdl6"]);
          data.push(list[0]["bdl5"]);
          data.push(list[0]["bdl4"]);
          data.push(list[0]["bdl3"]);
          data.push(list[0]["bdl2"]);
          data.push(list[0]["bdl1"]);
          data.push(list[0]["bdl"]);
          date = list[0].createDate;
        }
        _self.volatilityTitle += date;
        var dom = document.getElementById("lineContainer");
        var myChart = _self.$echarts.init(dom);
        var option = {
          // title: {
          //   text: "多因子得分走势",
          //   left: "center",
          // },
          tooltip: {
            trigger: "axis",
          },
          grid: {
            left: "3%",
            right: "8%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {
                name:
                  item.stockName + " | " + item.stockCode + "波动率变化" + date,
              },
            },
            // right: "50px",
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: [
              "T-30",
              "T-7",
              "T-6",
              "T-5",
              "T-4",
              "T-3",
              "T-2",
              "T-1",
              "当日",
            ],
            name: "日期",
          },
          yAxis: {
            type: "value",
            name: "波动率",
          },
          series: [
            {
              data: data,
              type: "line",
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    postion: "top",
                  },
                },
              },
            },
          ],
        };
        myChart.setOption(option, true);
      });
    },
    // 过滤核心池市场类型股票
    filterMTypeForCore() {
      switch (this.marketTypeForCore) {
        case "A股市场":
          this.coreItems = this.coreItems.filter((e) => {
            e.stockCode.indexOf("SZ") > -1 || e.stockCode.indexOf("SH") > -1;
          });
          break;
        case "A股主板":
          break;
        case "A股科创板":
          this.coreItems = this.coreItems.filter((e) => {
            e.stockCode.indexOf("688") > -1;
          });
          break;
        case "A股创业板":
          this.coreItems = this.coreItems.filter((e) => {
            e.stockCode.indexOf("300") > -1;
          });
          break;
        case "HK":
          this.coreItems = this.coreItems.filter((e) => {
            e.stockCode.indexOf("HK") > -1;
          });
          break;
        case "US":
          break;
        default:
          break;
      }
    },
    // 过滤OTC池市场类型股票
    filterMTypeForOTC() {},
    // 切换到调出池/股票池
    switchToOutedStocks() {
      this.coreOrTurnOut = !this.coreOrTurnOut;
    },
    // 切换OTC池和OTC历史池
    switchOTCorHis() {
      this.otcOrTurnOut = !this.otcOrTurnOut;
    },
    getOtcOptHis(newSearch) {
      let _self = this;
      this.otcHisLoading = true;
      if (newSearch) {
        this.otcHisOption.page = 1;
      }
      let orderByKey = "";
      if (this.otcHisOption.sortBy && this.otcHisOption.sortBy.length > 0) {
        orderByKey = this.otcHisOption.sortBy[0];
      }
      let ifDesc = "";
      if (this.otcHisOption.sortDesc && this.otcHisOption.sortDesc.length > 0) {
        ifDesc = this.otcHisOption.sortDesc[0] ? "1" : "0";
      }
      dataInterface
        .getOtcOutHis({
          key: this.filterKeyOTCOptHis,
          pageNo: this.otcHisOption.page,
          pageSize: 20,
          orderByKey: orderByKey,
          ifDesc: ifDesc,
        })
        .then((res) => {
          res.list.forEach((e) => {
            // if (e.transferDate) {
            //   let transferDateIndex = e.transferDate.indexOf(" ");
            //   e.transferDate = e.transferDate.slice(0, transferDateIndex);
            // }
            // if (e.outDate) {
            //   let outDateIndex = e.outDate.indexOf(" ");
            //   e.outDate = e.outDate.slice(0, outDateIndex);
            // }
            e.rateP = e.rate ? (e.rate * 100).toFixed(2) + "%" : null;
          });
          _self.otcHisTotalItems = parseInt(res.countNum);
          _self.otcHisItems = res.list;
          _self.otcHisLoading = false;
        });
    },
    eidtOutedItem(item) {
      this.editedOutedItem = item;
      this.editOutedDialog = true;
    },
    deleteOutedItem(item) {
      var r = confirm(
        "调出池操作不经过审核，确定要直接删除  " +
          item.name +
          "|" +
          item.stockCode +
          "  吗？"
      );
      if (r == true) {
        item.dr = "1";
        let _self = this;
        dataInterface.updOutedStock(item).then((res) => {
          if (res.code === "0") {
            _self.getOutedStocks();
          }
        });
      }
    },
    // 保存修改内容
    saveEditOutedItem() {
      let _self = this;
      dataInterface.updOutedStock(this.editedOutedItem).then((res) => {
        if (res.code === "0") {
          _self.getOutedStocks();
          _self.editOutedDialog = false;
        }
      });
    },
    //
    donwloadXLSX() {
      // window.location = './file/importStockNum.xlsx';
      window.open("./file/importStockNum.xlsx");
    },
    // 保存OTC申请调入
    saveOtcAdd() {
      if (!this.$refs["newStkOTCField"].validate(true)) {
        this.$refs["newStkOTCField"].focus();
        return;
      }
      let _self = this;
      dataInterface
        .optOtcPool({
          transferType: "0",
          userId: session.getSessionStorage("userid"),
          dr: "0",
          stockCode: this.newOtcStock.stock
            ? this.newOtcStock.stock.stockCode
            : "",
          date: this.newOtcStock.date,
          reason: this.newOtcStock.reason,
        })
        .then((res) => {
          if (res.code === "0") {
            _self.addNewOtcBool = false;
            _self.getOtcStocks();
            _self.newOtcStock = {};
          }
        });
    },
    // 保存OTC修改
    saveOtcUpded() {
      let _self = this;
      dataInterface
        .optOtcPool({
          transferType: "0",
          userId: session.getSessionStorage("userid"),
          dr: "0",
          stockCode: this.newOtcStock.stock
            ? this.newOtcStock.stock.stockCode
            : "",
          date: this.newOtcStock.date,
          reason: this.newOtcStock.reason,
        })
        .then((res) => {
          if (res.code === "0") {
            _self.addNewOtcBool = false;
            _self.getOtcStocks();
            _self.newOtcStock = {};
          }
        });
    },
    // 取消OTC输入。
    canclOTcEdit() {
      this.addNewOtcBool = false;
      this.newOtcStock = {};
    },
    // 取消核心池输入
    canclCoreEdit() {
      this.addNewStockBool = false;
      this.clearAddForm();
    },
    // 去打分
    goRating(item) {
      this.$router.push({
        name: "stockRating",
        params: {
          stockCode: item.stockCode,
        },
      });
    }
  },
  computed: {
    newStkOtcField() {
      return this.newOtcStock.stock;
    },
  },
  watch: {
    search(val) {
      // this.search = val.toString();
      val && val !== this.newStockField && this.getStocksByKey(val);
    },
    // 执行过滤赛道动作
    filterKeyRace(val) {
      if (val) {
        let result = this.raceListForSearch.filter(
          (e) => e.raceName.indexOf(val) > -1
        );
        this.raceList = result;
        if (this.raceList.length === 1) {
          this.clickRace(this.raceList[0], 0);
        }
      } else {
        this.raceListForSearch.forEach((e) => (e.selected = false));
        this.selectedRace = [];
        this.raceList = JSON.parse(JSON.stringify(this.raceListForSearch));
        this.getCoreStocks(true);
        this.getOtcStocks(true);
      }
    },
    outedOptions: {
      handler() {
        this.getOutedStocks();
      },
      deep: true,
    },
    otcHisOption: {
      handler() {
        this.getOtcOptHis();
      },
      deep: true,
    },
    // 上传股票序列文件
    uploadFile(value) {
      this.uploadLoading = true;
      let _self = this;
      // 创建FormData对象
      let param = new FormData();
      // 将得到的文件流添加到FormData对象
      param.append("file", value, value.name);
      dataInterface.loadStockSequence(param).then(() => {
        _self.uploadLoading = false;
        _self.getCoreStocks();
      });
    },
    // 监视新增股票字段，用于显示校验信息
    newStockField(value) {
      if (value) {
        this.checkStkInPool(value.stockCode, "");
      } else {
        this.newStkRule = ["必须填写股票。"];
      }
    },
    // 监视新增OTC股票字段，用于显示校验信息
    newStkOtcField(value) {
      if (value) {
        this.checkStkInPool(value.stockCode, "otc");
      } else {
        this.newStkOTCRule = ["必须填写股票。"];
      }
    },
  },
};
</script>
<style scoped>
.table-footer-prepend {
  margin-top: -54px;
  height: 50px;
  /* margin-left: 22px; */
}
.v-card__title {
  padding-bottom: 0px;
}
</style>
<style>
.v-label {
  font-size: 14px;
}
.v-input {
  font-size: 14px;
}
.v-data-table td,
.v-data-table th {
  padding-left: 0px !important;
  padding-right: 6px !important;
}
</style>