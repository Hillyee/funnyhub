<template>
  <div class="pagination justify-content-end">
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>

    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)">
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      :class="{ active: page == pageNo }"
      @click="$emit('getPageNo', page)"
    >
      <span v-if="page >= startNumAndEndNum.start">{{ page }}</span>
    </button>

    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps(['pageNo', 'pageSize', 'total', 'continues'])

const totalPage = computed(() => {
  return Math.ceil(props.total / props.pageSize)
})

const startNumAndEndNum = computed(() => {
  const { continues, pageNo } = props
  let start = 0
  let end = 0
  // 如果连续的页码数大于总页数
  if (continues > totalPage.value) {
    start = 1
    end = totalPage.value
  } else {
    start = pageNo - continues / 2
    end = pageNo + continues / 2
    // 矫正出现负数的
    if (start < 1) {
      start = 1
      end = continues
    }
    if (end > totalPage.value) {
      end = totalPage.value
      start = totalPage.value - continues
    }
  }
  return { start, end }
})
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
