myApp.service('pageInfoService', function() {
    this.getInfo = function(callback) {
        chrome.tabs.query({'active': true},
        function (tabs) {
            if (tabs.length > 0)
            {
                chrome.tabs.sendMessage(tabs[0].id, { 'action': 'PageInfo' }, function (response) {
                    console.log('response from sendMessage', response);
                    callback(response);
                });
            }

        });
    };
});

myApp.service('ChromeStorage', function() {
    
    var save = function(pageInfo){
        alert('Saving!', pageInfo);
    }

    return {
        save : save
    }

});

myApp.controller("PageController", function ($scope, pageInfoService, ChromeStorage) {
    $scope.pageInfo = null;
    $scope.init = function(){
        //Load viewed animes
        pageInfoService.getInfo(function (pageInfo) {
            console.log('pageInfo', pageInfo);
            $scope.pageInfo = pageInfo;
            $scope.$apply();
        });    
    }

    $scope.saveAnimeAsViewed = function(){
        if($scope.pageInfo){
            ChromeStorage.save($scope.pageInfo);
        }
    }
    
});



