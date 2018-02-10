/* 
    //http://data.chinafund.cn
    function strOutSrc (obj, str) {
        var strBack = "";
        obj.each(function (index, item) {
            if (!index) {
                strBack = $(item).find('img')[0].src.match(/\d/g)[0];
            }
            strBack = strBack + str + $(item).find('img')[0].src.match(/\d/g)[0];
        });
        return strBack;
    }

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

*/