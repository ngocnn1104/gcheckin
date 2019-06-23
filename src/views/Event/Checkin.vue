<template>
  <div>
    <el-button v-if="!show" @click="startScan">Start</el-button>
    <el-button v-if="show && camera === 'auto'" @click="pauseScan"
      >Pause</el-button
    >
    <el-button v-if="show && camera === 'off'" @click="continueScan"
      >Continue</el-button
    >
    <el-button v-if="show" @click="stopScan">Stop</el-button>

    <el-row>
      <el-col :xs="24" :sm="12">
        <qrcode-stream
          v-if="show"
          @decode="onDecode"
          :camera="camera"
          @init="onInit"
        />
      </el-col>
      <el-col :xs="24" :sm="12">
        <span>{{ code }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";

export default {
  components: { QrcodeStream },
  data() {
    return {
      show: false,
      code: null,
      camera: "auto"
    };
  },
  methods: {
    onInit(promise) {
      promise.catch(err => {
        this.code = err;
        this.camera = "off";
      });
    },
    onDecode(code) {
      this.code = code;
      this.camera = "off";
    },
    startScan() {
      this.show = true;
      this.camera = "auto";
    },
    pauseScan() {
      this.camera = "off";
    },
    continueScan() {
      this.camera = "auto";
    },
    stopScan() {
      this.show = false;
    }
  }
};
</script>

<style></style>
