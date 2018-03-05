var map;
         var markers = [];
         var masterStoreList;
         var nearByStoreList;

         function showLoader(show) {
           var $ele = $('.bh-sl-container');
           if(show) {
             $ele.LoadingOverlay('show');
           } else {
             $ele.LoadingOverlay('hide',true);
           }
         }

         function getParams() {
                var url = null;
                var params = null;
                url = window.location.href;
                url = new URL(url);
                params = url.searchParams;
                return params;
         }

         function filterPlacesByCity() {
           var enteredCity = $("#myinput").val();
           var filerElement = masterStoreList;
           var filer = filerElement.filter(function(elem) {
             return elem.City.toUpperCase() == enteredCity.toUpperCase();
           });
           // initializeMap();
           $(".bh-sl-map").empty();
           nearByStoreList = filer;
           if (filer && filer.length > 0){
             initializeMap(filer[0].Lat, filer[0].Lng, 10);
           } else {
             initializeMap();
           }

           poplateMapListView2(filer);
         }

         function capitalizeFirstLetter(str) {
           str = str.toLowerCase();
             return str.charAt(0).toUpperCase() + str.slice(1);
         }

         function locateClickedStore(lat,lon) {
           showLoader(true);
           lat = parseFloat(lat);
           lon = parseFloat(lon);

           map = new google.maps.Map(document.getElementById("bh-sl-map"), {
             zoom: 15,
             center: { lat:lat, lng: lon },
             mapTypeId: "terrain"
           });
           clearAllMarkers();
           addStoreMarkerToMap(new google.maps.LatLng(lat, lon));
           showLoader(false);
         }

         function getDefaultOptionElement(){
           var option = document.createElement('option');
           option.hidden = true;
           option.disabled = true;
           option.selected = true;
           option.style.color = 'white';

           option.text = 'select city';
           return option;
         }

         function initializeMap(lat, lng, zoom) {
           showLoader(true);
           map = new google.maps.Map(document.getElementById("bh-sl-map"), {
             zoom: zoom ?  zoom : 4,
             center: {
               lat: lat ? lat : 21.146633,
               lng: lng ? lng : 79.088860
             },
             mapTypeId: "terrain"
           });

           if (markers != null) {
             clearAllMarkers();
           }
           if (masterStoreList != null && masterStoreList.length > 0) {
             if (nearByStoreList == null) {
               for (i = 0; i < masterStoreList.length; i++) {
                 addStoreMarkerToMap(
                   new google.maps.LatLng(masterStoreList[i].Lat, masterStoreList[i].Lng)
                 );
               }
               poplateMapListView2(masterStoreList);
             } else {
               for (i = 0; i < nearByStoreList.length; i++) {
                 addStoreMarkerToMap(
                   new google.maps.LatLng(nearByStoreList[i].Lat, nearByStoreList[i].Lng)
                 );
               }
             }
           }showLoader(false);
         }

         function clearAllMarkers() {
           try {
             if (map != null && markers != null) {
               markers.length = 0;
               for (var i = 0; i < markers.length; i++) {
                 markers[i].setMap(null);
               }
             }
           } catch (exception) {
             console.log(exception);
           }
         }

         function addStoreMarkerToMap(location) {
           var marker = new google.maps.Marker({
             position: location,
             map: map
           });
           markers.push(marker);
         }

         function loadAllStoresFromServer() {
           nearByStoreList = null;
           if (map == null) initializeMap();
           showLoader(true);
           $.ajax({
             url:
               "https://api.withfloats.com/Discover/v3/floatingPoint/rootcname/childFPs/OUTLETS.LIVEINSTYLE.COM?clientId=BD6B68E989FFE687A80E0643DFA13B3C8E7A346E8A7AE9AE10D53749DB34",
             contentType: "application/json",
             success: function(response) {
               showLoader(false);
               if (response != null) {
                 masterStoreList = response;
                 if (map != null) initializeMap();
               }
               getStorefromUrlCity();
             }
             ,
             error: function() {
               showLoader(false);
             }
           });
         }

         var loadNearMeStores = function() {
           showLoader(true);
           jQuery.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyAINdnHUH-2GrIgsCxHTXOc7gRG-E4L3R0",
            function(success) {

                var pos = {
                  lat : success.location.lat,
                  lng: success.location.lng
                };
                 $.ajax({
               url:
                 "https://api.withfloats.com/Discover/v2/GetNearByFloatingPointsPerEnterprise?clientId=BD6B68E989FFE687A80E0643DFA13B3C8E7A346E8A7AE9AE10D53749DB34&lat=" +
                 pos.lat +
                 "&lng=" +
                 pos.lng +
                 "&radius=100&enterpriseId=776",
               contentType: "application/json",
               success: function(response) {
                 nearByStoreList = response;
                  poplateMapListView2(nearByStoreList);
                  if(response && response.length >0 ){
                    searchFunction(response[0].City);
                    initializeMap(response[0].Lat, response[0].Lng, 10);
                  } else {
                    initializeMap()
                  }
                 // if (map != null) initializeMap();
                 showLoader(false);
               },
               error : function() {
                 showLoader(false);
               }
             });
          })
            .fail(function(err) {
              console.log("error while getting location");
              showLoader(false);
            });
         };

         /*function degreesToRadians(degrees) {
             return degrees * Math.PI / 180;
         }

         function getDistanceOfStore(lat, lng, mapLat, mapLng) {
             lat = degreesToRadians(lat);
             lng = degreesToRadians(lng);
             mapLat = degreesToRadians(mapLat);
             mapLng = degreesToRadians(mapLng);
             return Math.acos(Math.sin(mapLat) * Math.sin(lat) +
             Math.cos(mapLat) * Math.cos(lat) * Math.cos(lng - mapLng)) * 6371
           }*/

         function poplateMapListView2(containerList) {
           $(".bh-sl-loc-list li").remove();
           var context = "",
             v = (i = 0);
           for (i = 0; i < containerList.length; i++) {
             context =
               context +
               "<li data-markerid='1' style='background: rgb(238, 238, 238);'><div class='list-label'>" +
               (i + 1) +
               "</div><div class='loc-lat' style='display:none;'>" +
               containerList[i].Lat +
               "</div><div class='loc-lng' style='display:none;' >" +
               containerList[i].Lng +
               "</div><div class='list-details'><div class='list-content'  >" +
               "<div class='loc-name'>" +
               containerList[i].Name +
               "</div><div class='loc-addr'>" +
               containerList[i].Address +
               "</div><div class='loc-addr2'></div> " +
               "<div class='loc-addr3'>" +
               containerList[i].City +
               "</div><div class='loc-phone'></div><div class='loc-web'><a href='index.html' target='_blank'></a></div>" +
               "<div class='loc-directions' > <a href='https://maps.google.com/maps?saddr=hyderabad&daddr=" +
               containerList[i].Address +
               " target='_blank'>Directions</a> </div>" +
                           "<div class='loc-directions'> <a href=" +
                           "http://outlets.liveinstyle.com/+&#32;&#32;&#32;&#32;&#32;&#32;containerList[i].RootAliasUri&#32;+" +
                           "target='_blank'>Visit Store</a> </div>" +
               "</div>" +
               "</div>" +
               "</li>";
           }

           $(".bh-sl-loc-list .list").append(context);
           attachStoreSelecterEvent();
         }


         function attachStoreSelecterEvent() {
           $(".bh-sl-loc-list .list li").on("click", function() {
             var newlat=$(this).find(".loc-lat").text();
             var newlng=$(this).find(".loc-lng").text();
              locateClickedStore(newlat,newlng);
           });
         }

         function getStorefromUrlCity() {
           var params = getParams();
           var urlCity = params.get('city');
           if(urlCity !== undefined && urlCity !== null) {
             $('#myinput').val(capitalizeFirstLetter(urlCity))
             filterPlacesByCity();
             searchFunction(capitalizeFirstLetter(urlCity));
           }
         }


         $(function() {
           loadAllStoresFromServer();

           $('#myinput').append(getDefaultOptionElement());

           $(".form-select").change(function() {
             //$("#bh-sl-user-location").html("");
             $("#bh-sl-user-location")[0].reset();
             filterPlacesByCity();
             //initializeMap();
           });
           // $("#bh-sl-user-location").on("submit", function() {
           //   debugger;
           //   showMap();
           // });

           $("#bh-sl-submit").click(function(e) {
             e.preventDefault();
             e.stopPropagation
             loadNearMeStores();
             searchFunction();
           });
           $("#login-form-link").click(function(e) {
             $("#login-form")
               .delay(100)
               .fadeIn(100);
             $("#register-form").fadeOut(100);
             $("#register-form-link").removeClass("active");
             $(this).addClass("active");
             setTimeout(function(){initializeMap()},101);
             e.preventDefault();

           });
           $("#register-form-link").click(function(e) {
             $("#register-form")
               .delay(100)
               .fadeIn(100);
             $("#login-form").fadeOut(100);
             $("#login-form-link").removeClass("active");
             $(this).addClass("active");
             e.preventDefault();
           });
         });
