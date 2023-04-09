<script lang="ts" setup>
import { NButton } from 'naive-ui'

import { ref } from 'vue'
import { fetchNewKey } from '@/api'

const keys = ref([] as string[])

const handleNewKey = async () => {
  try {
    const { data } = await fetchNewKey<string[]>()
    keys.value = data
  }
  catch (error: any) {
    console.error(error)
  }
}
</script>

<template>
  <div class="flex h-full">
    <div class="px-4 m-auto space-y-4 text-center max-[400px]">
      <NButton type="primary" @click="handleNewKey">
        新的Key
      </NButton>
      <br>
      <code>{{ keys }}</code>
    </div>
  </div>
</template>
