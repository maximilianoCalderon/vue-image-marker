# vue-image-marker 2

Image container for adding icon marker to the image. (dynamically! 😃)

## New Features 😃

This project is based in https://github.com/jarvisniu/vue-image-marker by jarvisniu, i added some features like:
  * New component <VMarker> for adding dynamically markers inside the image.
  * 3 modes for <VImageMarke>
    - `0` None, this mode is only for previewing your image with marks.
    - `1` Set marker, you can set markers by clicking the map.
    - `2` Delete marker, you can delete a marker by clicking it.
  * We can create a marker with info a then retrieve it when click

## npm
 
 https://www.npmjs.com/package/vue-image-marker-2
 
## Demo
  
  * New demo for vue image maker 2
  
[Demo](https://unpkg.com/vue-image-marker-2/dist/index.html)

## Usage

Install:
```
npm i vue-image-marker-2
```

Import:
```js
import Vue from 'vue'
import vImageMarker2 from 'vue-image-marker-2'
Vue.use(vImageMarker2)

```

Use:
```html
  <div>
    <h3>Vue Image Marker Demo 2.0</h3>
    <button @click="padding += 10">+</button>
    <button @click="padding -= 10">-</button>
    <select name="" id="" v-model="mode">
      <option v-for="mode in modes" :key="mode.value" :value="mode.value">
        {{ mode.text }}
      </option>
    </select>
    <v-image-marker
      :mode="mode"
      @setMarker="getMark"
      class="image-marker"
      :src="urlImage"
      :padding="padding"
    >
      <v-marker
        :mode="mode"
        @click="markerClicked"
        v-for="(marker, index) in markers"
        :key="index"
        :x="marker.x"
        :y="marker.y"
        :color="marker.color"
        :id="marker.id"
      ></v-marker>
    </v-image-marker>
  </div>
```
  
  
  ```js
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
  ```
  
  ```css
  .image-marker
    width calc(100vw - 20px)
    height calc(100vh - 100px)
    border solid 1px silver
    user-select none
    background-color #f8f8f8
  ```

## API
### VueMarkerImage Props

- `src`: Url of the image where the markers overlaid on.
- `padding`: Container padding, default is 0.
- `mode`: Image marker's mode, the definition of each mode is
    - `0` None, this mode is only for previewing your image with marks.
    - `1` Set marker, you can set markers by clicking the map.
    - `2` Delete marker, you can delete a marker by clicking it.
  
### VueMarker Props
  
- `color`: Marker's color.
- `info`: Info that you can attach to the marker.
- `x`: Marker's location in x axis.
- `y`: Marker's location in y axis.
- `id`: Unique id for the marker
- `mode`: Image marker's mode, the definition of each mode is
    - `0` None, this mode is only for previewing your image with marks.
    - `1` Set marker, you can set markers by clicking the map.
    - `2` Delete marker, you can delete a marker by clicking it.

## License

MIT
