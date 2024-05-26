<template>
  <transition name="fade">
    <div v-if="show" class="splash-screen">
      <div class="spinner-wrapper">
        <div class="spinner">
          <v-img src="/img/gift.svg"></v-img>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    visible(newValue) {
      if (!newValue) {
        setTimeout(() => {
          this.show = false;
        }, 500); // Tiempo de la transición en milisegundos
      }
    }
  }
};
</script>

<style scoped>
.splash-screen {
  background: var(--v-primary-base) !important;
  width: 100vw !important;
  height: 100vh !important;
  position: fixed;
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.spinner-wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
  
    transform: translate(-50%, -50%);
  }
  .spinner {
    width: 150px;
    height: 150px;
    margin: 100px auto;
  
    border-radius: 100%;
    -webkit-animation: sk-scaleout 1s infinite ease-in-out;
    animation: sk-scaleout 1s infinite ease-in-out;
  }
  
  @-webkit-keyframes sk-scaleout {
    0% {
      -webkit-transform: scale(0);
    }
    100% {
      -webkit-transform: scale(1);
      opacity: 0;
    }
  }
  
  @keyframes sk-scaleout {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 0;
    }
  }
</style>
