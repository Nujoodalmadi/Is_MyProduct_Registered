$(document).ready(function() {
  buttonSwitch();

  $("#oral, #nails, #hair, #skin").click(function() {
    //get data url from the clicked button's data-url attribute
    var url = $(this).attr("data-url");

    //append loading icon, which will be removed after ajax we get ajax response
    $("button").append('<i class="fa fa-circle-o-notch fa-spin"></i>');

    //Ajax call with url obtained from button attribute
    $.ajax({
      type: "GET",
      cache: true,
      url: url,
      beforeSend: function(xhr) {
        xhr.setRequestHeader(
          "X-CKAN-API-Key",
          "f358fc15-8983-4a77-a5f7-ada7d1069a4e"
        );
      },
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
          $("#products").append(`<h1>nothing</h1>`);
        }

        //if search result != 0, show hidden HTML section and append the products in that section
        $("#productsSection").attr("hidden", false);
        filteredData.forEach(product =>
          $("#products").append(`

        <div id="product" class="paged-element m-sm-auto col-sm-2 col-12 col-sm-10 col-md-8 col-lg-7 col-xl-3 m-auto pt-5 pt-xl-0">
          <div class="fdb-box fdb-touch">
            <h4>${product.ProductEnName}</h4>
            <h4>${product.ProductArName}</h4>
            <h4>Brand: ${product.BrandName}</h4>
            <p>Listed Name: ${product.ProductArName}</p>
            <p>Country: ${product.CounrtyEn}</p>
            <p>Volume: ${product.PackageVolume}</p>
            <p>Manufacturer: ${product.manufactureenglishname}</p>
            <p># ${product.ProductNumber}</p>
          
          <a id=${product.ProductNumber} href="#login-form" rel="modal:open">Report this product</a>
          </div>
        </div>
   `)
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

  //empty report input box after submitting the form
  $("#report").click(function() {
    $("#reportInput").val("");
  });
});
