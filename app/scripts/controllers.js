'use strict';

angular.module('confusionApp')      
        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.message = "Loading....";            
            $scope.showMenu = false;
            menuFactory.getDishes().query(
                function(response){
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response){
                    $scope.message = "Error: "+response.status+". "+response.statusText;
                });
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {

            $scope.sendFeedback = function() {                
                console.log($scope.feedback);                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                } else {
                    console.log($scope.feedback);
                    //var feedbackEntry = feedbackFactory.resourceFeedback();            
                    //feedbackEntry.save($scope.feedback)

                    feedbackFactory.getFeedbacks().save($scope.feedback)
                        .$promise.then(
                            function(response){
                                console.log('feedback saved');
                                $scope.invalidChannelSelection = false;
                                $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                                $scope.feedbackForm.$setPristine();
                            },
                            function(response){
                                console.log("Error: "+response.status+". "+response.statusText);
                            });
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {

            $scope.showDish = false;
            $scope.message = "Loading....";
            menuFactory.getDishes()
                .get({id:parseInt($stateParams.id,10)})
                    .$promise.then(
                        function(response){
                            $scope.dish = response;
                            $scope.showDish = true;
                        },
                        function(response){
                            $scope.message = "Error: "+response.status+". "+response.statusText;
                        });

        }])

        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.newcomment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                
                $scope.newcomment.date = new Date().toISOString();
                
                console.log($scope.newcomment);
                
                $scope.dish.comments.push($scope.newcomment);
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);

                $scope.newcommentForm.$setPristine();
                
                $scope.newcomment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        // implement the IndexController and About Controller here
        .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
            
            console.log('getting leader');
            $scope.showDish = false;
            $scope.dishMessage = "Loading....";
            $scope.showPromotion = false;
            $scope.promotionMessage = "Loading....";
            $scope.showLeader = false;
            $scope.leaderMessage = "Loading....";

            corporateFactory.getLeaders().get({id:3})
                .$promise.then(
                        function(response){
                            $scope.leader = response;
                            $scope.showLeader = true;
                        },
                        function(response){
                            $scope.leaderMessage = "Error: "+response.status+". "+response.statusText;
                        });
                      
            console.log('getting promotion');
            menuFactory.getPromotions().get({id:0})
                .$promise.then(
                        function(response){
                            $scope.promotion =  response;
                            $scope.showPromotion = true;
                        },
                        function(response){
                            $scope.promotionMessage = "Error: "+response.status+". "+response.statusText;
                        });

            console.log('getting featuredDish');
            menuFactory.getDishes().get({id:0})
                .$promise.then(
                        function(response){
                            $scope.featuredDish = response;
                            $scope.showDish = true;
                        },
                        function(response){
                            $scope.dishMessage = "Error: "+response.status+". "+response.statusText;
                        });

                       
        }])
        .controller('AboutController', ['$scope', 'corporateFactory',function($scope, corporateFactory) {
            
            $scope.message = "Loading...";
            $scope.showLeaders = false;
            
            corporateFactory.getLeaders().query(                
                function(response){
                    $scope.leaders = response;
                    $scope.showLeaders = true;
                },
                function(response){
                    $scope.message = "Error: "+response.status+". "+response.statusText;
                })            
        }])

;
