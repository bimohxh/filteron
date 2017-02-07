# jsonon
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



## Deploy on oss
sometime we want to deploy the app on a oss static server,  we offer a tool to deploy site to qiniu oss.

### Initial node environment
run
```
npm install
```

### Config qiniu 
Create a  file `config/local_env.json` like :

```
{
  "qiniu": {
    "accessKey": "....",
    "secretKey": "....",,
    "bucket": "....",,
    "origin": "...."
  }
}
```


### Run  command
```
npm run deploy
```


## License
[MIT](http://opensource.org/licenses/MIT)
