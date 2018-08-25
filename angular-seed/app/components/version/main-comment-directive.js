'use strict';

angular.module('myApp.version.main-comment-directive', [])

    .directive('mainCommentDirective', function () {
        return {
            restrict: 'E',
            scope: {
                commentList:"=?"
            },
            controller: 'mainCommentVersionController',
            template:`
                    <div ng-repeat="item in commentList" style="margin-left: 10px">
                        {{item['id']}}
                        <div ng-if="item.children" >
                            <main-comment-directive comment-list="item.children"></main-comment-directive>
                        </div>
                        
                    
                    </div>
            
            `


        };
    })

    .controller('mainCommentVersionController',[function(){
// alert(0)



    }]);
