/**
 * Created by lch on 2018/3/27 0027.
 */
var data = {
    code: '001',
    codeName: '文本',
    styleName: "width:100%;font-size:16px;color:#e40000;",
    classObject: ['class1', 'class2'],
    content: '文本',
    title: '标题',
    imgView: {'url': '#', 'src': 'img/index.png'},
    carous: [{'url': '#', 'src': 'img/index.png'}, {'url': '#', 'src': 'img/index.png'}],
    classfiy: [{'url': '#', 'name': '整容'}, {'url': '', 'name': '丰胸'}, {'url': '', 'name': '隆鼻'}, {
        'url': '',
        'name': '变性'
    }],
    imgList: [{'url': '#', 'src': 'img/index.png'}, {'url': '#', 'src': 'img/index.png'}],
    glossary: {'url': '', 'src': 'img/index.png', 'title': '列表一', 'content': '这是列表内容'},
    videoName: ''
};

var TP_TXTINNER = '001',    //文本
    TP_IMGVIEW = '002',     //图片
    TP_BTNBUTTON = '003',    //按钮
    TP_TITLENAME = '004',    //标题
    TP_CAROUSSWIP = '005', //轮播
    TP_CLASSFIY = '006',     //分类
    TP_IMGLIST = '007',  //图片列表
    TP_GLOSSARY = '008',     //图文集
    TP_VIDEONAME = '009',    //视频
    TP_COLUMN = '010',   //双栏
    TP_PANEL = '011',    //面板
    TP_FREEPANEL = '012',    //自由面板
    TP_TOPNAV = '013',   //顶部导航
    TP_BORROMNAV = '014',    //底部导航
    TP_CUTLINE = '015',  //分割线
    TP_DYNAMIC = '016';  //动态分类

/**
 * 初始化组件库
 * */
$(function () {

    creatTargrt(jsonData);    //数据初始化--根据data生成页面

    deleteItem();   //删除组件
    updateItem();   //更新组件

    drapTarget();   //拖拽组件

    $('#tabs-2 .tab-title span').click(function () {
        $(this).addClass('active').siblings('.active').removeClass('active');
        $('#tabs-2 .tab-other table').eq($(this).index()).show().siblings().hide();
    });
});

//拖拽组件
function drapTarget() {
    $("#tabs").tabs();

    $("#tabs-2 .item").draggable({    //左侧组件拖拽
        appendTo: ".currentPage",
        helper: "clone"
    });

    //$(".currentPage>li").resizable();  //右侧组件缩放
    $(".currentPage").sortable({
        placeholder: "ui-state-highlight"
    }).disableSelection();   //右侧组件排序

    $(".currentPage").droppable({     //右侧组件放置
        accept: "#tabs-2 .item",
        cursor: "move",
        drop: function (event, ui) {
            var txt = ui.draggable.text();
            var code = ui.draggable.attr('data-code');
            //$(this).find('.ui-state-highlight,.active').removeClass('ui-state-highlight active');
            //$( "<li></li>" ).text( txt ).appendTo( this );

            switch (code) {

                case TP_TXTINNER: //"文字"
                    var html = template('txtInner', data);
                    $(".currentPage").append(html);

                    $('#aside').html(template('textHtml', {code: code}));
                    updateText();
                    break;
                case TP_IMGVIEW: //"图片"
                    var html2 = template('imgView', data);
                    $(".currentPage").append(html2);

                    $('#aside').html(template('imgHtml', {code: code}));
                    updateImg();
                    break;
                case TP_BTNBUTTON: //"按钮"
                    var html3 = template('btnButton', data);
                    $(".currentPage").append(html3);

                    $('#aside').html(template('btnHtml', {code: code}));
                    updateBtn();
                    break;
                case TP_TITLENAME: //"标题"
                    var html4 = template('titleName', data);
                    $(".currentPage").append(html4);

                    $('#aside').html(template('titleHtml', {code: code}));
                    updateTitle();
                    break;
                case TP_CAROUSSWIP: //"轮播"
                    var html5 = template('carousSwip', data);
                    $(".currentPage").append(html5);

                    $('#aside').html(template('carouselHtml', {code: code}));
                    carousel();
                    updateCarousel();
                    break;
                case TP_CLASSFIY: //"分类"
                    var html6 = template('classfiy', data);
                    $(".currentPage").append(html6);

                    $('#aside').html(template('classfiyHtml', {code: code}));
                    updateClassfiy();
                    break;
                case TP_IMGLIST: //"图片列表"
                    var html7 = template('imgList', data);
                    $(".currentPage").append(html7);

                    $('#aside').html(template('imgListHtml', {code: code}));
                    updateImgList();
                    break;
                case TP_GLOSSARY: //"图文集"
                    var html8 = template('glossary', data);
                    $(".currentPage").append(html8);

                    $('#aside').html(template('glossaryHtml', {code: code}));
                    updateGlossary();
                    break;
                case TP_VIDEONAME: //"视频"
                    var html9 = template('videoName', data);
                    $(".currentPage").append(html9);

                    $('#aside').html(template('videoNameHtml', {code: code}));
                    updateVideo();
                    break;


                case TP_COLUMN: //"双栏"
                    $("<li></li>").text(txt).appendTo(this);
                    break;
                case TP_PANEL: //"面板"
                    $("<li></li>").text(txt).appendTo(this);
                    break;
                case TP_FREEPANEL: //"自由面板"
                    $("<li></li>").text(txt).appendTo(this);
                    break;
                case TP_TOPNAV: //"顶部导航"
                    $("<li></li>").text(txt).appendTo(this);
                    break;
                case TP_BORROMNAV: //"底部导航"
                    var html14 = template('tabBar', data);
                    $(".currentPage").append(html14);

                    $('#aside').html(template('tabBarHtml', {code: code}));
                    updateTabBar();
                    break;
                case TP_CUTLINE: //"分割线"
                    $("<li></li>").text(txt).appendTo(this);
                    break;
                case TP_DYNAMIC: //"动态分类"
                    $("<li></li>").text(txt).appendTo(this);
                    break;

                default :
                    break;
            }

            setTimeout(function () {
                deleteItem();   //删除组件
                updateItem();   //更新组件
            }, 100);
        }
    });

}

