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
            {{ $t('请长按或扫描二维码或搜索关注官方公众号，获取最新动态。') }}
          </p>
          <p class="text-base text-center text-slate-500 dark:text-slate-500">
            {{ $t('公众号中输入“key”获取最新免费密钥') }}
          </p>
          <p class="text-base text-center text-slate-500 dark:text-slate-500">
            {{ $t('友情提示：不要发送公司涉密信息！') }}
          </p>
          <div class="container">
            <img src="https://mkdimg.oss-cn-shanghai.aliyuncs.com/img_for_typora_2023/image-20230330103548986.png">
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
