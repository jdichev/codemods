module.exports = function(file, api) {
	const j = api.jscodeshift;
	const {expression, statement, statements} = j.template;

	return j(file.source)
		.find(j.CallExpression)
		.replaceWith(function (p) {
			if (p.value.callee.hasOwnProperty("object") &&
				p.value.callee.hasOwnProperty("property") &&
				p.value.callee.object.name === "jQuery" &&
				p.value.callee.property.name === "proxy") {

				return j.callExpression(
					j.memberExpression(
						p.value.arguments[0], j.identifier("bind")
					), [p.value.arguments[1]]
				);
			} else {
				return p.value;
			}
		}).toSource();
};
