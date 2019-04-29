app.factory('notify', ['$window', function (win) {
  var msgs = [];
  return function (msg) {
    msgs.push(msg);
    if (msgs.length === 1) {
      win.alert(msgs.join('\n'));
      msgs = [];
    }
  };
}]);
