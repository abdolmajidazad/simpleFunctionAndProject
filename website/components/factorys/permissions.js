myApp.factory('permissions', ['settings', '$rootScope', function (settings, $rootScope) {

    return {
        check: (permission) => {
            let permissions = $rootScope.generalData['permissions'] || [];
            let findPermissions = permissions.find(i => i === permission);
            if (findPermissions) {
                return true;
            } else {
                return false
            }
        }
    }


}]);