module.exports = function (file, api) {
	const j = api.jscodeshift;
	const {expression, statement, statements} = j.template;

	return j(file.source)
		.find(j.UnaryExpression, {operator: "delete"})
		.replaceWith(path => {
			return j.assignmentExpression('=', path.node.argument, j.identifier("null"));
		}).toSource();
};

