以前nodeJS教程出来的时候，慕课网站上的“学习人数”是静态数据，教程中是可以直接爬取。

**然而现在却改成了动态js加载,请看大屏幕：**

![照着教程写下来的代码，爬下来的数据居然为空，任性！](http://img.blog.csdn.net/20161207221914162?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvUGVuZ1NoYW9C/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

##解决方法
1. 自行分析网页异步加载【优点：通常能够获取到十分简洁清晰的数据】

- 步骤一：使用谷歌浏览器自带的F12网页分析工具
![步骤一](http://img.blog.csdn.net/20161207222045504?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvUGVuZ1NoYW9C/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
- 步骤二：在network中找到对应数据的异步加载
![步骤二](http://img.blog.csdn.net/20161207222125458?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvUGVuZ1NoYW9C/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
- 步骤三：访问找到的异步加载的url
![返回来的数据居然是JSON](http://img.blog.csdn.net/20161207222147053?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvUGVuZ1NoYW9C/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

2. 通过网络上的框架来模拟浏览器，等网页js渲染结束后再进行爬取【优点：不用自行分析网站】
	- 这个可以在开源社区搜索即可

###后面就看大家的了，哈哈哈哈，慕课网要被玩坏了····
