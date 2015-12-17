'use strict';

angular
  .module('confusionApp',[])
      .controller('MenuController', ['$scope', function($scope) {
        
            $scope.showDetails = false;
                         
                                 
              this.tab = 1;
              this.filtText= '';
        
              this.dishes=[
                         {
                           name:'Uthapizza',
                           image: 'images/uthapizza.png',
                           category: 'mains',
                           label:'Hot',
                           price:'4.99',
                           description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
                           comment: ''
                        },
                        {
                           name:'Zucchipakoda',
                           image: 'images/zucchipakoda.png',
                           category: 'appetizer',
                           label:'',
                           price:'1.99',
                           description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
                           comment: ''
                        },
                        {
                           name:'Vadonut',
                           image: 'images/vadonut.png',
                           category: 'appetizer',
                           label:'New',
                           price:'1.99',
                           description:'A quintessential ConFusion experience, is it a vada or is it a donut?',
                           comment: ''
                        },
                        {
                           name:'ElaiCheese Cake',
                           image: 'images/elaicheesecake.png',
                           category: 'dessert',
                           label:'',
                           price:'2.99', 
                           description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
                           comment: ''
                        }
                    ];
              
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
              /*the tab setting */
              
              this.select = function(indx){
                  console.log("from " + this.tab + " to " + indx);
                  this.tab = indx;
                  if (indx === 2)
                    {this.filtText = "appetizer";}
                  else if (indx === 3)
                    {this.filtText = "mains";}
                  else if (indx === 4)
                    {this.filtText = "dessert";}
                  else
                    {this.filtText = "";}
                  console.log("filtText " + this.filtText);
                
              };
              
              this.isSelected = function(indx){
                  return (this.tab === indx);
              };
              
              
        }])
      .controller('ContactController', ['$scope', function($scope) {
            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
       }])
       .controller('FeedbackController', ['$scope', function($scope) {
            $scope.sendFeedback = function() {
                console.log($scope.feedback);
                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                       agree:false, email:"" };
                    $scope.feedback.mychannel="";

                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }]);
