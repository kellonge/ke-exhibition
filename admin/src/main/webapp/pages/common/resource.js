(function () {
    window['CResource'] = {};
    all = {};
    firstLang = null;
    moreLangs = null;
    init = function () {
        firstLang = getFirstLang();
        moreLangs = getMoreLangs();
        var langs = getLangs();
        for (var i = 0; i < langs.length; i++) {
            all[langs[i].language] = getResources(langs[i].ID);
        }
        list();
        CCore.enterNext();
    };
    list = function () {
        var dom = "<tr><th></th><th></th>";
        dom += "<th>" + firstLang.name + "</th>";
        for (var i = 0; i < moreLangs.length; i++) {
            dom += "<th>" + moreLangs[i].name + "</th>";
        }
        dom += "</tr>";
        for (var i = 0; i < all[firstLang.language].length; i++) {
            if (all[firstLang.language][i].Key != "Common_Prev" && all[firstLang.language][i].Key != "Common_Next" && all[firstLang.language][i].Key.substring(0, 4) != "Dict") {
                dom += "<tr>";
                dom += "<td>" + i + "</td>";
                dom += "<td>" + all[firstLang.language][i].Key + "</td>";
                dom += "<td><input style='width:148px;border:solid 1px #ccc;height:18px;padding:5px;' type='text' id='" + firstLang.language + "_" + all[firstLang.language][i].Key + "' value='" + all[firstLang.language][i].Value + "' /></td>";
                for (var j = 0; j < moreLangs.length; j++) {
                    dom += "<td><input style='width:150px;border:solid 1px #ccc;height:18px;padding:5px;' type='text' id='" + moreLangs[j].language + "_" + all[firstLang.language][i].Key + "' value='" + getValueByKey(moreLangs[j].language, all[firstLang.language][i].Key) + "' onblur=\"update(this)\"/></td>";
                }
                dom += "</tr>";
            }
        }
        $(".list_result").html(dom);
    };
    update = function (dom) {
        var v = $(dom).val();
        var id = $(dom).attr("id");
        CCore.invoke(CCore.servicePath("/service/core/updateresource"), { "ID": id, "value": v });
        CCore.clearLocalResource();
    };
    getValueByKey = function (lang, key) {
        for (var i = 0; i < all[lang].length; i++) {
            if (all[lang][i].Key == key) {
                return all[lang][i].Value;
            }
        }
    };
    getResources = function (langID) {
        return CCore.invoke(CCore.servicePath("/service/core/getresourcesbylangid"), { "langID": langID });
    };
    getFirstLang = function () {
        return CCore.invoke(CCore.servicePath("/service/core/getfirstlang"));
    };
    getMoreLangs = function () {
        return CCore.invoke(CCore.servicePath("/service/core/getmorelangs"));
    };
    getLangs = function () {
        return CCore.invoke(CCore.servicePath("/service/core/getlangs"));
    };
    window['CResource']['init'] = init;
})();