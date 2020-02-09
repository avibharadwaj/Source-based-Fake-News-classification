const unknownEndpoint = (req, res) => {
	res.status(404).json({
		error: 'Unknown Endpoint'
	})
}

const errorHandler = (error, req, res, next) => {
	console.log(error)

	// if -- else
	if( error.name === 'TypeError' ) {
		res.json({
			message: 'Internal Server Error, please retry request OR raise an issue'
		})
	}

	next(error)
}

module.exports = {
	unknownEndpoint,
	errorHandler
}