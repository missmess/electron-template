<template>
  <div class="container">
    <h2>设置</h2>
    <div class="setting-title">常规</div>
    <div class="setting-option">
      <ElCheckbox label="启用即时存储" />
    </div>
    <div class="setting-option">
      <ElCheckbox label="启用签名" />
    </div>
    <div class="setting-title">性能</div>
    <div class="setting-option">
      <ElCheckbox label="启用动态导入" />
    </div>
    <div class="setting-option">
      <ElCheckbox label="禁用Mix缓存" />
    </div>
    <div class="setting-title">示警程序</div>
    <ElRadioGroup v-model="val">
      <ElRadio value="1">EVL-1</ElRadio>
      <ElRadio value="2">NGC</ElRadio>
      <ElRadio value="3">PointX</ElRadio>
    </ElRadioGroup>
  </div>
</template>

<script setup lang="ts">
import { ElCheckbox, ElRadioGroup, ElRadio } from 'element-plus';
import { ref } from 'vue'

var val = ref("1")
</script>

<style>
.container {
  padding: 24px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: aliceblue;
}

.setting-title {
  color: #222;
  font-size: 14px;
  font-weight: 800;
  margin-top: 16px;
  margin-bottom: 16px;
}

.setting-option {
  color: #666;
  font-size: 16px;
  margin-top: 10px;
}
</style>
