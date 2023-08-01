<template>
  <div>
    <div></div>
    <v-navigation-drawer v-model="drawer" app width="180" color="primary" dark>
      <v-list dense flat>
        <v-list-item-group v-model="group" color="secondary" dark>
          <v-list-item
            v-for="item in items"
            :key="item.text"
            link
            @click="gotoTab(item.modelName)"
            :disabled="item.disabled"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-chip class="ma-2" color="indigo" text-color="white">
            <v-avatar left>
              <v-icon>account_circle</v-icon>
            </v-avatar>{{userName}}
          </v-chip>
          <v-btn dense small text @click="loginOut">注销</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

      <keep-alive :include="['StockRating','Management','StockPools','marketOverview', 'TodaySuggestion', 'Anouncements']">
    <router-view 
      style="width:calc(100% - 180px); margin-right:0px; height:100%;background:#EDF0F2;"
    ></router-view>
      </keep-alive>
  </div>
</template>

<script>
import session from "../util/SessionStorage";
import commonDataInterface from "../data/commonData";
import authority from "../util/Authority";
import moment from "moment";
export default {
  name: "IndexFrame",
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    items: [
      {
        icon: "create",
        text: "股票评分",
        disabled: false,
        modelName: "stockRating",
        index: 0,
      },
      {
        icon: "change_history",
        text: "股票池",
        disabled: false,
        modelName: "stockPools",
        index: 1,
      },
      // 
      {
        icon: "library_books",
        text: "公告汇总",
        disabled: false,
        modelName: "anouncements",
        index: 2,
      },
      {
        icon: "waves",
        text: "股票池复盘",
        disabled: false,
        modelName: "marketOverview",
        index: 3,
      },
      {
        icon: "trending_up",
        text: "今日推荐",
        disabled: false,
        modelName: "todaySuggestion",
        index: 4,
      },
      
    ],
    group: 0,
    userName: '',
    endDate: '',
    startDate: '',
  }),
  created() {
    let currentModel = this.items.filter(
      (e) => e.modelName === this.$route.name
    );
    if (currentModel[0] && currentModel[0].index !== this.group) {
      this.group = currentModel[0].index;
    }
    this.userName = session.getSessionStorage("userName");
    // 管理员权限
    if (authority.isPermissible("管理员")) {
      this.items.push({
        icon: "supervised_user_circle",
        text: "管理员界面",
        disabled: false,
        modelName: "management",
        index: 5,
      });
    }
    if (this.userName === '李跃') {
      this.items.push(
        {
        icon: "",
        text: "李跃专属",
        disabled: false,
        modelName: "fileUploadTest",
        index: 5,
      }
      )
    }

    this.endDate = moment().format("YYYY-MM-DD");
    this.startDate = moment().subtract(1, "days").format("YYYY-MM-DD");
    this.initWorker();
    // this.getAnnouncements();
  },
  methods: {
    gotoTab(name) {
      this.$router.push({ name: name });
    },
    // commonDataInterface
    initWorker() {
      var _self = this;
      if (this.pollingWorker2) {
        this.pollingWorker2.terminate();
      }
      this.pollingWorker2 = this.createWorker(function () {
        setInterval(function () {
          self.postMessage("");
        }, 600000);
      });

      this.pollingWorker2.onmessage = function () {
        _self.getAnnouncements();
      };
    },
    createWorker(f) {
      var blob = new Blob(["(" + f.toString() + ")()"]);
      var url = window.URL.createObjectURL(blob);
      var worker = new Worker(url);
      return worker;
    },

    getAnnouncements() {
      commonDataInterface
        .getAnnouncements({
          key: '',
          startD: this.startDate,
          endD: this.endDate,
        });
    },

    loginOut() {
      session.removeSessionStorage('token');
      this.$router.push({ name: "login" });
    },
  },
  watch: {
    // $route(to) {
    //   let currentModel = this.items.filter(e => e.modelName === to.name);
    //   if (currentModel[0].index !== this.group) {
    //     this.group = currentModel.index;
    //   }
    // }
  },
};
</script>
<style scoped>
/* .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
} */
</style>
<style>
.card__title {
    padding-bottom: 0px;
  }
</style>
