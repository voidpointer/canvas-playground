var Playground = {
	modules: [],
	init: function() {
		this.initModules();
		this.initViewSource();
	},
	initModules: function() {
		var mods = this.getAllModules();

		// function to select module (update button selection and render module)
		var getModuleSelectFuncFirstRun = true;
		var getModuleSelectFunc = function(idx) {
			return function() {
				// update selected button
				$("#pgModules button").removeClass("active");
				$("button[data-slug=" + mods[idx].slug + "]").addClass("active");

				// update visibility of selected controls
				$("#pgControls>div").hide();
				$("#pgControls>div[data-slug=" + mods[idx].slug + "]").show();

				// update URL
				if (!getModuleSelectFuncFirstRun) {
					history.pushState(null, null, "#" + mods[idx].slug);
				} else {
					getModuleSelectFuncFirstRun = false;
				}

				Playground.setCurrentModule(idx);
				Playground.hideSource();

				mods[idx].obj.render();
			}
		};

		// initialize all modules
		for(var idx in mods) {
			// add module button to top menu
			var el = $("<button>")
				.text(mods[idx].name)
				.attr("data-slug", mods[idx].slug)
				.click(getModuleSelectFunc(idx));
			el.appendTo("#pgModules");

			// init controls for module
			var el = $("<div>")
				.css("display", "none")
				.attr("data-slug", mods[idx].slug);
			$("#pgControls").append(el);
			mods[idx].obj.initControls(el);
		}

		// get default module and render it
		var idx = this.getCurrentModule();
		getModuleSelectFunc(idx)();
	},
	initViewSource: function() {
		$("#pgViewSource button").click(function() {
			if ($("#pgViewSource button").hasClass("active")) {
				Playground.hideSource();
			} else {
				Playground.showSource();
			}
		});
	},
	hideSource: function() {
		$("#pgSource").hide();
		$("#pgViewSource button").removeClass("active");
	},
	showSource: function() {
		$("#pgSource").html("").show();
		$("#pgViewSource button").addClass("active");

		var mods = Playground.getAllModules();
		var modIdx = Playground.getCurrentModule();
		for(var idx in mods[modIdx].source) {
			// create container for each source file
			var filename = mods[modIdx].source[idx];
			var el = $("<div class='file'><div class='filename'></div><pre><code>Loading&hellip;</code></pre></div>");
			$(".filename", el).html(filename);
			el.appendTo("#pgSource");

			// load in source file
			var result = function(el, filename) {
				$.get(filename, function(code) {
					$("code", el).text(code);
				});
			}(el, filename);
		}
	},
	addModule: function(moduleData) {
		this.modules.push(moduleData);
	},
	getCurrentModule: function() {
		if (this.currentModule != undefined) {
			return this.currentModule;
		}

		// try to determine from url hash
		if (location.hash) {
			for(var idx in this.modules) {
				if ("#" + this.modules[idx].slug == location.hash) {
					return idx;
				}
			}
		}
		return 0;
	},
	setCurrentModule: function(idx) {
		this.currentModule = idx;
	},
	getAllModules: function() {
		return this.modules;
	}	
};