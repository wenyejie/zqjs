<!--
 -
 -
 - @author: Storm
 - @date: 2018/11/02
 -->
<template>
  <transition name="fade">
    <div
      ref="dropdown"
      v-if="innerVal !== 0"
      v-show="innerVal === 1"
      :class="classes"
      class="s-dropdown fade"
      @click="handleClick">
      <slot />
    </div>
  </transition>
</template>

<script>
import componentDeparture from '../../utils/componentDeparture.js'
import elOnceEventListener from '../../utils/elOnceEventListener.js'

export default {
  name: 'SDropdown',
  props: {
    value: {
      type: Number,
      default: 1
    },

    left: {
      type: [String, Number],
      default: null
    },

    top: {
      type: [String, Number],
      default: null
    },

    // 是否脱离文档流
    departure: {
      type: Boolean,
      default: true
    },

    // 风格
    styles: {
      type: String,
      default: 'default',
      validator (val) {
        return ['default'].includes(val)
      }
    },

    // 是否有角标
    superscript: {
      type: Boolean,
      default: false
    },

    // 定位元素
    posElm: {
      type: Object,
      default: null
    },

    // 是否要自动关闭
    autoClose: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      innerVal: this.value
    }
  },
  computed: {
    classes () {
      return {
        [`s-dropdown-${this.styles}`]: !!this.styles,
        'is__departure': this.departure
      }
    }
  },
  watch: {
    value (val, oldVal) {
      if (val === oldVal) return
      this.innerVal = val
      if (val === 1) {
        this.addListener()
      } else if (val === 2) {
        this.removeListener()
      }
    }
  },
  mounted () {

    if (this.innerVal > 0) {
      this.addListener()
    }
  },
  beforeDestroy () {
    this.removeListener()
    componentDeparture.destroy(this.$el)
  },
  methods: {

    show () {
      componentDeparture.show(this.$el, this.$parent.$el)
      if (this.innerVal === 1 && this.autoClose) {
        elOnceEventListener.add(this.docClickCb)
      }
    },

    addListener () {
      if (this.$el.isBodyAppend) {
        this.show()
      }
      this.$nextTick(this.show)
    },

    removeListener () {
      elOnceEventListener.remove(this.docClickCb)
    },

    // document点击回调
    docClickCb () {
      this.innerVal = 2
      this.$emit('input', 2)
    },

    // 点击事件
    handleClick ($event) {
      if (this.autoClose) {
        $event.stopPropagation()
      }
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">
  .s-dropdown {
    position: absolute;
    z-index: 1;
    left: auto;
    top: auto;
    margin-top: 5px;

    &.is__departure {
    }

    &-default {
      background: #fff;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.30);
      border-radius: 3px;
    }
  }
</style>
