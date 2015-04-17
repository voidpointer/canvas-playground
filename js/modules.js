var Modules = {
	modules: [],
	addModule: function(moduleData) {
		this.modules.push(moduleData);
	},
	getCurrentModule: function() {
		return 0;
	},
	getAllModules: function() {
		return this.modules;
	}
};