var express = require('express');
var router = express.Router();
const names = [
  "运动控制",
  "数字图像处理",
  "离散数学",
  "概率论",
  "电工学",
  "信号与系统实验",
  "数字逻辑",
  "模拟电路",
  "电路试题讲解",
  "信号与系统",
  "数字电路",
  "计算机控制",
  "电路",
  "微机原理与汇编技术",
  "数值分析",
  "供配电",
  "电磁场与电磁波",
  "微型计算机原理与接口技术",
  "数据通讯与计算机网络",
  "概率论2",
  "C语言等",
]
const srcs = [
"http://i4.bvimg.com/649220/e2db24bc5240257cs.jpg" ,
"http://i4.bvimg.com/649220/c3085786b27610cas.jpg" ,
"http://i4.bvimg.com/649220/3c015a26cbcbd813s.jpg" ,
"http://i4.bvimg.com/649220/ff440fddfcb6b352s.jpg" ,
"http://i4.bvimg.com/649220/8a834b7005559212s.jpg" ,
"http://i4.bvimg.com/649220/66dcb4406b084a69s.jpg" ,
"http://i4.bvimg.com/649220/9f7e7cf7dffc2299s.jpg" ,
"http://i4.bvimg.com/649220/312df126018b488es.jpg" ,
"http://i4.bvimg.com/649220/8bd8d2ac8cc66a43s.jpg" ,
"http://i4.bvimg.com/649220/aebbd4999af22296s.jpg" ,
"http://i4.bvimg.com/649220/f97fa6a2c7639ffas.jpg" ,
"http://i4.bvimg.com/649220/100408500b8f1333s.jpg" ,
"http://i4.bvimg.com/649220/9408e04a909a049cs.jpg" ,
"http://i4.bvimg.com/649220/a9f1ebc87bdf86ccs.jpg" ,
"http://i4.bvimg.com/649220/9626e076df2f81d6s.jpg" ,
"http://i4.bvimg.com/649220/3f3e99aa3564ac14s.jpg" ,
"http://i4.bvimg.com/649220/c17d70097748ac9ds.jpg" ,
"http://i4.bvimg.com/649220/973625dd3e689b42s.jpg" ,
"http://i4.bvimg.com/649220/63b2838bc620e088s.jpg" ,
"http://i4.bvimg.com/649220/013cfa3bf364d343s.jpg" ,
"http://i4.bvimg.com/649220/a542231da5eb5845s.jpg"
]
router.get('/', function(req, res, next) {
  res.render('books',{
    names:names,
    srcs:srcs
  })
});

module.exports = router;
