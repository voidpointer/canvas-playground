var Modules = {
	modules: [],
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