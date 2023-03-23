<script setup lang='ts'>
import { computed, ref } from 'vue'
import { NButton, NInput, NModal, useMessage } from 'naive-ui'
import { fetchVerify } from '@/api'
import { useAuthStore } from '@/store'

interface Props {
  visible: boolean
}

defineProps<Props>()

const authStore = useAuthStore()

const ms = useMessage()

const loading = ref(false)
const token = ref('')

const disabled = computed(() => !token.value.trim() || loading.value)

async function handleVerify() {
  const secretKey = token.value.trim()

  if (!secretKey)
    return

  try {
    loading.value = true
    await fetchVerify(secretKey)
    authStore.setToken(secretKey)
    ms.success('success')
    window.location.reload()
  }
  catch (error: any) {
    ms.error(error.message ?? 'error')
    authStore.removeToken()
    token.value = ''
  }
  finally {
    loading.value = false
  }
}

function handlePress(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleVerify()
  }
}
</script>

<template>
  <NModal :show="visible" style="width: 90%; max-width: 640px">
    <div class="p-10 bg-white rounded dark:bg-slate-800">
      <div class="space-y-4">
        <header class="space-y-2">
          <!-- <h2 class="text-2xl font-bold text-center text-slate-800 dark:text-neutral-200">
            403
          </h2> -->
          <p class="text-base text-center text-slate-500 dark:text-slate-500">
            {{ $t('请长按或扫描二维码关注官方公众号，获取最新动态。') }}
          </p>
          <p class="text-base text-center text-slate-500 dark:text-slate-500">
            {{ $t('公众号中输入“key”获取最新免费密钥') }}
          </p>
          <div class="container">
            <img src="https://mkdimg.oss-cn-shanghai.aliyuncs.com/img_for_typora_2023/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E7%99%BD%E8%89%B2%E7%89%88.png">
          </div>
          <!-- <Icon403 class="w-[200px] m-auto" lizimu/> -->
        </header>
        <NInput v-model:value="token" type="password" placeholder="" @keypress="handlePress" />
        <NButton
          block
          type="primary"
          :disabled="disabled"
          :loading="loading"
          @click="handleVerify"
        >
          {{ $t('common.verify') }}
        </NButton>
      </div>
    </div>
  </NModal>
</template>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
