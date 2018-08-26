myApp.service('appService', ['$http', 'settings', '$state', 'generalData', function ($http, settings, $state, generalData) {
    let resourceName = settings.serverPath;
    let generalDataObject  = generalData.get();
    Array.prototype.numberSort = function () {
        if (this.length) return this.sort((a, b) => {
            return a - b
        })
    };
    Object.defineProperty(Object.prototype, "length", {
        enumerable: false,
        value: function () {
            return Object.keys(this).length
        }

    });

    Array.prototype.clone = function(){return this.slice().map(el => {return {...el}})};

    let appService = {
        'post': (params, urlType) => {
            return new Promise((resolve, reject) => {
                /**
                 * create structure for get data from server api
                 * @type {{method: string, url: *, data, headers: {Content-Type: string}}}
                 */
                let theOption = {
                    method: 'POST',
                    url: urlType === 'absolute' ? params.url : `${resourceName}/ws/${params.url}`,
                    data: params.data,
                    headers: {
                        "Content-Type": "application/json",
                    }
                };
                /**
                 * call server with angular $http
                 */
                theOption.data['marketPort'] = generalDataObject['marketPort'];
                console.log("theOption in appService", theOption);
                $http(theOption).then(response => {
                    console.log("response :: ", response);
                    resolve(response);
                }, function (error) {
                    console.log("error :: ", error);
                    if (error.status === 401) {
                        setTimeout(() => {
                            const beforeLogin = ['root.signin', 'root.signup', 'root.recoverPassword'];
                            if ($state['current'] && $state['current']['name'] && !beforeLogin.includes($state['current']['name'])) {
                                generalData.clear();
                                $state.go('root.signin');
                            }
                        }, 1200)
                    }
                    reject(error);


                });
            });
        }

    };
    return appService;
}]);
