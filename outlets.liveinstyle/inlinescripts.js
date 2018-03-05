$(document).ready(function(){$("#subscribe-email").click(function(){var e=$("#emailsubscribeinput").val();$.ajax({url:"http://usldev.cognizant.com/nowfloats/subscribe-api/subscribe",method:"PUT",dataType:"JSON",data:{Key:"sub$cribe018d@ta",email:e},success:function(e){alert("Your subscription was successful.")},error:function(e){alert("An error occured. Please try again later.")}})})});

  $(document).ready(function(){new Swiper(".swiper-container",{slidesPerColumn:2,slidesPerView:3,slidesPerColumnFill:"column",effect:"slide",nextButton:".swiper-button-next",prevButton:".swiper-button-prev",watchActiveIndex:!0,spaceBetween:30,breakpoints:{380:{slidesPerView:1,slidesPerColumn:2,spaceBetween:10},480:{slidesPerView:1,slidesPerColumn:2,spaceBetween:20},640:{slidesPerView:1,slidesPerColumn:2,spaceBetween:30}}})});

  $("#subscribeUs").on("submit",function(e){e.preventDefault()}),$("#subscribe-email").click(function(){var e=$("#emailsubscribeinput").val();return KitsuneSubscribe(e,function(e){alert(e),document.getElementById("emailsubscribeinput").value=""},function(e){alert(e)}),!1});

function generateUrl(e){var r=$("#searchInput").val();if(""==(r=r.replace(/\s+/g,"-").toLowerCase())||null==r)alert("Enter a search word");else var a=e+"/search/"+r+"/1";return window.location.replace(a),!1}$("#nav-search").submit(function(e){return!1});

!function(n){n(document).ready(function(){n("ul.dropdown-menu [data-toggle=dropdown]").on("click",function(o){o.preventDefault(),o.stopPropagation(),n(this).parent().siblings().removeClass("open"),n(this).parent().toggleClass("open")})})}($);

$("#searchInput").keyup(function(c){13===c.keyCode&&$("#submitsearchButton").click()});

!function(e,t,n){var c,o=e.getElementsByTagName(t)[0];e.getElementById(n)||((c=e.createElement(t)).id=n,c.src="https://connect.facebook.net/en_US/sdk.js#xfbml=1",c.async=!0,o.parentNode.insertBefore(c,o))}(document,"script","facebook-jssdk");

function searchFunction(e){var t,n,a;for(t=e?e.toUpperCase():document.getElementById("myinput").value.toUpperCase(),n=document.getElementById("wrapper").getElementsByTagName("li"),a=0;a<n.length;a++)n[a].getElementsByTagName("a")[1].innerHTML.toUpperCase().indexOf(t)>-1?$(n[a]).parent().slideDown():$(n[a]).parent().slideUp()}
