<script setup lang="ts">
import { ref } from '@vue/reactivity'

defineProps<{
  label: string
  type: string
  id: string
  autocomplete: string
  iconSrc?: string // Наличие иконки слева
  showPassword?: boolean // Наличие иконки показа скрытого пароля
}>()

const inputContentRef = ref('')
const typeRef = ref('password')

const changeInputType = () => {
  if (typeRef.value === 'password') {
    typeRef.value = 'text'
  } else {
    typeRef.value = 'password'
  }
}
</script>

<template>
  <div class="flex flex-col space-y-2">
    <div class="h-6">
      <transition
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
        enter-active-class="transition linear duration-700"
        leave-active-class="transition linear duration-700">
        <label v-if="inputContentRef" class="font-bold" :for="id">
          {{ label }}
        </label>
      </transition>
    </div>

    <div class="relative">
      <input
        class="outline-solid h-12 w-full rounded text-3xl text-gray-800 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)] outline-blue-800 dark:bg-gray-200"
        :class="[
          { 'px-2': !iconSrc },
          { 'pe-3 ps-12': iconSrc && !showPassword },
          { 'px-12 ': iconSrc && showPassword }
        ]"
        :type="type === 'password' ? typeRef : type"
        :name="id"
        :id="id"
        :placeholder="label"
        :autocomplete="autocomplete"
        v-model="inputContentRef" />

      <!-- Иконка слева -->
      <div v-if="iconSrc" class="absolute bottom-0 left-0 top-0 flex p-2">
        <img :src="iconSrc" />
      </div>

      <!-- Иконка справа -->
      <transition
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
        enter-active-class="transition linear duration-700"
        leave-active-class="transition linear duration-700">
        <div
          v-if="showPassword && inputContentRef"
          class="absolute right-0 top-0 flex h-12 w-12 cursor-pointer items-center justify-center">
          <img
            @click="changeInputType"
            class="h-8 w-8"
            :src="
              typeRef === 'text'
                ? 'icons/eye-closed.svg'
                : 'icons/eye-opened.svg'
            " />
        </div>
      </transition>
    </div>
  </div>
</template>
