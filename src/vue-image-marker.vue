<template>
  <div :style="imageMarkerStyle" class="image-marker">
    <img id="myImgId" :src="src" :style="posStyle" class="image" @load="onImageLoad" />
    <div @click="setMarker" :style="posStyle" class="mark-container">
      <slot />
    </div>
  </div>
</template>

<script>
import _debounce from "lodash.debounce";

const LAYOUT_REFRESH_DELAY = 100;

function findPosition(oElement) {
  if (typeof oElement.offsetParent != "undefined") {
    for (var x = 0, y = 0; oElement; oElement = oElement.offsetParent) {
      x += oElement.offsetLeft;
      y += oElement.offsetTop;
    }
    return [x, y];
  } else {
    return [oElement.x, oElement.y];
  }
}

export default {
  props: {
    src: { type: String, required: true },
    padding: { type: Number, default: 0 },
    internalWidth: { type: Number, default: 200 },
    internalHeight: { type: Number, default: 500 },
    mode: { type: Number, default: 0 },
  },
  data() {
    return {
      containerWidth: 1,
      containerHeight: 1,
      imageWidth: 1,
      imageHeight: 1,
      top: 0,
      left: 0,
      width: 1,
      height: 1,
    };
  },
  computed: {
    imageMarkerStyle() {
      if (this.padding != 0) {
        return {
          position: "relative",
          minWidth: this.width + 25 + "px",
          minHeight: this.height + 25 + "px",
        };
      } else {
        return {
          position: "relative",
          minWidth: this.internalWidth + "px",
          minHeight: this.internalHeight + "px",
        };
      }
    },
    posStyle() {
      return {
        left: this.left + "px",
        top: this.top + "px",
        width: this.width + "px",
        height: this.height + "px",
      };
    },
  },
  watch: {
    padding: "refreshPos",
  },
  mounted() {
    this.refreshPos();
    window.addEventListener("resize", this.refreshPos);
  },
  destroyed() {
    window.removeEventListener("resize", this.refreshPos);
  },
  methods: {
    setMarker(e) {
      //Set marker mode
      if (this.mode == 1) {
        let x = 0;
        let y = 0;
        let imgPos;
        imgPos = findPosition(document.getElementById("myImgId"));
        if (e.pageX || e.pageY) {
          x = e.pageX;
          y = e.pageY;
        } else if (e.clientX || e.clientY) {
          x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
          y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        x = x - imgPos[0];
        y = y - imgPos[1];
        x = x / this.width;
        y = y / this.height;
        this.$emit("setMarker", { x: x, y: y });
      }
    },
    onImageLoad(ev) {
      this.imageWidth = ev.currentTarget.naturalWidth;
      this.imageHeight = ev.currentTarget.naturalHeight;
      this.refreshPos();
    },
    // recalc left, top, width, height
    // Need a delay to wait the dom refreshing
    refreshPos: _debounce(function () {
      this.containerWidth = this.$el.clientWidth;
      this.containerHeight = this.$el.clientHeight;
      let clientWidth = this.containerWidth - this.padding * 2;
      let clientHeight = this.containerHeight - this.padding * 2;
      let clientRatio = clientWidth / clientHeight;
      let imageRatio = this.imageWidth / this.imageHeight;
      if (imageRatio > clientRatio) {
        // top & bottom padding
        this.width = clientWidth;
        this.left = this.padding;
        this.height = this.width / imageRatio;
        this.top = this.padding + (clientHeight - this.height) / 2;
      } else {
        // left & right padding
        this.height = clientHeight;
        this.top = this.padding;
        this.width = this.height * imageRatio;
        this.left = this.padding + (clientWidth - this.width) / 2;
      }
    }, LAYOUT_REFRESH_DELAY),
  },
};
</script>

<style lang="css" scoped>
.image {
  position: absolute;
}
.mark-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
