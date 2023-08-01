<template>
  <div>
    <v-row>
      <v-col cols="5" style="padding-bottom: 0px">
        <v-row
          style="margin-top: -35px; margin-bottom: -20px; padding-left: 8px"
        >
        <v-checkbox
            dense
            v-model="selected"
            label="晨会"
            value="4"
          ></v-checkbox>
          <v-checkbox
            dense
            v-model="selected"
            label="速记"
            value="2"
            style="margin-right: 12px"
          ></v-checkbox>

          <v-checkbox
            dense
            v-model="selected"
            label="日复盘"
            value="3"
          ></v-checkbox>
          <v-checkbox
            dense
            v-model="selected"
            label="周复盘"
            value="1"
            style="margin-right: 12px"
          ></v-checkbox>
        </v-row>
        <div style="height: 425px; overflow-y: scroll">
          <v-list dense>
            <v-list-item-group
              dense
              v-model="selectedMemorandum"
              active-class="secondary--text"
            >
              <template v-for="(item, index) in memorandumList">
                <v-list-item dense :key="index" style="padding-left: 0px">
                  <v-list-item-content>
                    <v-list-item-title
                      >{{ item.createDate }}
                    </v-list-item-title>
                    <v-list-item-subtitle
                    >
                    #{{typeMap[item.type]}}:
                    {{item.title}}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action style="margin-top: 0px">
                    <v-list-item-action-text
                      v-text="item.name"
                    ></v-list-item-action-text>
                    <v-list-item-action-text v-if="item.userId === userId && item.createDate === today"
                    >
                    <v-btn icon x-small @click="deleteMemorandum(item)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                    </v-list-item-action-text>
                  </v-list-item-action>
                </v-list-item>
                <v-divider
                  v-if="index < memorandumList.length - 1"
                  :key="index + 'line'"
                ></v-divider>
              </template>
            </v-list-item-group>
          </v-list>
        </div>
      </v-col>
      <v-col cols="7" style="padding-bottom: 0px">
        <div
          style="
            margin-top: -15px;
            display: flex;
            justify-content: space-between;
          "
        >
          <h3
            style="
              height: 19px;
              color: black;
              display: inline-block;
              min-width: 10px;
            "
            class="accent--text"
          >
          #{{currentType.typeName}}:{{ title }}
          </h3>
          <!-- <v-btn
            text
            small
            style="text-algin: right; margin-right: -8px"
            @click="setWeekReport"
            v-show="showWeekReportBtn"
          >
          </v-btn> -->
          <!-- <span >设为</span> -->
          <div style="width:100px;height:48px;">
            <v-combobox
            v-model="currentType"
            dense
            :items="typeList"
            item-text="typeName"
            item-value="typeValue"
            @change="setWeekReport"
            label="设置为"
            v-show="!editable"
          ></v-combobox>
          </div>
          
        </div>
        <v-textarea
          outlined
          rows="23"
          v-model="content"
          dense
          :loading="inputContentLoading"
          @focus="resetSucInfo"
          :success-messages="saveSucInfo"
          :readonly="editable"
        ></v-textarea>
        <!-- @change="saveContent" -->
      </v-col>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-btn
        outlined
        small
        color="primary"
        elevation="2"
        style="margin-right: 12px"
        @click="addNew"
      >
        新增
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import httpUtil from "../data/dataUtil/httpUtils";
import session from "../util/SessionStorage";
import moment from "moment";

