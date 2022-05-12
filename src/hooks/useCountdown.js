import { ref, computed, isRef, unref, watchEffect } from 'vue'

export const useCountdown = (targetDate, onTimeout = () => console.log('timeout')) => {
    const countDownDate = ref(new Date(targetDate).getTime())
    const timeLeft = ref(countDownDate.value - new Date().getTime())
    const formattedTimeLeft = computed(() => (getReturnValues(timeLeft.value)))

    const isTimeout = () => timeLeft.value < 0

    const countDownInterval = setInterval(() => {
        console.log('run interval')
        timeLeft.value = countDownDate.value - new Date().getTime()
    }, 500);

    watchEffect(() => {
        if (isTimeout()) clearInterval(countDownInterval) && onTimeout()
    })

    return { formattedTimeLeft }
}

const getReturnValues = (val) => {
    const countDown = isRef(val) ? unref(val) : val
    // calculate time left
    const validateTimeLeft = val => val <= 0 ? 0 : val

    const days = validateTimeLeft(Math.floor(countDown / (1000 * 60 * 60 * 24)))
    const hours = validateTimeLeft(Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
    const minutes = validateTimeLeft(Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)))
    const seconds = validateTimeLeft(Math.floor((countDown % (1000 * 60)) / 1000))

    return { days, hours, minutes, seconds }
};