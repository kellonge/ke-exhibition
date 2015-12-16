(function () {
    window['CDictList'] = {};
    treeDict = null;
    init = function (val) {
        $("#btnAddTop").click(addTop).html(CCore.getValue("Button_Add") + CCore.getValue("Common_DictTop"));
        $("#btnAddSub").click(addSub).html(CCore.getValue("Button_Add") + CCore.getValue("Common_DictSub"));
        $("#btnEdit").click(edit).html(CCore.getValue("Button_Edit")).hide();
        $("#btnRemove").click(remove).html(CCore.getValue("Button_Remove")).hide();
        list();
        treeDict = getTreeDict();
    };
    getTreeDict = function () {
        return $.fn.zTree.getZTreeObj("dict");
    };
    list = function () {
        $("#dict").html("");
        var setting = {
            check: { enable: false },
            data: { key: { title: "title" }, simpleData: { enable: true} },
            view: { showIcon: false },
            callback: { onClick: onClick }
        };
        var allDicts = CCore.getAllDicts(0);
        var nodes = [];
        $.each(allDicts, function (i, dict) {
            if (dict.isReadonly != CDict.Yes) {
                var node = { id: dict.ID, pId: dict.parentID, name: dict.name, title: "" + dict.ID, extension: dict.extension, code: dict.code };
                nodes.push(node);
            }
        });
        $.fn.zTree.init($("#dict"), setting, nodes);
    };
    onClick = function (event, treeId, treeNode, clickFlag) {
        if (isEndLevel(treeNode)) {
            $('#btnRemove').show();
        } else {
            $('#btnRemove').hide();
        }
        var firstNode = getFirstNode(treeNode);
        var totalLevel = firstNode.extension;
        if (CValidator.isNull(totalLevel)) {
            totalLevel = 2;
        }
        if (totalLevel * 4 == treeNode.code.length) {
            $('#btnAddSub').hide();
        } else {
            $('#btnAddSub').show();
        }
        edit();
    };
    getFirstNode = function (treeNode) {
        if (treeNode.pId == 0 || CValidator.isNull(treeNode.pId)) {
            return treeNode;
        }
        var level = treeNode.code.length / 4;
        for (var i = 0; i < level - 1; i++) {
            treeNode = treeNode.getParentNode();
        }
        return treeNode;
    };
    addSub = function () {
        if (CValidator.isNull(treeDict.getSelectedNodes()[0])) {
            CCore.alert(CCore.getValue("Common_PleaseSelect", "Common_DictParent"));
            return false;
        }
        var id = treeDict.getSelectedNodes()[0].id;
        CCore.loadPage('dict_post', '../dict/post.htm', function () { CDictPost.init(id, true); });
    };
    addTop = function () {
		treeDict.cancelSelectedNode();
        CCore.loadPage('dict_post', '../dict/post.htm', function () { CDictPost.init(0, true); });
    };
    edit = function () {
        var id = treeDict.getSelectedNodes()[0].id;
        CCore.loadPage('dict_post', '../dict/post.htm', function () { CDictPost.init(id, false); })
    };
    isEndLevel = function (node) {
        return (node && !node.isParent);
    };
    remove = function () {
        var node = treeDict.getSelectedNodes()[0];
        var url = CCore.servicePath('/service/dict/removedict');
        CCore.removeData(url, node.id, function () { removeDo(node); });
    };
    removeDo = function (node) {
        var nextNode = node.getNextNode();
        treeDict.removeNode(node);
        treeDict.selectNode(nextNode, false);
        $("#dict_post").html("");
    };
    window['CDictList']['init'] = init;
    window['CDictList']['getTreeDict'] = getTreeDict;
    window['CDictList']['list'] = list;
})();
