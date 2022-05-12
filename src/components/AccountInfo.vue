<template>
  <div class="account-info">
    <div class="account-info__avatar">
      <div class="avatar">
        <img
          src="../assets/user.png"
          alt="user"
        >
      </div>
    </div>
    <div class="account-info__username">
      <a-tooltip>
        <template #title>{{ currentAccount }}</template>
        <a-typography-title class="username">{{ truncatedAccount }}</a-typography-title>
      </a-tooltip>
    </div>
    <div class="account-info__wallet">
      <div class="wallet">{{ truncatedBalance }} ETH</div>
    </div>
    <slot name="action" />
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useContracts } from '../store/useContracts'
import { storeToRefs } from 'pinia'

const contractStore = useContracts()
const { currentAccount, balance } = storeToRefs(contractStore)
const truncatedAccount = computed(() => currentAccount?.value?.slice(0, 10) + '...' || '')
const truncatedBalance = computed(() => balance?.value.slice(0, 10) || '0')

watchEffect(() => {
  console.log(truncatedBalance)
})
</script>

<style lang="scss" scoped>
.account-info {
  background-color: #f9f9f9;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-radius: 6px;
  position: relative;
  box-shadow: 1px 3px 5px rgb(0 0 0 / 30%);

  @media (max-width: 1200px) {
    display: none;
  }

  .account-info__avatar {
    padding-top: 1rem;
    padding-bottom: 1rem;

    .avatar {
      max-width: 150px;
      margin: auto;

      img {
        max-width: 100%;
        border-radius: 50%;
        box-shadow: 1px 3px 5px rgba(0 0 0 / 30%);
      }
    }
  }

  .account-info__username {
    padding-left: 1rem;
    padding-right: 1rem;

    .username {
      display: block;
      text-align: center;
      font-size: 1.5rem;
    }
  }

  .account-info__wallet {
    .wallet {
      text-align: center;
      font-size: 2.5rem;
    }
  }
}
</style>