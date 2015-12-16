(function () {
    window['CTab'] = {};
    init = function (tabName) {
        loadTab(tabName);
    };

    loadTab = function (tabName) {
        var $tab_li = $('#' + tabName + ' ul li');
        $tab_li.hover(function () {
            $(this).addClass('selected').siblings().removeClass('selected');
            var index = $tab_li.index(this);
            $('div.tab_box > div').eq(index).show().siblings().hide();
        });
    };
    window['CTab']['init'] = init;
})();
