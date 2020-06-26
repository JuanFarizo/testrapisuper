<template>
  <div>
    <Camera></Camera>---------------------------
    <UsbReader></UsbReader>
  </div>
</template>

<script>
import Camera from "@/views/components/barcode/Camera";
import UsbReader from "@/views/components/barcode/UsbReader";
export default {
  components: {
    Camera: Camera,
    UsbReader: UsbReader
  }
};
</script>

<style lang="css" scoped>
</style>
