function stringStartsWith(s, prefix) {
	if(!s) return false
	return s.lastIndexOf(prefix, 0) === 0
}