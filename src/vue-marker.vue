<template>
  <div
    @click="clicked"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @contextmenu="right"
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
  watch: {
    hover(newValue, oldValue) {
      if (newValue) {
        this.$emit("hoverin", this.id);
      }
      if (!newValue && oldValue) {
        this.$emit("hoverout", this.id);
      }
    },
  },
  methods: {
    right(e) {
      //do stuff
      e.preventDefault();
      this.$emit("rightclick", this.id);
    },
    clicked() {
      if (this.mode == 2) {
        this.$emit("click", this.id);
      } else if (this.mode == 0) {
        this.$emit("view", this.id);
      }
    },
  },
};
</script>

<style lang="css" scoped>
.marker {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 6px;
  border: solid 1px #000;
  cursor: pointer;
  transition: border-color 0.2s;
}
.marker:hover {
  border-color: #000;
}

/* .marker
  position absolute
  width 8px
  height 8px
  border-radius 6px
  border solid 1px black
  cursor pointer
  transition border-color 0.2s
  &:hover
    border-color black */
</style>
