<template>
      <div v-if="inProgress">
        <div v-if="isRTL">{{ displaySecond }} : 0{{ displayMinute }}</div>
        <div v-else>0{{ displayMinute }} : {{ displaySecond }}</div>
      </div>
      <el-button
        @click="resetButton"
        v-if="buttonOnDone && done"
      >
        {{ $t("resendCode") }}
      </el-button>
</template>

<script>
import { isRTLLang } from "/@/i18n"

export default {
  props: {
    enteredTime: {
      type: Number,
      required: true
    },
    buttonOnDone: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      inProgress: true,
      done: null,
      initialSeconds: this.enteredTime,
      displayMinute: null,
      displaySecond: "00"
    }
  },
  computed: {
    isRTL:() => isRTLLang()
  },
  watch: {
    done(newVal) {
        if(newVal) this.$emit("timeOut", this.done)
      
    }
  },
  mounted() {
    this.displayMinute = Math.floor(this.initialSeconds / 60)
    this.displaySecond = this.getSeconds(this.initialSeconds)
    this.updateCountdown()
  },
  methods: {
    resetButton() {
      this.$emit("click")
    },
    getSeconds(time) {
      let seconds = time % 60
      seconds = seconds < 10 ? "0" + seconds : seconds
      return seconds
    },
    updateCountdown() {
      let time = this.initialSeconds
      time--
      const Interval = setInterval(() => {
        const minutes = Math.floor(time / 60)
        //minutes = minutes < 10 ? "0" + minutes : minutes;

        if (this.getSeconds(time) >= 0) {
          this.inProgress = true
          this.done = false
          this.displayMinute = minutes
          this.displaySecond = this.getSeconds(time)
        } else {
          this.inProgress = false
          this.done = true
          clearInterval(Interval)
        }

        time--
      }, 1000)
    }
  }
}
</script>
