(function () {
	
	var byId = function (id) { return document.getElementById(id); },

		loadScripts = function (desc, callback) {
			var deps = [], key, idx = 0;

			for (key in desc) {
				deps.push(key);
			}

			(function _next() {
				var pid,
					name = deps[idx],
					script = document.createElement('script');

				script.type = 'text/javascript';
				script.src = desc[deps[idx]];

				pid = setInterval(function () {
					if (window[name]) {
						clearTimeout(pid);

						deps[idx++] = window[name];

						if (deps[idx]) {
							_next();
						} else {
							callback.apply(null, deps);
						}
					}
				}, 30);

				document.getElementsByTagName('head')[0].appendChild(script);
			})()
		},

		console = window.console;


	if (!console.log) {
		console.log = function () {
			alert([].join.apply(arguments, ' '));
		};
	}
	
	// Editable list
	var editableList = Sortable.create(byId('editable'), {
		animation: 150,
		filter: '.js-remove',
		onFilter: function (evt) {
			evt.item.parentNode.removeChild(evt.item);
		}
	});

	byId('addUser').onclick = function () {
		Ply.dialog('prompt', {
			title: 'Add',
			form: { name: 'name' }
		}).done(function (ui) {
			var el = document.createElement('li');
			el.innerHTML = ui.data.name + '<i class="js-remove">X</i>';
			editableList.el.appendChild(el);
		});
	};
	
	// Advanced groups
	[{
		name: 'advanced',
		pull: 'clone',
		put: false
	},
	{
		name: 'advanced',
		pull: false,
		put: true
	}
	].forEach(function (groupOpts, i) {
		Sortable.create(byId('advanced-' + (i + 1)), {
			sort: (i != 1),
			group: groupOpts,
			animation: 150,
			filter: '.js-remove',
			onFilter: function (evt) {
				evt.item.parentNode.removeChild(evt.item);
			}
		});
		byId('addUser').onclick = function () {
		Ply.dialog('prompt', {
			title: 'Add',
			form: { name: 'name' }
		}).done(function (ui) {
			var el = document.createElement('li');
			el.innerHTML = ui.data.name + '<i class="js-remove">X</i>';
			editableList.el.appendChild(el);
		});
	};
	});
	
})();