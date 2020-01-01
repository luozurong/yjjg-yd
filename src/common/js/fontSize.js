(function(doc, win) {
	var docEl = doc.documentElement;
	const isIOS = navigator.userAgent.match(/iphone|ipod|ipad/gi);
	const dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1;
	const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
	docEl.dataset.dpr = dpr;
	var recalc = function() {
		var width = docEl.clientWidth;
		if(width / dpr > 768) {
			width = 768 * dpr;
		}
		docEl.style.fontSize = 100 * (width / 375) + 'px';
	};
	recalc();
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
})(document, window);