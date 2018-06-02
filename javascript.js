//Helper Function *************************************************************************

var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : sParameterName[1];
      }
  }
};

//End Helper Function**********************************************************************


// Animation Section **********************************************************************

$(document).ready(function () {

  //window and animation items
  var animation_elements = $.find('.animation-element');
  var web_window = $(window);

  //check to see if any animation containers are currently in view
  function check_if_in_view() {
    //get current window information
    var window_height = web_window.height();
    var window_top_position = web_window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    //iterate through elements to see if its in view
    $.each(animation_elements, function () {

      //get the elements information
      var element = $(this);
      var element_height = $(element).outerHeight();
      var element_top_position = $(element).offset().top;
      var element_bottom_position = (element_top_position + element_height);

      //check to see if this current container is visible (its viewable if it exists between the viewable space of the viewport)
      if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
        element.addClass('fadeInLeftBig');
      } else {
        element.removeClass('fadeInLeftBig');
      }
    });

  }

  //on or scroll, detect elements in view
  $(window).on('scroll resize', function () {
    check_if_in_view()
  })
  //trigger our scroll event on initial load
  $(window).trigger('scroll');

});

//Animation Section End *********************************************************************************

//BLOGS LIST SECTION ************************************************************************************

$(document).ready(function () {
$.get("https://whitehawkindustriesportfolio.000webhostapp.com/backend/beposts", function(data){
  console.log(data)
  data.sort(function(a,b) { 
    return new Date(a.created_date).getTime() - new Date(b.created_date).getTime() 
});
    for (x = 0; x < data.length; x++)
      $("#blogs").append(`<div><a href="./blog.html?id=${data[x].id}">${data[x].title}</a></div>`)
})




  

})


// BLOGS LIST SECTION END *******************************************************************************


//BLOG DETAILS SECTION *********************************************************************************

$(document).ready(function () {
var id = getUrlParameter("id")
  $.get(`https://whitehawkindustriesportfolio.000webhostapp.com/backend/bepost?id=${id}`, function(data){
    console.log(data)
    $('#title').text(data.title)
    $('#created_date').text(data.created_date)
    $('#content').text(data.content)
  })
})