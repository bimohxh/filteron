var silders = []
var App = new Vue({
  el: '#app',
  data: {
    img: 'http://t1.niutuku.com/960/21/21-262687.jpg',
    filters: [
      {
        name: 'blur',
        value: [0, 100, 3],
        step: 1,
        unit: 'px'
      },
      {
        name: 'brightness',
        value: [0.1, 10, 1.5],
        step: 0.1
      },
      {
        name: 'contrast',
        value: [0.1, 10, 1.75],
        step: 0.1
      },
      {
        name: 'grayscale',
        value: [0, 1, 0.5],
        step: 0.01
      }
    ]
  },
  methods: {
    // 计算样式
    computeStyle: function (item) {
      var style = {}
      var val = item.name + '(' + item.value[2] + (item.unit || '') + ')'
      style['-webkit-filter'] = val
      style['filter'] = val
      return style
    },

    hello: function () {
      console.log('====')
    }
  },
  mounted: function () {
    var _this = this
    $('.val-range').each(function () {
      var elIndex = parseInt($(this).attr('data-val'))
      var elobj = _this.filters[elIndex]
      noUiSlider.create($(this)[0], {
        start: elobj.value[2],
        connect: [true, false],
        tooltips: [true],
        step: elobj.step,
        range: {
          'min': elobj.value[0],
          'max': elobj.value[1]
        }
      })
    })
   
  }
})


