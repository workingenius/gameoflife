module.exports = function(stepProc) {
  var timer;
  return {
    interval: null, // init on DOM ready

    setInterval: function(interval) {
      var pnan = isNaN(interval);
      console.assert(!pnan, 
        {error: 'interval should be a number', interval: interval});
      if (pnan) return;

      interval = Math.max(interval, 100);
      if (interval === this.interval) return;

      var running = this.isOn();
      if (running) {
        this.pause();
        this.interval = interval;
        this.start();
      } else {
        this.interval = interval;
      }
    },

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
