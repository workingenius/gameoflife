module.exports = function(stepProc) {
  var timer;
  return {
    interval: 2000,
    start: function() {
      timer = setInterval(stepProc, this.interval);
    },
    pause: function() {
      timer && clearInterval(timer);
      timer = null;
    },
    isOn: function() {
      return !!timer;
    },
    shift: function() {
      if (this.isOn()) this.pause();
      else this.start();
    },
  };
};
