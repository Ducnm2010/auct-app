<template>
    <div class="page session-detail">
        <a-typography-title align="center" style="padding-top: 3rem; color: #fff">
            The session will end in:
        </a-typography-title>


        <div class="timebox">
            <div class="time-left timebox-days">
                <label>Day</label>
                <span>{{ timeLeft.days }}</span>
            </div>
            <!-- <span>:</span> -->
            <div class="time-left timebox-hours">
                <label>Hour</label>
                <span>{{ timeLeft.hours }}</span>
            </div>
            <!-- <span>:</span> -->
            <div class="time-left timebox-minutes">
                <label>Minute</label>
                <span>{{ timeLeft.minutes }}</span>
            </div>
            <!-- <span>:</span> -->
            <div class="time-left timebox-seconds">
                <label>Second</label>
                <span>{{ timeLeft.seconds }}</span>
            </div>
        </div>

        <a-typography-title :level="4" class="current-highest-price">
            {{ startingPrice }}
        </a-typography-title>

        <a-form class="bidding-form" :model="formState" layout="vertical" align="center">
            <a-form-item name="bidPrice">
                <a-input v-model:value="formState.bidPrice" />
            </a-form-item>
            <a-form-item>
                <a-button @click="handleSubmit" type="primary">Bid</a-button>
            </a-form-item>
        </a-form>

    </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useCountdown } from '../hooks'
import { storeToRefs } from 'pinia';
import { useContracts } from '../store/useContracts';
import { useRoute } from 'vue-router'

const route = useRoute()


const contractStore = useContracts()
const { listSession } = storeToRefs(contractStore)

const targetDate = 'Wed May 13 2022 18:20:00 GMT+0700 (Indochina Time)'

watchEffect(() => {
    if (!listSession.value) {
        contractStore.getAllSessions()
    }
})

const currentSession = computed(() => {
    const foundIndex = listSession?.value?.findIndex(item => (item.id + 1) === Number(route.params.id))
    if (foundIndex > -1) { return listSession.value[foundIndex] } else { return null }
})

const timeLeft = computed(() => {
    if (currentSession.value) {
        const { formattedTimeLeft } = useCountdown(currentSession?.value?.startingTime)
        return formattedTimeLeft
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
})

const startingPrice = computed(() => currentSession?.value?.startingPrice || '0')

const formState = ref({
    bidPrice: ''
})

watchEffect(() => {
    console.log(currentSession.value)
    if (!currentSession.value) console.log('no session availabled')
})

const handleSubmit = () => {

}
</script>

<style scoped lang="scss">
.page.session-detail {
    height: 100%;
    color: #ffffff;
    background-color: var(--antd-wave-shadow-color);

    .timebox {
        display: flex;
        width: 100%;
        max-width: 500px;
        justify-content: space-between;
        align-items: center;
        margin: auto;
        text-align: center;
        font-size: 2rem;

        .time-left {
            display: flex;
            flex-direction: column;
            width: 90px;
            padding-top: 10px;
            padding-bottom: 10px;
            font-size: 2rem;
            color: #001529;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 1px 3px 10px rgb(0 0 0 / 30%);

            label {
                font-size: 1rem;
            }

            span {
                line-height: 1;
                margin-left: 4px;
                margin-right: 4px;
                margin: auto;
            }
        }
    }


    .current-highest-price {
        color: #ffffff;
        text-align: center;
        font-size: 4rem;
        text-shadow: 1px 1px rgba(255 255 255 / 15%)
    }

    .bidding-form {
        max-width: 400px;
        margin: auto;
    }
}
</style>