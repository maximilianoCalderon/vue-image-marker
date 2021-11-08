<template>
  <div
    @click="clicked"
    class="marker"
    :style="{
      left: `calc(${x * 100}% - 5px)`,
      top: `calc(${y * 100}% - 5px)`,
      backgroundColor: color,
    }"
  ></div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "red",
    },
    info: {
      type: Object,
      default: () => {},
    },
    x: {
      type: Number,
      default: 0.5,
      required: true,
    },
    y: {
      type: Number,
      default: 0.5,
      required: true,
    },
    id: {
      type: String,
      default: "defaultId",
      required: true,
    },
    mode: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  methods: {
    clicked() {
      if (this.mode == 2) {
        this.$emit("click", this.id);
      } else if (this.mode == 0) {
        this.$emit("view", this.info);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.marker
  position absolute
  width 8px
  height 8px
  border-radius 6px
  border solid 1px black
  cursor pointer
  transition border-color 0.2s
  &:hover
    border-color black
</style>