/**
 * 数据初始化--根据data生成页面
 * */
var jsonData = [
    {
        pageName: "首页",
        pageCode: "page0",
        initData: [
            {code: "001", codeName: "文本", styleName: "width:100%;font-size:30px;color:#e40000;",className: ["txtInner"], content: "文本"},

            {code: "002", codeName: "图片", styleName: "width:100%;",className: ["imgView"], imgView: {'url': '#', 'src': 'img/index.png'}},

            {code: "003", codeName: "按钮", styleName: "width:100%;",className: ["btnButton"], content: "按钮"},

            {code: "004", codeName: "标题", styleName: "width:100%;",className: ["titleName"], title: "标题"},

            {code: "005", codeName: "轮播", styleName: "width:100%;",autoPlay: "true", interval: "5000",className: ["carousSwip"], carous: [{url: "javascript:;", src: "img/index.png"},{url: "javascript:;", src: "img/index.png"}]},

            {code: "006", codeName: "分类", styleName: "width:100%;",className: ["classfiy"], classfiy: [{url: "javascript:;", name: "整容"},{url:"javascript:;", name: "丰胸"},{url:"javascript:;", name: "隆鼻"},{url:"javascript:;", name: "变性"}]},

            {code: "007", codeName: "图片列表", styleName: "width:100%;",className: ["imgList"], imgList: [{url: "javascript:;", src: "img/index.png"},{url: "javascript:;", src: "img/index.png"}]},

            {code: "008", codeName: "图文集", styleName: "width:100%;",className: ["glossary"], glossary: {url:"javascript:;", src: "img/index.png", title: "列表一", content: "这是列表内容"}},

            {code: "009", codeName: "视频", styleName: "width:100%;",className: ["videoName"], videoName: "img/movie.ogg"}
        ]
    },
    {
        pageName: "列表页",
        pageCode: "page1",
        initData: [
            {code: "004", codeName: "标题", styleName: "width:100%;",className: ["titleName"], title: "标题"},

            {code: "005", codeName: "轮播", styleName: "width:100%;",autoPlay: "true", interval: "5000",className: ["carousSwip"], carous: [{url: "javascript:;", src: "img/index.png"},{url: "javascript:;", src: "img/index.png"}]},

            {code: "006", codeName: "分类", styleName: "width:100%;",className: ["classfiy"], classfiy: [{url: "javascript:;", name: "整容"},{url:"javascript:;", name: "丰胸"},{url:"javascript:;", name: "隆鼻"},{url:"javascript:;", name: "变性"}]},

            {code: "007", codeName: "图片列表", styleName: "width:100%;",className: ["imgList"], imgList: [{url: "javascript:;", src: "img/index.png"},{url: "javascript:;", src: "img/index.png"}]},

         ]
    }
];

