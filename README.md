# lol

> lol

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



# widget

## widget-modal

```
    data() {
      return {
        showModal: false,
        showModal2: false,
        cityPanel: {
          display: 'none'
        },
        cityListLetter: [],
        cityList: [],
        letterCities: [],
        DS: dataStore
      }
    }

<button @click="showModal = true">Show Modal</button>
<!-- use the modal component, pass in the prop -->
<modal :show.sync="showModal" :timeout="3000" :type="1" :style=`background-color:red`>
  <h3 slot="header">custom header</h3>
  <h3 slot="body">请输入<input type="text" v-model="DS.testForm"></h3>
</modal>

<button  @click="showModal2 = true">Show Modal2</button>
<modal :show.sync="showModal2" :type="2">
  <h3 slot="body">请输入<input type="text" v-model="DS.testForm"></h3>
</modal>
```
