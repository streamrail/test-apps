# [Search Github](http://localhost:3000/apps/search-github)

- Implement an es6-module search adapter for Github repos.
- The search adapter should cache the search results.
- The cache can be cleared via api.
- To run the app that utilizes the search adapter open [http://localhost:3000/apps/search-github](http://localhost:3000/apps/search-github)

## Files to modify
- [github-adapter.js](github-adapter.js)   

## [github-adapter](github-adapter.js) API
#### `search(term)`
Returns a promise of array
- `term` [`String`]  
Each item of the array is a github repository item of the form:  
`{ name:'{repo-full-name}', url: '{repo github url}' }`  
Search should be made via [Github API](https://developer.github.com/v3/search/#search-repositories) by applying [`fetch API`](https://developer.mozilla.org/en/docs/Web/API/Fetch_API)

#### `clearCache()`
Clear the search results cache

#### `onCacheHit(callback)`
Register a callback to be applied when a cache hit occured. The callback should be applied with no arguments.
- `callback` [`Function`] 

#### `onCacheMiss(callback)`
Register a callback to be applied when a cache miss occured. The callback should be applied with no arguments.
- `callback` [`Function`]