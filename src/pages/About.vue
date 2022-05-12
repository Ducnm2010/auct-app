<template>
  <div class="page home">
    <a-row>
      <a-col
        :span="20"
        :offset="2"
      >
        <a-row
          :gutter="10"
          class="custom"
        >
          <a-col :span="12">
            <div class="title">
              <a-typography-title>About us</a-typography-title>
            </div>
            <div class="content">
              <a-typography-paragraph>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti, non.
              </a-typography-paragraph>
              <a-typography>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda eius ab nostrum libero pariatur at
                necessitatibus tempore veniam! Nemo, voluptatem tenetur. Aut molestiae blanditiis dolores maxime
                repellat
                temporibus quibusdam fuga?
              </a-typography>
              <div class="space"></div>
              <a-row
                type="flex"
                justify="end"
              >
                <a-button
                  v-wave
                  type="link"
                  size="large"
                  class="custom"
                  @click="connectToWallet"
                >
                  Connect to your wallet
                </a-button>
                <a-button
                  v-wave
                  type="primary"
                  size="large"
                  @click="$router.push('/bidding')"
                >
                  Go bidding
                </a-button>
              </a-row>
            </div>
          </a-col>
          <a-col :span="12">
            <div class="illustration">
              <img
                class="image"
                src="../assets/cover-1.jpg"
                alt="cover"
              >
            </div>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue'
import { useContracts } from '../store/useContracts'

const contractStore = useContracts()

const connectToWallet = async () => {
  const onSuccess = () => message.success({
    content: 'Success connected to your wallet'
  })
  const onFailure = () => message.error({
    content: `You've just denied to connect`
  })
  // web3Store.connectToWallet(onSuccess, onFailure)
  contractStore.getEthereumContract()
}
</script>

<style scoped lang="scss">
.page.home {
  height: 100%;
  max-width: 1200px;
  margin: auto;

  .space {
    height: 2rem;
  }

  .title {
    margin-top: 100px;

    h1 {
      font-size: 3.2rem;
    }
  }


  .illustration {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .image {
      max-width: 100%;
      max-height: 70vh;
      object-fit: cover;
    }
  }
}

// custom 
.ant-row.custom {
  height: 100%;
}

.ant-btn.custom {
  margin-left: .5rem;
  font-weight: bold;
  background-color: #ffffff;
  border-color: #ffffff;
  color: var(--antd-wave-shadow-color);
  position: relative;

  &:after {
    content: '';
    display: inline-block;
    position: absolute;
    left: 50%;
    top: 100%;
    width: 70%;
    height: 2px;
    background-color: var(--antd-wave-shadow-color);
    transform: translate(-50%, -5px) scaleX(0);
    transition: all 300ms ease;
    transform-origin: left center;
  }

  &:hover:after {
    transform: translate(-50%, -5px) scaleX(1);
    transform-origin: left;
  }
}
</style>