(function () {
    window['CMemberList'] = {};
    init = function () {
        list(0);
        bindEvent();
    };
    bindEvent = function () {
        $("#MemberSearch .Button_Search").click(function () { list(0); });
        $("#MemberSearch .Button_Remove").click(remove);
        $("#MemberSearch .Button_Add").click(function () { openPost(null); });
        $("#MemberSearch .Button_Test").click(test);
        CMemberCommon.fillStatus("searchStatusID");
        CMemberCommon.fillGroup("searchGroupID");
    };
    test = function () {
        var param = { 'id': '193' };
        var data = CCore.invoke("http://appservice.mangbaobao.com:8080/Service/BookService/GetfromData1",param);
        console.log(data);
    };
    openPost = function (id) {
        CCore.loadModal('../member/post.htm', 1000, 300, function () { CMemberPost.init(id); });
    };
    openView = function (id) {
        CCore.loadModal('../member/view.htm', 1000, 300, function () { CMemberView.init(id); });
    };
    remove = function () {
        var removedIDs = CCore.getCheckedValue('chkRow');
        CCore.removeData(CCore.servicePath('/service/member/removemembers'), removedIDs);
    };
    list = function (pageIndex) {
        var param = CCore.getFormData('MemberSearch');
        param = CCore.paramPageIndex(pageIndex, param);
        var data = CCore.invoke(CCore.servicePath("/service/member/getmembers"), param);
        CCore.processList("MemberResult", "MemberResultTemplate", data, list);
       	CCore.label("dashboard");
    };
    window['CMemberList']['init'] = init;
    window['CMemberList']['list'] = list;
    window['CMemberList']['openView'] = openView;
    window['CMemberList']['openPost'] = openPost;
})();