(function() {
  'use strict';

  angular
    .module('yeomanAngularGulp')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