function creatTargrt(obj) {
    var jsonData = obj;
    for(var j=0;j<jsonData.length;j++){
        var pageName = jsonData[j].pageName;    //页面名称
        var pageCode = jsonData[j].pageCode;    //页面编码
        var pageData = jsonData[j].initData;    //页面数据

        console.log(pageData);

        var uml = '<ul class="mobile_area currentPage" data-count="' + pageCode + '-' + pageCount + '"></ul>';
        $('.phoneMap').find('.mobile_area').removeClass('currentPage').hide();
        $('.phoneMap').append(uml);

        for (var i = 0; i < pageData.length; i++) {
            var code = pageData[i].code;
            switch (code) {

                case TP_TXTINNER: //"文字"
                    var html = template('txtInner', pageData[i]);
                    $('.currentPage').append(html);
                    break;
                case TP_IMGVIEW: //"图片"
                    var html2 = template('imgView', pageData[i]);
                    $('.currentPage').append(html2);
                    break;
                case TP_BTNBUTTON: //"按钮"
                    var html3 = template('btnButton', pageData[i]);
                    $('.currentPage').append(html3);
                    break;
                case TP_TITLENAME: //"标题"
                    var html4 = template('titleName', pageData[i]);
                    $('.currentPage').append(html4);
                    break;
                case TP_CAROUSSWIP: //"轮播"
                    var html5 = template('carousSwip', pageData[i]);
                    $('.currentPage').append(html5);
                    carousel();
                    break;
                case TP_CLASSFIY: //"分类"
                    var html6 = template('classfiy', pageData[i]);
                    $('.currentPage').append(html6);
                    break;
                case TP_IMGLIST: //"图片列表"
                    var html7 = template('imgList', pageData[i]);
                    $('.currentPage').append(html7);
                    break;
                case TP_GLOSSARY: //"图文集"
                    var html8 = template('glossary', pageData[i]);
                    $('.currentPage').append(html8);
                    break;
                case TP_VIDEONAME: //"视频"
                    var html9 = template('videoName', pageData[i]);
                    $('.currentPage').append(html9);
                    break;


                case TP_COLUMN: //"双栏"
                    $("<li></li>").text(txt).appendTo(this);
                    break;
                case TP_PANEL: //"面板"
                    $("<li></li>").text(txt).appendTo(this);
                    break;
                case TP_FREEPANEL: //"自由面板"
                    $("<li></li>").text(txt).appendTo(this);
                    break;
                case TP_TOPNAV: //"顶部导航"
                    $("<li></li>").text(txt).appendTo(this);
                    break;
                case TP_BORROMNAV: //"底部导航"
                    $("<li></li>").text(txt).appendTo(this);
                    break;
                case TP_CUTLINE: //"分割线"
                    $("<li></li>").text(txt).appendTo(this);
                    break;
                case TP_DYNAMIC: //"动态分类"
                    $("<li></li>").text(txt).appendTo(this);
                    break;

                default :
                    break;
            }
        }

        var xml = '<li class="page" data-count="' + pageCode + '-' + pageCount + '"><span>'+pageName+'</span>' +
            '<i class="fa fa-pencil-square-o edit" aria-hidden="true" onclick="editPage(this)" title="编辑名称"></i>' +
            '<i class="fa fa-trash-o delete" aria-hidden="true" onclick="deletePage(this)" title="删除"></i>' +
            '<div class="edit-input"><input type="text"/><a class="ok">确定</a><a class="no">取消</a></div></div></li>';
        $('#tabs-1 .currentFile ul').append(xml);

        pageManager();
        drapTarget();   //拖拽组件

        //默认显示首页
        setTimeout(function () {
            $('.phoneMap').find('.mobile_area').removeClass('currentPage').hide().eq(0).addClass('currentPage').show();
            $('#tabs-1 .currentFile ul>li').eq(0).addClass('active').siblings('.active').removeClass('active');
        },100);

    }
}

/**
 * 保存数据-生成json结构
 * */
$(function () {
    pageManager();

    $('#saveAll').click(function () {
        var pageArry = [];
        //var pageData = {};  //页面集合


        var pageSize = $('.phoneMap .mobile_area');
        pageSize.each(function (i) {
            var that = this;
            var len = $('li', that);   //遍历查询当前单个页面currentPage
            var jsonData = [];  //每个页面对应的组件集合
            var pageName = $(that).attr('data-count');
            len.each(function () {
                var code = $(this).attr('data-code');
                var style = $(this).attr('style');  //输出字符串
                //var style = $(this).attr('style').split(';').slice(0,-1);   //styleName:Array(3)["width:100%", "font-size:30px", "color:#e40000"]
                /* for(var s=0;s<style.length;s++){
                 var sn = style[s].replace(':','":"');
                 style[s] = sn;          //styleName:Array(3)["width":"100%", "font-size":"30px", "color":"#e40000"]
                 }*/

                var className = $(this).attr('class').split(' ');
                var obj = {};
                switch (code) {
                    case TP_TXTINNER:   //文本
                        var content = $(this).text().trim();
                        obj = {
                            'code': code,
                            codeName: '文本',
                            'styleName': style,
                            'className': className,
                            'content': content
                        };
                        break;
                    case TP_IMGVIEW:    //图片
                        var url = $(this).find('a').attr('href');
                        var src = $(this).find('img').attr('src');
                        var imgView = {'url': url, 'src': src};
                        obj = {
                            'code': code,
                            codeName: '图片',
                            'styleName': style,
                            'className': className,
                            'imgView': imgView
                        };
                        break;
                    case TP_BTNBUTTON:  //按钮
                        var content = $(this).text().trim();
                        obj = {
                            'code': code,
                            codeName: '按钮',
                            'styleName': style,
                            'className': className,
                            'content': content
                        };
                        break;
                    case TP_TITLENAME:  //标题
                        var title = $(this).text().trim();
                        obj = {
                            'code': code,
                            codeName: '标题',
                            'styleName': style,
                            'className': className,
                            'title': title
                        };
                        break;
                    case TP_CAROUSSWIP: //轮播
                        var carous = [];
                        var imgSum = $(this).find('.swiper-container a');
                        var autoPlay = $(this).attr('data-autoPlay');
                        var interval = $(this).attr('data-interval');
                        var swip = {};
                        for (var i = 0; i < imgSum.length / 2; i++) {
                            swip = {'url': imgSum.eq(i).attr('href'), 'src': imgSum.eq(i).find('img').attr('src')};
                            carous.push(swip);
                        }
                        obj = {
                            'code': code,
                            codeName: '轮播',
                            'autoPlay': autoPlay,
                            'interval': interval,
                            'styleName': style,
                            'className': className,
                            'carous': carous
                        };
                        break;
                    case TP_CLASSFIY:   //分类
                        var fiy = $(that).find('a');
                        var classfiy = [];
                        var tt = {};
                        fiy.each(function (i) {
                            var url = $(this).attr('href');
                            var name = $(this).html().trim();
                            tt = {'url': url, 'name': name};
                            classfiy.push(tt);
                        });
                        obj = {
                            'code': code,
                            codeName: '分类',
                            'styleName': style,
                            'className': className,
                            'classfiy': classfiy
                        };
                        break;
                    case TP_IMGLIST:    //图片列表
                        var list = $(that).find('a');
                        var imgList = [];
                        var img = {};
                        list.each(function (i) {
                            var url = $(this).attr('href');
                            var src = $(this).find('img').attr('src');
                            img = {'url': url, 'src': src};
                            imgList.push(img);
                        });
                        obj = {
                            'code': code,
                            codeName: '图片列表',
                            'styleName': style,
                            'className': className,
                            'imgList': imgList
                        };
                        break;
                    case TP_GLOSSARY:   //图文集
                        var url = $(this).find('a').attr('href');
                        var src = $(this).find('img').attr('src');
                        var title = $(this).find('h5').html();
                        var content = $(this).find('p').html().trim();

                        obj = {
                            'code': code,
                            codeName: '图文集',
                            'styleName': style,
                            'className': className,
                            glossary: {'url': url, 'src': src, 'title': title, 'content': content}
                        };
                        break;
                    case TP_VIDEONAME:  //视频
                        var videoName = $(this).find('video').attr('src');
                        obj = {
                            'code': code,
                            codeName: '视频',
                            'styleName': style,
                            'className': className,
                            'videoName': videoName
                        };
                        break;

                    default :
                        console.log('保存成功！');
                        break;

                }
                jsonData.push(obj);
            });

            var pageData = {'pageName': pageName, 'jsonData': jsonData};
            pageArry.push(pageData);
        });

        console.log(pageArry);  //输出json数据对象
    });
});

