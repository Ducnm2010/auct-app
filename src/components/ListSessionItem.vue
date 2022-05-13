<template>
  <li
    class="list-session-item"
    v-wave
    @click="$emit('click')"
  >
    <div class="session-item">
      <div class="session-item__info">
        <!-- <div class="info-name">{{ name }}</div> -->
        <div class="info-time">{{ formattedTime }}</div>
        <div class="info-price">{{ startingPrice }}
          <money-collect-outlined class="icon-money" />
        </div>
      </div>
      <div
        class="session-item__photo"
        :style="{ 'background-image': `url(${imgSrc})` }"
      ></div>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'
import { MoneyCollectOutlined } from '@ant-design/icons-vue'
import moment from 'moment'

const props = defineProps({
  id: String,
  startingTime: String,
  startingPrice: String,
  imgSrc: String,
})

const formattedTime = computed(() => {
  const _time = moment.unix(props.startingTime).format('HH:mm:ss DD-MM-YYYY')
  console.log(_time)
  return _time || ''
})
</script>

<style scoped lang="scss">
.list-session-item {
  flex: 47%;
  flex-grow: 0;

  .session-item {
    display: flex;
    background-color: #fafafa;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 3px 5px 7px rgb(0 0 0 / 30%);
    transition: all 500ms ease-in-out;

    .session-item__info {
      flex: 40%;
      padding: 1rem;
      position: relative;
      box-shadow: 3px 3px 3px rgba(0 0 0 / 30%);
      transition: all 500ms ease-in-out;

      .info-name {
        font-size: 1rem;
        font-weight: bold;
        max-width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .info-price {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 3rem;

        .icon-money {
          font-size: 1.5rem;
          margin-left: 5px;
        }
      }
    }

    .session-item__photo {
      flex: 60%;
      display: block;
      padding-bottom: 40%;
      background-position: center;
      background-size: auto;
      background-repeat: no-repeat;
      background-color: rgba(0 0 0 / 30%);
      background-blend-mode: overlay;
      transition: all 500ms ease-in-out;
    }

    // hover state
    &:hover {
      box-shadow: 1px 3px 10px -3px rgba(0 0 0 / 30%);

      .session-item__info {
        flex: 70%;

        .info-name {
          max-width: 200px;
        }
      }

      .session-item__photo {
        flex: 30%;
        background-color: rgba(0 0 0 / 15%);
      }
    }
  }
}
</style>