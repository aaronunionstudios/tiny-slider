// extend
function extend() {
  var obj, name, copy,
  target = arguments[0] || {},
  i = 1,
  length = arguments.length;

  for (; i < length; i++) {
    if ((obj = arguments[i]) !== null) {
      for (name in obj) {
        copy = obj[name];

        if (target === copy) { 
          continue; 
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
}

function eventListen(t, fn, o) {
  o = o || window;
  var e = t+Math.round(Math.random()*99999999);
  if ( o.attachEvent ) {
    o['e'+e] = fn;
    o[e] = function(){
        o['e'+e]( window.event );
    };
    o.attachEvent( 'on'+t, o[e] );
  }else{
    o.addEventListener( t, fn, false );
  }
}

function onNavClick (container, index, items, childrenLength, dir) {
  index += dir;
  if (index === childrenLength) {
    index = 0;
  } else if (index === -1) {
    index = childrenLength - 1;
  }

  container.style.left = - (100 * index / items) + '%';
}

function tinySlider(options) {
  // make sure container is a list
  var containers = (options.container.length === undefined) ? [options.container] : options.container;

  for (var i = 0; i < containers.length; i++) {
    var newOptions = options;
    newOptions.container = containers[i];
    var a = new tinySliderCore(newOptions);
  };
}

function tinySliderCore(options) {
  options = extend({ 
    container: document.querySelector('.tiny-slider'),
    child: '.item',
    mode: 'carousel',
    items: 1,
    byPage: true,
    hasNav: true,
    hasDots: true,
    navText: ['prev', 'next'],
    loop: true,
    callback: false,
  }, options || {});

  this.container = options.container;
  this.children = this.container.querySelectorAll(options.child);
  this.childrenLength = this.children.length;
  this.items = options.items;
  this.hasNav = options.hasNav;
  this.hasDots = options.hasDots;
  this.navText = options.navText;
  this.loop = options.loop;
  this.index = 0;

  this.init();

  // this.eventListen = function (t, fn, o) {
  //   o = o || window;
  //   var e = t+Math.round(Math.random()*99999999);
  //   if ( o.attachEvent ) {
  //     o['e'+e] = fn;
  //     o[e] = function(){
  //         o['e'+e]( window.event );
  //     };
  //     o.attachEvent( 'on'+t, o[e] );
  //   }else{
  //     o.addEventListener( t, fn, false );
  //   }
  // }

  // this.onNavClick(1);
  this.next.onclick = function () {
    // alert(this.innerHTML);
    tinySliderCore.prototype.onNavClick(1);
  }
}

tinySliderCore.prototype = {
  init: function () {
    // wrap slider with ".tiny-slider"
    var parent = this.container.parentNode,
        sibling = this.container.nextSibling;

    var div = document.createElement('div'),
        wrapper = div.cloneNode(true);
        wrapper.className = 'tiny-slider';
        wrapper.appendChild(this.container);

    if (sibling) {
      parent.insertBefore(wrapper, sibling);
    } else {
      parent.appendChild(wrapper);
    }

    // add nav
    if (this.hasNav) {
      var nav = div.cloneNode(true),
          prev = div.cloneNode(true),
          next = div.cloneNode(true);
          nav.className = 'nav';
          prev.className = 'prev';
          next.className = 'next';

      if (this.navText.length = 2) {
        prev.innerHTML = this.navText[0];
        next.innerHTML = this.navText[1];
      }
      nav.appendChild(prev);
      nav.appendChild(next);
      wrapper.appendChild(nav);

      this.prev = prev;
      this.next = next;
    }

    // add dots
    if (this.hasDots) {
      var dots = div.cloneNode(true),
          dot = div.cloneNode(true);
          dots.className = 'dots';
          dot.className = 'dot';

      for (var i = this.childrenLength - 1; i >= 0; i--) {
        var dotClone = (i > 0) ? dot.cloneNode(true) : dot;
        dots.appendChild(dotClone);
      }
      wrapper.appendChild(dots);
      this.dots = dots.querySelectorAll('.dot');
    }

    // console.log(this.prev);

    // calculate width
    this.container.style.width = (this.childrenLength * 100 / this.items) + '%';
    for (var i = 0; i < this.childrenLength; i++) {
      this.children[i].style.width = (100 / this.childrenLength) + '%';
    }
  },

  onNavClick: function (dir) {
    this.index += dir;
    if (this.index === this.childrenLength) {
      this.index = 0;
    } else if (this.index === -1) {
      this.index = this.childrenLength - 1;
    }

    this.container.style.left = - (100 * this.index / this.items) + '%';
  }
  // new: function () {
  // },
  // new2: function () {
  // }
};

tinySlider({
  container: document.querySelector('.slider'),
  items: 2
});