/***********页面管理--开始************/
function pageManager() {
    $('#tabs-1 li.page').each(function (i) {
        $(this).click(function () {
            $('#tabs-1 li.active').removeClass('active');
            $(this).parents('.pageFile').addClass('currentFile').siblings('.currentFile').removeClass('currentFile');
            $(this).addClass('active').siblings('.active').removeClass('active');

            $('.phoneMap .currentPage').removeClass('currentPage');
            //$('.phoneMap .mobile_area').hide().eq(i).show().addClass('currentPage');
            $('.phoneMap .mobile_area').hide();

            var count = $(this).attr('data-count');
            $('.phoneMap .mobile_area[data-count="' + count + '"]').show().addClass('currentPage');

            carousel();
        });
    });

}
//编辑界面
function editPage(self) {
    $(self).parent('.page').addClass('active').siblings('.active').removeClass('active');
    var vml = $(self).siblings('span').html().trim();
    $(self).siblings('.edit-input').show().find('input').val(vml);
    $(self).siblings('span').hide();

    $(self).siblings('.edit-input').find('.ok').click(function () {
        $(self).siblings('span').html($(this).siblings('input').val());
        $(self).siblings('.edit-input').hide();
        $(self).siblings('span').show();
    });

    $(self).siblings('.edit-input').find('.no').click(function () {
        $(self).siblings('.edit-input').hide();
        $(self).siblings('span').show();
    });
}
//删除界面
function deletePage(self) {
    var count = $(self).parent('.page').attr('data-count');

    $.confirm({
        title: '提示',
        text: '您确定要删除该项吗？',
        onOK: function () {
            //点击确认
            $(self).parent('.page').remove();
            $('.phoneMap .mobile_area[data-count="' + count + '"]').remove();
        },
        onCancel: function () {
        }
    });
}
//添加界面
var pageCount = 0;
function addPage() {

    var file = $('#tabs-1 .currentFile').attr('data-count');    //当前分组
    //var count = ($('#tabs-1 .currentFile ul li').length)?$('#tabs-1 .currentFile ul li').length:0;
    pageCount = ($('#tabs-1 .currentFile ul li').length > pageCount) ? $('#tabs-1 .currentFile ul li').length : (pageCount + 1);
    var xml = '<li class="page" data-count="' + file + '-' + pageCount + '"><span>新页面</span>' +
        '<i class="fa fa-pencil-square-o edit" aria-hidden="true" onclick="editPage(this)" title="编辑名称"></i>' +
        '<i class="fa fa-trash-o delete" aria-hidden="true" onclick="deletePage(this)" title="删除"></i>' +
        '<div class="edit-input"><input type="text"/><a class="ok">确定</a><a class="no">取消</a></div></div></li>';
    $('#tabs-1 .currentFile ul').append(xml);

    var uml = '<ul class="mobile_area currentPage" data-count="' + file + '-' + pageCount + '"></ul>';
    $('.phoneMap').find('.mobile_area').removeClass('currentPage').hide();
    $('.phoneMap').append(uml);


    pageManager();
    drapTarget();   //拖拽组件
}

