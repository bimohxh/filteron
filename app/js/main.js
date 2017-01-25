(function() { 
  var silders = []

  var filerArr = [
      {
        name: 'blur',
        desc: '模糊',
        value: [0, 100, 3],
        step: 1,
        unit: 'px',
        fdesc: '给图像设置高斯模糊。“radius”一值设定高斯函数的标准差，或者是屏幕上以多少像素融在一起，所以值越大越模糊；如果没有设定值，则默认是0；这个参数可设置css长度值，但不接受百分比值。'
      },
      {
        name: 'brightness',
        desc: '亮度',
        value: [0.1, 10, 1.5],
        step: 0.1,
        fdesc: '给图片应用一种线性乘法，使其看起来更亮或更暗。如果值是0%，图像会全黑。值是100%，则图像无变化。其他的值对应线性乘数效果。值超过100%也是可以的，图像会比原来更亮。如果没有设定值，默认是1'
      },
      {
        name: 'contrast',
        desc: '对比度',
        value: [0.1, 10, 1.75],
        step: 0.1,
        fdesc: '调整图像的对比度。值是0%的话，图像会全黑。值是100%，图像不变。值可以超过100%，意味着会运用更低的对比。若没有设置值，默认是1'
      },
      {
        name: 'grayscale',
        desc: '灰度',
        value: [0, 1, 0.5],
        step: 0.01,
        fdesc: '将图像转换为灰度图像。值定义转换的比例。值为100%则完全转为灰度图像，值为0%图像无变化。值在0%到100%之间，则是效果的线性乘子。若未设置，值默认是0'
      },
      {
        name: 'hue-rotate',
        desc: '色相旋转',
        value: [0, 360, 100],
        step: 1,
        unit: 'deg',
        fdesc: '给图像应用色相旋转。“angle”一值设定图像会被调整的色环角度值。值为0deg，则图像无变化。若值未设置，默认值是0deg。该值虽然没有最大值，超过360deg的值相当于又绕一圈'
      },
      {
        name: 'invert',
        desc: '反色',
        value: [0.1, 1, 1],
        step: 0.01,
        fdesc: '反转输入图像。值定义转换的比例。100%的价值是完全反转。值为0%则图像无变化。值在0%和100%之间，则是效果的线性乘子。 若值未设置，值默认是0。'
      },
      {
        name: 'opacity',
        desc: '透明度',
        value: [0.1, 1, 1],
        step: 0.01,
        fdesc: '转化图像的透明程度。值定义转换的比例。值为0%则是完全透明，值为100%则图像无变化。值在0%和100%之间，则是效果的线性乘子，也相当于图像样本乘以数量。 若值未设置，值默认是1。该函数与已有的opacity属性很相似，不同之处在于通过filter，一些浏览器为了提升性能会提供硬件加速。'
      },
      {
        name: 'saturate',
        desc: '饱和度',
        value: [0.1, 10, 5],
        step: 0.1,
        fdesc: '转换图像饱和度。值定义转换的比例。值为0%则是完全不饱和，值为100%则图像无变化。其他值，则是效果的线性乘子。超过100%的值是允许的，则有更高的饱和度。 若值未设置，值默认是1。'
      },
      {
        name: 'sepia',
        desc: '褐色',
        value: [0.1, 1, 0.5],
        step: 0.01,
        fdesc: '将图像转换为深褐色。值定义转换的比例。值为100%则完全是深褐色的，值为0%图像无变化。值在0%到100%之间，则是效果的线性乘子。若未设置，值默认是0。'
      }
    ]

  filerArr.forEach(function (item) {
    item.enabled = true // 合并模式下 是否启用
    item.view = 'normal'// 当前视图 normal   about  hover
  })
  
  Vue.component('vue-slider', {
    props: ['item', 'index', 'switchen'],
    template: '#slider-template'
  })

  Vue.component('vue-code', {
    props: ['sfilters'],
    template: '#code-template'
  })

  Vue.use({
    install: function (Vue, options) {

       // 计算单独样式
      Vue.prototype.computeStyle = function (item, index) {
        var style = {}
        var val = item.name + '(' + item.value[2] + (item.unit || '') + ')'
        style['-webkit-filter'] = val
        style['filter'] = val
        
        var styleval = JSON.stringify(style).replace(/"/g, '').replace(/,/g, ';')
        var _id = 'img-style-' + index
        $('#' + _id).remove()
        if(item.view == 'hover') {
          $('body').append('<style type="text/css" id="' + _id + '">.imgp-' + index + ':hover' + styleval + '</style>')
        } else {
          $('body').append('<style type="text/css" id="' + _id + '">.imgp-' + index + styleval + '</style>')
        }
        return ''

      }

       // 计算所有样式
      Vue.prototype.computeAllStyle = function () {
        if (!App) {
          return {}
        }
        var style = {}
        var val = ''
        App.filters.forEach(function (item) {
          if (item.enabled) {
            val += item.name + '(' + item.value[2] + (item.unit || '') + ') '
          }
        })
        style['-webkit-filter'] = val
        style['filter'] = val
        return style
      }
     

      // 判断数据类型
      Vue.prototype.setSliderVal = function (index, item) {
        silders[index].noUiSlider.set(item.value[2]);
      }

      // 切换hover效果
      Vue.prototype.switchHover = function (item) {
        item.view = (item.view == 'hover' ? 'code' : 'hover')
      }
    }
  })
  


  var App = new Vue({
    el: '#app',
    data: {
      img: 'img/demo.jpg',
      view: 'seperate',
      sourcesrc: '',
      filters: filerArr
    },
    methods: {
     // 合成视图下的可用filter集合
     usables: function () {
       return this.filters.filter(function (item) {
         return item.enabled
       })
     }

      
    },
    watch: {
      sourcesrc: function (val) {
        if(val == '') {
          this.img = 'img/demo.jpg'
        }
      }
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

  $('#imgpreview').load(function () {
    if(!App) { return }
    App.img = App.sourcesrc
  })
})()

