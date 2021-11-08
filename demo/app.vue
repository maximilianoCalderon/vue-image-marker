<template>
  <div>
    <h3>Vue Image Marker Demo 2.0</h3>
    <button @click="padding += 10">+</button>
    <button @click="padding -= 10">-</button>
    <select name="" id="" v-model="mode">
      <option v-for="mode in modes" :key="mode.value" :value="mode.value">
        {{ mode.text }}
      </option>
    </select>
    <VImageMarker
      :mode="mode"
      @setMarker="getMark"
      class="image-marker"
      :src="urlImage"
      :padding="padding"
    >
      <VMarker
        :mode="mode"
        @click="markerClicked"
        v-for="(marker, index) in markers"
        :key="index"
        :x="marker.x"
        :y="marker.y"
        :color="marker.color"
        :id="marker.id"
      ></VMarker>
    </VImageMarker>
  </div>
</template>

<script>
import urlImage from "./map.png";

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

export function guid() {
  return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
}

export default {
  data() {
    return {
      //Mode 1: Set Marker
      //Mode 2: Delete marker
      //Mode 0: None of them
      mode: 1,
      modes: [
        { value: 0, text: "None" },
        { value: 1, text: "Set Marker" },
        { value: 2, text: "Delete Marker" },
      ],
      urlImage: urlImage,
      padding: 20,
      markers: [],
    };
  },
  methods: {
    markerClicked(id) {
      var index = this.markers.findIndex(function (marker) {
        return marker.id == id;
      });
      if (index !== -1) {
        this.markers.splice(index, 1);
      }
    },
    getMark(data) {
      this.markers.push({ color: "red", id: guid(), ...data });
    },
  },
};
</script>

<style lang="stylus" scoped>
.image-marker
  width calc(100vw - 20px)
  height calc(100vh - 100px)
  border solid 1px silver
  user-select none
  background-color #f8f8f8
</style>