//添加分组
function addFile() {
    var count = ($('#tabs-1 .pageFile').length) ? $('#tabs-1 .pageFile').length : 0;
    var xml = '<div class="pageFile" data-count="file' + count + '">' +
        '<div class="file-name" onclick="openFile(this)">' +
        '<i class="fa fa-folder-o file" aria-hidden="true"></i>' +
        '<span>新建分组</span>' +
        '<i class="fa fa-pencil-square-o edit" aria-hidden="true" onclick="editFile(this)" title="编辑名称"></i>' +
        '<i class="fa fa-trash-o delete" aria-hidden="true" onclick="deleteFile(this)" title="删除"></i>' +
        '<div class="edit-input">' +
        '<input type="text"/><a class="ok">确定</a><a class="no">取消</a></div>' +
        '</div><ul></ul></div>';
    $('.addPage').before(xml);

    pageManager();
    drapTarget();   //拖拽组件
}
//打开分组
function openFile(self) {
    $(self).toggleClass('openW');
    $(self).parent().addClass('currentFile').siblings('.currentFile').removeClass('currentFile');
}
//编辑分组
function editFile(self) {
    $(self).parent('.page').addClass('active').siblings('.active').removeClass('active');
    var vml = $(self).siblings('span').html().trim();
    $(self).siblings('.edit-input').show().find('input').val(vml);
    $(self).siblings('span').hide();

    $(self).siblings('.edit-input').find('.ok').click(function () {
        $(self).siblings('span').html($(this).siblings('input').val());
        $(self).siblings('.edit-input').hide();
        $(self).siblings('span').show();
    });

    $(self).siblings('.edit-input').find('.no').click(function () {
        $(self).siblings('.edit-input').hide();
        $(self).siblings('span').show();
    });
}
//删除分组
function deleteFile(self) {
    var count = $(self).parents('.pageFile').attr('data-count');//根据关键字实现模糊查询
    var list = $('.phoneMap .mobile_area');
    var len = list.length;

    $.confirm({
        title: '提示',
        text: '您确定要删除该项吗？',
        onOK: function () {
            //点击确认
            $(self).parents('.pageFile').remove();

            for (var i = 0; i < len; i++) {
                //如果字符串中不包含目标字符会返回-1
                if (list.eq(i).attr('data-count').indexOf(count) >= 0) {
                    list.eq(i).remove();
                }
            }
        },
        onCancel: function () {
        }
    });
}

/***********页面管理--结束************/


/*删除组件*/
function deleteItem() {
    $('#jsApp .rtnr .currentPage > li').each(function () {
        $(this).hover(function () {
            $('.fa-window-close-o', this).remove();
            $(this).addClass('border').append('<i class="fa fa-window-close-o" aria-hidden="true"></i>');
            $('.fa-window-close-o', this).click(function () {
                $(this).parent().remove();
            })
        }, function () {
            $(this).removeClass('border');
            $('.fa-window-close-o', this).remove();
        })
    });

}

/*轮播组件*/
function carousel() {
    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: true,//可选选项，自动滑动
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination'
        }
    })
}

/*修改组件*/
function updateItem() {
    $('.currentPage li').each(function () {
        $(this).click(function () {
            $(this).addClass('active clk').siblings().removeClass('active clk');
            var code = $(this).attr("data-code");
            console.log(code);
            switch (code) {
                case TP_TXTINNER:   //文本
                    //$('#aside .textHtml').show().siblings().hide();
                    $('#aside').html(template('textHtml', {code: code}));
                    updateText();
                    break;
                case TP_IMGVIEW:    //图片
                    //$('#aside .imgHtml').show().siblings().hide();
                    $('#aside').html(template('imgHtml', {code: code}));
                    updateImg();
                    break;
                case TP_BTNBUTTON:  //按钮
                    //$('#aside .btnHtml').show().siblings().hide();
                    $('#aside').html(template('btnHtml', {code: code}));
                    updateBtn();
                    break;
                case TP_TITLENAME:  //标题
                    //$('#aside .titleHtml').show().siblings().hide();
                    $('#aside').html(template('titleHtml', {code: code}));
                    updateTitle();
                    break;
                case TP_CAROUSSWIP: //轮播
                    //$('#aside .carouselHtml').show().siblings().hide();
                    $('#aside').html(template('carouselHtml', {code: code}));
                    updateCarousel();
                    break;
                case TP_CLASSFIY:   //分类
                    //$('#aside .classfiyHtml').show().siblings().hide();
                    $('#aside').html(template('classfiyHtml', {code: code}));
                    updateClassfiy();
                    break;
                case TP_IMGLIST:    //图片列表
                    //$('#aside .imgListHtml').show().siblings().hide();
                    $('#aside').html(template('imgListHtml', {code: code}));
                    updateImgList();
                    break;
                case TP_GLOSSARY:   //图文集
                    //$('#aside .glossaryHtml').show().siblings().hide();
                    $('#aside').html(template('glossaryHtml', {code: code}));
                    updateGlossary();
                    break;
                case TP_VIDEONAME:  //视频
                    //$('#aside .videoNameHtml').show().siblings().hide();
                    $('#aside').html(template('videoNameHtml', {code: code}));
                    updateVideo();
                    break;

                case TP_BORROMNAV:  //底部导航
                    //$('#aside .tabBarHtml').show().siblings().hide();
                    $('#aside').html(template('tabBarHtml', {code: code}));
                    updateTabBar();
                    break;

                default :
                    console.log('保存成功！');
                    break;

            }

        });
    });
}

/*上传图片*/
function readAsDataURL(self) {
    var preview = $(self).parents('.uploadDiv').find('img');    //预览图片对象
    var file = self.files[0];

    //判断浏览器是否支持FileReader接口
    if (typeof FileReader == 'undefined') {
        preview.parents('.uploadDiv').InnerHTML = "<p>你的浏览器不支持FileReader接口！</p>";
        //使选择控件不可操作
        self.setAttribute("disabled", "disabled");
    }

    //检验是否为图像文件
    if (!/image\/\w+/.test(file.type)) {
        alert("看清楚，这个需要图片！");
        return false;
    }

    var reader = new FileReader();

    //将文件以Data URL形式读入页面
    reader.readAsDataURL(file); // 读取的内容是加密以后的本地文件路径
    reader.onload = function (e) {
        preview.attr('src', reader.result);
        $(self).attr('src', reader.result);
    }

}

