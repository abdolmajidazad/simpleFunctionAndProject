myApp.factory('generalData', ["$rootScope", function ($rootScope) {
    let generalData = {};
    $rootScope.generalData = {};
    return {
        set: (key, value) => {
            generalData[key] = value;
            $rootScope.generalData = generalData;
            setTimeout(() => {
                $rootScope.$apply()
            }, 10);
        },
        get: () => {
            return generalData;
        },
        check : (key)=>{
            if(generalData[key]){
                return true;
            }else{
                return false;
            }

        },
        clear: () => {
            generalData = {};
            $rootScope.generalData = generalData;
            setTimeout(() => {
                $rootScope.$apply()
            }, 10);
        },
        hash : (parameter)=>{
            let hash = sha1.create();
            hash.update(parameter);
            return hash.hex()
        }
    }


}]);