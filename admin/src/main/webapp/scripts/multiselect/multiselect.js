
(function( $ ){
	$.fn.multiSelect = function(dest, options) {
		options = $.extend({
			keepSelected: true,
			autoSubmit: true,
			button_select: null,
			button_select_all: null, 
			button_deselect: null,
			button_deselect_all: null,
			autoSort: true,
			sortType: "value",
			sortDesc: false,
			beforeMove: null,
			afterMove: null
		}, options);
		var $source = this;
		var $dest = $(dest);
		if (options.autoSubmit)
			this.parents("form").submit(function() { selectChildOptions($dest); });
		var sortOptions = function(elem, sortType, desc) {
			var order = desc ? -1 : 1;
			if (typeof sortType == "function") {
				var sort = sortType;
			} else {
				if (sortType == "key") {
					var sort = function(a, b){
						return order * ((b.value < a.value) - (a.value < b.value)); 
					}
				} else {
					var sort = function(a, b) { 
						return order * (($(b).text() < $(a).text()) - ($(a).text() < $(b).text())); 
					}
				}
			}

			var options = $.makeArray($('option', elem).detach()).sort(sort);
			$(elem).append(options);
		}

		// wrapper for sort function
		var sortFunction = function(element) {
			if (!options.autoSort) {
				return;
			}

			sortOptions(element, options.sortType, options.sortDesc);
		}

		// initial sort
		sortFunction($source);
		sortFunction($dest);

		// wrapper for move function
		var moveFunction = function(from, to, action) {
			moveOptions(from, to, action, options.beforeMove, options.afterMove, sortFunction);
		};
		var moveAll = function (from, to) {
			if (options.beforeMove && !options.beforeMove(from, dest, 'all')){
				return;
			}
			$('option', from).attr('selected', 'selected');
			moveFunction(from, to);

			sortFunction(dest);
			options.afterMove && options.afterMove(from, dest, 'all');
		};

		// move elements from source to dest
		$source.dblclick(function() { moveFunction($source, $dest, 'select'); });
		if(options.button_select){
			$(options.button_select).click(function() { moveFunction($source, $dest, 'select'); });
		}
		if(options.button_select_all) {
			$(options.button_select_all).click(function() { moveAll($source, $dest); });
		}
		// move elements from dest to source
		$dest.dblclick(function() { moveFunction($dest, $source, 'deselect'); });
		if(options.button_deselect){
			$(options.button_deselect).click(function() { moveFunction($dest, $source, 'deselect'); });
		}
		if(options.button_deselect_all){
			$(options.button_deselect_all).click(function() { moveAll($dest, $source); });
		}
		return this;

		// moves the options between <select>
		// 'action' param can be 'select', 'deselect' or 'all'
		function moveOptions(from, to, action, beforeMove, afterMove, sortFunction) {
			if (beforeMove && !beforeMove(from, to, action)){
				return;
			}
			$("option:selected", from).each(function() {
				$(this).appendTo(to);
			});

			sortFunction(to);
			afterMove && afterMove(from, to, action);
		}

		// selects all child options
		function selectChildOptions($dest) {
			$dest.children("option").each(function() {
				this.selected = true;
			});
		}
	};
})(jQuery);