/*上传视频*/
function readAsVideo(self) {
    var files = self.files,
    //video = $(self).parents('.uploadDiv').find('video'),
        videoURL = null,
        windowURL = window.URL || window.webkitURL;
    if (files && files[0]) {

        videoURL = windowURL.createObjectURL(files[0]);

        $('.currentPage .active>div').html('<video src="' + videoURL + '" controls="controls"></video>');

        console.log(videoURL);  //视频路径
        setTimeout(function () {
            createIMG(self);
        }, 500);
    }
}

/*视频预览*/
function createIMG(self) {
    var scale = 0.25,
        video = $('.currentPage .active>div').find('video')[0],
        canvas = document.createElement("canvas"),
        canvasFill = canvas.getContext('2d');
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;
    canvasFill.drawImage(video, 0, 0, canvas.width, canvas.height);

    var src = canvas.toDataURL("image/jpeg");
    console.log(src);
    $(self).parents('.uploadDiv').find('img').attr('src', src);
}

/*RGB颜色转换为16进制*/
function colorRGB2Hex(color) {
    var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);

    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
}

/**********************更新组件******************/
//文字
function updateText() {
    setTimeout(function () {
        $('#aside .textHtml .txtSize').val(($('.currentPage .active').css('font-size').split('px'))[0]);
        $('#aside .textHtml .txtArea').html($('.currentPage .active>div').text());
        $('#aside .textHtml .txtHeight').val(($('.currentPage .active').css('line-height').split('px'))[0]);

        var rgb = $('.currentPage .active').css('color');
        $('#aside .textHtml .txtColor').val(colorRGB2Hex(rgb));
        //console.log(colorRGB2Hex(rgb));

    }, 100);

    $('#aside .textHtml .txtSize').click(function () {
        $('.currentPage .active').css('fontSize', $(this).val() + 'px');
    });
    $('#aside .textHtml .txtArea').keyup(function () {
        $('.currentPage .active>div').text($(this).val());
    });
    $('#aside .textHtml .txtColor').change(function () {
        $('.currentPage .active').css("color", $(this).val());
    });
    $('#aside .textHtml .txtHeight').click(function () {
        $('.currentPage .active').css('lineHeight', $(this).val() + 'px');
    });
    $('#aside .textHtml .adr').click(function () {
        $(this).addClass('st').siblings('.st').removeClass('st');
        $('.currentPage .active').css('text-align', $(this).attr('data-style'));
    });
}
//图片
function updateImg() {
    setTimeout(function () {
        $('#aside .imgHtml .imgH').val(($('.currentPage .active').css('height').split('px'))[0]);
        $('#aside .imgHtml .imgW').val(($('.currentPage .active').css('width').split('px'))[0]);

        $('#aside .imgHtml .uploadDiv img').attr('src', $('.currentPage .active>div img').attr('src'));
    }, 100);

    $('#aside .imgHtml .imgH').click(function () {
        $('.currentPage .active').css('height', $(this).val() + 'px');
    });

    $('#aside .imgHtml .imgW').click(function () {
        $('.currentPage .active').css('width', $(this).val() + 'px');
    });

    $('#aside .imgHtml .uploadImg input[type=file]').change(function () {
        var that = this;
        readAsDataURL(this);
        setTimeout(function () {
            $('.currentPage .active img').attr('src', $(that).attr('src'));
        }, 500)
    });

    $('#aside .imgHtml .adr').click(function () {
        $(this).addClass('st').siblings('.st').removeClass('st');
        $('.currentPage .active').css('margin', $(this).attr('data-style'));
    });

    sliderOpacity();
}
//按钮
function updateBtn() {
    setTimeout(function () {
        $('#aside .btnHtml .txtSize').val(($('.currentPage .active').css('font-size').split('px'))[0]);
        $('#aside .btnHtml input.btnTxt').val($('.currentPage .active button').text());
    }, 100);

    $('#aside .btnHtml .txtSize').click(function () {
        $('.currentPage .active').css('fontSize', $(this).val() + 'px');
    });

    $('#aside .btnHtml input.btnTxt').keyup(function () {
        $('.currentPage .active button').text($(this).val());
    });

    $('#aside .btnHtml .adr').click(function () {
        $(this).addClass('st').siblings('.st').removeClass('st');
        $('.currentPage .active').css('text-align', $(this).attr('data-style'));
    });
    $('#aside .btnHtml .txtColor').change(function () {
        $('.currentPage .active button').css("background", $(this).val());
    });

    sliderOpacity();
}
//透明度-滑块
function sliderOpacity() {
    $("#aside .slider-range-min").slider({
        range: "min",
        value: 100,
        min: 0,
        max: 100,
        slide: function (event, ui) {
            $(this).siblings('span.slider-value').text(ui.value + '%');
            $('.currentPage .active').css('opacity', ui.value / 100);
        }
    });
}
//标题
function updateTitle() {
    setTimeout(function () {
        $('#aside .titleHtml .txtSize').val(($('.currentPage .active').css('font-size').split('px'))[0]);
        $('#aside .titleHtml .txtHeight').val(($('.currentPage .active').css('line-height').split('px'))[0]);
        $('#aside .titleHtml input.titleTxt').val($('.currentPage .active h3').text());
        var rgb = $('.currentPage .active').css('color');
        $('#aside .titleHtml .txtColor').val(colorRGB2Hex(rgb));
    }, 100);

    $('#aside .titleHtml .txtSize').click(function () {
        $('.currentPage .active').css('fontSize', $(this).val() + 'px');
    });
    $('#aside .titleHtml .txtHeight').click(function () {
        $('.currentPage .active').css('lineHeight', $(this).val() + 'px');
    });
    $('#aside .titleHtml input.titleTxt').keyup(function () {
        $('.currentPage .active h3').text($(this).val());
    });
    $('#aside .titleHtml .adr').click(function () {
        $(this).addClass('st').siblings('.st').removeClass('st');
        $('.currentPage .active').css('text-align', $(this).attr('data-style'));
    });
    $('#aside .titleHtml .txtColor').change(function () {
        $('.currentPage .active').css("color", $(this).val());
    });
}
//轮播
function updateCarousel() {
    setTimeout(function () {
        $('#aside .carouselHtml input.carousH').val(($('.currentPage .active').css('height').split('px'))[0]);
    }, 100);

    $('#aside .carouselHtml input.carousH').click(function () {
        $('.currentPage .active').css('height', $(this).val());
    });

    $('#aside .carouselHtml input.carousT').click(function () {
        $('.currentPage .active').attr('data-interval', $(this).val());
    });

    $('#aside .carouselHtml input.switch').click(function () {
        if ($(this).prop('checked')) {
            $('.currentPage .active').attr('data-autoPlay', 'true');
        } else {
            $('.currentPage .active').attr('data-autoPlay', 'false');
        }
    });

    //carousChange(); //替换轮播图片

    //添加分类
    var len = $('#aside .carouselHtml .img-list').length;
    $('#aside .carouselHtml .addFiy').click(function () {
        len++;
        var sr = '<div class="img-list"><span class="tit" onclick="carousChange(this)">图片' + len + '：<i class="fa fa-trash-o" aria-hidden="true" onclick="deleteCarous(this)"></i> </span>' +
            '<div class="uploadDiv"><img src="img/index.png" alt=""/><div class="uploadImg">' +
            '<input type="file"/><span>更换图片</span></div></div></div>';
        $('.carouselHtml').append(sr);

        //carousChange();
    });
}
//替换轮播图片
function carousChange(self) {
    $(self).toggleClass('openW');

    $('.uploadImg input[type=file]', $(self).siblings('.uploadDiv')).change(function () {
        var me = this;
        readAsDataURL(me);
        setTimeout(function () {
            $('.currentPage .active .swiper-slide').eq($(self).parent('.img-list').index() - 4).find('img').attr('src', $(me).attr('src'));
        }, 500)
    });

}
//删除轮播图
function deleteCarous(self) {

    $.confirm({
        title: '提示',
        text: '您确定要删除该项吗？',
        onOK: function () {
            //点击确认
            $(self).parents('.img-list').remove();
        },
        onCancel: function () {
        }
    });
}


