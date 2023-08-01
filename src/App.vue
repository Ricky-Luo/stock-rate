<template>
  <v-app>
    <v-alert
      :type="alertType"
      elevation="10"
      v-model="showAlert"
      dense
      dismissible
      close-icon="mdi-delete"
      style="position: absolute; right: 15px; z-index: 990; top: 15px"
      transition="slide-x-reverse-transition"
      >{{ alertText }}</v-alert
    >
    <v-alert
      elevation="10"
      border="top"
      colored-border
      color="secondary accent-4"
      v-model="showAnnoucePanel"
      close-icon="mdi-delete"
      style="position: absolute; right: 15px; z-index: 990; top: 15px"
      transition="slide-x-reverse-transition"
      draggable="true"
    >
      <h3 class="headline">{{ announcementItems.length }}条新公告</h3>
      <div style="width: 350px; max-height: 300px; overflow-y: scroll">
        <v-list dense>
          <v-list-item-group dense active-class="secondary--text">
            <template v-for="(item, index) in announcementItems">
              <v-list-item dense :key="index" style="padding-left: 0px">
                <v-list-item-content>
                  <v-list-item-title
                    >{{ item.stock_name + " | " + item.stock_code }}
                  </v-list-item-title>
                  <v-list-item-subtitle
                    v-text="item.title"
                  ></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text
                    v-text="item.date"
                  ></v-list-item-action-text>
                  <a color="primary" style="font-size: 12px" @click="gotoRating(item)"> 去打分 </a>
                </v-list-item-action>
              </v-list-item>
              <v-divider
                v-if="index < announcementItems.length - 1"
                :key="index + 'line'"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </div>
      <v-row align="center" no-gutters style="margin-top: 12 px">
        <v-col class="grow"><span style="font-size:12px;">系统每小时同步一次公告。</span></v-col>
        <v-spacer></v-spacer>
        <v-col class="shrink">
          <v-btn
            color="primary"
            depressed
            outlined
            small
            @click="closeAnnouncePanel"
          >
            关闭
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <v-dialog
        width="800px"
        v-model="showMemorandum"
      >
          <v-card>
            <v-card-title>
              速记与周复盘 (快捷键F2)
            </v-card-title>
            <v-card-text>
              <Memorandum></Memorandum>
            </v-card-text>
          </v-card>
      </v-dialog>
    <router-view style="width: 100%; height: 100%"></router-view>
  </v-app>
</template>

<script>
import store from "./util/Store";
import notice from "./util/Notice";
import Memorandum from "./components/Memorandum";

export default {
  props: {
    source: String,
  },
  components: {
    Memorandum
  },
  data: () => ({
    showAlert: false,
    alertType: "error",
    alertText: "",
    showAnnoucePanel: false,
    announcementItems: [],
    showMemorandum: false,
  }),
  watch: {
    showAlert() {
      if (this.showAlert) {
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
      }
    },
    // 展现公告通知面板
    getAnnouceInfo() {
      this.announcementItems = store.state.annouceStatus.announcementItems;
      this.showAnnoucePanel = true;
    },
    getAlertInfo() {
      this.alertType = store.state.alertStatus.type;
      this.alertText = store.state.alertStatus.alertText;
      this.showAlert = true;
    },
    getMemorandumShow() {
      this.showMemorandum = !this.showMemorandum;
    }
  },
  computed: {
    getAlertInfo() {
      return store.state.alertStatus.show;
    },
    getAnnouceInfo() {
      return store.state.annouceStatus.announceShow;
    },
    getMemorandumShow() {
      return store.state.memorandumStatus.memorandumShow;
    }
  },
  methods: {
    closeAnnouncePanel() {
      this.showAnnoucePanel = false;
      this.announcementItems = [];
      notice.setNotice("info", "新公告已经存放在 公告汇总 模块。");
    },
    gotoRating(item) {
      this.$router.push({
        name: "stockRating",
        params: {
          stockCode: item.stock_code,
        },
      });
    },
  },
  created() {
  },
};
</script>