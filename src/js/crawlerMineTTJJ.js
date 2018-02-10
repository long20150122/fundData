// 加载http模块
var http = require('http');
var https = require('https');
// Cheerio 是一个Node.js的库， 它可以从html的片断中构建DOM结构，然后提供像jquery一样的css选择器查询
var cheerio = require('cheerio');

// 定义网络爬虫的目标地址：自如友家的主页
var url = 'http://fund.eastmoney.com/163402.html';
// var url = 'https://www.zhihu.com/signup?next=%2F';
// var url = 'https://www.baidu.com/';

http.get(url, function(res) {
    // res.headers = {
    //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //     'Cookie': '_zap=b8659e8b-a496-415f-9bcb-abdf4a7cb885; d_c0="ACCChbQJ1gyPTtbpfdPLXZ8lhZT594c6CgM=|1513302271"; q_c1=ffa13505778f4dfd912d787edf2cd763|1516006513000|1513302270000; l_cap_id="MzBiYjQxNTlmYzBjNGRmMzk1YzQ2Y2FhOTNiZjM2ZmI=|1516341743|d502155356d9a9c9aeb15b352ab16940c5ebca6c"; r_cap_id="M2QwYTFmZWMzZThiNGM0Mjk1YTA5MmRhOGFmNjQ5NTg=|1516341743|34983ca9c792a7c052f73c13f45851c83a99a799"; cap_id="YjdiNDMyYzZkMmEwNDhlNTkyZTgwNTljNmE2NGZhOGY=|1516341743|eb2f83293ec68ddeece22afe26a73dd33449864e"; capsion_ticket="2|1:0|10:1516342284|14:capsion_ticket|44:NzZkN2Q5MGQxNWI2NDE0Y2E2YjNjN2ExYWYwMjZmOTg=|2dd235804ba16c2b26c655a97af620d47f32691f7f4b763538a57165bd231b47"; z_c0="2|1:0|10:1516342286|4:z_c0|92:Mi4xaVRqbEFRQUFBQUFBSUlLRnRBbldEQ1lBQUFCZ0FsVk5EdHBPV3dDcW5CTzYxZFpoMXEza0E4aHI0S0twU3hDb0dR|dc20afcb94587b0e06d8b21ed43486bae2782dd37f046e19e3c2cadcd6b2a545"; aliyungf_tc=AQAAADMnQG+MrgEAatmQPQQ+LuxYYcNv; _xsrf=b35aeb74-50ec-49a2-819a-4a0848f1806b; __utma=51854390.1698776586.1516674778.1516674778.1516674778.1; __utmb=51854390.0.10.1516674778; __utmc=51854390; __utmz=51854390.1516674778.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=51854390.110-1|2=registration_date=20150723=1^3=entry_date=20150723=1',
    // }
    // console.log('状态码：', res.statusCode);
    // console.log('请求头：', res.headers);
    var html = '';
    // 获取页面数据
    res.on('data', function(data) {
        html += data;
    });
    // 数据获取结束
    res.on('end', function() {
        // 通过过滤页面信息获取实际需求的轮播图信息
        // var slideListData = filterSlideList(html);
        // console.log(html);
        filterHtml(html);
        // console.log(slideListData);
    });
}).on('error', function() {
    console.log('获取数据出错！');
});

//gpx  知道人  知道持有  知道变化
//求公共持有
function filterHtml (html) {
    if (!html) return;

    var $ = cheerio.load(html);
    //hold data
    console.log(strOut($("#position_shares tbody th"), " / "));
    console.log(strOut($("#position_shares tbody td:nth-child(1)"), " / "));
    console.log(strOut($("#position_shares tbody td:nth-child(2)"), " / "));
    console.log(strOut($("#position_shares tbody td:nth-child(3)"), " / "));
    console.log($("title").text());
    console.log($("#position_shares .end_date").text());
    //update rate
    console.log(strOut($("#Li1 th"), " / "));
    console.log(strOut($("#Li1 td:nth-child(1)"), " / "));
    console.log(strOut($("#Li1 td:nth-child(2)"), " / "));
    console.log(strOut($("#Li1 td:nth-child(3)"), " / "));
    console.log(strOut($("#Li1 td:nth-child(4)"), " / "));



    function strOut (obj, str) {
        var strBack = "";
        obj.each(function (index, item) {
            if (!index) {
                strBack = $(item).text();
            }
            strBack = strBack + str + $(item).text();
        });
        return strBack;
    }
    
}






/* 过滤页面信息 */
function filterSlideList(html) {
    if (html) {
        // 沿用JQuery风格，定义$
        var $ = cheerio.load(html);
        // 根据id获取轮播图列表信息
        var slideList = $('#foucsSlideList');
        // 轮播图数据
        var slideListData = [];

        /* 轮播图列表信息遍历 */
        slideList.find('li').each(function(item) {

            var pic = $(this);
            // 找到a标签并获取href属性
            var pic_href = pic.find('a').attr('href');
            // 找到a标签的子标签img并获取_src
            var pic_src = pic.find('a').children('img').attr('_src');
            // 找到a标签的子标签img并获取alt
            var pic_message = pic.find('a').children('img').attr('alt');
            // 向数组插入数据
            slideListData.push({
                pic_href : pic_href,
                pic_message : pic_message,
                pic_src : pic_src
            });
        });
        // 返回轮播图列表信息
        return slideListData;
    } else {
        console.log('无数据传入！');
    }
}