<script setup lang="ts">
import { ref } from 'vue';
import service from '@/NativeService';
import { ElButton, ElDescriptions, ElDescriptionsItem, ElDivider, ElInput, ElNotification } from 'element-plus';
import { Platfrom } from '@/types';

const localFile = ref("")
const localDir = ref("")
const pathToOpen = ref(service.getPathUserData())
const txtContent = ref("electron-template is electron template")

var platformStringify = (platform: Platfrom) => {
  switch (platform) {
    case Platfrom.web:
      return 'web';
    case Platfrom.linux:
      return 'linux';
    case Platfrom.mac:
      return 'mac';
    case Platfrom.windows:
      return 'windows';
    default:
      return 'other';
  }
}

var chooseLocalFile = () => {
  service.chooseFile().then((paths: any) => {
    if (paths[0]) localFile.value = paths[0];
  })
}
var chooseLocalDir = () => {
  service.chooseDir().then((paths: any) => {
    if (paths[0]) localDir.value = paths[0];
  })
}

var saveContent = () => {
  service.saveToFile(txtContent.value, 'demo.txt', service.getPathUserData()).then(() => {
    ElNotification({
      title: "保存文件成功"
    })
  })
}
</script>

<template>
  <section class="flex-col flex-middle">
    <div class="flex-col container">
      <h2 class="title">💻 原生通信演示</h2>

      <ElDescriptions title="系统信息" border direction="vertical">
        <ElDescriptionsItem label="当前系统">{{ platformStringify(service.platform) }}</ElDescriptionsItem>
        <ElDescriptionsItem label="本地IP">{{ service.getLocalIp() }}</ElDescriptionsItem>
        <ElDescriptionsItem label="软件版本">{{ service.version }}</ElDescriptionsItem>
        <ElDescriptionsItem label="当前App目录">
          <ElButton type="primary" text style="padding: 0;" @click="service.showInFolder(service.getAppPath())">{{
            service.getAppPath()
            }}</ElButton>
        </ElDescriptionsItem>
        <ElDescriptionsItem label="用户数据目录">
          <ElButton type="primary" text style="padding: 0;" @click="service.showInFolder(service.getPathUserData())">{{
            service.getPathUserData() }}
          </ElButton>
        </ElDescriptionsItem>
      </ElDescriptions>

      <ElDivider />

      <ElDescriptions title="调用Native接口" border :column="1">
        <ElDescriptionsItem labelClassName="label">
          <template #label>
            <ElButton type="primary" style="padding: 0;" text @click="chooseLocalFile">选择本地文件</ElButton>
          </template>
          {{ localFile || '-' }}
        </ElDescriptionsItem>
        <ElDescriptionsItem labelClassName="label">
          <template #label>
            <ElButton type="primary" style="padding: 0;" text @click="chooseLocalDir">选择本地目录</ElButton>
          </template>
          {{ localDir || '-' }}
        </ElDescriptionsItem>
        <ElDescriptionsItem labelClassName="label">
          <template #label>
            <ElButton type="primary" style="padding: 0;" text @click="service.openSetting">打开“设置”</ElButton>
          </template>
          新窗口打开“设置”页面
        </ElDescriptionsItem>
        <ElDescriptionsItem label="打开文件所在目录" labelClassName="label">
          <div class="flex flex-middle">
            <ElInput v-model="pathToOpen" placeholder="输入电脑上文件的路径" class="mr-8" />
            <ElButton type="primary" @click="service.showInFolder(pathToOpen)">打开</ElButton>
          </div>
        </ElDescriptionsItem>
        <ElDescriptionsItem label="打印底层日志" labelClassName="label">
          <div class="flex flex-middle">
            <ElButton type="primary" style="padding: 0;" text @click="service.log('呵呵', '哈哈')">打印“呵呵，哈哈”</ElButton>
            <span class="ml-8">到主进程控制台（非开发者工具控制台）</span>
          </div>
        </ElDescriptionsItem>
        <ElDescriptionsItem label="保存到本地：[用户数据目录]/demo.txt" labelClassName="label">
          <div class="flex flex-middle">
            <ElInput type="textarea" v-model="txtContent" placeholder="输入文本内容" class="mr-8" />
            <ElButton type="primary" @click="saveContent">保存
            </ElButton>
          </div>
        </ElDescriptionsItem>
      </ElDescriptions>
    </div>
  </section>
</template>

<style>
.container {
  width: 80%;
  max-width: 920px;
  padding: 48px 0px;
}

.title {
  margin-bottom: 32px;
}

.label {
  width: 180px;

}
</style>