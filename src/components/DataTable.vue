<template>
  <div
    v-bind:style="{ width: width, height: height, overflow: 'scroll' }"
    @scroll="scrollTable"
    :ref="'tableContainer' + timeStamp"
  >
    <table
      style="min-width: 100%; width: max-content"
      @mouseenter="showUpHoverBox"
      @mouseleave="hideHoverBox"
    >
      <thead>
        <tr>
          <th
            v-for="(col, index) in columns"
            v-bind:key="index"
            v-bind:style="{ textAlign: col.align, width: col.width }"
          >
            <div
              class="sorted-header"
              v-bind:style="{ float: col.align === 'end' ? 'right' : 'left' }"
              @click="toggleSortKey(col)"
            >
              <i
                v-bind:style="{
                  visibility:
                    col.value === optionsInternal.sortBy ? 'visible' : '',
                }"
                v-if="col.sortable !== false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  height="16"
                  viewBox="0 0 24 24"
                  width="12"
                  v-bind:style="{
                    transform: sortDescInternal
                      ? 'rotate(0.5turn)'
                      : 'rotate(0turn)',
                  }"
                >
                  <rect fill="none" height="24" width="24" />
                  <path
                    d="M5,9l1.41,1.41L11,5.83V22H13V5.83l4.59,4.59L19,9l-7-7L5,9z"
                  />
                </svg>
              </i>
              <span>{{ col.text }}</span>
            </div>
          </th>
        </tr>
        <tr style="height: 3px; border: none">
          <th
            style="padding: 0px; overflow: hidden"
            v-if="loading"
            :colspan="columns.length"
          >
            <div class="loading"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(da, i) in data"
          v-bind:key="i"
          @mouseover="trMouseOver(i)"
          @mouseout="trMouseOut"
          @click="trClick(da)"
        >
          <td
            v-for="(col, j) in columns"
            v-bind:key="'col' + j"
            v-bind:style="{
              textAlign: col.align,
              width: col.width,
              paddingLeft: col.sortable !== false ? '12px' : '6px',
            }"
          >
            <slot :name="col.value" :item="data[i]">
              <template
                v-if="
                  Array.isArray(data[i][col.value]) && data[i][col.value] < 1
                "
              >
              </template>
              <template v-else>
                {{ data[i][col.value] }}
              </template>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="hover-box"
      ref="hoverBox"
      :style="{ top: boxTop, left: boxLeft, visibility: showHoverBox }"
    >
      <slot name="popup" :item="data_hoverCurrentRow"> </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    width: String,
    height: String,
    // 分页选项
    pagesOption: Object,
    columns: Array,
    data: Array,
    loading: Boolean,
    options: Object,
    serverItemsLength: Number,
    showPopup: Boolean
  },
  data: () => ({
    optionsInternal: {},
    optionsInternalTempl: {
      itemsPerPage: 20,
      page: 1,
      sortBy: "",
      sortDesc: true,
    },
    sortDescInternal: true,
    timeStamp: "",
    lastScrollTop: 0,
    showHoverBox: "hidden",//
    boxTop: "",
    boxLeft: "",
    timeoutInstance: null,
    hideHoverBoxTimeOut: null,
    tableHeight: 0,
    tableWidth: 0,
    hoverCurrentRow: 0,
  }),
  created() {
    this.timeStamp = new Date().getTime();
  },
  mounted() {
    // let temp = JSON.parse(JSON.stringify(this.options));
    this.optionsInternal = this.options;
    if (this.optionsInternal) {
      if (!this.optionsInternal.itemsPerPage) {
        this.optionsInternal.itemsPerPage = this.optionsInternalTempl.itemsPerPage;
      } else {
        this.optionsInternal.itemsPerPage = this.options.itemsPerPage;
      }
      if (!this.optionsInternal.sortBy) {
        this.optionsInternal.sortBy = this.optionsInternalTempl.sortBy;
      }
      if (this.options.sortDesc !== null) {
        this.sortDescInternal = this.options.sortDesc;
        this.optionsInternal.sortDesc = this.options.sortDesc;
      } else {
        this.options.sortDesc = this.sortDescInternal;
      }
      if (!this.optionsInternal.page) {
        this.optionsInternal.page = this.optionsInternalTempl.page;
      }
    } else {
      this.optionsInternal = this.optionsInternalTempl;
    }
  },
  activated() {},
  methods: {
    scrollTable(e) {
      // 这一步对外暴露滚动事件
      if (e.target.scrollTop > this.lastScrollTop) {
        this.$emit("scroll");
        if (
          e.target.scrollTop !== 0 &&
          e.target.scrollTop + e.target.clientHeight + 1 > e.target.scrollHeight
        ) {
          // 这一步对外暴露滚动到底部事件
          this.$emit("scrollToEnd");
        }
      }
      this.lastScrollTop = e.target.scrollTop;
      // event.stopPropagation();
    },
    // 对外暴露滚动接口，通过这个接口来滚动table
    scrollBy(x, y) {
      this.$refs["tableContainer" + this.timeStamp].scrollBy({
        top: x,
        left: y,
        behavior: "smooth",
      });
    },
    scrollTo(x, y) {
      this.$refs["tableContainer" + this.timeStamp].scrollTo({
        top: x,
        left: y,
        behavior: "smooth",
      });
    },
    trClick(data) {
      this.$emit("clickRow", data);
    },
    // 切换排序字段
    toggleSortKey(col) {
      if (col.sortable === false) {
        return;
      }
      if (this.optionsInternal.sortBy === col.value) {
        this.sortDescInternal = !this.sortDescInternal;
        this.options.sortDesc = this.sortDescInternal;
      } else {
        this.optionsInternal.sortBy = col.value;
        // this.options.sortBy = col.value;
      }
      // 这一步对外暴露排序事件
      this.$emit("sortMethod");
    },
    // 鼠标悬浮到行上
    trMouseOver(index) {
      if (this.showPopup !== true) {
        return;
      }
      clearTimeout(this.timeoutInstance);
      var _self = this;
      let layerX = 0;
      let layerY = 0;
      if (this.tableWidth === 0) {
        this.tableWidth = this.$refs[
          "tableContainer" + this.timeStamp
        ].offsetWidth;
        this.tableHeight = this.$refs[
          "tableContainer" + this.timeStamp
        ].offsetHeight;
      }
      if (this.timeoutInstance != null) {
        layerX = window.event.layerX;
        layerY = window.event.layerY;
      }
      this.timeoutInstance = window.setTimeout(function () {
        // 获取悬浮框高度
        let hoverBoxHeight = _self.$refs["hoverBox"].offsetHeight;
        _self.hoverCurrentRow = index;
        if (_self.tableWidth - layerX < 300) {
          layerX = layerX - 300;
        }
        if (_self.tableHeight - layerY < hoverBoxHeight) {
          layerY = layerY - hoverBoxHeight;
        }
        _self.boxTop = layerY + 110 + "px";
        _self.boxLeft = layerX + 30 + "px";
        if (_self.showHoverBox == "hidden") {
          _self.hideHoverBoxTimeOut = setTimeout(() => {
            _self.showHoverBox = "visible";
          }, 101);
        }
      }, 100);
    },
    // 鼠标离开行
    trMouseOut() {},
    showUpHoverBox() {
      // var _self = this;
      // this.hideHoverBoxTimeOut = setTimeout(() => {
      // _self.showHoverBox = 'visible';
      // }, 551); 
    },
    hideHoverBox() {
      if (this.showPopup !== true) {
        return;
      }
      clearTimeout(this.hideHoverBoxTimeOut);
      clearTimeout(this.timeoutInstance);
      this.showHoverBox = "hidden";
    },
  },
  computed: {
    data_hoverCurrentRow() {
      if (this.data[this.hoverCurrentRow]) {
        return this.data[this.hoverCurrentRow]
      } else {
        return {}
      }
    }
  },
  watch: {},
};
</script>
<style scoped>
table {
  border-collapse: collapse;
}