export default {
  name: "Memorandum",
  data: () => ({
    selected: ["2", "1", "3", "4"],
    memorandumList: [],
    userId: "",
    userName: "",
    today: "",
    content: "",
    title: "",
    id: "",
    type: "2", // type：2-速记；1-周复盘
    typeList: [
      {
        typeName: "晨会",
        typeValue: "4",
      },
      {
        typeName: "速记",
        typeValue: "2",
      },
      {
        typeName: "日复盘",
        typeValue: "3",
      },
      {
        typeName: "周复盘", 
        typeValue: "1",
      },
    ],
    currentType:{
        typeName: "晨会",
        typeValue: "4",
    },
    typeMap:{
      '1':'周复盘',
      '2':'速记',
      '3':'日复盘',
      '4':'晨会',
    },
    inputContentLoading: false,
    stopTitling: false,
    saveSucInfo: "",
    selectedMemorandum: null,
    timeoutInstance: null,
    initalRecord: 0,
  }),
  created() {
    this.userId = session.getSessionStorage("userid");
    this.userName = session.getSessionStorage("userName");
    this.today = moment().format("YYYY-MM-DD");
    this.getContentList();
  },
  mounted() {},
  methods: {
    // 查询点评集合
    getContentList() {
      // 参数 key-模糊查询content和title userId-查询人 type-查询栏目 createDate-创建日期
      var _self = this;
      if (this.selected.length < 1) {
        this.memorandumList = [];
        return;
      }
      httpUtil
        .postWithURL("controller/contentController.php?getContentList", {
          typeList: this.selected
        })
        .then((res) => {
          _self.memorandumList = res.list;
          if (_self.memorandumList[0].createDate === this.today) {
            _self.chooseMemorandum(0);
          } else {
            _self.chooseMemorandum(null);
          }
        });
    },
    // 保存或修改点评
    saveContent() {
      //   参数：content-内容 title-标题 createDate-日期 userId-创建人 dr-1删除 id-更新或删除主键 type-点评栏目类型
      if (!this.content) {
        return;
      }
      this.inputContentLoading = true;
      var _self = this;
      httpUtil
        .postWithURL("controller/contentController.php?saveOrUpdateContent", {
          content: this.content,
          title: this.title,
          createDate: this.today,
          userId: this.userId,
          dr: "0",
          type: this.type,
          id: this.id,
        })
        .then((res) => {
          _self.inputContentLoading = false;
          _self.saveSucInfo = "保存成功";
          if (!_self.id) {
            _self.id = res.id;
          }
          _self.afterSaveContent();
        });
    },
    afterSaveContent() {
      var _self = this;
      httpUtil
        .postWithURL("controller/contentController.php?getContentList", {})
        .then((res) => {
          _self.memorandumList = res.list;
        });
    },
    deleteMemorandum(item) {
      var a = window.confirm('确定删除这条速记吗？');
      if (a === false) {
        return;
      }
      var _self = this;
      httpUtil
        .postWithURL("controller/contentController.php?saveOrUpdateContent", {
          dr: "1",
          id: item.id,
        })
        .then(() => {
          _self.getContentList();
        });
    },
    resetSucInfo() {
      this.saveSucInfo = "";
    },
    chooseMemorandum(num) {
      this.initalRecord = 0;
      this.selectedMemorandum = num;
      var temp = this.memorandumList[this.selectedMemorandum];
      if (temp) {
        this.id = temp.id;
        this.content = temp.content;
        this.title = temp.title;
        this.type = temp.type;
        this.currentType = {
          typeValue: temp.type,
          typeName: this.typeMap[temp.type]
        }
      } else {
        this.id = "";
        this.content = "";
        this.title = "";
        this.currentType = {
          typeValue: 4,
          typeName: '晨会'
        }
      }
    },
    addNew() {
      this.chooseMemorandum(null);
    },
    setWeekReport() {
      this.type = this.currentType.typeValue;
    },
  },
  computed: {
    editable() {
      var temp = this.memorandumList[this.selectedMemorandum];
      if (
        this.selectedMemorandum === null ||
        (temp.createDate === this.today && temp.userId === this.userId)
      ) {
        return false;
      } else {
        return true;
      }
    },
    // 是否为周复盘
    showWeekReportBtn() {
      if (this.type === "1" && this.title.indexOf("#周复盘：") > -1) {
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    content(value) {
      if (this.initalRecord === 0) {
        this.initalRecord = 1;
        return;
      }
      if (!value) {
        this.title = "";
        this.stopTitling = false;
      }
      // 循环延迟保存
      if (this.saveSucInfo) {
        this.saveSucInfo = "";
      }
      clearTimeout(this.timeoutInstance);
      var _self = this;
      this.timeoutInstance = window.setTimeout(function () {
        _self.saveContent();
      }, 1500);
      if (this.stopTitling) {
        return;
      }
      var titleIndex = value.indexOf("\n");
      if (titleIndex > -1) {
        this.title = value.slice(0, titleIndex);
        this.stopTitling = true;
      } else {
        this.title = value;
      }
    },
    selectedMemorandum(value) {
      this.chooseMemorandum(value);
    },
    selected() {
      this.getContentList();
    },
  },
};
</script>
<style>
</style>
