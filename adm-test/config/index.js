var configVaulues = require('./config');

module.exports ={
  getDbconnectionString: function() {
      return 'mongodb://'+ configVaulues.username+ ':'+ configVaulues.pwd +
      '@ds017432.mlab.com:17432/nodetodolist';
  }
}
