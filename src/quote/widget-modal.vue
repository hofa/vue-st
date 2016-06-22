<template>
  <div id="widget-modal" class="modal-mask" v-show="show" transition="modal">
    <div class="modal-wrapper" @click="bgClick">
      <div class="modal-container-{{type}}" @click="stopEvent($event)" :style="style">

        <div class="modal-header">
          <slot name="header">
            <h3>#信息提示</h3>
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <button class="modal-default-button"
              @click="show = false">
              OK
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    },
    type: {
      type: Number,
      default: 1
    },
    timeout: {
      type: Number,
      default: 0
    },
    lock: {
      type: Boolean,
      default: false
    },
    style: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      t: null
    }
  },

  created: function() {
    console.log("modal created")
  },

  methods: {

    // 倒计时
    countdown: function() {
      this.t = setTimeout(this.stopCountDown, this.timeout)
    },

    // 停止倒计时
    stopCountDown: function() {
      clearTimeout(this.t)
      this.show = false
    },

    // 背景点击
    bgClick: function() {
      if (!this.lock) {
        this.show = false
      }
    },

    // 阻止事件传播
    stopEvent: function(event) {
      event.preventDefault()
      event.stopPropagation()
    },
  },

  watch: {
    show: function(oldVal, newVal) {
      // console.log(newVal, this.timeout)
      if (newVal == false && this.timeout != 0) {
        this.countdown()
      }

      if (newVal == true) {
        if (this.t != null) {
          clearTimeout(this.t)
        }
      }
    }
  }
}
</script>

<style lang=less scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container-1 {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-container-2 {
    margin: 0px auto;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    text-align: center;
    .modal-header, .modal-footer{
      display: none;
    }
  }

  .modal-container-3 {
    width: 300px;
    margin: 0px auto;
    padding: 10px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    text-align: left;

    .modal-header{
      display: none;
    }
    .modal-footer{
      border-top: 1px solid #0F0F0F;
      text-align: center;
    }
  }

  .modal-header h3 {
    margin-top: 0;
    /*color: #42b983;*/
    font-size: 0.4rem;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    /*float: right;*/
    background-color: white;
  }

  /*
   * the following styles are auto-applied to elements with
   * v-transition="modal" when their visiblity is toggled
   * by Vue.js.
   *
   * You can easily play with the modal transition by editing
   * these styles.
   */

  .modal-enter, .modal-leave {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
