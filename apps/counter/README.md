# Counter ([Demo App](http://sdk.streamrail.com/exam/counter/index.html))
- [`counter.js`](counter.js) is an SDK for creating a counter on a DOM element. The counter counts from `0` to a random number between `10` to `20`.   
- In this assignment you will need to embed [`counter.js`](counter.js) into a simple web app with a basic UI for interacting with the counter.
- [`counter.js`](counter.js) requires an **isolated scope**, so **it has to be loaded within an `iframe` element**.  

## Files to modify
- [script.js](script.js)   

## [`counter.js`](counter.js) API
### `createCounter()`   
Creates a [`Counter`](#counter-1) instance.  
Method is defined on the global scope.
### `Counter`   
#### Methods    
##### `init(element)`   
Initialize Counter.
- `element` [`HTMLElement`] - The element which the counter will use to show the count digits.   

##### `play()`   
Starts or resumes (after pause) the count.    

##### `pause()`   
Pauses the count.   

##### `addEventListener(eventName, handler)`
Attaches an event handler to the counter.
- `eventName` [`String`]
- `handler` [`Function`]    

##### `removeEventListener(eventName, handler)`   
Removes an event handler that has been attached with the counter
- `eventName` [`String`]
- `handler` [`Function`]     

##### `dispose()`    
Destroys the counter and does any necessary cleanup

#### Events
- **`ready`** is dispatched after initializing the counter with the `init` method
- **`start`** is dispatched when the count starts.
- **`q1`** is dispatched when the count reaches the first quartile. For example, if the count is from `0` to `8` then the `mid` event will be dispatched after the count hits `2`.
- **`q2`** is dispatched when the count reaches the mid point. For example, if the count is from `0` to `8` then the `mid` event will be dispatched after the count hits `4`.
- **`q3`** is dispatched when the count reaches the mid point. For example, if the count is from `0` to `8` then the `mid` event will be dispatched after the count hits `6`.
- **`end`** - is dispatched when the count is over.

## App Flow   

Open [http://localhost:3000/apps/counter](http://localhost:3000/apps/counter)   

Implement the following behavior:   
- Load button ([`#loadButton`](index.html#L10))
    - enabled when:
        - by default
    - disabled when:
        - after first click (never enabled again)
    - on click: 
        - Load the [`counter.js`](counter.js) SDK.
        - Create a [`Counter`](#counter-1) instance with [`createCounter`](#createcounter) method.
        - apply [`Counter.init`](#initelement) with the [`#counterElement`](index.html#L17) DOM element.
- Play button ([`#playButton`](index.html#L11))
    - enabled when:
        - counter was paused and has not ended yet
        - counter dispatched `ready` event and has never been played before
    - disabled when:
        - by default
        - counter has ended
        - counter is playing
    - on click:
        - apply [`Counter.play`](#play)
- Pause button ([`#pauseButton`](index.html#L12))
    - enabled when:
        - counter is playing
    - disabled when:
        - by default
        - counter has ended
        - counter was paused
    - on click:
        - apply [`Counter.pause`](#pause)
- Counter Element ([`#counterElement`](index.html#L17)) - The element to perform count on. The element should change shades of red along with the count progress.
    - on **`start`** event - change the font color to `#ef9a9a`.
    - on **`q1`** event - change the font color to `#e57373`.
    - on **`q2`** event - change the font color to `#f44336`.
    - on **`q3`** event - change the font color to `#b71c1c`.  

**Note**: After the counter instance has dispatched the **`end`** event, it is safe to dispose it (by using the [`Counter.dispose`](#dispose) method) and all other memory resources that were allocated for integrating with it. 