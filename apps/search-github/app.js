Promise.all([
	System.import('./github-adapter.js'),
	System.import('./vendor/auto-complete/auto-complete.js')
]).then(results => {
	const [githubAdapter, autoComplete] = results;
	let cacheHits = 0;
	let cacheMisses = 0;

	githubAdapter.onCacheHit(() => window.hits.innerHTML = ++cacheHits);
	githubAdapter.onCacheMiss(() => window.misses.innerHTML = ++cacheMisses);
	new autoComplete({
		selector: '#q',
		minChars: 2,
		cache: false,
		delay: 500,
	    source(term, suggest){
	        githubAdapter.search(term.toLowerCase())
	        	.then(matches => suggest(matches))
	        	.catch(() => suggest([]));
	    },
	    onSelect(event, term, item) {
	    	const href = item.getAttribute('data-url');
	    	if (href) {
	    		window.repoLink.href = href;
	    		window.repoLink.innerHTML = `Open ${item.getAttribute('data-val')}`
	    	}
	    },
	    renderItem(item, search){
            search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
            return `<div class="autocomplete-suggestion" data-val="${item.name}" data-url="${item.url}">${item.name.replace(re, "<b>$1</b>")}</div>`;
        },
	});

	window.clearCache.onclick = () => {
		cacheHits = 0
		cacheMisses = 0;
		window.hits.innerHTML = cacheHits;
		window.misses.innerHTML = cacheMisses;
		githubAdapter.clearCache();
	}
});