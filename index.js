$(document).ready(function() {
  buttonSwitch();

  $("#oral, #nails, #hair, #skin").click(function() {
    //get data url from the clicked button's data-url attribute
    var url = $(this).attr("data-url");

    //append loading icon and disable buttons
    $("button")
      .append('<i class="fa fa-circle-o-notch fa-spin"></i>')
      .prop("disabled", true);

    //Ajax call with url obtained from button attribute
    $.ajax({
      type: "GET",
      cache: true,
      url: url,
      // beforeSend: function(xhr) {
      //   xhr.setRequestHeader("X-CKAN-API-Key", api_key);
      // },
      success: function(data) {
        var search = $("input").val();
        $("input").val("");

        //Filtering the array of products based on search condition
        var filteredData = $.grep(data, function(product, i) {
          return searchFunction(product, search);
        });

        //empty previous search and remove loading
        $("#products").empty();

        //show message "nothing found" if search result == 0
        if (filteredData.length === 0) {
          $("#products").append(`<h1>Nothing matches your search</h1>`);
        }

        //if search result != 0, show hidden HTML section and append the products in that section
        $("#productsSection").attr("hidden", false);
        filteredData.forEach(product =>
          $("#products").append(`

        <div id="product" class="paged-element m-sm-auto col-sm-2 col-12 col-sm-10 col-md-8 col-lg-7 col-xl-3 m-auto pt-5 pt-xl-0">
          <div class="fdb-box  fdb-touch">
            <h4 id="productName">${product.ProductEnName}</h4>
            <h4 id="productName">${product.ProductArName}</h4>
            <h4 id="brandName">Brand:   ${product.BrandName}</h4>
            <div class="productDetails">
            <p>Listed Name:   ${product.ProductArName}</p>
            <p>Country:   ${product.CounrtyEn}</p>
            <p>Volume:   ${product.PackageVolume}</p>
            <p>Manufacturer:   ${product.manufactureenglishname}</p>
            <p>Product No.   ${product.ProductNumber}</p>
            </div>
          <a id=${product.ProductNumber} href="#login-form" rel="modal:open">REPORT</a>
          </div>
        </div>
   `)
        );

        //scroll down to search result
        $("html,body").animate(
          { scrollTop: $("#products").offset().top },
          "slow"
        );
        //remove loading icon
        $("i").remove();
        buttonSwitch();
      },
      error: function(e) {
        $("#products").html(`<h1>Sorry, something went wrong</h1>`);
        console.log(e);
        $("i").remove();
        buttonSwitch();
      }
    });
  });

  // Returning the filtering condition
  searchFunction = function(product, search) {
    return (
      product.BrandName.toString()
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      product.ProductArName.toString().includes(search) ||
      product.ProductEnName.toString()
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  };

  // Disable all buttons if the search box is empty
  function buttonSwitch() {
    $("button").prop("disabled", true);
    $("#searchBox").keyup(function() {
      $("button").prop("disabled", this.value == "" ? true : false);
    });
  }

  // input validation
  $("#reportInput").on("input", function() {
    var input = $(this);
    var is_filled = input.val();
    if (is_filled) {
      input.removeClass("invalid").addClass("valid");
      $("#report").removeClass("disabled");
    } else {
      input.removeClass("valid").addClass("invalid");
      $("#report").addClass("disabled");
    }
  });

  //empty report input box after submitting the form. This is just a "place holder". It should be replaced with an ajax request to POST the message.
  $("#report").click(function() {
    $("#reportInput").val("");
  });
});
