# Filter on
A online css3 image filter tool.

## Start
`app` is the foled which include all site files that needed to run. you should run a server  (nginx or just run a simple python ` python -m SimpleHTTPServer 3000`) and point to `app`.

If you just open file `app/index.html`, you will lost the icons.


## Featrue
- Test all the css3 filter values online.
- Support both 'Separate' and 'combine' mode.
- Support change the image src you want.
- You can simulation `hover` effect for each filter attribute.
- You can combine any attributes freely in 'combine' mode.



## develop and deploy
Some resources such as font and svg must be run at a server. I recommand to use [webon](https://github.com/bimohxh/webon)

### install webon
[webon](https://github.com/bimohxh/webon) is help to develop and deploy a static site.
run
```
npm install webon -g
```

### configuration
You need to do some configuration with `webon init`

### development
Just run 
```
webon s
```

### deploy
```
webon deploy
```


## License
[MIT](http://opensource.org/licenses/MIT)
