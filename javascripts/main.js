//  Notes on names of rendering engines
// -webkit-
//   "Blink" - Google
//   - Chrome
//   "Webkit" - Apple
//   - Safari
//
// "Gecko" - Mozilla Foundation
// -moz
//   - firefox
//
// "Spartan" - Microsoft
// -ie


"use strict";

document.addEventListener("DOMContentLoaded", function(){
  var $bodyElement = $("[data-js=body]");

  // $ or jQuery are references to the "factory"
  // var headingElement = document.querySelector(".heading");
  var $headingElement = $bodyElement.find(".heading");
  // Anything inside of jquery factory calls
  //  are CSS selectors
  // Square brackets as
  var $moviesElement = $bodyElement.find("[data-js='movies']");
  var $submitElement = $bodyElement.find("[data-js='form--submit']");
  var $titleInputElement = $bodyElement.find("[data-js='form__title']");

  // use reference to document to listen for click
  $submitElement.on("click", function(e){
    // Stop the refresh!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    e.preventDefault();
    // Grab the value form `the input`
    var titleValue = $titleInputElement.val();
    // Get movies!
    grabMovies(titleValue);
  });

  // This is "delegating" our click event to children *if*
  //   they are there
  $moviesElement.on("click", "[data-js='movie']", function(e){
    // e.target represents the element that was clicked
    // "e" is all of the event data (not just element clicked)

    // Wrapping the clicked element in jquery
    var $movieElement = $(e.currentTarget);
    // Change the element that was clicked to have a "clicked class"
    // Vanilla js
    // e.target.className += " clicked";
    $movieElement.toggleClass('clicked')
                 .fadeToggle();
  });

  // // Vanilla js
  // headingElement.addEventListener("click", function(e){
  //   // changes to "clicked here"
  //   e.target.textContent = "Clicked here";
  // });

  // Because I have named variables that are equal
  //   to jQuery "factory" selectors/calls I know
  //   when it is valid/invalid to use $ methods.
  $headingElement.on("click", function(e){
    $(e.target).text("Clicked Here");
  });


  function grabMovies(movieTitle){
    $.get(`http://www.omdbapi.com/?s=${movieTitle}`, function(data){
      // <li>
      //   <h2> Movie Title <h2>
      //   <time> Year </time>
      // </li>
      var allResultsHTML = "";
      data.Search.forEach(function(movieResult){
        // Templates... we want see the structure with negative space
        //   to understand how it will be displayed
        allResultsHTML += `
          <li data-js="movie">
            <h2>${movieResult.Title}</h2>
            <time>${movieResult.Year}</time>
          </li>
        `;
      });
      $moviesElement.html(allResultsHTML);
    });
  }
});
