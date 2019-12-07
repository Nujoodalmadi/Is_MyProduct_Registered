$("#oral, #nails, #hair, #skin").click(function() {
  //get data url from the clicked button's data-url attribute
  var url = $(this).attr("data-url");

  $("#products").html(
    '<img id="loader-img" alt="" src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" width="100" height="100" align="center" />'
  );

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
      //Filtering the array of products
      var filteredData = $.grep(data, function(product, i) {
        return searchFunction(product, search);
      });
      //empty previous search and remove loading
      $("#products").empty();

      if (filteredData.length === 0) {
        $("#products").append(`<h1>nothing</h1>`);
      }

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
    },
    error: function(e) {
      $("#products").html(`<h1>Sorry, something went wrong</h1>`);
      console.log(e);
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

$("#report").click(function() {
  $("input").val("");
});