//分类
function updateClassfiy() {
    var that = this;
    setTimeout(function () {
        $('#aside .classfiyHtml .fiySize').val(($('.currentPage .active').css('font-size').split('px'))[0]);

        $('.currentPage .active>div>a').each(function (i) {
            $('#aside .classfiyHtml .img-list input').eq(i).val($(this).text());
        });

        var rgb = $('.currentPage .active').css('color');
        $('#aside .classfiyHtml .txtColor').val(colorRGB2Hex(rgb));
        //console.log(colorRGB2Hex(rgb));

    }, 100);

    $('#aside .classfiyHtml .fiySize').click(function () {
        $('.currentPage .active').css('fontSize', $(this).val() + 'px');
        $('.currentPage .active *').css('fontSize', $(this).val() + 'px');
    });


    connectFiy();

    $('#aside .classfiyHtml .txtColor').change(function () {
        $('.currentPage .active').css("color", $(this).val());
        $('.currentPage .active *').css("color", $(this).val());
    });

    //添加分类
    var len = $('#aside .classfiyHtml .fa-trash-o').length;
    $('#aside .classfiyHtml .addFiy').click(function () {
        len++;
        var sr = '<div class="img-list"><span class="tit" onclick="carousChange(this)">分类' + len + '：<i class="fa fa-trash-o" aria-hidden="true" onclick="deleteFiy(this)"></i> </span>' +
            '<div class="uploadDiv"><input type="text" value="分类' + len + '"/></div></div>';
        $(this).before(sr);
        $('.currentPage .active>div').append('<a href="javascript:;">分类' + len + '</a>');
        connectFiy();
    });
}
//删除分类
function deleteFiy(self) {
    console.log(self);

    $.confirm({
        title: '提示',
        text: '您确定要删除该项吗？',
        onOK: function () {
            //点击确认
            $('.currentPage .active>div>a').eq($(self).parents('.img-list').index()).remove();
            $(self).parents('.img-list').remove();
        },
        onCancel: function () {
        }
    });
}
//关联分类
function connectFiy() {
    $('#aside .classfiyHtml .img-list input').each(function (i) {
        $(this).keyup(function () {
            $('.currentPage .active>div>a').eq(i).text($(this).val().trim());
        });
    });
}


