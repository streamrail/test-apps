export function search(term) {
	return Promise.resolve([{
		name: 'emberjs/ember.js',
		url: 'https://github.com/emberjs/ember.js'
	}, {
		name: 'facebook/react',
		url: 'https://github.com/facebook/react'
	}, {
		name: 'angular/angular',
		url: 'https://github.com/angular/angular'
	}]);
}

export function onCacheHit(callback) {

}

export function onCacheMiss(callback) {

}

export function clearCache() {

}