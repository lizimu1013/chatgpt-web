<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="flex h-full">
    <div class="px-4 m-auto space-y-4 text-center max-[400px]">
      <NButton type="primary" @click="goHome">
        Go to Home
      </NButton>
    </div>
  </div>
</template>
