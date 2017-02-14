var assert = chai.assert;

describe("Promise.all", function () {
	describe("Resolves", function () {
		it("resolves an empty array", function (done) {
			Promise.all([]).then(results => {
				assert.equal(results.length, 0);
				done();
			}).catch(done);
		});

		it("resolves in order", function (done) {
			Promise.all([1,2,3,4,5].map(i => new Promise(res => {
					setTimeout(res.bind(null, i), 5 - i)
				})))
				.then(results => {
					assert.equal(results.join(''), '12345');
					done();
				}).catch(done);
		});
	});

	describe("Rejects", function () {
		it("rejects even when one promise fails", function (done) {
			Promise.all([
				Promise.resolve(),
				Promise.reject(new Error()),
				Promise.resolve()
			]).then(() => {
				done(new Error('did not reject an array with at least one rejection'));
			}).catch(e => {
				assert.ok(true);
				done();
			});
		});
		it("rejects with the first rejection error", function (done) {
			const messages = ['m0', 'm1', 'm2']
			Promise.all([
				Promise.delay(200).then(() => Promise.reject(new Error(messages[0]))),
				Promise.delay(100).then(() => Promise.reject(new Error(messages[1]))),
				Promise.delay(50).then(() => Promise.resolve()),
				Promise.delay(300).then(() => Promise.reject(new Error(messages[2])))
			]).then(() => {
				done(new Error('did not reject an array with at least one rejection'));
			}).catch(e => {
				assert.equal(e.message, messages[1], 'did not reject with the first failed rejection error');
				done();
			});
		});
	});

	describe("Waits", function () {
		it("Waits for the longest promise", function (done) {
			const timestamp = new Date().getTime();
			Promise.all([100, 200, 1000].map(Promise.delay))
				.timeout(1500)
				.then(() => {
					assert.isAtLeast(new Date().getTime() - timestamp, 1000, 'Resolved to early');
					done();
				}).catch(done);
		});
	});
});