//图片列表
function updateImgList() {
    setTimeout(function () {
        $('#aside .imgListHtml input.imgH').val(($('.currentPage .active').css('height').split('px'))[0]);
    }, 100);

    $('#aside .imgListHtml input.imgH').click(function () {
        $('.currentPage .active').css('height', $(this).val());
    });

    //添加图片
    var len = $('#aside .imgListHtml .img-list').length;
    $('#aside .imgListHtml .addFiy').click(function () {
        len++;
        var sr = '<div class="img-list"><span class="tit" onclick="imgListChange(this)">图片' + len + '：<i class="fa fa-trash-o" aria-hidden="true" onclick="deleteImgList(this)"></i> </span>' +
            '<div class="uploadDiv"><img src="img/index.png" alt=""/><div class="uploadImg">' +
            '<input type="file"/><span>更换图片</span></div></div></div>';
        $(this).before(sr);

        $('.currentPage .active .imgBox').append('<a href="javascript:;"><img src="img/index.png"/></a>');
    });
}
function imgListChange(self) {
    $(self).toggleClass('openW');

    $('.uploadImg input[type=file]', $(self).siblings('.uploadDiv')).change(function () {
        var me = this;
        readAsDataURL(me);

        setTimeout(function () {
            $('.currentPage .active .imgBox>a').eq($(self).parent('.img-list').index()).find('img').attr('src', $(me).attr('src'));
        }, 500)
    });

}
function deleteImgList(self) {
    $.confirm({
        title: '提示',
        text: '您确定要删除该项吗？',
        onOK: function () {
            //点击确认
            $('.currentPage .active .imgBox>a').eq($(self).parents('.img-list').index()).remove();
            $(self).parents('.img-list').remove();
        },
        onCancel: function () {
        }
    });
}

//图文集
function updateGlossary() {
    setTimeout(function () {
        $('#aside .glossaryHtml .txtSize').val(($('.currentPage .active').css('font-size').split('px'))[0]);
        $('#aside .glossaryHtml input.title').val($('.currentPage .active h5').text());
        $('#aside .glossaryHtml textarea').html($('.currentPage .active>div p').text());
        $('#aside .glossaryHtml .uploadDiv img').attr('src', $('.currentPage .active>div img').attr('src'));
    }, 100);

    $('#aside .glossaryHtml .txtSize').click(function () {
        $('.currentPage .active').css('fontSize', $(this).val() + 'px');
    });

    $('#aside .glossaryHtml input.title').keyup(function () {
        $('.currentPage .active h5').text($(this).val());
    });
    $('#aside .glossaryHtml textarea').keyup(function () {
        $('.currentPage .active p').text($(this).val());
    });
    $('#aside .glossaryHtml .uploadImg input[type=file]').change(function () {
        var that = this;
        readAsDataURL(this);
        setTimeout(function () {
            $('.currentPage .active img').attr('src', $(that).attr('src'));
        }, 500)
    });
}
//视频
function updateVideo() {

    $('#aside .videoNameHtml .uploadImg input[type=file]').change(function () {
        readAsVideo(this);
    });
}


//底部导航
function updateTabBar(){
    var that = this;
    setTimeout(function () {
        $(".currentPage").css('height','calc(100% - 48px)');

        $('#aside .tabBarHtml .fiySize').val(($('.currentPage .active').css('font-size').split('px'))[0]);

        $('.currentPage .active .weui-tabbar__item').each(function (i) {
            $('#aside .tabBarHtml .img-list input').eq(i).val($('.weui-tabbar__label',this).text());
        });

        var rgb = $('.currentPage .active').css('color');
        $('#aside .tabBarHtml .txtColor').val(colorRGB2Hex(rgb));
        //console.log(colorRGB2Hex(rgb));
    },100);


    $('#aside .tabBarHtml .fiySize').click(function () {
        $('.currentPage .active').css('fontSize', $(this).val() + 'px');
        $('.currentPage .active *').css('fontSize', $(this).val() + 'px');
    });

    connectTab();

    $('#aside .tabBarHtml .txtColor').change(function () {
        $('.currentPage .active').css("color", $(this).val());
        $('.currentPage .active .weui-tabbar__label').css("color", $(this).val());
    });

    //添加分类
    var len = $('#aside .tabBarHtml .fa-trash-o').length;
    $('#aside .tabBarHtml .addFiy').click(function () {
        len++;
        var sr = '<div class="img-list"><span class="tit" onclick="carousChange(this)">分类' + len + '：<i class="fa fa-trash-o" aria-hidden="true" onclick="deleteTab(this)"></i> </span>' +
            '<div class="uploadDiv"><input type="text" value="导航' + len + '"/></div></div>';
        $(this).before(sr);

        var nav = '<a href="javascript:;" class="weui-tabbar__item">' +
            '<div class="weui-tabbar__icon"><i class="fa fa-question-circle-o" aria-hidden="true"></i></div>' +
            '<p class="weui-tabbar__label">导航</p></a>';
        $('.currentPage .active').append(nav);
        connectTab();
    });
}
//删除底部导航
function deleteTab(self) {
    console.log(self);

    $.confirm({
        title: '提示',
        text: '您确定要删除该项吗？',
        onOK: function () {
            //点击确认
            $('.currentPage .active>a.weui-tabbar__item').eq($(self).parents('.img-list').index()).remove();
            $(self).parents('.img-list').remove();
        },
        onCancel: function () {
        }
    });
}
//关联分类
function connectTab() {
    $('#aside .tabBarHtml .img-list input').each(function (i) {
        $(this).keyup(function () {
            $('.currentPage .active .weui-tabbar__label').eq(i).text($(this).val().trim());
        });
    });
}
