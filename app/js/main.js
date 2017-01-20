(function() { 
  var silders = []

  var filerArr = [
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
      },
      {
        name: 'hue-rotate',
        value: [0, 360, 100],
        step: 1,
        unit: 'deg'
      },
      {
        name: 'invert',
        value: [0.1, 1, 1],
        step: 0.01
      },
      {
        name: 'opacity',
        value: [0.1, 1, 1],
        step: 0.01
      },
      {
        name: 'saturate',
        value: [0.1, 10, 5],
        step: 0.1
      },
      {
        name: 'sepia',
        value: [0.1, 1, 0.5],
        step: 0.01
      }
    ]

  filerArr.forEach(function (item) {
    item.enabled = true
  })
  
  Vue.component('vue-slider', {
    props: ['item', 'index'],
    template: '#slider-template'
  })

  Vue.use({
    install: function (Vue, options) {
       // 计算单独样式
      Vue.prototype.computeStyle = function (item) {
        var style = {}
        var val = item.name + '(' + item.value[2] + (item.unit || '') + ')'
        style['-webkit-filter'] = val
        style['filter'] = val
        return style
      }

       // 计算所有样式
      Vue.prototype.computeAllStyle = function () {
        if (!App) {
          return {}
        }
        var style = {}
        var val = ''
        App.filters.forEach(function (item) {
          val += item.name + '(' + item.value[2] + (item.unit || '') + ')'
        })
        style['-webkit-filter'] = val
        style['filter'] = val
        return style
      }

      // 判断数据类型
      Vue.prototype.setSliderVal = function (index, item) {
        silders[index].noUiSlider.set(item.value[2]);
      }
    }
  })
  


  var App = new Vue({
    el: '#app',
    data: {
      img: 'img/demo.jpg',
      view: 'combine',
      filters: filerArr
    },
    methods: {
     

      
    },
    mounted: function () {
      var _this = this
      $('.val-range').each(function () {
        var elIndex = parseInt($(this).attr('data-index'))
        var elobj = _this.filters[elIndex]
        noUiSlider.create($(this)[0], {
          start: elobj.value[2],
          connect: [true, false],
          // tooltips: [wNumb ({ 
          //   encoder: function (val) {
          //     switch (elobj.step) {
          //       case 0.1:
          //         return Math.floor(val * 10) / 10
          //       case 0.01:
          //         return Math.floor(val * 100) / 100
          //       case 1:
          //         return Math.floor(val)
          //       default:
          //        return val
          //     }
          //   }
          // })],
          step: elobj.step,
          range: {
            'min': elobj.value[0],
            'max': elobj.value[1]
          }
        })

        silders.push($(this)[0])
      })

      silders.forEach(function (slider) {
        slider.noUiSlider.on('update', function ( values, handle ) { 
          var index = parseInt($(slider).attr('data-index'))
          _this.filters[index].value.splice(2, 1, parseFloat(values[0]))
        })
      })

      $(".checkbox").simpleSwitch({
        "theme": "LIKE"
      })
    }
  })
})()