table tr {
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
  height: 24px;
}
table tr:hover {
  background: #eeeeee;
}
table tr th {
  /* padding-left: 6px;
  padding-right: 6px; */
  text-align: start;
  position: sticky;
  top: 0;
  z-index: 2;
  background: white;
}
table tr td {
  /* padding-left: 6px;
  padding-right: 6px; */
  font-size: 0.875rem;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.87);
}
.sorted-header {
  cursor: pointer;
  display: flex;
}
.sorted-header i {
  visibility: hidden;
}

.sorted-header:hover i {
  visibility: visible;
}
.sorted-header i svg {
  transition: all 0.5s ease-in-out;
}
.hover-box {
  width: 280px;
  height: auto;
  position: absolute;
  z-index: 99;
  top: 30px;
  transition: all 0.1s ease-in-out;
  pointer-events: none;
}
</style>
<style lang="scss" scoped>
.loading {
  background: #344955;
  height: 2px;
  width: 30%;
  animation: dash 1.5s cubic-bezier(0, 0.23, 0.01, 0.65) infinite;
  // color 6s ease-in-out infinite;
}

@keyframes dash {
  0% {
    margin-left: -30%;
    // transform:translateX(-30%);
  }
  // 50% {
  //   margin-left: 50%;
  //   // transform:translate(50%,0);
  // }
  100% {
    margin-left: 100%;
    // transform:translateX(100%);
  }
}

// @keyframes color {
//   100%,
//   0% {
//     stroke: $red;
//   }
//   40% {
//     stroke: $blue;
//   }
//   66% {
//     stroke: $green;
//   }
//   80%,
//   90% {
//     stroke: $yellow;
//   }
// }
</style>