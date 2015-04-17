var Playground = {
	modules: [],
	init: function() {
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
	addModule: function(moduleData) {
		this.modules.push(moduleData);
	},
	getCurrentModule: function() {
		if (location.hash) {
			for(var idx in this.modules) {
				if ("#" + this.modules[idx].slug == location.hash) {
					return idx;
				}
			}
		}
		return 0;
	},
	getAllModules: function() {
		return this.modules;
	}	
};